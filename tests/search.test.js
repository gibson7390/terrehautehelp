/* Search safety regression tests.
   Runs the real searchResources() against the real RESOURCES dataset.
   Open tests/search.test.html in a browser, or run headless (see README note
   at the top of search.test.html). */

const MENTAL = "mental-crisis";
const OVERDOSE = "overdose";
const EMERGENCY = "emergency";

function run(query) {
  const search = searchResources(RESOURCES, query, "en");
  return {
    status: search.status,
    urgent: search.analysis.urgentEmergency,
    urgentAll: search.analysis.urgentEmergencies || (search.analysis.urgentEmergency ? [search.analysis.urgentEmergency] : []),
    crisis: search.analysis.crisisMatches || [],
    routes: search.analysis.routes || {},
    person: search.analysis.person || {sex:null, adult:false},
    minor: search.analysis.explicitMinor ? "explicit" : search.analysis.possibleMinor ? "possible" : "no",
    ids: search.results.map(r => r.id),
    categories: search.results.map(r => r.category)
  };
}

/* Each check returns null on success or a failure message. */
const expect = {
  urgent: kind => r => r.urgent === kind ? null : `urgent guidance ${JSON.stringify(r.urgent)}, expected ${JSON.stringify(kind)}`,
  noCrisisMatch: () => r => r.crisis.length ? `crisis phrase matched: ${r.crisis.join(", ")}` : null,
  first: id => r => r.ids[0] === id ? null : `first result ${r.ids[0] || "(none)"}, expected ${id}`,
  inTop: (id, n) => r => r.ids.slice(0, n).includes(id) ? null : `${id} not in top ${n} (${r.ids.slice(0, n).join(" ") || "no results"})`,
  absent: id => r => r.ids.includes(id) ? `${id} should not be listed` : null,
  firstCategory: cat => r => r.categories[0] === cat ? null : `first result category ${r.categories[0] || "(none)"}, expected ${cat}`,
  topCategories: (cats, n) => r => {
    const bad = r.categories.slice(0, n).filter(c => !cats.includes(c));
    return !r.ids.length ? "no results" : bad.length ? `top ${n} include ${bad.join(", ")}` : null;
  },
  noCategory: cat => r => r.categories.includes(cat) ? `includes ${cat} results (${r.ids.filter((_, i) => r.categories[i] === cat).join(" ")})` : null,
  notOnlyCategory: cat => r => r.ids.length && r.categories.every(c => c === cat) ? `results are ${cat}-only` : null,
  noResults: () => r => r.ids.length ? `expected no results, got ${r.ids.length}` : null,
  urgentList: kinds => r => JSON.stringify(r.urgentAll) === JSON.stringify(kinds) ? null : `urgent guidance ${JSON.stringify(r.urgentAll)}, expected ${JSON.stringify(kinds)}`,
  firstOneOf: ids => r => ids.includes(r.ids[0]) ? null : `first result ${r.ids[0] || "(none)"}, expected one of ${ids.join(" ")}`,
  returned: id => r => r.ids.includes(id) ? null : `${id} not returned`,
  someCategory: (cat, n = Infinity) => r => r.categories.slice(0, n).includes(cat) ? null : `no ${cat} result${n === Infinity ? "" : ` in top ${n}`} (${r.ids.slice(0, Math.min(n, 6)).join(" ")})`,
  anyReturned: ids => r => ids.some(id => r.ids.includes(id)) ? null : `none of ${ids.join(" ")} returned`,
  /* Relative order by resource ID, never by score. */
  aheadOfCategory: (id, cat) => r => {
    const p = r.ids.indexOf(id);
    if (p < 0) return `${id} not returned`;
    const first = r.categories.indexOf(cat);
    return first < 0 || p < first ? null : `${id} at #${p + 1}, after ${r.ids[first]} (#${first + 1}, ${cat})`;
  },
  notAheadOfCategory: (id, cat) => r => {
    const p = r.ids.indexOf(id), first = r.categories.indexOf(cat);
    return p < 0 || first < 0 || p > first ? null : `${id} at #${p + 1} is promoted ahead of every ${cat} result`;
  },
  before: (a, b) => r => {
    const pa = r.ids.indexOf(a), pb = r.ids.indexOf(b);
    if (pa < 0) return `${a} not returned`;
    return pb < 0 || pa < pb ? null : `${a} at #${pa + 1} is not before ${b} at #${pb + 1}`;
  },
  /* Same results in the same order as another query (by resource ID). */
  sameOrderAs: query => r => {
    const other = searchResources(RESOURCES, query, "en").results.map(x => x.id);
    return JSON.stringify(other) === JSON.stringify(r.ids) ? null : `order differs from "${query}": ${r.ids.slice(0, 5).join(" ")} vs ${other.slice(0, 5).join(" ")}`;
  },
  /* The top n results of an independent request all appear here too. */
  includesTopOf: (query, n) => r => {
    const missing = searchResources(RESOURCES, query, "en").results.slice(0, n).map(x => x.id).filter(id => !r.ids.includes(id));
    return missing.length ? `missing ${missing.join(" ")} from the top ${n} of "${query}"` : null;
  },
  urgentIncludes: kind => r => r.urgentAll.includes(kind) ? null : `guidance ${JSON.stringify(r.urgentAll)} lacks ${kind}`,
  urgentExcludes: kind => r => r.urgentAll.includes(kind) ? `guidance ${JSON.stringify(r.urgentAll)} should not include ${kind}` : null,
  anyInTop: (ids, n) => r => ids.some(id => r.ids.slice(0, n).includes(id)) ? null : `none of ${ids.join(" ")} in top ${n} (${r.ids.slice(0, n).join(" ") || "no results"})`,
  /* The sex the search attributes to the person who needs the help. */
  recipientSex: sex => r => r.person.sex === sex ? null : `recipient sex ${JSON.stringify(r.person.sex)}, expected ${JSON.stringify(sex)}`,
  /* How the age of the person who needs help was read: "explicit" (stated
     under 18), "possible" (youth wording, no age) or "no"; and, when given,
     whether that person was read as an adult. */
  ageReading: (minor, adult) => r => r.minor !== minor ? `age read as ${r.minor}, expected ${minor}` :
    adult !== undefined && r.person.adult !== adult ? `person read as adult=${r.person.adult}, expected ${adult}` : null,
  /* None of these listings is returned. */
  noneOf: ids => r => {
    const bad = r.ids.filter(id => ids.includes(id));
    return bad.length ? `should not be listed: ${bad.join(" ")}` : null;
  },
  /* Like everyOffers, but no results at all is also acceptable: nothing
     unrelated may be returned. */
  onlyOffers: (cats, words) => r => {
    const pattern = new RegExp(`\\b(?:${words.join("|")})`, "i");
    const bad = r.ids.filter((id, i) => {
      if (cats.includes(r.categories[i])) return false;
      const x = RESOURCES.find(res => res.id === id);
      return !pattern.test(`${x.name} ${(x.tags || []).join(" ")} ${x.description}`);
    });
    return bad.length ? `unrelated results: ${bad.join(" ")}` : null;
  },
  /* Every returned listing in ids ranks above every returned listing in others. */
  allBefore: (ids, others) => r => {
    const last = Math.max(-1, ...ids.map(id => r.ids.indexOf(id)));
    const firstOther = Math.min(Infinity, ...others.map(id => r.ids.indexOf(id)).filter(i => i >= 0));
    return last < firstOther ? null : `${r.ids[firstOther]} (#${firstOther + 1}) ranks above ${r.ids[last]} (#${last + 1})`;
  },
  /* The top n results are all among ids. */
  topWithin: (ids, n) => r => {
    const off = r.ids.slice(0, n).filter(id => !ids.includes(id));
    return r.ids.length < n ? `only ${r.ids.length} results` : off.length ? `top ${n} include ${off.join(" ")}` : null;
  },
  /* These listings, when returned, are the last ones listed. */
  listedLast: ids => r => {
    const shown = ids.filter(id => r.ids.includes(id));
    const tail = r.ids.slice(r.ids.length - shown.length);
    return shown.every(id => tail.includes(id)) ? null : `${shown.join(" ")} are not the last ${shown.length} results (${tail.join(" ")})`;
  },
  /* The first of ids is returned and ranks above every one of others. */
  anyBefore: (ids, others) => r => {
    const first = list => Math.min(...list.map(id => r.ids.indexOf(id)).filter(i => i >= 0));
    const p = first(ids), q = first(others);
    if (!isFinite(p)) return `none of ${ids.join(" ")} returned`;
    return !isFinite(q) || p < q ? null : `${r.ids[q]} (#${q + 1}) ranks above ${r.ids[p]} (#${p + 1})`;
  },
  categoryBefore: (a, b) => r => {
    const pa = r.categories.indexOf(a), pb = r.categories.indexOf(b);
    if (pa < 0) return `no ${a} result`;
    return pb < 0 || pa < pb ? null : `first ${b} result (#${pb + 1}) ranks above first ${a} result (#${pa + 1})`;
  },
  /* Every result shows evidence of the requested service: it is in one of
     these categories, or its own text names one of these words. */
  everyOffers: (cats, words) => r => {
    const pattern = new RegExp(`\\b(?:${words.join("|")})`, "i");
    const bad = r.ids.filter((id, i) => {
      if (cats.includes(r.categories[i])) return false;
      const x = RESOURCES.find(res => res.id === id);
      return !pattern.test(`${x.name} ${(x.tags || []).join(" ")} ${x.description}`);
    });
    return !r.ids.length ? "no results" : bad.length ? `no evidence of the service: ${bad.join(" ")}` : null;
  },
  safetyRoute: kind => r => (r.routes.safety || null) === kind ? null : `safety route ${JSON.stringify(r.routes.safety || null)}, expected ${JSON.stringify(kind)}`,
  busRoute: wanted => r => !!r.routes.bus === wanted ? null : `bus-page link ${r.routes.bus ? "offered" : "not offered"}`,
  categoryCount: (cat, min) => r => r.categories.filter(c => c === cat).length >= min ? null : `only ${r.categories.filter(c => c === cat).length} ${cat} results, expected at least ${min}`,
  status: s => r => r.status === s ? null : `status ${r.status}, expected ${s}`
};

/* Top two were previously asserted only as "Crisis category". That proxy
   was replaced (second review) by the resources that are actually relevant:
   the crisis line, Hamilton Center's crisis intervention (health-001), or
   CODA's 24/7 crisis support, which held #2 before. */
const mentalCrisis = [
  expect.urgent(MENTAL), expect.first("crisis-001"),
  expect.noCategory("pet"), r => {
    const off = r.ids.slice(0, 2).filter(id => !["crisis-001","health-001","crisis-002"].includes(id));
    return off.length ? `top 2 include ${off.join(" ")}` : null;
  }
];
const domestic = [
  expect.first("crisis-002"), expect.inTop("housing-001", 5),
  expect.noCategory("pet"), expect.absent("senior-003")
];
/* 2026-11 accuracy patch: these checks required crisis-004 ("Terre Haute
   CARES") first. That listing was withheld because no source confirms the
   program, its phone number or its naloxone claim. The 911 overdose guidance
   is still required. The first listing under it is now recovery-016, the
   statewide naloxone map and kit-request listing read from Overdose Lifeline
   and the Indiana Department of Health (its text begins "For an overdose
   happening now, call 911"). Any other listings must be crisis, recovery or
   health services, never emergency funds (crisis-003) or the general help line. */
const overdose = [
  expect.urgent(OVERDOSE), expect.first("recovery-016"), expect.noCategory("pet"), expect.absent("crisis-003"), expect.absent("crisis-005"),
  r => {
    const bad = r.ids.filter((_, i) => !["crisis", "recovery", "health"].includes(r.categories[i]));
    return bad.length ? `unrelated listings under overdose guidance: ${bad.join(" ")}` : null;
  }
];
const notHumanCrisis = [expect.noCrisisMatch(), expect.urgent(null)];
/* Clinical providers, by their own listings: Hamilton Center ("substance use
   treatment"), Harsha ("detox and dual-diagnosis treatment"), WIN Recovery
   (opioid treatment "with counseling"). Residential programs are the listings
   tagged sober living, recovery housing or transitional housing. */
const CLINICAL = ["health-001", "recovery-015", "recovery-014"];
const RESIDENTIAL = ["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-007",
  "recovery-008", "recovery-011", "recovery-012", "recovery-013"];
/* Listings whose own text limits them to adults ("Must be 18 or older", "for adult males", "for adults"). */
const ADULTS_ONLY_RECOVERY = ["recovery-014", "recovery-013", "recovery-002"];

