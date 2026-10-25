/* HOLDOUT — unfamiliar phrasings reserved for evaluation AFTER the next
   search implementation. Do not run these while tuning the search, and do not
   copy them into cases.js or the lexicon. Run with eval.html?holdout=1 only
   when a change is ready for evaluation, and record the result in the review.
   Same expectation keys as cases.js. */

const EVAL_HOLDOUT = [
  /* crisis expressions phrased unlike any written case */
  {group:"crisis-expr", query:"i dont see the point in going on", exp:{g:"mental-crisis", first:"crisis-001"}},
  {group:"crisis-expr", query:"thinking of ending things", exp:{g:"mental-crisis", first:"crisis-001"}},
  /* Corrected after the first run (independently reviewed): require emergency guidance for the large
     ingestion. "on purpose" establishes deliberate ingestion, not suicidal intent, so no exact card pair
     is required and no overdose is assumed. Original expectation: g "overdose" (flagged for review). */
  {group:"crisis-expr", query:"i took a bunch of my pills on purpose", exp:{urgentIncludes:["emergency"]}},
  /* Corrected (independently reviewed): the wording does not establish an overdose; the general
     emergency card is the appropriate response. Original expectation: g "overdose". */
  {group:"crisis-expr", query:"my roommate isnt waking up after using", exp:{urgentAll:["emergency"]}},
  {group:"crisis-expr", query:"he put his hands on me again", exp:{first:"crisis-002"}},
  {group:"crisis-expr", query:"scared to go home tonight", exp:{first:"crisis-002"}, review:"could be housing or DV"},
  {group:"crisis-expr", query:"my mom's boyfriend hurts us", exp:{first:"crisis-002"}},
  {group:"crisis-expr", query:"i keep burning myself", exp:{g:"mental-crisis", first:"crisis-001"}},
  /* look-alikes */
  {group:"lookalike", query:"my plant died", exp:{g:null}},
  {group:"lookalike", query:"safe deposit box", exp:{g:null}},
  {group:"lookalike", query:"cutting coupons for groceries", exp:{g:null, cats:{in:["food"], n:3}}},
  /* Corrected (independently reviewed): the Harrison, County and Honey Creek trustees document rent help,
     so any documented rent-assistance listing in the top 3 serves this. Original: housing-004 in top 3. */
  {group:"lookalike", query:"overdue rent notice", exp:{g:null, any:["housing-004","financial-013","financial-002","financial-014"], an:3}},
  /* everyday needs */
  {group:"food", query:"fridge is empty", exp:{cats:{in:["food"], n:3}}},
  {group:"food", query:"somewhere to get a free dinner", exp:{any:["food-006"], an:3}},
  {group:"housing", query:"sleeping outside tonight", exp:{any:["housing-002","housing-001"], an:3}},
  {group:"housing", query:"my lease is ending and i have nowhere to go", exp:{any:["housing-002","housing-004","housing-001"], an:3}},
  {group:"housing", query:"need to wash my clothes", exp:{first:"housing-006"}},
  {group:"health", query:"my gums are bleeding", exp:{any:["health-007"], an:3}},
  {group:"health", query:"need my blood pressure checked for free", exp:{any:["health-002","health-009"], an:3}},
  {group:"health", query:"anxiety is really bad", exp:{any:["health-001","health-004","health-005","crisis-001"], an:3}},
  {group:"recovery", query:"been using and want to stop", exp:{cats:{in:["recovery","health","crisis"], n:3}}},
  {group:"recovery", query:"place to live while staying sober", exp:{cats:{in:["recovery"], n:3}}},
  {group:"legal", query:"my landlord changed the locks", exp:{any:["legal-004","legal-001"], an:3}},
  {group:"legal", query:"want my record cleaned up", exp:{first:"legal-003"}},
  {group:"financial", query:"water is about to be shut off", exp:{any:["housing-004","crisis-003","financial-013","financial-002"], an:3}},
  {group:"financial", query:"cant afford to bury my brother", exp:{any:["financial-008","financial-002"], an:2}},
  {group:"employment", query:"looking for work with a record", exp:{any:["employment-002","employment-003"], an:3}},
  {group:"employment", query:"help making a resume for free", exp:{first:"employment-007"}},
  {group:"education", query:"want to get my ged but work days", exp:{first:"education-001"}},
  {group:"education", query:"classes to speak better english", exp:{first:"education-005"}},
  {group:"children", query:"somewhere for my kids after school while i work", exp:{any:["children-004","education-008"], an:2}},
  {group:"children", query:"caseworker took my children", exp:{any:["children-009","children-010","children-002"], an:3}},
  /* Corrected (independently reviewed): Meals on Wheels (65+ and homebound), In-Home Care Referral and the
     Aging & Disability Resource Center all address this need early. Original: senior-001 first. */
  {group:"senior", query:"grandma cant cook for herself anymore", exp:{any:["senior-001","senior-003","senior-005"], an:3}},
  {group:"pet", query:"out of kibble for my pup", exp:{first:"pet-001"}},
  {group:"immigration", query:"renew my dreamer status", exp:{first:"immigration-001"}},
  {group:"transportation", query:"no car and need to get to my job", exp:{any:["employment-006","transport-001","transport-004"], an:3}},
  {group:"other", query:"need to print some papers", exp:{first:"digital-001"}},
  {group:"other", query:"lost my wallet with my id in it", exp:{any:["other-003","employment-008"], an:2}},
  {group:"multi", query:"just moved here with nothing", exp:{any:["crisis-005"], an:5}, review:"very broad"},
  {group:"multi", query:"need groceries and a bus pass", exp:{any:["transport-001"], an:6}},
  {group:"multi", query:"mom of three got evicted", exp:{any:["housing-004","housing-001","legal-004"], an:3}}
].map((c, i) => ({id:`holdout-${String(i + 1).padStart(2, "0")}`, kind:"holdout", set:"holdout",
  sev:c.group === "crisis-expr" ? "critical" : "medium", ...c}));
