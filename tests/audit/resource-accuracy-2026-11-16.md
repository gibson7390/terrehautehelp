# Resource accuracy audit: Patch 1 (2026-11-16, final corrections and independent-review corrections 2026-11-17)

Development record for the urgent accuracy patch on branch `fix/urgent-resource-accuracy-2026-11`, made from release `91c0e111b9bd5bdc46d7544824d71a75a86a8b43`. This file is under `tests/`, which is not part of the deployed site.

## How to read this record

**Verification methods used**

- **Official page read:** the page on the organization's or agency's own website was fetched and its text read on 2026-11-16.
- **Search extract:** a search engine's summary of an official page. The page itself was not read. This is weaker evidence and is always labelled.
- **Not verified:** no usable source was found, or the source could not be read.

**What was not done**

- No provider was contacted by phone, email or in person. Every entry that needs direct contact says so.
- `vigocounty.in.gov` and `terrehaute.in.gov` refused automated requests (HTTP 403 and 404), so no county or city page was read directly.
- The external Perplexity audit (37 listings) was not found in the project folder, Desktop, Downloads or Documents. Its findings were not reviewed. Only the priority records named in the assignment were examined.
- A page that loads is not proof that its content is current. Dated content is noted where it was seen.

**Status vocabulary**

- **Withheld:** removed from `resources.js`, so no search, category or crisis path can reach it. The original record is preserved at the end of this file.
- **Corrected:** fields replaced with information read from an official source.
- **Partially verified:** some displayed fields are confirmed; the uncertain ones are named.
- **Flagged:** left unchanged; needs owner or provider confirmation.

## Summary

| Result | Count | Listings |
|---|---|---|
| Withheld | 15 | health-002, health-004, recovery-009, crisis-004, housing-004, employment-006, transport-004, children-003, children-008, financial-002, employment-008, children-002, legal-004, immigration-001, and recovery-010 (Club Soda, withheld 2026-11-17 after independent review; section B) |
| Fully verified (dated 2026-11) | 8 | food-002, legal-001, legal-011, immigration-004, financial-005, financial-008, financial-012, financial-013 |
| Corrected, partially verified (date kept) | 10 | food-004, housing-003, financial-001, financial-011, education-002, education-003, children-007, other-003, other-004, financial-015 (Lost Creek; final search corrections) |
| Narrowed to a qualified phone contact, verification date withdrawn | 1 | financial-014 (Honey Creek: listed address is a fire station; address, hours and specific claims removed; phone qualified as unconfirmed; no verification label; section C) |
| Added (dated 2026-11) | 1 | recovery-016, statewide naloxone map and kit requests (section H) |

Listings in `resources.js`: 134 before, 120 after (15 withheld, 1 added). The other 94 listings were not re-verified in this patch; most still carry `lastVerified` 2026-04.

The first report (2026-11-16) dated 14 listings 2026-11. On review, 6 of them had a displayed field that was not confirmed, and their dates were returned to the original value. See section F.

## A. Shared finding: CAPWI and WICAA are different agencies

- **Community Action Program, Inc. of Western Indiana (CAPWI)** is based at 418 Washington Street, Covington, phone (765) 793-4881. Counties served: "Benton, Fountain, Montgomery, Parke, Vermillion, and Warren". Vigo County is not listed.
  - Source: https://incaa.memberclicks.net/capwi (Indiana Community Action Association member page). Official page read.
- **Western Indiana Community Action Agency, Inc. (WICAA)** is at 705 S. 5th Street, Terre Haute, IN 47807, phone (812) 232-1264. Counties served: "Clay, Putnam, and Vigo".
  - Sources: https://incaa.memberclicks.net/wicaa and https://www.wicaa.org/ (same content as https://wicaastaff.squarespace.com/). Official pages read.
- **Programs WICAA lists:** Energy Assistance, Family Development, Head Start and Early Head Start, Medical Assistance, Senior Programs (Foster Grandparent, RSVP), Weatherization, and WIC.
- **Not found on the WICAA pages read:** emergency rent assistance, eviction prevention, SNAP application help, TANF, childcare vouchers, childcare resource and referral, credit counseling, transportation-to-work vouchers, a volunteer driver program, or a foster care support group. The site's About pages were not read, so "not found" is not proof of absence.
- **Consequence:** eleven listings used WICAA's address and phone under CAPWI's name, and several linked to `capwi.org`. Each was handled separately below. No listing was simply renamed.
- **Dated content:** the WICAA footer reads "Copyright © 2023". Its Energy Assistance page still describes the 2025–26 season and says "The next heating season will begin October 1, 2026."

## B. Withheld listings

Each was withheld because a material claim could not be substantiated. None was withheld only because a website failed to load.

### recovery-010: Club Soda Sober Living — Co-ed (withheld 2026-11-17)
- **Disputed:** that the advertised program (co-ed 12-step sober living at 1330 Lafayette Ave, 812-841-6319, 3–12 month stays, meals and transportation to jobs) is operating.
- **Found (WTHI-TV, official news pages read 2026-11-17):**
  - "All Club Soda residents to be out of building by end of day", published Sep. 18, 2026: "All Club Soda residents displaced by an order to vacate will be out of the building by the end of the day." "Club Soda residents were required to vacate due to a city order." https://www.wthitv.com/2026/09/18/all-club-soda-residents-be-out-building-by-end-day/
  - "Dozens of displaced Club Soda residents re-housed as officials navigate court-ordered placements", published Sep. 16, 2026: "In total, 27 individuals were relocated after social services from the Vigo County Health Department partnered with Mental Health America"; it refers to "the facility's closure"; the prosecutor: "Definitely losing Club Soda is gonna have an impact on Vigo County and Terre Haute." https://www.wthitv.com/2026/09/16/dozens-displaced-club-soda-residents-re-housed-officials-navigate-court-ordered-placements/
  - Neither article names 1330 Lafayette Ave, gives the reason for the order, or says whether the closure is permanent, temporary or may end.
  - Search extract only (page not read): a NewsBreak item, "City of Terre Haute orders closing of Club Soda", is summarized as a city memo declaring the buildings unsafe, mainly because water had been shut off, with residents to leave by September 21, 2026. https://www.newsbreak.com/news/4888952036536-city-of-terre-haute-orders-closing-of-club-soda
  - A web search on 2026-11-17 for reopening found no report of reopening. A findhelp.org entry reviewed June 2026 predates the closure.
- **Decision:** withheld. The September 2026 closure under a city order is supported. Permanent closure is **not** conclusively established; the listing can return if reopening at a verified location with working contact information is documented.
- **Effect:** no search, category or crisis path reaches it (regression test). Searches that listed it ("sober living", "co-ed sober living", "recovery housing", "Club Soda", "somewhere to live while staying sober") now list the remaining recovery residences; Next Step Residential Recovery (recovery-011) is the remaining co-ed listing and the only residence documenting meals. No other search changed except by dropping it.
- **Original record:** section K.

### health-002: Neighborhood Health Clinic
- **Disputed:** the clinic's existence, 925 Lafayette Ave, 812-235-5600, "Free primary care for uninsured adults. Run by volunteer physicians."
- **Found:** no source of any kind mentions a clinic of this name at this address, and no page lists this phone number. Searches for the name with the address, and for the phone number, returned nothing relevant.
- **Decision:** withheld. No clinic was substituted.
- **Verified alternatives already listed:** Wabash Valley Health Center (health-007) and Mollie Wheat Memorial Clinic (health-009; not re-verified in this patch).
- **Method:** web search, 2026-11-16. Not verified.
- **Provider contact needed:** yes. If the owner knows this clinic, a call to the number would settle it.

### health-004: Centerstone — Behavioral Health
- **Disputed:** a Terre Haute location at 1632 S 3rd St, 812-231-1234.
- **Found:** Centerstone's own Indiana locations pages list 41 locations in 24 Indiana cities. Neither "Terre Haute" nor "Vigo" appears, and neither the address nor the phone number appears.
  - Source: https://centerstone.org/locations/indiana/ (pages 1 to 6). Official pages read.
- **Decision:** withheld. Confirmed inaccurate; there is no verified local replacement.
- **Verified alternative already listed:** Hamilton Center (health-001), 620 Eighth Avenue, (812) 231-8323.
- **Provider contact needed:** no.

### recovery-009: Kathy's Hope Halfway House — Women's Recovery Housing
- **Disputed:** that this residence operates in Terre Haute. The listing had no phone, website or address.
- **Found:** the state's certified recovery residence list ("Recovery Residences as of November 5, 2026") has one entry: "Kathys Hope | Kathy's Hope | 1408 Chicago St, Valparaiso In, IN 46383 | Recovery Residence Level 3 | Active". There is no Terre Haute entry by this name.
  - Source: https://www.in.gov/fssa/dmha/quality-assurance-quality-improvement/mental-health-and-addiction-providers. Official page read.
- **Decision:** withheld. The evidence indicates a Valparaiso provider was attributed to Terre Haute. No phone number or address was added.
- **Remaining uncertainty:** an uncertified residence of the same name in Terre Haute cannot be ruled out, but nothing documents one.

