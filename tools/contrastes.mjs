/* =============================================================================
   Vérifie les contrastes des deux palettes, directement sur les jetons CSS.

   Pourquoi pas Lighthouse : il n'audite qu'un thème à la fois, et l'émuler en
   sombre demandait Puppeteer — 219 paquets, deux failles connues, pour un site
   qui n'a par ailleurs aucune dépendance. Le calcul tient en quarante lignes et
   couvre les deux palettes d'un coup.

   Aucune dépendance. Usage : node tools/contrastes.mjs
   ============================================================================= */
import { readFile } from 'node:fs/promises';

const SEUIL = 4.5;   // WCAG AA, texte normal

/* Couples effectivement rencontrés sur la page : une couleur de texte posée
   sur une couleur de fond. */
const COUPLES = [
  ['--text', '--bg'],
  ['--text-dim', '--bg'],
  ['--text-faint', '--bg'],
  ['--accent', '--bg'],
  ['--text', '--surface'],
  ['--text-dim', '--surface'],
  ['--text-faint', '--bg-sunk'],
  ['--accent-fg', '--accent'],
  // Ajoutes avec le colophon et le bouton de copie.
  ['--text-dim', '--bg-sunk'],
  ['--accent', '--accent-soft'],
];

const luminance = (hex) => {
  const canal = (n) => {
    const c = n / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
};

const contraste = (a, b) => {
  const [clair, sombre] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (clair + 0.05) / (sombre + 0.05);
};

/* Les jetons clairs vivent dans le premier `:root`, les sombres dans celui
   imbriqué sous la requête `prefers-color-scheme: dark`. */
const jetons = (bloc) =>
  Object.fromEntries(
    [...bloc.matchAll(/(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g)]
      .map((m) => [m[1], m[2].toLowerCase()]),
  );

const css = await readFile(new URL('../css/style.css', import.meta.url), 'utf8');
const [avantSombre, apresSombre] = css.split('@media (prefers-color-scheme: dark)');

const palettes = {
  clair: jetons(avantSombre.slice(avantSombre.indexOf(':root'))),
  sombre: jetons(apresSombre.slice(0, apresSombre.indexOf('\n}'))),
};

let echec = false;

for (const [nom, palette] of Object.entries(palettes)) {
  console.log(`\n  palette ${nom}`);

  for (const [avant, arriere] of COUPLES) {
    const fg = palette[avant];
    const bg = palette[arriere];

    if (!fg || !bg) {
      console.error(`    jeton manquant : ${avant} ou ${arriere}`);
      echec = true;
      continue;
    }

    const r = contraste(fg, bg);
    const ok = r >= SEUIL;
    echec ||= !ok;
    console.log(
      `    ${(avant + ' sur ' + arriere).padEnd(30)} ${fg} / ${bg}` +
      `  ${r.toFixed(2)}:1  ${ok ? 'OK' : 'ÉCHEC'}`,
    );
  }
}

console.log(
  echec
    ? `\n  Au moins un couple passe sous ${SEUIL}:1.\n`
    : `\n  Les deux palettes tiennent le seuil AA de ${SEUIL}:1.\n`,
);

process.exitCode = echec ? 1 : 0;
