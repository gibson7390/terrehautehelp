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

/* General vocabulary of frequent English words. A word a person typed that
   is a real word is searched as typed, never "corrected" into a service
   word one letter away ("put" is not "pet", "rid" is not "ride", "rant" is
   not "rent"). This is general language knowledge, not a list of search
   failures; misspellings such as "fud" or "shleter" are deliberately
   absent so established typo support keeps working. */
const COMMON_ENGLISH_WORDS = new Set((
  "a able about above across act actually add after again against age ago agree ahead air all allow almost alone along " +
  "bug pest mouse mice roach spider wallet purse roommate neighbor tooth teeth " +
  "already also although always am among amount an and angry animal another answer any anymore anyone anything anyway " +
  "anywhere apart apply area arm around arrive art as ask asked asking at aunt away awful baby back bad badly bag ball " +
  "bank bar base basic bath be bear beat beautiful became because become bed been before began begin behind being " +
  "believe below belt bend beside best bet better between big bike bit bite black blame blank blind block blood blow " +
  "blue board boat body bone book boot born borrow boss both bother bottle bottom bought bowl box boy brain branch " +
  "brave bread break breath bring broke broken brother brought brown bud build building built bunch burn burnt burst " +
  "busy but buy by cake call called calm came can cap car card careful carry cart case cat catch caught cause cent " +
  "certain chair chance change charge cheap check cheese chest chicken chief child choice choose chose church city " +
  "class clean clear climb close closed clothes cloud coat cold collect color come comfort coming common cook cool " +
  "copy corner cost cot couch could count country couple course cousin cover crazy cried cross crowd cry cup cut " +
  "dad damage dark date daughter day dead deal dear death decide deep deposit desk did die died different dig dinner " +
  "direction dirt dirty dish do doing done door double down draw dream dress drink drive driver drop dry due dull " +
  "during dust duty each ear early earn easy eat edge egg either else empty end enemy enjoy enough enter even evening " +
  "event ever every everyone everything exact except excuse expect explain eye face fact fail fair fall false family " +
  "far farm fast fat father fault fear feel feeling feet fell felt few field fight figure fill final finally find fine " +
  "finger finish fire first fish fit five fix flat floor flower fly fold follow food foot for force forget forgot " +
  "form forward found four free fresh friend fridge from front fruit full fun funny game garden gas gate gave get gift " +
  "girl give given glad glass go goes going gold gone good got grab grade grass gray great green grew ground group " +
  "grow guess guy had hair half hall hand hands hang happen happy hard harm hat hate have he head hear heard heart " +
  "heat heavy held hello help her here hers herself hide high hill him himself hip his hit hold hole holiday home " +
  "hope horse hot hour house how however huge hung hunt hurry hurt husband ice idea if ill important in inch inside " +
  "instead into iron is it its itself job join joke jump just keep kept key kick kid kill kind king kiss kitchen knee " +
  "knew knife knock know known lady laid lake land large last late later laugh law lay lazy lead learn least leave " +
  "led left leg lend less let letter level lie life lift light like line list listen little live lives living lock " +
  "long look loose lose loss lost lot loud love low lunch mad made mail main make man many map mark market mat " +
  "matter may maybe me meal mean meant meat meet men met middle might mile milk mind mine minute miss mistake mix mom " +
  "money month mood more morning most mother mouth move much mud must my myself nail name near neck need neighbor " +
  "neither nervous never new news next nice night nine no nobody noise none nor nose not note nothing notice now " +
  "number nurse of off offer office often oh oil ok okay old on once one only open or order other our out outside " +
  "over own page paid pain paint pair pan paper papers parent park part party pass past pat path pay peace pen " +
  "people perhaps person phone pick picture piece pile pin pink pit place plain plan plant plate play please pocket " +
  "point police pool poor pot pound pour power press pretty price print problem promise pull push put quick quiet " +
  "quit quite race rain raise ran rant rat rather reach read ready real really reason red remember rent rest rich " +
  "rid ride right ring rise road rock roll roof room root rope rose round row rub rule run rush sad safe said sale " +
  "salt same sand sat save saw say school sea seat second see seem seen sell send sense sent serious set seven several " +
  "shake shall shape share sharp she sheet shirt shoe shoes shop short should shoulder shout show shut sick side sign " +
  "silly simple since sing sir sister sit six size skin sky sleep slip slow small smell smile smoke snow so soap soft " +
  "some someone something sometimes son song soon sore sorry sort sound soup south space speak spend spent spoke spot " +
  "stand star start state stay steal step stick still stone stood stop store storm story straight strange street " +
  "strong stuck study stuff stupid such sudden sugar suit sun sure surprise sweet swim table tail take taken talk " +
  "tall tap taste tax tea teach team tear tell ten test than thank that the their them then there these they thick " +
  "thin thing things think third this those though thought three threw through throw tie tight time tin tiny tip " +
  "tire tired to today toe together told tomorrow tone tonight too took top total touch toward town toy track trade " +
  "train trash travel tree trip trouble truck true trust truth try turn twice two type ugly uncle under until up upon " +
  "upset us use used using usual very visit voice wait wake walk wall want war warm was wash waste watch water wave way " +
  "we wear weather week weird well went were wet what wheel when where which while white who whole why wide wife " +
  "wild will win wind window winter wish with without woke woman women won wood word wore work world worry worse worst " +
  "worth would write wrong yard yeah year yell yes yesterday yet you young your yours yourself"
).split(" "));

/* Complete routine-waking contexts, appended to the unresponsive-person
   patterns as a negative lookahead: waking for an obligation or at a usual
   time, not a person who cannot be roused. */
const ROUTINE_WAKING = String.raw`(?! (?:for (?:school|work|class|church|the bus|breakfast|his job|her job)|in (?:the morning|time)|on time|early|at (?:night|\d+)|before (?:school|work|noon)|(?:until|till) (?:noon|late|lunch)|on (?:weekends|school days|weekdays))\b)`;

/* Where an indirect-distress phrase may end: a sentence break, the end of
   the query, "anymore", or a conjunction that starts a separate request
   ("…going on and i need food"). Anything else continues the phrase into
   an ordinary meaning ("going on this trip"). */
const DISTRESS_PHRASE_END = String.raw`(?= \||$| anymore\b| (?:and|but|so|plus) (?:i |im |i am |also |i also )?(?:need|want|have|am|got|cant|can|looking|could|would)\b)`;

/* "feed <whose> <who>" phrases. What is being fed decides the service:
   animals → pet food; people → food assistance. */
