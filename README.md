# slayerfx.github.io

[![CI](https://github.com/slayerfx/slayerfx.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/slayerfx/slayerfx.github.io/actions/workflows/ci.yml)

Mon portfolio — [slayerfx.github.io](https://slayerfx.github.io)

Une page, écrite à la main : HTML, CSS et JavaScript, **sans framework et sans
étape de build**. Aucune ressource n'est chargée depuis un CDN, la page s'affiche
donc entièrement hors ligne. GitHub Pages sert les fichiers du dépôt tels quels.

## Structure

```
index.html          la page entière
css/style.css       jetons, mise en page, composants, palette sombre
js/main.js          barre de lecture, révélations, langue, copie de l'adresse
js/anglais.js       la traduction anglaise, indexée par clé
fonts/              les trois polices, en woff2, avec leurs licences
img/                captures des projets et portrait
tools/contrastes.mjs  vérificateur de contrastes, sans dépendance
```

## Développement

Aucune dépendance à installer. Un serveur local suffit pour éviter les
restrictions du protocole `file://` :

```
python -m http.server 8080
```

Puis `http://127.0.0.1:8080`.

## Intégration continue

Le site n'a rien à compiler : GitHub Pages sert les fichiers du dépôt tels
quels. La CI ne construit donc rien, elle **vérifie**, à chaque push :

| Contrôle | Outil |
|---|---|
| Validité du balisage | `html-validate` |
| Contrastes des deux palettes | `tools/contrastes.mjs` |
| Performance, accessibilité, bonnes pratiques, SEO | Lighthouse CI |
| Liens morts | `lychee` |

Les seuils Lighthouse ont été mesurés avant d'être inscrits : **100 en
accessibilité, bonnes pratiques et SEO**, et 95 en performance pour absorber la
variation de charge des runners. Le rapport complet est conservé en artefact
pendant quatorze jours.

## Langues

La page est écrite en français dans `index.html` — c'est la langue par défaut,
et elle s'affiche même si le script ne se charge pas. L'anglais vit dans
`js/anglais.js`, sous forme d'un dictionnaire indexé par la clé `data-i18n` que
porte chaque élément traduisible. Basculer remplace le contenu de ces éléments ;
revenir restaure l'original relevé au chargement, sans conserver deux copies du
texte dans le document.

L'attribut `lang` de la racine suit la langue affichée : c'est lui qui fait
changer de voix un lecteur d'écran, et qui donne à la césure et aux guillemets
les règles de la bonne langue.

## Polices

Trois familles, chacune avec un rôle, toutes embarquées dans le dépôt sous
licence SIL OFL — rien n'est chargé depuis un CDN :

| Famille | Rôle | Poids |
|---|---|---|
| Bricolage Grotesque | titres | 77 Ko |
| Source Serif 4 | texte courant | 122 Ko |
| Geist | navigation, boutons | 16 Ko |

Les trois fichiers sont préchargés et déclarés en `font-display: swap` : le
texte s'affiche immédiatement dans la police système, la substitution se fait à
l'arrivée du fichier. Rien n'est jamais invisible, et la mesure donne un CLS de
zéro.

## Accessibilité

Lien d'évitement en premier élément focusable, structure de titres continue,
contrastes conformes, et `prefers-reduced-motion` respecté — le défilement animé
et les transitions se désactivent quand le système le demande.

Le site est conçu en clair, mais suit `prefers-color-scheme` : un visiteur dont
le système demande le sombre reçoit une variante dédiée. Seuls les jetons de
couleur changent, aucune forme ni aucun espacement. Le contraste le plus faible
de cette palette est de 5,18:1, pour un seuil AA de 4,5.
