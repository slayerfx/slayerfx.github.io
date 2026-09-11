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
  'nav.oss': 'Open source',
  'nav.parcours': 'Background',
  'nav.contact': 'Contact',
  'lang.label': 'Site language',

  /* --- accroche */
  'hero.sur': 'Full-Stack Web Developer — Rennes, France',
  'hero.lede': 'I leave code safer than I found it. Eleven weeks on the '
             + '<strong>PHPOffice</strong> open source libraries: 41 pull requests merged.',
  'hero.cherche': '<strong>Looking for an apprenticeship</strong> starting 30 November 2026, '
                + 'four days a week on site.',
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
  'sg.p2': 'The interface is served as written — <strong>no framework, no build step, '
         + 'no CDN</strong> — with light and dark themes, keyboard navigation and screen '
         + 'reader announcements. The <code>Host</code> header is validated against DNS '
         + 'rebinding, and reconfiguration is restricted to the host machine.',

  /* --- open source */
  'oss.titre': 'Open source internship — PHPOffice',
  'oss.lede': 'Eleven weeks, May to July 2026, on the PHP libraries of '
            + '<a href="https://github.com/PHPOffice" target="_blank" rel="noopener noreferrer">PHPOffice</a>. '
            + 'Every contribution was reviewed and approved by the project maintainer.',
  'oss.voirpr': 'See all 41 pull requests on GitHub',

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
  'parcours.histoire': 'My story',
  'parcours.lede': "I fell into computers as a kid, through video games, wanting to understand "
                 + "how the apps and websites I used actually worked. I've always looked to "
                 + 'optimise: first the hardware, with my desktop PC setup, then the software, '
                 + "to make it faster. That's where I got hooked on solving problems and finding "
                 + 'solutions, to the point of building my own tools to make life easier. '
                 + "Now I'm turning it into a career.",
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
  'contact.dire': 'Open to <strong>software development apprenticeship</strong> offers, '
                + 'in and around Rennes.',
  'contact.copier': 'Copy the address',
  'contact.cv': 'Download the CV',
  'contact.label': 'Contact links',
  'contact.mail': 'Email address',
  'contact.cadre': 'From 30 November 2026 · 4 days a week on site · '
                 + 'Bachelor Agentic AI Software Engineering, RNCP level 6',

};
