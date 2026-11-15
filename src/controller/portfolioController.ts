import { projects } from '../model/portfolio';
import { renderProjectDialog } from '../view/portfolioView';
import { getLocale } from '../i18n';

const readTheme = (): string | null => {
  try { return localStorage.getItem('portfolio-theme'); } catch { return null; }
};

export function initPortfolioController(): void {
  const root = document.documentElement;
  const themeButton = document.querySelector<HTMLButtonElement>('.theme-toggle');
  const themeIcon = document.querySelector<HTMLElement>('.theme-icon');
  const applyTheme = (theme: 'light' | 'dark'): void => {
    root.dataset.theme = theme;
    themeButton?.setAttribute('aria-label', theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre');
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☼' : '◐';
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171915' : '#f3f6fb');
  };
  const theme = readTheme();
  applyTheme(theme === 'dark' ? 'dark' : 'light');
  themeButton?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('portfolio-theme', nextTheme); } catch { /* Keep the current page theme when storage is unavailable. */ }
  });

  const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const navigation = document.querySelector<HTMLElement>('.main-nav');
  const setMenuOpen = (open: boolean): void => {
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    navigation?.classList.toggle('is-open', open);
    root.classList.toggle('menu-open', open);
  };
  menuButton?.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation?.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenuOpen(false); });

  const filterButtons = [...document.querySelectorAll<HTMLButtonElement>('.filter-button')];
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter ?? 'all';
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) card.classList.add('filter-enter');
      window.setTimeout(() => card.classList.remove('filter-enter'), 260);
    });
  }));

  const dialog = document.querySelector<HTMLDialogElement>('#project-dialog');
  const dialogClose = dialog?.querySelector<HTMLButtonElement>('.dialog-close');
  let currentProjectIndex = 0;
  const openProject = (projectIndex: number): void => {
    currentProjectIndex = (projectIndex + projects.length) % projects.length;
    const project = projects[currentProjectIndex];
    if (!project || !dialog) return;
    renderProjectDialog(project, currentProjectIndex, projects.length);
    dialog.setAttribute('aria-label', `Fiche projet : ${project.name}`);
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>('.dialog-close')?.focus();
  };
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest<HTMLButtonElement>('[data-project]');
    if (!button) return;
    const projectIndex = projects.findIndex(({ name }) => name === button.dataset.project);
    if (projectIndex >= 0) openProject(projectIndex);
  });
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialogClose?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    if (target.dataset.projectStep === 'previous') openProject(currentProjectIndex - 1);
    if (target.dataset.projectStep === 'next') openProject(currentProjectIndex + 1);
  });
  window.addEventListener('portfolio:languagechange', () => {
    if (dialog?.open) renderProjectDialog(projects[currentProjectIndex]!, currentProjectIndex, projects.length);
  });
  dialog?.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches('[data-campusroom-demo]')) return;
    event.preventDefault();
    const data = new FormData(form);
    const room = String(data.get('room'));
    const start = String(data.get('start'));
    const end = String(data.get('end'));
    const status = form.querySelector<HTMLElement>('.campus-demo-status');
    const english = getLocale() === 'en';
    if (!start || !end || end <= start) {
      if (status) status.textContent = english ? 'Choose an end time later than the start time.' : 'Choisissez une heure de fin après l’heure de début.';
      return;
    }
    const sampleSlots: Record<string, Array<[string, string]>> = {
      A: [['09:00', '10:00'], ['13:00', '14:00']],
      B: [['10:00', '11:30'], ['15:00', '16:00']],
    };
    const conflict = (sampleSlots[room] ?? []).find(([from, to]) => start < to && end > from);
    if (status) status.textContent = conflict
      ? (english ? `This sample slot overlaps with ${conflict[0]}–${conflict[1]}. No booking was saved.` : `Ce créneau chevauche l’exemple ${conflict[0]}–${conflict[1]}. Aucune réservation n’a été enregistrée.`)
      : (english ? 'This sample slot appears available. No booking was saved.' : 'Ce créneau semble libre dans cette simulation. Aucune réservation n’a été enregistrée.');
  });
  dialog?.addEventListener('close', () => document.querySelector<HTMLButtonElement>(`[data-project="${CSS.escape(projects[currentProjectIndex]?.name ?? '')}"]`)?.focus());

  const heroVideo = document.querySelector<HTMLVideoElement>('#hero-presentation-video');
  if (heroVideo) {
    heroVideo.poster = '/assets/hero-poster.webp';
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncHeroMotion = (): void => {
      if (motionPreference.matches) {
        heroVideo.pause();
        return;
      }
      void heroVideo.play().catch(() => undefined);
    };
    syncHeroMotion();
    motionPreference.addEventListener('change', syncHeroMotion);
  }
  heroVideo?.addEventListener('play', () => document.querySelector('#accueil')?.classList.add('has-video-started'));
  heroVideo?.addEventListener('ended', () => document.querySelector('#accueil')?.classList.remove('has-video-started'));

  const copyStatus = document.querySelector<HTMLElement>('.copy-status');
  document.querySelector<HTMLButtonElement>('[data-copy-email]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const email = button.dataset.copyEmail ?? 'badjiassane00@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
      else {
        const field = document.createElement('textarea');
        field.value = email;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.append(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('Copie indisponible');
      }
      if (copyStatus) copyStatus.textContent = getLocale() === 'en' ? 'Email address copied.' : 'Adresse e-mail copiée.';
    } catch {
      if (copyStatus) copyStatus.textContent = getLocale() === 'en' ? `Could not copy. Address: ${email}` : `Copie impossible. Adresse : ${email}`;
    }
  });

  const form = document.querySelector<HTMLFormElement>('#contact-form');
  const formStatus = document.querySelector<HTMLElement>('#form-status');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (String(data.get('website') ?? '').trim()) {
      if (formStatus) formStatus.textContent = getLocale() === 'en' ? 'Your message could not be prepared. Try again or email badjiassane00@gmail.com directly.' : 'Votre message n’a pas pu être préparé. Réessayez ou écrivez directement à badjiassane00@gmail.com.';
      return;
    }
    if (!form.reportValidity()) return;
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const body = getLocale() === 'en' ? `Hello Assane,\n\n${message}\n\n${name}\n${email}` : `Bonjour Assane,\n\n${message}\n\n${name}\n${email}`;
    const mailto = `mailto:badjiassane00@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formStatus) formStatus.textContent = getLocale() === 'en' ? 'Your email app will open with the message ready. You will just need to send it.' : 'Votre application e-mail va s’ouvrir avec le message préparé. Il ne vous restera qu’à l’envoyer.';
    window.location.href = mailto;
  });

  const technologyGroups = [...document.querySelectorAll<HTMLDetailsElement>('.technology-group')];
  technologyGroups.forEach((group) => group.addEventListener('toggle', () => {
    if (group.open) technologyGroups.forEach((other) => { if (other !== group) other.open = false; });
  }));

  const header = document.querySelector<HTMLElement>('.site-header');
  const progress = document.querySelector<HTMLElement>('.scroll-progress span');
  const floating = document.querySelector<HTMLElement>('.floating-contact');
  let scrollFrame = 0;
  const updateScroll = (): void => {
    header?.classList.toggle('is-scrolled', window.scrollY > 20);
    floating?.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
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
        const active = link.hash === `#${(current.target as HTMLElement).id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.2, 0.45] });
    navigationSections.forEach((section) => navObserver.observe(section));
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll<HTMLElement>('.section-label, .about-principles > div, .technology-group, .project-card, .contact-form');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.1 });
    revealTargets.forEach((element) => { element.classList.add('scroll-reveal'); revealObserver.observe(element); });
  }

  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 1.5}deg`);
        card.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -1.5}deg`);
      });
      card.addEventListener('pointerleave', () => { card.style.setProperty('--pointer-x', '0deg'); card.style.setProperty('--pointer-y', '0deg'); });
    });
  }

  const skill = document.querySelector<HTMLElement>('.rotating-skill');
  const words = (skill?.dataset.words ?? '').split('|');
  if (skill && words.length > 1 && !reducedMotion) {
    let index = 0;
    window.setInterval(() => {
      skill.classList.add('is-changing');
      window.setTimeout(() => { const activeWords = (skill.dataset.words ?? '').split('|'); index = (index + 1) % activeWords.length; if (skill.isConnected) skill.textContent = activeWords[index] ?? ''; skill.classList.remove('is-changing'); }, 180);
    }, 2800);
  }
}
