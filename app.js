/* Terre Haute Help — application script
   Phase 1 accessibility revision. See ACCESSIBILITY-CHANGES.md */

const SVG = {
  food:          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  housing:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  health:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  crisis:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  recovery:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  legal:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M12 22V12"/></svg>`,
  financial:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  employment:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  education:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3L3 8l9 5 9-5-9-5z"/><path d="M3 14l9 5 9-5"/><path d="M3 19l9 5 9-5"/></svg>`,
  children:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  senior:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
  pet:           `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  immigration:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  transportation:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  other:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  phone:         `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  globe:         `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  map:           `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  bus:           `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
};

const CATEGORY_META = {
  food:          {label:"Food",               icon:SVG.food,          badge:"badge-food",          bar:"bar-food"},
  housing:       {label:"Housing & Shelter",  icon:SVG.housing,       badge:"badge-housing",       bar:"bar-housing"},
  health:        {label:"Healthcare",         icon:SVG.health,        badge:"badge-health",        bar:"bar-health"},
  crisis:        {label:"Crisis & Emergency", icon:SVG.crisis,        badge:"badge-crisis",        bar:"bar-crisis"},
  recovery:      {label:"Recovery & AA/NA",   icon:SVG.recovery,      badge:"badge-recovery",      bar:"bar-recovery"},
  legal:         {label:"Legal",              icon:SVG.legal,         badge:"badge-legal",         bar:"bar-legal"},
  financial:     {label:"Financial Help",     icon:SVG.financial,     badge:"badge-financial",     bar:"bar-financial"},
  employment:    {label:"Employment",         icon:SVG.employment,    badge:"badge-employment",    bar:"bar-employment"},
  education:     {label:"Education",          icon:SVG.education,     badge:"badge-education",     bar:"bar-education"},
  children:      {label:"Children & Family",  icon:SVG.children,      badge:"badge-children",      bar:"bar-children"},
  senior:        {label:"Senior Services",    icon:SVG.senior,        badge:"badge-senior",        bar:"bar-senior"},
  pet:           {label:"Pet Resources",      icon:SVG.pet,           badge:"badge-pet",           bar:"bar-pet"},
  immigration:   {label:"Immigration",        icon:SVG.immigration,   badge:"badge-immigration",   bar:"bar-immigration"},
  transportation:{label:"Transportation",     icon:SVG.transportation,badge:"badge-transportation",bar:"bar-transportation"},
  other:         {label:"Other Resources",    icon:SVG.other,         badge:"badge-other",         bar:"bar-other"},
};

/* ══ SEARCH 2.1 — deterministic intent-aware local search ══
   Search must tolerate conversational, fragmented and mildly misspelled input
   without sending queries anywhere. The lexicon is deliberately structured by
   language so Spanish can be added later without rewriting the ranking engine. */
const SEARCH_LEXICONS = {
  en: {
    stopWords: new Set([
      "i","me","my","mine","we","our","ours","us","you","your","yours",
      "he","she","they","them","their","it","its","someone","somebody","person","people",
      "need","needs","needing","want","wants","wanting","looking","look","find","where","wheres",
      "can","cant","cannot","could","couldnt","would","wouldnt","should","shouldnt","please",
      "help","helps","helping","a","an","the","is","are","am","was","were","be","been","being",
      "for","to","with","in","at","of","on","near","around","from","and","or","but","do","does","did",
      "get","gets","getting","got","have","has","had","there","here","somewhere","anywhere","right","now",
      "today","local","nearby","terre","haute","indiana","vigo","county",
      "ned","nead","plz","pls"
    ]),

    /* Ordinary words that typo correction must never rewrite. Each is a real
       word one or two edits away from a service term (die→dog, stay→spay,
       cut→cat), and silently changing it sends the search to the wrong place. */
    protectedWords: new Set([
      "die","died","dies","dying","dead","death","stay","stays","stayed","staying",
      "safe","safely","safety","kill","killed","cut","cuts","hit","hits","hurt","hurts",
      "harm","self","myself","papers","paper","country","hair","driving","drive",
      "course","boyfriend","girlfriend","husband","wife","partner","pills","drinking"
    ]),

    /* Crisis phrases are matched against the normalized query BEFORE typo
       correction and category scoring. Each match is replaced by its canonical
       text, which then flows through the existing lexicon: "suicide" and
       "selfharm" raise the existing 988 guidance, "overdose" the existing 911
       guidance, and "domestic violence" the existing CODA / shelter concept.
       Patterns require context so a lone "die", "cutting", "safe" or "od"
       (my dog died, cutting hair classes, safe driving course) is not a crisis. */
    crisisPhrases: [
      {canonical:"suicide", patterns:[
        /\b(?:want|wanna|wanted|wish|wishing|ready|trying|try|plan|planning|planned|thinking about|thought about|deserve) (?:to )?(?:die|be dead|end it all|end it)\b/,
        /\b(?:kill|killing|killed|hang|hanging|shoot|shooting) (?:my ?self|me self)\b/,
        /\b(?:end|ending|take|taking) my (?:own )?life\b/,
        /\b(?:wish i (?:was|were) dead|better off dead|no reason to live|dont want to (?:live|be alive|wake up))\b/
      ]},
      {canonical:"selfharm", patterns:[
        /\bself ?harm(?:ing|s)?\b/,
        /\b(?:cut|cuts|cutting|hurt|hurting|harm|harming|burn|burning) (?:my ?self|me self)\b/
      ]},
      {canonical:"overdose", patterns:[
        /\boverdos(?:e|ed|es|ing)\b/,
        /\b(?:he|she|they|someone|somebody|i|im|friend|my \w+)(?: is| s| just| has| was| may have| might have| might be| think)? (?:od|ods|oded|odd|oding|odding)\b/,
        /\b(?:od|ods|oded|oding|odding) (?:on|off)\b/
      ]},
      {canonical:"domestic violence", patterns:[
        /\b(?:boyfriend|girlfriend|husband|wife|partner|spouse|ex|fiance|dad|father|stepdad|stepfather|mom|mother|he|she|they)(?: keeps| is| always| has been| has| just| will| still)? (?:hit|hits|hitting|beat|beats|beating|choke|chokes|choked|choking|strangled|abuse|abuses|abused|abusing|threaten|threatens|threatened|threatening|hurt|hurts|hurting|kicks|kicked|rapes|raped) (?:me|us|my (?:kids|children|son|daughter|baby))\b/,
        /\b(?:dont|do not|not|never|no longer|cant|cannot) (?:feel |be |stay )?safe (?:at|in) (?:my )?(?:home|house|apartment|place)\b/,
        /\bunsafe (?:at|in) (?:my )?(?:home|house|apartment)\b/,
        /\b(?:scared|afraid) (?:of my|to go) (?:boyfriend|girlfriend|husband|wife|partner|ex|home)\b/,
        /\babusive (?:boyfriend|girlfriend|husband|wife|partner|relationship|home|ex)\b/
      ]}
    ],

    /* Single-word intent vocabulary. Values are relative intent strengths.
       A term may intentionally appear in more than one category. */
    categoryTerms: {
      food: {
        food:2.4, pantry:2.4, pantries:2.4, hungry:2.4, hunger:2.2, meal:1.8, meals:1.8,
        grocery:1.8, groceries:1.8, snap:2.2, ebt:2.0, wic:2.0, nutrition:1.3
      },
      housing: {
        housing:2.4, shelter:2.5, homeless:2.5, homelessness:2.5, unhoused:2.5,
        rent:2.0, rental:1.8, eviction:2.2, evicted:2.2, landlord:1.5, tenant:1.5,
        apartment:1.5, lodging:1.8, motel:1.3, sleep:1.5, utility:1.2, utilities:1.2,
        electricity:1.0, electric:1.0, gas:1.0, water:1.0, heat:1.0, section8:2.0
      },
      health: {
        health:2.2, healthcare:2.4, medical:2.2, doctor:2.3, clinic:2.3, hospital:2.0,
        dental:2.2, dentist:2.3, prescription:2.0, prescriptions:2.0, medicine:1.8,
        medication:1.8, medications:1.8, medicaid:2.0, insurance:1.6, uninsured:2.0,
        vision:1.8, eye:1.6, glasses:1.5, hearing:1.8, audiology:1.8, mental:1.2
      },
      crisis: {
        crisis:2.8, emergency:2.8, suicide:3.2, suicidal:3.2, selfharm:3.2, abuse:2.6,
        violence:2.3, unsafe:2.6, danger:2.5, panic:2.2, overdose:3.4, overdosing:3.4,
        assault:2.6, rape:2.8, 988:3.2, 911:3.4
      },
      recovery: {
        recovery:2.5, sober:2.8, sobriety:2.8, addiction:2.6, substance:2.2,
        drug:2.4, drugs:2.4, alcohol:2.4, detox:2.8, rehab:2.8, rehabilitation:2.5,
        aa:2.6, na:2.6, meeting:1.5, meetings:1.5, halfway:1.8
      },
      legal: {
        legal:2.5, lawyer:2.7, attorney:2.7, court:2.0, expungement:2.5, expunge:2.5,
        custody:2.1, divorce:1.9, warrant:1.8, defender:2.0, rights:1.5
      },
      financial: {
        financial:2.4, money:1.8, bill:1.7, bills:1.7, benefits:1.8, debt:1.8,
        assistance:1.1, cash:1.5, income:1.5, pay:1.5, paying:1.5, utility:1.5,
        utilities:1.5, rent:1.2, rental:1.0
      },
      employment: {
        job:2.5, jobs:2.5, work:2.2, employment:2.5, career:2.0, resume:2.2,
        workforce:2.2, hiring:2.0, interview:1.8, unemployment:2.0, training:1.6
      },
      education: {
        school:2.2, education:2.5, ged:2.7, college:2.2, university:1.8,
        tutoring:2.2, class:1.6, classes:1.6, diploma:2.0, literacy:2.2, training:1.2
      },
      children: {
        child:2.4, children:2.4, kid:2.4, kids:2.4, family:1.8, childcare:2.5,
        daycare:2.4, parenting:2.0, parent:1.8, baby:2.0, infant:2.0, diapers:2.2,
        formula:2.1, headstart:2.5
      },
      senior: {
        senior:2.5, seniors:2.5, elderly:2.5, aging:2.3, older:1.8, medicare:2.1,
        caregiver:2.0, dementia:2.6, alzheimer:2.6, retirement:1.8
      },
      pet: {
        pet:2.5, pets:2.5, dog:2.3, dogs:2.3, cat:2.3, cats:2.3, animal:2.1,
        animals:2.1, vet:2.5, veterinary:2.5, spay:2.2, neuter:2.2
      },
      immigration: {
        immigration:2.7, immigrant:2.5, immigrants:2.5, refugee:2.5, refugees:2.5,
        citizenship:2.5, visa:2.3, naturalization:2.5, asylum:2.5
      },
      transportation: {
        transportation:2.6, bus:2.6, transit:2.6, ride:2.4, rides:2.4, car:1.5,
        vehicle:1.6, mobility:2.0, paratransit:2.6, wheelchair:1.4
      },
      other: {
        other:1.0, miscellaneous:1.0
      }
    },

    /* Multi-word concepts. Each entry represents a concept, not a one-off user
       sentence. "narrow" means category-only matches should not outrank the
       resources that actually contain the specific concept. */
    phraseConcepts: [
      {phrases:["food pantry","food pantries","food stamps","snap benefits","soup kitchen"], categories:{food:4.5}, narrow:true},
      {phrases:["emergency shelter","homeless shelter"], categories:{housing:4.5,crisis:1.5}, narrow:true},
      {phrases:["no place to sleep","no place sleep","nowhere to sleep","nowhere sleep"], categories:{housing:4.5,crisis:2.5}, narrow:false},
      {phrases:["rent assistance","rental assistance","help with rent","pay rent","paying rent"], categories:{housing:3.8,financial:3.8}, narrow:true},
      {phrases:["utility assistance","utility bill","utility bills"], categories:{financial:4.0,housing:2.0}, narrow:true},
      {phrases:["free clinic","no insurance","without insurance"], categories:{health:4.2}, narrow:true},
      {phrases:["mental health"], categories:{health:3.8,crisis:1.6}, narrow:false},
      {phrases:["panic attack"], categories:{crisis:4.2,health:2.5}, narrow:false},
      {phrases:["domestic violence","sexual assault"], categories:{crisis:5.0,housing:1.5}, narrow:false},
      {phrases:["sober living","sober house","sober housing","recovery house","recovery housing"], categories:{recovery:5.0}, narrow:true},
      {phrases:["legal aid","free lawyer","free attorney","public defender"], categories:{legal:4.8}, narrow:true},
      {phrases:["job training","work training","career training"], categories:{employment:4.0,education:2.5}, narrow:true},
      {phrases:["child care","head start"], categories:{children:4.2,education:1.5}, narrow:true},
      {phrases:["older adult","older adults"], categories:{senior:4.2}, narrow:true},
      {phrases:["pet food"], categories:{pet:4.5}, narrow:true},
      {phrases:["green card"], categories:{immigration:4.8}, narrow:true},
      {phrases:["stay in the country","stay in this country","immigration papers","work permit","work permits","legal status"], categories:{immigration:4.5}, narrow:false},
      {phrases:["public transit","bus route","bus routes"], categories:{transportation:4.5}, narrow:true}
    ]
  }
};

const SEARCH_FIELD_WEIGHTS = {
  name: 14,
  category: 16,
  tags: 12,
  description: 6,
  requirements: 2.5,
  hours: 0.5,
  address: 0.5
};

const SEARCH_CATEGORY_BOOST = 8;

function normalizeSearchText(value) {
  return String(value == null ? "" : value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchLanguage() {
  if (typeof document === "undefined") return "en";
  const lang = String(document.documentElement.lang || "en").toLowerCase().split("-")[0];
  return SEARCH_LEXICONS[lang] ? lang : "en";
}

function buildSearchVocabulary(lexicon) {
  const words = new Set();
  Object.values(lexicon.categoryTerms).forEach(termMap => {
    Object.keys(termMap).forEach(term => words.add(term));
  });
  lexicon.phraseConcepts.forEach(concept => {
    concept.phrases.forEach(phrase => {
      normalizeSearchText(phrase).split(" ").forEach(word => words.add(word));
    });
  });
  return words;
}

function damerauLevenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const d = Array.from({length:a.length + 1}, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) d[i][0] = i;
  for (let j = 0; j <= b.length; j++) d[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
      }
    }
  }
  return d[a.length][b.length];
}

function singularCandidate(token, vocabulary) {
  const candidates = [];
  if (token.length > 4 && token.endsWith("ies")) candidates.push(token.slice(0, -3) + "y");
  if (token.length > 4 && token.endsWith("es")) candidates.push(token.slice(0, -2));
  if (token.length > 3 && token.endsWith("s")) candidates.push(token.slice(0, -1));
  return candidates.find(candidate => vocabulary.has(candidate)) || token;
}

function consonantSkeleton(word) {
  return word.replace(/[aeiouy]/g, "");
}

function conservativelyCorrectToken(token, lexicon, vocabulary, lockedTokens) {
  if (!token || /^\d+$/.test(token) || lexicon.stopWords.has(token) || vocabulary.has(token)) return token;
  if (lexicon.protectedWords.has(token) || (lockedTokens && lockedTokens.has(token))) return token;

  const singular = singularCandidate(token, vocabulary);
  if (singular !== token) return singular;

  if (token.length < 3) return token;
  const maxDistance = token.length <= 3 ? 2 : (token.length >= 8 ? 2 : 1);
  let best = token;
  let bestDistance = maxDistance + 1;
  let tied = false;

  vocabulary.forEach(candidate => {
    /* Conservative typo correction: require the same first character. This
       prevents short distressed-input fragments such as "ned" from being
       silently changed into an unrelated service word such as "ged". */
    if (candidate[0] !== token[0]) return;
    if (token.length <= 3 && candidate.length < token.length) return;
    if (Math.abs(candidate.length - token.length) > maxDistance) return;
    const distance = damerauLevenshtein(token, candidate);
    /* A two-edit change to a three-letter word is only a likely misspelling
       when the consonants survive (fud→food); otherwise it is usually a
       different word altogether (die→dog). */
    if (token.length <= 3 && distance === 2 && consonantSkeleton(token) !== consonantSkeleton(candidate)) return;
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
      tied = false;
    } else if (distance === bestDistance && distance <= maxDistance && candidate !== best) {
      tied = true;
    }
  });

  return bestDistance <= maxDistance && !tied ? best : token;
}

function detectPhraseConcepts(text, lexicon) {
  if (!text) return [];
  return lexicon.phraseConcepts.filter(concept =>
    concept.phrases.some(phrase => text.includes(normalizeSearchText(phrase)))
  );
}

function analyzeSearchQuery(rawQuery, language = "en") {
  const lexicon = SEARCH_LEXICONS[language] || SEARCH_LEXICONS.en;
  const vocabulary = buildSearchVocabulary(lexicon);
  const normalized = normalizeSearchText(rawQuery);

  /* Crisis phrases first: rewrite each matched span to its canonical text so
     its words are never fuzzily corrected into an unrelated service. */
  let crisisText = normalized;
  const crisisMatches = [];
  lexicon.crisisPhrases.forEach(rule => {
    rule.patterns.forEach(pattern => {
      const global = new RegExp(pattern.source, "g");
      if (global.test(crisisText)) {
        crisisText = crisisText.replace(global, ` ${rule.canonical} `);
        if (!crisisMatches.includes(rule.canonical)) crisisMatches.push(rule.canonical);
      }
    });
  });
  crisisText = crisisText.replace(/\s+/g, " ").trim();

  /* Words that form a recognised phrase keep their spelling, so phrase
     context ("stay in the country") wins over single-word correction. */
  const lockedTokens = new Set();
  detectPhraseConcepts(crisisText, lexicon).forEach(concept => {
    concept.phrases.forEach(phrase => {
      const p = normalizeSearchText(phrase);
      if (crisisText.includes(p)) p.split(" ").forEach(word => lockedTokens.add(word));
    });
  });

  const rawTokens = crisisText ? crisisText.split(" ") : [];
  const correctedTokens = rawTokens.map(token => conservativelyCorrectToken(token, lexicon, vocabulary, lockedTokens));
  const correctedText = correctedTokens.join(" ");

  const phraseMap = new Map();
  [...detectPhraseConcepts(crisisText, lexicon), ...detectPhraseConcepts(correctedText, lexicon)]
    .forEach(concept => phraseMap.set(concept.phrases[0], concept));
  const phraseConcepts = [...phraseMap.values()];

  const meaningfulTokens = [...new Set(correctedTokens.filter(token =>
    token.length > 1 && !lexicon.stopWords.has(token)
  ))];

  const categoryScores = {};
  Object.entries(lexicon.categoryTerms).forEach(([category, termMap]) => {
    meaningfulTokens.forEach(token => {
      if (termMap[token]) categoryScores[category] = (categoryScores[category] || 0) + termMap[token];
    });
  });

  phraseConcepts.forEach(concept => {
    Object.entries(concept.categories).forEach(([category, strength]) => {
      categoryScores[category] = (categoryScores[category] || 0) + strength;
    });
  });

  const directOtherQuery = meaningfulTokens.some(token => token === "other" || token === "miscellaneous");
  let urgentEmergency = null;
  if (meaningfulTokens.some(token => token === "overdose" || token === "overdosing" || token === "911")) {
    urgentEmergency = "overdose";
  } else if (meaningfulTokens.some(token => ["panic","suicide","suicidal","selfharm"].includes(token))) {
    urgentEmergency = "mental-crisis";
  }

  return {
    raw: String(rawQuery == null ? "" : rawQuery).trim(),
    normalized,
    correctedText,
    tokens: meaningfulTokens,
    categoryScores,
    phraseConcepts,
    hasNarrowPhrase: phraseConcepts.some(concept => concept.narrow),
    directOtherQuery,
    urgentEmergency,
    crisisMatches
  };
}

function normalizedResourceFields(resource) {
  const categoryMeta = CATEGORY_META[resource.category] || {label:resource.category || ""};
  const fields = {
    name: normalizeSearchText(resource.name),
    category: normalizeSearchText(`${resource.category || ""} ${categoryMeta.label || ""}`),
    tags: normalizeSearchText((resource.tags || []).join(" ")),
    description: normalizeSearchText(resource.description),
    requirements: normalizeSearchText(resource.requirements),
    hours: normalizeSearchText(resource.hours),
    address: normalizeSearchText(resource.address)
  };
  fields.tokenSets = {};
  Object.keys(SEARCH_FIELD_WEIGHTS).forEach(field => {
    fields.tokenSets[field] = new Set(fields[field] ? fields[field].split(" ") : []);
  });
  return fields;
}

function resourceContainsConcept(fields, concept) {
  return concept.phrases.some(phrase => {
    const p = normalizeSearchText(phrase);
    return fields.name.includes(p) || fields.tags.includes(p) || fields.description.includes(p) || fields.requirements.includes(p);
  });
}

function scoreResourceForQuery(resource, analysis) {
  const fields = normalizedResourceFields(resource);
  let score = 0;
  const matchedTokens = new Set();

  analysis.tokens.forEach(token => {
    Object.entries(SEARCH_FIELD_WEIGHTS).forEach(([field, weight]) => {
      if (fields.tokenSets[field].has(token)) {
        score += weight;
        matchedTokens.add(token);
      }
    });
  });

  const intentStrength = analysis.categoryScores[resource.category] || 0;
  if (intentStrength > 0) {
    const categoryMultiplier = resource.category === "other" && !analysis.directOtherQuery ? 0.35 : 1;
    score += intentStrength * SEARCH_CATEGORY_BOOST * categoryMultiplier;
  }

  analysis.phraseConcepts.forEach(concept => {
    if (!resourceContainsConcept(fields, concept)) return;
    if (concept.phrases.some(p => fields.name.includes(normalizeSearchText(p)))) score += 38;
    else if (concept.phrases.some(p => fields.tags.includes(normalizeSearchText(p)))) score += 32;
    else if (concept.phrases.some(p => fields.description.includes(normalizeSearchText(p)))) score += 22;
    else score += 8;
  });

  /* Acute overdose searches need more than a broad crisis-category tie.
     Boost resources whose own content is specifically relevant, while the UI
     independently shows verified 911/naloxone guidance before local results. */
  if (analysis.urgentEmergency === "overdose") {
    const urgentText = `${fields.name} ${fields.tags} ${fields.description} ${fields.requirements}`;
    const urgentTerms = [
      ["911", 36], ["naloxone", 36], ["narcan", 36], ["overdose", 32],
      ["opioid", 24], ["emergency", 12], ["substance", 10], ["addiction", 10],
      ["recovery", 8], ["detox", 8]
    ];
    urgentTerms.forEach(([term, weight]) => {
      if (urgentText.includes(term)) score += weight;
    });
  } else if (analysis.urgentEmergency === "mental-crisis") {
    const urgentText = `${fields.name} ${fields.tags} ${fields.description} ${fields.requirements}`;
    const urgentTerms = [
      ["988", 36], ["crisis line", 30], ["suicide", 28], ["crisis", 22],
      ["mental health", 20], ["behavioral", 14], ["counsel", 10], ["therapy", 8]
    ];
    urgentTerms.forEach(([term, weight]) => {
      if (urgentText.includes(term)) score += weight;
    });
  }

  if (matchedTokens.size >= 2) score += matchedTokens.size * 3;
  if (analysis.tokens.length > 1 && matchedTokens.size === analysis.tokens.length) score += 10;

  /* Precision guard: once the query expresses a clear service-category intent,
     incidental use of the same word in an unrelated category should not rank
     like an in-category service. Exact names/phrases can still overcome this
     penalty when a cross-category resource is genuinely relevant. */
  const intendedCategories = Object.keys(analysis.categoryScores);
  if (intendedCategories.length && !analysis.categoryScores[resource.category]) {
    score *= 0.4;
  }

  return {resource, score, matchedTokens:[...matchedTokens]};
}

function searchResources(resources, rawQuery, language = "en") {
  const analysis = analyzeSearchQuery(rawQuery, language);
  if (!analysis.tokens.length && !analysis.phraseConcepts.length) {
    return {status:"empty-meaningful", results:[], analysis, scored:[]};
  }

  const scored = (resources || [])
    .map(resource => scoreResourceForQuery(resource, analysis))
    .filter(item => item.score > 0)
    .sort((a,b) => b.score - a.score || String(a.resource.name || "").localeCompare(String(b.resource.name || "")));

  if (!scored.length) return {status:"ok", results:[], analysis, scored:[]};

  const maxScore = scored[0].score;
  let relativeFloor = analysis.hasNarrowPhrase ? 0.46 : 0.25;
  if (!Object.keys(analysis.categoryScores).length) relativeFloor = 0.35;
  const absoluteFloor = analysis.hasNarrowPhrase ? 14 : 8;
  const threshold = Math.max(absoluteFloor, maxScore * relativeFloor);

  const accepted = scored.filter(item => item.score >= threshold);
  return {
    status:"ok",
    results:accepted.map(item => item.resource),
    analysis,
    scored:accepted,
    threshold,
    maxScore
  };
}


/* Escapes text before it is inserted via innerHTML.
   Not a WCAG requirement. Added because every resource field was previously
   interpolated raw; this removes a latent injection path if the directory
   ever accepts submitted listings. */
function esc(s){
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

function prefersReducedMotion(){
  return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* A11Y (4.1.3): dedicated status region.
   Lives permanently in the DOM and is never display:none, so assistive
   technology is always monitoring it. Announces a concise summary only —
   the result cards themselves are revealed separately and are not announced. */
function announce(message){
  const region = document.getElementById("resultsStatus");
  if (!region) return;
  region.textContent = "";
  window.setTimeout(() => { region.textContent = message; }, 120);
}

function renderCard(r) {
  const m = CATEGORY_META[r.category] || {label:r.category,icon:"",badge:"",bar:""};
  const telHref = r.phone ? esc(String(r.phone).replace(/\D/g,"")) : "";

  const phone   = r.phone
    ? `<div class="rc-meta-row"><span class="rc-meta-key">Phone</span><span class="rc-meta-val"><a href="tel:${telHref}">${esc(r.phone)}</a></span></div>` : "";
  const hours   = r.hours
    ? `<div class="rc-meta-row"><span class="rc-meta-key">Hours</span><span class="rc-meta-val">${esc(r.hours)}</span></div>` : "";
  const address = r.address
    ? `<div class="rc-meta-row"><span class="rc-meta-key">Address</span><span class="rc-meta-val">${esc(r.address)}</span></div>` : "";
  const req     = r.requirements
    ? `<div class="rc-req"><strong>What to bring:</strong> ${esc(r.requirements)}</div>` : "";
  /* A11Y: bus route prefixed with a visually hidden label so a screen reader
     does not read the route as a continuation of the address. */
  const bus     = r.busRoute
    ? `<div class="rc-bus">${SVG.bus}<span class="visually-hidden">Bus route: </span>${esc(r.busRoute)}</div>` : "";
  const updated = r.lastVerified
    ? `<div class="rc-updated">Verified ${esc(r.lastVerified)}</div>` : "";

  const noConf  = r.address && !/(confidential|phone only|call for|online|mobile advocacy)/i.test(r.address);

  /* A11Y (2.4.4 / 2.4.9): each action link carries the organisation name in its
     accessible name, so "Call now" repeated 134 times is distinguishable when a
     screen reader lists links out of context. */
  const btnCall = r.phone
    ? `<a href="tel:${telHref}" class="rc-btn rc-btn-primary">${SVG.phone} Call now<span class="visually-hidden"> — ${esc(r.name)}</span></a>` : "";
  const btnWeb  = r.website
    ? `<a href="${esc(r.website)}" target="_blank" rel="noopener" class="rc-btn rc-btn-secondary">${SVG.globe} Website<span class="visually-hidden"> for ${esc(r.name)} (opens in a new tab)</span></a>` : "";
  const btnMap  = noConf
    ? `<a href="https://maps.google.com/?q=${encodeURIComponent(r.address)}" target="_blank" rel="noopener" class="rc-btn rc-btn-secondary">${SVG.map} Directions<span class="visually-hidden"> to ${esc(r.name)} (opens in a new tab)</span></a>` : "";

  /* A11Y: .rc-name is an <h3> so results can be navigated by heading.
     Result section title is <h2>, so h3 is the correct level. */
  return `<article class="resource-card">
    <div class="rc-top-bar ${esc(m.bar)}" aria-hidden="true"></div>
    <div class="rc-body">
      <div class="rc-header">
        <h3 class="rc-name">${esc(r.name)}</h3>
        <span class="rc-badge ${esc(m.badge)}">${esc(m.label)}</span>
      </div>
      <p class="rc-desc">${esc(r.description)}</p>
      <div class="rc-meta">${phone}${hours}${address}</div>
      ${req}${bus}
    </div>
    <div class="rc-footer"><div class="rc-actions">${btnCall}${btnWeb}${btnMap}</div>${updated}</div>
  </article>`;
}

function renderUrgentGuidance(kind) {
  if (kind === "overdose") {
    return `<article class="resource-card" aria-labelledby="overdoseEmergencyTitle">
      <div class="rc-top-bar bar-crisis" aria-hidden="true"></div>
      <div class="rc-body">
        <div class="rc-header">
          <h3 class="rc-name" id="overdoseEmergencyTitle">Possible overdose: call 911 now</h3>
          <span class="rc-badge badge-crisis">Emergency</span>
        </div>
        <p class="rc-desc">If you think you or someone else may be overdosing, call 911 immediately. If naloxone (Narcan) is available, use it according to its instructions.</p>
      </div>
      <div class="rc-footer"><div class="rc-actions">
        <a href="tel:911" class="rc-btn rc-btn-primary">${SVG.phone} Call 911 now</a>
      </div></div>
    </article>`;
  }

  if (kind === "mental-crisis") {
    return `<article class="resource-card" aria-labelledby="mentalCrisisTitle">
      <div class="rc-top-bar bar-crisis" aria-hidden="true"></div>
      <div class="rc-body">
        <div class="rc-header">
          <h3 class="rc-name" id="mentalCrisisTitle">Need immediate mental health crisis support?</h3>
          <span class="rc-badge badge-crisis">Crisis</span>
        </div>
        <p class="rc-desc">Call or text 988 for immediate mental health and suicide crisis support.</p>
      </div>
      <div class="rc-footer"><div class="rc-actions">
        <a href="tel:988" class="rc-btn rc-btn-primary">${SVG.phone} Call 988</a>
        <a href="sms:988" class="rc-btn rc-btn-secondary">Text 988</a>
      </div></div>
    </article>`;
  }

  return "";
}

function showResults(items, title, options = {}) {
  const sec  = document.getElementById("resultsSection");
  const grid = document.getElementById("resultsGrid");
  const ttl  = document.getElementById("resultsTitle");
  const cnt  = document.getElementById("resultsCount");

  const countText = items.length
    ? `${items.length} resource${items.length !== 1 ? "s" : ""} found`
    : "No resources found";

  ttl.textContent = title;
  cnt.textContent = items.length ? countText : "";

  /* A11Y (4.1.3): reveal the region BEFORE populating it.
     Previously innerHTML was set while the section was display:none, so the
     live region was outside the accessibility tree at the moment it changed
     and the update was not reliably announced. */
  sec.hidden = false;
  sec.style.display = "block";

  window.requestAnimationFrame(() => {
    const urgentCard = renderUrgentGuidance(options.urgentEmergency);
    const resultCards = items.length
      ? items.map(renderCard).join("")
      : `<div class="empty-state"><h3>No results found</h3><p>Try a different word, or <a href="#categories">browse all categories</a>.</p><p>If you need help right now, see the <a href="#crisis">emergency help lines</a>.</p></div>`;
    grid.innerHTML = urgentCard + resultCards;

    const urgentAnnouncement = options.urgentEmergency
      ? " Immediate crisis guidance is shown first."
      : "";
    announce(`${countText} for ${title}.${urgentAnnouncement}`);

    /* A11Y (2.3.3): honour reduced-motion for programmatic scrolling.
       Focus is deliberately NOT moved here — the status region carries the
       announcement. #resultsTitle has tabindex="-1" so focus management can
       be enabled later if manual testing shows it helps. */
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    window.setTimeout(() => sec.scrollIntoView({behavior, block:"start"}), 60);
  });
}

function filterCategory(cat) {
  const m = CATEGORY_META[cat] || {label:cat};
  showResults(RESOURCES.filter(r => r.category === cat), m.label);
}

function hideResultsForSearchInstruction() {
  const sec = document.getElementById("resultsSection");
  if (!sec) return;
  sec.style.display = "none";
  sec.hidden = true;
}

function runSearch() {
  const input = document.getElementById("globalSearch");
  const rawQuery = input.value.trim();
  if (!rawQuery) {
    hideResultsForSearchInstruction();
    announce("Enter a need such as food, shelter, doctor, rent, job, recovery, or transportation.");
    input.focus();
    return;
  }

  const search = searchResources(RESOURCES, rawQuery, searchLanguage());
  if (search.status === "empty-meaningful") {
    hideResultsForSearchInstruction();
    announce("Try entering the service you need, for example food, shelter, doctor, rent, job, recovery, or transportation.");
    input.focus();
    return;
  }

  showResults(search.results, `"${rawQuery}"`, {urgentEmergency:search.analysis.urgentEmergency});
}

function clearResults() {
  const sec = document.getElementById("resultsSection");
  sec.style.display = "none";
  sec.hidden = true;
  document.getElementById("globalSearch").value = "";
  announce("Results cleared.");
  /* A11Y (2.4.3): return focus to the search field rather than leaving it on a
     button that has just been removed from the page. */
  const behavior = prefersReducedMotion() ? "auto" : "smooth";
  window.scrollTo({top:0,behavior});
  window.setTimeout(() => document.getElementById("globalSearch").focus(), 200);
}

/* ══ A11Y (2.1.1 / 4.1.2): category list built from native <button> elements.
   Previously <div class="cat-row" onclick="..."> — no tab stop, no role,
   no accessible name, no Enter/Space activation. ══ */
function buildCatList() {
  const counts = {};
  RESOURCES.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });

  const list = document.getElementById("catList");
  if (!list) return;

  list.innerHTML = Object.entries(CATEGORY_META).map(([key,m]) => {
    const n = counts[key] || 0;
    const plural = n !== 1 ? "s" : "";
    return `<button type="button" class="cat-row" data-category="${esc(key)}">
      <span class="cat-row-left">
        <span class="cat-row-icon">${m.icon}</span>
        <span class="cat-row-info">
          <span class="cat-row-name">${esc(m.label)}</span>
          <span class="cat-row-count">${n} resource${plural}</span>
        </span>
      </span>
      <svg class="cat-row-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </button>`;
  }).join("");

  /* Event delegation instead of inline onclick — keeps behaviour out of markup
     and works identically for click, Enter, and Space on a native button. */
  list.addEventListener("click", e => {
    const btn = e.target.closest(".cat-row");
    if (btn && btn.dataset.category) filterCategory(btn.dataset.category);
  });

  const el = document.getElementById("statResources");
  if (el) el.textContent = RESOURCES.length;
}

function initSearchHandlers(){
  const input = document.getElementById("globalSearch");
  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); runSearch(); }
    });
  }
  const btn = document.getElementById("searchBtn");
  if (btn) btn.addEventListener("click", runSearch);

  const clear = document.getElementById("clearBtn");
  if (clear) clear.addEventListener("click", clearResults);

  document.querySelectorAll("[data-filter]").forEach(el => {
    el.addEventListener("click", () => filterCategory(el.dataset.filter));
  });
}

/* Skip-link focus handling and sticky-offset measurement live in site.js,
   which every page loads. Not duplicated here. */

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    SEARCH_LEXICONS,
    normalizeSearchText,
    damerauLevenshtein,
    analyzeSearchQuery,
    scoreResourceForQuery,
    searchResources
  };
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    buildCatList();
    initSearchHandlers();
  });
}
