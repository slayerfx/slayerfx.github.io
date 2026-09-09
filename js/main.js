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

const majBarre = () => topbar.classList.toggle('is-stuck', window.scrollY > 8);

majBarre();
window.addEventListener('scroll', majBarre, { passive: true });

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
