/* Search evaluation runner. Runs cases.js (+ generated variants, + holdout
   only with ?holdout=1) through the real searchResources() and the real
   RESOURCES, then reports outcomes by group, severity and defect type. */

const SEVERITIES = ["critical", "high", "medium", "low"];
const TYPE_ORDER = ["guidance", "recall", "precision", "ranking"];
const TYPE_LABEL = {
  guidance:"matching — crisis guidance", recall:"matching — expected resource not returned",
  precision:"matching — irrelevant or excluded result", ranking:"ranking"
};

function evalRun(query) {
  const s = searchResources(RESOURCES, query, "en");
  const urgentAll = s.analysis.urgentEmergencies || (s.analysis.urgentEmergency ? [s.analysis.urgentEmergency] : []);
  return {status:s.status, urgent:s.analysis.urgentEmergency, urgentAll, ids:s.results.map(r => r.id), cats:s.results.map(r => r.category)};
}

function evalCheck(c, r) {
  const e = c.exp || {}, f = [];
  const fail = (type, msg, key = "") => f.push({type, msg, key});
  const pos = id => r.ids.indexOf(id);
  const top = (n) => r.ids.slice(0, n).join(" ") || "no results";

  if (e.empty && r.status !== "empty-meaningful") fail("precision", `expected the "enter a service" prompt, got ${r.ids.length} results`);
  if (e.none && r.ids.length) fail("precision", `expected no results, got ${r.ids.length} (${top(3)})`);
  if (Object.prototype.hasOwnProperty.call(e, "g") && r.urgent !== e.g) {
    fail("guidance", `urgent guidance ${JSON.stringify(r.urgent)}, expected ${JSON.stringify(e.g)}`, "g");
  }
  if (e.urgentAll && JSON.stringify(r.urgentAll) !== JSON.stringify(e.urgentAll)) {
    fail("guidance", `urgent guidance ${JSON.stringify(r.urgentAll)}, expected ${JSON.stringify(e.urgentAll)}`, "g");
  }
  if (e.first) {
    const ok = [].concat(e.first);
    if (!ok.includes(r.ids[0])) {
      const found = ok.filter(id => pos(id) >= 0);
      fail(found.length ? "ranking" : "recall", `first is ${r.ids[0] || "(none)"}, expected ${ok.join(" or ")}${found.length ? ` (found at #${pos(found[0]) + 1})` : " (not returned)"}`, "first");
    }
  }
  if (e.top) {
    const n = e.n || 5;
    e.top.forEach(id => {
      const p = pos(id);
      if (p < 0) fail("recall", `${id} not returned`);
      else if (p >= n) fail("ranking", `${id} at #${p + 1}, expected top ${n}`);
    });
  }
  if (e.any) {
    const n = e.an || 3;
    if (!e.any.some(id => { const p = pos(id); return p >= 0 && p < n; })) {
      const found = e.any.filter(id => pos(id) >= 0);
      fail(found.length ? "ranking" : "recall", `none of ${e.any.join(" ")} in top ${n} (${top(n)})${found.length ? `; ${found[0]} at #${pos(found[0]) + 1}` : ""}`);
    }
  }
  (e.has || []).forEach(id => { if (pos(id) < 0) fail("recall", `${id} not returned`); });
  /* Relative order by resource ID. */
  (e.ahead || []).forEach(([id, cat]) => {
    const p = pos(id), first = r.cats.indexOf(cat);
    if (p < 0) fail("recall", `${id} not returned`);
    else if (first >= 0 && p > first) fail("ranking", `${id} at #${p + 1} ranks after ${r.ids[first]} (#${first + 1}, ${cat})`);
  });
  (e.notAhead || []).forEach(([id, cat]) => {
    const p = pos(id), first = r.cats.indexOf(cat);
    if (p >= 0 && first >= 0 && p < first) fail("precision", `${id} at #${p + 1} is promoted ahead of every ${cat} result`);
  });
  (e.before || []).forEach(([a, b]) => {
    const pa = pos(a), pb = pos(b);
    if (pa < 0) fail("recall", `${a} not returned`);
    else if (pb >= 0 && pa > pb) fail("ranking", `${a} at #${pa + 1} is not before ${b} at #${pb + 1}`);
  });
  if (e.coverage) {
    e.coverage.cats.filter(cat => !r.cats.slice(0, e.coverage.n).includes(cat))
      .forEach(cat => fail(r.cats.includes(cat) ? "ranking" : "recall", `no ${cat} result in top ${e.coverage.n} (${top(e.coverage.n)})`));
  }
  (e.needs || []).forEach(group => {
    if (!group.some(id => pos(id) >= 0)) fail("recall", `no result for need ${group.join("/")}`);
  });
  (e.not || []).forEach(id => { if (pos(id) >= 0) fail("precision", `${id} returned at #${pos(id) + 1}`); });
  (e.notCat || []).forEach(cat => {
    const hits = r.ids.filter((_, i) => r.cats[i] === cat);
    if (hits.length) fail("precision", `${cat} results returned (${hits.join(" ")})`);
  });
  if (e.notTop) {
    const hits = r.ids.slice(0, e.notTop.n).filter(id => e.notTop.ids.includes(id));
    if (hits.length) fail("precision", `${hits.join(" ")} in top ${e.notTop.n}`);
  }
  if (e.notFirst && e.notFirst.includes(r.ids[0])) fail("precision", `${r.ids[0]} ranked first`);
  if (e.cats) {
    if (!r.ids.length) fail("recall", `no results; expected ${e.cats.in.join("/")}`);
    else {
      const off = r.cats.slice(0, e.cats.n).filter(cat => !e.cats.in.includes(cat));
      if (off.length) fail("precision", `top ${e.cats.n} include ${[...new Set(off)].join(", ")} (${top(e.cats.n)})`);
    }
  }
  if (e.max != null && r.ids.length > e.max) fail("precision", `${r.ids.length} results, expected at most ${e.max}`);
  return f;
}

function evalClassify(c, failures) {
  if (!failures.length) return {outcome:c.review || c.gap ? "pass (flagged)" : "pass"};
  const type = TYPE_ORDER.find(t => failures.some(x => x.type === t));
  if (c.gap) return {outcome:"missing-data", type};
  if (c.review) return {outcome:"ambiguous", type};
  let sev = c.sev;
  /* Crisis expressions: wrong guidance or a wrong first result is critical;
     a secondary resource missing or misranked is high. */
  if (c.group === "crisis-expr") {
    if (!failures.some(x => x.key === "g" || x.key === "first")) sev = "high";
  } else if (type === "ranking" || type === "precision") {
    sev = SEVERITIES[Math.min(SEVERITIES.indexOf(sev) + 1, SEVERITIES.length - 1)];
  }
  return {outcome:"fail", type, sev};
}

function evalDescribe(e) {
  const parts = [];
  if ("g" in e) parts.push(`guidance: ${e.g || "none"}`);
  if (e.empty) parts.push("prompt for a service");
  if (e.none) parts.push("no results");
  if (e.first) parts.push(`first: ${[].concat(e.first).join(" | ")}`);
  if (e.top) parts.push(`top ${e.n || 5}: ${e.top.join(" ")}`);
  if (e.any) parts.push(`one of ${e.any.join(" ")} in top ${e.an || 3}`);
  if (e.has) parts.push(`includes ${e.has.join(" ")}`);
  if (e.coverage) parts.push(`each of ${e.coverage.cats.join(", ")} in top ${e.coverage.n}`);
  if (e.needs) parts.push(`one result per need: ${e.needs.map(g => g.join("/")).join(" + ")}`);
  if (e.urgentAll) parts.push(`guidance cards: ${e.urgentAll.join(", ") || "none"}`);
  if (e.ahead) parts.push(e.ahead.map(([id, cat]) => `${id} ahead of all ${cat}`).join("; "));
  if (e.notAhead) parts.push(e.notAhead.map(([id, cat]) => `${id} not promoted ahead of ${cat}`).join("; "));
  if (e.before) parts.push(e.before.map(([a, b]) => `${a} before ${b}`).join("; "));
  if (e.cats) parts.push(`top ${e.cats.n} in ${e.cats.in.join("/")}`);
  if (e.not) parts.push(`excludes ${e.not.join(" ")}`);
  if (e.notCat) parts.push(`no ${e.notCat.join("/")} results`);
  if (e.notTop) parts.push(`${e.notTop.ids.join(" ")} not in top ${e.notTop.n}`);
  if (e.notFirst) parts.push(`not first: ${e.notFirst.join(" ")}`);
  if (e.max != null) parts.push(`≤ ${e.max} results`);
  return parts.join("; ") || "(observe only)";
}

function evalValidate(cases) {
  const known = new Set(RESOURCES.map(r => r.id));
  const errors = [];
  cases.forEach(c => {
    const e = c.exp || {};
    const ids = [...[].concat(e.first || []), ...(e.top || []), ...(e.any || []), ...(e.has || []), ...(e.not || []),
      ...(e.needs || []).flat(), ...(e.ahead || []).map(([id]) => id), ...(e.notAhead || []).map(([id]) => id),
      ...(e.before || []).flat(),
      ...(e.notFirst || []), ...((e.notTop || {}).ids || [])];
    ids.filter(id => !known.has(id)).forEach(id => errors.push(`${c.id}: unknown resource id ${id}`));
  });
  return errors;
}

/* The holdout file is fetched only on explicit request, so the default run
   never loads (or exposes in the page) the reserved cases. */
function evalLoadHoldout() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "holdout.js";
    script.onload = () => resolve(typeof EVAL_HOLDOUT !== "undefined" ? EVAL_HOLDOUT : []);
    script.onerror = () => reject(new Error("holdout.js could not be loaded"));
    document.body.appendChild(script);
  });
}

