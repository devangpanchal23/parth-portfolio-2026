const SCROLL_EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const SCROLL_DURATION = 1.4;

const HOME_SECTIONS = new Set(['work', 'about', 'contact']);

export function getSectionIdFromHref(href) {
  if (!href) return null;
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return null;
  const id = href.slice(hashIndex + 1);
  return id || null;
}

export function isHomeSectionLink(href) {
  const id = getSectionIdFromHref(href);
  return id ? HOME_SECTIONS.has(id) : false;
}

export function scrollToSection(target, options = {}) {
  const el =
    typeof target === 'string'
      ? document.getElementById(target.replace(/^#/, ''))
      : target;

  if (!el) return false;

  if (window.lenis) {
    window.lenis.scrollTo(el, {
      duration: options.duration ?? SCROLL_DURATION,
      easing: options.easing ?? SCROLL_EASING,
      ...options,
    });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return true;
}