const FEEDING_PHRASES = (() => {
  const verbs = ["feed", "feeding"];
  const whose = ["my", "our", "the", "his", "her"];
  const combine = nouns => verbs.flatMap(verb => whose.flatMap(owner => nouns.map(noun => `${verb} ${owner} ${noun}`)));
  return {
    animals: combine(["dog","dogs","cat","cats","pet","pets","puppy","puppies","kitten","kittens"]),
    people: [...combine(["kids","kid","children","child","family","baby","babies","son","daughter"]),
      "feed us", "feed myself", "feed ourselves", "feeding us", "feeding myself"]
  };
})();

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
      "ned","nead","plz","pls",
      "not","dont","doesnt","didnt","isnt","arent","wont","after","before",
      /* Conversational filler: "i really could use some food" asks for food.
         As search terms these matched unrelated listings ("some" in a sober
         living description). */
      "really","just","some","any","also","very","so","maybe","like","go","something","anything",
      "what","when","which","how","who","why","come","comes"
    ]),

    /* Request verbs: in "could use some food" or "can really use a ride",
       "use" asks for help; it is not substance use. Only the "use" that
       follows one of these (with filler words between) is dropped, so "drug
       use" keeps its meaning. */
    requestVerbs: new Set(["can","could","would","might"]),
    requestVerbFillers: new Set(["really","definitely","sure","surely","totally","honestly","so","still","also","just","actually","seriously","always"]),

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
       correction and category scoring. A match ADDS a signal — its canonical
       tokens and, where one exists, the existing urgent guidance — while every
       original word stays in the query, so "he hits my children" keeps its
       children context and "...and need shelter" keeps the shelter need.
       Words inside a match are never typo-corrected. Patterns require context
       so a lone "die", "cutting", "safe", "od" or "odd" is not a crisis, and
       complete benign contexts (benignContexts below) are masked first. The DV
       signal reuses the existing CODA / shelter concept; it has no guidance
       card because the site has none. */
    crisisPhrases: [
      {signal:"suicide", urgent:"mental-crisis", tokens:["suicide"], patterns:[
        /\b(?:want|wants|wanna|wanted|wish|wishing|ready|trying|try|plan|planning|planned|thinking about|thought about|deserve) (?:to )?(?:die|be dead|end it all|end it)\b/,
        /\b(?:kill|killing|killed|hang|hanging|shoot|shooting) (?:my ?self|me self)\b/,
        /\b(?:end|ending|take|taking) my (?:own )?life\b/,
        /\b(?:wish i (?:was|were) dead|better off dead|no reason to live|dont want to (?:live|be alive|wake up))\b/
      ]},
      {signal:"selfharm", urgent:"mental-crisis", tokens:["selfharm"], patterns:[
        /\bself ?harm(?:ing|s|ed|er)?\b/,
        /\b(?:cut|cuts|cutting|hurt|hurting|harm|harming|burn|burning|burned) (?:my ?self|me self)\b/,
        /* An ingestion whose stated purpose is self-harm. Deliberate use
           alone ("i took my prescribed pills on purpose") is not self-harm;
           excessive amounts get emergency guidance from the quantity rules. */
        /\b(?:took|taken|swallowed|ate|downed)(?: [a-z]+){0,5} (?:pills|meds|tablets|capsules|medicine|medication)(?: on purpose| intentionally)? (?:to hurt my ?self|to kill my ?self|to die|to end it)\b/
      ]},
      /* Indirect distress. The existing 988 card offers support ("Need
         immediate mental health crisis support?") without claiming an
         emergency. Each phrase must end its clause, so "...going on this
         trip" is not distress; "ending things with my girlfriend" is
         excluded as a relationship ending (benignContexts). */
      {signal:"distress", urgent:"mental-crisis", tokens:["suicide"], patterns:[
        new RegExp(String.raw`\b(?:dont|do not|cant|cannot|can not|no longer) see (?:the |any )?point (?:in|of) (?:going on|living|life|anything)` + DISTRESS_PHRASE_END),
        new RegExp(String.raw`\b(?:no|not any) (?:point|reason) (?:in |to )?(?:living|going on|keep going)` + DISTRESS_PHRASE_END),
        new RegExp(String.raw`\b(?:thinking|thought|think) (?:of|about) ending (?:things|it all|everything|it)` + DISTRESS_PHRASE_END)
      ]},
      {signal:"overdose", urgent:"overdose", tokens:["overdose"], patterns:[
        /\boverdos(?:e|ed|es|ing)\b/,
        /\b(?:he|she|they|someone|somebody|i|im|friend|my \w+)(?: just| has| had| may have| might have| think)? (?:od|ods|oded)\b/,
        /\b(?:he|she|they|someone|somebody|i|im|friend|my \w+)(?: is| s| was| keeps)? (?:oding|odding)\b/,
        /* "od'd" normalizes to "odd", an ordinary word: accept it only with a
           subject and nothing after it, or followed by a substance. */
        /\b(?:he|she|they|someone|somebody|my \w+)(?: just)? odd(?= \||$)/,
        /\b(?:od|ods|oded|odd|oding|odding) on (?:fentanyl|fent|heroin|dope|pills|meth|drugs|opioids|oxy|oxys|xanax|percs|percocet|methadone)\b/
      ]},
      /* Immediate medical emergencies. These receive the site's existing
         general emergency guidance ("For emergencies, call 911."). They are
         not assumed to be overdoses, and no intent is inferred from them. */
      {signal:"emergency", urgent:"emergency", tokens:[], patterns:[
        /\b(?:not|isnt|is not|wasnt|was not|stopped|has stopped|quit|no longer) breathing\b/,
        /* Past-tense ingestion only: "i take too many pills" describes
           medication management, not an acute ingestion. */
        /\b(?:took|taken|swallowed|ate|had) (?:too many|way too many) (?:pills|meds|tablets|capsules)\b/,
        /\b(?:took|taken|swallowed|ate|drank|had) (?:too much|way too much) (?:medicine|medication|meds)\b/,
        /* Acute by what is described, not by tense: an ingestion someone
           witnessed, swallowing in progress, or taking "right now". Routine
           wording ("is taking too many pills and cant keep track") is not. */
        /\b(?:saw|seen|see|watched|watch|watching|caught|found|noticed) (?:her|him|them|someone|somebody|my \w+) (?:take|taking|took|swallow|swallowing|swallowed|eat|eating|ate) (?:way )?(?:too many (?:pills|meds|tablets|capsules)|too much (?:medicine|medication|meds))\b/,
        /\b(?:is|are|am|s|was|were|keeps|kept) (?:swallowing|eating) (?:way )?(?:too many (?:pills|meds|tablets|capsules)|too much (?:medicine|medication|meds))\b/,
        /\b(?:is|are|am|s|was|were) taking (?:way )?(?:too many (?:pills|meds|tablets|capsules)|too much (?:medicine|medication|meds)) (?:right now|now|at this moment|as we speak|tonight)\b/,
        /* Large quantities taken at once. */
        /\b(?:took|taken|swallowed|ate|downed) (?:a bunch of|a handful of|a whole bottle of|the whole bottle of|a bottle of) (?:my |her |his |their |the |these |those )?(?:pills|meds|tablets|capsules|medicine|medication)\b/,
        /* A person who cannot be woken or does not respond. Only complete
           routine-waking contexts are excluded ("wont wake up for school",
           "in the morning", "on time"); a location ("in the bathroom", "on
           the floor") does not cancel the emergency. */
        new RegExp(String.raw`\b(?:he|she|they|someone|somebody|my \w+)(?: is| s| was)? (?:not|isnt|wasnt|wont|will not|cant|cannot|can not) (?:waking up|wake up|be woken|respond|responding)\b` + ROUTINE_WAKING),
        new RegExp(String.raw`\b(?:cant|cannot|can not|couldnt|could not) wake (?:him|her|them|my \w+|someone|somebody)(?: up)?\b(?! up\b)` + ROUTINE_WAKING),
        /\b(?:he|she|they|someone|somebody|my \w+) (?:is|s|was|went|seems) unresponsive\b/
      ]},
      /* Wanting to stop substance use: recovery services, no guidance card.
         "been using" alone is ambiguous ("been using the bus"), so it counts
         only with a stated wish to stop. */
      {signal:"recovery", urgent:null, tokens:["recovery","substance"], patterns:[
        /\b(?:been|keep|kept|still) using(?: drugs| again)?(?: and| but)(?: i)? (?:want|need|wanna|trying|try|have) to (?:stop|quit)\b/,
        /\b(?:stop|quit|stopped|quitting|stopping) using\b/
      ]},
      {signal:"domestic violence", urgent:null, tokens:["domestic","violence"], patterns:[
        /\b(?:boyfriend|girlfriend|husband|wife|partner|spouse|ex|fiance|dad|father|stepdad|stepfather|mom|mother|he|she|they)(?: keeps| is| always| has been| has| just| will| still)? (?:hit|hits|hitting|beat|beats|beating|choke|chokes|choked|choking|strangled|abuse|abuses|abused|abusing|threaten|threatens|threatened|threatening|hurt|hurts|hurting|kicks|kicked|rapes|raped) (?:me|us|my (?:kids|children|son|daughter|baby))\b(?! up\b(?! against\b))/,
        /\b(?:dont|do not|not|never|no longer|cant|cannot) (?:feel |be |stay )?safe (?:at|in) (?:my )?(?:home|house|apartment|place)\b/,
        /\bunsafe (?:at|in) (?:my )?(?:home|house|apartment)\b/,
        /\b(?:scared|afraid) (?:of my|to go) (?:boyfriend|girlfriend|husband|wife|partner|ex|home)\b/,
        /\babusive (?:boyfriend|girlfriend|husband|wife|partner|relationship|home|ex)\b/,
        /\b(?:he|she|they|my \w+)(?: keeps| keep| always| just| again)? (?:put|puts|putting|laid|lays|laying) (?:his|her|their) hands on (?:me|us|my (?:kids|children|son|daughter|baby))\b/,
        /\b(?:leaving|left|escape|escaping|fleeing|away from) (?:my |an |the )?(?:abuser|abuse|abusive (?:home|relationship|partner|husband|wife|boyfriend|girlfriend))\b/
      ]}
    ],

    /* Complete ordinary sentences that contain a crisis-like phrase. Each is
       masked before crisis matching, so only its own exact span is excluded:
       a separate explicit phrase in the same query ("...a piece of cake but i
       want to die") is still recognised. Every word is listed explicitly —
       no wildcards — and matching never crosses a clause boundary, so a
       benign pattern cannot absorb words from a neighbouring sentence ("I cut
       myself. A piece of me wants to die"). Short continuations alone
       ("while", "over this") are never treated as benign. */
    benignContexts: [
      /\bcut(?:s|ting)? (?:my ?self) (?:a|an|another|some) (?:piece|slice|bite|bit) of (?:cake|pie|pizza|bread|cheese|meat|ham|turkey|fruit|watermelon)\b/,
      /\bcut(?:s|ting)? (?:my ?self) (?:a break|some slack|slack)\b/,
      /\b(?:cut|cuts|cutting|burn|burned|burnt|burning|hurt|hurting) (?:my ?self) (?:while )?(?:shaving|cooking(?: (?:dinner|breakfast|lunch|supper|food))?|chopping (?:onions|vegetables|veggies|wood|food|carrots)|on the (?:stove|oven|grill)|lifting (?:weights|boxes|furniture)|working out|at the gym|at work|by accident)\b/,
      /\baccidentally (?:cut|burned|burnt|hurt) (?:my ?self)\b/,
      /\b(?:kill|killing|killed) (?:my ?self) laughing\b/,
      /\bbreathing room\b/,
      /* "not breathing hard/heavily": breathing, just not hard. Only this
         clause is excluded; "he is not breathing" elsewhere still counts. */
      /\b(?:not|isnt|is not|wasnt|was not) breathing (?:so |as |too |very )?(?:hard|heavily|heavy|fast|quickly|rapidly|deeply|loudly)(?: (?:anymore|after (?:exercise|exercising|working out|a workout|running|the gym)))?\b/,
      /* A denial of the ingestion itself ("i did not take too many pills",
         "i never took too many pills"). */
      /\b(?:did not|didnt|never|have not|havent|has not|hasnt|had not|hadnt) (?:take|took|taken|swallow|swallowed|eat|ate|eaten|drink|drank|have|had) (?:too many|way too many|too much|way too much|a bunch of|a handful of|a whole bottle of|the whole bottle of) (?:my |her |his |the )?(?:pills|meds|tablets|capsules|medicine|medication)\b/,
      /* Organisations, not people, being unresponsive */
      /\bmy (?:landlord|caseworker|case worker|lawyer|attorney|office|boss|manager|property manager|insurance|doctors office) (?:is|s|was|has been) (?:unresponsive|not responding)\b/,
      /\b(?:did not|didnt|never) (?:see|saw|watch|watched|notice|noticed) (?:her|him|them|someone|somebody) (?:take|took|swallow|swallowed|eat|ate) (?:way )?(?:too many|too much) (?:pills|meds|tablets|capsules|medicine|medication)\b/,
      /\b(?:end|ending|ended) (?:it|things|the relationship|our relationship|my relationship) with (?:my (?:boyfriend|girlfriend|husband|wife|partner|ex|fiance|fiancee|bf|gf)|him|her|them)\b/
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
        vision:1.8, eye:1.6, glasses:1.5, hearing:1.8, audiology:1.8, mental:1.2,
        anxiety:2.0, anxious:1.8, depression:2.0, depressed:2.0
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
        custody:2.1, divorce:1.9, warrant:1.8, defender:2.0, rights:1.5,
        eviction:1.6, evicted:1.6, landlord:1.6, tenant:1.6
      },
      financial: {
        financial:2.4, money:1.8, bill:1.7, bills:1.7, benefits:1.8, debt:1.8, burial:1.8, funeral:1.8,
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
        caregiver:2.0, dementia:2.6, alzheimer:2.6, retirement:1.8,
        grandma:1.8, grandpa:1.8, grandmother:1.8, grandfather:1.8
      },
      pet: {
        pet:2.5, pets:2.5, dog:2.3, dogs:2.3, cat:2.3, cats:2.3, animal:2.1,
        animals:2.1, vet:2.5, veterinary:2.5, veterinarian:2.5, spay:2.2, neuter:2.2,
        pup:2.3, puppy:2.3, kitten:2.3, kibble:2.5
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

    /* Everyday words mapped to the words the dataset actually uses. Every
       target appears in resources.js or in the lexicon above; a synonym only
       finds listings that already describe the service. */
    synonyms: {
      dentist:["dental"], dentists:["dental"], tooth:["dental"], teeth:["dental"], toothache:["dental"],
      eye:["vision"], eyes:["vision"], clothes:["clothing"], wifi:["internet","wi","fi"],
      lawyer:["attorney","legal"], lawyers:["attorney","legal"],
      jail:["reentry","incarceration"], prison:["reentry","incarceration"], incarcerated:["reentry","incarceration"],
      felon:["felony"], felons:["felony"], cps:["dcs"], protective:["protection"],
      medicine:["medication","prescriptions"], meds:["medication","prescriptions"],
      drinking:["alcohol"], drunk:["alcohol"], raped:["sexual","assault"],
      abuser:["abuse"], abusive:["abuse"], psychiatrist:["psychiatry","psychiatric"],
      power:["utility","utilities"], eat:["meals"], busses:["bus"],
      daycare:["childcare"], evicted:["eviction"], uti:["utis"], addicted:["addiction"], addict:["addiction"],
      meth:["drug","substance"],
      /* First holdout run (now regression). Each maps to the dataset's own
         service wording: Burial Assistance / trustees ("burial", "funeral");
         Wabash Valley Health Center ("dental"); Hamilton Center, Centerstone,
         MHA ("mental health"); Humane Society Pet Food Pantry ("pet food"). */
      bury:["burial","funeral"], buried:["burial","funeral"], burying:["burial","funeral"],
      gum:["dental"], gums:["dental"],
      anxiety:["mental","health"], anxious:["mental","health"], depression:["mental","health"], depressed:["mental","health"],
      kibble:["pet","food"], pup:["dog"], puppy:["dog"]
    },

    /* Generic words that describe almost every listing. They still match, at
       a fraction of the weight, but never count as a specific match and a
       query made only of them asks the person what they need. */
    weakWords: new Set([
      "free","low","cost","service","services","program","programs","support","care","resource","resources",
      "class","classes","lost",
      /* "take" describes almost anything ("take-home boxes"); it is not a request */
      "take","takes","taking","took","taken",
      /* packaging, not a service ("safe deposit box" is not "take-home boxes") */
      "box","boxes"
    ]),

    /* Broad words for each category. A request using one of these is
       browsing the category, so every listing in it is relevant. A request
       naming a sub-service ("abuse", "dental", "snap") is not: listings that
       match it only by category are left out when others describe it. */
    broadTerms: {
      food:["food","hungry","hunger","meal","meals","grocery","groceries"],
      housing:["housing","shelter","homeless","homelessness","unhoused","sleep"],
      health:["health","healthcare","medical","doctor","clinic","hospital"],
      crisis:["crisis","emergency"],
      recovery:["recovery","sober","sobriety","addiction","substance","drug","drugs","alcohol","rehab","rehabilitation"],
      legal:["legal","lawyer","attorney","court"],
      financial:["financial","money","bill","bills","benefits","assistance","cash","income","pay","paying"],
      employment:["job","jobs","work","employment","career","workforce","hiring"],
      education:["school","education","college","university","class","classes"],
      children:["child","children","kid","kids","family","parent"],
      senior:["senior","seniors","elderly","aging","older","grandma","grandpa","grandmother","grandfather"],
      pet:["pet","pets","dog","dogs","cat","cats","animal","animals"],
      immigration:["immigration","immigrant","immigrants"],
      transportation:["transportation","bus","transit","ride","rides"],
      other:["other","miscellaneous"]
    },

    /* Words asking for no-cost help. Matched listings are ordered by their
       documented cost: explicitly free, then unknown, then explicitly paid. */
    freeWords: new Set(["free"]),

    /* Multi-word concepts. Each entry represents a concept, not a one-off user
       sentence. "narrow" means category-only matches should not outrank the
       resources that actually contain the specific concept. "situational"
       phrases describe a circumstance, not a service: their words signal the
       category but are not matched against listings individually (so "car"
       in "sleeping in my car" does not find Car Repair). "expand" adds the
       service word the dataset uses for that circumstance. "patterns" are
       regular expressions matched like phrases, for wording that varies.
       "required" means listings in the concept's category must offer the
       concept itself: category-only matches are left out. "fallbackTerms"
       mark a general help line kept, after the real matches, as the next step
       when no listing can confirm availability. "openFirst" orders listings
       open to anyone before those limited to a group the person did not
       name. */
    phraseConcepts: [
      /* Somewhere to sleep tonight: overnight shelter and emergency lodging
         only. A day center, rent help or Section 8 is not a bed tonight. No
         listing confirms a free bed, so 2-1-1 follows as the next call. */
      {phrases:["emergency shelter","homeless shelter","overnight shelter","night shelter",
                "no place to sleep","no place sleep","nowhere to sleep","nowhere sleep","no where to sleep",
                "place to sleep","somewhere to sleep","some where to sleep","anywhere to sleep",
                "sleeping outside","sleep outside","sleeping on the street","sleeping on the streets","sleeping outdoors",
                "sleeping in my car","sleeping in car","sleep in my car","living in my car","living in car",
                "homeless tonight","bed for the night","a bed tonight","bed tonight"],
       patterns:[
         /\b(?:sleep|sleeping|stay|staying|shelter|bed|beds|lodging|room)(?: [a-z]+){0,3} (?:tonight|overnight|for the night)\b/,
         /\b(?:tonight|overnight)(?: [a-z]+){0,3} (?:sleep|stay|shelter|bed)\b/
       ],
       serviceTerms:["emergency shelter","emergency lodging","overnight shelter"], fallbackTerms:["211"],
       categories:{housing:4.5}, narrow:false, situational:true, browse:false, required:true, openFirst:true},
      {phrases:["food pantry","food pantries","soup kitchen"], categories:{food:4.5}, narrow:true},
      {phrases:["food stamps","snap benefits","snap","ebt"], categories:{food:4.5}, narrow:true},
      {phrases:["school lunch","school lunches","school meals","free lunch","reduced lunch","free and reduced"], categories:{food:4.5}, narrow:true},
      {phrases:["meals on wheels","home delivered meals","food delivered","meals delivered","delivered meals"], categories:{senior:5.0}, narrow:true},
      {phrases:["place to stay","nowhere to go","no where to go","no place to go","place to live","kicked out"], categories:{housing:4.5}, narrow:false, situational:true},
      {phrases:["kicking me out","kick me out","kicked me out","kicking us out","kick us out","getting evicted","being evicted"],
       categories:{housing:4.0,legal:2.5}, narrow:false, situational:true, expand:["eviction"]},
      {phrases:["get clean","getting clean","stay clean","quit drinking","stop drinking"], categories:{recovery:4.5}, narrow:false, situational:true},
      {phrases:["vocational rehab","vocational rehabilitation"], categories:{education:4.5,employment:2.0}, narrow:true},
      {phrases:["homeless student","homeless students","homeless child","homeless children"], categories:{education:4.5}, narrow:true},
      {phrases:["rent assistance","rental assistance","help with rent","pay rent","paying rent"], categories:{housing:3.8,financial:3.8}, narrow:true},
      {phrases:["utility assistance","utility bill","utility bills","light bill","power bill","electric bill","gas bill",
                "water bill","heating bill","shutoff","shutoffs","shut off"], categories:{financial:4.0,housing:2.0}, narrow:true},
      {phrases:["school physical","sports physical","work physical"], categories:{health:4.5}, narrow:true},
      /* Routine health checks are primary care: Neighborhood Health Clinic
         ("primary care"), Health Department ("physicals"), free clinics. */
      {phrases:["blood pressure","blood sugar","check up","checkup","health screening"],
       serviceTerms:["primary care","physicals","free clinic"], categories:{health:4.5}, narrow:false},
      /* "after" alone is a stop word; the phrase is the service
         (After-School Tutoring, Boys & Girls Club after-school programs). */
      {phrases:["after school","afterschool"], categories:{children:3.0,education:3.0}, narrow:false},
      {phrases:["fridge is empty","empty fridge","refrigerator is empty","cupboards are empty","nothing to eat"],
       categories:{food:4.5}, narrow:false, situational:true, expand:["food"]},
      {phrases:["urgent care","walk in clinic","walk in"], categories:{health:4.5}, narrow:true},
      {phrases:["gas voucher","gas vouchers","gas card","gas cards"], categories:{transportation:4.5,employment:1.5}, narrow:true, situational:true},
      {phrases:["protection order","restraining order"], categories:{legal:4.8}, narrow:true},
      {phrases:["learn english","english classes","english class","learn to read"], categories:{education:4.5}, narrow:true},
      {phrases:["old people","old person","old folks"], categories:{senior:4.0}, narrow:false},
      {phrases:["free clinic","no insurance","without insurance"], categories:{health:4.2}, narrow:true},
      {phrases:["mental health"], categories:{health:3.8,crisis:1.6}, narrow:false},
      {phrases:["panic attack"], categories:{crisis:4.2,health:2.5}, narrow:false},
      {phrases:["domestic violence","sexual assault"], categories:{crisis:5.0,housing:1.5}, narrow:false},
      {phrases:["sober living","sober house","sober housing","recovery house","recovery housing"], categories:{recovery:5.0}, narrow:true},
      {phrases:["legal aid","free lawyer","free attorney","public defender"], categories:{legal:4.8}, narrow:true},
      {phrases:["job training","work training","career training"], categories:{employment:4.0,education:2.5}, narrow:true},
      {phrases:["child care","head start"], categories:{children:4.2,education:1.5}, narrow:true},
      {phrases:["older adult","older adults"], categories:{senior:4.2}, narrow:true},
      {phrases:["pet food","dog food","cat food"], categories:{pet:4.5}, narrow:true},
      /* "serviceTerms": what a listing must say to offer this service, when
         the person's own words ("feed my dog") never appear in listings. */
      {phrases:FEEDING_PHRASES.animals, serviceTerms:["pet food"], categories:{pet:4.5}, narrow:true, situational:true},
      {phrases:FEEDING_PHRASES.people, serviceTerms:["food pantry","food pantries","food assistance","hot meals","free meals"],
       categories:{food:4.5}, narrow:false, situational:true},
      {phrases:["green card"], categories:{immigration:4.8}, narrow:true, situational:true},
      {phrases:["stay in the country","stay in this country","immigration papers","work permit","work permits","legal status"], categories:{immigration:4.5}, narrow:false, situational:true},
      {phrases:["public transit","bus route","bus routes"], categories:{transportation:4.5}, narrow:true},
      /* The city bus and where it stops: "bus station", "transfer center",
         "bus schedule", "ride the bus". The words "station", "center" or
         "schedule" alone describe many unrelated listings, so they are not
         searched separately; the request is for the bus. */
      {phrases:["city bus","bus schedule","bus schedules","bus times","bus stop","bus stops","bus station","bus terminal","bus depot",
                "transfer center","transfer station","ride the bus","take the bus","catch the bus","bus pass"],
       serviceTerms:["city bus","public transit"], categories:{transportation:4.5}, narrow:false, situational:true, browse:false, expand:["bus"]},
      /* Somewhere safe to be: shelter and lodging, with no assumption about
         who is asking or why. Abuse support is offered as a separate route
         in the results, not inferred. */
      {phrases:["somewhere safe","someplace safe","some place safe","safe place","safe places","safe spot",
                "place to be safe","somewhere to be safe"],
       serviceTerms:["shelter","emergency lodging"], categories:{housing:4.5}, narrow:false, situational:true, expand:["lodging"],
       route:"safety", browse:false}
    ],

    /* Words that on their own say "safe" with no other request ("safe",
       "safety"): the results offer the safety routes without asserting an
       emergency. */
    safetyWords: new Set(["safe","safety","safely"]),

    /* Requests for bus routes or schedules: the results link to the bus page.
       Intercity coaches and other rides are separate services. */
    busRoutePatterns: [
      /^(?:the )?(?:bus|buses|busses|city bus|city buses|transit|public transit|bus routes?|bus schedules?)$/,
      /\b(?:bus|buses|busses|transit)\b(?: [a-z]+){0,3} (?:route|routes|schedule|schedules|times|timetable|map|maps|stop|stops|hours)\b/,
      /\b(?:route|routes|schedule|schedules|timetable|map|stops) (?:for |of )?(?:the )?(?:city )?(?:bus|buses|busses|transit)\b/,
      /\b(?:city bus|city buses|terre haute transit|which bus|what bus|(?:what time|when) does the bus|bus come)\b/,
      /\b(?:transfer center|transfer station|bus station|bus terminal|bus depot|ride the bus|take the bus)\b/
    ],
    busRouteExclusions: /\b(?:greyhound|megabus|coach|indianapolis|indy|chicago|louisville)\b/
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

/* Words of the query with the kind of break before each one: "hard" for
   sentence and clause punctuation (. ! ? ; : ,), "soft" for pauses that do
   not end a thought (ellipses, line breaks, dashes), null for none. */
function clauseWords(value) {
  const text = String(value == null ? "" : value)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ");
  const words = [];
  const breaks = [];
  let pending = null;
  const pattern = /([a-z0-9]+)|(\.{2,}|…|\r\n|\r|\n|[—–])|([.!?;:,])/g;
  let match;
  while ((match = pattern.exec(text))) {
    if (match[1]) { words.push(match[1]); breaks.push(pending); pending = null; }
    else if (match[2]) { if (pending !== "hard") pending = "soft"; }
    else pending = "hard";
  }
  return {words, breaks};
}

/* Maps each clause-word position to the matching search-word position.
   Both come from the same text; the only difference is that the search
   words join spaced digits ("2 1 1" → "211"). */
function alignClauseWords(clause, tokens) {
  const map = new Map();
  let j = 0;
  tokens.forEach((token, t) => {
    if (clause[j] === token) { map.set(j, t); j++; return; }
    if (/^\d{3}$/.test(token) && clause.slice(j, j + 3).join("") === token) {
      for (let k = 0; k < 3; k++) map.set(j + k, t);
      j += 3;
    }
  });
  return map;
}

/* Like normalizeSearchText, but clause punctuation (. ! ? ; : , dashes and
   line breaks) becomes a "|" boundary. Crisis and benign patterns join words
   with single spaces, so no match can cross a boundary. */
function normalizeClauseText(value) {
  return String(value == null ? "" : value)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[.!?;:,—–\r\n]+/g, " | ")
    .replace(/[^a-z0-9|]+/g, " ")
    .replace(/\b(\d) (\d) (\d)\b/g, "$1$2$3")
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
  /* Concepts with serviceTerms are generated phrasings of how people ask
     ("feed my dog"); their words ("feed") are not spelling targets, or
     "fud" would tie between food and feed. */
  lexicon.phraseConcepts.filter(concept => !concept.serviceTerms).forEach(concept => {
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

/* Light suffix stripping so plural, -ing and -ed forms meet (taxes→tax,
   showers→shower, printing→print). Applied identically to query and
   resource words, so it only needs to be consistent, not linguistically exact. */
function stemSearchWord(word) {
  if (!word || word.length <= 3 || /^\d+$/.test(word)) return word;
  if (word.length > 4 && word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.endsWith("sses") || /(?:x|z|ch|sh)es$/.test(word)) return word.slice(0, -2);
  if (word.length > 5 && word.endsWith("ing")) return word.slice(0, -3);
  if (word.length > 5 && word.endsWith("ed")) return word.slice(0, -2);
  if (word.endsWith("s") && !/(?:ss|us|is)$/.test(word)) return word.slice(0, -1);
  return word;
}

/* Every word used in the directory's names, tags and descriptions, and how
   many listings use each word (or its stem). Computed once per dataset array. */
const datasetVocabularyCache = typeof WeakMap === "function" ? new WeakMap() : null;
function buildDatasetIndex(resources) {
  if (!Array.isArray(resources)) return {words:new Set(), frequency:new Map()};
  if (datasetVocabularyCache && datasetVocabularyCache.has(resources)) return datasetVocabularyCache.get(resources);
  const words = new Set();
  const frequency = new Map();
  resources.forEach(resource => {
    const seen = new Set();
    [resource.name, (resource.tags || []).join(" "), resource.description].forEach(text => {
      normalizeSearchText(text).split(" ").forEach(word => {
        if (word.length < 2) return;
        words.add(word);
        seen.add(word);
        seen.add(stemSearchWord(word));
      });
    });
    seen.forEach(word => frequency.set(word, (frequency.get(word) || 0) + 1));
  });
  const index = {words, frequency};
  if (datasetVocabularyCache) datasetVocabularyCache.set(resources, index);
  return index;
}

function buildDatasetVocabulary(resources) {
  return buildDatasetIndex(resources).words;
}

function serviceCategoriesFor(word, lexicon) {
  return Object.keys(lexicon.categoryTerms).filter(category => lexicon.categoryTerms[category][word]).join(",");
}

function conservativelyCorrectToken(token, lexicon, vocabulary, lockedTokens, datasetWords, datasetStems) {
  if (!token || /^\d+$/.test(token) || lexicon.stopWords.has(token) || vocabulary.has(token)) return token;
  if (lexicon.protectedWords.has(token) || lexicon.synonyms[token] || (lockedTokens && lockedTokens.has(token))) return token;
  /* The original wording is searched first. A word the directory itself
     uses — in this form or another form of it ("print" for "printing") —
     is already exact: program names such as VITA, CASY or CARES, and
     ordinary words such as "order" in "protection order", must not be
     "corrected" into a different service. */
  /* A valid word may take another form of ITSELF that the lexicon uses
     ("wheel" → "wheels" in "meals on wheels"), never a different word
     ("rid" is not "rides": their stems differ). */
  const sameWordForm = () => [`${token}s`, `${token}es`]
    .find(form => vocabulary.has(form) && stemSearchWord(form) === stemSearchWord(token)) || token;
  if (datasetWords && datasetWords.has(token)) return token;
  if (datasetStems && datasetStems.has(stemSearchWord(token))) return sameWordForm();
  /* A real English word (or a plural/-ing/-ed form of one) is what the
     person meant. Correction is only for non-words ("fud", "shleter"). */
  if (COMMON_ENGLISH_WORDS.has(token) || COMMON_ENGLISH_WORDS.has(stemSearchWord(token))) return sameWordForm();

  const singular = singularCandidate(token, vocabulary);
  if (singular !== token) return singular;

  if (token.length < 3) return token;
  const maxDistance = token.length <= 3 ? 2 : (token.length >= 8 ? 2 : 1);
  /* Short words are corrected only toward service terms. Longer words may
     also be corrected toward words the directory uses (preshool→preschool),
     where a single edit is far less likely to land on an unrelated word. */
  const pool = token.length >= 6 && datasetWords
    ? new Set([...vocabulary, ...[...datasetWords].filter(word => word.length >= 6)])
    : vocabulary;
  let best = [];
  let bestDistance = maxDistance + 1;

  pool.forEach(candidate => {
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
      best = [candidate];
      bestDistance = distance;
    } else if (distance === bestDistance) {
      best.push(candidate);
    }
  });

  if (bestDistance > maxDistance || !best.length) {
    const vowelOnly = vowelErrorCorrection(token, lexicon, vocabulary);
    return vowelOnly !== token ? vowelOnly : missingLettersCorrection(token, lexicon, vocabulary, datasetWords);
  }
  if (best.length === 1) return best[0];
  /* A tie is resolved only when every candidate is a service term for the
     same categories (hungery → hunger / hungry, both Food). Otherwise the
     word is left as typed rather than silently choosing between services. */
  const intents = new Set(best.map(candidate => serviceCategoriesFor(candidate, lexicon)));
  return intents.size === 1 && !intents.has("") ? best.sort()[0] : token;
}

/* Fallback for a 5–7 letter word whose only errors are in its vowels
   ("rentle" → "rental"): two edits are allowed when the consonants are
   identical and in order, toward lexicon service terms with the same first
   letter, and only when every candidate means the same service. */
function vowelErrorCorrection(token, lexicon, vocabulary) {
  if (token.length < 5 || token.length > 7) return token;
  const skeleton = consonantSkeleton(token);
  const candidates = [...vocabulary].filter(candidate =>
    candidate[0] === token[0] && Math.abs(candidate.length - token.length) <= 2 &&
    serviceCategoriesFor(candidate, lexicon) && consonantSkeleton(candidate) === skeleton &&
    damerauLevenshtein(token, candidate) <= 2
  );
  if (!candidates.length) return token;
  const intents = new Set(candidates.map(candidate => serviceCategoriesFor(candidate, lexicon)));
  return intents.size === 1 ? candidates.sort()[0] : token;
}

/* Fallback for a word with up to two letters left out ("homles" →
   "homeless", "compter" → "computers"), the most common low-literacy
   misspelling. Deliberately narrow: only 5–7 letter words, only by adding
   letters, same first letter. Toward lexicon service terms when every
   candidate means the same service; otherwise toward a directory word only
   when exactly one directory word fits. */
function missingLettersCorrection(token, lexicon, vocabulary, datasetWords) {
  if (token.length < 5 || token.length > 7) return token;
  const isSubsequence = (short, long) => {
    let i = 0;
    for (const ch of long) if (ch === short[i]) i++;
    return i === short.length;
  };
  const fits = candidate => candidate[0] === token[0] &&
    candidate.length > token.length && candidate.length - token.length <= 2 && isSubsequence(token, candidate);
  const serviceCandidates = [...vocabulary].filter(candidate => serviceCategoriesFor(candidate, lexicon) && fits(candidate));
  if (serviceCandidates.length) {
    const intents = new Set(serviceCandidates.map(candidate => serviceCategoriesFor(candidate, lexicon)));
    return intents.size === 1 ? serviceCandidates.sort()[0] : token;
  }
  const directoryCandidates = datasetWords ? [...datasetWords].filter(fits) : [];
  return directoryCandidates.length === 1 ? directoryCandidates[0] : token;
}

function categoryTermStrength(termMap, token) {
  return termMap[token] || termMap[stemSearchWord(token)] || 0;
}

/* Whole-word phrase containment on normalized text, so "ebt" is not found
   inside "debt" or "snap" inside "snapshot". */
function containsPhrase(text, phrase) {
  return !!text && ` ${text} `.includes(` ${phrase} `);
}

function detectPhraseConcepts(text, lexicon) {
  if (!text) return [];
  return lexicon.phraseConcepts.filter(concept =>
    concept.phrases.some(phrase => containsPhrase(text, normalizeSearchText(phrase))) ||
    (concept.patterns || []).some(pattern => pattern.test(text))
  );
}

/* The words of a concept's phrases and patterns that occur in the text. */
function conceptWordsIn(text, concept) {
  const words = [];
  concept.phrases.forEach(phrase => {
    const p = normalizeSearchText(phrase);
    if (containsPhrase(text, p)) words.push(...p.split(" "));
  });
  (concept.patterns || []).forEach(pattern => {
    const match = text && text.match(pattern);
    if (match) words.push(...match[0].split(" "));
  });
  return words;
}

function analyzeSearchQuery(rawQuery, language = "en", resources = null) {
  const lexicon = SEARCH_LEXICONS[language] || SEARCH_LEXICONS.en;
  const vocabulary = buildSearchVocabulary(lexicon);
  const datasetWords = buildDatasetVocabulary(resources);
  const frequency = buildDatasetIndex(resources).frequency;
  /* "2-1-1" and "9 1 1" normalize to separate digits; rejoin them. */
  const normalized = normalizeSearchText(rawQuery).replace(/\b(\d) (\d) (\d)\b/g, "$1$2$3");

  /* Crisis phrases first. A match adds a signal; it does not remove the
     words, and the words inside it are never fuzzily corrected. */
  const signals = [];
  const lockedTokens = new Set();
  /* Clause positions covered by crisis matches. Excluded from searching by
     position, like benign statements: "home" in "i dont feel safe at home"
     is not searched, but "home" in a separate "i need in home care" is. */
  const crisisPositions = new Set();
  /* Two views of the query's clauses. Benign contexts are matched where
     EVERY break (including ellipses and line breaks) ends the match, so an
     ordinary phrase can never absorb words from a neighbouring thought.
     Genuine crisis phrases are matched where only sentence punctuation ends
     the match, so "i want to...die" and "he<line break>od" still count.
     Each benign match masks exactly its own words in the crisis view. */
  const {words: clause, breaks} = clauseWords(rawQuery);
  const strictText = clause.map((word, i) => (i && breaks[i] ? "| " : "") + word).join(" ");
  const masked = new Set();
  lexicon.benignContexts.forEach(pattern => {
    const global = new RegExp(pattern.source, "g");
    let match;
    while ((match = global.exec(strictText))) {
      const start = (strictText.slice(0, match.index).match(/[a-z0-9]+/g) || []).length;
      const length = (match[0].match(/[a-z0-9]+/g) || []).length;
      for (let i = start; i < start + length; i++) masked.add(i);
      if (!match[0]) global.lastIndex++;
    }
  });
  /* The crisis view keeps, for each of its words, the clause position it
     came from (-1 for a sentence break), so a crisis match can be traced
     back to exact positions. */
  const crisisParts = [];
  clause.forEach((word, i) => {
    if (i && breaks[i] === "hard") crisisParts.push({text:"|", position:-1});
    crisisParts.push({text:masked.has(i) ? "|" : word, position:i});
  });
  const crisisText = crisisParts.map(part => part.text).join(" ");
  lexicon.crisisPhrases.forEach(rule => {
    rule.patterns.forEach(pattern => {
      const global = new RegExp(pattern.source, "g");
      let match;
      while ((match = global.exec(crisisText))) {
        match[0].split(" ").filter(word => /^[a-z0-9]+$/.test(word)).forEach(word => lockedTokens.add(word));
        const first = crisisText.slice(0, match.index).split(" ").filter(Boolean).length;
        const count = match[0].split(" ").filter(Boolean).length;
        crisisParts.slice(first, first + count).forEach(part => { if (part.position >= 0) crisisPositions.add(part.position); });
        if (!signals.includes(rule)) signals.push(rule);
        if (!match[0]) global.lastIndex++;
      }
    });
  });

  /* Words that form a recognised phrase keep their spelling, so phrase
     context ("stay in the country") wins over single-word correction. */
  detectPhraseConcepts(normalized, lexicon).forEach(concept => {
    conceptWordsIn(normalized, concept).forEach(word => lockedTokens.add(word));
  });

  const rawTokens = normalized ? normalized.split(" ") : [];
  const correctedTokens = rawTokens.map(token => conservativelyCorrectToken(token, lexicon, vocabulary, lockedTokens, datasetWords, frequency));
  /* Words split by a space ("pre school", "day care") are joined when the
     joined word is one the lexicon or directory uses; the joined word then
     replaces its two parts, which were never separate requests. */
  const compoundTokens = [];
  const compoundParts = new Set();
  for (let i = 0; i + 1 < correctedTokens.length; i++) {
    const joined = correctedTokens[i] + correctedTokens[i + 1];
    if (/^[a-z]+$/.test(joined) && (vocabulary.has(joined) || datasetWords.has(joined))) {
      compoundTokens.push(joined);
      compoundParts.add(i).add(i + 1);
    }
  }
  const correctedText = correctedTokens.join(" ");
  const signalTokens = signals.flatMap(rule => rule.tokens);

  const phraseMap = new Map();
  [...detectPhraseConcepts(normalized, lexicon), ...detectPhraseConcepts(correctedText, lexicon),
   ...detectPhraseConcepts(signalTokens.join(" "), lexicon)]
    .forEach(concept => phraseMap.set(concept.phrases[0], concept));
  const phraseConcepts = [...phraseMap.values()];

  /* Words of a situational phrase describe a circumstance; the concept
     carries their meaning, so they are not matched against listings. */
  const situationalWords = new Set();
  phraseConcepts.filter(concept => concept.situational).forEach(concept => {
    [...conceptWordsIn(normalized, concept), ...conceptWordsIn(correctedText, concept)].forEach(word => situationalWords.add(word));
  });
  const expandTokens = phraseConcepts.flatMap(concept => concept.expand || []);

  /* Inside a crisis phrase only service words carry meaning beyond the
     signal ("children" in "he hits my children"); the rest ("safe", "home",
     "myself") would otherwise match unrelated listings such as In-Home Care. */
  const isServiceTerm = token => Object.values(lexicon.categoryTerms).some(termMap => categoryTermStrength(termMap, token));
  const negatedCost = negatedCostWordIndexes(normalized);
  const requestVerbUses = new Set(rawTokens.map((token, i) => {
    if (token !== "use") return -1;
    let j = i - 1;
    while (j >= 0 && lexicon.requestVerbFillers.has(rawTokens[j])) j--;
    return j >= 0 && lexicon.requestVerbs.has(rawTokens[j]) ? i : -1;
  }).filter(i => i >= 0));
  /* The words of a benign or denied statement ("i burned myself cooking
     dinner", "i did not take too many pills") are not search terms, but
     only at the positions that statement occupies: "dinner" in a separate
     "i need dinner tonight" is still searched. */
  const clauseToToken = alignClauseWords(clause, rawTokens);
  const toTokenPositions = positions => new Set([...positions].map(i => clauseToToken.get(i)).filter(i => i !== undefined));
  const benignPositions = toTokenPositions(masked);
  const crisisTokenPositions = toTokenPositions(crisisPositions);
  const baseTokens = [
    ...correctedTokens.filter((token, i) => !compoundParts.has(i) && !negatedCost.has(i) && !requestVerbUses.has(i) &&
      (!(crisisTokenPositions.has(i) || benignPositions.has(i)) || isServiceTerm(token)) && !situationalWords.has(token)),
    ...compoundTokens, ...signalTokens, ...expandTokens
  ];
  const synonymTokens = baseTokens.flatMap(token => lexicon.synonyms[token] || []);
  /* "free" qualifies results only when the person asks for no-cost help;
     "smoke-free" or "does not have to be free" must not favour listings
     that mention free things. */
  const wantsFree = requestsNoCost(rawQuery);
  const meaningfulTokens = [...new Set([...baseTokens, ...synonymTokens].filter(token =>
    token.length > 1 && !lexicon.stopWords.has(token) && (wantsFree || !lexicon.freeWords.has(token))
  ))];

  /* Generic words ("classes", "free") do not, on their own, say which
     service is wanted. A synonym adds intent only when the word typed has
     none, so "lawyer" (already Legal) is not counted three times. */
  const hasIntent = token => Object.values(lexicon.categoryTerms).some(termMap => categoryTermStrength(termMap, token));
  const allIntentTokens = [...new Set([
    ...baseTokens,
    ...baseTokens.filter(token => !hasIntent(token)).flatMap(token => lexicon.synonyms[token] || [])
  ])].filter(token => token.length > 1 && !lexicon.stopWords.has(token) && !lexicon.weakWords.has(token));

  /* Beneficiaries ("for my kids", "with my mom") qualify another need rather
     than adding one: "food for my kids" asks for food. They become a need
     only when nothing else is asked for ("help with my kids"). */
  const beneficiaryWords = new Set();
  const beneficiaryPattern = /\b(?:for|with) (?:my |our |the |his |her |their |a )?(kids|kid|children|child|son|daughter|baby|babies|family|mom|dad|mother|father|grandma|grandpa|husband|wife|women|woman|men|man|veterans|veteran|seniors|senior)\b/g;
  let beneficiaryMatch;
  while ((beneficiaryMatch = beneficiaryPattern.exec(normalized))) beneficiaryWords.add(beneficiaryMatch[1]);
  const otherNeed = allIntentTokens.some(token => !beneficiaryWords.has(token) &&
    Object.values(lexicon.categoryTerms).some(termMap => categoryTermStrength(termMap, token) >= SEARCH_NEED_STRENGTH)) ||
    detectPhraseConcepts(normalized, lexicon).length > 0 || signals.length > 0;
  const beneficiaryForms = {kids:["kids","kid","children","child"], kid:["kids","kid","children","child"],
    children:["kids","kid","children","child"], child:["kids","kid","children","child"], baby:["baby","babies","infant","infants"],
    babies:["baby","babies","infant","infants"], mom:["mom","mother"], mother:["mom","mother"], dad:["dad","father"], father:["dad","father"],
    women:["women","woman","womens"], woman:["women","woman","womens"], men:["men","man","mens"], man:["men","man","mens"],
    veteran:["veteran","veterans"], veterans:["veteran","veterans"],
    grandma:["grandma","grandmother","senior","seniors","elderly"], grandpa:["grandpa","grandfather","senior","seniors","elderly"],
    senior:["senior","seniors","elderly"], seniors:["senior","seniors","elderly"]};
  const qualifierTokens = otherNeed ? [...new Set([...beneficiaryWords].flatMap(word => beneficiaryForms[word] || [word]))] : [];
  const intentTokens = allIntentTokens.filter(token => !qualifierTokens.includes(token));
  const categoryScores = {};
  Object.entries(lexicon.categoryTerms).forEach(([category, termMap]) => {
    intentTokens.forEach(token => {
      const strength = categoryTermStrength(termMap, token);
      if (strength) categoryScores[category] = (categoryScores[category] || 0) + strength;
    });
  });

  /* Needs: categories the person explicitly asks for — through a service
     word, or as the main category of a phrase. A phrase's secondary
     categories ("nowhere to sleep" also leans Crisis) are not needs. */
  const needScores = {};
  Object.entries(lexicon.categoryTerms).forEach(([category, termMap]) => {
    intentTokens.forEach(token => {
      const strength = categoryTermStrength(termMap, token);
      if (strength) needScores[category] = (needScores[category] || 0) + strength;
    });
  });

  phraseConcepts.forEach(concept => {
    const entries = Object.entries(concept.categories);
    const primary = Math.max(...entries.map(([, strength]) => strength));
    entries.forEach(([category, strength]) => {
      categoryScores[category] = (categoryScores[category] || 0) + strength;
      if (strength === primary) needScores[category] = (needScores[category] || 0) + strength;
    });
  });

  const directOtherQuery = meaningfulTokens.some(token => token === "other" || token === "miscellaneous");

  /* Categories the person is browsing broadly: a broad word for that
     category, or a situational phrase whose main category it is (unless the
     phrase asks for one kind of place: "somewhere safe" is shelter, not
     every housing program). */
  /* A word a non-browsing concept supplies ("bus" for "bus station") names
     the service, not the whole category. */
  const conceptOnlyWords = new Set(phraseConcepts.filter(concept => concept.browse === false).flatMap(concept => concept.expand || []));
  const broadCategories = new Set(Object.keys(lexicon.broadTerms).filter(category =>
    intentTokens.some(token => !conceptOnlyWords.has(token) &&
      (lexicon.broadTerms[category].includes(token) || lexicon.broadTerms[category].includes(stemSearchWord(token))))
  ));
  phraseConcepts.filter(concept => concept.situational && concept.browse !== false).forEach(concept => {
    const entries = Object.entries(concept.categories);
    const primary = Math.max(...entries.map(([, strength]) => strength));
    entries.forEach(([category, strength]) => { if (strength === primary) broadCategories.add(category); });
  });

  /* Every applicable guidance card, overdose first. A query can describe
     more than one emergency and each keeps its own card. */
  const urgentKinds = new Set(signals.map(rule => rule.urgent).filter(Boolean));
  if (meaningfulTokens.some(token => token === "overdose" || token === "overdosing" || token === "911")) urgentKinds.add("overdose");
  if (meaningfulTokens.some(token => ["panic","suicide","suicidal","selfharm"].includes(token))) urgentKinds.add("mental-crisis");
  const urgentEmergencies = ["overdose", "emergency", "mental-crisis"].filter(kind => urgentKinds.has(kind));

  const strongTokens = meaningfulTokens.filter(token => !lexicon.weakWords.has(token));

  /* The particular service requested, as head words: the words asked for
     and the final word of each matched service phrase ("living", "house",
     "housing" for sober living). Broad category words ("recovery") are not
     heads, so "free recovery counseling" says nothing about housing. */
  const serviceHeads = new Set(strongTokens.filter(token => !qualifierTokens.includes(token)).flatMap(token => [token, stemSearchWord(token)]));
  phraseConcepts.forEach(concept => concept.phrases.forEach(phrase => {
    const words = normalizeSearchText(phrase).split(" ");
    serviceHeads.add(words[words.length - 1]);
  }));
  const requestedWords = serviceHeads;

  /* Multi-word runs of the query containing a distinctive word (not a stop
     word, service term or generic word): candidate organization names such
     as "hamilton center" or "mental health america", longest first. Service
     phrases from the lexicon ("food pantry") are not organizations. */
  const conceptPhrases = new Set(lexicon.phraseConcepts.flatMap(concept => concept.phrases.map(normalizeSearchText)));
  /* A distinctive word is not part of the search lexicon at all (service
     terms and service-phrase words such as "sober", "living", "house" are
     descriptions, not names). */
  const distinctive = word => word.length > 1 && !/^\d+$/.test(word) && !lexicon.stopWords.has(word) &&
    !isServiceTerm(word) && !lexicon.weakWords.has(word) && !vocabulary.has(word) && word !== "free" &&
    (frequency.get(word) || 0) > 0 && frequency.get(word) <= SEARCH_ORGANIZATION_WORD_LISTINGS;
  const organizationPhrases = [];
  for (let n = rawTokens.length; n >= 2; n--) {
    for (let i = 0; i + n <= rawTokens.length; i++) {
      const words = rawTokens.slice(i, i + n);
      const phrase = words.join(" ");
      if (words.some(distinctive) && !conceptPhrases.has(phrase)) organizationPhrases.push(phrase);
    }
  }

  /* Per-word facts used for every listing, computed once per search. */
  const tokenInfo = meaningfulTokens.map(token => {
    const stem = stemSearchWord(token);
    return {
      token, stem,
      weak: lexicon.weakWords.has(token),
      weakStem: lexicon.weakWords.has(stem),
      serviceTerm: isServiceTerm(token),
      rare: (frequency.get(token) || frequency.get(stem) || Infinity) <= SEARCH_RARE_WORD_LISTINGS,
      qualifier: qualifierTokens.includes(token)
    };
  });

  /* Shortcuts offered beside the results: safety routes for "somewhere
     safe" (or "safe" alone, without asserting an emergency), and the bus
     page for route and schedule requests. */
  const routes = {safety:null, bus:false};
  if (!signals.length) {
    if (phraseConcepts.some(concept => concept.route === "safety")) routes.safety = "place";
    else if (strongTokens.length && strongTokens.every(token => lexicon.safetyWords.has(token))) routes.safety = "word";
  }
  routes.bus = !lexicon.busRouteExclusions.test(normalized) && lexicon.busRoutePatterns.some(pattern => pattern.test(normalized));

  return {
    raw: String(rawQuery == null ? "" : rawQuery).trim(),
    language,
    routes,
    wordFrequency: frequency,
    normalized,
    correctedText,
    tokens: meaningfulTokens,
    tokenInfo,
    strongTokens,
    qualifierTokens,
    requestedWords,
    organizationPhrases,
    categoryScores,
    needScores,
    broadCategories,
    wantsFree,
    serviceHeads,
    phraseConcepts,
    hasNarrowPhrase: phraseConcepts.some(concept => concept.narrow),
    directOtherQuery,
    urgentEmergency: urgentEmergencies[0] || null,
    urgentEmergencies,
    crisisMatches: signals.map(rule => rule.signal)
  };
}

/* Listing fields never change during a visit, so they are normalized once
   per listing object rather than on every search. */
const resourceFieldCache = typeof WeakMap === "function" ? new WeakMap() : null;
function normalizedResourceFields(resource) {
  if (resourceFieldCache && resourceFieldCache.has(resource)) return resourceFieldCache.get(resource);
  const fields = buildResourceFields(resource);
  if (resourceFieldCache) resourceFieldCache.set(resource, fields);
  return fields;
}

const normalizedPhraseCache = new Map();
function normalizedPhrase(phrase) {
  if (!normalizedPhraseCache.has(phrase)) normalizedPhraseCache.set(phrase, normalizeSearchText(phrase));
  return normalizedPhraseCache.get(phrase);
}

function buildResourceFields(resource) {
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
    const words = fields[field] ? fields[field].split(" ") : [];
    fields.tokenSets[field] = new Set([...words, ...words.map(stemSearchWord)]);
  });
  fields.nameAndTags = `${fields.name} ${fields.tags}`;
  fields.offer = `${fields.name} ${fields.tags} ${fields.description}`;
  return fields;
}

