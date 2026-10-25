# Search evaluation

Measures resource search against the real `resources.js` data. It runs entirely in
the browser, and no query leaves the machine. Coverage is broad but not complete:
a passing run means these cases behave as expected, not that search is correct.

## Files

| File | Purpose |
|---|---|
| `cases.js` | Independently written scenarios. Expectations come from reading `resources.js`, not from search output. |
| `variants.js` | Generated formatting and spelling variants of *reviewed* written cases. Reported as a separate set. |
| `holdout.js` | Reserved unfamiliar phrasings. **Not run by default.** See below. |
| `eval.js` / `eval.html` | Runs written cases and variants, then reports by group, severity and defect type. |
| `ui.js` / `ui.html` | Category filter, search, reset and crisis-card behaviour, driven through the real `index.html`. |

`tests/search.test.html` is the smaller regression suite for the search-safety fix.

## Running

- **Matrix:** open `tests/eval/eval.html` directly in a browser, or run it headless:
  ```
  & "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --dump-dom "file:///C:/Users/csmaj/Desktop/terrehautehelp/tests/eval/eval.html"
  ```
  The `<h1 id="summary">` line gives the totals. `<script id="report-json">` holds the machine-readable results.
- **UI checks:** these need http, because the site loads in a same-origin iframe. Serve the repository root on localhost and open `/tests/eval/ui.html` in a normal browser window. Headless Edge can stall the page's `requestAnimationFrame` rendering. Timeouts are therefore reported as *harness errors*, never as defects. Use a visible browser for a trustworthy UI result.
  - A timeout message now records where the site frame sat in the viewport, whether the frame's `requestAnimationFrame` fired within 2 seconds, and the frame's visibility state. A timeout with "did not fire" points to browser scheduling (hidden, background or throttled tab), not to a product defect.
  - `?only=<text>` runs only the checks whose name contains `<text>`; `?repeat=N` (max 20) repeats them. Each row's JSON includes the time each step took to update the page.

## Expectation keys

| Key | Meaning | Failure type |
|---|---|---|
| `g` | Urgent guidance must be `"mental-crisis"`, `"overdose"`, or `null` (none) | guidance |
| `first` | First result is this ID (or one of these IDs) | recall if absent, ranking if lower |
| `top` + `n` | Each ID is in the top `n` (default 5) | recall / ranking |
| `any` + `an` | At least one ID is in the top `an` (default 3) | recall / ranking |
| `has` | Each ID appears anywhere in the results | recall |
| `needs` | For each group of IDs, at least one is returned (one result per explicit need) | recall |
| `urgentAll` | Exact list of guidance cards, in order, e.g. `["overdose","mental-crisis"]` | guidance |
| `urgentIncludes` | These guidance cards must be among those shown (others may also appear) | guidance |
| `ahead: [[id, cat]]` | `id` is returned and ranks above every result in category `cat` | recall / ranking |
| `notAhead: [[id, cat]]` | If returned, `id` is not promoted above every `cat` result | precision |
| `before: [[a, b]]` | `a` is returned and ranks before `b` (if `b` is returned) | recall / ranking |
| `coverage: {cats, n}` | Each listed category has at least one result in the top `n` (useful early coverage of several needs, without naming organizations) | recall / ranking |

Order is always asserted by resource ID, never by score values.
| `not`, `notCat`, `notTop`, `notFirst` | Excluded IDs or categories | precision |
| `cats: {in, n}` | The top `n` results all belong to these categories | precision (recall if no results) |
| `none` / `empty` / `max` | No results / the "enter a service" prompt / result-count ceiling | precision |

## Outcomes and severity

- **fail:** a defect. The *type* is the most serious failed check, in this order: crisis guidance, then recall, then precision, then ranking. Recall, precision and guidance are all *matching* defects.
- **ambiguous:** the case has a `review` flag, meaning the expectation itself is uncertain. Never counted as a defect. A reviewer should decide the expectation, then remove the flag.
- **missing-data:** the case has a `gap` flag, meaning the dataset lacks a suitable resource. Search changes cannot fix these.
- **Severity:**
  - Crisis expressions are **critical** when the guidance or the first result is wrong. Other failures in that group are **high**.
  - Food, housing and crisis-category searches are **high**. Ambiguous and edge cases are **low**. Everything else is **medium**.
  - Outside crisis expressions, a ranking-only or precision-only failure drops one severity level.

## Variants

- Every reviewed written case gets one formatting variant: uppercase, tripled spaces, and trailing `?!`.
- Cases with a `v` word also get up to three spelling variants of that word: interior deletion, adjacent transposition, and vowel swap.
- A spelling variant is marked ambiguous when the typo is itself a known word, or is one edit from a *different* service term. Treat these flags as a heuristic, not a guarantee that a typo is unambiguous.
- Variants inherit their parent's expectations. To find problems that come only from the variant, compare a variant failure with its parent's outcome.

## Holdout policy

`holdout.js` holds phrasings that were deliberately kept out of tuning. `eval.html` does not load it: `eval.js` fetches it only when the page is opened with exactly `?holdout=1` (not `?holdout`, `?holdout=0` or `?holdout=true`), so a default run never puts the reserved cases in the page.
- Don't run it while changing search code.
- Don't copy its phrases into `cases.js` or the lexicon.
- Once a change is final, run `eval.html?holdout=1` once and record the result in the review.
- After that, the set has been used: write a fresh holdout set before the next tuning cycle.

**Status:** the holdout was run once, as author-run validation, against `app.js` `02ed160823871aec` (23 of 41 passed). That first-run report is preserved unchanged in `reports/holdout-run-1/`. The 41 cases are now regression coverage, not unseen tests; run them with `?holdout=1` and compare against that report. Any new holdout set should be written by someone other than the person tuning the search.

After independent review, four former-holdout expectations were corrected in `holdout.js` (03, 04, 12, 33); each carries a comment with its reason and its original expectation. The first-run report is not changed by those corrections.

## Known retrieval issues (tracked, not missing services)

Cases with a `known` field fail on purpose until the retrieval problem is fixed. The dataset already contains the help; the search does not reach it.

| Query | Expected | Dataset evidence | Current behaviour |
|---|---|---|---|
| got arrested need lawyer | legal-002 first | Vigo County Public Defender: "Court-appointed representation for criminal cases." | Ranks 13th; the query's words ("arrested", "lawyer") don't reach "criminal" or "public defender". |
| get my license back | employment-011 first | Fines & Fees Assistance Program: "Help paying court fines to restore driving privileges." | Not returned; "license" instead matches "licensed daycare providers" (children-008). |

Missing wording in the data (eyeglasses, named treatment medications, current availability, eligibility) does not establish that help is unavailable. Those `gap` cases need data verification, not search changes.

## Adding cases

1. Read the relevant entries in `resources.js` and write the expectation from the data.
2. If you're unsure what the right answer is, add `review: "why"`. If the data lacks a suitable resource, add `gap: "why"`.
3. Don't change an expectation to match current search output. Change it only when it misreads the data, and say so in a comment next to the case and in the commit message.

Cases marked `src:"codex"` and `src:"codex2"` come from the first and second code reviews of the search-safety branch.

Case IDs are positional (`multi-11` is the 11th multi case), so adding a case renumbers later IDs in its group. Compare runs by query text, not by ID.