### crisis-004: Terre Haute CARES — Overdose & Recovery
- **Disputed:** the program's existence, 812-917-0100, "naloxone distribution", "recovery navigation", Mon–Fri 9am–5pm.
- **Found:** no source confirms a Terre Haute program of this name or this phone number. Similarly named programs exist elsewhere (the statewide "IN CAREs ECHO"; "Clark County CARES") and are not this listing.
- **Decision:** withheld. A listing that tells people where to get naloxone must be verifiable.
- **Effect on search:** the 911 overdose guidance card is unchanged and still appears first. Searches for "naloxone" or "narcan" returned no listing until recovery-016 was added on 2026-11-17 (section H).
- **Verified alternatives already listed:** WIN Recovery (recovery-014), an opioid treatment program at 88 Wabash Court, 812-231-8484 (https://www.winrecovery.org/contact, official page read), and Hamilton Center (health-001).
- **Candidates for a verified naloxone listing in Patch 2 (not added now):**
  - Hamilton Center reported a free, no-questions-asked "NaloxBox" outside WIN Recovery in an article dated 05/06/2022 (https://www.hamiltoncenter.org/?p=20213). Too old to state as current.
  - Search results describe a free naloxone box installed in August 2026 at Indiana Center for Recovery, 135 E Hospital Lane, and distribution by Wabash Valley Recovery Center. Search extract only.
- **Provider contact needed:** yes, before any naloxone source is listed.

### housing-004: CAPWI — Emergency Rental & Utility Assistance
- **Disputed:** agency name, `capwi.org`, and "One-time emergency help to prevent eviction or utility shutoff."
- **Found:** see section A. The address and phone are WICAA's. WICAA's pages do not describe rent assistance or eviction prevention. Its utility help is the seasonal Energy Assistance Program, listed separately as financial-001.
- **Decision:** withheld.
- **Verified alternative already listed:** Harrison Township Trustee (financial-013), which documents rent and utility help.
- **Provider contact needed:** yes. Ask WICAA at (812) 232-1264 whether it offers any rent or eviction-prevention assistance.

### employment-006: Transportation to Work Vouchers — CAPWI
- **Disputed:** "Gas cards or bus passes for new employees."
- **Found:** not described on any WICAA page read. See section A.
- **Decision:** withheld. Provider contact needed: yes.

### transport-004: Volunteer Driver Program — CAPWI
- **Disputed:** "Free rides to food pantries, clinics, and jobs."
- **Found:** not described on any WICAA page read. WICAA's senior programs are Foster Grandparent and RSVP.
- **Decision:** withheld. Provider contact needed: yes.

### children-003: Foster Care Support Group — CAPWI
- **Disputed:** "Support and resources for foster families."
- **Found:** not described on any WICAA page read. WICAA's "Foster Grandparent Program" is a volunteer program for people 55 and older.
- **Decision:** withheld. Provider contact needed: yes.

### children-008: Childcare Resource & Referral — CAPWI
- **Disputed:** "Help finding licensed daycare providers."
- **Found:** not described on any WICAA page read. The state page that should name the child care resource and referral agency for Vigo County returned HTTP 404, so the real operator was not identified.
- **Decision:** withheld. The state's Child Care Support Line, 1-800-299-1627, is given on the CCDF pages cited under education-003.
- **Provider contact needed:** yes.

### financial-002: Vigo County Township Trustee — Emergency Cash
- **Disputed:** an office of this name at 1440 S 3rd St, 812-462-3205, giving "Emergency Cash".
- **Found:** township assistance is given by each township's trustee, not by a county-wide office. The Harrison Township Trustee is at 721 Elm Street and "issues vouchers, never cash". No source places a trustee office at 1440 S 3rd St or uses this phone number.
  - Source: https://harrisontwptrustee.com/ and its Contact and Assistance pages. Official pages read.
- **Decision:** withheld as an inaccurate duplicate of financial-013, -014 and -015.
- **Remaining uncertainty:** the county's list of all township trustees could not be read (HTTP 403). Honey Creek (financial-014) and Lost Creek (financial-015) were not re-verified.

### employment-008: ID Recovery for Reentry — BMV Help Desk
- **Disputed:** a "BMV Help Desk" at "Vigo County BMV, 1440 S 3rd St", 812-462-3245 (the same number the veterans listing used).
- **Found:** nothing documents this service, address or number.
- **Decision:** withheld.
- **Verified alternatives already listed:** other-003 (state ID), other-004 (birth certificate), other-005 (Social Security card).

### children-002: DCFS / DCS Navigation Help
- **Disputed:** "Vigo County DCS Office, 1440 S 3rd St", 812-462-3200.
- **Found:** the state lists the Vigo County DCS office at "2901 Wabash Avenue / Suite 100 / Terre Haute, IN 47803", "(812) 234-0100", "Office Hours: 8AM-4:30PM". "DCFS" is not Indiana's agency name.
  - Source: https://secure.in.gov/dcs/overview/contact-us/local-dcs-offices/vigo. Official page read.
- **Decision:** withheld as an inaccurate duplicate. children-009 already carries the official address and phone and was left unchanged.

### legal-004: Tenant Rights Hotline — Indiana Legal Services
- **Disputed:** a hotline at 812-232-1201.
- **Found:** Indiana Legal Services' pages describe no tenant or eviction hotline. Tenants apply through the general intake line. See legal-001.
- **Decision:** withheld. Tenant and eviction help is now described on legal-001.

### immigration-001: DACA Renewal Help — Indiana Legal Services
- **Disputed:** "Assistance renewing DACA and work permits", 812-232-1201.
- **Found:** the Immigrants' & Language Rights Center page lists naturalization, removal defense, asylum, adjustment of status, family-based cases, U and T visas and VAWA petitions. DACA is not mentioned. Its notice says all applicants "should call 1-844-243-8570".
  - Source: https://www.indianalegalservices.org/ILRC. Official page read.
- **Decision:** withheld. Searches for "DACA" now return no listing.
- **Provider contact needed:** yes, to learn whether the center handles DACA renewals.

## C. Corrected listings

`lastVerified` is `2026-11` only where every displayed field was read on an official page on 2026-11-16 or 2026-11-17. Each entry states whether its date was advanced; section F lists them.

### legal-001: Indiana Legal Services
- **Was:** "Indiana Legal Services — Terre Haute Office", 1515 S 3rd St, 812-232-1201, Mon–Fri 9am–5pm, "Income ≤ 200% FPL", bus "Route 3".
- **Verified:**
  - Eight offices are listed; none is in Terre Haute. The former address and phone do not appear.
  - The Bloomington office (100 S. College Avenue, Suite 232) serves Vigo County.
  - "Apply by phone: Monday – Thursday 10:00a.m. -2:00p.m. EST", 1-844-243-8570. An online application is also offered.
  - "You should hear from us within about 14 days". "Submitting an application does NOT mean that we will accept your case."
  - Eligibility: "within 125% of the Federal Poverty Guidelines"; "In certain circumstances ... within 200%"; under $10,000 in countable assets; some projects use different rules.
  - Case types: family law (orders of protection, divorce, custody, guardianships), landlord/tenant (eviction, substandard conditions), consumer, public benefits, expungement. "ILS does not handle criminal cases".
- **Changed:** name, address (now "Apply by phone or online", so no Directions link), phone, hours, website, description, requirements, bus route (removed), tags, `lastVerified` → 2026-11.
- **Sources:** https://indianalegalservices.org/locations, https://www.indianalegalservices.org/what-we-do, https://www.indianalegalservices.org/applyonline/, https://www.indianalegalservices.org/eligibility-guidelines/. Official pages read.
- **Remaining uncertainty:** the apply page (updated December 2, 2024) says online applications are "Monday – Thursday"; other pages say "24/5". The listing says only that an online application is available.

### legal-011 and immigration-004: Indiana Legal Services immigration help
- **Was:** legal-011 "DACA renewals, naturalization, and deportation defense"; immigration-004 "Connection to experienced immigration attorneys", address "Indiana Legal Services". Both 812-232-1201.
- **Verified:** the Immigrants' & Language Rights Center is "a statewide Center operating out of Indianapolis". Services as listed under immigration-001 above. "An individual may qualify if s/he is a resident of Indiana, is low income, and has an eligible immigration status." Intake: 1-844-243-8570, Monday through Thursday 10am to 2pm.
- **Changed:** name, description, address, phone, hours, website, requirements, tags, `lastVerified` → 2026-11. The DACA claim and tag were removed. "Removal (deportation) defense" keeps the plain word people search for.
- **Source:** https://www.indianalegalservices.org/ILRC. Official page read.
- **Note:** the two records describe the same service in two categories, as the dataset already does for other services.

### financial-001: Energy Assistance Program (LIHEAP) — WICAA
- **Was:** "LIHEAP Utility Assistance — WICAA / CAPWI", 812-232-1264, `capwi.org`, "Help paying winter heating bills (Nov–Feb)."
- **Verified:** WICAA runs the Energy Assistance Program at 705 S. 5th Street, phone (812) 234-3517, hours "9:00 a.m. – 12:00 p.m. 1:00 p.m. – 3:30 p.m." Eligibility: "60% of the State Median Income or 150% of the Federal poverty guidelines whichever is higher." Online application at eap.mylitt.com.
- **Changed:** name, phone, website, description, requirements; hours now "Call for hours". `lastVerified` kept at 2026-04 (see below).
- **Sources:** https://www.wicaa.org/ Energy Assistance page (official page read); https://www.in.gov/ihcda/homeowners-and-renters/low-income-home-energy-assistance-program-liheap/ (official state page read 2026-11-17).
- **State program facts now in the listing:** "EAP is a federally funded program ... also known as the Low-Income Home Energy Assistance Program (LIHEAP)." "The Energy Assistance Program application opens October 1, 2026, at 8:00 AM EST, and closes April 30, 2027, at 5:00 PM EST." "Indiana households that make 60% of the state median income (60 SMI) or less may qualify." Online portal: https://eap.mylitt.com/.
- **Partially verified:** WICAA's page still describes the 2025–26 season and gives hours without days, so the hours were replaced by "Call for hours". The state page's county map could not be read, so the state's own assignment of Vigo County to WICAA is not confirmed; the WICAA and Indiana Community Action Association pages are the evidence that WICAA serves Vigo County.
- **Provider contact needed:** yes, for office hours and walk-in options.

### financial-005: TANF Cash Assistance — Indiana FSSA Division of Family Resources
- **Was:** "TANF Cash Assistance — CAPWI", 705 S 5th St, 812-232-1264.
- **Verified:** the state's local Division of Family Resources offices exist "to assist individuals in applying for SNAP, TANF and health coverage." Vigo County: "2901 Wabash Ave., Suite 200 / Terre Haute, IN 47803 / Office hours are 8 a.m. – 4:30 p.m. local time." "Telephone: 800-403-0864".
- **Changed:** name, address, phone, hours, website, description, requirements, `lastVerified` → 2026-11.
- **Source:** https://www.in.gov/fssa/dfr/ebt-hoosier-works-card/find-my-local-dfr-office/. Official page read.
- **Remaining uncertainty:** the page does not state the days the office is open.

### food-002: SNAP Food Assistance — Indiana FSSA Division of Family Resources
- **Was:** "CAPWI — Food Assistance & SNAP", 705 S 5th St, 812-232-1264, `capwi.org`.
- **Verified and changed:** same source and same office as financial-005. WICAA's pages describe no SNAP application help.

### financial-008: Harrison Township Trustee — Burial & Cremation Assistance
- **Was:** "Burial Assistance — Vigo County Trustee", 1440 S 3rd St, 812-462-3205.
- **Verified:** Harrison Township Trustee, "721 Elm Street / Terre Haute, IN 47807", "812-232-5052", "8:30 AM-4:00 PM, Monday – Friday", walk-in applications until 3 p.m. "Burial and Cremation payments not to exceed the specified amount in the township assistance standards. Please make arrangements prior to coming in the Trustee's Office." "The trustee issues vouchers, never cash."
- **Changed:** name, address, phone, hours, website, description, requirements, tags, `lastVerified` → 2026-11.
- **Source:** https://harrisontwptrustee.com/trustees-office-assistance/ and https://harrisontwptrustee.com/contact-us/. Official pages read.
- **Remaining uncertainty:** burial help in the county's other eleven townships was not verified; the listing tells those residents to contact their own township.

### financial-013: Harrison Township Trustee
- **Was:** "Emergency cash, rent, utilities, and burial assistance", hours Mon–Fri 8:30am–4pm, no website.
- **Verified:** address, phone and hours as above. Assistance: "30 and 60 day arrears on utilities, including electric, gas, sewage, and water", "Rent/Mortgage once every 6 months", food, household necessities, burial and cremation. Intake requires "photo ID, social security card, a copy of any bills you need assistance with and a copy of your current lease." The trustee does not assist "with first month's rent/deposits or Hotel stays."
- **Changed:** description ("emergency cash" replaced, since assistance is by voucher), hours, website, requirements, `lastVerified` → 2026-11. On 2026-11-17 (independent review) the search tag "emergency cash" was also replaced by "township assistance", the program's own name. Contacts, eligibility and date unchanged.
- **Search effect of the tag change:** "emergency cash" and "emergency money" no longer place the trustee near the top (Salvation Army emergency funds lead). "emergency rental assistance" then listed it 7th, below Honey Creek and Lost Creek and two shelters, and the regression check requiring it in the top three failed. Resolved in the final search corrections (section G4): it is now 2nd, and the check was not loosened.

### financial-014 and financial-015: Honey Creek and Lost Creek Township Trustees (final search corrections, 2026-11-17)
- **Was (both, unchanged since 91c0e11):** "Emergency assistance for rent, utilities, and basic needs in … Township", hours "Mon–Fri 8am–4pm", no website, requirements "Proof of residency and need.", tags "trustee", "emergency cash".
- **Lost Creek, official pages read:** https://www.lctrustee.com/ offers "Government Assistance": "People seeking assistance may come to the office to apply or use the form online." Address "9550 E U.S. Hwy 40", phone "(812) 877-3415". No office hours, assistance categories, payment method, or "emergency" wording are shown. The linked Application Requirements document (a Word file on the site) lists what to bring, including "Paycheck stubs for past 30 days", bank statements, a driver's license for each household member, "Rent or Lease agreement" and current utility and other bills. It says "AFTER COMPLETION PLEASE CALL OUR OFFICE FOR AN INTERVIEW". Unemployed applicants who are "not disabled and not over age 65" must take part in the workfare program "as set forth in Indiana Code IC 12-20-11-1".
- **Honey Creek:** no official page was found. Three likely domains did not resolve, and a web search found only state audit reports showing a Township Assistance fund. The address, phone, hours and service claims are **not verified**.
- **Statewide context (official page read):** Indiana Legal Services, "Behind On My Rent" (https://www.indianalegalservices.org/behind-on-my-rent/): "Each Township Trustee has special funding for residents in emergency circumstances … contact your local office. (Rental assistance may not be available if a resident is already behind in rent or an eviction has been filed.)" This supports township help for rent in emergencies in general. It does not document any trustee's cash payments.
- **Changed:**
  - Both: tag "emergency cash" replaced by "township assistance", because no source documents cash payments.
  - Lost Creek: address now "9550 E US Hwy 40" as the trustee shows it; website added; hours "Call for office hours", since the official site gives none; requirements rewritten from the trustee's document. The wording avoids search words such as "bills", "pay" and "trustee", so the listing is not lifted for unrelated searches; one wording that did ("current bills") was caught by the evaluation and replaced.
- **Not changed:** both descriptions (supported only in general by the ILS statement; Lost Creek's own pages do not list rent or utilities); Honey Creek's contact details; both `lastVerified` (2026-04), because neither listing has complete evidence.
- **Residency:** each listing names its township. Trustees serve their own township's residents (Harrison: "must have established themselves as a permanent resident of the township"); nothing in the listings or the search says a trustee serves all of Vigo County.
- **Provider contact needed:** Honey Creek (all fields); Lost Creek (hours and which needs it covers).

### financial-014: Honey Creek Township Trustee (release blockers, 2026-11-17)
- **Finding (independent review):** the listed office, "6553 S Carlisle St", is Honey Creek Fire Department Station No. 91, and a county resource guide associates the trustee's phone with a different address, 3571 E Margaret Dr.
- **Checked 2026-11-17:**
  - https://honeycreekfire.com/home/station-no-91/ (official page read): "Honest Creek Fire Station No. 91" (the page's own spelling), "6553 S Carlisle St. Terre Haute, IN 47802", "the main headquarters for the department". The fire department's home and contact pages do not mention the township, the trustee, 812-235-1012 or any trustee hours.
  - https://www.vigocounty.in.gov/egov/documents/1754062614_38588.pdf: HTTP 403 to an automated request; **not read**. The 3571 E Margaret Dr association is the review's finding and was not checked here.
  - Terre Haute Tribune-Star, "Honey Creek Township Trustee open by appointment only", Mar 17, 2020 (news page read): "The office of the Honey Creek Township Trustee at 6553 Carlisle will continue to be open from 8 a.m. to noon Monday through Friday." "Call 812-235-1012 to make an appointment." "No walk-ins will be allowed." No kinds of assistance are named.
  - A web search found the same phone and address only in business directories (Manta, Chamber of Commerce, Yellow Pages), which were not used as evidence. A Facebook page titled "Honey Creek Township Trustee" did not load readable content.
- **Decision:** kept published as a phone-first listing; withholding is not recommended while a dated, independent source gives the phone number. The office address and hours are not established for 2026: the 2020 article placed the office at the fire-station address, the review's county source points elsewhere, and neither is current.
- **Changed:**
  - address → "Phone first; office location not confirmed" (no Directions link is produced);
  - hours → "Not confirmed; ask by phone";
  - requirements → "Phone before going. This number was given for the trustee's office in a March 2020 news report and has not been reconfirmed.";
  - description → "Township assistance for Honey Creek Township residents in need, which may include help with rent and other basic needs. Ask by phone what help is available and how to apply." The specific claim of "Emergency assistance for rent, utilities, and basic needs" was replaced. "May include help with rent" rests on the statewide Indiana Legal Services statement quoted above, not on a Honey Creek source.
  - Phone and tags unchanged.
- **Verification date withdrawn (2026-11-17, before final review):** `lastVerified` was "2026-04", the value carried since before this patch. The card showed "Verified 2026-04", but no current source confirms the office location, hours, services or that the phone is answered. The value is now empty, and no new date was invented.
  - `renderCard` shows the "Verified …" label only when `lastVerified` has a value, so the card shows no verification label.
  - The dataset integrity check required a YYYY-MM date for every listing. It now accepts an empty date only for listings named in an explicit `UNVERIFIED_KNOWN` list (financial-014), and fails if a listed one carries a date. Every other listing still needs a valid date.
  - The earlier value, 2026-04, is preserved here and in the original record (section K).
- **Description:** "may include help with rent and other basic needs" is worded as a possibility, not a confirmed program. It rests on the statewide Indiana Legal Services statement. Honey Creek's specific services are not confirmed.
- **Wording note:** the listing text avoids the word "call". Four uses of it in an earlier draft lowered that word's weight across the dataset and moved 2-1-1 out of the top three for "who do i call when i dont know where to start" (caught by the evaluation).
- **Search effect:** Honey Creek is still returned for rent, "township assistance" and its name. It no longer appears for utility, "emergency cash", "emergency money" or "emergency assistance" searches. For "township trustee" it is now listed before Harrison; the four trustee listings are worded alike, and each names its own township.
- **Provider contact needed:** yes: office location, hours, and confirmation of the phone.
- **Source:** same as financial-008.

### financial-012: Vigo County Veterans Service Office
- **Was:** "Veterans Emergency Assistance", "Vigo County Veterans Office, 1440 S 3rd St", 812-462-3245, "Funds for veterans facing housing or utility crises", "DD-214 and proof of need."
- **Verified:** "Vigo County Annex / 163 Oak Street / Terre Haute, IN 47807-3464", "(812) 462-3261", "Monday - Friday / 8:00 AM - 12:00 PM / 1:00 PM - 4:00 PM". County veterans service officers help veterans and family "with benefits they may be eligible for as a result of their military service."
- **Changed:** name, address, phone, hours, website, description, requirements, tags, `lastVerified` → 2026-11. The unsupported claim that the office provides funds was removed; the listing now says to ask what emergency assistance may be available.
- **Source:** http://www.in.gov/dva/home/cvso-locate/ (Indiana Department of Veterans' Affairs). Official page read.
- **Provider contact needed:** yes, to learn whether the office administers any emergency financial assistance.

### financial-011: Family Development Program — WICAA
- **Was:** "Credit & Budget Counseling — CAPWI", "Free financial literacy and debt counseling."
- **Verified:** WICAA's Family Development Program "works with families to offer strategies to assist with attaining economic self-sufficiency" and assists with "budgeting/money management, adult education, employment, health care, substance abuse, transportation, family relations, utilities, housing, accessing community resources." WICAA directs enquiries to its Vigo County office, (812) 232-1264.
- **Changed:** name, description, address (completed), website, hours and requirements (now "call"), tags ("credit repair" removed). `lastVerified` kept at 2026-04: the program phone, hours and eligibility are not documented.
- **Source:** https://www.wicaa.org/ Family Development and Locations pages. Official pages read.
- **Partially verified:** the program page gives no hours, eligibility rules or program phone. Credit or debt counseling is not documented.
- **Provider contact needed:** yes.

### education-002: Head Start / Early Head Start — WICAA
- **Was:** address "705 S 5th St", phone 812-232-1264, "Free preschool and childcare for ages 0–5."
- **Verified:** Head Start serves "children ages 3-5"; Early Head Start covers "infants and toddlers, as well as providing prenatal education to pregnant mothers." "Household income eligibility is based upon 100% of the federal poverty guidelines." Vigo sites: 705 S. 5th, (812) 232-3917; 489 2nd Ave., (812) 462-6500.
- **Changed:** description, address (completed), phone, hours (now "Call for hours"), website, requirements. `lastVerified` kept at 2026-04 because of the phone conflict below.
- **Source:** https://www.wicaa.org/ Head Start page. Official page read.
- **Remaining uncertainty:** WICAA's own pages disagree on the phone for 489 2nd Ave ((812) 462-6500 on two pages, (812) 232-1264 on one). The page gives no hours.

### education-003: Childcare Assistance (CCDF Vouchers) — Indiana FSSA
- **Was:** "Childcare Subsidy (CCDF Vouchers) — CAPWI", 705 S 5th St, 812-232-1264.
- **Verified:** families apply through Early Ed Connect (https://earlyedconnect.fssa.in.gov/). The intake agent listed for Vigo County is Firefly Children & Family Alliance, Region 2, toll-free 866-287-2420. "FSSA has re-implemented a waitlist for new applicants". Eligibility includes income "at or below 135% of the federal poverty level", "A valid service need", and a child "under 13 years old, or a child over 13 with documented special needs until their 19th birthday."
- **Changed:** name, address (now "Apply online or by phone"), phone, hours (blank), website, description, requirements. `lastVerified` kept at 2026-04 (see below). On 2026-11-17 the description was reworded so it no longer states that Firefly is the Vigo County intake agent; it says the phone is the one the state's intake page lists for Vigo County, and gives the statewide Child Care Support Line, 1-800-299-1627.
- **Sources:** https://www.in.gov/fssa/carefinder/ccdf-intake-office-changes/ and https://www.in.gov/fssa/carefinder/child-care-assistance/. Official pages read.
- **Partially verified:** the intake-agent page contains template text ("County Name Here"), and the state's eligibility office map (https://www.in.gov/fssa/carefinder/files/CCDF_Eligibility_Office_Map.pdf, file dated May 21, 2026) could not be read as text. The Vigo assignment needs confirming in a browser. The waitlist statement is dated November 2026 in the listing because it will change.

### food-004 and children-007: WIC
- **Verified:** WICAA runs WIC at 705 S. 5th Street, (812) 232-6306. Hours: "M, T, W, F: 8:00 a.m. – 4:30 p.m. Thurs: 10:30 a.m. – 7:00 p.m."
- **Changed:** hours and website on both; full address on children-007. Neither date was advanced: food-004 shows a bus route ("Downtown — multiple routes") that was not checked.
- **Source:** https://www.wicaa.org/ WIC page. Official page read.
- **Not changed:** children-007 keeps `lastVerified` 2026-04 because its description ("Nutrition and formula support") was not checked: the WICAA page read does not mention formula. The two records are the same service in two categories.

### housing-003: Terre Haute Housing Authority — Section 8 (Housing Choice Voucher)
- **Was:** "Vigo County Housing Authority — Section 8", "Income limits apply. Background check required."
- **Verified:** the authority's site is headed "Terre Haute Housing Authority" and describes "The Housing Authority of the City of Terre Haute". "2001 N. 19th Street | Terre Haute, Indiana 47804", "1-812-232-1381", "Monday thru Friday, 8:00 A.M. to 4:30 P.M." Applications "can be picked up at 2001 N. 19th Street" and "returned by mail or in person". Required: "Birth certificates and social security cards for each person", "Photo identification for adult members", "Income verification."
- **Changed:** name, description, requirements. `lastVerified` kept at 2026-04 because the authority's own site is visibly out of date (see below), so its process and document list cannot be called current.
- **Source:** https://www.terrehautehousing.org/ and its How To Apply page. Official pages read.
- **Remaining uncertainty:** the site is dated (footer 2019; "Our waiting list will open on August 23, 2017"). Whether the waiting list is open now is unknown, so the listing and the Guide say to call.

### other-003: Indiana BMV — State Identification Card (in part)
- **Changed:** the description no longer says a free ID is issued "when requested for voting purposes". The BMV page says: "A free ID card may be issued if you are at least 18 years old, a United States citizen, and you are eligible to vote." The $9 fee and document list were confirmed.
- **Source:** https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/identification-cards. Official page read.
- **Not verified:** the Terre Haute branch address and phone (the state's branch list did not load). `lastVerified` left at 2026-08.

### other-004: Vigo County Vital Statistics — Birth Certificate (in part)
- **Changed (2026-11-17):** hours now read "In-person birth certificate applications Mon–Fri 8:15am–3:15pm. Call to confirm office hours and holiday closures." The 8:15am–3:45pm office-hours figure was removed because no official source was read for it.
- **Changed (2026-11-16, superseded):** the hours separated office hours (Mon–Fri 8:15am–3:45pm) from in-person application hours (8:15am–3:15pm).
- **Evidence:** search extract only. A search summary of the county's Vital Statistics page gave "Hours: Monday - Friday 8:15 am - 3:45 pm", and of the county's birth record application form gave in-person applications "8:15 am until 3:15 pm". The county pages themselves returned HTTP 403 and were not read.
  - Pages named by the search: https://www.vigocounty.in.gov/department/division.php?fDD=14-87 and https://www.vigocounty.in.gov/egov/documents/1747068370_0381.pdf
- **Owner confirmation (2026-11-17):** the owner reports that the county's official birth-certificate instructions give in-person application hours of 8:15 a.m. to 3:15 p.m., Monday through Friday. This is the basis for the cutoff. I did not read the county page myself. `lastVerified` left at 2026-08.

## D. Flagged, unchanged

No listing remains in this state. recovery-010 was flagged here on 2026-11-16 and withheld on 2026-11-17 (section B). The first check is kept for the record:

### recovery-010: Club Soda Sober Living — Co-ed (first check, 2026-11-16; superseded)
- **Checked:** identity, 1330 Lafayette Ave, 812-841-6319, co-ed 12-step sober living, 3–12 month stays.
- **Found:**
  - The provider's site, http://www.clubsodallc.org/, could not be read (its security certificate does not match the domain).
  - Search extract: the site lists (812) 841-6319 and describes "a long term (3-12 months) residence for recovering adult male and female alcoholics and addicts"; a directory entry reviewed June 24, 2026 describes co-ed, 12-step sober living. A Yellow Pages entry gives a different number, (812) 232-2631.
  - Search extract: undated local news reports describe financial trouble and required building upgrades.
  - Club Soda is not on the state's certified recovery residence list of November 5, 2026. Certification is not required to operate.
- **Decision then:** left published and unchanged. That check missed the September 2026 WTHI reports of the closure.

### Not examined in this patch (for Patch 2)
- transport-005 (Salvation Army gas vouchers), crisis-003 (Salvation Army emergency funds), crisis-008 (Anabranch), recovery-002 (Odyssey House phone, fees and rules), recovery-013 (Oak Street House details), financial-014 (no official source found; see section C), financial-015 (partly; see section C), health-009, children-009 requirements, and every other listing still dated 2026-04.
- Guide contacts not re-verified: Catholic Charities, Salvation Army, Light House Mission, CODA Wabash Valley, the Social Security office, the BMV branch address and phone, and Odyssey House's phone number.

## E. Guide page (`guide.html`)

| Section | Change | Evidence |
|---|---|---|
| Intro | "tells you exactly what happens" → "describes what usually happens" | Removes an absolute promise. |
| Vital Statistics | In-person applications Mon–Fri 8:15am–3:15pm, stated as the cutoff for applying that day. The 3:45pm office-hours figure was removed; the Guide now says the office may stay open later and to call to confirm its hours | Owner-confirmed county instructions (2026-11-17); see other-004. |
| BMV | Removed "when you state that you need it for voting purposes" | BMV identification card page (official page read). |
| Food pantry | "Nobody judges you… Most people leave feeling relieved" replaced | Unsupported guarantees removed. |
| 988 | Rewritten: greeting and menu, counselor asks about safety; "confidential" explained as different from "anonymous"; when information may be shared; how rarely 911 is involved; call 911 for immediate danger. Corrected 2026-11-17 (independent review): the sentence implying information is shared only for imminent risk, a legal requirement or consent was replaced; the card now links to 988's confidentiality page and privacy policy | https://988lifeline.org/get-help/what-to-expect/, https://988lifeline.org/confidentiality/ ("Updated August 2026"), https://www.samhsa.gov/mental-health/988/faqs ("Last Updated: 12/16/2025"). Official pages read. |
| Free clinic | Neighborhood Health Clinic removed. Card now covers Wabash Valley Health Center (1436 Locust St, (812) 232-7447) and Hamilton Center's Grace Clinic (622 8th Avenue, 812.231.8377) | https://www.wabashvalleyhealthcenter.org/contact-us and /outreachandenrollment; https://www.indianapca.org/clinic/wabash-valley-health-center/ ("Sliding-Fee Scale: Yes"); https://www.hamiltoncenter.org/programs/primary-care/ ("No one will be turned away for inability to pay."). Official pages read. |
| Legal | Rewritten from the Indiana Legal Services pages cited under legal-001; no Terre Haute office; 125% and 200% wording | See legal-001. |
| Hamilton Center | "No one is turned away for inability to pay" removed from the mental-health card; fee wording now follows the fee page; unverified "about an hour" removed | https://www.hamiltoncenter.org/price-transparency/ and /locations/vigo-county/. Official pages read. The "turned away" statement appears only on the Grace Clinic page. |
| Section 8 | "Vigo County Housing Authority" → "Terre Haute Housing Authority"; documents list from the authority; "typically 1 to 3 years", "apply in person or online" and "They run a background check" removed | See housing-003. |
| Sober living | Unverified intake details for Odyssey House removed; both houses described as state-certified; a malformed `class` attribute on "The rules" label fixed | State recovery residence list of November 5, 2026: "Odyssey House | Odyssey House | 1547 S 7th St" and "Hamilton Center, Inc. | Oak Street | 1300 Oak St", both Level 3, Active. |

**988 wording and its sources**

- "your conversation is confidential" and "You do not have to share any personal information": 988lifeline.org.
- "'Confidential' and 'anonymous' are not considered to be the same": 988lifeline.org confidentiality page.
- Sharing is "prohibited unless there is imminent risk of harm to you or to someone else, or the sharing of information is required by law or we have your informed consent": same page. **Not sufficient on its own (corrected 2026-11-17):** the same page also says to "assume that any information you share … may be documented", that personally identifiable information is used "to investigate deaths after someone has contacted the 988 Lifeline, to investigate grievances, and in response to court orders", that "States and crisis contact centers may use this information to coordinate care", and that in some states it is used to submit insurance claims. It adds: "You have the right to request that your 988 Lifeline counselor to not share your personal information." The privacy policy (https://988lifeline.org/privacy-policy/, "Updated August 2026", official page read) lists connection to 911/EMS for anyone in immediate danger, sharing with consent to connect services, care coordination, research, billing and legal requirements, and an opt-out except at imminent risk.
- **Guide text now:** "988 says your conversation is confidential, and you do not have to give your name or other personal information to get support. Confidential is not the same as anonymous: the counselor can see your phone number, and what you share may be written down. 988's policies allow some information to be shared in certain situations, such as to coordinate your care, when the law requires it, or with your agreement. If someone is in immediate danger, emergency services may be contacted. You can ask the counselor not to share your personal information." It then links to both pages. "Such as" marks the list as examples, not the full policy.
- "the crisis counselor who responds to you will know your phone number": SAMHSA FAQ.
- "Most crises are managed by counselors working with you to de-escalate the situation and without involving law enforcement" and "a small percentage of 988 Lifeline callers require activation of the 911 system, and many of those are done with the consent and cooperation of the caller": SAMHSA FAQ. The Guide does not promise that emergency services will never be involved.
- The two sources differ on the menu options (988lifeline.org lists a third option for LGBTQ+ youth; SAMHSA lists two), so the Guide names only the two both list.

## F. `lastVerified`

- **Before:** 120 listings dated 2026-04, 10 dated 2026-08, 3 dated 2026-10, 1 dated 2026-06.
- **Dated 2026-11 (9):** food-002, legal-001, legal-011, immigration-004, financial-005, financial-008, financial-012, financial-013, and the new recovery-016. A regression test fails if any other listing carries 2026-11.
- **Date withdrawn (1):** financial-014, Honey Creek Township Trustee, was 2026-04 and is now empty, so its card shows no "Verified" label (section C). It is the only listing without a date, and the integrity check names it explicitly.
- **Returned to 2026-04 on review (6):** food-004 (bus route not checked), housing-003 (source site visibly out of date), financial-001 (hours not confirmed), financial-011 (program phone, hours and eligibility not documented), education-002 (conflicting phone numbers), education-003 (Vigo intake agent not confirmed). Their corrected fields stay; only the date claim was withdrawn.
- **Changed but date kept:** children-007 (2026-04), other-003 and other-004 (2026-08), because not every displayed field was checked.
- **Independent-review corrections (2026-11-17):** no `lastVerified` value was changed. The tag edits to financial-013 and recovery-016 are search metadata taken from the sources already cited for those listings; their 2026-11 dates (official-source desk verification, not provider contact) stand. Listings dated 2026-11: still exactly these 9.

**Field-level evidence for the 9 dated listings.** Displayed fields are name, description, address, phone, hours, website and requirements; the bus route is empty on all 9.

| Listing | Address | Phone | Hours | Website | Description and requirements |
|---|---|---|---|---|---|
| food-002, financial-005 | DFR page: "2901 Wabash Ave., Suite 200" | DFR page: "800-403-0864" | DFR page: "8 a.m. – 4:30 p.m." (no days shown, none claimed) | the DFR locator page itself | "to assist individuals in applying for SNAP, TANF and health coverage"; requirements are a generic "call to ask" |
| legal-001 | "Apply by phone or online" (no office claimed) | apply page: 1-844-243-8570 | apply page: "Monday – Thursday 10:00a.m. -2:00p.m. EST" | the apply page itself | locations, what-we-do and eligibility pages (quoted in section C) |
| legal-011, immigration-004 | as legal-001 | ILRC page: 1-844-243-8570 | ILRC page: "Monday through Thursday 10am to 2pm EST" | the ILRC page itself | ILRC page (quoted in section C) |
| financial-008, financial-013 | trustee contact page: "721 Elm Street" | "812-232-5052" | "8:30 AM-4:00 PM, Monday – Friday"; walk-ins "until 3 p.m." | harrisontwptrustee.com | trustee assistance page (quoted in section C) |
| financial-012 | DVA locator: "163 Oak Street" | "(812) 462-3261" | "8:00 AM - 12:00 PM / 1:00 PM - 4:00 PM" | the DVA locator itself | DVA locator: benefits help; requirements are a generic "call to ask" |
| recovery-016 | "Online and by mail" (no location claimed) | Overdose Lifeline contact page: "+1 (844) 554-3354" | none shown | the Overdose Lifeline map page itself | Overdose Lifeline and Indiana Department of Health pages (quoted in section H) |
- **Limitation of the single date:** one month per listing cannot say which fields were checked, by what method, or against which source. A listing whose phone was confirmed but whose hours were not has no honest value to show. This file is the field-level record. A `lastVerified` of 2026-11 here means "every displayed field was read on an official page", not "the provider was contacted". No listing was phone-verified.

## G. Search-code changes (`app.js`)

**1. "emergency" removed from the overdose boost words (2026-11-16; accepted provisionally by the owner).**

- **Why:** the Salvation Army "Emergency Assistance" listing (emergency funds for utility shutoffs and prescriptions) matched that word. It was already the second listing for "overdose" searches in release 91c0e11. With crisis-004 withheld it became the first listing under the 911 guidance, which would be a misleading result.
- **Effect:** overdose searches show the 911 guidance, then only recovery, crisis and health listings. With the 91c0e11 data and tests, the patched `app.js` still passed 527/527.
- **Checked 2026-11-17:** "overdosing" and "my friend overdosed" (overdose guidance, then recovery-016 and Anabranch); "someone is unconscious" and "my son is not breathing" (911 emergency guidance, no emergency-funds listing); "emergency shelter tonight" (Light House Mission first, Bethany House listed); "emergency rental assistance" (Harrison Township Trustee in the top three; failed after the 2026-11-17 tag correction and passes again after item 4); "emergency utility assistance" (Salvation Army Emergency Assistance first, trustee and Energy Assistance listed); "panic attack" (988 guidance, Hamilton Center crisis line first). All are regression tests.

**2. A described affiliation no longer lifts a residential program above treatment (2026-11-17).**

- **Defect:** "my teenager needs substance use counseling" listed Oak Street House (transitional housing) first after Centerstone was withheld.
- **Cause:** the search treats a multi-word phrase from the request that appears in a listing's description as a documented affiliation, and places those listings first, before any other ordering. "substance use" appears in Oak Street's description ("housing for adults with co-occurring mental health and substance use disorders"), and in Hamilton Center's and Harsha's. Those three were therefore pulled ahead of everything else, in score order, and Oak Street had the highest score. The existing rule that lists treatment before residential programs when housing was not asked for was never applied to them. Centerstone had previously ranked first among them.
- **Change:** an organization named in the request (a phrase found in the listing's name) still always leads. A phrase found only in a description no longer lifts a listing that the existing rules would place last: a residential program when housing was not requested, or an adults-only program for a stated minor. Such listings stay in the ordinary order. No listing is named in the code.
- **Effect:** counseling and treatment requests list every clinical provider (Hamilton Center, Harsha, WIN Recovery) before every residential program. Housing requests ("I need sober housing", "I need recovery housing", "somewhere to live while staying sober") still list residential programs first. "Oak Street House" and "Hamilton Center" searches are unchanged. All are regression tests.
- **Correction (2026-11-17, independent review):** the first version of this check counted "my teenager needs substance use counseling" as satisfied with WIN Recovery (documented "Must be 18 or older") in the clinical group. That was wrong for a youth request; see item 3.

**3. Who needs the help, and how old (2026-11-17, independent review).**

- **Defects:** "My teen needs addiction treatment" listed WIN Recovery, an adults-only program, first. "My child needs substance abuse counseling" did not trigger the existing protection for a stated minor.
- **Cause:** only an explicit age under 18, "under 18", "is a minor" or "underage" counted. Youth wording did not, and a helper's age ("my 14 year old daughter is helping me") was read as the age of the person needing help.
- **Change, in the existing age logic:**
  - A clause saying a relative is helping ("my … is helping me") is removed before ages are read, so a helper's age is not used.
  - Self-stated ages ("I am 16", "I am 30") and "my minor son", "minor child", "I am a minor" count as stated ages or minors.
  - Youth wording for the person who needs the help ("my teen needs", "my adolescent daughter is", "counseling for my child", "teen rehab", "I am a teenager") is a *possible* minor. A teenager can be 18 or 19, so it is not treated as proof of age; it only gets the same conservative order as a stated minor: documented adults-only programs come after the others. An adult age (18+) or the word "adult" overrides it. An unqualified "son" or "daughter" says nothing about age.
  - Children named only as people the requester supports ("a job to support my kids", "help with child custody", "child support") are not the person.
  - Nothing is removed and no listing is claimed to serve minors; eligibility text still shows on every card. No provider is named in the code.
- **Side effect found and fixed:** the 2026-11 Section 8 correction added "Photo identification for adult members" (listing text: "photo ID for adults"), which the existing adults-only pattern read as an adults-only program. A document asked of the adults in a household is now excluded from that pattern. Before the fix, "me and my kids need shelter" moved Section 8 one place down.
- **Results (checked by ID and order, all regression tests):**

| Query | Adults-only programs (WIN, Oak Street, Odyssey) | First result |
|---|---|---|
| My teen needs addiction treatment | last | health-001 |
| My teenager needs substance use counseling | last | health-001 |
| My adolescent daughter needs counseling | last | children-001 |
| My child needs substance abuse counseling | last | crisis-002 (see below) |
| My minor son needs addiction treatment | last | health-001 |
| My 14 year old needs addiction treatment | last | health-001 |
| My 17 year old daughter needs rehab | after every treatment listing (men's houses also follow, for a daughter) | recovery-001 |
| My 19 year old daughter needs addiction treatment | ordinary order (same as "My daughter needs addiction treatment") | recovery-014 |
| My adult son needs addiction treatment | ordinary order | recovery-014 |
| My daughter is 30 and needs rehab | ordinary order | recovery-001 |
| I am 30 and my 14 year old daughter is helping me find addiction treatment | ordinary order | recovery-014 |
| My son needs addiction treatment | ordinary order | recovery-014 |
| I need addiction treatment | ordinary order | health-001 |
| I need sober housing | ordinary order | recovery-002 |

- **Not changed (pre-existing at 91c0e11, outside this fix):** "minor" also matches CODA's "Minor Children" listing (children-006) for "My minor son needs addiction treatment". The number in "My daughter is 30…" matches text in financial-001. Recorded for Patch 2. (The "substance abuse" problem recorded here at first is fixed by item 5.)

**4. "Emergency" in a rent request (final search corrections, 2026-11-17).**

- **Defect:** "emergency rental assistance" listed Honey Creek and Lost Creek, two shelters and the Salvation Army before the verified Harrison Township Trustee (7th).
- **Root cause:** the rent concept ("rental assistance", "help with rent", …) takes its own words out of the free-word search, but "emergency" was left as a separate word. It became a second, crisis need. Listings matching both needs came first: Honey Creek and Lost Creek, whose descriptions start "Emergency assistance for rent", and the shelters ("Emergency Lodging"). Harrison documents rent help but does not use the word "emergency". Its removed "emergency cash" tag had been what kept it in the top three.
- **Change:** "emergency rent assistance", "emergency rental assistance", "emergency rent help" and "emergency help with rent" are added to the existing rent concept's phrases. "Emergency" there says how urgent the rent request is, so these searches order exactly like "rental assistance": Section 8 (housing-003), then the trustees, Harrison first. No listing is named in the code, and no ranking rule changed.
- **Unchanged:** "emergency utility assistance" (Salvation Army emergency funds first), "emergency shelter" (Light House Mission first), "emergency cash", "i need emergency help", "behind on rent", "need help paying rent", "eviction prevention", "need money for groceries", "township assistance" and the three trustee names.
- **Limitation:** Section 8 is first for "emergency rental assistance", as it is for "rental assistance". Its listing says to call to check whether the waiting list is open, so it is not an emergency resource. Re-ranking it for urgent requests would be a new ranking rule and was not made.

**5. "Substance abuse" read as abuse (final search corrections, 2026-11-17).**

- **Defect:** "My child needs substance abuse counseling", "substance abuse", "drug abuse" and "I need substance abuse treatment" listed CODA Wabash Valley's domestic-violence crisis line first or second.
- **Root cause:** "abuse" is a crisis-category word (for domestic, sexual or child abuse) and a tag on CODA's listings. In "substance abuse" it was matched on its own. The existing pill-misuse concept names "prescription drug abuse" but is not marked *situational*, so its words, including "abuse", were still matched one by one.
- **Change:** a new situational phrase concept, "substance abuse", "drug abuse" and "alcohol abuse", reads these as substance use (recovery, adding "addiction" and "substance"). The phrase's own word "abuse" is not matched separately. "Abuse" alone, "domestic abuse", "sexual abuse", "child abuse", "elder abuse" and "my partner is abusing me" are unaffected. Crisis guidance is unchanged. No organization is named in the code.
- **Correction (release blockers, 2026-11-17):** the first version suppressed independently requested abuse help; see item 6.
- **Results:** substance-abuse searches list treatment first and no longer return CODA's listings (crisis-002, children-006, legal-006). For a child or teen, adults-only programs stay last. "I need domestic abuse help", "my partner is abusing me", "abuse" and "sexual abuse" still list CODA's crisis line first. "domestic violence shelter" lists Bethany House, then CODA. "child abuse help" and "my minor child is being abused" list CODA's Minor Children listing and DCS in the top three. "CODA" returns all three CODA listings.

**6. Mixed substance-abuse and domestic- or sexual-abuse requests (release blocker, 2026-11-17).**

- **Defect (independent review):** "substance abuse and domestic abuse", "I need drug abuse help and domestic abuse help" and "alcohol abuse treatment and sexual abuse help" returned no CODA listing.
- **Root cause:** words of a *situational* phrase are not matched one by one, so the concept carries their meaning. They were collected as a query-wide set of words and removed wherever they appeared. Once "substance abuse" was situational, every "abuse" in the request was removed, including the one in "domestic abuse".
- **Change:** situational words are now left out only at the positions the phrase occupies, for phrases and patterns alike. Any other occurrence of the same word belongs to a separate request and is searched.
- **Also found and fixed:** with the domestic-abuse need restored, these requests have two needs. For two or more needs, the listing chosen to represent each need was the top-scoring one. That step skipped adults-only programs for a minor but did not apply the existing "treatment before residential programs" rule, so Oak Street House (transitional housing) came first. The same rule now applies there (one shared predicate; no listing named). Example: "I need addiction treatment and somewhere to live" is unchanged.
- **Results:** each mixed request lists Harsha Behavioral Center first, CODA's crisis line second and Hamilton Center third, with CODA's legal and Minor Children listings below. Guidance is the same as for the abuse request alone (none). "substance abuse", "drug abuse", "alcohol abuse", "I need substance abuse counseling" and "my teenager needs substance abuse treatment" still return no CODA listing. "domestic abuse", "my partner is abusing me", "sexual abuse", "child abuse", "elder abuse" and "CODA" are unchanged.
- **Wider effect:** only searches containing a situational phrase *and* a separate use of one of its words can change. A 92-query comparison and the full suites showed no other change.

**7. The requester's age taken as the beneficiary's (release blocker, 2026-11-17).**

- **Defect (independent review):** "I am 40 and my teen needs addiction treatment" and "I am 40. My teenager needs addiction treatment." listed WIN Recovery, documented "Must be 18 or older", first.
- **Root cause:** item 3 added the requester's own age ("I am 30") to the stated ages. Any stated age of 18 or more cancelled youth wording. So the parent's 40 cancelled "my teen". The bare word "adult" did the same ("I am an adult and my teen…").
- **Change, in the existing age logic:**
  - The requester's age ("I am 40", "I am 40 years old") is read separately.
  - It is used only when no one else is named as needing the help ("my son", "my teen", "my mom", …).
  - "Adult" overrides youth wording only when said of that person ("my adult son", "my son is an adult"), or when no one else is named.
  - The helper rule ("my 14 year old daughter is helping me") is unchanged.
- **Results (regression tests):**

| Query | Adults-only programs | First |
|---|---|---|
| I am 40 and my teen needs addiction treatment | last | health-001 |
| I am 40. My teenager needs addiction treatment. | last | health-001 |
| I am 40 years old and my teen needs addiction treatment | last | health-001 |
| I am 35 and my 14 year old son needs counseling | last | children-001 |
| My teenage daughter needs addiction treatment | last | health-001 |
| My adolescent son needs treatment | last | health-001 |
| My teen needs sober housing | Oak Street and Odyssey last | recovery-012 |
| I am 30 and my 14 year old daughter is helping me find addiction treatment | ordinary order | recovery-014 |
| My adult son needs addiction treatment | ordinary order | recovery-014 |
| My daughter is 30 and needs rehab | ordinary order | recovery-001 |
| My 19 year old daughter needs addiction treatment | ordinary order | recovery-014 |
| My son needs addiction treatment | ordinary order | recovery-014 |
| I need addiction treatment | ordinary order | health-001 |
| I am 16 and my mom needs addiction treatment | ordinary order (the mother is the person) | recovery-014 |
| I am 16 and need help with drugs | last | health-001 |

- **Not claimed:** higher-ranked listings are not described as accepting minors. Their age rules are not documented.

**8. A mentioned relative taken as the beneficiary (final independent review, 2026-11-17).**

- **Defect:** "I am 16 and my mom will help me find addiction treatment" and "I am 16 and need addiction treatment. My mom can drive me." were read with no minor (`explicitMinor` and `possibleMinor` both false). WIN Recovery (adults-only) was listed first.
- **Root cause:** in item 7, "someone else needs the help" (`forSomeoneElse`, `app.js`) was any mention of a relative ("my mom", "my son", …). Mentioning the mother therefore discarded the requester's stated age, 16.
- **Change:** a relative now counts as the person who needs help only when the request says so:
  - a need is said of them ("my mom needs", "my teen needs", "my son is using", "my 14 year old son needs");
  - or help is asked for them ("for my son", "help my son find").
  - A relative who will help, drive, take or bring the requester ("my mom will help me", "my mom can drive me", "my mom wants to help me") is not the beneficiary.
  - The requester's own age is otherwise kept. Nothing else in the age logic changed, and no provider is named.
- **Results (all regression tests; "age read" is the search's own reading):**

| Query | Age read | First | Adults-only programs |
|---|---|---|---|
| I am 16 and my mom will help me find addiction treatment. | stated minor | health-001 | last |
| I am 16 and need addiction treatment. My mom can drive me. | stated minor | health-001 | last |
| I am 16 and need addiction treatment. | stated minor | health-001 | last |
| I am 40 and my teen needs addiction treatment. | possible minor (teen) | health-001 | last |
| I am 40. My teenager needs addiction treatment. | possible minor (teen) | health-001 | last |
| I am 30 and my 14 year old daughter is helping me find addiction treatment. | adult (requester) | recovery-014 | ordinary order |
| My adult son needs addiction treatment. | adult | recovery-014 | ordinary order |
| My daughter is 30 and needs rehab. | adult | recovery-001 (WIN 4th, before residential programs) | ordinary order |
| My son needs addiction treatment. | not stated | recovery-014 | ordinary order |
| My teen needs addiction treatment. | possible minor | health-001 | last |
| I am 19 and need addiction treatment. | adult | recovery-014 | ordinary order |
| My 16 year old son needs treatment, and I can drive him. | stated minor | education-009, then health-001 | last |
| I am 16 and my mom needs addiction treatment (control) | the mother; no minor | recovery-014 | ordinary order |

- **Seen, not changed:** "drive" matches "School Supplies Drive" (education-009) by word, as at 91c0e11, so it appears among the results for the two queries that mention driving.
- **Effect elsewhere:** none found. A 92-query comparison showed no change. Evaluation totals and failing cases are identical. The regression suite went from 634 to 649 rows, with the original 634 unchanged and all passing.
- **Seen, not changed:** "adult" in a request still matches adult-education listings by word ("My adult son needs addiction treatment" lists The Excel Center third), as at 91c0e11.

## H. Naloxone (2026-11-17)

**Added: recovery-016, "Overdose Lifeline — Naloxone (Narcan) Map and Kit Requests".** It describes how to get a kit, not emergency help, and opens with "For an overdose happening now, call 911."

| Displayed field | Value | Source (official page read 2026-11-17) |
|---|---|---|
| Partner of the state | "a partner of the Indiana Department of Health" | IDOH: "In 2024, IDOH partnered with Overdose Lifeline (ODL) to increase the efficiency and capacity of naloxone distribution to LHDs." https://www.in.gov/health/overdose-prevention/naloxone/ |
| Map | NaloxBoxes, vending machines and distribution centers around Indiana | "The following map shows NaloxBox locations and naloxone distribution centers around Indiana." https://www.overdoselifeline.org/naloxone-indiana-distribution/ |
| Kit requests | Indiana residents, pickup or mail, naloxone and test strips | "INDIANA RESIDENTS ONLY"; "Pick Up" or "Ship to Me"; "we can only ship naloxone within Indiana"; items include naloxone, fentanyl and xylazine test strips. https://www.overdoselifeline.org/indiana-naloxone-reporting-and-requests/ |
| Training first | "Watch the short overdose-response training before requesting a kit" | "Complete this document ONLY after completion of the overdose response training." (same page) |
| Centers vary | "Hours and supplies at distribution centers vary" | "hours and accessibility vary, please contact center to confirm availability" (map page) |
| State locator | "lists naloxone providers by ZIP code at optin.in.gov" | "please visit optIN.IN.gov and type in your zip code to find an entity near you" (IDOH page) |
| No prescription | "a prescription is not required" | "No prescription is needed." (IDOH page) |
| Phone | 1-844-554-3354 | "Phone +1 (844) 554-3354" https://www.overdoselifeline.org/contact/ |

- **Not claimed:** the listing names no Terre Haute or Vigo County location, and its address ("Online and by mail") produces no Directions link. Overdose Lifeline's map is drawn by script, so I could not read whether any box or center is in Vigo County. IDOH's page does not mention Vigo County.
- **Not used:** Indiana 211 (dial 211 or 866-211-9966, or text your ZIP code to 898-211; https://www.in.gov/fssa/indiana-211/) does not mention naloxone on the pages read. It is already listed as crisis-005.
- **Effect:** "naloxone", "narcan" and "where can i get narcan" return recovery-016 first with no guidance card. Overdose searches show the 911 guidance first, then recovery-016.
- **Harm reduction (2026-11-17, independent review):** the tag "harm reduction" was added to recovery-016. Sources: Overdose Lifeline's request form asks "Is this your first time requesting harm reduction supplies from ODL?" and lists naloxone and fentanyl and xylazine test strips; its home page says "Overdose Lifeline offers support, harm reduction, and education"; the IDOH page is titled "Overdose Prevention: Harm Reduction". "harm reduction" and "harm reduction supplies" now return recovery-016 first with no guidance card; "someone is overdosing right now" still shows the 911 overdose guidance. No syringe-service or other local harm-reduction program was verified.
- **Category:** Recovery, beside the other substance-use services. In Health it surfaced for "i need a doctor".

## I. Transportation and identification gaps (2026-11-17)

| Query (evaluation case) | Verified listings that could help | Why the case still fails |
|---|---|---|
| no way to get to work | transport-001 (city bus, fare-free since January 2025, verified 2026-10); transport-005 (Salvation Army gas vouchers "for job interviews or medical trips", not re-verified) | The words "get to work" read as an employment request; neither listing is returned. Passed before only through two withheld listings (employment-006, transport-004). |
| no car and need to get to my job (former holdout) | the same | The city bus is returned 8th, below job listings. |
| need id to get a job | other-003 (state ID, partially verified), other-004, other-005 | The BMV listing is returned 6th, below job listings. Passed before only through the withheld "BMV Help Desk" (employment-008). |

- **Decision:** recorded as unresolved. No verified provider of work-transportation vouchers or ID-recovery help for job seekers was found, and the withheld listings were not restored. Fixing the ranking of the listings that do exist is a search change outside this patch.
- **Owner follow-up:** ask WICAA (812-232-1264) and the Salvation Army (812-232-4081) whether they currently fund work transportation or ID documents.

## J. Evaluation expectations changed in this patch

Compared case by case with `91c0e11` (`tests/eval/cases.js`, `tests/eval/holdout.js`): **119 expectations changed, 1 case added, 0 deleted** (as of 2026-11-17, after the independent-review corrections).

**Reconciling the counts.** The first version of this section said 105; the independent review counted 114 changed and 1 added. The 105 was wrong: it keyed cases by query text, so it missed (a) the 7 overdose cases whose expectation is the shared constant `od` (changed once, used by 7 cases), and (b) multi-line cases whose change was on a continuation line. Counted per case, including both, the patch as reviewed had 114 changed and 1 added, matching the review. The independent-review corrections then changed 5 more cases that had been unchanged (co-ed sober living, free sober living, Club Soda, divorce, green card), giving 119. They also re-edited 4 cases already counted (harm reduction, emergency cash, medicaid, out of jail need id and a job). Script: classification by case key (query plus occurrence), with the full old and new text of every case.

| Class | Count | Meaning |
|---|---|---|
| Verified correction | 102 | The expectation now follows corrected data: a withheld ID dropped, or replaced by the verified listing that now documents the service (for example housing-004 → financial-013 for rent; legal-004 → legal-001 for evictions; crisis-004 → recovery-016 for naloxone and harm reduction; recovery-010 → recovery-011 for co-ed sober living). Also: divorce (gap flag removed, legal-001 now names divorce), green card (review flag removed; legal-011 and immigration-004 name adjustment of status), emergency cash (financial-013 removed: vouchers, never cash), out of jail need id and a job (ID and job are separate needs again). 7 of these keep a review flag they already had. |
| Withheld service | 12 | Flagged `gap: "withheld 2026-11"` (Centerstone, Neighborhood Health Clinic, Terre Haute CARES, halfway house, Kathy's Hope, Club Soda, bus pass for new job, foster care, DACA, work permit, volunteer driver, renew my dreamer status) |
| Missing coverage | 1 | credit repair (WICAA documents budgeting, not credit repair) |
| Search failure, marked `known` | 4 | the three cases in section I, plus "medicaid": the review flag said no enrollment office was listed, which stopped being true when the DFR listings (food-002, financial-005) were corrected to say they help with "health coverage". The case now expects one of them in the top 5 and fails, because the search does not connect "Medicaid" to "health coverage" |
| Ambiguous | 0 | No new or changed review flag |
| Added | 1 | "Veterans Service Office" (the corrected name) |

No failure is hidden under a gap flag: the gap flags mark services no remaining listing documents, and every case whose service *is* documented but not retrieved is marked `known` and counted as failing.

- **Guards restored (2026-11-17):** three cases had dropped a "must not show crisis-004" guard; each now guards against recovery-016 instead ("i got nowhere to sleep tonight", "leaving abuse with my kids", "my friend is odd"). Two rent cases that had been widened were tightened back to the original strictness ("cant pay rent": a documented rent listing first; "behind on rent": trustee or Section 8 in the top two).
- **Wider than the original (kept, with reasons in comments):** "veterans emergency assistance" (the listing is no longer called that, so first place is no longer expected); "replace id after prison" and "ride to the food pantry" (the specific programs were withheld, so the case now checks that ID or transport help appears at all).
- **Outcomes of the 120 changed or added cases (2026-11-17 run):** 111 pass; 4 fail (the `known` cases); 3 are flagged as missing data (Club Soda, credit repair, foster care); 2 are ambiguous, as they were before.

## L. Independent-review corrections: test results and open items (2026-11-17)

**Results (local, headless Edge):**

| Suite | Before review corrections | After review corrections | After final search corrections | After release blockers |
|---|---|---|---|---|
| Regression (`tests/search.test.html`) | 553/553 | 580/581 ("emergency rental assistance" failing) | 612/612 (31 rows added) | 634/634 (22 rows added: mixed abuse, requester versus beneficiary age, Honey Creek card); **649/649** after the final review's correction (G8, 15 rows added) |
| Evaluation, written | 573/600 | 571/600 | 571/600 | 571/600 (5 fail, 16 ambiguous, 8 missing data) |
| Evaluation, variants | 652/657 | 654/660 | 654/660 | 654/660 |
| Former holdout | 36/41 | 36/41 | 36/41 | 36/41 |
| UI | 96/99 (3 harness timeouts) | 98/99 (1 harness timeout) | 96/99 (3 harness timeouts) | 99/99 on two consecutive full headless runs. The independent review's run had 92/99 with 7 harness timeouts, so the timeouts are intermittent. |

- **Release blockers, other checks (2026-11-17):**
  - The failing evaluation cases are the same 9 as before.
  - Dataset integrity passes for 120 listings, and the 15 withheld listings are unreachable.
  - Real page, 1280px: the mixed abuse requests, the parent-age requests, "emergency rental assistance", "domestic abuse" and "my friend is not breathing" (911 guidance) behave as listed above. The Honey Creek card shows its phone and the "not confirmed" address and hours text, with no Directions link.
  - Real key events, 1280px and 375px: the reset and category workflows behind the review's timeouts all pass (Back to all after crisis guidance, category after reset, Show all categories), and the four pages reflow at 320px.
  - A normal, visible browser was not available in this session (the Chrome extension tools are not connected), so no visible-browser run was made. That remains for staging acceptance.

- **Final search corrections, other checks:**
  - All 120 listings pass the integrity check (unique IDs, formats, dates), and the 15 withheld listings are unreachable.
  - Crisis and recovery ordering regression rows pass. In the real page, "someone overdosed" and "i want to die" still show their guidance first.
  - No evaluation case expectation was changed.
  - A 92-query comparison against the earlier review state changed only the cash and burial searches: trustees moved down for "emergency cash", "emergency money" and "cash assistance", and burial assistance order shifted slightly.
- **Links (read-only requests, 2026-11-17):** 57 unique web links (9 Guide, 51 listings); 46 returned 200. The rest were all present at 91c0e11:
  - 403, most likely refusing automated requests: ssa.gov, ccthin.org, stbenedictth.org, a jimdosite page;
  - other: 503 (uwv.org), 308 redirect (newlifeterrehaute.com), connection closed (in.gov/idoc/reentry), connection refused (vigoschools.org), and 404 on the font preconnect hosts, which are not links.
  - One likely broken link: `www.workoneindiana.com` (employment-001) does not resolve. Not changed; Patch 2.
  - Every link added in Patch 1 loads.

- **Evaluation failures:** get my license back, medicaid, no way to get to work, got arrested need lawyer, need id to get a job (written, each also failing as a variant); want to get my ged but work days, need to wash my clothes, place to live while staying sober, no car and need to get to my job (former holdout). All but "medicaid" failed before these corrections; "medicaid" fails because its expectation was rewritten from the corrected data (section J).
- **Real key events (Chrome DevTools Protocol, 1280px and 375px):** Tab reaches the search box; Enter runs a search; Space and Enter choose a category; Enter and Space on "Back to all" clear the query, results, category and crisis guidance, and return focus to the search box; choosing Food afterwards lists all 12 Food listings with no guidance; "Show all categories" keeps the query and the 911 overdose guidance and widens the results; Shift+Tab and Tab move between visible controls; every keyboard-focused control showed a focus indicator; the live region (`aria-live="polite"`) holds the result, filter and "Results cleared." messages.
- **Observation:** after "Show all categories", focus moves to the results heading, which shows no focus ring. This is unchanged by this patch.
- **Reflow:** index, Guide, Bus and About have no horizontal scrolling at 320 CSS px (the width a 1280px window has at 400% zoom), including a results page.
- **Not verified:** real browser zoom (only the 320px width was emulated); what a screen reader actually announces (only the live region's text and attributes were read); touch input; a visible-browser run of the UI suite.

**Open items (Patch 2 or owner):**

- Honey Creek Township Trustee (financial-014): phone from a 2020 news report only. Office location, hours and services need confirmation; the listing carries no verification date until then. Lost Creek: hours and which needs it covers.
- The Vigo County resource guide PDF (vigocounty.in.gov) refuses automated requests; a person should read its Honey Creek entry.
- Section 8 leads "emergency rental assistance" although its waiting list may be closed (section G4).
- "minor" matches CODA's "Minor Children" listing for treatment requests (present at 91c0e11).
- employment-001's website does not resolve.
- "medicaid" does not reach the DFR listings that document health-coverage enrollment.
- Club Soda: whether the closure is permanent; restore only with documented reopening.
- The Perplexity audit (37 listings) is still unavailable, and the remaining listings were not re-verified. This record does not claim that all 134 original listings were checked.

## K. Original records of withheld and corrected listings

Exact lines from `resources.js` at `91c0e111b9bd5bdc46d7544824d71a75a86a8b43`.

### Withheld (15)

```js
{id:"recovery-010",name:"Club Soda Sober Living — Co-ed",category:"recovery",description:"12-step based co-ed sober living. Long-term stays of 3–12 months. Meals and transportation to jobs provided.",address:"1330 Lafayette Ave, Terre Haute, IN 47804",phone:"812-841-6319",hours:"Call to inquire",website:"",requirements:"Committed to sobriety and 12-step participation.",busRoute:"",lastVerified:"2026-04",tags:["sober living","co-ed","men","women","recovery housing","12-step"]},
{id:"health-002",name:"Neighborhood Health Clinic",category:"health",description:"Free primary care for uninsured adults. Run by volunteer physicians.",address:"925 Lafayette Ave, Terre Haute, IN 47804",phone:"812-235-5600",hours:"Limited evenings — call to confirm",website:"",requirements:"Must be uninsured. No Medicaid or Medicare accepted.",busRoute:"",lastVerified:"2026-04",tags:["free clinic","primary care","uninsured"]},
{id:"health-004",name:"Centerstone — Behavioral Health",category:"health",description:"Outpatient mental health and substance use treatment. Accepts Medicaid and sliding scale.",address:"1632 S 3rd St, Terre Haute, IN 47802",phone:"812-231-1234",hours:"Mon–Fri 8am–5pm",website:"https://www.centerstone.org",requirements:"Call to schedule intake. Insurance and self-pay accepted.",busRoute:"",lastVerified:"2026-04",tags:["mental health","substance use","Medicaid","behavioral health"]},
{id:"recovery-009",name:"Kathy's Hope Halfway House — Women's Recovery Housing",category:"recovery",description:"Women-focused recovery and transitional housing in Terre Haute.",address:"Terre Haute — call for address",phone:"",hours:"Call to inquire",website:"",requirements:"Women only. Committed to recovery.",busRoute:"",lastVerified:"2026-04",tags:["sober living","women","recovery housing","halfway house"]},
{id:"crisis-004",name:"Terre Haute CARES — Overdose & Recovery",category:"crisis",description:"Harm reduction, naloxone distribution, and recovery navigation for those struggling with addiction.",address:"Call for current location",phone:"812-917-0100",hours:"Mon–Fri 9am–5pm",website:"",requirements:"None. Naloxone available at no cost.",busRoute:"",lastVerified:"2026-04",tags:["overdose","naloxone","Narcan","harm reduction","addiction"]},
{id:"housing-004",name:"CAPWI — Emergency Rental & Utility Assistance",category:"housing",description:"One-time emergency help to prevent eviction or utility shutoff.",address:"705 S 5th St, Terre Haute, IN 47807",phone:"812-232-1264",hours:"Mon–Fri 8am–4:30pm",website:"https://www.capwi.org",requirements:"Bring proof of income, lease, and utility bill. Funds limited — call early.",busRoute:"",lastVerified:"2026-04",tags:["rental assistance","eviction prevention","utility shutoff"]},
{id:"employment-006",name:"Transportation to Work Vouchers — CAPWI",category:"employment",description:"Gas cards or bus passes for new employees.",address:"705 S 5th St",phone:"812-232-1264",hours:"Mon–Fri",website:"",requirements:"Proof of employment offer.",busRoute:"",lastVerified:"2026-04",tags:["transport to work"]},
{id:"transport-004",name:"Volunteer Driver Program — CAPWI",category:"transportation",description:"Free rides to food pantries, clinics, and jobs.",address:"705 S 5th St",phone:"812-232-1264",hours:"By appointment",website:"",requirements:"None.",busRoute:"",lastVerified:"2026-04",tags:["volunteer rides"]},
{id:"children-003",name:"Foster Care Support Group — CAPWI",category:"children",description:"Support and resources for foster families.",address:"705 S 5th St",phone:"812-232-1264",hours:"Monthly",website:"",requirements:"None.",busRoute:"",lastVerified:"2026-04",tags:["foster care"]},
{id:"children-008",name:"Childcare Resource & Referral — CAPWI",category:"children",description:"Help finding licensed daycare providers.",address:"705 S 5th St",phone:"812-232-1264",hours:"Mon–Fri",website:"",requirements:"None.",busRoute:"",lastVerified:"2026-04",tags:["childcare referral"]},
{id:"financial-002",name:"Vigo County Township Trustee — Emergency Cash",category:"financial",description:"One-time help for rent, utilities, or burial costs.",address:"1440 S 3rd St, Terre Haute, IN 47802",phone:"812-462-3205",hours:"Mon–Fri 8am–4pm",website:"",requirements:"Proof of residency and need.",busRoute:"",lastVerified:"2026-04",tags:["cash assistance","burial","rent"]},
{id:"employment-008",name:"ID Recovery for Reentry — BMV Help Desk",category:"employment",description:"Help obtaining birth certificates and state IDs post-incarceration.",address:"Vigo County BMV, 1440 S 3rd St",phone:"812-462-3245",hours:"Mon–Fri",website:"",requirements:"Court papers.",busRoute:"",lastVerified:"2026-04",tags:["ID recovery","reentry"]},
{id:"children-002",name:"DCFS / DCS Navigation Help",category:"children",description:"Guidance if your family is involved with child welfare.",address:"Vigo County DCS Office, 1440 S 3rd St",phone:"812-462-3200",hours:"Mon–Fri",website:"",requirements:"Case number.",busRoute:"",lastVerified:"2026-04",tags:["DCFS","child welfare"]},
{id:"legal-004",name:"Tenant Rights Hotline — Indiana Legal Services",category:"legal",description:"Advice on evictions, habitability, and landlord disputes.",address:"Phone only",phone:"812-232-1201",hours:"Mon–Fri 9am–4pm",website:"",requirements:"None for initial call.",busRoute:"",lastVerified:"2026-04",tags:["tenant rights","eviction prevention"]},
{id:"immigration-001",name:"DACA Renewal Help — Indiana Legal Services",category:"immigration",description:"Assistance renewing DACA and work permits.",address:"Phone intake",phone:"812-232-1201",hours:"Mon–Fri",website:"",requirements:"DACA recipient.",busRoute:"",lastVerified:"2026-04",tags:["DACA"]},
```

### Corrected (19, as they were before this patch; financial-014 and financial-015 added in the final search corrections)

```js
{id:"financial-014",name:"Honey Creek Township Trustee",category:"financial",description:"Emergency assistance for rent, utilities, and basic needs in Honey Creek Township.",address:"6553 S Carlisle St, Terre Haute, IN 47802",phone:"812-235-1012",hours:"Mon–Fri 8am–4pm",website:"",requirements:"Proof of residency and need.",busRoute:"",lastVerified:"2026-04",tags:["trustee","emergency cash"]},
{id:"financial-015",name:"Lost Creek Township Trustee",category:"financial",description:"Emergency assistance for rent, utilities, and basic needs in Lost Creek Township.",address:"9550 US Hwy 40, Terre Haute, IN 47803",phone:"812-877-3415",hours:"Mon–Fri 8am–4pm",website:"",requirements:"Proof of residency and need.",busRoute:"",lastVerified:"2026-04",tags:["trustee","emergency cash"]},
{id:"food-002",name:"CAPWI — Food Assistance & SNAP",category:"food",description:"Food assistance and SNAP application help for low-income Vigo County residents.",address:"705 S 5th St, Terre Haute, IN 47807",phone:"812-232-1264",hours:"Mon–Fri 8am–4:30pm",website:"https://www.capwi.org",requirements:"Income verification required for SNAP enrollment.",busRoute:"",lastVerified:"2026-04",tags:["SNAP","food assistance"]},
{id:"food-004",name:"Vigo County WIC Program",category:"food",description:"WIC nutrition program for pregnant women, new mothers, and children under 5.",address:"705 S 5th St, Terre Haute, IN 47807",phone:"812-232-6306",hours:"Mon–Fri 8am–4:30pm",website:"",requirements:"Must be pregnant, postpartum, or have a child under 5. Income limits apply.",busRoute:"Downtown — multiple routes",lastVerified:"2026-04",tags:["WIC","women","infants","children","nutrition"]},
{id:"housing-003",name:"Vigo County Housing Authority — Section 8",category:"housing",description:"Housing Choice Voucher program for low-income renters. Call to check if waitlist is open.",address:"2001 N 19th St, Terre Haute, IN 47804",phone:"812-232-1381",hours:"Mon–Fri 8am–4:30pm",website:"https://www.terrehautehousing.org",requirements:"Income limits apply. Background check required.",busRoute:"",lastVerified:"2026-04",tags:["Section 8","rental assistance","low income housing"]},
{id:"legal-001",name:"Indiana Legal Services — Terre Haute Office",category:"legal",description:"Free civil legal aid for income-eligible residents (evictions, benefits, custody, etc.).",address:"1515 S 3rd St, Terre Haute, IN 47802",phone:"812-232-1201",hours:"Mon–Fri 9am–5pm (intake by phone)",website:"https://indianalegalservices.org",requirements:"Income ≤ 200% FPL. Call for screening.",busRoute:"Route 3",lastVerified:"2026-04",tags:["legal aid","civil","eviction","benefits"]},
{id:"legal-011",name:"Immigration Legal Aid — Indiana Legal Services",category:"legal",description:"DACA renewals, naturalization, and deportation defense.",address:"Phone intake only",phone:"812-232-1201",hours:"Mon–Fri",website:"",requirements:"Income screening.",busRoute:"",lastVerified:"2026-04",tags:["immigration","DACA"]},
{id:"immigration-004",name:"Immigration Legal Aid Referral",category:"immigration",description:"Connection to experienced immigration attorneys.",address:"Indiana Legal Services",phone:"812-232-1201",hours:"",website:"",requirements:"None.",busRoute:"",lastVerified:"2026-04",tags:["immigration legal"]},
{id:"financial-001",name:"LIHEAP Utility Assistance — WICAA / CAPWI",category:"financial",description:"Help paying winter heating bills (Nov–Feb).",address:"705 S 5th St, Terre Haute, IN 47807",phone:"812-232-1264",hours:"Mon–Fri 8am–4:30pm",website:"https://www.capwi.org",requirements:"Income proof and utility bill.",busRoute:"",lastVerified:"2026-04",tags:["LIHEAP","utilities","energy assistance"]},
{id:"financial-005",name:"TANF Cash Assistance — CAPWI",category:"financial",description:"Temporary cash aid for families with children.",address:"705 S 5th St",phone:"812-232-1264",hours:"Mon–Fri 8am–4:30pm",website:"",requirements:"Income and work requirements.",busRoute:"",lastVerified:"2026-04",tags:["TANF","cash aid"]},
{id:"financial-008",name:"Burial Assistance — Vigo County Trustee",category:"financial",description:"Help with funeral costs for low-income residents.",address:"1440 S 3rd St",phone:"812-462-3205",hours:"Mon–Fri 8am–4pm",website:"",requirements:"Proof of death and income.",busRoute:"",lastVerified:"2026-04",tags:["burial assistance"]},
{id:"financial-011",name:"Credit & Budget Counseling — CAPWI",category:"financial",description:"Free financial literacy and debt counseling.",address:"705 S 5th St",phone:"812-232-1264",hours:"By appointment",website:"",requirements:"None.",busRoute:"",lastVerified:"2026-04",tags:["budget help","credit repair"]},
{id:"financial-012",name:"Veterans Emergency Assistance",category:"financial",description:"Funds for veterans facing housing or utility crises.",address:"Vigo County Veterans Office, 1440 S 3rd St",phone:"812-462-3245",hours:"Mon–Fri 8am–4pm",website:"",requirements:"DD-214 and proof of need.",busRoute:"",lastVerified:"2026-04",tags:["veterans","emergency cash"]},
{id:"financial-013",name:"Harrison Township Trustee",category:"financial",description:"Emergency cash, rent, utilities, and burial assistance for Harrison Township residents.",address:"721 Elm St, Terre Haute, IN 47807",phone:"812-232-5052",hours:"Mon–Fri 8:30am–4pm",website:"",requirements:"Proof of residency and need. Denial from other sources may be required.",busRoute:"",lastVerified:"2026-04",tags:["trustee","emergency cash","rent","utilities"]},
{id:"education-002",name:"Head Start / Early Head Start — WICAA",category:"education",description:"Free preschool and childcare for ages 0–5.",address:"705 S 5th St",phone:"812-232-1264",hours:"Mon–Fri",website:"",requirements:"Income eligible.",busRoute:"",lastVerified:"2026-04",tags:["head start","preschool"]},
{id:"education-003",name:"Childcare Subsidy (CCDF Vouchers) — CAPWI",category:"education",description:"Help paying for daycare while working or in school.",address:"705 S 5th St",phone:"812-232-1264",hours:"Mon–Fri",website:"",requirements:"Income and work/school proof.",busRoute:"",lastVerified:"2026-04",tags:["childcare subsidy"]},
{id:"children-007",name:"WIC — Women, Infants & Children",category:"children",description:"Nutrition and formula support.",address:"705 S 5th St",phone:"812-232-6306",hours:"Mon–Fri",website:"",requirements:"Pregnant or child <5.",busRoute:"",lastVerified:"2026-04",tags:["WIC"]},
{id:"other-003",name:"Indiana BMV — State Identification Card",category:"other",description:"An Indiana identification card normally costs $9. A free ID card may be issued to a United States citizen who is at least 18 and eligible to vote, when requested for voting purposes.",address:"2920 Professional Ln, Terre Haute, IN 47802",phone:"888-692-6841",hours:"Check the official BMV branch page for current hours",website:"https://www.in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/identification-cards",requirements:"Bring documents proving identity, lawful status, Social Security number, and two proving Indiana residency. Check the official BMV document list before traveling.",busRoute:"",lastVerified:"2026-08",tags:["state ID","identification","BMV","photo ID","voter ID"]},
{id:"other-004",name:"Vigo County Vital Statistics — Birth Certificate",category:"other",description:"Certified copies of Indiana birth certificates for births recorded in Vigo County. Identification and eligibility requirements apply.",address:"171 Oak St, Terre Haute, IN 47807",phone:"812-462-3442",hours:"Mon–Fri 8:15am–3:45pm, excluding holidays",website:"https://www.vigocounty.in.gov",requirements:"Call 812-462-3442 before traveling to confirm the current fee, accepted payment methods, and which identification documents will be accepted in your situation.",busRoute:"Downtown, multiple routes",lastVerified:"2026-08",tags:["birth certificate","vital records","identification","vital statistics"]},
```
