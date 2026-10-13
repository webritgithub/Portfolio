// Apply the saved palette before styles paint to avoid a theme flash.
try {
  if (localStorage.getItem('rp-theme') === 'light') {
    document.documentElement.dataset.theme = 'light';
  }
} catch (_) {
  // Storage may be unavailable in private or restricted browser contexts.
}