/* Service phrases a listing's own name or tags contain, with their words.
   Fixed per listing, so computed once and cached with its fields. */
function conceptPhrasesInNameAndTags(resource, fields, lexicon) {
  if (!fields.conceptPhrases) {
    fields.conceptPhrases = [];
    lexicon.phraseConcepts.forEach(concept => concept.phrases.forEach(phrase => {
      const p = normalizedPhrase(phrase);
      if (containsPhrase(fields.nameAndTags, p)) fields.conceptPhrases.push({concept, words:p.split(" ")});
    }));
  }
  return fields.conceptPhrases;
}

function resourceContainsConcept(fields, concept) {
  return [...concept.phrases, ...(concept.serviceTerms || [])].some(phrase => {
    const p = normalizedPhrase(phrase);
    return containsPhrase(fields.name, p) || containsPhrase(fields.tags, p) || containsPhrase(fields.description, p) || containsPhrase(fields.requirements, p);
  });
}

/* Content boosts for each urgent guidance kind. Acute searches need more than
   a broad crisis-category tie: resources whose own content is specifically
   relevant rise, while the UI independently shows the guidance card first. */
const URGENT_CONTENT_TERMS = {
  "overdose": [
    ["911", 36], ["naloxone", 36], ["narcan", 36], ["overdose", 32],
    ["opioid", 24], ["emergency", 12], ["substance", 10], ["addiction", 10],
    ["recovery", 8], ["detox", 8]
  ],
  "mental-crisis": [
    ["988", 36], ["crisis line", 30], ["suicide", 28], ["crisis", 22],
    ["mental health", 20], ["behavioral", 14], ["counsel", 10], ["therapy", 8]
  ]
};

