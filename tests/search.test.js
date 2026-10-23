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
  someCategory: (cat, n = Infinity) => r => r.categories.slice(0, n).includes(cat) ? null : `no ${cat} result${n === Infinity ? "" : ` in top ${n}`}`,
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
