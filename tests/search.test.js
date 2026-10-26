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
const overdose = [
  expect.urgent(OVERDOSE), expect.first("crisis-004"), expect.noCategory("pet")
];
const notHumanCrisis = [expect.noCrisisMatch(), expect.urgent(null)];

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
  ["imigration", [expect.topCategories(["immigration"], 4)]],
  ["employmint", [expect.topCategories(["employment"], 5)]],
  ["papers to stay in the country", [
    expect.noCategory("pet"), expect.firstCategory("immigration"), expect.inTop("immigration-001", 3)
  ]],
  ["i need help with my papers to stay in the country", [
    expect.noCategory("pet"), expect.firstCategory("immigration")
  ]],

  /* Cross-category and edge cases */
  ["cant pay rent", [
    expect.urgent(null), expect.first("housing-004"),
    expect.inTop("housing-003", 5), expect.inTop("financial-013", 5), expect.noCategory("pet")
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
    expect.urgentList([OVERDOSE, MENTAL]), expect.returned("crisis-004"), expect.returned("crisis-001"),
    expect.anyReturned(["food-008","food-009","food-010","food-011","food-012"])
  ]],
  ["i want to die and someone overdosed", [expect.urgentList([OVERDOSE, MENTAL])]],
  ["someone overdosed and need food pantry and shelter and transportation", [
    expect.urgent(OVERDOSE), expect.returned("crisis-004"), expect.someCategory("food"),
    expect.someCategory("housing"), expect.someCategory("transportation"),
    expect.aheadOfCategory("crisis-004", "food"), expect.aheadOfCategory("crisis-004", "housing")
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
    expect.aheadOfCategory("crisis-004", "food"), expect.aheadOfCategory("crisis-001", "food"),
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
  ["transportation", [expect.categoryCount("transportation", 8)]],
  ["shelter", [expect.categoryCount("housing", 5)]],
  ["food", [expect.categoryCount("food", 10)]],

  /* Affordability among relevant results */
  ["free sober living", [
    expect.first("recovery-012"), expect.before("recovery-012", "recovery-002"),
    expect.before("recovery-010", "recovery-002"), expect.before("recovery-010", "recovery-004")
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
    expect.urgent(OVERDOSE), expect.first("crisis-004"), expect.notAheadOfCategory("recovery-014", "food")
  ]],
  ["someone overdosed need free help", [expect.urgent(OVERDOSE), expect.first("crisis-004")]],

  /* Separate needs vs qualifiers */
  ["ride to the food pantry", [
    expect.inTop("transport-004", 3), expect.someCategory("transportation", 3), expect.someCategory("food", 3)
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
  ["someone overdosed and is not breathing", [expect.urgentList([OVERDOSE, EMERGENCY]), expect.first("crisis-004")]],
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
  ["rentle assistance", [expect.firstOneOf(["housing-004","housing-003"]), expect.topCategories(["housing"], 2)]],
  ["pre school", [expect.first("education-002")]],
  ["free compter", [expect.first("digital-001")]],

  /* Gas cards / vouchers are one service across categories */
  ["gas voucher", [expect.first("transport-005"), expect.returned("employment-006"), expect.noCategory("housing")]],
  ["gas card", [expect.returned("transport-005"), expect.returned("employment-006")]],
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
     program's meals for its residents are not a meal service */
  ["free meals", [expect.firstOneOf(["food-003", "food-006", "food-007"]), expect.returned("food-005"),
    expect.before("food-007", "food-005"), expect.absent("recovery-010")]],
  ["i need a meal", [expect.firstOneOf(["food-003", "food-006", "food-007"]), expect.absent("recovery-010"),
    expect.before("food-007", "senior-001")]],
  ["hot meal today", [expect.firstOneOf(["food-003", "food-006", "food-007"]), expect.absent("recovery-010")]],
  ["i need food today", [expect.sameOrderAs("food")]],
  ["food pantry near me", [expect.topCategories(["food"], 8)]],
  /* ...the program asked for by name, or a named group, still comes first */
  ["free and reduced lunch", [expect.first("food-005")]],
  ["meals for seniors", [expect.first("senior-001")]],
  ["sober living with meals", [expect.returned("recovery-010")]],

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
  ["my son is using heroin", [expect.returned("crisis-004"), expect.returned("recovery-014")]],
  /* ...housing named: sober living still leads */
  ["sober living for my son", [expect.firstCategory("recovery"), expect.anyInTop(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-010", "recovery-011"], 3)]],
  /* ...ordinary uses of "using" and prescribed medication are not addiction */
  ["my son is using the bus", [expect.urgent(null), expect.noCategory("recovery")]],
  ["my son is using a computer", [expect.urgent(null), expect.noCategory("recovery")]],
  ["my son takes prescribed medication", [expect.urgent(null), expect.noCategory("recovery")]],
  /* ...described emergencies keep their existing guidance */
  ["my son overdosed on heroin", [expect.urgentIncludes(OVERDOSE), expect.first("crisis-004")]],
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
    expect.urgent(null), expect.before("health-001", "recovery-014"), expect.before("health-004", "recovery-014"),
    expect.before("recovery-015", "recovery-014")]]),
  ...["my son is using heroin", "my husband is addicted to opioids", "I need treatment for opioid addiction"].map(query => [query, [
    expect.inTop("recovery-014", 2)]]),
  ["I need help with substance use", [expect.urgent(null), expect.anyInTop(["health-001", "health-004", "recovery-015"], 3)]],
  ["I need sober housing", [expect.firstCategory("recovery"), expect.anyInTop(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-010", "recovery-011", "recovery-012"], 3)]],
  ["I need addiction treatment and somewhere to live", [
    expect.anyInTop(["health-001", "health-004", "recovery-014", "recovery-015"], 3),
    expect.anyReturned(["recovery-002", "recovery-010", "recovery-011", "recovery-012", "housing-002"])]],

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
  ["I need child protective services", [expect.returned("children-002")]],
  ["I need childcare", [expect.firstCategory("children")]],
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
      "recovery-009", "recovery-010", "recovery-011", "recovery-012", "recovery-013"]), expect.noCategory("housing")]]),
  ["I need medication assistance.", [expect.first("financial-016")]],
  ["I need help paying for prescriptions.", [expect.anyInTop(["senior-004", "financial-016", "crisis-003"], 3), expect.noCategory("recovery")]],
  /* ...while housing requests, including housing for that population, keep it */
  ["I need transitional housing for mental health and addiction recovery.", [expect.inTop("recovery-013", 3)]],
  ["I need housing while receiving addiction treatment.", [
    expect.anyInTop(["recovery-002", "recovery-009", "recovery-010", "recovery-011", "recovery-012", "recovery-013"], 3)]],
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
    expect.anyBefore(["recovery-007", "recovery-008", "recovery-009", "recovery-010", "recovery-011", "recovery-012"],
      ["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006"])]],
  ["sober living for my son", [
    expect.anyBefore(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-010"],
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
     only) and Kathy's Hope (Women only) keep their usual early places, as
     for "I need sober housing", and Bethany stays first as for "I need
     somewhere to stay" */
  ...["My daughter is helping me find sober housing.", "My son is helping me find sober housing."].map(query => [query, [
    expect.recipientSex(null), expect.firstCategory("recovery"), expect.inTop("recovery-002", 2), expect.inTop("recovery-009", 4),
    expect.before("recovery-002", "recovery-011"), expect.before("recovery-009", "recovery-011")]]),
  ["My daughter is helping me find somewhere to stay.", [expect.recipientSex(null), expect.first("housing-001")]],
  ["My son is helping me find housing.", [expect.recipientSex(null), expect.before("housing-001", "housing-006")]],
  /* ...a stated recipient still counts, including the speaker beside a helper */
  ["My daughter needs sober housing.", [expect.recipientSex("female"),
    expect.anyBefore(["recovery-007", "recovery-008", "recovery-009", "recovery-010", "recovery-011", "recovery-012"],
      ["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006"])]],
  ["My son needs sober housing.", [expect.recipientSex("male"),
    expect.anyBefore(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-010"],
      ["recovery-007", "recovery-008", "recovery-009"])]],
  ...["I am an adult man and need somewhere to live.", "My adult son needs somewhere to stay.", "My 25-year-old son needs housing."]
    .map(query => [query, [expect.recipientSex("male")]]),
  ["I am a woman and need shelter.", [expect.recipientSex("female")]],
  ["I am a man, and my daughter is helping me find housing.", [expect.recipientSex("male"), expect.before("housing-002", "housing-001")]],
  ["I am a woman, and my son is helping me find housing.", [expect.recipientSex("female"), expect.before("housing-001", "housing-006")]],
  /* ...and the person the request is for, not the helper */
  ["My daughter is helping me find sober housing for my son.", [expect.recipientSex("male"),
    expect.anyBefore(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-010"],
      ["recovery-007", "recovery-008", "recovery-009"])]],
  ["My son is helping my daughter find housing.", [expect.recipientSex("female"), expect.before("housing-001", "housing-006")]],
  ...["My mother takes medication every day.", "I take my prescription every morning."].map(query => [query, [
    expect.anyInTop(["financial-016", "senior-004", "crisis-003"], 2)]]),
  /* ...while a duration or housing request still finds housing */
  ["I need somewhere to stay for 90 days.", [expect.anyInTop(["recovery-013", "housing-002", "housing-001", "housing-006", "housing-007"], 3)]],
  ["I need transitional housing.", [expect.first("recovery-013")]],
  ["I need sober housing for several months.", [expect.firstCategory("recovery"),
    expect.anyInTop(["recovery-002", "recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-010", "recovery-011", "recovery-012"], 3)]],
  ["I need addiction treatment and housing.", [expect.firstCategory("recovery"),
    expect.anyInTop(["recovery-002", "recovery-010", "recovery-011", "recovery-012", "recovery-013"], 3),
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
    expect.anyBefore(["recovery-003", "recovery-004", "recovery-005", "recovery-006", "recovery-007", "recovery-008", "recovery-009", "recovery-010", "recovery-011", "recovery-012"],
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
    expect.urgent(null), expect.before("health-001", "recovery-014"), expect.before("health-004", "recovery-014"),
    expect.before("recovery-015", "recovery-014")]]),
  /* ...stated misuse of a prescribed drug is still misuse */
  ["I was prescribed oxycodone, but I'm taking more than prescribed.", [
    expect.urgent(null),
    expect.firstOneOf(["health-001", "health-004", "crisis-004", "recovery-014", "recovery-015", "recovery-001"]),
    expect.anyInTop(["health-001", "health-004", "recovery-014", "recovery-015"], 3)]],

  /* Rent assistance: documented rent help across categories (trustees
     included), not every program named "assistance" */
  ...["rent assistance", "help paying rent", "rental assistance"].map(query => [query, [
    expect.anyInTop(["housing-004", "financial-002", "financial-013"], 2), expect.returned("housing-004"),
    expect.returned("financial-002"), expect.returned("financial-013"), expect.returned("financial-014"),
    expect.absent("financial-016"), expect.absent("financial-008"), expect.absent("financial-001"),
    expect.absent("financial-005"), expect.absent("financial-012")]]),
  /* ...a combined request keeps both needs; a broad request stays broad */
  ["need help with rent and utilities", [expect.first("housing-004"), expect.returned("financial-001")]],
  ["i need financial help", [expect.returned("financial-016"), expect.returned("financial-008"), expect.returned("financial-001"), expect.returned("financial-002")]],

  /* Accepted staging searches stay as they are */
  ["i need a gas voucher", [expect.first("transport-005"), expect.returned("employment-006")]],
  ["terre haute bus route", [expect.busRoute(true), expect.first("transport-001")]],
  ["im homeless", [expect.returned("housing-002"), expect.returned("housing-006"), expect.returned("housing-001")]]
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

  /* Eligibility stays visible on a cross-category match. */
  const gasCard = renderCard(RESOURCES.find(r => r.id === "employment-006"));
  const eligibilityOk = gasCard.includes("Proof of employment offer.");
  rows.push({query:"(employment-006 card shows its eligibility requirement)", result:{ids:[], urgent:null}, failures: eligibilityOk ? [] : ["requirement not shown"]});
  if (!eligibilityOk) failed++;

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
  ["recovery-001", "recovery-003", "recovery-005", "recovery-006", "recovery-009", "recovery-011", "recovery-012", "recovery-013",
   "transport-002", "transport-003", "legal-009", "legal-011", "education-009", "education-010", "employment-005", "employment-011",
   "immigration-001", "immigration-003", "immigration-004", "senior-006", "crisis-004", "housing-001"].forEach(id => {
    const to = directionsTo(byId(id));
    if (to) directionChecks.push(`${id} offers directions to "${to}"`);
  });
  [["food-001", "430 N 14 1/2 St, Terre Haute, IN 47807"], ["transport-007", "750 Cherry St, Terre Haute, IN 47807"],
   ["transport-001", "901 S 14th St, Terre Haute, IN 47807"], ["legal-003", "One Library Square, Terre Haute, IN 47807"],
   ["legal-002", "Vigo County Courthouse, 33 S 4th St, Terre Haute, IN 47802"], ["recovery-014", "88 Wabash Court, Terre Haute, IN 47807"],
   ["recovery-002", "1547 S 7th St, Terre Haute, IN 47802"],
   /* Codex review: the named library (same phone as legal-003 at One
      Library Square) is a public destination */
   ["legal-010", "Vigo County Library"], ["legal-012", "Vigo County Library"]].forEach(([id, address]) => {
    const to = directionsTo(byId(id));
    if (to !== address) directionChecks.push(`${id} directions go to "${to}", expected "${address}"`);
  });
  if (!/>\s*(?:<svg[\s\S]*?<\/svg>)?\s*Directions to transit office</.test(renderCard(byId("transport-001")))) directionChecks.push("transit office label missing");
  /* The address is encoded into the link and escaped in the text */
  const hostile = renderCard({id:"t", name:"X", category:"other", description:"", address:"12 Main St \"><script>alert(1)</script>"});
  if (/<script>/.test(hostile) || !/q=12%20Main%20St%20%22%3E%3Cscript%3E/.test(hostile)) directionChecks.push("directions URL not encoded or address not escaped");
  rows.push({query:"(directions only to usable destinations)", result:{ids:[], urgent:null}, failures:directionChecks});
  if (directionChecks.length) failed++;

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
