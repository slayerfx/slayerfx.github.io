/* =============================================================================
   Portfolio — interactions.

   Volontairement minimal : la page est entierement lisible et navigable sans
   ce fichier. Tout ce qui est ici n'ajoute que du confort.
   ============================================================================= */
'use strict';

/* La barre haute se detache visuellement des qu'on quitte le sommet. */
const topbar = document.querySelector('.topbar');

const onScroll = () => {
  topbar.classList.toggle('is-stuck', window.scrollY > 8);
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
