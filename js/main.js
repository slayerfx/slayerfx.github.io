/* =============================================================================
   Portfolio — interactions.

   Amelioration progressive : la page est entierement lisible sans ce fichier.
   Les etats de depart des animations ne sont poses qu'apres que le script a
   ajoute la classe `js-reveal` sur <html> — si le script echoue ou ne se
   charge pas, rien n'est masque.
   ============================================================================= */
'use strict';

const REDUIT = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------- barre haute */

const topbar = document.querySelector('.topbar');
const jauge = topbar.querySelector('.jauge span');

/* Un seul gestionnaire de defilement pour la barre et la jauge, et un seul
   ecrivain par trame : le navigateur emet des dizaines d'evenements de
   defilement par seconde, il est inutile de recalculer autant de fois. */
let trameDemandee = false;

function majBarre() {
  topbar.classList.toggle('is-stuck', window.scrollY > 8);

  const parcourable = document.documentElement.scrollHeight - window.innerHeight;
  const lu = parcourable > 0 ? window.scrollY / parcourable : 0;
  jauge.style.setProperty('--lu', Math.min(1, Math.max(0, lu)).toFixed(4));
}

majBarre();

window.addEventListener('scroll', () => {
  if (trameDemandee) return;
  trameDemandee = true;
  requestAnimationFrame(() => {
    majBarre();
    trameDemandee = false;
  });
}, { passive: true });

/* ------------------------------------------------- section en cours de lecture */

/* La navigation marque la section qu'on est en train de lire. `aria-current`
   plutot qu'une classe : l'information est alors portee par le balisage, donc
   annoncee aux lecteurs d'ecran, et sert aussi de crochet de style. */
const liens = new Map();
for (const lien of topbar.querySelectorAll('nav a[href^="#"]')) {
  const cible = document.querySelector(lien.getAttribute('href'));
  if (cible) liens.set(cible, lien);
}

if (liens.size && 'IntersectionObserver' in window) {
  const visibles = new Set();

  const marquer = () => {
    // La section retenue est la plus haute de celles actuellement traversees.
    const courante = [...visibles].sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
    )[0];

    for (const [section, lien] of liens) {
      if (section === courante) lien.setAttribute('aria-current', 'true');
      else lien.removeAttribute('aria-current');
    }
  };

  const veille = new IntersectionObserver((entrees) => {
    for (const e of entrees) {
      if (e.isIntersecting) visibles.add(e.target);
      else visibles.delete(e.target);
    }
    marquer();
  }, {
    // Ne considere qu'une bande dans le tiers superieur de l'ecran : c'est la
    // que se trouve ce qu'on lit reellement.
    rootMargin: '-16% 0px -72% 0px',
  });

  for (const section of liens.keys()) veille.observe(section);
}

/* ----------------------------------------------------------- compteurs */

/* Fait monter un nombre jusqu'a sa valeur finale. Le HTML contient deja cette
   valeur : on ne fait que la remplacer temporairement, donc un echec ici laisse
   le bon chiffre affiche. */
function compter(el) {
  const cible = Number(el.dataset.count);
  if (!Number.isFinite(cible)) return;

  const DUREE = 850;
  const debut = performance.now();

  const pas = (maintenant) => {
    const t = Math.min(1, (maintenant - debut) / DUREE);
    const adouci = 1 - (1 - t) ** 3;          // sortie cubique
    el.textContent = Math.round(cible * adouci);
    if (t < 1) requestAnimationFrame(pas);
    else el.textContent = cible;              // valeur exacte a l'arrivee
  };

  requestAnimationFrame(pas);
}

/* --------------------------------------------------------- apparitions */

if (!REDUIT && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal');

  /* Dans un groupe, chaque element part legerement apres le precedent. Le
     decalage est plafonne : au-dela, l'attente devient perceptible. */
  document.querySelectorAll('[data-reveal-group]').forEach((groupe) => {
    groupe.querySelectorAll('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--retard', `${Math.min(i, 6) * 70}ms`);
    });
  });

  const observateur = new IntersectionObserver((entrees) => {
    for (const entree of entrees) {
      if (!entree.isIntersecting) continue;
      entree.target.classList.add('is-visible');
      observateur.unobserve(entree.target);   // une seule fois, jamais au retour

      entree.target.querySelectorAll('[data-count]').forEach(compter);
    }
  }, {
    // Declenche un peu avant que l'element ne touche le bas de l'ecran, pour
    // que l'animation soit deja en cours quand le regard y arrive.
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
  });

  document.querySelectorAll('[data-reveal]').forEach((el) => observateur.observe(el));
}

/* ------------------------------------------------------- halos de l'accroche */

/* Les deux halos suivent le pointeur de quelques dizaines de pixels. C'est
   assez pour que la page respire, trop peu pour distraire.

   Rien n'est fait au clavier ni au doigt : `pointer: fine` exclut les ecrans
   tactiles, ou l'effet n'aurait aucun sens. Et la position n'est ecrite qu'une
   fois par trame, pas a chaque evenement — le pointeur en emet des centaines
   par seconde. */
const accroche = document.querySelector('.hero');
const survolPrecis = window.matchMedia('(pointer: fine)').matches;

if (accroche && survolPrecis && !REDUIT) {
  let enAttente = false;
  let x = 0;
  let y = 0;

  window.addEventListener('pointermove', (e) => {
    // Ramene la position dans [-1, 1], centre de l'ecran a zero.
    x = (e.clientX / window.innerWidth) * 2 - 1;
    y = (e.clientY / window.innerHeight) * 2 - 1;

    if (enAttente) return;
    enAttente = true;
    requestAnimationFrame(() => {
      accroche.style.setProperty('--px', x.toFixed(3));
      accroche.style.setProperty('--py', y.toFixed(3));
      enAttente = false;
    });
  }, { passive: true });
}
