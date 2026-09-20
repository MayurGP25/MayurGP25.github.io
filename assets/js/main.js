/* ---------------------------------------------------------------------------
   Site behaviour: theme toggle, header border, mobile menu, timeline filters,
   BibTeX toggle/copy, scroll reveal. No dependencies, no build step.
   --------------------------------------------------------------------------- */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  /* ---------------------------------------------------------------- theme */
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save("theme", next);
    });
  });

  /* --------------------------------------------------------------- header */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ----------------------------------------------------------- mobile nav */
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var nav = document.getElementById("site-nav");

  if (menuBtn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };
    menuBtn.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ------------------------------------------------------------- filters */
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var items = Array.prototype.slice.call(
      document.querySelectorAll(group.getAttribute("data-filter-target"))
    );
    var buttons = group.querySelectorAll("[data-filter]");

    buttons.forEach(function (btn) {
      var type = btn.getAttribute("data-filter");
      var n = type === "all" ? items.length : items.filter(function (it) {
        return it.getAttribute("data-type") === type;
      }).length;
      var count = btn.querySelector(".count");
      if (count) count.textContent = n;
      if (n === 0) btn.hidden = true;
    });

    group.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      var type = btn.getAttribute("data-filter");

      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      items.forEach(function (it) {
        it.hidden = type !== "all" && it.getAttribute("data-type") !== type;
      });
    });
  });

  /* --------------------------------------------------------------- BibTeX */
  document.querySelectorAll("[data-bibtex-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pre = document.getElementById(btn.getAttribute("data-bibtex-toggle"));
      if (!pre) return;
      pre.hidden = !pre.hidden;
      btn.setAttribute("aria-expanded", String(!pre.hidden));
    });
  });

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = document.getElementById(btn.getAttribute("data-copy"));
      if (!src || !navigator.clipboard) return;
      navigator.clipboard.writeText(src.textContent.trim()).then(function () {
        var label = btn.textContent;
        btn.textContent = "Copied ✓";
        setTimeout(function () { btn.textContent = label; }, 1400);
      });
    });
  });

  /* --------------------------------------------------------------- reveal */
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* --------------------------------------------------------------- footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
