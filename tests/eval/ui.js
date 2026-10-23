/* Filter / reset behaviour checks against the real index.html, loaded in an
   iframe. Must be served over http (same origin), e.g. http://localhost:8765/tests/eval/ui.html.
   Clicks use the page's own buttons; searches set the input and send Enter or
   click the Search button, exactly as the page's handlers expect. */

const frame = document.getElementById("site");
const W = () => frame.contentWindow;
const D = () => frame.contentDocument;
/* Top-level consts in the page's classic scripts are not window properties. */
const G = name => W().eval(name);
const pause = ms => new Promise(r => setTimeout(r, ms));

async function loadSite() {
  await new Promise(resolve => { frame.onload = resolve; frame.src = `../../index.html?ui=${Date.now()}`; });
  for (let i = 0; i < 50 && D().querySelectorAll(".cat-row").length < 15; i++) await pause(50);
}

/* Wait for the page's status region to be rewritten after an action. The page
   renders inside requestAnimationFrame and announces 120 ms later, so a
   non-empty status means the grid is current. A timeout is an error, never a
   silent read of stale results. */
async function act(fn) {
  const status = D().getElementById("resultsStatus");
  status.textContent = "";
  fn();
  for (let i = 0; i < 160 && !status.textContent; i++) await pause(50);
  if (!status.textContent) throw new Error("timed out waiting for the page to update");
  await pause(300);
}

function state() {
  const d = D(), sec = d.getElementById("resultsSection");
  const byName = {};
  G("RESOURCES").forEach(r => { byName[r.name] = r; });
  const cards = [...d.querySelectorAll("#resultsGrid .resource-card")];
  const urgent = cards.filter(c => c.querySelector("#overdoseEmergencyTitle,#mentalCrisisTitle"));
  const resources = cards.filter(c => !urgent.includes(c)).map(c => byName[c.querySelector(".rc-name").textContent]).filter(Boolean);
  const visible = el => el && el.offsetParent !== null && !el.closest(".visually-hidden");
  return {
    shown: !sec.hidden && sec.style.display !== "none",
    title: d.getElementById("resultsTitle").textContent,
    ids: resources.map(r => r.id),
    cats: resources.map(r => r.category),
    urgent: urgent.map(c => c.querySelector(".rc-name").id),
    urgentFirst: cards.length > 0 && urgent.includes(cards[0]),
    input: d.getElementById("globalSearch").value,
    focus: d.activeElement && d.activeElement.id,
    status: d.getElementById("resultsStatus").textContent,
    visibleText: [...d.querySelectorAll("main *")].filter(el => visible(el) && el.children.length === 0).map(el => el.textContent).join(" ")
  };
}

const search = (q, via = "enter") => act(() => {
  const input = D().getElementById("globalSearch");
  input.focus();
  input.value = q;
  if (via === "button") D().getElementById("searchBtn").click();
  else input.dispatchEvent(new KeyboardEvent("keydown", {key:"Enter", bubbles:true, cancelable:true}));
});
const click = selector => act(() => D().querySelector(selector).click());
const clear = async () => { await act(() => D().getElementById("clearBtn").click()); await pause(300); };

const UI_CASES = [];
const ui = (kind, name, run, meta = {}) => UI_CASES.push({group:"ui", kind, name, run, sev:"medium", ...meta});

/* Every category entry point shows exactly that category's resources. */
function categoryCheck(selector, cat) {
  return async () => {
    await click(selector);
    const s = state(), f = [];
    const expected = G("RESOURCES").filter(r => r.category === cat).length;
    if (!s.shown) f.push("results not shown");
    if (s.title !== G("CATEGORY_META")[cat].label) f.push(`title "${s.title}"`);
    if (s.ids.length !== expected) f.push(`${s.ids.length} cards, dataset has ${expected}`);
    if (s.cats.some(c => c !== cat)) f.push("cards from other categories");
    return f;
  };
}
["food","housing","health","crisis","recovery","legal","financial","employment","education",
 "children","senior","pet","immigration","transportation","other"].forEach(cat =>
  ui("filter", `category list: ${cat}`, categoryCheck(`.cat-row[data-category="${cat}"]`, cat)));
["food","housing","health","recovery","crisis"].forEach(cat =>
  ui("filter", `quick link: ${cat}`, categoryCheck(`.quick-link[data-filter="${cat}"]`, cat)));
["crisis","food","housing","health","employment","education","children","legal","recovery"].forEach(cat =>
  ui("filter", `situation card: ${cat}`, categoryCheck(`.sit-card[data-filter="${cat}"]`, cat)));

ui("search", "Enter and Search button give the same results", async () => {
  await search("food pantry", "enter"); const a = state().ids.join();
  await search("food pantry", "button"); const b = state().ids.join();
  return a && a === b ? [] : [`enter: ${a || "none"} / button: ${b || "none"}`];
});
ui("search", "a new search replaces the previous results", async () => {
  await search("food pantry"); await search("lawyer");
  const s = state();
  return [...(s.cats.includes("food") ? ["food results remain after searching 'lawyer'"] : []),
          ...(s.title !== "\"lawyer\"" ? [`title "${s.title}"`] : [])];
});
ui("search", "repeating a search gives identical results", async () => {
  await search("rent help"); const a = state().ids.join();
  await search("rent help"); const b = state().ids.join();
  return a === b ? [] : ["results differ"];
});
ui("search", "focus stays in the search box after Enter", async () => {
  await search("shelter");
  return state().focus === "globalSearch" ? [] : [`focus on ${state().focus}`];
});
ui("search", "search title is shown as text, not HTML", async () => {
  await search("<b>food</b>");
  const d = D(), f = [];
  if (d.querySelector("#resultsTitle b")) f.push("markup rendered in title");
  if (state().title !== "\"<b>food</b>\"") f.push(`title "${state().title}"`);
  return f;
}, {sev:"high"});
ui("search", "status region announces the result count", async () => {
  await search("food pantry");
  const s = D().getElementById("resultsStatus"), f = [];
  if (s.getAttribute("role") !== "status" || s.getAttribute("aria-live") !== "polite") f.push("status region attributes changed");
  if (!/resources? found/.test(s.textContent)) f.push(`status "${s.textContent}"`);
  return f;
}, {kind:"a11y-implementation"});

