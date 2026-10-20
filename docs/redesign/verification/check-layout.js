(() => {
  const missingImages = [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src'));
  const brokenAnchors = [...document.querySelectorAll('a[href^="#"]')].map(link => link.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(href.slice(1)));
  return JSON.stringify({
    viewport: [innerWidth, innerHeight],
    documentWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth > innerWidth,
    missingImages,
    brokenAnchors,
    h1Count: document.querySelectorAll('h1').length,
    menuOpen: !!document.querySelector('dialog[open]'),
    menuExpanded: document.querySelector('[aria-controls="home-menu"]')?.getAttribute('aria-expanded'),
    focusedControl: document.activeElement.getAttribute('aria-label'),
    bodyScrollLocked: document.body.style.overflow === 'hidden',
    hash: location.hash,
    scrollY,
    openStories: document.querySelectorAll('#stories details[open]').length,
    logo: document.querySelector('header img')?.getAttribute('src'),
  });
})()
