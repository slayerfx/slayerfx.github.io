/* =============================================================================
   Version anglaise du contenu.

   Le francais reste dans index.html : c'est la langue par defaut du site, elle
   doit s'afficher meme si ce fichier ne se charge pas. Ce dictionnaire ne
   contient donc que la traduction, indexee par la cle `data-i18n` portee par
   chaque element.

   Les valeurs sont du HTML — certaines phrases contiennent <strong> ou <code>.
   Elles sont ecrites ici, jamais saisies par un visiteur.
   ============================================================================= */

const ANGLAIS = {
  /* --- titre du document et description, hors du corps de la page */
  'doc.titre': "Louenn Penanc'hoat — Full-Stack Web Developer",
  'doc.desc': "Full-stack web developer based in Rennes, France. Eleven weeks "
            + 'on the PHPOffice open source libraries: 41 pull requests merged, '
            + 'four file formats written, static analysis raised five levels.',

  /* --- chrome */
  'skip': 'Skip to content',
  'nav.label': 'Main navigation',
  'nav.portfolio': 'Portfolio',
  'nav.oss': 'Open source',
  'nav.parcours': 'Background',
  'nav.contact': 'Contact',
  'lang.label': 'Site language',

  /* --- accroche */
  'hero.sur': 'Full-Stack Web Developer — Rennes, France',
  'hero.lede': 'I leave code safer than I found it. Eleven weeks on the '
             + '<strong>PHPOffice</strong> open source libraries: 41 pull requests '
             + 'merged, four file formats written, static analysis raised five levels.',
  'hero.cherche': '<strong>Looking for an apprenticeship</strong> to continue into a '
                + "Bachelor's in web development.",
  'hero.cue': 'See the projects',

  /* --- projets */
  'projets.titre': 'Projects',
  'lien.site': 'Visit the site',
  'lien.code': 'Source code',

  'omr.role': 'Strength training site — final course project, in production',
  'omr.p1': 'An exercise library, custom training programme builder, a daily energy '
          + 'expenditure calculator using the Mifflin-St Jeor formula, and a map of '
          + 'nearby gyms.',
  'omr.p2': 'MVC architecture written <strong>without a framework</strong>: router, '
          + 'controllers, managers, models. Session authentication with user and admin '
          + 'roles, hashed passwords, PDO prepared statements. PHPUnit tests on the '
          + 'business logic.',

  'sg.role': 'Audio downloader with a local web interface — personal tool',
  'sg.p1': 'A track, a playlist, your likes or a whole profile, fetched as tagged MP3 '
         + 'with artwork. The server streams its progress live: current step, track '
         + 'being processed, throughput, time remaining.',
  'pf.titre': 'Portfolio',
  'pf.role': 'This site — handwritten, no framework, no dependency',
  'pf.p1': 'The page you are reading. A single HTML file, served as written by GitHub '
         + 'Pages: no build step, no library loaded by the browser. Light and dark themes '
         + 'following the system, bilingual content, and three variable typefaces bundled '
         + 'in the repository.',
  'pf.p2': 'Continuous integration checks four things on every push. The fourth is a '
         + '<strong>forty-line script written for this site</strong> that computes contrast '
         + 'directly from the colour tokens: Lighthouse audits one theme at a time, and '
         + 'emulating the dark one required 219 packages for a site that has none. The '
         + 'script caught a real defect Lighthouse missed — a grey at 4.48 against a '
         + 'threshold of 4.5.',

  'sg.p2': 'The interface is served as written — <strong>no framework, no build step, '
         + 'no CDN</strong> — with light and dark themes, keyboard navigation and screen '
         + 'reader announcements. The <code>Host</code> header is validated against DNS '
         + 'rebinding, and reconfiguration is restricted to the host machine.',

  /* --- open source */
  'oss.titre': 'Open source internship — PHPOffice',
  'oss.lede': 'Eleven weeks, May to July 2026, on the PHP libraries of '
            + '<a href="https://github.com/PHPOffice" target="_blank" rel="noopener noreferrer">PHPOffice</a>. '
            + 'Every contribution was reviewed and approved by the project maintainer.',

  'fig.pr': 'pull requests merged',
  'fig.depots': 'repositories',
  'fig.formats': 'file formats written',
  'fig.phpstan': 'PHPStan levels gained',

  'oss.pr32': '— 32 pull requests',
  'oss.autres': 'The four other repositories',
  'oss.pr9': '— 9 pull requests',

  'puce1.t': 'Four file formats implemented, both reading and writing',
  'puce2.t': 'Static analysis raised from level 1 to level 6',
  'puce3.t': 'Continuous integration migrated from Travis to GitHub Actions',
  'puce4.t': 'Documentation migrated',
  'puce4.s': 'from Sphinx to MkDocs, then to ProperDocs.',

  'tab.depot': 'Repository',
  'tab.contrib': 'Contributions',
  'tab.pres': 'Code coverage under PHPUnit 10+, minimum version raised, version guard on <code>imagedestroy()</code>',
  'tab.common': 'PHPStan taken to level 7, support for PHPStan 2.x, PHP 8.5 in the matrix',
  'tab.word': 'PHP 8.5 support, PHPUnit constraint fixing the test suite',
  'tab.math': 'PHP 8.5 added to the continuous integration matrix',

  /* --- parcours */
  'parcours.titre': 'Background',
  'p1.t': 'Professional qualification, Web &amp; Mobile Developer',
  'p1.o': '3W Academy — RNCP level 5 (EQF 5), awarded 10 August 2026',
  'p1.d': 'Full-stack development, API integration, Git/GitHub workflow and agile methods.',
  'p2.t': 'Financial market analysis',
  'p2.o': 'Self-taught',
  'p2.d': 'Reading charts and indicators, data-driven decisions, risk management.',
  'p3.t': 'Sales assistant',
  'p4.t': 'Vocational baccalaureate in Sales',
  'p4.o': 'Lycée De La Salle — passed with merit',

  'comp.titre': 'Skills',
  'comp.socle': 'Core stack',
  'comp.outils': 'Tools',
  'comp.qualite': 'Quality &amp; continuous integration',
  'comp.langues': 'Languages',
  'comp.langues.d': 'French — native · English — technical documentation and open source contributions',

  /* --- contact */
  'contact.sur': 'Contact',
  'contact.dire': 'Open to <strong>web development apprenticeship</strong> offers, '
                + 'in and around Rennes.',
  'contact.copier': 'Copy the address',
  'contact.cadre': "Apprenticeship — Bachelor's in web development · Rennes and nearby",

  /* --- pied de page */
  'foot.label': 'Contact links',
  'foot.mail': 'Email address',
};
