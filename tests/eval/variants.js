/* Generated variants of REVIEWED written cases (no review/gap flag).
   Kept separate from cases.js: these are mechanical transformations, not
   independently written scenarios, and are reported as their own set.

   Formatting variants: one per eligible case (case, spacing, punctuation).
   Spelling variants:   up to three per case, applied only to the case's `v`
                        word: interior deletion, adjacent transposition, vowel
                        substitution. A spelling variant is marked ambiguous —
                        reported, never counted as a defect — when the typo is
                        itself a known word, or is one edit from a DIFFERENT
                        known service term than the intended one. */

function evalEditDistance(a, b) {
  const d = Array.from({length:a.length + 1}, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/* Words a typo could legitimately mean instead: every word in the dataset,
   the search lexicon's service terms, and common English words that sit one
   edit from frequent service words. */
function evalKnownWords() {
  const words = new Set();
  const addText = t => normalizeSearchText(t).split(" ").forEach(w => w && words.add(w));
  RESOURCES.forEach(r => [r.name, r.description, r.requirements, (r.tags || []).join(" ")].forEach(addText));
  Object.values(SEARCH_LEXICONS.en.categoryTerms).forEach(m => Object.keys(m).forEach(w => words.add(w)));
  ["panty","pant","bet","pat","pit","pot","cot","cut","cat","car","care","cure","dig","dug","jab","jog","fool","foot",
   "ford","mood","hope","hole","horse","hose","mail","male","seal","deal","heal","real","layer","later","count","coat",
   "regal","rental","mental","diet","get","net","wet","yet","rid","rude","side","tide","wide","said","paid","maid",
   "but","bud","bun","sun","shelf","melter","holder","doctrine","sober","saber","rehash","detour","clinch","sensor",
   "senor","tutor","voucher","pouch","budget","hob","job","jobs","rob","sob","mob","fed","fad","feed"].forEach(w => words.add(w));
  return words;
}

function evalTypos(word) {
  if (word.length < 4) return [];
  const mid = Math.floor(word.length / 2);
  const out = [];
  out.push({kind:"deletion", text:word.slice(0, mid) + word.slice(mid + 1)});
  out.push({kind:"transposition", text:word.slice(0, mid - 1) + word[mid] + word[mid - 1] + word.slice(mid + 1)});
  const swap = {a:"e", e:"a", i:"e", o:"u", u:"o"};
  const v = [...word].findIndex((ch, i) => i > 0 && swap[ch]);
  if (v > 0) out.push({kind:"vowel", text:word.slice(0, v) + swap[word[v]] + word.slice(v + 1)});
  const seen = new Set([word]);
  return out.filter(t => !seen.has(t.text) && seen.add(t.text));
}

function evalFormatVariant(query) {
  const spaced = query.replace(/ /g, "   ");
  return `  ${spaced.toUpperCase()}?!  `;
}

function buildEvalVariants(cases) {
  const known = evalKnownWords();
  const serviceTerms = new Set();
  Object.values(SEARCH_LEXICONS.en.categoryTerms).forEach(m => Object.keys(m).forEach(w => serviceTerms.add(w)));
  const variants = [];

  cases.filter(c => !c.review && !c.gap && c.kind !== "edge" && c.query.trim()).forEach(c => {
    variants.push({...c, id:`${c.id}~fmt`, set:"variant", variantOf:c.id, variantKind:"format", query:evalFormatVariant(c.query)});

    if (!c.v) return;
    const target = normalizeSearchText(c.v);
    evalTypos(target).forEach(typo => {
      const reasons = [];
      if (known.has(typo.text)) reasons.push(`"${typo.text}" is itself a known word`);
      const rivals = [...serviceTerms].filter(t => t !== target && evalEditDistance(t, typo.text) <= 1);
      if (rivals.length) reasons.push(`one edit from other service term(s): ${rivals.slice(0, 3).join(", ")}`);
      const query = normalizeSearchText(c.query).replace(new RegExp(`\\b${target}\\b`), typo.text);
      if (query === normalizeSearchText(c.query)) return;
      variants.push({
        ...c, id:`${c.id}~${typo.kind}`, set:"variant", variantOf:c.id, variantKind:typo.kind, query,
        ...(reasons.length ? {review:`ambiguous typo: ${reasons.join("; ")}`} : {})
      });
    });
  });
  return variants;
}