/* A rare, non-category word found in a description ("welding", "homework",
   "breakfast") is as strong a signal as a tag. "Rare" means used by only a
   few listings; common words ("living", "help") keep the normal weight. */
const SEARCH_SPECIFIC_DESCRIPTION_WEIGHT = 12;
const SEARCH_RARE_WORD_LISTINGS = 4;
/* A word that can identify an organization appears in few listings
   ("hamilton", "mission", "america"); common words ("living", "women")
   cannot make a phrase an organization name. */
const SEARCH_ORGANIZATION_WORD_LISTINGS = 8;

function scoreResourceForQuery(resource, analysis, context = {}) {
  const lexicon = SEARCH_LEXICONS[analysis.language] || SEARCH_LEXICONS.en;
  const fields = normalizedResourceFields(resource);
  let score = 0;
  const matchedTokens = new Set();
  /* A "specific" match is evidence that this listing offers what was asked
     for, not just that it sits in a related category: a query word in its
     name or tags, or a non-generic, non-category word in its description. */
  let specific = false;
  /* A listing whose name or tags name a different category's service that
     overlaps the query ("Pet Food Pantry" for "food pantry", "homeless
     students" for "homeless") offers that other service, not this one. */
  const intended = Object.keys(analysis.categoryScores);
  /* Words of the request: those typed, plus the service words of detected
     concepts ("food pantry" for "feed my kids"). Computed once per search. */
  if (!analysis.requestWords) {
    analysis.requestWords = new Set([...analysis.tokens,
      ...analysis.phraseConcepts.flatMap(concept => (concept.serviceTerms || []).flatMap(term => normalizedPhrase(term).split(" ")))]);
  }
  const requestWords = analysis.requestWords;
  /* Only a listing outside the requested categories can be "another
     service"; Pet Food Pantry is the right answer for "feed my dog". */
  const otherService = !analysis.categoryScores[resource.category] &&
    conceptPhrasesInNameAndTags(resource, fields, lexicon).some(({concept, words}) =>
      !intended.some(category => concept.categories[category]) && words.some(word => requestWords.has(word)));

  let weakScore = 0;
  /* A rare, non-category word this listing names ("welding", "breakfast"):
     direct evidence of the specific service, kept even beside larger needs. */
  let rareSpecific = false;
  /* Beneficiary fit: the listing serves the person named as a qualifier
     ("children" for "food for my kids"). Used for ordering, never as a match. */
  const qualifiers = analysis.qualifierTokens || [];
  const beneficiaryFit = qualifiers.some(word =>
    fields.tokenSets.name.has(word) || fields.tokenSets.tags.has(word) || fields.tokenSets.description.has(word));
  /* Need coverage: which requested categories this listing serves, by its
     own category or by service words it mentions. */
  const coveredNeeds = new Set([resource.category]);
  const infos = analysis.tokenInfo || analysis.tokens.map(token => {
    const stem = stemSearchWord(token);
    return {token, stem, weak:lexicon.weakWords.has(token), weakStem:lexicon.weakWords.has(stem),
      serviceTerm:Object.values(lexicon.categoryTerms).some(termMap => categoryTermStrength(termMap, token)), rare:false, qualifier:false};
  });
  infos.forEach(({token, stem, weak:weakToken, weakStem, serviceTerm, rare, qualifier}) => {
    if (qualifier) return;
    Object.entries(SEARCH_FIELD_WEIGHTS).forEach(([field, weight]) => {
      const set = fields.tokenSets[field];
      const exact = set.has(token);
      if (!exact && !set.has(stem)) return;
      /* Generic words count for little. An exact name match ("CARES") is
         judged by the word typed, not by its stem ("care"). */
      const weak = weakToken || (!exact && weakStem);
      if (weak) { weakScore += weight; return; }
      if (field !== "category" && serviceTerm) {
        Object.entries(lexicon.categoryTerms).forEach(([category, termMap]) => { if (categoryTermStrength(termMap, token)) coveredNeeds.add(category); });
      }
      /* An everyday word in the description of a listing outside the
         requested service ("time" in a pantry's hours for "what time does
         the bus come") is incidental, not evidence of that service. */
      const incidental = intended.length > 0 && !analysis.categoryScores[resource.category] && COMMON_ENGLISH_WORDS.has(token);
      const specificDescription = field === "description" && !serviceTerm && !incidental;
      score += specificDescription && rare ? SEARCH_SPECIFIC_DESCRIPTION_WEIGHT : weight;
      if (field === "category") return;
      matchedTokens.add(token);
      if ((field === "name" || field === "tags" || specificDescription) && !otherService) {
        specific = true;
        if (rare && !serviceTerm) rareSpecific = true;
      }
    });
  });

  /* A generic word is a qualifier: "free" in "free sober living" counts in
     full for a listing that already matches the request, and only a little
     otherwise. */
  score += weakScore * (matchedTokens.size ? 1 : 0.5);

  let conceptHit = false;
  let narrowConceptHit = false;
  /* For a required concept: the listing offers it (requiredHit), or is the
     general help line named as its fallback (fallbackHit). */
  let requiredHit = false;
  let fallbackHit = false;
  analysis.phraseConcepts.forEach(concept => {
    /* A listing for another service ("Pet Food Pantry") does not offer the
       requested concept even when its words overlap ("food pantry"). */
    if (!otherService && concept.fallbackTerms && !resourceContainsConcept(fields, concept) &&
        concept.fallbackTerms.some(term => containsPhrase(fields.tags, normalizedPhrase(term)) || containsPhrase(fields.name, normalizedPhrase(term)))) {
      fallbackHit = true;
      conceptHit = true;
      score += 8;
      return;
    }
    if (otherService || !resourceContainsConcept(fields, concept)) return;
    if (concept.required) requiredHit = true;
    conceptHit = true;
    if (concept.narrow && !otherService) narrowConceptHit = true;
    if (!otherService) specific = true;
    Object.keys(concept.categories).forEach(category => coveredNeeds.add(category));
    const phrases = [...concept.phrases, ...(concept.serviceTerms || [])];
    if (phrases.some(p => fields.name.includes(normalizedPhrase(p)))) score += 38;
    else if (phrases.some(p => fields.tags.includes(normalizedPhrase(p)))) score += 32;
    else if (phrases.some(p => fields.description.includes(normalizedPhrase(p)))) score += 22;
    else score += 8;
  });

  /* Organization: the longest multi-word run of the query, containing a
     distinctive word, found in this listing's name (2) or, as a documented
     affiliation, its description (1). */
  let organization = 0;
  for (const phrase of analysis.organizationPhrases || []) {
    const length = phrase.split(" ").length;
    if (containsPhrase(fields.name, phrase)) { organization = 100 + length; break; }
    if (!organization && containsPhrase(fields.description, phrase)) organization = length;
  }

  let urgentHit = false;
  const urgentText = `${fields.name} ${fields.tags} ${fields.description} ${fields.requirements}`;
  (analysis.urgentEmergencies || []).forEach(kind => {
    (URGENT_CONTENT_TERMS[kind] || []).forEach(([term, weight]) => {
      if (urgentText.includes(term)) { score += weight; urgentHit = true; }
    });
  });

  /* Category intent. A listing that matches only by category ranks below
     listings whose own text matches the request, when such listings exist
     (context from a first pass), and counts for little when its category is
     only a secondary association of a phrase rather than a stated need. */
  const hasContent = matchedTokens.size > 0 || conceptHit || urgentHit;
  const intentStrength = analysis.categoryScores[resource.category] || 0;
  if (intentStrength > 0) {
    const categoryMultiplier = resource.category === "other" && !analysis.directOtherQuery ? 0.35 : 1;
    let contentMultiplier = 1;
    if (!hasContent) {
      if (context.anySpecific || (context.contentCategories && context.contentCategories.has(resource.category))) contentMultiplier *= 0.6;
      if ((analysis.needScores || {})[resource.category] == null || analysis.needScores[resource.category] < SEARCH_NEED_STRENGTH) contentMultiplier *= 0.5;
    }
    score += intentStrength * SEARCH_CATEGORY_BOOST * categoryMultiplier * contentMultiplier;
  }

  if (matchedTokens.size >= 2) score += matchedTokens.size * 3;
  const strong = analysis.strongTokens || analysis.tokens;
  if (strong.length > 1 ? strong.every(token => matchedTokens.has(token)) : false) score += 10;

  /* Precision guard: once the query expresses a clear service-category intent,
     incidental use of the same word in an unrelated category should not rank
     like an in-category service. A specific match (the Diaper Bank for
     "diapers", tenant-rights help for "evicted") is exempt. */
  if (intended.length && !analysis.categoryScores[resource.category] && !specific) {
    score *= 0.4;
  }

  return {resource, score, matchedTokens:[...matchedTokens], specific, hasContent, narrowConceptHit, rareSpecific,
    organization, beneficiaryFit, coveredNeeds, requiredHit, fallbackHit,
    categoryIntent:intentStrength > 0, weakOnly:!hasContent && !(intentStrength > 0) && weakScore > 0};
}