/* Runs in batches and yields between them, so a visible browser tab stays
   responsive during the ~1,250 searches instead of blocking for a minute. */
async function evalSuite(holdout) {
  const includeHoldout = !!holdout;
  const written = EVAL_CASES;
  const variants = buildEvalVariants(written);
  const all = [...written, ...variants, ...(holdout || [])];
  const authoringErrors = evalValidate(all);
  const rows = [];
  const summary = document.getElementById("summary");
  for (let i = 0; i < all.length; i += 40) {
    all.slice(i, i + 40).forEach(c => {
      const r = evalRun(c.query);
      const failures = evalCheck(c, r);
      rows.push({...c, result:r, failures, ...evalClassify(c, failures)});
    });
    if (summary) summary.textContent = `Running… ${rows.length} of ${all.length}`;
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  return {rows, authoringErrors, includeHoldout, holdoutSize:holdout ? holdout.length : null};
}

function evalTally(rows) {
  const t = {total:rows.length, pass:0, fail:0, ambiguous:0, "missing-data":0};
  rows.forEach(r => { if (r.outcome.startsWith("pass")) t.pass++; else t[r.outcome]++; });
  return t;
}

function evalSummaries(rows) {
  const sets = {};
  rows.forEach(r => (sets[r.set] = sets[r.set] || []).push(r));
  const bySet = Object.fromEntries(Object.entries(sets).map(([k, v]) => [k, evalTally(v)]));

  const byGroup = {};
  rows.forEach(r => {
    const g = byGroup[r.group] = byGroup[r.group] || {cases:0, pass:0, critical:0, high:0, medium:0, low:0, ambiguous:0, "missing-data":0};
    g.cases++;
    if (r.outcome.startsWith("pass")) g.pass++;
    else if (r.outcome === "fail") g[r.sev]++;
    else g[r.outcome]++;
  });

  const byType = {};
  rows.filter(r => r.outcome === "fail").forEach(r => {
    const t = byType[r.type] = byType[r.type] || {critical:0, high:0, medium:0, low:0};
    t[r.sev]++;
  });
  return {bySet, byGroup, byType};
}

async function evalRender() {
  /* Exactly ?holdout=1 — not ?holdout, ?holdout=0 or ?holdout=true. */
  const holdout = new URLSearchParams(location.search).get("holdout") === "1" ? await evalLoadHoldout() : null;
  const suite = await evalSuite(holdout);
  const {rows} = suite;
  const {bySet, byGroup, byType} = evalSummaries(rows);
  const fails = rows.filter(r => r.outcome === "fail")
    .sort((a, b) => SEVERITIES.indexOf(a.sev) - SEVERITIES.indexOf(b.sev) || a.group.localeCompare(b.group));
  const flagged = rows.filter(r => r.outcome === "ambiguous" || r.outcome === "missing-data");

  const table = (head, body) => `<table><thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${body.join("")}</tbody></table>`;
  const tr = cells => `<tr>${cells.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`;

  const written = bySet.written || evalTally([]);
  document.getElementById("summary").textContent =
    `Written: ${written.pass}/${written.total} pass · ${written.fail} fail · ${written.ambiguous} ambiguous · ${written["missing-data"]} missing data`;
  document.title = document.getElementById("summary").textContent;

  document.getElementById("report").innerHTML = `
    ${suite.authoringErrors.length ? `<h2>Authoring errors</h2><ul>${suite.authoringErrors.map(e => `<li>${esc(e)}</li>`).join("")}</ul>` : ""}
    <p>Holdout set: ${suite.includeHoldout ? `INCLUDED (${suite.holdoutSize} cases)` : "not loaded and not run (open with ?holdout=1 only once the candidate and expectations are frozen)"}.</p>
    <h2>By set</h2>
    ${table(["Set","Cases","Pass","Fail","Ambiguous","Missing data"], Object.entries(bySet).map(([k, t]) => tr([k, t.total, t.pass, t.fail, t.ambiguous, t["missing-data"]])))}
    <h2>Failures by group and severity</h2>
    ${table(["Group","Cases","Pass","Critical","High","Medium","Low","Ambiguous","Missing data"],
      Object.entries(byGroup).map(([k, g]) => tr([k, g.cases, g.pass, g.critical, g.high, g.medium, g.low, g.ambiguous, g["missing-data"]])))}
    <h2>Failures by defect type and severity</h2>
    ${table(["Defect type","Critical","High","Medium","Low"], TYPE_ORDER.filter(t => byType[t]).map(t => tr([TYPE_LABEL[t], ...SEVERITIES.map(s => byType[t][s])])))}
    <h2>Failures (${fails.length})</h2>
    ${table(["Severity","Type","Case","Set","Query","Problem","Top 5"], fails.map(r => tr([r.sev, r.type, r.id, r.set, r.query, r.failures.map(x => x.msg).join("; "), r.result.ids.slice(0, 5).join(" ")])))}
    <h2>Ambiguous expectations and missing data (${flagged.length})</h2>
    ${table(["Outcome","Case","Query","Flag","Observed"], flagged.map(r => tr([r.outcome, r.id, r.query, r.gap || r.review, r.failures.map(x => x.msg).join("; ")])))}
    <h2>Full matrix (${rows.length})</h2>
    ${table(["Case","Set","Group","Kind","Query","Expectation","Outcome","Guidance","Top 5"],
      rows.map(r => tr([r.id, r.set, r.group, r.kind, r.query, evalDescribe(r.exp || {}) + (r.review ? ` [review: ${r.review}]` : "") + (r.gap ? ` [gap: ${r.gap}]` : ""), r.outcome + (r.sev && r.outcome === "fail" ? ` (${r.sev})` : ""), r.result.urgent || "", r.result.ids.slice(0, 5).join(" ")])))}
  `;

  document.getElementById("report-json").textContent = JSON.stringify({
    bySet, byGroup, byType, authoringErrors:suite.authoringErrors,
    failures:fails.map(r => ({sev:r.sev, type:r.type, id:r.id, set:r.set, query:r.query, problems:r.failures.map(x => x.msg), top:r.result.ids.slice(0, 5)})),
    flagged:flagged.map(r => ({outcome:r.outcome, id:r.id, query:r.query, flag:r.gap || r.review, problems:r.failures.map(x => x.msg)}))
  });
}

document.addEventListener("DOMContentLoaded", evalRender);
