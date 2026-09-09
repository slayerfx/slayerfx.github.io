# slayerfx.github.io

[![CI](https://github.com/slayerfx/slayerfx.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/slayerfx/slayerfx.github.io/actions/workflows/ci.yml)

Mon portfolio — [slayerfx.github.io](https://slayerfx.github.io)

Une page, écrite à la main : HTML, CSS et JavaScript, **sans framework et sans
étape de build**. Aucune ressource n'est chargée depuis un CDN, la page s'affiche
donc entièrement hors ligne. GitHub Pages sert les fichiers du dépôt tels quels.

## Structure

```
index.html          la page entière
css/style.css       thème clair, mise en page, composants
js/main.js          la barre haute qui se détache au défilement
img/                captures des projets et portrait
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
| Performance, accessibilité, bonnes pratiques, SEO | Lighthouse CI |
| Liens morts | `lychee` |

Les seuils Lighthouse ont été mesurés avant d'être inscrits : **100 en
accessibilité, bonnes pratiques et SEO**, et 95 en performance pour absorber la
variation de charge des runners. Le rapport complet est conservé en artefact
pendant quatorze jours.

## Accessibilité

Lien d'évitement en premier élément focusable, structure de titres continue,
contrastes conformes, et `prefers-reduced-motion` respecté — le défilement animé
et les transitions se désactivent quand le système le demande.