ui("reset", "Back to all hides results, empties the box and refocuses it", async () => {
  await search("food pantry"); await clear();
  const s = state(), f = [];
  if (s.shown) f.push("results still shown");
  if (s.input) f.push(`input "${s.input}"`);
  if (s.focus !== "globalSearch") f.push(`focus on ${s.focus}`);
  return f;
});
ui("reset", "Back to all after a filter hides results", async () => {
  await click('.cat-row[data-category="food"]'); await clear();
  return state().shown ? ["results still shown"] : [];
});
ui("reset", "filter, Back to all, then search works normally", async () => {
  await click('.cat-row[data-category="food"]'); await clear(); await search("shelter");
  const s = state();
  return s.cats[0] === "housing" ? [] : [`first result category ${s.cats[0]}`];
});
ui("reset", "empty search hides results and gives guidance", async () => {
  await search("food"); await search("");
  const s = state(), f = [];
  if (s.shown) f.push("results still shown");
  if (!s.status) f.push("no status message");
  return f;
});
ui("reset", "filler-only search shows visible guidance", async () => {
  await search("help");
  const s = state();
  return /Enter a need|Try entering the service/.test(s.visibleText) ? [] :["guidance is only in the screen-reader status region; nothing visible changes"];
}, {sev:"medium"});
ui("reset", "no-results screen links to the emergency section", async () => {
  await search("zxqv blorpt");
  return D().querySelector('#resultsGrid .empty-state a[href="#crisis"]') ? [] : ["no emergency link"];
}, {sev:"low"});

ui("crisis", "overdose search shows 911 guidance before resources", async () => {
  await search("someone overdosed");
  const s = state();
  return s.urgentFirst && s.urgent.includes("overdoseEmergencyTitle") ? [] : [`urgent: ${s.urgent.join() || "none"}`];
}, {sev:"critical"});
ui("crisis", "'i want to die' via Search button shows 988 guidance first", async () => {
  await search("i want to die", "button");
  const s = state();
  return s.urgentFirst && s.urgent.includes("mentalCrisisTitle") && !s.cats.includes("pet") ? [] : [`urgent: ${s.urgent.join() || "none"}; cats: ${s.cats.join(" ")}`];
}, {sev:"critical"});
ui("crisis", "crisis guidance stays visible after choosing an unrelated category", async () => {
  await search("i want to die");
  await click('.cat-row[data-category="pet"]');
  const s = state();
  return s.urgent.includes("mentalCrisisTitle") ? [] : ["988 guidance removed when the Pet category is chosen"];
}, {sev:"high"});

ui("filter+search", "a search after choosing a category", async () => {
  await click('.cat-row[data-category="food"]'); await search("kids");
  const s = state();
  return s.cats.every(c => c === "food") ? [] : [`results ignore the Food filter (${[...new Set(s.cats)].join(", ")})`];
}, {review:"the page has no combined filter; it is unclear whether a search should stay within the chosen category"});
ui("filter+search", "choosing a category after a search", async () => {
  await search("kids"); await click('.cat-row[data-category="housing"]');
  const s = state();
  return s.input === "" ? [] : [`search box still says "${s.input}" while showing ${s.title}`];
}, {sev:"low", review:"clearing vs keeping the query is a design choice"});

async function runUi() {
  const rows = [];
  for (const c of UI_CASES) {
    /* Harness timeouts (not assertion failures) are retried up to twice:
       headless browsers can stall the page's requestAnimationFrame. */
    let failures, errored, attempts = 0;
    do {
      attempts++;
      errored = false;
      await loadSite();
      try { failures = await c.run(); } catch (err) { failures = [`harness error: ${err.message}`]; errored = true; }
    } while (errored && attempts < 3);
    const outcome = errored ? "error" : !failures.length ? "pass" : c.review ? "ambiguous" : "fail";
    rows.push({group:c.group, kind:c.kind, name:c.name, sev:c.sev, review:c.review, failures, outcome, attempts});
  }
  const t = {total:rows.length, pass:0, fail:0, ambiguous:0, error:0};
  rows.forEach(r => t[r.outcome]++);
  const summary = `UI: ${t.pass}/${t.total} pass · ${t.fail} fail · ${t.ambiguous} ambiguous · ${t.error} harness errors`;
  document.title = summary;
  document.getElementById("summary").textContent = summary;
  document.getElementById("results").innerHTML = rows.map(r => `<tr><td>${esc(r.outcome)}</td><td>${esc(r.sev)}</td><td>${esc(r.kind)}</td><td>${esc(r.name)}</td><td>${esc(r.failures.join("; "))}${r.review ? ` <em>[review: ${esc(r.review)}]</em>` : ""}</td></tr>`).join("");
  document.getElementById("report-json").textContent = JSON.stringify({summary:t, rows});
  frame.remove();
}

runUi();
