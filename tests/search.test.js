/* Search safety regression tests.
   Runs the real searchResources() against the real RESOURCES dataset.
   Open tests/search.test.html in a browser, or run headless (see README note
   at the top of search.test.html). */

const MENTAL = "mental-crisis";
const OVERDOSE = "overdose";

function run(query) {
  const search = searchResources(RESOURCES, query, "en");
  return {
    status: search.status,
    urgent: search.analysis.urgentEmergency,
    urgentAll: search.analysis.urgentEmergencies || (search.analysis.urgentEmergency ? [search.analysis.urgentEmergency] : []),
    crisis: search.analysis.crisisMatches || [],
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
  ["food pantry", [expect.topCategories(["food"], 10), expect.notOnlyCategory("pet")]]
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
    [{name:"Test Sober House", description:"Free housing. Meals cost $10/day.", requirements:""}, "free"]
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
