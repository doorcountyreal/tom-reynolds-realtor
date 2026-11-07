(() => {
  'use strict';
  const opener = document.querySelector('.menu-button');
  const overlay = document.querySelector('.menu-overlay');
  if (opener && overlay) {
    const close = overlay.querySelector('.menu-close');
    const setMenu = (open) => {
      document.body.classList.toggle('menu-open', open);
      overlay.setAttribute('aria-hidden', String(!open));
      opener.setAttribute('aria-expanded', String(open));
      if (open) close?.focus(); else opener.focus({preventScroll: true});
    };
    opener.addEventListener('click', () => setMenu(true));
    close?.addEventListener('click', () => setMenu(false));
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (event) => {
      if (!document.body.classList.contains('menu-open')) return;
      if (event.key === 'Escape') { event.preventDefault(); setMenu(false); }
      if (event.key === 'Tab') {
        const items = [...overlay.querySelectorAll('a[href],button:not([disabled])')];
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
        else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
      }
    });
  }
  const normalize = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  document.querySelectorAll('input[data-filter]').forEach(input => {
    const container = document.querySelector(input.dataset.filter);
    if (!container) return;
    const cards = [...container.querySelectorAll('[data-search]')];
    const status = input.closest('section')?.querySelector('.filter-status');
    const update = () => {
      const words = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
      let shown = 0;
      cards.forEach(card => {
        const match = words.every(word => normalize(card.dataset.search).includes(word));
        card.hidden = !match;
        if (match) shown += 1;
      });
      if (status) status.textContent = `${shown} ${shown === 1 ? 'guide' : 'guides'} shown${shown ? '' : '. Try a broader place or topic; the full directory is below.'}`;
    };
    input.addEventListener('input', update);
    update();
  });
})();
