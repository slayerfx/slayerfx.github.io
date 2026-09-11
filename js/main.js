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

  // En bout de page, la derniere section ne peut plus monter jusqu'a la bande
  // de reperage : si elle est courte, la bande reste dans la precedente. C'est
  // pourtant bien elle qu'on lit, et celle qu'on vient de demander.
  const derniere = [...liens.keys()].pop();
  const enBas = () =>
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

  const marquer = () => {
    // Sinon, la section retenue est la plus haute de celles traversees.
    const courante = enBas() ? derniere : [...visibles].sort(
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

  // La bande ne bouge plus en bout de page : seul le defilement signale qu'on
  // y arrive ou qu'on en repart.
  let etaitEnBas = enBas();
  window.addEventListener('scroll', () => {
    const bas = enBas();
    if (bas !== etaitEnBas) {
      etaitEnBas = bas;
      marquer();
    }
  }, { passive: true });
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

/* ------------------------------------------------- copie de l'adresse */

/* Le bouton est ecrit `hidden` dans le HTML et n'apparait qu'ici : sans acces
   au presse-papier — contexte non securise, navigateur ancien, permission
   refusee — il ne rendrait aucun service, et un bouton qui ne fait rien est
   pire que pas de bouton. Le lien `mailto:` a cote, lui, marche partout. */
const copieur = document.querySelector('[data-copier]');

if (copieur && navigator.clipboard?.writeText) {
  const mot = copieur.querySelector('.copier-mot');
  let retour;

  copieur.hidden = false;

  copieur.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copieur.dataset.copier);
    } catch {
      // Permission refusee au moment du clic : on laisse le bouton tel quel,
      // l'adresse reste selectionnable et le lien mailto reste disponible.
      return;
    }

    // Le libelle courant est relu ici, et non au chargement : il a pu changer
    // entre-temps si le visiteur est passe a l'anglais.
    const initial = mot.textContent;
    const anglais = document.documentElement.lang === 'en';

    mot.textContent = anglais ? 'Address copied' : 'Adresse copiée';
    copieur.classList.add('est-copie');

    clearTimeout(retour);
    retour = setTimeout(() => {
      mot.textContent = initial;
      copieur.classList.remove('est-copie');
    }, 2200);
  });
}

/* --------------------------------------------------------------- langue */

/* Le francais est ecrit dans index.html, l'anglais vit dans js/anglais.js.
   Basculer consiste donc a remplacer le contenu des elements portant une cle,
   et a restaurer l'original pour revenir — pas besoin de garder deux copies
   du texte dans le document.

   Le groupe de boutons est `hidden` dans le HTML : sans ce script, la page
   reste en francais et n'affiche pas un selecteur qui ne repondrait pas. */
const groupeLangues = document.querySelector('.langues');

if (groupeLangues && typeof ANGLAIS === 'object') {
  const html = document.documentElement;

  /* Contenu francais d'origine, releve une fois avant toute substitution. */
  const francais = new Map();
  for (const el of document.querySelectorAll('[data-i18n]')) {
    francais.set(el, el.innerHTML);
  }

  /* Meme principe pour les quelques attributs traduisibles, decrits sous la
     forme « cle|attribut ». */
  const attributs = [];
  for (const el of document.querySelectorAll('[data-i18n-attr]')) {
    const [cle, nom] = el.dataset.i18nAttr.split('|');
    attributs.push({ el, cle, nom, fr: el.getAttribute(nom) });
  }

  const titreFr = document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  const descFr = metaDesc?.getAttribute('content');

  const appliquer = (langue) => {
    const en = langue === 'en';

    for (const [el, fr] of francais) {
      const cle = el.dataset.i18n;
      // Une cle sans traduction garde le francais plutot que de vider le
      // bloc : une phrase dans la mauvaise langue reste lisible, pas un trou.
      el.innerHTML = en ? (ANGLAIS[cle] ?? fr) : fr;
    }

    for (const { el, cle, nom, fr } of attributs) {
      el.setAttribute(nom, en ? (ANGLAIS[cle] ?? fr) : fr);
    }

    document.title = en ? (ANGLAIS['doc.titre'] ?? titreFr) : titreFr;
    if (metaDesc) {
      metaDesc.setAttribute('content', en ? (ANGLAIS['doc.desc'] ?? descFr) : descFr);
    }

    // `lang` sur la racine : c'est ce qui fait qu'un lecteur d'ecran change de
    // voix, et que la cesure et les guillemets suivent la bonne langue.
    html.setAttribute('lang', langue);

    for (const bouton of groupeLangues.querySelectorAll('[data-langue]')) {
      bouton.setAttribute('aria-pressed', String(bouton.dataset.langue === langue));
    }

    // L'adresse porte la langue : sans cela, impossible d'envoyer un lien
    // vers la version anglaise — le destinataire recevrait le francais.
    // `replaceState` plutot que `pushState` : la bascule n'est pas une
    // navigation, le bouton Retour ne doit pas l'annuler.
    const url = new URL(window.location.href);
    if (langue === 'fr') url.searchParams.delete('lang');
    else url.searchParams.set('lang', langue);
    history.replaceState(null, '', url);

    try {
      localStorage.setItem('langue', langue);
    } catch {
      // Navigation privee ou stockage refuse : le choix ne survit pas au
      // rechargement, le reste fonctionne.
    }
  };

  groupeLangues.hidden = false;

  groupeLangues.addEventListener('click', (e) => {
    const bouton = e.target.closest('[data-langue]');
    if (bouton) appliquer(bouton.dataset.langue);
  });

  /* Trois sources, dans cet ordre : l'adresse, parce qu'un lien envoye doit
     l'emporter sur les preferences locales du destinataire ; le choix
     precedent ; puis la langue du navigateur. */
  let depart = new URLSearchParams(window.location.search).get('lang');

  if (depart !== 'fr' && depart !== 'en') {
    try {
      depart = localStorage.getItem('langue');
    } catch { depart = null; }
  }

  if (depart !== 'fr' && depart !== 'en') {
    depart = navigator.language?.startsWith('fr') === false ? 'en' : 'fr';
  }

  if (depart === 'en') appliquer('en');
}
