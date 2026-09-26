// Explicit URLs take priority over saved preferences. Storage is optional.
(() => {
  const current = document.documentElement.lang;
  const requested = new URLSearchParams(location.search).get('lang');
  try {
    if (requested === 'ja' || requested === 'en') {
      localStorage.setItem('portfolio-language', requested);
      if (requested !== current) {
        location.replace((requested === 'en' ? './en.html?lang=en' : './?lang=ja') + location.hash);
      }
    } else if (current === 'ja' && localStorage.getItem('portfolio-language') === 'en') {
      location.replace('./en.html' + location.hash);
    }
  } catch (_) { /* Both pages remain usable when storage is unavailable. */ }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-language]').forEach(link => {
      link.href += location.hash;
      link.addEventListener('click', () => {
        try { localStorage.setItem('portfolio-language', link.dataset.language); } catch (_) {}
      });
    });
  });
})();
