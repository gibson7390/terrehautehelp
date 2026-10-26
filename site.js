/* Terre Haute Help — site.js
   Global behaviour required on every page.

   Loaded by all six pages. Must stay small, dependency-free, and free of
   anything specific to the resource directory (that lives in app.js, which
   only index.html loads).

   Phase 2 note: this file is the intended home for site-wide chrome behaviour
   such as a mobile navigation toggle, a language switcher, or a utility row.
   Keep it independent of resources.js. */

(function () {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ── Skip link — WCAG 2.4.1 ──
     Moving the hash alone changes scroll position but not keyboard focus in
     several browsers, so the next Tab would resume from the top of the page.
     Setting tabindex="-1" and calling focus() makes the bypass real.

     Guarded so this runs once even if a page were ever to load both site.js
     and a script that duplicated the behaviour. */
  function initSkipLink() {
    var skip = document.querySelector(".skip-link");
    var main = document.getElementById("main");
    if (!skip || !main || skip.dataset.bound === "true") return;

    skip.dataset.bound = "true";
    skip.addEventListener("click", function (e) {
      e.preventDefault();
      main.setAttribute("tabindex", "-1");
      main.focus();
      main.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start"
      });
    });

    /* Drop the temporary tabindex once focus leaves, so <main> does not stay
       in the accessibility tree as a focusable element. */
    main.addEventListener("blur", function () {
      main.removeAttribute("tabindex");
    });
  }

  /* ── Sticky chrome measurement — supports WCAG 2.4.11 ──
     .site-chrome contains the crisis bar and the header and is the only
     sticky element. Its height changes with zoom, text enlargement, and
     wrapping, so --sticky-offset is measured rather than hard-coded.

     The stylesheet ships a static fallback, so this is enhancement only:
     if JavaScript never runs, anchor offsets are still approximately right. */
  function initStickyOffset() {
    var chrome = document.querySelector(".site-chrome");
    if (!chrome) return;

    function measure() {
      var h = Math.ceil(chrome.getBoundingClientRect().height);
      if (h > 0) {
        document.documentElement.style.setProperty("--sticky-offset", h + 16 + "px");
      }
    }

    measure();

    if (typeof ResizeObserver === "function") {
      new ResizeObserver(measure).observe(chrome);
    } else {
      window.addEventListener("resize", measure);
      window.addEventListener("orientationchange", measure);
    }

    /* Webfonts can change chrome height after first paint. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure).catch(function () {});
    }
  }

  /* ── Arriving at a #fragment — supports WCAG 2.4.11 ──
     The browser jumps to the target before webfonts load; the text above it
     then grows and pushes the target down, out of view. Once fonts are ready,
     re-align the target, unless the visitor has already scrolled. */
  function initFragmentAlignment() {
    /* A malformed fragment ("#%E0") makes decodeURIComponent throw; such a
       link has no target to align, so the page is simply left as loaded. */
    var id;
    try { id = decodeURIComponent((window.location.hash || "").slice(1)); }
    catch (e) { return; }
    var target = id && document.getElementById(id);
    if (!target || !document.fonts || !document.fonts.ready) return;
    var moved = false;
    function onScrollIntent() { moved = true; }
    ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (type) {
      window.addEventListener(type, onScrollIntent, { once: true, passive: true });
    });
    /* The short delay lets the sticky-offset measurement above, which also
       waits for fonts, update scroll-margin-top first. */
    document.fonts.ready.then(function () {
      window.setTimeout(function () {
        if (moved) return;
        /* "instant": a one-off correction, not a smooth scroll the visitor
           watches. Older browsers without it get the plain call. */
        try { target.scrollIntoView({ behavior: "instant", block: "start" }); }
        catch (e) { target.scrollIntoView(true); }
      }, 150);
    }).catch(function () {});
  }

  function init() {
    initSkipLink();
    initStickyOffset();
    initFragmentAlignment();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