/* Content that shows a listing offers acute help for a detected emergency —
   not merely that it is in the Crisis category or treats a related condition
   ("opioid" treatment is routine care, not acute overdose response). */
const EMERGENCY_EVIDENCE = {
  "overdose": ["911", "naloxone", "narcan", "overdose"],
  "emergency": ["911"],
  "mental-crisis": ["988", "crisis line", "suicide", "mental health crisis", "crisis intervention"]
};

function emergencyEvidence(resource, kind) {
  const text = normalizedResourceFields(resource).offer;
  return (EMERGENCY_EVIDENCE[kind] || []).some(term => containsPhrase(text, term));
}

/* "free" that is not about price, or that prices something other than the
   service itself. Shared by the query and listing checks. */
const NON_COST_FREE = /\b(?:smoke|drug|alcohol|tobacco|nicotine|sugar|gluten|nut|scent|fragrance|latex|crime|violence|stress|worry|hands|barrier) free\b/g;
const CONSULTATION_FREE = /\bfree (?:initial |first )?(?:consultation|consultations|assessment|assessments|screening|screenings|evaluation|evaluations|estimate|estimates|quote|quotes|referral|referrals)\b/g;
const EXPLICIT_CHARGE = /\$\s?\d[\d.,]*\s*(?:\/|per\s)\s*(?:week|wk|month|mo|day|night)\b|\bcosts? \$\s?\d|\brent (?:is|of) \$\s?\d|\bpay equal share\b|\bself-pay\b|\bcash and credit\b/;
/* Words that end the phrase "free" modifies ("free meals AND transportation",
   "free FOR sober living placement"). */
