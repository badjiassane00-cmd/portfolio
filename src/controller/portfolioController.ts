export function initPortfolioController(): void {
  const themeButton = document.querySelector<HTMLButtonElement>('.theme-toggle');
  const themeIcon = document.querySelector<HTMLElement>('.theme-icon');
  const storedTheme = localStorage.getItem('portfolio-theme');
  if (storedTheme === 'dark') document.documentElement.dataset.theme = 'dark';
  if (themeIcon) themeIcon.textContent = storedTheme === 'dark' ? '☀' : '☾';

  themeButton?.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    if (themeIcon) themeIcon.textContent = isDark ? '☀' : '☾';
  });

  const filterButtons = [...document.querySelectorAll<HTMLButtonElement>('.filter-button')];
  const updateProjects = (filter: string): void => document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    updateProjects(button.dataset.filter ?? 'all');
  }));

  const revealTargets = document.querySelectorAll<HTMLElement>('.immersive-banner, .section-heading, .skill-card, .project-card, .contact-card');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible'); observer.unobserve(entry.target);
    }), { threshold: 0.12 });
    revealTargets.forEach((element) => { element.classList.add('scroll-reveal'); revealObserver.observe(element); });
  }

  const header = document.querySelector<HTMLElement>('.site-header');
  const progress = document.querySelector<HTMLElement>('.scroll-progress span');
  const floating = document.querySelector<HTMLElement>('.floating-contact');
  let scrollFrame = 0;
  const updateScroll = (): void => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    floating?.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.7);
    if (progress) progress.style.transform = `scaleX(${Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))})`;
  };
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => { updateScroll(); scrollFrame = 0; });
  }, { passive: true });
  updateScroll();

  const navigationLinks = [...document.querySelectorAll<HTMLAnchorElement>('.main-nav a')];
  const navigationSections = navigationLinks.map((link) => document.querySelector<HTMLElement>(link.hash)).filter((section): section is HTMLElement => section !== null);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      navigationLinks.forEach((link) => {
        const active = link.hash === `#${current.target instanceof HTMLElement ? current.target.id : ''}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5] });
    navigationSections.forEach((section) => navObserver.observe(section));
  }

  const technologyGroups = [...document.querySelectorAll<HTMLDetailsElement>('.technology-group')];
  technologyGroups.forEach((group) => group.addEventListener('toggle', () => {
    if (group.open) technologyGroups.forEach((other) => { if (other !== group) other.open = false; });
  }));

  const copyButton = document.querySelector<HTMLButtonElement>('.copy-email');
  copyButton?.addEventListener('click', async () => {
    const email = copyButton.dataset.copyEmail;
    if (!email) return;
    try { await navigator.clipboard.writeText(email); copyButton.textContent = 'Adresse copiée ✓'; }
    catch { copyButton.textContent = 'Copie non disponible'; }
    window.setTimeout(() => { if (copyButton.isConnected) copyButton.textContent = 'Copier l’adresse'; }, 2200);
  });

  const video = document.querySelector<HTMLVideoElement>('.hero-background');
  const videoToggle = document.querySelector<HTMLButtonElement>('.video-toggle');
  const syncVideoControl = (): void => {
    const paused = video?.paused ?? true;
    videoToggle?.setAttribute('aria-pressed', String(paused));
    videoToggle?.setAttribute('aria-label', paused ? 'Lire la vidéo' : 'Mettre la vidéo en pause');
    const label = videoToggle?.querySelector<HTMLElement>('.video-toggle-label');
    const icon = videoToggle?.querySelector<HTMLElement>('.video-toggle-icon');
    if (label) label.textContent = paused ? 'Lire la vidéo' : 'Pause vidéo';
    if (icon) icon.textContent = paused ? '▶' : 'Ⅱ';
  };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) video?.pause();
  syncVideoControl();
  video?.addEventListener('play', syncVideoControl); video?.addEventListener('pause', syncVideoControl);
  videoToggle?.addEventListener('click', () => { if (!video) return; if (video.paused) void video.play().catch(syncVideoControl); else video.pause(); });

  const skill = document.querySelector<HTMLElement>('.rotating-skill');
  const words = (skill?.dataset.words ?? '').split('|');
  if (skill && words.length > 1 && !reducedMotion) {
    let index = 0;
    window.setInterval(() => { skill.classList.add('is-changing'); window.setTimeout(() => { index = (index + 1) % words.length; if (skill.isConnected) skill.textContent = words[index] ?? ''; skill.classList.remove('is-changing'); }, 220); }, 2600);
  }

  if (window.matchMedia('(pointer: fine)').matches && !reducedMotion) {
    const hero = document.querySelector<HTMLElement>('.hero');
    hero?.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty('--video-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * -9}px`);
      hero.style.setProperty('--video-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -6}px`);
    });
    hero?.addEventListener('pointerleave', () => { hero.style.setProperty('--video-x', '0px'); hero.style.setProperty('--video-y', '0px'); });
    document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty('--tilt-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 3}deg`);
        card.style.setProperty('--tilt-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -3}deg`);
      });
      card.addEventListener('pointerleave', () => { card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); });
    });
  }
}
