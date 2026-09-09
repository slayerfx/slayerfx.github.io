/* =============================================================================
   Audite la page dans un thème donné.

   Lighthouse n'expose aucun réglage pour `prefers-color-scheme`, et le drapeau
   Chrome que l'on croise parfois — `--force-prefers-color-scheme` — n'existe
   pas : il est ignoré en silence, ce qui donne un test qui passe toujours.
   On pilote donc un onglet Puppeteer, où l'émulation est réelle, et on confie
   cet onglet à Lighthouse.

   Usage : node tools/lighthouse-theme.mjs <url> <light|dark>
   ============================================================================= */
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

const [url = 'http://127.0.0.1:8000', theme = 'dark'] = process.argv.slice(2);

// Memes seuils que .lighthouserc.json : mesures avant d'etre inscrits.
const SEUILS = {
  performance: 95,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
};

const navigateur = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

try {
  const onglet = await navigateur.newPage();
  await onglet.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: theme },
  ]);

  const { lhr } = await lighthouse(
    url,
    {
      logLevel: 'error',
      output: 'json',
      formFactor: 'desktop',
      // L'onglet Puppeteer porte deja son emulation : laisser Lighthouse
      // reappliquer la sienne ecraserait le theme demande.
      screenEmulation: { disabled: true },
      throttling: { rttMs: 40, throughputKbps: 10 * 1024, cpuSlowdownMultiplier: 1 },
    },
    undefined,
    onglet,
  );

  // Verification que l'emulation a bien pris : sans elle, on auditerait deux
  // fois le meme theme sans s'en apercevoir.
  const fondReel = await onglet.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );
  const sombre = fondReel === 'rgb(18, 17, 15)';
  const clair = fondReel === 'rgb(250, 249, 247)';
  const attendu = theme === 'dark' ? sombre : clair;

  console.log(`\n  thème demandé : ${theme}`);
  console.log(`  fond mesuré   : ${fondReel}  ${attendu ? '(conforme)' : '(INATTENDU)'}\n`);

  if (!attendu) {
    console.error("  L'émulation n'a pas pris : l'audit ne prouverait rien.");
    process.exitCode = 1;
  }

  let echec = false;
  for (const [cle, seuil] of Object.entries(SEUILS)) {
    const note = Math.round(lhr.categories[cle].score * 100);
    const ok = note >= seuil;
    echec ||= !ok;
    console.log(
      `  ${lhr.categories[cle].title.padEnd(16)} ${String(note).padStart(3)}` +
      `  (seuil ${seuil})  ${ok ? 'OK' : 'ÉCHEC'}`,
    );
  }

  if (echec) {
    console.error(`\n  Seuils non tenus en thème ${theme}.`);
    process.exitCode = 1;
  } else {
    console.log(`\n  Thème ${theme} : tous les seuils sont tenus.`);
  }
} finally {
  await navigateur.close();
}
