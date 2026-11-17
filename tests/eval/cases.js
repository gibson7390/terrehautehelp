/* Search evaluation matrix — independently written scenarios.
   Expectations come from reading resources.js, NOT from current search output.
   See tests/eval/README.md for the expectation keys and review conventions.

   Kinds:  direct · everyday · misspell · service · org · multi · ambiguous ·
           crisis · lookalike · edge
   Flags:  review: "why"  — expectation is uncertain; a failure is reported as
                            "ambiguous", not as a defect.
           gap: "why"     — the dataset lacks a suitable resource; a failure is
                            reported as "missing data".
           v: "word"      — word used to generate spelling variants (variants.js).
   Severity defaults are set per group at the bottom of this file. */

/* 2026-11 accuracy patch. Fifteen listings were withheld from resources.js
   because their provider, program or contact details could not be verified,
   and fourteen were corrected from official sources (see
   tests/audit/resource-accuracy-2026-11-16.md). Expectations that named a
   withheld listing were rewritten from the corrected data: the withheld ID
   was dropped, or replaced by the listing that now documents the service.
   Where no remaining listing documents the service the case carries a `gap`
   flag beginning "withheld 2026-11". No expectation was changed to match
   search output. */
const EVAL_CASES = (() => {
  const groups = {};
  const add = (group, defaults) => (kind, query, exp = {}, meta = {}) => {
    (groups[group] = groups[group] || []).push({group, kind, query, exp, ...defaults, ...meta});
  };

  /* ── FOOD ─────────────────────────────────────────────────────────── */
  const food = add("food");
  food("direct", "food", {cats:{in:["food"], n:5}, notCat:["pet"]}, {v:"food"});
  food("direct", "food pantry", {top:["food-008","food-009","food-010","food-011","food-012"], n:8, notCat:["pet"]}, {v:"pantry"});
  food("direct", "food pantries", {any:["food-008","food-009","food-010","food-011","food-012","food-003","food-001"]});
  food("direct", "soup kitchen", {first:["food-007","food-003","food-006"], top:["food-007","food-003","food-006"], n:3}, {v:"kitchen"});
  food("direct", "hot meals", {top:["food-007","food-003","food-006"], n:4}, {v:"meals"});
  food("direct", "groceries", {cats:{in:["food"], n:3}}, {v:"groceries"});
  food("direct", "emergency food", {any:["food-001","food-003","food-008","food-009","food-010"], cats:{in:["food"], n:3}}, {v:"emergency"});
  food("direct", "food bank", {cats:{in:["food"], n:3}, notTop:{ids:["financial-004"], n:3}}, {review:"'bank' also matches the Diaper Bank"});
  food("service", "SNAP", {first:"food-002"});
  food("service", "food stamps", {any:["food-002"], an:3}, {sev:"medium"});
  food("service", "EBT card", {any:["food-002"], an:3}, {review:"EBT is not named in the data; SNAP listing is the closest"});
  food("service", "WIC", {top:["food-004","children-007"], n:2});
  food("service", "school lunch", {first:"food-005"}, {v:"lunch"});
  food("service", "free and reduced lunch", {first:"food-005"});
  food("service", "breakfast", {first:"food-006"});
  /* Corrected: food-004 (WIC, food listing) does not mention formula; only children-007 says "formula support". */
  food("service", "baby formula", {first:"children-007"});
  food("everyday", "i have no food", {cats:{in:["food"], n:5}});
  food("everyday", "we are out of food until payday", {cats:{in:["food"], n:3}});
  food("everyday", "im hungry", {cats:{in:["food"], n:5}, notCat:["pet"]});
  food("everyday", "my kids are hungry", {any:["food-005","food-004","children-007"], an:5, notCat:["pet"]}, {review:"kid-specific food vs general pantries"});
  food("everyday", "where can i eat today", {any:["food-007","food-003","food-006"], an:5});
  food("everyday", "need something to eat tonight", {any:["food-006"], an:5}, {review:"only Light House serves dinner; hours-based ranking is not supported"});
  food("everyday", "free food no id needed", {any:["food-007","food-011","food-012","food-003"], an:5}, {review:"requirement matching is not supported"});
  food("everyday", "hungry and homeless", {any:["food-006","housing-002"], an:3, has:["housing-002"]});
  food("misspell", "fud", {cats:{in:["food"], n:5}});
  food("misspell", "pantrys", {cats:{in:["food"], n:5}});
  food("misspell", "grocries", {cats:{in:["food"], n:3}});
  food("misspell", "soop kitchen", {any:["food-007","food-003","food-006"]});
  food("misspell", "hungery", {cats:{in:["food"], n:3}});
  food("misspell", "panty", {cats:{in:["food"], n:3}}, {review:"'panty' is a real word; correcting it to pantry is a guess"});
  food("org", "Mother Hubbard's Cupboard", {first:"food-008"});
  food("org", "mother hubbard", {first:"food-008"});
  food("org", "St Benedict", {first:"food-007"});
  food("org", "Basket of Love", {first:"food-009"});
  food("org", "Kings Harvest", {first:"food-012"});
  food("org", "Compassion Ministries", {first:"food-011"});
  food("org", "Covenant Cooperative", {first:"food-010"});
  food("org", "Catholic Charities", {first:"food-001"});
  food("org", "Salvation Army food", {first:"food-003"});

  /* ── HOUSING & SHELTER ────────────────────────────────────────────── */
  const housing = add("housing");
  housing("direct", "shelter", {top:["housing-001","housing-002"], n:3, notCat:["pet"]}, {v:"shelter"});
  housing("direct", "homeless shelter", {top:["housing-001","housing-002"], n:3});
  housing("direct", "emergency shelter", {top:["housing-001","housing-002"], n:4});
  housing("direct", "homeless", {top:["housing-002","housing-006"], n:5}, {v:"homeless"});
  housing("direct", "housing", {cats:{in:["housing"], n:3}}, {v:"housing"});
  housing("service", "section 8", {first:"housing-003"});
  housing("service", "housing voucher", {first:"housing-003"});
  housing("service", "low income housing", {first:"housing-003"});
  housing("service", "rental assistance", {first:["housing-003","financial-013"], top:["housing-003","financial-013"], n:3}, {v:"rental"});
  housing("service", "rent help", {any:["financial-013","housing-003"], an:2});
  housing("service", "eviction", {has:["legal-001"], any:["legal-001"]}, {v:"eviction"});
  housing("service", "day shelter", {first:"housing-006"});
  housing("service", "showers", {first:"housing-006"});
  housing("service", "laundry", {first:"housing-006"});
  housing("service", "place to take a shower", {first:"housing-006"});
  housing("service", "disability housing", {first:"housing-007"});
  housing("service", "womens shelter", {first:"housing-001"});
  housing("service", "shelter for women and children", {first:"housing-001"});
  housing("service", "stranded", {first:"housing-002"});
  housing("service", "utility shutoff", {top:["crisis-003"], n:3});
  housing("everyday", "i got nowhere to sleep tonight", {any:["housing-002","housing-001"], not:["recovery-016"]});  /* was not:["crisis-004"]: no overdose resource for a shelter request */
  /* Corrected (relevance repair): the old expectation required Housing/Crisis categories in the top 3,
     but Light House Mission's food-006 listing documents "emergency shelter … Shelter intake is 24/7",
     so a category test excluded a real overnight shelter. The intent kept: an overnight shelter first,
     no car-repair listing. Original: any housing-002/housing-001/housing-006, cats {in:[housing,crisis], n:3}. */
  housing("everyday", "sleeping in my car", {first:["housing-002","food-006","housing-001"], notCat:["transportation"]});
  housing("everyday", "need a place to stay", {any:["housing-002","housing-001"]});
  housing("everyday", "getting evicted", {top:["legal-001"], n:5});
  housing("everyday", "my landlord is kicking me out", {top:["legal-001"], n:5});
  housing("everyday", "behind on rent", {any:["financial-013","housing-003"], an:2});  /* was housing-004 or a trustee in the top 2 */
  housing("everyday", "kicked out of my house", {any:["housing-002","housing-001","housing-006"], notTop:{ids:["recovery-004","recovery-005","recovery-008"], n:3}}, {review:"could mean family conflict or a tenant issue"});
  housing("everyday", "no where to go", {any:["housing-002","housing-001","crisis-005"], an:3}, {sev:"high"});
  housing("everyday", "need housing for someone with disabilities", {first:"housing-007"});
  housing("misspell", "shleter", {top:["housing-001","housing-002"], n:3});
  housing("misspell", "homles", {any:["housing-002","housing-001","housing-006"]});
  housing("misspell", "evection", {any:["legal-001"], an:5}, {review:"distance 1 from 'election'-like words; not a known vocabulary word"});
  /* Corrected (third review): aligned with the correctly spelled "rental assistance" case, which accepts either listing tagged "rental assistance". */
  housing("misspell", "rentle assistance", {first:["housing-003","financial-013"]});
  housing("misspell", "sectoin 8", {first:"housing-003"});
  housing("org", "Bethany House", {first:"housing-001"});
  housing("org", "Light House Mission", {top:["housing-002","food-006"], n:2});
  housing("org", "lighthouse mission", {top:["housing-002","food-006"], n:2});
  housing("org", "Pathways", {first:"housing-006"});
  housing("org", "Reach Services", {first:"housing-007"});
  housing("org", "housing authority", {first:"housing-003"});

  /* ── HEALTHCARE ───────────────────────────────────────────────────── */
  const health = add("health");
  health("direct", "doctor", {cats:{in:["health"], n:3}}, {v:"doctor"});
  health("direct", "free clinic", {top:["health-009","health-007"], n:4}, {v:"clinic"});
  health("direct", "dentist", {first:"health-007"}, {v:"dentist"});
  health("direct", "dental", {first:"health-007"});
  health("direct", "mental health", {top:["health-001","health-005"], n:6});
  health("direct", "urgent care", {first:"health-008", not:["senior-003"]});
  health("service", "walk in clinic", {first:"health-008"});
  health("service", "eye exam", {any:["health-007"]}, {review:"only 'vision screenings' are listed"});
  health("service", "glasses", {any:["health-007"], an:5}, {gap:"no eyeglasses provider in the dataset"});
  health("service", "vaccinations", {first:"health-003"}, {v:"vaccinations"});
  health("service", "shots", {any:["health-003"], an:2}, {review:"'shots' is not in the data; pet vaccines are also plausible"});
  health("service", "tb test", {first:"health-003"});
  health("service", "school physical", {first:"health-003"});
  health("service", "physicals", {top:["health-003","health-008"], n:3});
  health("service", "veterans health care", {first:"health-006"});
  health("service", "va clinic", {first:"health-006"});
  health("service", "therapy", {any:["health-001"], an:3});
  health("service", "psychiatrist", {any:["health-001","recovery-015"]});
  health("service", "prescription help", {has:["financial-016","senior-004","crisis-003"], any:["financial-016","senior-004","crisis-003"], an:3}, {v:"prescription"});
  health("service", "x-ray", {first:"health-008"});
  health("service", "uti", {first:"health-009"});
  health("service", "sliding scale", {any:["health-007","health-001"]});
  health("service", "medicaid", {any:["food-002","financial-005"], an:5}, {known:"the Division of Family Resources listings (food-002, financial-005) document health-coverage enrollment but do not use the word Medicaid; the search does not connect them"});  /* review flag replaced: its reason (no enrollment office listed) is no longer true */
  health("everyday", "i am sick and have no insurance", {any:["health-009","health-007"]});
  health("everyday", "my tooth hurts", {any:["health-007"]});
  health("everyday", "toothache", {any:["health-007"]});
  health("everyday", "cant afford my medicine", {any:["financial-016","senior-004","crisis-003"], an:5});
  health("everyday", "i need someone to talk to", {any:["health-001","health-005","crisis-001"], an:5}, {review:"could be emotional support or a crisis"});
  health("everyday", "sick but no money for a doctor", {any:["health-009","health-007"], an:5});
  health("everyday", "where can i see a doctor today", {first:["health-008","health-009"]}, {review:"same-day availability is not represented in the data"});
  health("misspell", "docter", {cats:{in:["health"], n:3}});
  health("misspell", "clinc", {cats:{in:["health"], n:3}});
  health("misspell", "perscription", {any:["financial-016","senior-004","crisis-003"], an:5});
  health("misspell", "insurence", {cats:{in:["health"], n:3}});
  health("misspell", "dentel", {first:"health-007"});
  health("org", "Hamilton Center", {top:["health-001","crisis-001"], n:4});
  health("org", "Centerstone", {none:true}, {gap:"withheld 2026-11: Centerstone lists no Terre Haute location"});
  health("org", "Mental Health America", {top:["health-005","financial-016"], n:2});
  health("org", "Neighborhood Health Clinic", {cats:{in:["health"], n:3}}, {gap:"withheld 2026-11: no source confirms this clinic; other clinics are the nearest help"});
  health("org", "Wabash Valley Health Center", {first:"health-007"});
  health("org", "Ambucare", {first:"health-008"});
  health("org", "Mollie Wheat", {first:"health-009"});
  health("org", "health department", {first:"health-003"});

  /* ── CRISIS & EMERGENCY (category searches; see "crisis" group for expressions) */
  const crisis = add("crisis");
  crisis("direct", "crisis line", {first:"crisis-001"});
  crisis("direct", "hotline", {any:["crisis-001","crisis-002","crisis-005"]});
  crisis("direct", "emergency help", {cats:{in:["crisis","financial"], n:3}}, {review:"'emergency' spans crisis and emergency-cash listings"});
  crisis("service", "211", {first:"crisis-005"});
  crisis("service", "2-1-1", {first:"crisis-005"});
  /* Terre Haute CARES (crisis-004) was withheld 2026-11; recovery-016 is the statewide naloxone map and kit-request listing read from Overdose Lifeline and the Indiana Department of Health. */
  crisis("service", "naloxone", {g:null, first:"recovery-016"});
  crisis("service", "narcan", {g:null, first:"recovery-016"});
  crisis("service", "harm reduction", {g:null, first:"recovery-016"});  /* Overdose Lifeline calls its naloxone kits and test strips harm reduction supplies (independent review 2026-11-17) */
  crisis("service", "domestic violence", {first:"crisis-002", top:["housing-001"], n:4, has:["legal-006","children-006"]}, {v:"violence"});
  crisis("service", "sexual assault", {first:"crisis-002"});
  crisis("service", "safety plan", {any:["crisis-002","legal-006"], an:2});
  crisis("service", "emergency money", {any:["crisis-003","financial-003"]});
  crisis("service", "utility shutoff notice", {any:["crisis-003","financial-001"]});
  crisis("everyday", "who do i call when i dont know where to start", {any:["crisis-005"], an:3}, {review:"conversational; 211 is the documented first call"});
  crisis("org", "CODA", {top:["crisis-002","legal-006","children-006"], n:3});
  crisis("org", "Terre Haute CARES", {not:["crisis-003","crisis-005"]}, {gap:"withheld 2026-11: no source confirms this program"});
  crisis("org", "Anabranch", {first:"crisis-008"});

  /* ── CRISIS EXPRESSIONS (guidance) ────────────────────────────────── */
  const ce = add("crisis-expr");
  const mental = {g:"mental-crisis", first:"crisis-001", notCat:["pet"]};
  const od = {g:"overdose", notCat:["pet"], not:["crisis-003","crisis-005"]};
  const dv = {first:"crisis-002", top:["housing-001"], n:5, notCat:["pet"], not:["senior-003"]};
  ["i want to die","i wanna die","i want to end my life","i want to kill myself","im going to kill myself",
   "thinking about suicide","suicidal","i feel suicidal","suicidal thoughts","i dont want to live anymore",
   "i wish i was dead","better off dead","no reason to live","self harm","self-harm","selfharm",
   "i cut myself","cutting myself","hurting myself","suicide hotline"].forEach(q => ce("crisis", q, mental));
  ce("crisis", "panic attack", {g:"mental-crisis", notCat:["pet"]});
  ce("crisis", "im having a panic attack", {g:"mental-crisis", notCat:["pet"]});
  ce("crisis", "i want to hurt myself", mental, {review:"pattern list covers 'hurting myself'; 'want to hurt myself' should also match"});
  ce("crisis", "i might do something to myself", mental, {review:"indirect phrasing"});
  ["overdose","someone overdosed","he overdosed","he od","my friend od on fentanyl","she is oding"].forEach(q => ce("crisis", q, od));
  /* Corrected (fifth review): release-critical, no longer flagged. Both need the site's general emergency
     guidance ("For emergencies, call 911."); neither is assumed to be an overdose or an intentional act. */
  ce("crisis", "she took too many pills", {urgentAll:["emergency"], notCat:["pet"]});
  ce("crisis", "he is not breathing", {urgentAll:["emergency"], notCat:["pet"]});
  ["my boyfriend hits me","my husband beats me","he hits me","i dont feel safe at home","im scared of my husband",
   "abusive relationship","my partner threatens me","he choked me"].forEach(q => ce("crisis", q, dv));
  ce("crisis", "i was raped", {first:"crisis-002", notCat:["pet"]});
  ce("crisis", "leaving my abuser", dv);
  ce("crisis", "my ex is stalking me", {first:"crisis-002"}, {review:"stalking is not named in the data"});
  /* Review findings (Codex): mixed urgent needs keep both guidance cards and every explicit need */
  /* Second review: emergency-specific resources must precede routine help, without promoting every Crisis listing. */
  ce("crisis", "someone overdosed and i want to die and i need food pantry",
    {urgentAll:["overdose","mental-crisis"], has:["crisis-001"], any:["food-008","food-009","food-010","food-011","food-012"], an:12,
     ahead:[["crisis-001","food"]], notAhead:[["crisis-003","food"],["crisis-005","food"],["crisis-008","food"]]}, {src:"codex"});
  ce("crisis", "i want to die and need food pantry",
    {urgentAll:["mental-crisis"], ahead:[["crisis-001","food"]], notAhead:[["crisis-003","food"]], needs:[["food-008","food-009","food-010","food-011","food-012","food-003","food-001"]]}, {src:"codex2"});
  /* Second review: genuine phrases with ordinary continuations, and past tense */
  ce("crisis", "i am cutting myself while alone", mental, {src:"codex2"});
  ce("crisis", "i want to kill myself over this", mental, {src:"codex2"});
  ce("crisis", "i self harmed", mental, {src:"codex2"});
  ce("crisis", "cutting myself a piece of cake but i want to die", mental, {src:"codex2"});
  ce("crisis", "i want to end it with my boyfriend because i want to die", mental, {src:"codex2"});
  ce("crisis", "i want to end it all", mental, {src:"codex2"});
  ce("crisis", "i want to die and someone overdosed", {urgentAll:["overdose","mental-crisis"], has:["crisis-001"]}, {src:"codex"});
  ce("crisis", "i want to die and my friend is odd", {urgentAll:["mental-crisis"], first:"crisis-001", notCat:["pet"]}, {src:"codex"});
  ce("crisis", "my friend is odd and i want to die", {urgentAll:["mental-crisis"], first:"crisis-001", notCat:["pet"]}, {src:"codex"});
  ce("crisis", "he od'd on fentanyl", od, {src:"codex"});
  ce("crisis", "he hit me", dv, {src:"codex"});
  ce("crisis", "he hits my children", {first:["crisis-002","children-006"], top:["children-006"], n:3, has:["housing-001"], notCat:["pet"]}, {src:"codex"});

  /* ── LOOK-ALIKES: ordinary phrases that resemble crisis phrases ───── */
  const look = add("lookalike");
  const noCrisis = {g:null, notFirst:["crisis-001"]};
  look("lookalike", "my dog died", {...noCrisis, cats:{in:["pet"], n:1}});
  look("lookalike", "my cat is dying", {...noCrisis});
  look("lookalike", "dying my hair", noCrisis);
  look("lookalike", "cutting hair classes", noCrisis);
  look("lookalike", "cutting board", noCrisis);
  look("lookalike", "safe driving course", noCrisis);
  look("lookalike", "food safety class", noCrisis);
  look("lookalike", "how to kill bed bugs", noCrisis);
  look("lookalike", "kill time", noCrisis);
  look("lookalike", "dead battery", noCrisis);
  look("lookalike", "deadline for taxes", {...noCrisis, any:["financial-007","senior-006"]});
  look("lookalike", "my phone died", noCrisis);
  look("lookalike", "funeral for my dad who died", {...noCrisis, first:["financial-008","financial-013"]});
  look("lookalike", "my mom died need burial help", {...noCrisis, first:["financial-008","financial-013"]});
  look("lookalike", "hurt my back at work", noCrisis);
  look("lookalike", "self employed", noCrisis);
  look("lookalike", "self help", noCrisis);
  look("lookalike", "overdue bills", {...noCrisis, cats:{in:["financial","housing"], n:3}});
  look("lookalike", "odd jobs", {...noCrisis, cats:{in:["employment"], n:3}});
  look("lookalike", "od", noCrisis);
  look("lookalike", "die", noCrisis);
  /* Review flag removed: the review confirmed "hit me up" is slang for contacting someone. */
  look("lookalike", "he hit me up about a job", {g:null, not:["crisis-002"], cats:{in:["employment"], n:2}});
  look("lookalike", "she hit me up", {g:null, not:["crisis-002"]}, {src:"codex"});
  look("lookalike", "my friend is odd", {g:null, not:["recovery-016"]}, {src:"codex"});  /* was not:["crisis-004"] */
  look("lookalike", "cutting myself a piece of cake", {g:null, not:["crisis-001"]}, {src:"codex"});
  look("lookalike", "this homework is killing me", {g:null, not:["crisis-001"], any:["education-008"]}, {src:"codex"});
  look("lookalike", "i want to end it with my boyfriend and start dating other people", {g:null, not:["crisis-001"]}, {src:"codex2"});
  look("lookalike", "i cut myself shaving", {g:null, not:["crisis-001"]}, {src:"codex2"});
  look("lookalike", "i am not breathing hard after exercise", {urgentAll:[]}, {src:"codex3"});
  look("lookalike", "he is not breathing heavily anymore", {urgentAll:[]}, {src:"codex3"});
  look("lookalike", "i did not take too many pills", {urgentAll:[]}, {src:"codex3"});
  look("lookalike", "i take too many pills to keep track of", {urgentAll:[]}, {src:"codex3"});
  look("lookalike", "killing myself laughing", {g:null, not:["crisis-001"]}, {src:"codex2"});
  look("lookalike", "killing it at my new job", noCrisis);
  look("lookalike", "dying to find a job", {...noCrisis, cats:{in:["employment"], n:2}}, {review:"idiom"});
  look("lookalike", "safe place for my kids after school", {g:null, any:["children-004","education-008"]}, {review:"could signal safety concern"});
  look("lookalike", "suicide prevention training", {}, {review:"educational intent; 988 guidance may still be acceptable"});

  /* ── RECOVERY & AA/NA ─────────────────────────────────────────────── */
  const rec = add("recovery");
  rec("direct", "aa meeting", {first:"recovery-001"}, {v:"meeting"});
  rec("direct", "na meetings", {first:"recovery-001"});
  rec("direct", "alcoholics anonymous", {first:"recovery-001"}, {v:"alcoholics"});
  rec("direct", "narcotics anonymous", {first:"recovery-001"});
  rec("direct", "sober living", {cats:{in:["recovery"], n:5}, notCat:["pet"]}, {v:"sober"});
  rec("direct", "rehab", {any:["recovery-015","recovery-014","crisis-008"], an:5, notTop:{ids:["education-010"], n:5}}, {v:"rehab"});
  rec("direct", "detox", {first:"recovery-015"}, {v:"detox"});
  rec("service", "sober living for women", {any:["recovery-007","recovery-008"], notTop:{ids:["recovery-002","recovery-003","recovery-004","recovery-005","recovery-006"], n:3}});
  rec("service", "sober living for men", {any:["recovery-002","recovery-003","recovery-004","recovery-005","recovery-006"], notTop:{ids:["recovery-007","recovery-008"], n:3}});
  rec("service", "sober living that allows children", {any:["recovery-007","recovery-011"]});
  rec("service", "co-ed sober living", {top:["recovery-011"], n:3});  /* recovery-010 (Club Soda) withheld 2026-11 */
  rec("service", "oxford house", {top:["recovery-004","recovery-005","recovery-008"], n:3});
  rec("service", "halfway house", {cats:{in:["recovery"], n:3}}, {gap:"withheld 2026-11: the only listing called a halfway house (Kathy's Hope) is certified in Valparaiso, not Terre Haute"});
  /* recovery-012 is documented free; recovery-002 charges $100/week and the Oxford Houses require an equal share of expenses. */
  rec("service", "free sober living", {first:"recovery-012", before:[["recovery-012","recovery-002"],["recovery-007","recovery-002"],["recovery-003","recovery-004"]]});  /* recovery-010 (no cost documented) withheld 2026-11; recovery-007 and recovery-003 document no cost either */
  rec("service", "dual diagnosis", {top:["recovery-013","recovery-015"], n:3});
  rec("service", "medication assisted treatment", {first:"recovery-014"});
  rec("service", "MAT", {first:"recovery-014"});
  rec("service", "opioid addiction", {any:["recovery-014"]});
  rec("service", "methadone", {any:["recovery-014"]}, {review:"WIN offers MAT but the data does not name methadone"});
  rec("service", "suboxone", {any:["recovery-014"]}, {review:"WIN offers MAT but the data does not name suboxone"});
  rec("service", "inpatient rehab", {first:"recovery-015"});
  rec("service", "12 step", {cats:{in:["recovery"], n:3}});
  rec("everyday", "i cant stop drinking", {any:["recovery-001","recovery-015","health-001"], an:5});
  rec("everyday", "i need to get clean", {cats:{in:["recovery","health","crisis"], n:3}});
  rec("everyday", "addicted to pills", {any:["recovery-014","recovery-015","health-001"], an:5});
  rec("everyday", "my son is on drugs", {cats:{in:["recovery","health","crisis"], n:3}}, {review:"family member seeking help"});
  rec("everyday", "want to quit meth", {cats:{in:["recovery","health","crisis"], n:3}});
  rec("everyday", "need a sober house today", {cats:{in:["recovery"], n:3}});
  rec("misspell", "sober houes", {cats:{in:["recovery"], n:5}});
  rec("misspell", "sobor living", {cats:{in:["recovery"], n:5}});
  rec("misspell", "alchohol", {cats:{in:["recovery","health"], n:3}});
  rec("misspell", "rehabb", {cats:{in:["recovery"], n:3}});
  rec("misspell", "oxferd house", {top:["recovery-004","recovery-005","recovery-008"], n:3}, {review:"two-letter error in a proper name"});
  rec("org", "Odyssey House", {first:"recovery-002"});
  rec("org", "Roadways to Recovery", {first:"recovery-003"});
  rec("org", "Truman House", {first:"recovery-006"});
  rec("org", "Phoenix House", {first:"recovery-007"});
  rec("org", "Kathys Hope", {none:true}, {gap:"withheld 2026-11: the only state-certified Kathy's Hope is in Valparaiso"});
  rec("org", "Club Soda", {none:true}, {gap:"withheld 2026-11: residents vacated under a city order in September 2026 (WTHI); no reopening is documented"});
  rec("org", "Next Step", {first:"recovery-011"});
  rec("org", "Light Life", {first:"recovery-012"});
  rec("org", "Oak Street House", {first:"recovery-013"});
  rec("org", "WIN Recovery", {first:"recovery-014"});
  rec("org", "Harsha", {first:"recovery-015"});

  /* ── LEGAL ────────────────────────────────────────────────────────── */
  const legal = add("legal");
  legal("direct", "lawyer", {any:["legal-001","legal-007","legal-009"]}, {v:"lawyer"});
  legal("direct", "attorney", {any:["legal-001","legal-007","legal-009"]}, {v:"attorney"});
  legal("direct", "legal aid", {top:["legal-001"], n:2});
  legal("direct", "free lawyer", {any:["legal-001","legal-007"], an:2});
  legal("service", "public defender", {first:"legal-002"});
  legal("service", "expungement", {first:"legal-003"}, {v:"expungement"});
  legal("service", "seal my record", {first:"legal-003"});
  legal("service", "clear my criminal record", {first:"legal-003"});
  legal("service", "tenant rights", {top:["legal-001","legal-012"], n:3});
  legal("service", "small claims", {first:"legal-005"});
  legal("service", "protection order", {first:"legal-006"});
  /* Review flag removed: legal-006 is the only protection-order resource, so the expectation is unambiguous. */
  legal("service", "protective order", {first:"legal-006"});
  legal("service", "custody", {first:"legal-001"});
  legal("service", "divorce", {first:"legal-001"});  /* gap flag removed: Indiana Legal Services (legal-001) now names divorce under family law */
  legal("service", "bankruptcy", {first:"legal-010"});
  legal("service", "debt collectors", {any:["legal-010","financial-011"], an:2});
  legal("service", "court date", {first:"legal-008"});
  legal("service", "look up my case", {first:"legal-008"});
  legal("service", "know your rights", {top:["legal-012","immigration-002"], n:2});
  legal("service", "attorney referral", {first:"legal-009"});
  legal("service", "pro bono", {first:"legal-007"});
  legal("everyday", "my landlord wont fix anything", {any:["legal-001"]});
  legal("everyday", "i have a warrant", {any:["legal-002","legal-008"], an:5}, {gap:"no warrant-specific resource"});
  legal("everyday", "need help with court", {any:["legal-005","legal-008","legal-002","legal-001"]});
  /* Known retrieval/ranking issue (fifth review), not a missing service: legal-002 Vigo County Public Defender
     offers "Court-appointed representation for criminal cases"; the query's words do not reach it. */
  legal("everyday", "got arrested need lawyer", {first:"legal-002"}, {known:"retrieval: public defender ranks low for arrest wording"});
  legal("everyday", "they cut off my benefits", {any:["legal-001"], an:5}, {review:"'cut' + 'benefits'; legal aid lists benefits cases"});
  legal("misspell", "lawer", {any:["legal-001","legal-007","legal-009"]});
  legal("misspell", "atorney", {any:["legal-001","legal-007","legal-009"]});
  legal("misspell", "expungment", {first:"legal-003"});
  legal("misspell", "custady", {first:"legal-001"});
  legal("org", "Indiana Legal Services", {top:["legal-001"], n:3});
  legal("org", "bar association", {first:"legal-009"});
  legal("org", "mycase", {first:"legal-008"});
  legal("org", "Neighborhood Christian Legal Clinic", {first:"legal-007"});

  /* ── FINANCIAL HELP ───────────────────────────────────────────────── */
  const fin = add("financial");
  fin("direct", "financial help", {cats:{in:["financial"], n:3}}, {v:"financial"});
  fin("direct", "emergency cash", {any:["financial-003","crisis-003"]});  /* financial-013 dropped: Harrison Township issues vouchers, never cash */
  fin("service", "LIHEAP", {first:"financial-001"});
  fin("service", "heating bill", {first:"financial-001"});
  fin("service", "energy assistance", {first:"financial-001"});
  fin("service", "diapers", {first:"financial-004"}, {v:"diapers"});
  fin("service", "diaper bank", {first:"financial-004"});
  fin("service", "TANF", {first:"financial-005"});
  fin("service", "cash assistance for families with children", {any:["financial-005"], an:3});
  fin("service", "disability benefits", {first:"financial-006"});
  fin("service", "SSI", {first:"financial-006"});
  fin("service", "SSDI", {first:"financial-006"});
  fin("service", "free tax help", {top:["financial-007"], n:2});
  fin("service", "taxes", {any:["financial-007","senior-006"]});
  fin("service", "burial assistance", {top:["financial-008"], n:2, has:["financial-013"]}, {v:"burial"});
  fin("service", "funeral costs", {first:["financial-008","financial-013"]});
  fin("service", "united way", {top:["financial-009"], n:2});
  fin("service", "clothing", {first:["financial-010","housing-006"]}, {v:"clothing"});
  fin("service", "furniture", {first:"financial-010"});
  fin("service", "budget help", {first:"financial-011"});
  fin("service", "credit repair", {any:["financial-011"], an:3}, {gap:"corrected 2026-11: the agency documents budgeting and money management, not credit repair"});
  /* Corrected 2026-11: the listing is the county Veterans Service Office (benefits help); its old name
     "Veterans Emergency Assistance" and its emergency-funds claim were not supported. */
  fin("service", "veterans emergency assistance", {any:["financial-012"], an:2});
  fin("org", "Veterans Service Office", {first:"financial-012"});
  fin("service", "township trustee", {has:["financial-013","financial-014","financial-015"]});
  fin("service", "Harrison Township", {first:"financial-013"});
  fin("service", "Honey Creek", {first:"financial-014"});
  fin("service", "Lost Creek", {first:"financial-015"});
  fin("service", "psychiatric medication help", {first:"financial-016"});
  fin("everyday", "i cant pay my light bill", {any:["crisis-003","financial-013","financial-001"]}, {sev:"high"});
  fin("everyday", "my power is getting shut off", {any:["crisis-003","financial-001"]}, {sev:"high"});
  fin("everyday", "need money for bills", {cats:{in:["financial","housing","crisis"], n:3}});
  fin("everyday", "need clothes", {first:["financial-010","housing-006"]});
  fin("everyday", "need a bed", {any:["financial-010"], an:3}, {review:"bed could mean shelter bed"});
  fin("everyday", "my kid needs diapers", {first:"financial-004"});
  fin("misspell", "utilites", {any:["financial-001","financial-013"]});
  fin("misspell", "finacial help", {cats:{in:["financial"], n:3}});
  fin("misspell", "dipers", {first:"financial-004"});
  fin("misspell", "burrial", {first:["financial-008","financial-013"]});
  fin("misspell", "cloths", {first:["financial-010","housing-006"]}, {review:"'cloths' is a real word"});
  fin("org", "Helping Hands", {first:"financial-010"});
  fin("org", "Covered With Love", {first:"financial-004"});
  fin("org", "VITA", {first:"financial-007"});

  /* ── EMPLOYMENT ───────────────────────────────────────────────────── */
  const emp = add("employment");
  emp("direct", "job", {cats:{in:["employment"], n:3}}, {v:"job"});
  emp("direct", "jobs", {cats:{in:["employment"], n:3}});
  emp("direct", "employment", {cats:{in:["employment"], n:3}}, {v:"employment"});
  emp("service", "resume", {top:["employment-007","employment-001"], n:2}, {v:"resume"});
  emp("service", "interview coaching", {first:"employment-007"});
  emp("service", "felony friendly jobs", {first:"employment-002"});
  emp("service", "jobs for felons", {any:["employment-002","employment-003"], an:2});
  emp("service", "reentry", {any:["employment-003","employment-012"]}, {v:"reentry"});
  emp("service", "cdl training", {first:"employment-004"});
  emp("service", "welding classes", {first:"employment-004"});
  emp("service", "cna classes", {first:"employment-004"});
  emp("service", "apprenticeship", {first:"employment-005"}, {v:"apprenticeship"});
  emp("service", "gas card for work", {any:["transport-005"], an:2});
  emp("service", "bus pass for new job", {any:["transport-001"], an:3}, {gap:"withheld 2026-11: no listing documents bus passes for new employees"});
  emp("service", "probation officer", {first:"employment-010"});
  emp("service", "pay court fines", {first:"employment-011"});
  /* Known retrieval issue (fifth review), not a missing service: employment-011 Fines & Fees Assistance
     Program offers "Help paying court fines to restore driving privileges"; "license" does not reach it. */
  emp("service", "get my license back", {first:"employment-011"}, {known:"retrieval: license restoration wording not matched"});
  emp("service", "replace id after prison", {any:["other-003","other-004","other-005"], an:3});
  emp("everyday", "i need a job bad", {cats:{in:["employment"], n:3}});
  emp("everyday", "just got out of prison need work", {any:["employment-002","employment-003","employment-012"]});
  emp("everyday", "lost my job", {cats:{in:["employment"], n:2}, notTop:{ids:["financial-015"], n:3}});
  emp("everyday", "need work today", {cats:{in:["employment"], n:3}}, {review:"day labor not represented"});
  emp("everyday", "unemployment benefits", {any:["employment-001"], an:3}, {gap:"no unemployment-insurance resource in the data"});
  emp("misspell", "emplyment", {cats:{in:["employment"], n:3}});
  emp("misspell", "resumay", {any:["employment-007","employment-001"]}, {review:"phonetic spelling"});
  emp("misspell", "aprenticeship", {first:"employment-005"});
  emp("misspell", "felany", {any:["employment-002","employment-003"]});
  emp("org", "WorkOne", {first:"employment-001"});
  emp("org", "Goodwill", {top:["employment-009","transport-008"], n:2});
  emp("org", "2nd Chance Indiana", {first:"employment-002"});
  emp("org", "Ivy Tech workforce", {first:"employment-004"});
  emp("org", "Indiana Reentry Coalition", {first:"employment-012"});

  /* ── EDUCATION ────────────────────────────────────────────────────── */
  const edu = add("education");
  edu("direct", "GED", {first:"education-001"});
  edu("direct", "education", {cats:{in:["education"], n:3}}, {v:"education"});
  /* Corrected: education-001 offers GED prep and never mentions a diploma; only education-011 does. */
  edu("service", "high school diploma", {first:"education-011"});
  edu("service", "adult education", {first:"education-001"});
  edu("service", "head start", {first:"education-002"});
  edu("service", "preschool", {first:"education-002"}, {v:"preschool"});
  edu("service", "childcare voucher", {first:"education-003"});
  edu("service", "help paying for daycare", {first:"education-003"});
  edu("service", "homeless student", {first:"education-004"});
  edu("service", "mckinney vento", {first:"education-004"});
  edu("service", "ESL", {first:"education-005"});
  edu("service", "english classes", {first:"education-005"});
  edu("service", "learn english", {first:"education-005"});
  edu("service", "literacy", {first:"education-005"}, {v:"literacy"});
  edu("service", "college", {any:["education-006"]}, {v:"college"});
  edu("service", "financial aid for college", {first:"education-006"});
  edu("service", "community classes", {first:"education-007"});
  edu("service", "tutoring", {first:"education-008"}, {v:"tutoring"});
  edu("service", "homework help", {first:"education-008"});
  edu("service", "school supplies", {first:"education-009"});
  edu("service", "backpack", {first:"education-009"});
  edu("service", "vocational rehab", {first:"education-010"});
  edu("everyday", "i want to finish high school", {first:["education-011","education-001"]});
  edu("everyday", "i never finished school", {any:["education-011","education-001"]});
  /* Corrected: education-001 also offers "adult literacy classes", so either literacy listing is a correct first result. */
  edu("everyday", "learn to read", {first:["education-005","education-001"]});
  edu("everyday", "my kid needs help with homework", {first:"education-008"});
  edu("misspell", "colledge", {any:["education-006"]});
  edu("misspell", "tuturing", {first:"education-008"});
  edu("misspell", "pre school", {first:"education-002"});
  edu("misspell", "highschool diploma", {any:["education-011","education-001"]});
  edu("org", "Excel Center", {first:"education-011"});
  edu("org", "Ivy Tech", {top:["education-006","education-001","employment-004"], n:4});
  edu("org", "ISU", {first:"education-007"});
  edu("org", "Boys and Girls Club tutoring", {first:"education-008"});

  /* ── CHILDREN & FAMILY ────────────────────────────────────────────── */
  const ch = add("children");
  ch("direct", "childcare", {top:["education-003"], n:3}, {v:"childcare"});
  ch("direct", "daycare", {top:["education-003"], n:3}, {v:"daycare"});
  ch("direct", "kids", {cats:{in:["children","education","food"], n:3}}, {review:"broad"});
  ch("service", "after school program", {any:["children-004","education-008"], an:2});
  ch("service", "summer program for kids", {first:"children-004"});
  ch("service", "mentoring", {any:["children-001","education-008"], an:2});
  ch("service", "youth counseling", {first:"children-001"});
  ch("service", "DCS", {top:["children-009","children-010"], n:4});
  ch("service", "child welfare", {any:["children-009"], an:2});
  /* Review flag removed: the dataset's child-welfare listing is the DCS office (children-009); the duplicate with a wrong address (children-002) was withheld 2026-11. */
  ch("service", "CPS", {any:["children-009"]});
  ch("service", "foster care", {any:["children-009","children-010"], not:["senior-003"]}, {gap:"withheld 2026-11: no listing documents foster-care support"});
  ch("service", "parenting classes", {top:["children-005","children-010"], n:2}, {v:"parenting"});
  ch("service", "reunification", {first:"children-010"});
  ch("service", "free daycare", {any:["education-002","education-003"]});
  ch("everyday", "help with my kids", {cats:{in:["children","education"], n:3}}, {review:"broad"});
  ch("everyday", "dcs took my kids", {any:["children-009","children-010"]});
  ch("everyday", "my teenager is out of control", {any:["children-001"], an:3}, {review:"youth counseling is closest"});
  ch("everyday", "need daycare so i can work", {any:["education-003"], an:2});
  ch("everyday", "im pregnant and need help", {any:["food-004","children-007"]}, {review:"pregnancy services beyond WIC are not in the data"});
  ch("misspell", "chidcare", {top:["education-003"], n:3});
  ch("misspell", "parenting clases", {top:["children-005","children-010"], n:3});
  ch("misspell", "daycar", {any:["education-003"]});
  ch("org", "CASY", {first:"children-001"});
  ch("org", "Boys and Girls Club", {top:["children-004","education-008"], n:2});
  ch("org", "Firefly", {first:"children-010"});

  /* ── SENIOR SERVICES ──────────────────────────────────────────────── */
  const sen = add("senior");
  sen("direct", "senior services", {cats:{in:["senior"], n:3}}, {v:"senior"});
  sen("direct", "elderly", {cats:{in:["senior"], n:3}}, {v:"elderly"});
  sen("service", "meals on wheels", {first:"senior-001"});
  sen("service", "senior center", {first:"senior-002"});
  sen("service", "in home care", {first:"senior-003"});
  sen("service", "caregiver", {first:"senior-003"}, {v:"caregiver"});
  sen("service", "senior prescriptions", {first:"senior-004"});
  sen("service", "aging and disability resource center", {first:"senior-005"});
  sen("service", "senior property tax", {first:"senior-006"});
  sen("service", "rides for seniors", {first:"transport-003"});
  sen("service", "medicare", {any:["senior-005"], an:5}, {gap:"no Medicare counseling resource"});
  sen("service", "dementia", {any:["senior-003","senior-005"], an:5}, {gap:"no dementia-specific resource"});
  sen("everyday", "my elderly mom needs help at home", {first:"senior-003"});
  sen("everyday", "food delivered for my grandpa", {first:"senior-001"});
  sen("everyday", "old people", {cats:{in:["senior"], n:3}});
  sen("misspell", "senoir", {cats:{in:["senior"], n:3}});
  sen("misspell", "eldery", {cats:{in:["senior"], n:3}});
  sen("misspell", "meals on wheel", {first:"senior-001"});
  sen("org", "Wabash Senior Center", {first:"senior-002"});
  sen("org", "Area 7 Agency on Aging", {first:"senior-003"});
  sen("org", "Area 7", {top:["senior-003","transport-003"], n:3}, {review:"the data does not establish that Area 7 Transportation and the Area 7 Agency on Aging are the same organization"});

  /* ── PET RESOURCES ────────────────────────────────────────────────── */
  const pet = add("pet");
  pet("direct", "pet food", {first:"pet-001"}, {v:"pet"});
  pet("direct", "pets", {top:["pet-001","pet-002"], n:2});
  pet("service", "dog food", {first:"pet-001"});
  pet("service", "cat food", {first:"pet-001"});
  pet("service", "spay", {first:"pet-002"});
  pet("service", "neuter my cat", {first:"pet-002"});
  pet("service", "low cost vet", {first:"pet-002"}, {v:"vet"});
  pet("service", "pet vaccines", {first:"pet-002"});
  pet("everyday", "cant afford to feed my dog", {first:"pet-001"});
  pet("everyday", "my dog is sick", {first:"pet-002"});
  pet("everyday", "lost dog", {}, {gap:"no lost-pet or animal-control resource"});
  pet("everyday", "adopt a cat", {}, {gap:"no adoption listing"});
  pet("misspell", "pet fod", {first:"pet-001"});
  pet("misspell", "veternarian", {first:"pet-002"});
  pet("org", "Humane Society", {first:"pet-001"});
  pet("org", "Humane Society vet clinic", {first:"pet-002"}, {gap:"pet-002 is named 'THHS', not 'Humane Society'"});

  /* ── IMMIGRATION ──────────────────────────────────────────────────── */
  const imm = add("immigration");
  imm("direct", "immigration", {cats:{in:["immigration","legal"], n:4}}, {v:"immigration"});
  imm("direct", "immigration lawyer", {top:["immigration-004","legal-011"], n:3});
  imm("service", "DACA", {none:true}, {gap:"withheld 2026-11: Indiana Legal Services' immigration center does not list DACA among its services"});
  imm("service", "citizenship classes", {first:"immigration-003"}, {v:"citizenship"});
  imm("service", "naturalization", {any:["immigration-003","legal-011"], an:2});
  imm("service", "deportation", {first:"legal-011"});
  imm("service", "work permit", {any:["immigration-004","legal-011"]}, {gap:"withheld 2026-11: no listing documents work-permit help"});
  imm("service", "know your rights spanish", {top:["immigration-002","legal-012"], n:2});
  imm("service", "green card", {any:["immigration-004","legal-011"]});  /* review flag removed: both listings now name adjustment of status, the green-card application */
  imm("everyday", "papers to stay in the country", {cats:{in:["immigration","legal"], n:3}, notCat:["pet"]});
  imm("everyday", "i need help with my papers", {cats:{in:["immigration","legal"], n:3}, notCat:["pet"]}, {review:"'papers' could mean court or ID papers"});
  imm("everyday", "afraid of ice", {any:["immigration-002","legal-012","legal-011"]}, {review:"enforcement context; 'ice' is ambiguous"});
  imm("everyday", "ayuda con comida", {cats:{in:["food"], n:3}}, {gap:"search lexicon is English-only"});
  imm("misspell", "imigration", {cats:{in:["immigration","legal"], n:4}});
  imm("misspell", "citizenshp test", {first:"immigration-003"});

  /* ── TRANSPORTATION ───────────────────────────────────────────────── */
  const tr = add("transportation");
  tr("direct", "bus", {top:["transport-001"], n:2}, {v:"bus"});
  tr("direct", "transportation", {cats:{in:["transportation"], n:3}}, {v:"transportation"});
  tr("service", "bus schedule", {first:"transport-001"});
  tr("service", "city bus", {first:"transport-001"});
  tr("service", "free bus", {first:"transport-001"});
  tr("service", "paratransit", {any:["transport-001","transport-003"], an:2});
  tr("service", "medicaid ride", {first:"transport-002"});
  tr("service", "ride to doctor", {any:["transport-002","transport-003"], an:2});
  tr("service", "senior rides", {first:"transport-003"});
  tr("service", "volunteer driver", {not:["crisis-003"]}, {gap:"withheld 2026-11: no volunteer driver program is documented"});
  tr("service", "gas voucher", {top:["transport-005"], n:3, notCat:["housing"]}, {v:"voucher"});
  tr("service", "free bike", {first:"transport-006"});
  tr("service", "bus to indianapolis", {first:"transport-007"});
  tr("service", "greyhound", {first:"transport-007"});
  tr("service", "car repair", {first:"transport-008"}, {v:"repair"});
  tr("everyday", "i need a ride to my appointment", {any:["transport-002","transport-003"], an:3});
  tr("everyday", "my car broke down", {first:"transport-008"});
  tr("everyday", "how do i get to the food pantry", {any:["transport-001","transport-003"], an:3}, {review:"could mean directions"});
  tr("everyday", "no way to get to work", {any:["transport-001","transport-005"]}, {known:"the city bus is listed but \"get to work\" does not reach transportation; this passed only through two withheld listings"});
  tr("misspell", "transportaion", {cats:{in:["transportation"], n:3}});
  tr("misspell", "busses", {top:["transport-001"], n:2});
  tr("misspell", "bycicle", {first:"transport-006"}, {review:"data says 'bike'"});
  tr("org", "Terre Haute Transit", {first:"transport-001"});

  /* ── OTHER RESOURCES ──────────────────────────────────────────────── */
  const oth = add("other");
  oth("direct", "other resources", {cats:{in:["other"], n:3}});
  oth("service", "internet", {top:["digital-001","digital-002"], n:2}, {v:"internet"});
  oth("service", "wifi", {first:"digital-001"});
  oth("service", "wi-fi", {first:"digital-001"});
  oth("service", "free computer", {first:"digital-001"}, {v:"computer"});
  oth("service", "printing", {first:"digital-001"});
  oth("service", "cheap internet", {first:"digital-002"});
  oth("service", "state id", {first:"other-003"});
  oth("service", "id card", {top:["other-003"], n:2});
  oth("service", "birth certificate", {first:"other-004"}, {v:"certificate"});
  oth("service", "social security card", {first:"other-005"});
  oth("service", "voter id", {first:"other-003"});
  oth("everyday", "i need a computer to apply for jobs", {any:["digital-001"], an:3});
  oth("everyday", "i lost my id", {any:["other-003"], an:2, notTop:{ids:["financial-015"], n:3}});
  oth("everyday", "replace my social security card", {first:"other-005"});
  oth("misspell", "interent", {any:["digital-001","digital-002"]});
  oth("misspell", "birth certifcate", {first:"other-004"});
  oth("misspell", "socail security card", {first:"other-005"});
  oth("org", "BMV", {first:["other-003"]});
  oth("org", "Comcast", {first:"digital-002"});
  oth("org", "library", {cats:{in:["other","education","employment","legal","transportation","financial"], n:3}}, {review:"many library-hosted programs"});

  /* ── MULTIPLE NEEDS ───────────────────────────────────────────────── */
  const multi = add("multi");
  multi("multi", "cant pay rent", {first:["housing-003","financial-013"], any:["financial-013","financial-014","financial-015"], an:3, notCat:["pet"]});  /* was first housing-004 (withheld), trustee in top 6 */
  multi("multi", "need ride doctor", {any:["transport-002","transport-003"], an:2});
  multi("multi", "food for my kids", {any:["food-005","food-004","children-007"], an:5, notCat:["pet"]});
  multi("multi", "homeless with a dog", {has:["pet-001","housing-002"], any:["pet-001"], an:4}, {review:"no listing confirms pets are allowed in shelter"});
  multi("multi", "leaving abuse with my kids", {first:["crisis-002","children-006"], has:["housing-001"], not:["recovery-016"]});  /* was not:["crisis-004"] */
  multi("multi", "welding classes and a gas card", {needs:[["employment-004"], ["transport-005"]], not:["children-005"]}, {src:"codex2"});
  multi("multi", "lost my job need help with bills", {any:["employment-001","employment-009"], an:5, has:["financial-013"], notTop:{ids:["financial-015"], n:3}});
  multi("multi", "no insurance need medicine", {any:["financial-016","health-009"], has:["financial-016"]});
  multi("multi", "just got out of jail need work", {any:["employment-002","employment-003","employment-012"], an:3});
  multi("multi", "homeless veteran", {any:["financial-012","health-006","housing-002"]}, {review:"no veteran-specific shelter"});
  /* Corrected (third review): the earlier expectation required two specific Light House listings in the top 4.
     The need is useful early coverage of both food and shelter, not particular organizations. */
  multi("multi", "need food and shelter tonight", {coverage:{cats:["food","housing"], n:4}});
  multi("multi", "need help with rent and utilities", {first:"financial-013"});
  multi("multi", "sober living that takes kids", {any:["recovery-007","recovery-011"]});
  multi("multi", "ride to the food pantry", {coverage:{cats:["transportation","food"], n:3}});
  multi("multi", "free lawyer for eviction", {any:["legal-001"], an:2});
  multi("multi", "need id to get a job", {any:["other-003"], an:2}, {known:"the BMV state ID listing is returned but ranks below job listings; this passed only through the withheld \"BMV Help Desk\" listing"});
  multi("multi", "single mom need daycare and food", {has:["education-003"], any:["education-003","food-004"], an:5}, {review:"two needs, no single best listing"});
  multi("multi", "pregnant and homeless", {any:["housing-001","food-004"], an:3}, {review:"two needs"});
  multi("multi", "need diapers and formula", {top:["financial-004","children-007"], n:4});
  multi("multi", "out of jail need id and a job", {any:["employment-002","employment-003"], needs:[["other-003","other-004","other-005"],["employment-002","employment-003","employment-012"]]});  /* separate ID need restored (employment-008, which stood for both, withheld 2026-11) */
  multi("multi", "help paying funeral and rent", {any:["financial-008","financial-013"], an:2});
  multi("multi", "senior needs ride to doctor", {first:"transport-003"},
    {review:"transport-003 serves seniors (any destination); transport-002 serves rides to doctor appointments but requires Medicaid. The data supports either first."});
  multi("multi", "detox and then sober living", {has:["recovery-015"], cats:{in:["recovery"], n:3}});
  multi("multi", "veteran behind on utilities", {first:"financial-012"});
  multi("multi", "my children od and need shelter and transportation",
     {g:"overdose", needs:[["housing-001","housing-002","housing-006"], ["transport-001","transport-003"]]}, {src:"codex"});
  multi("multi", "someone overdosed and need food pantry and shelter and transportation",
     {g:"overdose", needs:[["food-008","food-009","food-010","food-011","food-012","food-003","food-001"],
      ["housing-001","housing-002","housing-006"], ["transport-001","transport-003"]]}, {src:"codex"});

  /* ── AMBIGUOUS / GENERIC ──────────────────────────────────────────── */
  const amb = add("ambiguous");
  amb("ambiguous", "help", {empty:true});
  amb("ambiguous", "I need help please", {empty:true});
  amb("ambiguous", "assistance", {max:40}, {review:"generic word"});
  amb("ambiguous", "services", {max:40}, {review:"generic word"});
  amb("ambiguous", "support", {max:40}, {review:"generic word"});
  amb("ambiguous", "free", {max:40}, {review:"generic word; should not flood results"});
  amb("ambiguous", "card", {max:20}, {review:"ID card, gas card, Social Security card"});
  amb("ambiguous", "classes", {max:25}, {review:"many class types"});
  amb("ambiguous", "center", {max:25}, {review:"appears in many names"});
  amb("ambiguous", "house", {max:25}, {review:"housing vs recovery houses"});
  amb("ambiguous", "vaccines", {top:["health-003","pet-002"], n:3}, {review:"human vs pet vaccines"});
  amb("ambiguous", "counseling", {any:["health-001","children-001","financial-011"]}, {review:"mental health, youth, or debt counseling"});
  amb("ambiguous", "training", {cats:{in:["employment","education"], n:3}}, {review:"job vs education"});
  amb("ambiguous", "gas", {any:["transport-005","financial-001"]}, {review:"gas utility vs gasoline"});
  amb("ambiguous", "bank", {}, {review:"food bank vs diaper bank"});
  amb("ambiguous", "treatment", {cats:{in:["recovery","health"], n:3}}, {review:"addiction vs medical"});
  amb("ambiguous", "benefits", {any:["financial-006","financial-005","food-002","legal-001"]}, {review:"which benefits"});
  amb("ambiguous", "meeting", {first:"recovery-001"}, {review:"AA/NA is the only meeting-based listing"});
  amb("ambiguous", "papers", {}, {review:"immigration, court, or ID papers"});

  /* ── EDGE CASES ───────────────────────────────────────────────────── */
  const edge = add("edge");
  edge("edge", "", {empty:true});
  edge("edge", "   ", {empty:true});
  edge("edge", "!!!", {empty:true});
  edge("edge", "zxqv blorpt", {none:true, g:null});
  edge("edge", "asdfgh", {none:true});
  edge("edge", "<script>alert(1)</script>", {none:true, g:null});
  edge("edge", "   FOOD   PANTRY!!! ", {top:["food-008","food-009"], n:8});
  edge("edge", "Food-Pantry", {top:["food-008","food-009"], n:8});
  edge("edge", "SHELTER?", {top:["housing-001","housing-002"], n:3});
  edge("edge", "i'm hungry...", {cats:{in:["food"], n:5}});
  edge("edge", "food food food food food", {cats:{in:["food"], n:5}});
  edge("edge", "47807", {}, {review:"ZIP code search is not supported"});
  edge("edge", "812-232-1447", {}, {gap:"phone numbers are not searchable"});
  edge("edge", "a".repeat(300), {none:true});
  edge("edge", "i need food and shelter and a doctor and a lawyer and a job and a ride", {max:60}, {review:"many needs at once"});

  /* Severity defaults: crisis expressions are critical; food, housing and
     crisis-category searches are high; ambiguous/edge are low; others medium. */
  const sevDefault = {"crisis-expr":"critical", lookalike:"medium", food:"high", housing:"high",
    crisis:"high", multi:"medium", ambiguous:"low", edge:"low"};
  const all = [];
  Object.entries(groups).forEach(([group, list]) => {
    list.forEach((c, i) => {
      all.push({id:`${group}-${String(i + 1).padStart(2, "0")}`, sev:sevDefault[group] || "medium", set:"written", ...c});
    });
  });
  return all;
})();
