import { renderTemplate } from './templates.js';
import { setupFormBehaviour } from './validation.js';

const routes = {
  '/': () => renderTemplate('home'),
  '/form': () => renderTemplate('form'),
  '/sobre': () => renderTemplate('sobre')
};

function getPath(){
  const hash = location.hash || '#/';
  const path = hash.slice(1).split('?')[0];
  return path === '' ? '/' : path;
}

function onRoute(){
  const path = getPath();
  const view = routes[path];
  const app = document.getElementById('app');
  if(!view){
    app.innerHTML = '<div class="card"><h2>Página não encontrada</h2></div>';
    return;
  }
  view();
  // After template rendered, attach any dynamic behaviours (e.g., form)
  if(path === '/form') setupFormBehaviour();
}

export function initRouter(){
  // initial render
  onRoute();
  window.addEventListener('hashchange', onRoute);
  // catch nav clicks
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-link]');
    if(!a) return;
    e.preventDefault();
    const href = a.getAttribute('href') || '';
    // normalize: remove leading '#' so setting location.hash creates a single '#'
    const target = href.replace(/^#/, '');
    location.hash = target;
  });
}
