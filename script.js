const reveals = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 120}ms`;
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((el) => observer.observe(el));

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const cookieBanner = document.getElementById("cookieBanner");
const cookiePanel = document.getElementById("cookiePanel");
const cookieAccept = document.getElementById("cookieAccept");
const cookieNecessary = document.getElementById("cookieNecessary");
const cookieSettings = document.getElementById("cookieSettings");
const cookieSave = document.getElementById("cookieSave");
const cookieAnalytics = document.getElementById("cookieAnalytics");
const cookieMarketing = document.getElementById("cookieMarketing");

const COOKIE_KEY = "dp_cookie_preferences";

const setCookies = (prefs) => {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
  if (cookieBanner) cookieBanner.classList.remove("is-visible");
};

const getCookies = () => {
  const stored = localStorage.getItem(COOKIE_KEY);
  return stored ? JSON.parse(stored) : null;
};

const initCookieBanner = () => {
  if (!cookieBanner) return;

  const existing = getCookies();
  if (!existing) {
    cookieBanner.classList.add("is-visible");
    return;
  }

  if (cookieAnalytics) cookieAnalytics.checked = !!existing.analytics;
  if (cookieMarketing) cookieMarketing.checked = !!existing.marketing;
};

if (cookieSettings && cookiePanel) {
  cookieSettings.addEventListener("click", () => {
    cookiePanel.classList.toggle("is-open");
  });
}

if (cookieAccept) {
  cookieAccept.addEventListener("click", () => {
    setCookies({ necessary: true, analytics: true, marketing: true });
  });
}

if (cookieNecessary) {
  cookieNecessary.addEventListener("click", () => {
    setCookies({ necessary: true, analytics: false, marketing: false });
  });
}

if (cookieSave && cookieAnalytics && cookieMarketing) {
  cookieSave.addEventListener("click", () => {
    setCookies({
      necessary: true,
      analytics: cookieAnalytics.checked,
      marketing: cookieMarketing.checked,
    });
  });
}

initCookieBanner();
