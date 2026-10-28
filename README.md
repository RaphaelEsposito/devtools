# DevTools — Catalogue d'outils pour développeurs

## Présentation du projet

DevTools est une page web responsive présentant un catalogue de 24 outils destinés aux développeurs. L'objectif est de permettre à l'utilisateur de parcourir les outils et de retrouver rapidement ceux qui l'intéressent grâce à une recherche par nom ou catégorie.

Chaque outil possède un identifiant, un nom, une description, une catégorie et une information indiquant s'il est gratuit ou payant. Les cartes sont générées dynamiquement en JavaScript à partir des données.

## Technologies utilisées

- HTML : structure sémantique de la page, champ de recherche et conteneur des cartes.
- Tailwind CSS : mise en page, typographie, couleurs, espacements et responsive.
- JavaScript : import des données, génération dynamique des cartes, filtrage et mise à jour du compteur.
- Sass (SCSS) : styles des badges Gratuit et Payant, avec variables et mixin.
- Git / GitHub : versionnement et collaboration en binôme.

## Structure HTML

La page utilise des éléments HTML sémantiques :

- `header` : identité du site DevTools.
- `main` : contenu principal.
- `section` : présentation, recherche et catalogue.
- `label` associé à l'`input` : nom accessible du champ de recherche.

## Direction artistique

L'interface privilégie une présentation sobre, claire et professionnelle.

### Couleurs

- `bg-slate-50` : fond clair de la page.
- `bg-white` : fond blanc de l'en-tête.
- `text-slate-900` : texte principal foncé.
- `text-slate-600` : informations secondaires.
- `text-blue-600` : mise en valeur du nom DevTools.
- `border-indigo-500` et `focus:ring-indigo-500` : bordure et focus du champ de recherche.

### Typographie et espacements

- `text-2xl font-bold` : nom du site.
- `text-3xl md:text-4xl font-bold` : titre principal, agrandi sur les écrans moyens et plus.
- `max-w-6xl mx-auto` : largeur maximale et centrage du contenu.
- `px-6 py-10` : espacements intérieurs du contenu.
- `mb-10` : séparation des sections.
- `gap-5` : espacement régulier entre les cartes.

## Responsive

L'interface suit l'approche **mobile-first** de Tailwind CSS :

```html
<div
  id="card-container"
  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
></div>
```

- `grid-cols-1` : une colonne par défaut, sur mobile.
- `sm:grid-cols-2` : deux colonnes à partir de **640 px**.
- `lg:grid-cols-4` : quatre colonnes à partir de **1024 px**.
- `w-full md:max-w-xl` : champ de recherche large sur mobile, avec largeur maximale à partir de **768 px**.

### Génération des cartes

La fonction `showCards(outils)` reçoit un tableau d'outils à afficher. Elle vide d'abord la grille, met à jour le compteur et gère le message vide. Puis elle parcourt les outils avec `forEach`.

### Recherche dynamique

La fonction `filterOutils()` est déclenchée à chaque saisie dans le champ :

```js
rechercheInput.addEventListener("input", filterOutils);
```

Le texte est normalisé puis comparé aux noms et catégories :

```js
const termeRecherche = rechercheInput.value.toLowerCase().trim();

if (termeRecherche === "") {
  showCards(outilsBase);
} else {
  const filteredOutils = outilsBase.filter((outil) => {
    return (
      outil.nom.toLowerCase().includes(termeRecherche) ||
      outil.categorie.toLowerCase().includes(termeRecherche)
    );
  });
  showCards(filteredOutils);
}
```

- `toLowerCase()` : ignore la casse.
- `trim()` : supprime les espaces au début et à la fin de la recherche.
- `filter()` : crée un nouveau tableau contenant les outils correspondants.
- `includes()` : teste la présence du texte dans le nom **ou** la catégorie.
- `showCards(...)` : réaffiche les cartes correspondant à la recherche.

Si la recherche est vide, `showCards(outilsBase)` réaffiche les 24 outils.

### Compteur et état vide

Dans `showCards`, le compteur est calculé à partir de `outils.length` puis écrit avec `textContent` :

```js
const outilsCount = outils.length;
outilsText.textContent = `${outilsCount} trouvé(s)`;
```

Lorsque le tableau est vide, `message-vide.hidden` passe à `false` pour afficher le message. Dans le cas contraire, le message est masqué.

## Composant Sass

Le fichier **`src/scss/style.scss`** définit les couleurs des badges à l'aide de variables :

```scss
$gratuit: #047857;
$BgGratuit: #d1fae5;
$payant: #92400e;
$BgPayant: #fef3c7;
```

Le mixin `badge` regroupe les deux propriétés communes :

```scss
@mixin badge($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
}
```

Il est réutilisé dans les deux variantes :

```scss
.badge-gratuit {
  @include badge($BgGratuit, $gratuit);
}

.badge-payant {
  @include badge($BgPayant, $payant);
}

.badge {
  display: flex;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
```

**Rôle des éléments Sass :**

- Une **variable** stocke une valeur réutilisable, par exemple une couleur.
- Un **mixin** regroupe plusieurs déclarations CSS réutilisables.
- `@include` applique le mixin avec les couleurs choisies.

Les badges gratuits ont un fond vert clair et un texte vert foncé ; les badges payants ont un fond jaune clair et un texte brun/orangé.

Sass ne remplace pas Tailwind : Tailwind gère principalement la mise en page, tandis que Sass définit ici les styles du composant badge. Les deux fichiers CSS sont compilés séparément.

## Installation et compilation

Installer les dépendances :
npm install

Pendant le développement :
npm run dev

Cette commande surveille les modifications Tailwind et génère dist/output.css.

Pour la version finale :
npm run build
Cette commande génère le fichier Tailwind CSS minifié.

Pour compiler Sass :
npm run sass
Cette commande compile src/scss/style.scss vers dist/style.css.

La page peut ensuite être ouverte avec Live Server dans VS Code.

## Accessibilité

- Le champ de recherche possède un `label` associé grâce aux attributs `for="recherche"` et `id="recherche"`.
- Le compteur utilise `role="status"` et `aria-live="polite"` pour annoncer les mises à jour aux technologies d'assistance.
- Le champ utilise `focus:ring-2` et `focus:ring-indigo-500` pour rendre le focus visible.
- Les badges contiennent les mots « Gratuit » et « Payant » : l'information n'est donc pas communiquée uniquement par la couleur.