const CASES = [
  /* Crisis recognition — audit failures */
  ["i want to die", mentalCrisis],
  ["i want to kill myself", mentalCrisis],
  ["cutting myself", mentalCrisis],
  ["self harm", mentalCrisis],
  ["self-harm", mentalCrisis],
  ["I WANT TO DIE!!", mentalCrisis],
  ["my boyfriend hits me", domestic],
  ["i dont feel safe at home", domestic],
  ["i don't feel safe at home", domestic],
  ["he od", overdose],
  ["someone overdosed", overdose],

  /* Crisis recognition — existing behaviour preserved */
  ["suicide", mentalCrisis],
  ["sucide", mentalCrisis],
  ["overdose", overdose],
  ["panic attack", [expect.urgent(MENTAL), expect.noCategory("pet")]],
  ["domestic violence", domestic],

  /* Context: single words must not trigger human self-harm guidance */
  ["my dog died", [...notHumanCrisis, expect.firstCategory("pet")]],
  ["cutting hair classes", [...notHumanCrisis, expect.absent("crisis-001")]],
  ["safe driving course", [...notHumanCrisis, expect.absent("crisis-001"), expect.absent("crisis-002")]],
  ["die", [...notHumanCrisis, expect.noCategory("pet")]],
  ["od", notHumanCrisis],

  /* Typo correction */
  ["food", [expect.urgent(null), expect.topCategories(["food"], 10), expect.inTop("food-001", 12)]],
  ["fud", [expect.urgent(null), expect.topCategories(["food"], 10), expect.inTop("food-001", 12)]],
  ["i ned fud", [expect.status("ok"), expect.topCategories(["food"], 10), expect.inTop("food-001", 12)]],
  ["fod pantrey", [expect.topCategories(["food"], 8), expect.inTop("food-003", 3)]],
  ["sober houes", [expect.topCategories(["recovery"], 10), expect.noCategory("pet")]],
  ["homless", [expect.topCategories(["housing"], 3), expect.inTop("housing-002", 3)]],
  ["shleter", [expect.topCategories(["housing"], 3), expect.inTop("housing-001", 3)]],
  ["docter", [expect.topCategories(["health"], 5)]],
  /* (2026-11 accuracy patch: three immigration listings remain after the
     unverified DACA listing immigration-001 was withheld; Indiana Legal
     Services' immigration center, verified, is immigration-004 and legal-011) */
  ["imigration", [expect.topCategories(["immigration"], 3), expect.first("immigration-004"), expect.returned("legal-011")]],
  ["employmint", [expect.topCategories(["employment"], 5)]],
  ["papers to stay in the country", [
    expect.noCategory("pet"), expect.firstCategory("immigration"), expect.inTop("immigration-004", 3)
  ]],
  ["i need help with my papers to stay in the country", [
    expect.noCategory("pet"), expect.firstCategory("immigration")
  ]],

  /* Cross-category and edge cases */
  /* (2026-11 accuracy patch: this required housing-004 first. That listing
     named an agency that does not serve Vigo County and a rental-assistance
     program the local agency does not document, so it was withheld. The
     Harrison Township Trustee documents rent help and must be in the top two.) */
  ["cant pay rent", [
    expect.urgent(null), expect.inTop("financial-013", 2),
    expect.inTop("housing-003", 5), expect.noCategory("pet")
  ]],
  ["zxqv blorpt", [expect.status("ok"), expect.noResults(), expect.urgent(null)]],

  /* Review findings (Codex): false positives, each paired with a genuine match */
  ["my friend is odd", [expect.urgent(null), expect.absent("crisis-004")]],
  ["odd jobs", [expect.urgent(null), expect.absent("crisis-004")]],
  ["he od'd on fentanyl", overdose],
  ["i want to die and my friend is odd", [expect.urgentList([MENTAL]), expect.first("crisis-001"), expect.noCategory("pet")]],
  ["my friend is odd and i want to die", [expect.urgentList([MENTAL]), expect.first("crisis-001"), expect.noCategory("pet")]],
  ["she hit me up", [expect.urgent(null), expect.absent("crisis-002")]],
  ["she hit me up about a job", [expect.urgent(null), expect.absent("crisis-002"), expect.firstCategory("employment")]],
  ["he hit me", domestic],
  ["cutting myself a piece of cake", [expect.urgent(null), expect.absent("crisis-001")]],
  ["this homework is killing me", [expect.urgent(null), expect.absent("crisis-001"), expect.inTop("education-008", 3)]],

  /* Review findings: context words inside a crisis phrase must survive */
  ["he hits my children", [
    expect.firstOneOf(["crisis-002","children-006"]), expect.inTop("children-006", 3),
    expect.returned("housing-001"), expect.noCategory("pet")
  ]],
  ["my children od and need shelter and transportation", [
    expect.urgent(OVERDOSE), expect.someCategory("housing"), expect.someCategory("transportation")
  ]],

  /* Review findings: mixed urgent needs keep every explicit need */
  ["someone overdosed and i want to die and i need food pantry", [
    expect.urgentList([OVERDOSE, MENTAL]), expect.returned("crisis-001"),
    expect.anyReturned(["food-008","food-009","food-010","food-011","food-012"])
  ]],
  ["i want to die and someone overdosed", [expect.urgentList([OVERDOSE, MENTAL])]],
  /* (2026-11 accuracy patch: crisis-004 withheld, see `overdose` above; every
     stated need is still required, and emergency funds must not appear) */
  ["someone overdosed and need food pantry and shelter and transportation", [
    expect.urgent(OVERDOSE), expect.someCategory("food"),
    expect.someCategory("housing"), expect.someCategory("transportation"), expect.absent("crisis-003")
  ]],

  /* Second review: genuine crisis phrases with ordinary continuations */
  ["i am cutting myself while alone", mentalCrisis],
  ["i want to kill myself over this", mentalCrisis],
  ["i self harmed", mentalCrisis],
  ["i self-harmed last night", mentalCrisis],
  ["i keep cutting myself on purpose", mentalCrisis],
  /* ...and complete benign contexts, alone and alongside a genuine phrase */
  ["i cut myself shaving", [expect.urgent(null), expect.absent("crisis-001")]],
  ["i burned myself cooking dinner", [expect.urgent(null), expect.absent("crisis-001")]],
  ["killing myself laughing", [expect.urgent(null), expect.absent("crisis-001")]],
  ["cutting myself a piece of cake but i want to die", mentalCrisis],
  ["i cut myself shaving and i keep cutting myself on purpose", mentalCrisis],
  /* Relationship-ending language vs self-harm */
  ["i want to end it with my boyfriend and start dating other people", [expect.urgent(null), expect.absent("crisis-001")]],
  ["i want to end things with my husband", [expect.urgent(null), expect.absent("crisis-001")]],
  ["i want to end it all", mentalCrisis],
  ["i want to end it with my boyfriend because i want to die", mentalCrisis],

  /* Emergency-specific resources rank before routine help; other needs stay */
  ["someone overdosed and i want to die and i need food pantry", [
    expect.aheadOfCategory("crisis-001", "food"),
    expect.notAheadOfCategory("crisis-003", "food"), expect.notAheadOfCategory("crisis-005", "food"),
    expect.notAheadOfCategory("crisis-008", "food"), expect.someCategory("food")
  ]],
  ["i want to die and need food pantry", [
    expect.urgentList([MENTAL]), expect.aheadOfCategory("crisis-001", "food"),
    expect.notAheadOfCategory("crisis-003", "food"), expect.someCategory("food")
  ]],

  /* Conservative typo support */
  ["homles", [expect.inTop("housing-002", 3), expect.topCategories(["housing"], 3)]],
  ["reab", [expect.status("ok"), expect.noResults()]],

  /* Weak / category-only matches */
  ["leaving abuse with my kids", [
    expect.firstOneOf(["crisis-002","children-006"]), expect.returned("housing-001"), expect.absent("crisis-004")
  ]],
  ["i lost my id", [expect.absent("financial-015"), expect.anyReturned(["employment-008","other-003"])]],
  ["Lost Creek", [expect.first("financial-015")]],
  ["welding classes", [expect.first("employment-004"), expect.before("employment-004", "children-005")]],
  ["cna classes", [expect.first("employment-004"), expect.before("employment-004", "children-005")]],
  ["transportation", [expect.categoryCount("transportation", 7)]],  /* 7 since transport-004 was withheld (2026-11 accuracy patch) */
  ["shelter", [expect.categoryCount("housing", 5)]],
  ["food", [expect.categoryCount("food", 10)]],

  /* Affordability among relevant results */
  ["free sober living", [
    expect.first("recovery-012"), expect.before("recovery-012", "recovery-002"),
    /* recovery-010 (Club Soda, no cost documented) withheld 2026-11; Phoenix
       House and Roadways to Recovery document no cost either */
    expect.before("recovery-007", "recovery-002"), expect.before("recovery-003", "recovery-004")
  ]],

  /* Third review: clause boundaries. A benign span excludes only itself. */
  ["I cut myself. A piece of me wants to die", mentalCrisis],
  ["i keep cutting myself a piece of me dies every time", mentalCrisis],
  ["I burned myself cooking. I want to die", mentalCrisis],
  ["I want to die. I burned myself cooking", mentalCrisis],
  ["i cut myself shaving. i cut myself on purpose", mentalCrisis],
  ["i cut myself on purpose, i also cut myself shaving", mentalCrisis],
  ["I want to end it. With my boyfriend gone there is no reason to live", mentalCrisis],
  ["i want to end it with my boyfriend; i want to end my life", mentalCrisis],
  ["I cut myself shaving!!!", [expect.urgent(null), expect.absent("crisis-001")]],
  ["cutting myself a piece of cake, then cutting myself a piece of pie", [expect.urgent(null), expect.absent("crisis-001")]],
  ["i want to end it with my boyfriend.", [expect.urgent(null), expect.absent("crisis-001")]],

  /* Fourth review: genuine crisis phrases span ellipses and line breaks
     (Codex's exact reproductions)... */
  ["i want to...die", mentalCrisis],
  ["i want to\ndie", mentalCrisis],
  ["i want to kill...myself", mentalCrisis],
  ["i am cutting...myself", mentalCrisis],
  ["he\nod", overdose],
  ["i want to…die", mentalCrisis],
  ["i want to\r\ndie", mentalCrisis],
  /* ...while benign exclusions still stop at those same breaks, in both orders */
  ["I cut myself shaving...i want to\ndie", mentalCrisis],
  ["i want to...die. I cut myself shaving", mentalCrisis],
  ["I burned myself cooking\nI want to kill...myself", mentalCrisis],
  ["I want to kill...myself\nI burned myself cooking", mentalCrisis],
  ["I cut myself...a piece of cake", mentalCrisis],
  ["I cut myself\na piece of me wants to die", mentalCrisis],
  ["I cut myself shaving...", [expect.urgent(null), expect.absent("crisis-001")]],
  ["i burned myself cooking dinner\n", [expect.urgent(null), expect.absent("crisis-001")]],
  ["cutting myself a piece of cake... cutting myself a piece of pie", [expect.urgent(null), expect.absent("crisis-001")]],

  /* "opioid" alone is not acute-emergency evidence; cost never outranks acute help */
  ["someone overdosed and need food pantry", [
    expect.urgent(OVERDOSE), expect.notAheadOfCategory("recovery-014", "food"), expect.someCategory("food", 3), expect.absent("crisis-003")
  ]],
  ["someone overdosed need free help", overdose],

  /* Separate needs vs qualifiers
     (2026-11 accuracy patch: transport-004, a "volunteer driver program" the
     named agency does not document, was withheld) */
  ["ride to the food pantry", [
    expect.someCategory("transportation", 3), expect.someCategory("food", 3)
  ]],
  ["food for my kids", [
    expect.anyReturned(["food-005","food-004"]), r => ["food-005","food-004"].some(id => r.ids.slice(0, 5).includes(id)) ? null : "no child-focused food help in top 5",
    expect.absent("children-009"), expect.absent("children-002"), expect.absent("children-003"),
    expect.absent("children-010"), expect.absent("children-001")
  ]],
  ["kids", [expect.categoryCount("children", 5)]],
  ["need food and shelter tonight", [expect.someCategory("food", 4), expect.someCategory("housing", 4)]],

  /* Organization names and documented affiliations */
  ["Mental Health America", [r => ["health-005","financial-016"].every(id => r.ids.slice(0, 2).includes(id)) ? null : `top 2 are ${r.ids.slice(0, 2).join(" ")}`]],
  ["Hamilton Center", [r => {
    const hamilton = ["health-001","crisis-001","crisis-008","financial-006","employment-003","children-005","recovery-013"];
    const off = r.ids.slice(0, 5).filter(id => !hamilton.includes(id));
    return off.length ? `non-Hamilton listings in top 5: ${off.join(" ")}` : null;
  }]],
  ["Wabash Valley Health Center", [expect.first("health-007")]],

  /* Fifth review: negation applies only to the cost statement itself
     (Codex's exact reproduction, beside genuine negations). */
  ["i dont drink and need free sober living", [
    expect.first("recovery-012"), expect.before("recovery-012", "recovery-002"), expect.before("recovery-012", "recovery-004")
  ]],
  ["free sober living", [expect.first("recovery-012")]],
  ["sober living does not have to be free", [expect.sameOrderAs("sober living")]],
  ["housing does not have to be free", [expect.sameOrderAs("housing")]],
  ["housing doesnt need to be free", [expect.sameOrderAs("housing")]],

  /* Fifth review: immediate emergencies get the site's general emergency
     guidance (not overdose-specific, no inferred intent)... */
  ["he is not breathing", [expect.urgentList([EMERGENCY]), expect.status("ok")]],
  ["she took too many pills", [expect.urgentList([EMERGENCY]), expect.status("ok")]],
  ["my baby stopped breathing", [expect.urgentList([EMERGENCY])]],
  ["he isnt breathing", [expect.urgentList([EMERGENCY])]],
  ["someone overdosed and is not breathing", [expect.urgentList([OVERDOSE, EMERGENCY]), expect.absent("crisis-003")]],
  ["she took too many pills and i want to die", [expect.urgentList([EMERGENCY, MENTAL])]],
  /* ...and ordinary expressions with the same words do not */
  ["breathing exercises for stress", [expect.urgent(null)]],
  ["breathing treatment for asthma", [expect.urgent(null)]],
  ["too many pills to keep track of", [expect.urgent(null)]],
  ["i took too many classes", [expect.urgent(null)]],
  ["not breathing room in my budget", [expect.urgent(null)]],

  /* Sixth review (Codex's exact reproductions): modifiers and denials
     belong to their own statement... */
  ["i am not breathing hard after exercise", [expect.urgent(null)]],
  ["he is not breathing heavily anymore", [expect.urgent(null)]],
  ["i did not take too many pills", [expect.urgent(null)]],
  ["i take too many pills to keep track of", [expect.urgent(null)]],
  ["i never took too many pills", [expect.urgent(null)]],
  /* ...and never cancel a separate genuine emergency, in either order,
     across punctuation and line breaks */
  /* (No directory listing describes these, so guidance stands alone: the
     denied or ordinary statement must not pull in unrelated listings.) */
  ["i am not breathing hard after exercise. he is not breathing", [expect.urgentList([EMERGENCY]), expect.status("ok"), expect.noResults()]],
  ["he is not breathing, i am not breathing hard after exercise", [expect.urgentList([EMERGENCY]), expect.status("ok"), expect.noResults()]],
  ["he is not breathing heavily anymore; she took too many pills", [expect.urgentList([EMERGENCY]), expect.noResults()]],
  ["she took too many pills... he is not breathing heavily anymore", [expect.urgentList([EMERGENCY]), expect.noResults()]],
  ["i did not take too many pills\nshe took too many pills", [expect.urgentList([EMERGENCY]), expect.noResults()]],
  ["i did not take too many pills. she took too many pills", [expect.urgentList([EMERGENCY]), expect.noResults()]],
  ["she took too many pills. i did not take too many pills", [expect.urgentList([EMERGENCY]), expect.noResults()]],
  ["i take too many pills to keep track of\nhe is not breathing", [expect.urgentList([EMERGENCY])]],
  ["he is not breathing! i take too many pills to keep track of", [expect.urgentList([EMERGENCY])]],
  ["he is not breathing\nhard to tell if he has a pulse", [expect.urgentList([EMERGENCY])]],

  /* Seventh review: an excluded benign statement removes only its own word
     positions; the same word in a separate request keeps its results
     (Codex's exact dinner reproduction, plus breakfast/lunch, both orders). */
  ["i need dinner tonight", [expect.returned("food-006"), expect.urgent(null)]],
  ["i burned myself cooking dinner. i need dinner tonight", [expect.urgent(null), expect.sameOrderAs("i need dinner tonight")]],
  ["i need dinner tonight. i burned myself cooking dinner", [expect.urgent(null), expect.sameOrderAs("i need dinner tonight")]],
  ["i need breakfast", [expect.returned("food-006")]],
  ["i burned myself cooking breakfast, i need breakfast", [expect.urgent(null), expect.sameOrderAs("i need breakfast")]],
  ["i need breakfast\ni burned myself cooking breakfast", [expect.urgent(null), expect.sameOrderAs("i need breakfast")]],
  ["i need lunch", [expect.anyReturned(["food-007", "food-003", "food-005"])]],
  ["i cut myself cooking lunch; i need lunch", [expect.urgent(null), expect.sameOrderAs("i need lunch")]],
  ["i need lunch... i cut myself cooking lunch", [expect.urgent(null), expect.sameOrderAs("i need lunch")]],

  /* Seventh review: witnessed and explicitly ongoing ingestion are acute
     (Codex's exact reproductions); guidance with no unrelated listings. */
  ["i just saw her take too many pills", [expect.urgentList([EMERGENCY]), expect.noResults()]],
  ["she is swallowing too many pills right now", [expect.urgentList([EMERGENCY]), expect.noResults()]],
  ["i watched him swallow too many pills", [expect.urgentList([EMERGENCY]), expect.noResults()]],
  ["he is taking too many pills right now", [expect.urgentList([EMERGENCY]), expect.noResults()]],
  /* Routine medication management is not acute, and "take" alone does not
     find a food pantry's "take-home boxes"... */
  ["i take too many pills to keep track of", [expect.urgent(null), expect.noCategory("food")]],
  ["my mom is taking too many pills and cant keep track", [expect.urgent(null), expect.noCategory("food")]],
  /* ...while a separate food request in the same query still finds food */
  ["i take too many pills to keep track of. i need food", [expect.urgent(null), expect.someCategory("food", 3)]],
  ["i need food. i take too many pills to keep track of", [expect.urgent(null), expect.someCategory("food", 3)]],
  /* Denials are unchanged */
  ["i did not take too many pills", [expect.urgent(null)]],

  /* Eighth review: words inside a crisis phrase are excluded only at that
     phrase's positions (Codex's exact reproductions, both orders). */
  ["i need in home care", [expect.returned("senior-003")]],
  ["i dont feel safe at home. i need in home care", [
    expect.inTop("crisis-002", 3), expect.returned("housing-001"), expect.returned("senior-003")
  ]],
  ["i need in home care. i dont feel safe at home", [
    expect.inTop("crisis-002", 3), expect.returned("housing-001"), expect.returned("senior-003")
  ]],
  /* Repeated words across a crisis phrase and an independent request,
     both orders, punctuation and line-break variants */
  ["i dont feel safe at home, i need in home care", [expect.inTop("crisis-002", 3), expect.returned("senior-003")]],
  ["i need in home care\ni dont feel safe at home", [expect.inTop("crisis-002", 3), expect.returned("senior-003")]],
  ["i dont feel safe at home... i need home delivered meals", [expect.inTop("crisis-002", 3), expect.includesTopOf("i need home delivered meals", 1)]],
  ["i need home delivered meals; i dont feel safe at home", [expect.inTop("crisis-002", 3), expect.includesTopOf("i need home delivered meals", 1)]],
  ["i want to end my life. i need life skills training", [expect.urgentList([MENTAL]), expect.first("crisis-001"), expect.includesTopOf("i need life skills training", 1)]],
  ["i need life skills training. i want to end my life", [expect.urgentList([MENTAL]), expect.first("crisis-001"), expect.includesTopOf("i need life skills training", 1)]],
  /* Alignment: spaced digits ("2 1 1" → "211") before the crisis phrase */
  ["call 2 1 1. i dont feel safe at home. i need in home care", [
    expect.returned("crisis-005"), expect.returned("crisis-002"), expect.returned("senior-003")
  ]],
  /* A crisis phrase alone still excludes its ordinary words ("safe at home" ≠ in-home care) */
  ["i dont feel safe at home", [expect.first("crisis-002"), expect.absent("senior-003")]],

  /* First holdout run (now regression): typo correction keeps ordinary
     words. Negatives across unrelated categories... */
  ["he put his hands on me again", [expect.firstOneOf(["crisis-002","children-006","legal-006"]), expect.returned("housing-001"), expect.noCategory("pet")]],
  ["need to print some papers", [expect.first("digital-001"), expect.absent("children-005")]],
  ["get rid of bed bugs", [expect.noCategory("transportation")]],
  ["i just need to rant", [expect.noCategory("housing"), expect.noCategory("financial")]],
  ["my shopping cart broke", [expect.noCategory("transportation")]],
  ["the pot is broken", [expect.noCategory("pet")]],
  ["can you put me in touch with someone", [expect.noCategory("pet")]],
  /* ...while established, unambiguous typo support still works */
  ["fud", [expect.topCategories(["food"], 3)]],
  ["fod pantrey", [expect.topCategories(["food"], 3)]],
  ["shleter", [expect.topCategories(["housing"], 3)]],
  ["docter", [expect.topCategories(["health"], 3)]],
  ["preshool", [expect.first("education-002")]],
  ["sobor living", [expect.topCategories(["recovery"], 3)]],
  ["dentel", [expect.first("health-007")]],

  /* Disclosed abuse, paired with ordinary "hands" wording */
  ["she put her hands on my kids", [expect.firstOneOf(["crisis-002","children-006"]), expect.noCategory("pet")]],
  ["he put his hands on the table", [expect.urgent(null), expect.absent("crisis-002")]],
  ["hands on job training", [expect.absent("crisis-002")]],
  /* Indirect distress: support offered (988 card), not an emergency claim */
  ["i dont see the point in going on", [expect.urgentList([MENTAL]), expect.first("crisis-001")]],
  ["thinking of ending things", [expect.urgentList([MENTAL]), expect.first("crisis-001")]],
  ["thinking of ending things with my girlfriend", [expect.urgent(null), expect.absent("crisis-001")]],
  ["i dont see the point in going on this trip", [expect.urgent(null)]],
  ["i dont see the point in going on. i need food", [expect.urgentList([MENTAL]), expect.someCategory("food")]],
  /* Unresponsive person: general emergency guidance; no overdose inferred */
  ["my roommate isnt waking up after using", [expect.urgentList([EMERGENCY]), expect.noCategory("food"), expect.noCategory("education")]],
  ["he is unresponsive", [expect.urgentList([EMERGENCY])]],
  ["i cant wake him up", [expect.urgentList([EMERGENCY])]],
  ["my son wont wake up for school", [expect.urgent(null)]],
  ["i cant wake up early", [expect.urgent(null)]],
  /* Large ingestion: emergency guidance; no overdose card. Corrected after
     independent review: "on purpose" establishes deliberate ingestion, not
     suicidal intent, so the 988 card is no longer required for it. */
  ["i took a bunch of my pills on purpose", [expect.urgentIncludes(EMERGENCY), expect.urgentExcludes(OVERDOSE), expect.noCategory("food")]],
  ["she swallowed a whole bottle of pills", [expect.urgentList([EMERGENCY])]],
  ["i took a bunch of my pills on purpose. i need food", [expect.urgentIncludes(EMERGENCY), expect.someCategory("food")]],

  /* Independent review (Codex's exact reproductions)
     1. A location does not cancel an unresponsive-person emergency... */
  ["my roommate isnt waking up in the bathroom", [expect.urgentList([EMERGENCY]), expect.noCategory("food"), expect.noCategory("recovery")]],
  ["my roommate isnt waking up on the floor", [expect.urgentList([EMERGENCY]), expect.noCategory("food"), expect.noCategory("recovery")]],
  ["i cant wake him up on the couch", [expect.urgentList([EMERGENCY])]],
  ["she is not responding in her room", [expect.urgentList([EMERGENCY])]],
  /* ...while complete routine-waking contexts stay ordinary */
  ["my son wont wake up for school", [expect.urgent(null)]],
  ["he isnt waking up in the morning", [expect.urgent(null)]],
  ["she wont wake up on time", [expect.urgent(null)]],
  ["i cant wake him up in time for work", [expect.urgent(null)]],
  /* 2. An ordinary request after distress keeps the support AND the service... */
  ["i dont see the point in going on and i need food", [expect.urgentList([MENTAL]), expect.returned("crisis-001"), expect.someCategory("food")]],
  ["thinking of ending things and need shelter", [expect.urgentList([MENTAL]), expect.returned("crisis-001"), expect.someCategory("housing")]],
  ["i need food and i dont see the point in going on", [expect.urgentList([MENTAL]), expect.returned("crisis-001"), expect.someCategory("food")]],
  ["i need shelter and im thinking of ending things", [expect.urgentList([MENTAL]), expect.returned("crisis-001"), expect.someCategory("housing")]],
  /* ...while ordinary contexts with the same words stay ordinary */
  ["thinking of ending things with my girlfriend and need shelter", [expect.urgent(null), expect.someCategory("housing")]],
  ["i dont see the point in going on this trip and i need food", [expect.urgent(null), expect.someCategory("food")]],
  /* 3. Deliberate medication use is not self-harm; excessive ingestion is an emergency */
  ["i took my prescribed pills on purpose", [expect.urgent(null), expect.absent("crisis-001")]],
  ["i took my pills on purpose", [expect.urgent(null)]],
  ["i took too many pills on purpose", [expect.urgentIncludes(EMERGENCY)]],
  ["i took my pills on purpose to hurt myself", [expect.urgentIncludes(MENTAL)]],
  ["i took too many pills to kill myself", [expect.urgentIncludes(EMERGENCY), expect.urgentIncludes(MENTAL)]],
  ["i take a bunch of pills every day", [expect.urgent(null)]],
  ["i took my pills on time", [expect.urgent(null)]],
  ["i did not take a bunch of pills", [expect.urgent(null)]],

  /* Retrieval where the dataset offers the service */
  ["cant afford to bury my brother", [expect.anyInTop(["financial-008","financial-002"], 2)]],
  ["fridge is empty", [expect.topCategories(["food"], 3)]],
  ["my gums are bleeding", [expect.inTop("health-007", 3)]],
  ["anxiety is really bad", [expect.anyInTop(["health-001","health-004","health-005","crisis-001"], 3)]],
  ["out of kibble for my pup", [expect.first("pet-001")]],
  ["been using and want to stop", [expect.topCategories(["recovery","health","crisis"], 3), expect.noCategory("senior")]],
  ["safe deposit box", [expect.noCategory("food")]],
  ["need my blood pressure checked for free", [expect.firstCategory("health"), expect.categoryBefore("health", "housing")]],

  /* Restored cost negation */
  ["sober living no need for it to be free", [expect.sameOrderAs("sober living")]],

  /* Feeding intent: the object being fed decides the service */
  ["cant afford to feed my dog", [expect.first("pet-001"), expect.before("pet-001", "pet-002"), expect.noCategory("food")]],
  ["cant afford to feed my cat", [expect.first("pet-001"), expect.noCategory("food")]],
  ["need help feeding my pets", [expect.first("pet-001"), expect.noCategory("food")]],
  ["cant afford to feed my kids", [expect.firstCategory("food"), expect.noCategory("pet")]],
  ["cant afford to feed my family", [expect.firstCategory("food"), expect.noCategory("pet")]],
  ["my dog is sick", [expect.first("pet-002"), expect.noCategory("food")]],
  ["dog", [expect.noCategory("food")]],
  ["Light House Mission", [r => ["food-006","housing-002"].every(id => r.ids.slice(0, 2).includes(id)) ? null : `top 2 are ${r.ids.slice(0, 2).join(" ")}`]],

  /* Conservative spelling repairs */
  ["veternarian", [expect.first("pet-002")]],
  ["rentle assistance", [expect.first("housing-003"), expect.inTop("financial-013", 2)]],  /* housing-004 withheld: one housing listing documents rent help, then the trustee */
  ["pre school", [expect.first("education-002")]],
  ["free compter", [expect.first("digital-001")]],

  /* Gas cards / vouchers are one service across categories */
  ["gas voucher", [expect.first("transport-005"), expect.noCategory("housing")]],  /* employment-006 withheld (2026-11 accuracy patch) */
  ["gas card", [expect.returned("transport-005")]],
  ["help", [expect.status("empty-meaningful"), expect.urgent(null)]],
  ["food pantry", [expect.topCategories(["food"], 10), expect.notOnlyCategory("pet")]],

  /* Usability update. Equivalent conversational requests give the same help:
     filler ("really", "some", "just") and the request verb in "could use"
     are not search terms, so they cannot add substance-use listings. */
  ["i need food", [expect.sameOrderAs("food")]],
  ["i really could use some food", [expect.sameOrderAs("food"), expect.noCategory("recovery"), expect.noCategory("health")]],
  ["i could really use some food today", [expect.sameOrderAs("food")]],
  ["please i just need some food", [expect.sameOrderAs("food")]],
  ["i really could use some food", [expect.everyOffers(["food"], ["food", "meal", "meals", "pantry", "snap", "wic"])]],
  /* Qualifiers and further needs still count */
  ["i could really use some food for my kids", [expect.sameOrderAs("food for my kids"), expect.firstCategory("food")]],
  ["i could use some pet food", [expect.sameOrderAs("pet food"), expect.first("pet-001")]],
  ["i could really use some food and a ride", [expect.someCategory("food", 3), expect.someCategory("transportation", 3), expect.noCategory("recovery")]],
  ["i could use some help with recovery and some food", [expect.someCategory("recovery", 3), expect.someCategory("food", 3)]],
  /* The same across other everyday needs */
  ["i could really use somewhere to sleep", [expect.sameOrderAs("somewhere to sleep"), expect.noCategory("recovery"), expect.noCategory("health")]],
  ["i could use some help with rent", [expect.sameOrderAs("help with rent")]],
  ["i really could use a ride to the doctor", [expect.sameOrderAs("ride to the doctor"), expect.returned("transport-002")]],
  ["i really need a doctor", [expect.sameOrderAs("doctor")]],
  ["i could really use some dental care", [expect.sameOrderAs("dental care")]],
  /* "use" keeps its meaning outside the request verb */
  ["drug use", [expect.someCategory("recovery", 3)]],
  ["help with my substance use", [expect.anyInTop(["health-001","health-004","recovery-013","recovery-014","recovery-015"], 5)]],
  ["i could use help with my drug use", [expect.someCategory("recovery", 3)]],

  /* Somewhere safe: shelter results at once, without assuming gender,
     addiction or abuse, plus optional narrowing routes. */
  ["where can i find somewhere safe to go", [expect.urgent(null), expect.safetyRoute("place"), expect.returned("housing-002"),
    expect.firstOneOf(["housing-002","food-006","housing-006"]), expect.absent("recovery-007"), expect.noCategory("recovery")]],
  ["i need some somewhere safe to go", [expect.sameOrderAs("where can i find somewhere safe to go"), expect.safetyRoute("place")]],
  ["i need a safe place to stay tonight", [expect.safetyRoute("place"), expect.returned("housing-002"), expect.noCategory("recovery")]],
  ["safe", [expect.urgent(null), expect.safetyRoute("word")]],
  ["safety", [expect.urgent(null), expect.safetyRoute("word")]],
  ["safe driving course", [expect.safetyRoute(null), expect.noCategory("housing")]],
  ["safe deposit box", [expect.safetyRoute(null), expect.noCategory("housing")]],
  ["safe sleep for babies", [expect.safetyRoute(null)]],
  /* Explicit danger keeps its existing recognition */
  ["i dont feel safe at home", [expect.first("crisis-002")]],

  /* Bus routes: a direct link to the bus page for route or schedule requests,
     never for other transportation needs */
  ["bus routes", [expect.busRoute(true), expect.first("transport-001")]],
  ["bus schedule", [expect.busRoute(true), expect.returned("transport-001")]],
  ["what time does the bus come", [expect.busRoute(true)]],
  ["which bus goes to walmart", [expect.busRoute(true)]],
  ["city bus", [expect.busRoute(true)]],
  ["ride to the doctor", [expect.busRoute(false), expect.returned("transport-002")]],
  ["medical ride", [expect.busRoute(false)]],
  ["greyhound bus to indianapolis", [expect.busRoute(false), expect.returned("transport-007")]],
  ["gas voucher", [expect.busRoute(false)]],

  /* Relevance repair. Somewhere to sleep tonight: overnight shelter and
     emergency lodging only, open-to-anyone first, 2-1-1 last as the next
     call. A day center, rent help, Section 8 or long-term housing is not a
     bed tonight. */
  ...["somewhere to sleep tonight", "i need a place to stay tonight", "emergency shelter", "homeless tonight",
      "where can i sleep tonight", "need a bed for tonight", "i have nowhere to sleep", "sleeping outside tonight",
      "im homeless and need somewhere to stay tonight", "is there a shelter open tonight"].map(query => [query, [
    expect.firstOneOf(["housing-002", "food-006"]), expect.returned("housing-001"),
    expect.absent("housing-006"), expect.absent("housing-004"), expect.absent("housing-003"), expect.absent("housing-007"),
    expect.absent("education-004"), expect.absent("crisis-003"),
    expect.before("housing-002", "crisis-005"), expect.before("housing-001", "crisis-005"),
    expect.before("food-006", "housing-001"), expect.urgent(null)]]),
  /* ...while daytime, long-term and group requests keep their own answers */
  ["day shelter", [expect.first("housing-006")]],
  ["womens shelter", [expect.first("housing-001")]],
  ["rental assistance", [expect.firstOneOf(["housing-004", "housing-003"])]],
  ["section 8", [expect.returned("housing-003")]],
  ["homeless", [expect.returned("housing-006"), expect.returned("housing-002")]],
  /* Mixed: food and a bed tonight both answered */
  ["i need food and somewhere to sleep tonight", [expect.returned("housing-002"), expect.anyReturned(["food-001", "food-003", "food-009"]),
    expect.absent("housing-004"), expect.absent("housing-006")]],

  /* Meals: public meals before meals limited to a group, and a residential
     program's meals for its residents are not a meal service. (These checked
     Club Soda, recovery-010, withheld 2026-11; Next Step's residents' meals
     are the remaining case.) */
  ["free meals", [expect.firstOneOf(["food-003", "food-006", "food-007"]), expect.returned("food-005"),
    expect.before("food-007", "food-005"), expect.absent("recovery-011")]],
  ["i need a meal", [expect.firstOneOf(["food-003", "food-006", "food-007"]), expect.absent("recovery-011"),
    expect.before("food-007", "senior-001")]],
  ["hot meal today", [expect.firstOneOf(["food-003", "food-006", "food-007"]), expect.absent("recovery-011")]],
  ["i need food today", [expect.sameOrderAs("food")]],
  ["food pantry near me", [expect.topCategories(["food"], 8)]],
  /* ...the program asked for by name, or a named group, still comes first */
  ["free and reduced lunch", [expect.first("food-005")]],
  ["meals for seniors", [expect.first("senior-001")]],
  ["sober living with meals", [expect.first("recovery-011")]],  /* Next Step documents meals; recovery-010 withheld 2026-11 */

  /* Transportation: city bus requests lead to the bus guide and the city
     bus service first; Greyhound and Area 7 stay distinct */
  ...["terre haute bus schedule", "city bus routes", "where is the bus station", "bus transfer center",
      "bus schedule pdf", "how do i ride the city bus"].map(query => [query, [
    expect.busRoute(true), expect.first("transport-001"), expect.absent("education-011"), expect.absent("crisis-001")]]),
  ["where is the bus station", [expect.returned("transport-007")]],
  ["greyhound", [expect.busRoute(false), expect.first("transport-007")]],
  ["ride for seniors", [expect.busRoute(false), expect.first("transport-003")]],
  ["wheelchair ride to the doctor", [expect.busRoute(false), expect.anyInTop(["transport-002", "transport-003"], 2)]],

  /* Staging acceptance: someone's substance use, described by the drug or
     by a relationship, reaches treatment and recovery-navigation services
     before sober housing (housing was not asked for). Using a drug is not
     an overdose, so no guidance card unless an emergency is described. */
  ...["my son is using heroin", "my daughter is using meth", "my husband is addicted to opioids",
      "my friend needs help with drugs", "someone in my family has a drinking problem", "help for addiction",
      "i need treatment for opioid addiction", "heroin", "my brother is on fentanyl"].map(query => [query, [
    expect.urgent(null),
    expect.firstOneOf(["health-001", "health-004", "crisis-004", "recovery-014", "recovery-015", "recovery-001"]),
    expect.anyInTop(["health-001", "health-004", "crisis-004", "recovery-014", "recovery-015"], 3),
    expect.noCategory("children"), expect.noCategory("pet")]]),
  ["i need treatment for opioid addiction", [expect.anyInTop(["recovery-014", "health-001"], 2)]],
  ["my son is using heroin", [expect.returned("health-001"), expect.returned("recovery-014")]],  /* crisis-004 withheld */
  /* ...housing named: sober living still leads */
  ["sober living for my son", [expect.firstCategory("recovery"), expect.anyInTop(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-011"], 3)]],
  /* ...ordinary uses of "using" and prescribed medication are not addiction */
  ["my son is using the bus", [expect.urgent(null), expect.noCategory("recovery")]],
  ["my son is using a computer", [expect.urgent(null), expect.noCategory("recovery")]],
  ["my son takes prescribed medication", [expect.urgent(null), expect.noCategory("recovery")]],
  /* ...described emergencies keep their existing guidance */
  ["my son overdosed on heroin", [expect.urgentIncludes(OVERDOSE), expect.first("recovery-016"), expect.inTop("recovery-014", 2), expect.absent("crisis-003")]],  /* crisis-004 withheld; the naloxone listing, then WIN (opioid treatment) */
  ["my son is not breathing after using heroin", [expect.urgentIncludes(EMERGENCY)]],

  /* Codex review: a person described as unconscious or unresponsive gets the
     existing general emergency guidance, without the words "overdose" or
     "not breathing"; pills alone are not assumed to be an overdose */
  ...["my friend is unconscious after taking pills", "my son is unconscious", "someone passed out and won't wake up",
      "my roommate is unresponsive", "my friend is not breathing", "my friend took too many pills",
      "I took too many oxycodone pills"].map(query => [query, [expect.urgent(EMERGENCY)]]),
  ["my friend is unconscious after taking pills", [expect.urgentExcludes(OVERDOSE)]],
  ["my son overdosed on heroin", [expect.urgent(OVERDOSE)]],
  /* ...ordinary and negated wording is not an emergency */
  ...["my friend is conscious after taking medication", "my son is asleep", "my son won't wake up for school",
      "I am researching unconscious bias", "I take my medication as prescribed", "my son passed out flyers at school"]
    .map(query => [query, [expect.urgent(null), expect.noCrisisMatch()]]),

  /* Codex review: a medication taken as prescribed, or a drug someone is
     NOT using, is not a request for addiction treatment */
  ...["I take oxycodone as prescribed", "my doctor prescribed Xanax", "I need help paying for my prescription",
      "my son takes prescribed medication", "my daughter takes prescribed oxycodone", "my son is taking prescribed Xanax",
      "my son is not using heroin"].map(query => [query, [
    expect.urgent(null), expect.noCategory("recovery"), expect.absent("crisis-004")]]),
  /* ...but stated addiction or misuse still reaches treatment */
  ...["I'm addicted to oxycodone", "my son is abusing Xanax", "I want help stopping misuse of pain pills",
      "my daughter is addicted to her prescribed oxycodone"].map(query => [query, [
    expect.urgent(null),
    expect.firstOneOf(["health-001", "health-004", "crisis-004", "recovery-014", "recovery-015", "recovery-001"]),
    expect.anyInTop(["health-001", "health-004", "crisis-004", "recovery-014", "recovery-015"], 3)]]),

  /* Codex review: WIN Recovery documents opioid treatment only. A request
     naming only another substance puts the general treatment providers
     (Hamilton Center, Centerstone, Harsha) ahead of it; opioid requests
     keep WIN near the top */
  ...["my daughter is using meth", "my father has a drinking problem", "I need alcohol treatment",
      "meth addiction treatment", "someone in my family has a drinking problem"].map(query => [query, [
    expect.urgent(null), expect.before("health-001", "recovery-014"),
    expect.before("recovery-015", "recovery-014")]]),
  ...["my son is using heroin", "my husband is addicted to opioids", "I need treatment for opioid addiction"].map(query => [query, [
    expect.inTop("recovery-014", 2)]]),
  ["I need help with substance use", [expect.urgent(null), expect.anyInTop(["health-001", "health-004", "recovery-015"], 3)]],
  ["I need sober housing", [expect.firstCategory("recovery"), expect.anyInTop(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-011", "recovery-012"], 3)]],
  ["I need addiction treatment and somewhere to live", [
    expect.anyInTop(["health-001", "health-004", "recovery-014", "recovery-015"], 3),
    expect.anyReturned(["recovery-002", "recovery-011", "recovery-012", "housing-002"])]],

  /* Codex review: "my child" says who needs help; a treatment request
     still leads with treatment, ahead of child-welfare services. Final
     review: a listing that documents clinical substance-use treatment
     (Hamilton, Centerstone, WIN, Harsha) must be in the top three and rank
     above every child-welfare listing; peer meetings or navigation alone
     do not satisfy this. */
  ...["my child needs addiction treatment", "my son needs rehab", "my daughter needs help with drugs",
      "my teenager needs substance use counseling", "My adult son needs addiction treatment",
      "My 25 year old daughter needs recovery help"].map(query => [query, [
    expect.urgent(null),
    expect.firstOneOf(["health-001", "health-004", "crisis-004", "recovery-014", "recovery-015", "recovery-001"]),
    expect.anyInTop(["health-001", "health-004", "recovery-014", "recovery-015"], 3),
    expect.anyBefore(["health-001", "health-004", "recovery-014", "recovery-015"], ["children-002", "children-009", "children-010"]),
    expect.absent("children-007")]]),
  /* ...an explicitly stated age under 18: the adult-only program (WIN,
     "Must be 18 or older") does not lead; providers whose age limits are
     not documented come first, and nothing claims they serve minors */
  ...["My 14 year old needs addiction treatment", "My 16-year-old daughter needs rehab", "My son is 17 and needs help with drugs",
      "my 14 year old daughter needs help with heroin"].map(query => [query, [
    expect.urgent(null),
    expect.firstOneOf(["health-001", "health-004", "crisis-004", "recovery-015", "recovery-001"]),
    expect.anyInTop(["health-001", "health-004", "recovery-015"], 3),
    expect.anyBefore(["health-001", "health-004", "recovery-015"], ["recovery-014"]),
    expect.anyBefore(["health-001", "health-004", "recovery-015"], ["children-002", "children-009", "children-010"])]]),
  /* ...an adult, or an age not stated, keeps the usual order (WIN leads opioid requests) */
  ...["my 25 year old son is using heroin", "my son is using heroin"].map(query => [query, [expect.first("recovery-014")]]),
  /* ...while child-welfare, childcare and other requests keep their services */
  ["I need help with child custody", [expect.firstCategory("legal")]],
  ["I need child protective services", [expect.first("children-009")]],  /* children-002 (wrong address, duplicate) withheld; children-009 matches the state DCS page */
  ["I need childcare", [expect.first("education-003")]],  /* the state childcare voucher listing; children-008 withheld */
  ["my child needs medical care", [expect.firstCategory("health")]],
  ["food for my children", [expect.firstCategory("food")]],

  /* Final review: unconsciousness in ordinary wording is an emergency... */
  ...["My friend became unconscious.", "my son fell unconscious", "my friend was found unconscious",
      "Someone suddenly lost consciousness.", "My friend passed out and won't wake up.", "My daughter collapsed and is unconscious.",
      "My son is unconscious after taking medication.", "he passed out in the bathroom"].map(query => [query, [expect.urgent(EMERGENCY)]]),
  ["My friend overdosed on Xanax.", [expect.urgent(OVERDOSE)]],
  /* ...but not a word, a definition, a worry, a denial or handing something out */
  ...["I'm researching unconscious bias.", "My friend is conscious.", "My son is sleeping.", "He won't wake up for school.",
      "I passed out flyers.", "What does unconscious mean?", "I'm worried about becoming unconscious.",
      "my friend passed out water at school", "my friend is not unconscious"].map(query => [query, [expect.urgent(null), expect.noCrisisMatch()]]),

  /* Final review: prescribed use is bound to the drug it describes, however
     the sentence is worded... */
  ...["My doctor prescribed oxycodone for my pain.", "I have been taking oxycodone exactly as my doctor prescribed it.",
      "my doctor prescribed a low dose of Xanax", "I take oxycodone exactly as my doctor prescribed"].map(query => [query, [
    expect.urgent(null), expect.noCategory("recovery"), expect.absent("crisis-004")]]),
  /* Final review: the rest of an ordinary medication statement ("every
     day", "every morning", "for pain") describes how the medicine is taken,
     not a service wanted; only medication or health help may be returned,
     never housing, shelter, food or transport through an incidental word */
  ...["My daughter takes her prescribed Xanax every day.", "My mother takes medication every day.",
      "I take my prescription every morning.", "My daughter takes prescribed medication.",
      "I take oxycodone, as prescribed.", "My doctor prescribed oxycodone for pain.", "I take Xanax daily, exactly as prescribed.",
      "I take my medication, as directed by my doctor."].map(query => [query, [
    expect.urgent(null), expect.onlyOffers(["health"], ["medication", "prescription", "medicine"]), expect.absent("crisis-004")]]),
  ["My doctor prescribed Xanax for anxiety.", [expect.urgent(null), expect.firstCategory("health"),
    expect.onlyOffers(["health"], ["medication", "prescription", "medicine", "anxiety", "mental health"]), expect.absent("crisis-004")]],
  /* Final review: a person's condition is not a request for a program whose
     residents share it. Recovery housing that mentions mental health
     ("housing for adults with co-occurring mental health and substance use
     disorders") is not offered for an ordinary medication or mental-health
     statement or request; health and medication services still are */
  ...["My doctor prescribed Xanax for anxiety.", "My mother takes medication for anxiety.", "My daughter takes prescribed Xanax every day.",
      "I take oxycodone, as prescribed."].map(query => [query, [
    expect.urgent(null), expect.noCategory("recovery"), expect.noCategory("housing"),
    expect.onlyOffers(["health", "crisis"], ["medication", "prescription", "medicine"])]]),
  ["My mother takes medication for anxiety.", [expect.returned("financial-016")]],
  ...["I need anxiety treatment.", "I need mental health counseling."].map(query => [query, [
    expect.urgent(null), expect.anyInTop(["health-005", "health-001", "health-004"], 3),
    expect.noneOf(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-007", "recovery-008",
      "recovery-009", "recovery-011", "recovery-012", "recovery-013"]), expect.noCategory("housing")]]),
  ["I need medication assistance.", [expect.first("financial-016")]],
  ["I need help paying for prescriptions.", [expect.anyInTop(["senior-004", "financial-016", "crisis-003"], 3), expect.noCategory("recovery")]],
  /* ...while housing requests, including housing for that population, keep it */
  ["I need transitional housing for mental health and addiction recovery.", [expect.inTop("recovery-013", 3)]],
  ["I need housing while receiving addiction treatment.", [
    expect.anyInTop(["recovery-002", "recovery-009", "recovery-011", "recovery-012", "recovery-013"], 3)]],
  ["I have anxiety and need somewhere to live.", [expect.someCategory("housing", 3), expect.anyInTop(["health-005", "health-001", "health-004"], 5)]],

  /* Final review: a stated person (an adult man, a woman, a son) is not
     offered first a program whose own requirements exclude them ("Women and
     children only", "Men only"); it stays listed after the others, with its
     requirement shown. Bethany House documents "Women and children only";
     Light House Mission documents lodging for single men, single women,
     women with children and families. Unstated people change nothing. */
  ...["I am an adult man and need somewhere to live.", "My adult son needs somewhere to stay.",
      "I am a single man and need emergency shelter.", "My 25-year-old son needs housing."].map(query => [query, [
    expect.urgent(null), expect.before("housing-002", "housing-001"),
    expect.anyBefore(["housing-002", "housing-003", "housing-004", "housing-006", "housing-007"], ["housing-001"])]]),
  ...["I am an adult man and need somewhere to live.", "My adult son needs somewhere to stay."].map(query => [query, [
    expect.returned("housing-001"), expect.anyInTop(["housing-002", "housing-003", "housing-004", "housing-006", "housing-007"], 4)]]),
  /* ...women and children keep Bethany where it was */
  ["I am a woman and need shelter.", [expect.first("housing-001"), expect.returned("housing-002")]],
  ["My daughter and I need somewhere to stay.", [expect.first("housing-001")]],
  ["I am a mother with children and need housing.", [expect.inTop("housing-001", 2), expect.inTop("housing-002", 2)]],
  /* ...and a men-only or women-only sober house does not lead for the other sex */
  ["I am a woman and need sober housing.", [expect.firstCategory("recovery"),
    expect.anyBefore(["recovery-007", "recovery-008", "recovery-009", "recovery-011", "recovery-012"],
      ["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006"])]],
  ["sober living for my son", [
    expect.anyBefore(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006"],
      ["recovery-007", "recovery-008", "recovery-009"])]],
  /* ...no person stated: unchanged (no eligibility is assumed) */
  ...["I need somewhere to stay.", "I need somewhere to live."].map(query => [query, [
    expect.first("housing-001"), expect.inTop("housing-002", 3)]]),
  ["I am homeless.", [expect.first("housing-002"), expect.inTop("housing-001", 2)]],
  ["I need emergency shelter tonight.", [expect.first("housing-002"), expect.returned("housing-001"), expect.absent("housing-006"), expect.absent("housing-003")]],
  ["I need food and somewhere to stay.", [expect.someCategory("food", 3), expect.inTop("housing-001", 3)]],
  ["my husband hits me and i need somewhere to stay", [expect.inTop("housing-001", 3)]],
  /* Final review: a son or daughter helping with the search is not the
     person who needs housing. With the speaker's sex unstated, no men-only
     or women-only program is moved for the helper's sex: Odyssey (Men
     only) and Phoenix House (Women only) keep their usual early places, as
     for "I need sober housing", and Bethany stays first as for "I need
     somewhere to stay". (Until the 2026-11 accuracy patch the women-only
     example was recovery-009, which was withheld: the only state-certified
     "Kathy's Hope" is in Valparaiso.) */
  ...["My daughter is helping me find sober housing.", "My son is helping me find sober housing."].map(query => [query, [
    expect.recipientSex(null), expect.firstCategory("recovery"), expect.inTop("recovery-002", 2), expect.inTop("recovery-007", 4),
    expect.before("recovery-002", "recovery-011"), expect.before("recovery-007", "recovery-011")]]),
  ["My daughter is helping me find somewhere to stay.", [expect.recipientSex(null), expect.first("housing-001")]],
  ["My son is helping me find housing.", [expect.recipientSex(null), expect.before("housing-001", "housing-006")]],
  /* ...a stated recipient still counts, including the speaker beside a helper */
  ["My daughter needs sober housing.", [expect.recipientSex("female"),
    expect.anyBefore(["recovery-007", "recovery-008", "recovery-009", "recovery-011", "recovery-012"],
      ["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006"])]],
  ["My son needs sober housing.", [expect.recipientSex("male"),
    expect.anyBefore(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006"],
      ["recovery-007", "recovery-008", "recovery-009"])]],
  ...["I am an adult man and need somewhere to live.", "My adult son needs somewhere to stay.", "My 25-year-old son needs housing."]
    .map(query => [query, [expect.recipientSex("male")]]),
  ["I am a woman and need shelter.", [expect.recipientSex("female")]],
  ["I am a man, and my daughter is helping me find housing.", [expect.recipientSex("male"), expect.before("housing-002", "housing-001")]],
  ["I am a woman, and my son is helping me find housing.", [expect.recipientSex("female"), expect.before("housing-001", "housing-006")]],
  /* ...and the person the request is for, not the helper */
  ["My daughter is helping me find sober housing for my son.", [expect.recipientSex("male"),
    expect.anyBefore(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006"],
      ["recovery-007", "recovery-008", "recovery-009"])]],
  ["My son is helping my daughter find housing.", [expect.recipientSex("female"), expect.before("housing-001", "housing-006")]],
  ...["My mother takes medication every day.", "I take my prescription every morning."].map(query => [query, [
    expect.anyInTop(["financial-016", "senior-004", "crisis-003"], 2)]]),
  /* ...while a duration or housing request still finds housing */
  ["I need somewhere to stay for 90 days.", [expect.anyInTop(["recovery-013", "housing-002", "housing-001", "housing-006", "housing-007"], 3)]],
  ["I need transitional housing.", [expect.first("recovery-013")]],
  ["I need sober housing for several months.", [expect.firstCategory("recovery"),
    expect.anyInTop(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-011", "recovery-012"], 3)]],
  ["I need addiction treatment and housing.", [expect.firstCategory("recovery"),
    expect.anyInTop(["recovery-002", "recovery-011", "recovery-012", "recovery-013"], 3),
    expect.anyReturned(["health-001", "health-004", "recovery-014", "recovery-015"])]],
  /* ...a comma does not separate "as prescribed" from its drug, but misuse
     and a separate request still count */
  ...["I was prescribed oxycodone, but I'm taking too much.", "I take Xanax, but I am addicted to it."].map(query => [query, [
    expect.urgent(null), expect.anyInTop(["health-001", "health-004", "recovery-014", "recovery-015"], 3)]]),
  ["I take oxycodone, as prescribed. My brother needs heroin treatment.", [
    expect.urgent(null), expect.inTop("recovery-014", 3), expect.anyInTop(["health-001", "health-004", "recovery-015"], 3)]],
  ["My friend is unconscious after taking medication.", [expect.urgent(EMERGENCY)]],
  /* ...documented adult-only programs ("for adult males", "for adults",
     "Must be 18 or older") do not lead for a stated minor, and stay first
     for adults; other programs' ages are not documented and not claimed */
  ...["My 14 year old needs sober housing.", "My 16-year-old son needs recovery housing."].map(query => [query, [
    expect.urgent(null), expect.firstCategory("recovery"),
    expect.anyBefore(["recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-007", "recovery-008", "recovery-009", "recovery-011", "recovery-012"],
      ["recovery-002", "recovery-013", "recovery-014"])]]),
  ["My daughter is 15 and needs addiction treatment.", [
    expect.urgent(null), expect.firstOneOf(["health-001", "health-004", "crisis-004", "recovery-015", "recovery-001"]),
    expect.anyInTop(["health-001", "health-004", "recovery-015"], 3), expect.anyBefore(["health-001", "health-004", "recovery-015"], ["recovery-014"])]],
  ...["My 19 year old needs sober housing.", "My adult son needs sober housing.", "I am an adult male looking for sober living."].map(query => [query, [
    expect.urgent(null), expect.inTop("recovery-002", 3)]]),
  /* ...and never silences a separate request, in either order */
  ...["I take prescribed oxycodone. My brother needs help with heroin.", "My doctor prescribed Xanax, but my son is using heroin.",
      "my son needs help with heroin. I take prescribed medication"].map(query => [query, [
    expect.urgent(null), expect.inTop("recovery-014", 3), expect.anyInTop(["health-001", "health-004", "recovery-015"], 3)]]),
  ["My father takes prescribed medication. I need recovery help for myself.", [
    expect.urgent(null), expect.anyInTop(["health-001", "health-004", "recovery-014", "recovery-015"], 3)]],
  /* ...a denied drug does not decide the order for the drug that is named
     as the problem (no opioid program ahead of general treatment) */
  ...["I am not using heroin. I need help with meth.", "My son isn't using heroin, but he needs alcohol treatment.",
      "my son is not using heroin but needs meth treatment"].map(query => [query, [
    expect.urgent(null), expect.before("health-001", "recovery-014"),
    expect.before("recovery-015", "recovery-014")]]),
  /* ...stated misuse of a prescribed drug is still misuse */
  ["I was prescribed oxycodone, but I'm taking more than prescribed.", [
    expect.urgent(null),
    expect.firstOneOf(["health-001", "health-004", "crisis-004", "recovery-014", "recovery-015", "recovery-001"]),
    expect.anyInTop(["health-001", "health-004", "recovery-014", "recovery-015"], 3)]],

  /* Rent assistance: documented rent help across categories (trustees
     included), not every program named "assistance" */
  ...["rent assistance", "help paying rent", "rental assistance"].map(query => [query, [
    expect.inTop("financial-013", 2), expect.returned("housing-003"),
    expect.returned("financial-013"), expect.returned("financial-014"),
    expect.absent("financial-016"), expect.absent("financial-008"), expect.absent("financial-001"),
    expect.absent("financial-005"), expect.absent("financial-012")]]),
  /* ...a combined request keeps both needs; a broad request stays broad */
  ["need help with rent and utilities", [expect.first("financial-013"), expect.returned("financial-001")]],  /* the trustee documents both; housing-004 withheld */
  ["i need financial help", [expect.returned("financial-016"), expect.returned("financial-008"), expect.returned("financial-001"), expect.returned("financial-013")]],

  /* Accepted staging searches stay as they are */
  ["i need a gas voucher", [expect.first("transport-005")]],
  ["terre haute bus route", [expect.busRoute(true), expect.first("transport-001")]],
  ["im homeless", [expect.returned("housing-002"), expect.returned("housing-006"), expect.returned("housing-001")]],

  /* 2026-11 final corrections: a counseling or treatment request lists every
     returned clinical provider before every residential program. (Oak Street
     House, transitional housing, had become first for these once Centerstone
     was withheld: "substance use" in its description was read as an
     affiliation, which bypassed the treatment-before-housing order.) */
  ["I need substance use counseling", [
    expect.urgent(null), expect.firstOneOf(["health-001", "recovery-015"]), expect.topWithin(CLINICAL, 3),
    expect.allBefore(CLINICAL, RESIDENTIAL), expect.returned("recovery-013")]],
  /* (This check also covered "my teenager needs substance use counseling",
     which is a youth request; it moved to the age checks below, because WIN
     Recovery, a clinical provider, is documented as adults-only.) */
  ["I need help with substance use", [expect.firstOneOf(["health-001", "recovery-015"]), expect.allBefore(CLINICAL, RESIDENTIAL)]],
  ["my son needs help with heroin", [
    expect.urgent(null), expect.first("recovery-014"), expect.inTop("health-001", 3), expect.allBefore(CLINICAL, RESIDENTIAL)]],
  ["I need addiction treatment", [expect.urgent(null), expect.topWithin(CLINICAL, 3), expect.allBefore(CLINICAL, RESIDENTIAL)]],
  /* ...a stated minor: the documented adults-only programs are listed last,
     and no listing is claimed to accept minors */
  ...["my 14 year old needs addiction treatment", "my 14 year old needs substance use counseling"].map(query => [query, [
    expect.urgent(null), expect.firstOneOf(["health-001", "recovery-015"]), expect.listedLast(ADULTS_ONLY_RECOVERY),
    expect.allBefore(["health-001", "recovery-015"], RESIDENTIAL)]]),
  /* Independent review 2026-11-17: who needs the help, and how old.
     Youth wording for that person ("my teen", "my adolescent daughter", "my
     child", "my minor son") or an age under 18 keeps the documented
     adults-only programs (WIN, Oak Street House, Odyssey House) after every
     returned treatment listing whose age limit is not documented. Nothing
     claims those listings serve minors. */
  ...["My teen needs addiction treatment", "My teenager needs substance use counseling", "My adolescent daughter needs counseling",
      "My child needs substance abuse counseling", "My minor son needs addiction treatment", "My 14 year old needs addiction treatment",
      "My 17 year old daughter needs rehab"].map(query => [query, [
    expect.urgent(null),
    r => ADULTS_ONLY_RECOVERY.includes(r.ids[0]) ? `adults-only ${r.ids[0]} is first` : null,
    expect.allBefore(["health-001", "recovery-015", "recovery-001", "recovery-016", "children-001"], ADULTS_ONLY_RECOVERY)]]),
  ...["My teen needs addiction treatment", "My minor son needs addiction treatment", "My 14 year old needs addiction treatment",
      "My teenager needs substance use counseling"].map(query => [query, [
    expect.firstOneOf(["health-001", "recovery-015"]), expect.listedLast(ADULTS_ONLY_RECOVERY)]]),
  ["My teenager needs substance use counseling", [expect.topWithin(["health-001", "recovery-015", "children-001"], 3)]],
  ["My adolescent daughter needs counseling", [expect.first("children-001"), expect.listedLast(ADULTS_ONLY_RECOVERY)]],
  ["My child needs substance abuse counseling", [expect.listedLast(ADULTS_ONLY_RECOVERY), expect.anyInTop(["health-001", "recovery-015", "children-001"], 3)]],
  /* ...an adult age, "adult", an unqualified son or daughter, or a helper's
     age ("my 14 year old daughter is helping me") leaves the ordinary order */
  ["My 19 year old daughter needs addiction treatment", [expect.urgent(null), expect.sameOrderAs("My daughter needs addiction treatment"), expect.inTop("recovery-014", 3)]],
  /* (the number itself also matches financial-001's text, as it did before) */
  ["My daughter is 30 and needs rehab", [expect.urgent(null), expect.inTop("recovery-014", 4), expect.allBefore(["recovery-014"], RESIDENTIAL)]],
  ...["My adult son needs addiction treatment", "My son needs addiction treatment", "I need addiction treatment",
      "I am 30 and my 14 year old daughter is helping me find addiction treatment"].map(query => [query, [
    expect.urgent(null), expect.inTop("recovery-014", 3), expect.allBefore(["recovery-014"], RESIDENTIAL)]]),
  ["I need sober housing", [expect.inTop("recovery-002", 3)]],
  /* ...and children named only as people the requester supports are not the person */
  ["I need a job to support my kids", [expect.sameOrderAs("I need a job")]],
  ["help with child custody", [expect.first("legal-001")]],
  /* Section 8 asks for "photo ID for adults" in a household; that is not an adults-only program */
  ["my kids need a place to stay", [expect.firstCategory("housing"), expect.returned("housing-003"),
    () => adultsOnly(RESOURCES.find(r => r.id === "housing-003")) ? "housing-003 read as adults-only" : null]],
  /* ...a housing request does the reverse: residential programs lead */
  ["I need sober housing", [expect.topWithin(RESIDENTIAL, 5), expect.allBefore(RESIDENTIAL, CLINICAL)]],
  ["I need recovery housing", [expect.topWithin(RESIDENTIAL, 5), expect.allBefore(RESIDENTIAL, CLINICAL)]],
  ["I need somewhere to live while staying sober", [
    expect.firstOneOf(RESIDENTIAL), expect.someCategory("housing", 5),
    r => r.ids.slice(0, 5).some(id => CLINICAL.includes(id)) ? "a clinical provider is in the top 5 of a housing request" : null]],
  /* ...and an organization named in the request still leads, housing or not */
  ["Oak Street House", [expect.first("recovery-013")]],
  ["Hamilton Center", [expect.inTop("health-001", 3), expect.returned("recovery-013")]],

  /* 2026-11 final corrections: "emergency" no longer boosts listings under the
     overdose guidance. Explicit emergencies keep their guidance, an overdose
     search never lists emergency funds, and other emergency requests still
     find emergency assistance. */
  ...["overdosing", "my friend overdosed"].map(query => [query, overdose]),
  ...["someone is unconscious", "my son is not breathing"].map(query => [query, [expect.urgent(EMERGENCY), expect.absent("crisis-003")]]),
  ["emergency shelter tonight", [expect.urgent(null), expect.first("housing-002"), expect.returned("housing-001"), expect.absent("recovery-016")]],
  ["emergency rental assistance", [expect.urgent(null), expect.inTop("financial-013", 3), expect.absent("recovery-016")]],
  ["emergency utility assistance", [expect.urgent(null), expect.inTop("crisis-003", 3), expect.returned("financial-013"), expect.returned("financial-001")]],
  ["panic attack", [expect.urgent(MENTAL), expect.first("crisis-001"), expect.absent("crisis-003"), expect.absent("recovery-016")]],

  /* 2026-11 final corrections: naloxone searches reach the statewide listing,
     which is information for getting a kit, not emergency help */
  ...["naloxone", "narcan", "where can i get narcan"].map(query => [query, [expect.urgent(null), expect.first("recovery-016")]]),
  ["i need a doctor", [expect.absent("recovery-016")]],
  /* Independent review 2026-11-17: Overdose Lifeline describes its kits and
     test strips as harm reduction supplies. An informational search gets no
     overdose guidance; an overdose happening now still does. */
  ...["harm reduction", "harm reduction supplies"].map(query => [query, [expect.urgent(null), expect.first("recovery-016")]]),
  ["someone is overdosing right now", [expect.urgent(OVERDOSE), expect.first("recovery-016")]],
  /* ...and Harrison Township's vouchers are not cash assistance */
  ...["emergency cash", "emergency money"].map(query => [query, [expect.firstOneOf(["crisis-003", "financial-003"]),
    r => r.ids.slice(0, 3).includes("financial-013") ? "financial-013 (vouchers, never cash) in the top 3 of a cash request" : null]]),

  /* Final search corrections 2026-11-17. "Emergency" in a rent request says
     how urgent it is; it is not a separate request for emergency funds or a
     shelter. Listings that document rent help (Section 8 and the township
     trustees) are the results. No township trustee documents cash payments. */
  ...["emergency rental assistance", "emergency rent help", "emergency help with rent"].map(query => [query, [
    expect.urgent(null), expect.inTop("financial-013", 3), expect.sameOrderAs("rental assistance"),
    expect.noneOf(["housing-001", "housing-002", "crisis-003", "financial-003", "financial-009"])]]),
  ...["emergency cash", "emergency money"].map(query => [query, [
    r => r.ids.slice(0, 3).some(id => ["financial-013", "financial-014", "financial-015"].includes(id)) ? "a township trustee (no cash payments documented) in the top 3 of a cash request" : null]]),
  ["emergency shelter", [expect.first("housing-002"), expect.noneOf(["financial-013", "financial-014", "financial-015"])]],
  ...["Harrison Township Trustee", "Honey Creek Township Trustee", "Lost Creek Township Trustee"].map((query, i) => [query, [
    expect.first(["financial-013", "financial-014", "financial-015"][i])]]),
  ["township assistance", [expect.first("financial-013"), expect.returned("financial-014"), expect.returned("financial-015")]],

  /* ...and "substance abuse" is substance use: it does not reach domestic
     violence or child-abuse services through the word "abuse". The youth
     order (adults-only programs last) still applies. */
  ...["my child needs substance abuse counseling", "my teen needs substance abuse treatment", "I need substance abuse treatment",
      "substance abuse", "drug abuse", "alcohol abuse", "substance abuse counseling", "prescription drug abuse"].map(query => [query, [
    expect.urgent(null), expect.firstCategory("recovery"), expect.noneOf(["crisis-002", "children-006", "legal-006"])]]),
  ...["my child needs substance abuse counseling", "my teen needs substance abuse treatment", "my teenager needs addiction counseling"].map(query => [query, [
    expect.firstOneOf(["health-001", "recovery-015"]), expect.listedLast(ADULTS_ONLY_RECOVERY)]]),
  ["substance use counseling", [expect.urgent(null), expect.firstOneOf(["health-001", "recovery-015"]), expect.absent("crisis-002")]],
  /* ...while abuse by a person still reaches the services for it */
  ...["I need domestic abuse help", "my partner is abusing me", "abuse", "sexual abuse"].map(query => [query, [expect.first("crisis-002")]]),
  ["domestic violence shelter", [expect.first("housing-001"), expect.inTop("crisis-002", 3)]],
  ["child abuse help", [expect.anyInTop(["children-006", "children-009"], 2), expect.returned("crisis-002")]],
  ["my minor child is being abused", [expect.anyInTop(["children-006", "children-009", "crisis-002"], 2), expect.returned("children-009")]],
  ["elder abuse", [expect.returned("crisis-002"), expect.someCategory("senior", 3)]],
  ["CODA", [expect.returned("crisis-002"), expect.returned("children-006")]],

  /* Release blockers 2026-11-17. A request for substance-use help and, in
     the same request, help with domestic or sexual abuse answers both: the
     "abuse" of "substance abuse" is not searched, the other "abuse" is. A
     treatment listing (not a residential program) and CODA's crisis line
     lead, and guidance is the same as for the abuse request alone. */
  ...[["substance abuse and domestic abuse", "domestic abuse"], ["I need drug abuse help and domestic abuse help", "domestic abuse"],
      ["alcohol abuse treatment and sexual abuse help", "sexual abuse"]].map(([query, alone]) => [query, [
    expect.inTop("crisis-002", 3), expect.anyInTop(["health-001", "recovery-015", "recovery-014"], 3),
    r => RESIDENTIAL.includes(r.ids[0]) ? `residential program ${r.ids[0]} first` : null,
    r => { const g = run(alone).urgentAll; return JSON.stringify(r.urgentAll) === JSON.stringify(g) ? null : `guidance ${JSON.stringify(r.urgentAll)}, "${alone}" alone gives ${JSON.stringify(g)}`; }]]),
  ["I need substance abuse counseling", [expect.urgent(null), expect.anyInTop(["health-001", "recovery-015", "recovery-014"], 2),
    expect.noneOf(["crisis-002", "children-006", "legal-006"])]],
  ["my teenager needs substance abuse treatment", [expect.firstOneOf(["health-001", "recovery-015"]), expect.listedLast(ADULTS_ONLY_RECOVERY),
    expect.noneOf(["crisis-002", "children-006", "legal-006"])]],
  ["domestic abuse", [expect.first("crisis-002"), expect.returned("housing-001")]],
  ["child abuse", [expect.anyInTop(["children-006", "children-009"], 2), expect.returned("crisis-002")]],

  /* ...the requester's own age is not the age of the person who needs help:
     "i am 40" describes the parent, and the teen is the person. A stated
     minor or youth wording keeps the documented adults-only programs last;
     an adult beneficiary, or no one else named, keeps the ordinary order. */
  ...["I am 40 and my teen needs addiction treatment", "I am 40. My teenager needs addiction treatment.",
      "I am 40 years old and my teen needs addiction treatment", "My teenage daughter needs addiction treatment"].map(query => [query, [
    expect.urgent(null), expect.firstOneOf(["health-001", "recovery-015"]), expect.listedLast(ADULTS_ONLY_RECOVERY)]]),
  ["I am 35 and my 14 year old son needs counseling", [expect.first("children-001"), expect.listedLast(ADULTS_ONLY_RECOVERY)]],
  ["My adolescent son needs treatment", [expect.firstOneOf(["health-001", "recovery-015"]), expect.listedLast(ADULTS_ONLY_RECOVERY)]],
  ["My teen needs sober housing", [expect.firstOneOf(RESIDENTIAL), expect.listedLast(["recovery-013", "recovery-002"])]],
  ...["I am 30 and my 14 year old daughter is helping me find addiction treatment", "My adult son needs addiction treatment",
      "My 19 year old daughter needs addiction treatment", "My son needs addiction treatment", "I am 16 and my mom needs addiction treatment"].map(query => [query, [
    expect.urgent(null), expect.first("recovery-014")]]),
  ["My daughter is 30 and needs rehab", [expect.inTop("recovery-014", 4), expect.allBefore(["recovery-014"], RESIDENTIAL)]],
  ["I need addiction treatment", [expect.first("health-001"), expect.inTop("recovery-014", 2)]],
  ["I am 16 and need help with drugs", [expect.listedLast(ADULTS_ONLY_RECOVERY)]],

  /* Final review 2026-11-17: a relative who is only mentioned, or who will
     help ("my mom will help me", "my mom can drive me"), is not the person
     who needs help, so the requester's own age still counts. A relative is
     that person only when a need is said of them ("my mom needs", "my teen
     needs") or help is asked for them ("for my son"). */
  ...["I am 16 and my mom will help me find addiction treatment.", "I am 16 and need addiction treatment. My mom can drive me.",
      "I am 16 and need addiction treatment.", "I am 16 and my mom is worried about my drinking"].map(query => [query, [
    expect.urgent(null), expect.ageReading("explicit", false), expect.firstOneOf(["health-001", "recovery-015"]), expect.listedLast(ADULTS_ONLY_RECOVERY)]]),
  ...["I am 40 and my teen needs addiction treatment.", "I am 40. My teenager needs addiction treatment.", "My teen needs addiction treatment."].map(query => [query, [
    expect.urgent(null), expect.ageReading("possible", false), expect.firstOneOf(["health-001", "recovery-015"]), expect.listedLast(ADULTS_ONLY_RECOVERY)]]),
  /* (education-009, "School Supplies Drive", matches "drive" here as it did at 91c0e11) */
  ["My 16 year old son needs treatment, and I can drive him.", [
    expect.urgent(null), expect.ageReading("explicit", false), expect.anyInTop(["health-001", "recovery-015"], 3), expect.listedLast(ADULTS_ONLY_RECOVERY)]],
  ...["I am 30 and my 14 year old daughter is helping me find addiction treatment.", "My adult son needs addiction treatment."].map(query => [query, [
    expect.urgent(null), expect.ageReading("no", true), expect.first("recovery-014")]]),
  ["My daughter is 30 and needs rehab.", [expect.urgent(null), expect.ageReading("no", true), expect.inTop("recovery-014", 4), expect.allBefore(["recovery-014"], RESIDENTIAL)]],
  ["My son needs addiction treatment.", [expect.urgent(null), expect.ageReading("no", false), expect.first("recovery-014")]],
  ["I am 19 and need addiction treatment.", [expect.urgent(null), expect.ageReading("no", true), expect.inTop("recovery-014", 2), expect.allBefore(["recovery-014"], RESIDENTIAL)]],
  ["I am 16 and my mom needs addiction treatment", [expect.ageReading("no"), expect.first("recovery-014")]],
  ["I am 16 and my dad is using meth", [expect.ageReading("no")]]
];

function runSuite() {
  const rows = [];
  let failed = 0;
  CASES.forEach(([query, checks]) => {
    const result = run(query);
    const failures = checks.map(check => check(result)).filter(Boolean);
    if (failures.length) failed++;
    rows.push({query, result, failures});
  });

  /* HTML escaping of resource fields must survive the search changes. */
  const card = renderCard({id:"x", name:"<img src=x onerror=alert(1)>", category:"food", description:"\"quoted\" & <b>bold</b>"});
  const escapeOk = card.includes("&lt;img src=x onerror=alert(1)&gt;") && !card.includes("<img") && card.includes("&lt;b&gt;bold&lt;/b&gt;");
  rows.push({query:"(renderCard escapes HTML)", result:{ids:[], urgent:null}, failures: escapeOk ? [] : ["resource fields not escaped"]});
  if (!escapeOk) failed++;

  /* Website links must be http(s); other schemes are not rendered as links. */
  const unsafe = renderCard({id:"y", name:"Test", category:"food", description:"", website:"javascript:alert(1)"});
  const safe = renderCard({id:"z", name:"Test", category:"food", description:"", website:"https://example.org/x"});
  const urlOk = !/href="\s*javascript:/i.test(unsafe) && safe.includes('href="https://example.org/x"');
  rows.push({query:"(renderCard allows only http/https website links)", result:{ids:[], urgent:null}, failures: urlOk ? [] : ["unsafe URL scheme rendered as a link"]});
  if (!urlOk) failed++;

  /* Documented cost must be specific to the requested service. Synthetic
     listings; the real dataset is unchanged. */
  const costQuery = analyzeSearchQuery("free sober living", "en", RESOURCES);
  const costCases = [
    [{name:"Test Sober House", description:"Smoke-free and drug-free sober living home.", requirements:"Rent is $120/week."}, "paid"],
    [{name:"Test Sober House", description:"Smoke-free, drug-free sober living home.", requirements:""}, "unknown"],
    [{name:"Test Placement", description:"Free consultation for sober living placement.", requirements:""}, "unknown"],
    [{name:"Test Sober House", description:"Sober living with free meals.", requirements:"$150/week program fee."}, "paid"],
    [{name:"Test Sober House", description:"Sober living home. Not free; residents share expenses.", requirements:""}, "paid"],
    [{name:"Free Recovery Housing", description:"Free housing with recovery support.", requirements:""}, "free"],
    [{name:"Test Sober House", description:"Sober living. Free meals and transportation provided.", requirements:""}, "unknown"]
  ];
  /* Fourth review (Codex's listing probes, searched for "free sober living"):
     free or paid evidence must belong to the requested service itself. */
  const codexCostProbes = [
    [{name:"Test Sober House", description:"No free housing is available.", requirements:""}, "unknown"],
    [{name:"Test Sober House", description:"Consultation is free for sober living placement.", requirements:""}, "unknown"],
    [{name:"Test Sober House", description:"Free recovery counseling.", requirements:""}, "unknown"],
    [{name:"Test Sober House", description:"Free recovery counseling plus $100/week housing.", requirements:""}, "paid"],
    [{name:"Test Sober House", description:"Free housing. Meals cost $10/day.", requirements:""}, "free"],
    /* Fifth review: "at no cost" without "free" anywhere in the name */
    [{name:"Sober Living Residence", description:"Housing is provided at no cost.", requirements:""}, "free"],
    [{name:"Sober Living Residence", description:"Meals are provided at no cost.", requirements:""}, "unknown"],
    [{name:"Sober Living Residence", description:"Housing is provided at no cost.", requirements:"Rent is $150/week."}, "unknown"]
  ];
  [...costCases, ...codexCostProbes].forEach(([listing, expected]) => {
    let got;
    try { got = documentedCost({tags:[], ...listing}, costQuery); } catch (err) { got = `error: ${err.message}`; }
    const ok = got === expected;
    rows.push({query:`(cost: "${listing.description}" / "${listing.requirements}")`, result:{ids:[], urgent:null}, failures: ok ? [] : [`documented cost ${got}, expected ${expected}`]});
    if (!ok) failed++;
  });

  /* Whether the PERSON asks for no-cost help (Codex's exact query probes). */
  [["smoke-free sober living", false], ["drug-free sober living", false], ["housing does not have to be free", false],
   ["sober living no need for it to be free", false],
   ["free consultation for sober living", false], ["free sober living", true], ["sober living that is free", true],
   ["sober living at no cost", true]].forEach(([query, expected]) => {
    const got = analyzeSearchQuery(query, "en", RESOURCES).wantsFree;
    const ok = got === expected;
    rows.push({query:`(asks for no-cost help: "${query}")`, result:{ids:[], urgent:null}, failures: ok ? [] : [`no-cost request ${got}, expected ${expected}`]});
    if (!ok) failed++;
  });

  /* The unchanged seven-listing fixture, searched as its own directory:
     actual result order, not just the classifications. IDs and category are
     added only so results can be identified and scored. */
  const fixture = costCases.map(([listing], i) => ({id:`fixture-${i + 1}`, category:"recovery", tags:[], ...listing}));
  const fixtureIds = searchResources(fixture, "free sober living", "en").results.map(r => r.id);
  const fixturePaid = ["fixture-1", "fixture-4", "fixture-5"], fixtureUnknown = ["fixture-2", "fixture-3", "fixture-7"];
  const fixtureProblems = [];
  if (fixtureIds[0] !== "fixture-6") fixtureProblems.push(`first is ${fixtureIds[0]}, expected fixture-6 (documented free housing)`);
  fixturePaid.forEach(paid => fixtureUnknown.forEach(unknown => {
    const pp = fixtureIds.indexOf(paid), pu = fixtureIds.indexOf(unknown);
    if (pp >= 0 && pu >= 0 && pp < pu) fixtureProblems.push(`${paid} (paid) before ${unknown} (unknown)`);
  }));
  rows.push({query:`(fixture order for "free sober living": ${fixtureIds.join(" ")})`, result:{ids:[], urgent:null}, failures: fixtureProblems});
  if (fixtureProblems.length) failed++;

  /* Fifth review: a no-cost fixture whose names never say "free". */
  const noCostFixture = [
    {id:"nc-paid", category:"recovery", tags:[], name:"Sober Living Home", description:"Sober living home for adults.", requirements:"Rent is $120/week."},
    {id:"nc-unknown", category:"recovery", tags:[], name:"Sober Living House", description:"Sober living for adults.", requirements:""},
    {id:"nc-free", category:"recovery", tags:[], name:"Sober Living Residence", description:"Housing is provided at no cost.", requirements:""}
  ];
  const noCostIds = searchResources(noCostFixture, "free sober living", "en").results.map(r => r.id);
  const noCostOk = JSON.stringify(noCostIds) === JSON.stringify(["nc-free", "nc-unknown", "nc-paid"]);
  rows.push({query:`(no-cost fixture order for "free sober living": ${noCostIds.join(" ")})`, result:{ids:[], urgent:null}, failures: noCostOk ? [] : ["expected nc-free nc-unknown nc-paid"]});
  if (!noCostOk) failed++;

  /* Search speed: the UI runs searchResources on every query. Budget is
     generous for desktop browsers; slow hardware may need more. */
  const perfQueries = ["food", "someone overdosed and i want to die and i need food pantry", "free sober living",
    "i need a computer to apply for jobs", "Hamilton Center", "zxqv blorpt", "ride to the food pantry", "homles"];
  const started = performance.now();
  perfQueries.forEach(q => searchResources(RESOURCES, q, "en"));
  const average = (performance.now() - started) / perfQueries.length;
  rows.push({query:`(average search time ${average.toFixed(1)} ms; budget 50 ms)`, result:{ids:[], urgent:null}, failures: average <= 50 ? [] : ["search too slow"]});
  if (average > 50) failed++;

  /* Eligibility stays visible on a card. (This check used employment-006,
     which the 2026-11 accuracy patch withheld: the gas-card program could
     not be verified. It now uses WIN Recovery's documented age requirement.) */
  const eligibilityCard = renderCard(RESOURCES.find(r => r.id === "recovery-014"));
  const eligibilityOk = eligibilityCard.includes("Must be 18 or older.");
  rows.push({query:"(recovery-014 card shows its eligibility requirement)", result:{ids:[], urgent:null}, failures: eligibilityOk ? [] : ["requirement not shown"]});
  if (!eligibilityOk) failed++;

  /* 2026-11 accuracy patch. Evidence for every item is recorded in
     tests/audit/resource-accuracy-2026-11-16.md. */
  const accuracy = [];
  /* ...listings withheld because their provider, program or contact details
     could not be verified are not in the dataset, so no search, category or
     crisis path can reach them */
  const WITHHELD = ["health-002", "health-004", "recovery-009", "crisis-004", "housing-004", "employment-006", "transport-004",
    "children-003", "children-008", "financial-002", "employment-008", "children-002", "legal-004", "immigration-001",
    /* Club Soda Sober Living: residents vacated under a city order (WTHI, 2026-09-16 and 2026-09-18); no reopening documented */
    "recovery-010"];
  WITHHELD.filter(id => RESOURCES.some(r => r.id === id)).forEach(id => accuracy.push(`${id} is withheld but still in the dataset`));
  const allText = r => [r.name, r.description, r.address, r.phone, r.website, r.requirements, (r.tags || []).join(" ")].join(" | ");
  [[/capwi/i, "CAPWI (does not serve Vigo County)"], [/1440 S\.? ?3rd/i, "1440 S 3rd St"], [/812-232-1201|1515 S\.? ?3rd/i, "former Indiana Legal Services Terre Haute office"],
   [/812-917-0100/, "unverified Terre Haute CARES number"], [/centerstone/i, "Centerstone (no Terre Haute location)"],
   [/neighborhood health clinic/i, "Neighborhood Health Clinic"], [/kathy'?s hope/i, "Kathy's Hope"], [/\bDCFS\b/, "DCFS"],
   [/tenant rights hotline/i, "Tenant Rights Hotline"], [/club soda|1330 lafayette|812-841-6319/i, "Club Soda Sober Living"]].forEach(([pattern, label]) => {
    const hits = RESOURCES.filter(r => pattern.test(allText(r))).map(r => r.id);
    if (hits.length) accuracy.push(`${label} still listed: ${hits.join(" ")}`);
  });
  ["Centerstone", "Neighborhood Health Clinic", "Kathy's Hope", "Terre Haute CARES", "CAPWI", "tenant rights hotline",
   "Club Soda", "sober living", "co-ed sober living", "recovery housing", "I need somewhere to live while staying sober"].forEach(query => {
    const found = searchResources(RESOURCES, query, "en").results.filter(r => WITHHELD.includes(r.id)).map(r => r.id);
    if (found.length) accuracy.push(`"${query}" returns withheld ${found.join(" ")}`);
  });
  /* ...corrected facts */
  const fact = (id, field, expected) => {
    const r = RESOURCES.find(x => x.id === id);
    if (!r) accuracy.push(`${id} missing`);
    else if (r[field] !== expected) accuracy.push(`${id} ${field} is "${r[field]}", expected "${expected}"`);
  };
  ["legal-001", "legal-011", "immigration-004"].forEach(id => { fact(id, "phone", "1-844-243-8570"); fact(id, "address", "Apply by phone or online"); });
  fact("financial-012", "address", "Vigo County Annex, 163 Oak St, Terre Haute, IN 47807"); fact("financial-012", "phone", "812-462-3261");
  fact("financial-008", "address", "721 Elm St, Terre Haute, IN 47807"); fact("financial-008", "phone", "812-232-5052");
  ["food-002", "financial-005"].forEach(id => { fact(id, "address", "2901 Wabash Ave, Suite 200, Terre Haute, IN 47803"); fact(id, "phone", "800-403-0864"); });
  fact("financial-001", "phone", "812-234-3517"); fact("education-002", "phone", "812-232-3917");
  ["financial-001", "financial-011", "education-002", "food-004", "children-007"].forEach(id => fact(id, "website", "https://www.wicaa.org"));
  if (!/^Terre Haute Housing Authority/.test((RESOURCES.find(r => r.id === "housing-003") || {}).name || "")) accuracy.push("housing-003 is not named Terre Haute Housing Authority");
  /* ...the verification date was advanced only on listings whose every
     displayed field was read on an official page; no other listing is stamped */
  const STAMPED = ["financial-005", "financial-008", "financial-012", "financial-013", "food-002", "immigration-004", "legal-001", "legal-011", "recovery-016"];
  const stamped = RESOURCES.filter(r => r.lastVerified === "2026-11").map(r => r.id).sort();
  if (JSON.stringify(stamped) !== JSON.stringify(STAMPED)) accuracy.push(`listings dated 2026-11 are ${stamped.join(" ")}, expected ${STAMPED.join(" ")}`);
  /* ...the naloxone listing names no Terre Haute location and offers no directions */
  const naloxone = RESOURCES.find(r => r.id === "recovery-016");
  if (!naloxone) accuracy.push("recovery-016 missing");
  else {
    if (!/^For an overdose happening now, call 911\./.test(naloxone.description)) accuracy.push("recovery-016 does not begin with the 911 instruction");
    if (/terre haute|vigo/i.test(allText(naloxone))) accuracy.push("recovery-016 names a local location");
    if (renderCard(naloxone).includes("maps.google.com")) accuracy.push("recovery-016 offers directions");
    if (!naloxone.tags.includes("harm reduction")) accuracy.push("recovery-016 lacks its harm reduction tag (Overdose Lifeline's own wording)");
  }
  /* ...Honey Creek Township Trustee: 6553 S Carlisle St is Fire Station 91,
     and no source gives the trustee's current office or hours, so the card
     offers neither an address, Directions nor fixed hours; the phone, from a
     2020 news report, is shown with that qualification */
  const honey = RESOURCES.find(r => r.id === "financial-014");
  if (!honey) accuracy.push("financial-014 missing");
  else {
    const card = renderCard(honey);
    if (/6553|carlisle|margaret/i.test(allText(honey) + " " + card)) accuracy.push("financial-014 shows an unverified office address");
    if (card.includes("maps.google.com")) accuracy.push("financial-014 offers Directions");
    if (/\d\s?(?:am|pm)\b|\bmon\b|mon–fri/i.test(honey.hours)) accuracy.push(`financial-014 advertises fixed hours "${honey.hours}"`);
    if (!card.includes('href="tel:8122351012"')) accuracy.push("financial-014 has no phone link");
    if (!/has not been reconfirmed/.test(honey.requirements)) accuracy.push("financial-014 phone is not qualified as unconfirmed");
    if (/emergency/i.test(honey.description)) accuracy.push("financial-014 still claims emergency assistance");
    /* No current source confirms the listing, so it carries no verification
       date (its earlier "2026-04" is kept in the audit record) and the card
       shows no "Verified" label. */
    if (honey.lastVerified !== "") accuracy.push(`financial-014 claims verification "${honey.lastVerified}"`);
    if (/rc-updated|Verified/.test(card)) accuracy.push("financial-014 card shows a verification badge");
  }
  /* ...Harrison Township issues vouchers, never cash; no other trustee's
     source documents cash payments */
  ["financial-013", "financial-014", "financial-015"].forEach(id => {
    if (((RESOURCES.find(r => r.id === id) || {}).tags || []).some(tag => /cash/i.test(tag))) accuracy.push(`${id} is tagged as cash assistance`);
  });
  rows.push({query:"(2026-11 accuracy patch: withheld listings unreachable, corrected facts in place)", result:{ids:[], urgent:null}, failures:accuracy});
  if (accuracy.length) failed++;

  /* Dataset integrity. Listings known to lack both a phone and a website are
     named, so a new one fails here (they are queued for owner verification). */
  const integrity = [];
  const seen = new Set();
  RESOURCES.forEach(r => { if (seen.has(r.id)) integrity.push(`duplicate id ${r.id}`); seen.add(r.id); });
  const NO_CONTACT_KNOWN = ["recovery-003", "recovery-007", "recovery-012", "education-009"];
  /* Listings whose verification date was withdrawn because no current
     source confirms them (audit record, financial-014). Only these may have
     no date, and each must have none. */
  const UNVERIFIED_KNOWN = ["financial-014"];
  const thisMonth = new Date().toISOString().slice(0, 7);
  RESOURCES.forEach(r => {
    if (!/^[a-z]+-\d{3}$/.test(r.id)) integrity.push(`${r.id}: unexpected id format`);
    if (!CATEGORY_META[r.category]) integrity.push(`${r.id}: unknown category ${r.category}`);
    if (!String(r.name || "").trim() || !String(r.description || "").trim()) integrity.push(`${r.id}: missing name or description`);
    if (r.phone && !/^(?:(?:1-)?\d{3}-\d{3}-\d{4}|211|988|911)$/.test(r.phone)) integrity.push(`${r.id}: phone format "${r.phone}"`);
    if (r.website && !/^https?:\/\/[^\s"<>]+$/.test(r.website)) integrity.push(`${r.id}: website "${r.website}"`);
    if (UNVERIFIED_KNOWN.includes(r.id)) { if (r.lastVerified !== "") integrity.push(`${r.id}: listed as unverified but dated "${r.lastVerified}"`); }
    else if (!/^\d{4}-(?:0[1-9]|1[0-2])$/.test(r.lastVerified || "") || r.lastVerified > thisMonth) integrity.push(`${r.id}: lastVerified "${r.lastVerified}"`);
    if (!r.phone && !r.website && !NO_CONTACT_KNOWN.includes(r.id)) integrity.push(`${r.id}: no phone and no website`);
    if (!Array.isArray(r.tags)) integrity.push(`${r.id}: tags missing`);
  });
  rows.push({query:`(dataset integrity: ${RESOURCES.length} listings)`, result:{ids:[], urgent:null}, failures:integrity});
  if (integrity.length) failed++;

  /* Directory corrections: the address shown and the Directions destination agree. */
  const dataChecks = [];
  const greyhoundCard = renderCard(RESOURCES.find(r => r.id === "transport-007"));
  if (!greyhoundCard.includes("750 Cherry St, Terre Haute, IN 47807")) dataChecks.push("Greyhound card does not show 750 Cherry St");
  if (!greyhoundCard.includes("maps.google.com/?q=750%20Cherry%20St%2C%20Terre%20Haute%2C%20IN%2047807")) dataChecks.push("Greyhound directions do not go to 750 Cherry St");
  const areaSeven = RESOURCES.find(r => r.id === "transport-003");
  const areaSevenCard = renderCard(areaSeven);
  if (areaSevenCard.includes("maps.google.com")) dataChecks.push("Area 7 card offers directions to a place that is not a pickup point");
  if (areaSeven.phone !== "812-232-2675") dataChecks.push(`Area 7 phone ${areaSeven.phone}`);
  const oldAddress = RESOURCES.filter(r => /700 S\.? 7th/i.test(`${r.address} ${r.description}`)).map(r => r.id);
  if (oldAddress.length) dataChecks.push(`700 S 7th St still listed: ${oldAddress.join(" ")}`);
  rows.push({query:"(Greyhound and Area 7 directory corrections)", result:{ids:[], urgent:null}, failures:dataChecks});
  if (dataChecks.length) failed++;

  /* Directions only to a usable destination: a street address or a named
     public landmark, never referral, intake, approximate or phone-only text. */
  const directionsTo = r => {
    const m = renderCard(r).match(/href="https:\/\/maps\.google\.com\/\?q=([^"]*)"/);
    return m ? decodeURIComponent(m[1]) : null;
  };
  const byId = id => RESOURCES.find(r => r.id === id);
  const directionChecks = [];
  /* (recovery-009, immigration-001 and crisis-004 were in this list until the
     2026-11 accuracy patch withheld them; legal-001 and education-003 were
     added when their addresses became "apply by phone or online") */
  ["recovery-001", "recovery-003", "recovery-005", "recovery-006", "recovery-011", "recovery-012", "recovery-013",
   "transport-002", "transport-003", "legal-001", "legal-009", "legal-011", "education-003", "education-009", "education-010",
   "employment-005", "employment-011", "immigration-003", "immigration-004", "senior-006", "housing-001"].forEach(id => {
    const r = byId(id);
    if (!r) { directionChecks.push(`${id} missing from the dataset`); return; }
    const to = directionsTo(r);
    if (to) directionChecks.push(`${id} offers directions to "${to}"`);
  });
  [["food-001", "430 N 14 1/2 St, Terre Haute, IN 47807"], ["transport-007", "750 Cherry St, Terre Haute, IN 47807"],
   ["transport-001", "901 S 14th St, Terre Haute, IN 47807"], ["legal-003", "One Library Square, Terre Haute, IN 47807"],
   ["legal-002", "Vigo County Courthouse, 33 S 4th St, Terre Haute, IN 47802"], ["recovery-014", "88 Wabash Court, Terre Haute, IN 47807"],
   ["recovery-002", "1547 S 7th St, Terre Haute, IN 47802"],
   /* Codex review: the named library (same phone as legal-003 at One
      Library Square) is a public destination */
   ["legal-010", "Vigo County Library"], ["legal-012", "Vigo County Library"],
   /* 2026-11 accuracy patch: verified office addresses */
   ["financial-012", "Vigo County Annex, 163 Oak St, Terre Haute, IN 47807"], ["financial-008", "721 Elm St, Terre Haute, IN 47807"],
   ["financial-005", "2901 Wabash Ave, Suite 200, Terre Haute, IN 47803"]].forEach(([id, address]) => {
    const r = byId(id);
    if (!r) { directionChecks.push(`${id} missing from the dataset`); return; }
    const to = directionsTo(r);
    if (to !== address) directionChecks.push(`${id} directions go to "${to}", expected "${address}"`);
  });
  if (!/>\s*(?:<svg[\s\S]*?<\/svg>)?\s*Directions to transit office</.test(renderCard(byId("transport-001")))) directionChecks.push("transit office label missing");
  /* The address is encoded into the link and escaped in the text */
  const hostile = renderCard({id:"t", name:"X", category:"other", description:"", address:"12 Main St \"><script>alert(1)</script>"});
  if (/<script>/.test(hostile) || !/q=12%20Main%20St%20%22%3E%3Cscript%3E/.test(hostile)) directionChecks.push("directions URL not encoded or address not escaped");
  rows.push({query:"(directions only to usable destinations)", result:{ids:[], urgent:null}, failures:directionChecks});
  if (directionChecks.length) failed++;

  /* Homepage counters (staging acceptance, 2026-11-17): "Categories" showed at
     once while "Resources listed" stayed blank until the scripts ran. Both
     numbers now come from the published data together. The markup values are
     checked against the data by the UI checks (tests/eval/ui.js), which can
     read index.html over http. */
  const counterChecks = [];
  const stats = heroStats();
  if (stats.resources !== RESOURCES.length) counterChecks.push(`resources ${stats.resources}, dataset has ${RESOURCES.length}`);
  /* Browse lists every category, so each must have a published listing for
     the counter to match what Browse shows */
  const emptyCategories = Object.keys(CATEGORY_META).filter(k => !RESOURCES.some(r => r.category === k));
  if (emptyCategories.length) counterChecks.push(`categories with no listings: ${emptyCategories.join(" ")}`);
  if (stats.categories !== Object.keys(CATEGORY_META).length) counterChecks.push(`categories ${stats.categories}, Browse lists ${Object.keys(CATEGORY_META).length}`);
  const fixtureStats = heroStats([{category:"food"}, {category:"food"}, {category:"pet"}]);
  if (fixtureStats.resources !== 3 || fixtureStats.categories !== 2) counterChecks.push(`fixture counted ${JSON.stringify(fixtureStats)}, expected 3 resources in 2 categories`);
  /* One call fills both, whatever either showed before */
  const counterFixture = document.createElement("div");
  counterFixture.hidden = true;
  counterFixture.innerHTML = `<div id="statResources"></div><div id="statCategories">99</div>`;
  document.body.appendChild(counterFixture);
  renderHeroStats();
  const shown = [counterFixture.querySelector("#statResources").textContent, counterFixture.querySelector("#statCategories").textContent];
  counterFixture.remove();
  if (shown[0] !== String(RESOURCES.length) || shown[1] !== String(stats.categories)) counterChecks.push(`renderHeroStats shows ${shown.join(" / ")}`);
  rows.push({query:`(homepage counters: ${stats.resources} resources, ${stats.categories} categories, filled together)`, result:{ids:[], urgent:null}, failures:counterChecks});
  if (counterChecks.length) failed++;

  return {rows, failed, total: rows.length};
}

function renderSuite() {
  const {rows, failed, total} = runSuite();
  const summary = failed ? `FAIL ${failed} of ${total}` : `PASS ${total} of ${total}`;
  document.title = summary;
  document.getElementById("summary").textContent = summary;
  document.getElementById("results").innerHTML = rows.map(row => `
    <tr class="${row.failures.length ? "fail" : "pass"}">
      <td>${row.failures.length ? "FAIL" : "pass"}</td>
      <td>${esc(row.query)}</td>
      <td>${esc(row.result.urgent || "")}</td>
      <td>${esc(row.result.ids.slice(0, 5).join(" "))}${row.result.ids.length > 5 ? ` … (${row.result.ids.length})` : ""}</td>
      <td>${esc(row.failures.join("; "))}</td>
    </tr>`).join("");
}

document.addEventListener("DOMContentLoaded", renderSuite);