const COST_PHRASE_STOPS = new Set(["for","to","with","and","or","but","of","in","at","on","by","from","plus","as","if","when","while"]);
const COPULAS = new Set(["is","are","be","was","were","its","being"]);
/* Things a listing may charge for besides the requested service. */
const OTHER_PRICED_ITEMS = new Set(["meal","meals","food","counseling","consultation","consultations","assessment","laundry",
  "transportation","ride","rides","class","classes","testing","test","parking","membership","copies","printing"]);
/* Words that make a charge clearly about the stay or program itself. */
const STAY_CHARGE_WORDS = new Set(["rent","fee","fees","program","resident","residents","stay","weekly","monthly","expenses"]);

/* Whether the PERSON asks for no-cost help. "smoke-free", "drug-free",
   a free consultation, and negations ("does not have to be free") do not
   count; any other "free", "no cost" or "free of charge" does. */
/* A negation counts only when it governs the cost statement itself:
   "does not have to be free", "no need for it to be free", "isnt free".
   It never reaches across another verb or request, so "i dont drink and
   need free sober living" still asks for free help. */
const NEGATED_COST_STATEMENT = /\b(?:not|dont|doesnt|does not|do not|didnt|did not|isnt|is not|arent|are not|wont|will not|neednt|need not|no need for (?:it|that|this))(?: (?:have|has|need|needs|got|gotta))?(?: it)?(?: to)?(?: be)?(?: (?:totally|completely|necessarily|all))? free\b/g;

function requestsNoCost(rawQuery) {
  let text = normalizeClauseText(rawQuery).replace(NON_COST_FREE, " ").replace(CONSULTATION_FREE, " ");
  text = text.replace(NEGATED_COST_STATEMENT, " ");
  return /\bfree\b|\bno cost\b|\bfree of charge\b/.test(text);
}

/* Positions (word indexes in normalized text) of negated cost statements,
   so exactly those words — and no other "no" or "need" — are not searched. */
