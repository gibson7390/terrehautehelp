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
  status: s => r => r.status === s ? null : `status ${r.status}, expected ${s}`
};

const mentalCrisis = [
  expect.urgent(MENTAL), expect.first("crisis-001"),
  expect.noCategory("pet"), expect.topCategories(["crisis"], 2)
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
