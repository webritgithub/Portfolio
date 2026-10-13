const themeToggle = document.querySelector('#theme-toggle');
function syncThemeToggle() {
  const light = document.documentElement.dataset.theme === 'light';
  themeToggle.setAttribute('aria-pressed', String(light));
  themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  themeToggle.title = light ? 'Switch to dark theme' : 'Switch to light theme';
}
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('rp-theme', theme); } catch (_) {}
  syncThemeToggle();
});
syncThemeToggle();

const intro = document.querySelector('#intro');
const site = document.querySelector('#site');
const skip = document.querySelector('#skip');
const replay = document.querySelector('#replay');
const chapter = document.querySelector('#chapter');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let timers = [];
let playing = false;
let previousFocus;
function finish() {
  if (!playing) return;
  playing = false;
  timers.forEach(clearTimeout);
  timers = [];
  intro.hidden = true;
  intro.classList.remove('playing');
  site.inert = false;
  document.body.style.overflow = '';
  try { sessionStorage.setItem('rp-intro-seen', 'yes'); } catch (_) {}
  if (previousFocus && previousFocus !== document.body) previousFocus.focus({preventScroll:true});
  else document.querySelector('.logo').focus({preventScroll:true});
}
function start() {
  if (motion.matches || playing) return;
  previousFocus = document.activeElement;
  playing = true;
  intro.hidden = false;
  site.inert = true;
  document.body.style.overflow = 'hidden';
  chapter.textContent = 'THE WILD CARD';
  void intro.offsetWidth;
  intro.classList.add('playing');
  skip.focus();
  [[4200,'ABOVE THE CLOUDS'],[8000,'AN UNEXPECTED ARRIVAL'],[11000,'INTO THE DARK'],[12600,'THE CREATOR']].forEach(([time,text]) => timers.push(setTimeout(() => chapter.textContent = text, time)));
  timers.push(setTimeout(finish,16000));
}
skip.addEventListener('click',finish);
replay.addEventListener('click',start);
document.addEventListener('keydown',event => {
  if (!playing) return;
  if (event.key === 'Escape') finish();
  if (event.key === 'Tab') { event.preventDefault(); skip.focus(); }
});
function updateMotion() {
  replay.hidden = motion.matches;
  if (motion.matches) finish();
}
motion.addEventListener('change',updateMotion);
updateMotion();
let seen = false;
try { seen = sessionStorage.getItem('rp-intro-seen') === 'yes'; } catch (_) {}
if (!seen && !location.hash) start();