function negatedCostWordIndexes(normalized) {
  const indexes = new Set();
  const pattern = new RegExp(NEGATED_COST_STATEMENT.source, "g");
  let match;
  while ((match = pattern.exec(normalized))) {
    const start = (normalized.slice(0, match.index).match(/[a-z0-9]+/g) || []).length;
    const length = (match[0].match(/[a-z0-9]+/g) || []).length;
    for (let i = start; i < start + length; i++) indexes.add(i);
  }
  return indexes;
}

/* Documented cost of the REQUESTED service, clause by clause:
   - Free evidence: "free" directly before a head word of the requested
     service ("Free housing"; the phrase ends at for/and/with…), or "<head>
     is free" / "<head> … at no cost". "No free housing" is not free.
     Fare-free, tuition-free and free-of-charge describe the whole offer.
   - Paid evidence: an explicit charge ("$100/week", "rent is $120", "pay
     equal share", self-pay) in a clause about the service or the stay, or
     "not free" with no other subject. A charge for something else ("Meals
     cost $10/day") is not about the service. A dollar figure alone is not a
     charge ("Income under $60k" is a limit).
   Free and paid together, or neither, is unknown — never treated as free. */
function documentedCost(resource, analysis) {
  const heads = (analysis && (analysis.serviceHeads || analysis.requestedWords)) || new Set();
  const isHead = word => heads.has(word) || heads.has(stemSearchWord(word));
  const clean = text => normalizeClauseText(text).replace(NON_COST_FREE, " ").replace(CONSULTATION_FREE, " ")
    .replace(/\s+/g, " ").split(" | ").map(clause => clause.trim().split(" ").filter(Boolean));

  let free = false;
  let paid = false;
  const offerClauses = clean(`${resource.name || ""} | ${(resource.tags || []).join(" | ")} | ${resource.description || ""}`);
  const termClauses = clean(`${resource.description || ""} | ${resource.requirements || ""}`);

  offerClauses.forEach(words => {
    const text = words.join(" ");
    if (/\b(?:tuition free|fare free|cost free|fee free)\b/.test(text)) free = true;
    words.forEach((word, i) => {
      const before = words[i - 1];
      if (word === "free" && !["no","not","never","isnt","arent"].includes(before) && !COPULAS.has(before)) {
        /* attributive: "free <…> housing" */
        for (let j = i + 1; j <= i + 3 && j < words.length && !COST_PHRASE_STOPS.has(words[j]); j++) if (isHead(words[j])) free = true;
      } else if ((word === "free" && COPULAS.has(before)) || (word === "cost" && before === "no") || (word === "charge" && before === "of" && words[i - 2] === "free")) {
        /* predicative: "<housing> is free", "<housing> is provided at no cost"
           (the "at" of "at no cost" belongs to the cost phrase, not a boundary) */
        let start = i - 2;
        if (word === "cost" && words[start] === "at") start--;
        for (let j = start; j >= start - 5 && j >= 0 && !COST_PHRASE_STOPS.has(words[j]); j--) if (isHead(words[j])) free = true;
      }
    });
  });

  termClauses.forEach(words => {
    const text = words.join(" ");
    /* "not free" with no other subject in the clause ("Not free; residents share expenses") */
    const negated = /\b(?:not|isnt|arent|no longer|never) free\b/.exec(text);
    if (negated) {
      const subject = words.slice(0, words.indexOf("free")).filter(word => !["not","isnt","arent","no","longer","never","is","are","it","its","this","the","a"].includes(word));
      if (!subject.length || subject.some(isHead)) paid = true;
    }
  });

  /* Explicit charges, per clause of the original text (keeps "$" and "/"). */
  `${resource.description || ""}\n${resource.requirements || ""}`.toLowerCase()
    .split(/[!?;\n]+|\.(?=\s|$)/).forEach(raw => {
      if (!EXPLICIT_CHARGE.test(raw)) return;
      const words = normalizeSearchText(raw).split(" ");
      if (words.some(word => isHead(word) || STAY_CHARGE_WORDS.has(word))) paid = true;
      else if (!words.some(word => OTHER_PRICED_ITEMS.has(word))) paid = true;
    });

  return free && !paid ? "free" : paid && !free ? "paid" : "unknown";
}

/* Minimum need strength for a category to keep its own results floor; one
   ordinary service word ("bills" 1.7, "shelter" 2.5) is enough. */
const SEARCH_NEED_STRENGTH = 1.5;

/* Eligibility limited to a group, as the listing itself states it: "Women
   and children only", "65+ and homebound", "eligible students", "must be
   pregnant". "Vigo County residents" or "income limits" are not a group. */
const RESTRICTED_AUDIENCE = new RegExp([
  String.raw`\b(?:women|men|mothers|fathers|children|kids|students|seniors|veterans|members)(?: and (?:women|men|children|kids))? only\b`,
  String.raw`\b\d{2} ?\+`,
  String.raw`\bhomebound\b`,
  String.raw`\beligible students\b`,
  String.raw`\byour child[’']?s school\b`,
  String.raw`\bmust be (?:pregnant|enrolled|a student|a member|referred)\b`
].join("|"));
function restrictedAudience(resource) {
  return RESTRICTED_AUDIENCE.test(`${resource.requirements || ""} ${resource.description || ""}`.toLowerCase());
}
/* Words that name a group, so a group-limited listing may be what was asked for. */
const SEARCH_GROUP_WORDS = /\b(?:women|woman|womens|men|man|mens|mother|mothers|mom|moms|father|dad|child|children|kid|kids|baby|babies|student|students|school|senior|seniors|elderly|veteran|veterans|pregnant|homebound|grandma|grandpa|family|families)\b/;

function searchResources(resources, rawQuery, language = "en") {
  const analysis = analyzeSearchQuery(rawQuery, language, resources);
  if (!analysis.strongTokens.length && !analysis.phraseConcepts.length) {
    /* An emergency with no other searchable words ("he is not breathing")
       still shows its guidance with the results, never the "enter a
       service" prompt. */
    if (analysis.urgentEmergencies.length) return {status:"ok", results:[], analysis, scored:[]};
    return {status:"empty-meaningful", results:[], analysis, scored:[]};
  }

  /* First pass: which categories have at least one listing whose own text
     matches. Second pass scores with that knowledge. */
  const firstPass = (resources || []).map(resource => scoreResourceForQuery(resource, analysis));
  const contentCategories = new Set(firstPass.filter(item => item.hasContent).map(item => item.resource.category));
  const anySpecific = firstPass.some(item => item.specific);
  const scored = (resources || [])
    .map(resource => scoreResourceForQuery(resource, analysis, {contentCategories, anySpecific}))
    .filter(item => item.score > 0)
    .sort((a,b) => b.score - a.score || String(a.resource.name || "").localeCompare(String(b.resource.name || "")));

  if (!scored.length) return {status:"ok", results:[], analysis, scored:[]};

  const maxScore = scored[0].score;
  let relativeFloor = analysis.hasNarrowPhrase ? 0.46 : 0.25;
  if (!Object.keys(analysis.categoryScores).length) relativeFloor = 0.35;
  const absoluteFloor = analysis.hasNarrowPhrase ? 14 : 6;
  const threshold = Math.max(absoluteFloor, maxScore * relativeFloor);

  /* Each explicitly requested need is judged against the best result for
     that need, so "someone overdosed and need food and shelter" keeps food
     and shelter results instead of losing them under the overdose scores. */
  const needMax = {};
  scored.forEach(item => {
    const category = item.resource.category;
    if ((analysis.needScores[category] || 0) >= SEARCH_NEED_STRENGTH && !(category in needMax)) needMax[category] = item.score;
  });
  const thresholdFor = item => {
    const category = item.resource.category;
    return category in needMax ? Math.max(absoluteFloor, needMax[category] * relativeFloor) : threshold;
  };

  const urgentKinds = analysis.urgentEmergencies || [];
  const evidenceFor = item => urgentKinds.findIndex(kind => emergencyEvidence(item.resource, kind));
  const anyContent = scored.some(item => item.hasContent);
  /* Required concepts ("somewhere to sleep tonight"): their category keeps
     only listings that offer the concept; their fallback help line stays. */
  const requiredConcepts = analysis.phraseConcepts.filter(concept => concept.required);
  const requiredCategories = new Set(requiredConcepts.flatMap(concept => Object.keys(concept.categories)));
  /* Whether listings in the requested categories match the request itself. */
  const requestedContent = scored.some(item => item.hasContent && analysis.categoryScores[item.resource.category]);

  const filtered = scored.filter(item => {
    /* An exact organization name, or a documented affiliation, is always shown. */
    if (item.organization) return true;
    const category = item.resource.category;
    if (requiredConcepts.length) {
      if (item.requiredHit || item.fallbackHit) return true;
      if (requiredCategories.has(category)) return false;
    }
    /* Listings that match only through generic words ("lost", "classes",
       "take") are never results: a query made only of generic words gets
       the "tell us what you need" prompt instead. */
    if (item.weakOnly) return false;
    /* A listing outside the requested service that only mentions it in
       passing ("meals provided" to residents of a sober living home) does
       not offer it, when listings for the service itself exist. */
    if (requestedContent && !analysis.categoryScores[category] && !item.specific && !item.narrowConceptHit && evidenceFor(item) < 0 &&
        !((analysis.qualifierTokens || []).length && item.beneficiaryFit)) return false;
    /* A listing in the requested category that matches only by category is
       kept when the person is browsing that category broadly, but not when
       they named a sub-service that other listings there describe. */
    if (!item.hasContent && item.categoryIntent && contentCategories.has(category) && !analysis.broadCategories.has(category)) return false;
    /* The same narrow service in another category (gas cards offered by an
       employment program) and emergency-specific listings stay in. */
    if ((item.narrowConceptHit || item.rareSpecific) && item.score >= absoluteFloor) return true;
    if (evidenceFor(item) >= 0 && item.score >= absoluteFloor) return true;
    return item.score >= thresholdFor(item);
  });

  /* Ordering, in explicit groups; within each group, relevance order.
     1. Listings with acute evidence for a detected emergency, in guidance
        order (overdose, then mental-health crisis). Cost never moves
        anything above these.
     2. Exact organization names, then documented affiliations (longest
        matching name first) — a named organization beats generic intent.
     3. When the query states two or more separate needs ("ride to the food
        pantry"): listings serving all of them, then the best listing for
        each need not yet shown, so every need appears early.
     4. Everything else. Listings that fit a stated beneficiary ("for my
        kids") come first; when no-cost help is asked for, documented-free
        listings come before unknown and paid ones within the same tier of
        relevance (specific matches before category-only matches). */
  const needs = Object.entries(analysis.needScores || {})
    .filter(([, strength]) => strength >= SEARCH_NEED_STRENGTH).map(([category]) => category);
  let pool = filtered.slice();
  const take = predicate => {
    const picked = pool.filter(predicate);
    pool = pool.filter(item => !predicate(item));
    return picked;
  };
  const accepted = [];
  urgentKinds.forEach((kind, k) => accepted.push(...take(item => evidenceFor(item) === k)));
  accepted.push(...take(item => item.organization > 0).sort((a, b) => b.organization - a.organization || filtered.indexOf(a) - filtered.indexOf(b)));
  if (needs.length >= 2) {
    accepted.push(...take(item => needs.every(need => item.coveredNeeds.has(need))));
    const bests = needs
      .filter(need => !accepted.some(item => item.coveredNeeds.has(need)))
      .map(need => pool.find(item => item.coveredNeeds.has(need)))
      .filter((item, i, list) => item && list.indexOf(item) === i)
      .sort((a, b) => filtered.indexOf(a) - filtered.indexOf(b));
    accepted.push(...take(item => bests.includes(item)).sort((a, b) => filtered.indexOf(a) - filtered.indexOf(b)));
  }
  const costRank = {free:0, unknown:1, paid:2};
  const fitting = (analysis.qualifierTokens || []).length > 0;
  /* For basic needs (somewhere to sleep tonight, food), listings open to
     anyone come before those limited to a group, unless the person named a
     group ("for my kids", "women's shelter"). Eligibility is still shown on
     every card; nothing is removed for it. */
  const openFirst = !fitting && !SEARCH_GROUP_WORDS.test(analysis.normalized) &&
    (requiredConcepts.some(concept => concept.openFirst) || needs.includes("food"));
  accepted.push(...pool.map((item, index) => ({item, index,
    fit: fitting && item.beneficiaryFit ? 0 : 1,
    fallback: item.fallbackHit && !item.requiredHit ? 1 : 0,
    /* Not when the request names that very program ("free and reduced lunch"). */
    open: openFirst && !item.narrowConceptHit && restrictedAudience(item.resource) ? 1 : 0,
    tier: analysis.wantsFree ? (item.specific ? 0 : 1) : 0,
    cost: analysis.wantsFree ? costRank[documentedCost(item.resource, analysis)] : 0
  })).sort((a, b) => a.fit - b.fit || a.fallback - b.fallback || a.open - b.open || a.tier - b.tier || a.cost - b.cost || a.index - b.index).map(entry => entry.item));

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
  /* Only http(s) addresses become links; escaping alone would still let a
     javascript: or data: URL through if listings are ever submitted. */
  const website = /^https?:\/\//i.test(String(r.website || "").trim()) ? String(r.website).trim() : "";
  const btnWeb  = website
    ? `<a href="${esc(website)}" target="_blank" rel="noopener" class="rc-btn rc-btn-secondary">${SVG.globe} Website<span class="visually-hidden"> for ${esc(r.name)} (opens in a new tab)</span></a>` : "";
  /* A listing can name what its address is ("Directions to transit office")
     when that address is not where the service itself is used. */
  const mapLabel = r.directionsLabel
    ? `${esc(r.directionsLabel)}<span class="visually-hidden">, ${esc(r.name)} (opens in a new tab)</span>`
    : `Directions<span class="visually-hidden"> to ${esc(r.name)} (opens in a new tab)</span>`;
  const btnMap  = noConf
    ? `<a href="https://maps.google.com/?q=${encodeURIComponent(r.address)}" target="_blank" rel="noopener" class="rc-btn rc-btn-secondary">${SVG.map} ${mapLabel}</a>` : "";

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

  /* General emergencies reuse the site's existing wording verbatim: the
     crisis section's "Emergency services" / "Call 911" and the footer's
     "For emergencies, call 911." No new instructions are added here. */
  if (kind === "emergency") {
    return `<article class="resource-card" aria-labelledby="generalEmergencyTitle">
      <div class="rc-top-bar bar-crisis" aria-hidden="true"></div>
      <div class="rc-body">
        <div class="rc-header">
          <h3 class="rc-name" id="generalEmergencyTitle">Emergency services</h3>
          <span class="rc-badge badge-crisis">Emergency</span>
        </div>
        <p class="rc-desc">For emergencies, call 911.</p>
      </div>
      <div class="rc-footer"><div class="rc-actions">
        <a href="tel:911" class="rc-btn rc-btn-primary">${SVG.phone} Call 911</a>
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

/* Shortcuts beside the results. The safety routes are optional ways to
   narrow a search; results are already shown, and nothing here claims an
   emergency. "Current shelter availability" / "Call 211" reuse the crisis
   section's wording. The bus panel links to the bus page's routes and
   schedules and makes no claim about live departures. */
const ROUTES_ONLY_TEXT = "Choose the kind of help you need.";
const SAFETY_ROUTES = [
  {label:"Shelter or somewhere to stay", query:"shelter"},
  {label:"Help with abuse or an unsafe home", query:"abuse or domestic violence"}
];
function renderSearchRoutes(routes, hasListings) {
  let html = "";
  if (routes.safety) {
    const intro = routes.safety === "place" && hasListings
      ? "Shelter listings are shown below. You can also narrow your search:"
      : ROUTES_ONLY_TEXT;
    html += `<section class="search-routes" aria-labelledby="safetyRoutesTitle">
      <h3 class="search-routes-title" id="safetyRoutesTitle">Looking for somewhere safe?</h3>
      <p class="search-routes-text">${intro}</p>
      <div class="search-routes-actions">
        ${SAFETY_ROUTES.map(route => `<button type="button" class="route-btn" data-route-query="${esc(route.query)}">${esc(route.label)}</button>`).join("")}
        <a class="route-btn" href="#categories">Browse all resources</a>
      </div>
      <p class="search-routes-note">Current shelter availability: <a href="tel:211">Call 211</a></p>
    </section>`;
  }
  if (routes.bus) {
    html += `<section class="search-routes" aria-labelledby="busRoutesTitle">
      <h3 class="search-routes-title" id="busRoutesTitle">Bus Routes &amp; Schedules</h3>
      <p class="search-routes-text">Terre Haute Transit routes, hours of service, and how to ride.${hasListings ? " Directory listings for other transportation help are below." : ""}</p>
      <div class="search-routes-actions">
        <a class="route-btn route-btn-primary" href="/bus">${SVG.bus} See bus routes and schedules</a>
      </div>
    </section>`;
  }
  return html;
}

const SEARCH_GUIDANCE_TEXT = "Try entering the service you need, for example food, shelter, doctor, rent, job, recovery, or transportation.";
const GUIDANCE_NO_LISTINGS_TEXT = "No additional directory listings matched your search.";
const EMERGENCY_LINK_HTML =`<p>If you need help right now, see the <a href="#crisis">emergency help lines</a>.</p>`;

/* Search state. A category narrows the active query rather than replacing
   it, urgent guidance follows the query whatever category is chosen, and
   "Back to all" clears both. */
const searchState = {query:"", category:null};

/* The active-category bar lives in the results header. It is created on
   first use so the page markup stays unchanged. */
function filterBar() {
  let bar = document.getElementById("resultsFilter");
  if (bar) return bar;
  const count = document.getElementById("resultsCount");
  if (!count) return null;
  bar = document.createElement("div");
  bar.className = "results-filter";
  bar.id = "resultsFilter";
  bar.hidden = true;
  bar.innerHTML = `<span id="resultsFilterText"></span><button type="button" class="clear-btn results-filter-reset" id="resultsFilterReset">Show all categories</button>`;
  count.insertAdjacentElement("afterend", bar);
  bar.querySelector("#resultsFilterReset").addEventListener("click", showAllCategories);
  return bar;
}

function updateFilterBar(label) {
  const bar = filterBar();
  if (!bar) return;
  bar.hidden = !label;
  const text = bar.querySelector("#resultsFilterText");
  text.textContent = "";
  if (!label) return;
  const strong = document.createElement("strong");
  strong.textContent = label;
  text.append("Showing only ", strong, " results for this search.");
}

function showResults(items, title, options = {}) {
  const sec  = document.getElementById("resultsSection");
  const grid = document.getElementById("resultsGrid");
  const ttl  = document.getElementById("resultsTitle");
  const cnt  = document.getElementById("resultsCount");
  const urgentKinds = options.urgentEmergencies || (options.urgentEmergency ? [options.urgentEmergency] : []);

  const countText = items.length
    ? `${items.length} resource${items.length !== 1 ? "s" : ""} found`
    : "No resources found";

  ttl.textContent = title;
  cnt.textContent = items.length ? countText : "";
  updateFilterBar(options.filterLabel);

  /* A11Y (4.1.3): reveal the region BEFORE populating it.
     Previously innerHTML was set while the section was display:none, so the
     live region was outside the accessibility tree at the moment it changed
     and the update was not reliably announced. */
  sec.hidden = false;
  sec.style.display = "block";

  const routes = options.routes || {};
  const routeKinds = options.guidance ? [] : [routes.safety && "safety", routes.bus && "bus"].filter(Boolean);

  window.requestAnimationFrame(() => {
    const urgentCards = urgentKinds.map(renderUrgentGuidance).join("");
    const routePanels = routeKinds.length ? renderSearchRoutes(routes, items.length > 0) : "";
    let resultCards;
    if (options.guidance) {
      resultCards = `<div class="empty-state"><h3>Tell us what you need</h3><p>${esc(SEARCH_GUIDANCE_TEXT)}</p>${EMERGENCY_LINK_HTML}</div>`;
    } else if (items.length) {
      resultCards = items.map(renderCard).join("");
    } else if (urgentKinds.length) {
      /* Guidance is shown above; "No results found" would read as if no
         help were available. */
      const filterHint = options.filterLabel
        ? `<p>No ${esc(options.filterLabel)} resources match this search. Choose “Show all categories” above, or try a different word.</p>` : "";
      resultCards = `<div class="empty-state"><h3>${GUIDANCE_NO_LISTINGS_TEXT}</h3>${filterHint}</div>`;
    } else if (routeKinds.length) {
      /* Only clarification shortcuts: they are the next step, so there is no
         "no results" message, unless a category filter hides listings. */
      resultCards = options.filterLabel
        ? `<div class="empty-state"><p>No ${esc(options.filterLabel)} resources match this search. Choose “Show all categories” above, or try a different word.</p></div>` : "";
    } else if (options.filterLabel) {
      resultCards = `<div class="empty-state"><h3>No results found</h3><p>No ${esc(options.filterLabel)} resources match this search. Choose “Show all categories” above, or try a different word.</p>${EMERGENCY_LINK_HTML}</div>`;
    } else {
      resultCards = `<div class="empty-state"><h3>No results found</h3><p>Try a different word, or <a href="#categories">browse all categories</a>.</p>${EMERGENCY_LINK_HTML}</div>`;
    }
    grid.innerHTML = urgentCards + routePanels + resultCards;

    const urgentAnnouncement = urgentKinds.length
      ? " Immediate crisis guidance is shown first."
      : "";
    const routeAnnouncement = (routeKinds.includes("safety") ? " Options for finding somewhere safe are shown." : "") +
      (routeKinds.includes("bus") ? " A link to bus routes and schedules is shown." : "");
    const filterAnnouncement = options.filterLabel ? ` in ${options.filterLabel}` : "";
    if (options.guidance) announce(SEARCH_GUIDANCE_TEXT);
    else if (urgentKinds.length && !items.length) announce(`Immediate crisis guidance is shown for ${title}${filterAnnouncement}.${routeAnnouncement} ${GUIDANCE_NO_LISTINGS_TEXT}`);
    else if (routeKinds.length && !items.length) announce(`${routeAnnouncement.trim()} ${ROUTES_ONLY_TEXT}`);
    else announce(`${countText} for ${title}${filterAnnouncement}.${urgentAnnouncement}${routeAnnouncement}`);

    /* A11Y (2.3.3): honour reduced-motion for programmatic scrolling.
       Focus is deliberately NOT moved here — the status region carries the
       announcement. #resultsTitle has tabindex="-1" so focus management can
       be enabled later if manual testing shows it helps. */
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    window.setTimeout(() => sec.scrollIntoView({behavior, block:"start"}), 60);
  });
}

/* Show the active query, narrowed to the active category if there is one. */
function renderSearch() {
  const search = searchResources(RESOURCES, searchState.query, searchLanguage());
  const meta = searchState.category ? (CATEGORY_META[searchState.category] || {label:searchState.category}) : null;
  const items = meta ? search.results.filter(r => r.category === searchState.category) : search.results;
  showResults(items, `"${searchState.query}"`, {
    urgentEmergencies: search.analysis.urgentEmergencies,
    routes: search.analysis.routes,
    filterLabel: meta ? meta.label : ""
  });
}

function filterCategory(cat) {
  searchState.category = cat;
  if (searchState.query) { renderSearch(); return; }
  const m = CATEGORY_META[cat] || {label:cat};
  showResults(RESOURCES.filter(r => r.category === cat), m.label);
}

/* Widen the active search to every category; the query and its guidance stay. */
function showAllCategories() {
  searchState.category = null;
  if (!searchState.query) return;
  renderSearch();
  /* A11Y (2.4.3): the button just activated is hidden; keep focus in the
     results rather than letting it fall back to the top of the page. */
  window.requestAnimationFrame(() => document.getElementById("resultsTitle").focus());
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
    searchState.query = "";
    hideResultsForSearchInstruction();
    announce("Enter a need such as food, shelter, doctor, rent, job, recovery, or transportation.");
    input.focus();
    return;
  }

  const search = searchResources(RESOURCES, rawQuery, searchLanguage());
  if (search.status === "empty-meaningful") {
    /* Only filler words ("help", "please"): say so visibly, not just to
       screen readers. */
    searchState.query = "";
    showResults([], `"${rawQuery}"`, {guidance:true});
    return;
  }

  searchState.query = rawQuery;
  renderSearch();
}

function clearResults() {
  const sec = document.getElementById("resultsSection");
  sec.style.display = "none";
  sec.hidden = true;
  searchState.query = "";
  searchState.category = null;
  updateFilterBar("");
  document.getElementById("resultsGrid").innerHTML = "";
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

  /* A safety shortcut runs its search across all categories, shown in the
     search box like any other search. The panel it sat in is replaced, so
     focus moves to the results heading (2.4.3). */
  const grid = document.getElementById("resultsGrid");
  if (grid) grid.addEventListener("click", e => {
    const route = e.target.closest("[data-route-query]");
    if (!route || !input) return;
    input.value = route.dataset.routeQuery;
    searchState.category = null;
    runSearch();
    window.requestAnimationFrame(() => document.getElementById("resultsTitle").focus());
  });

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
