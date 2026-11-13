# Connected Mon Dex — Yu-Gi-Oh! Edition

Projet réalisé dans le cadre de la formation (Sprint 3 — Brief 1). Une encyclopédie interactive des cartes Yu-Gi-Oh! optimisée pour mobile et desktop.

## Installation

Prérequis : [Node.js](https://nodejs.org) (version 18 ou plus).

```bash
npm install
npm run dev
```

`npm run dev` surveille vos fichiers et régénère `dist/output.css` à chaque modification. Ouvrez ensuite `index.html` dans votre navigateur (ou avec l'extension Live Server).

Avant de mettre en ligne sur GitHub Pages :

```bash
npm run build
```

Puis committez `dist/output.css` : GitHub Pages ne lance pas Tailwind pour vous.

## Contenu du dépôt

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page Dex, interactive, avec les cartes Yu-Gi-Oh! |
| `tailwind.config.js` | Le thème personnalisé pour l'univers Yu-Gi-Oh! |
| `src/input.css` | Les directives Tailwind et classes de composants |
| `dist/output.css` | Le CSS généré par Tailwind |
| `main.js` | Le main code js|
| `ui.js` | Le code interface js|
| `storage.js` | Local storage js|
| `services/api.js` | Le fetch api js|
| `design/` | La maquette de la version finale |

## Informations du Projet

Univers choisi | Yu-Gi-Oh!   
Lien GitHub Pages | [[https://mehdi-charafi.github.io/MonDeck_Yu-Gi-Oh/](https://mehdi-charafi.github.io/Connected_My_Deck/)]   
Sources des cartes | YGOPRODeck (ygoprodeck.com)  

## Tests des expressions régulières (Regex) : 

// 1. ID (#000)
regex.test("#010") // ➔ true (Valide)
regex.test("#123") // ➔ true (Valide)
regex.test("010")  // ➔ false (Invalide)
regex.test("#12")  // ➔ false (Invalide)

// 2. Nom (2 à 30 caractères, lettres et espaces)
regex.test("Dark Magician") // ➔ true (Valide)
regex.test("Gaia")          // ➔ true (Valide)
regex.test("M123")          // ➔ false (Invalide)
regex.test("A")             // ➔ false (Invalide)

// 3. Type (Liste fixe)
regex.test("LIGHT")  // ➔ true (Valide)
regex.test("Effect") // ➔ true (Valide)
regex.test("")       // ➔ false (Invalide)

// 4. Statistiques (0 à 5000)
regex.test("0")    // ➔ true (Valide)
regex.test("2500") // ➔ true (Valide)
regex.test("5001") // ➔ false (Invalide)
regex.test("-5")   // ➔ false (Invalide)

// 5. Image (Lien HTTP/HTTPS valide)
regex.test("[https://images.ygoprodeck.com/images/cards/1.jpg](https://images.ygoprodeck.com/images/cards/1.jpg)") // ➔ true (Valide)
regex.test("[http://example.com/card.png](http://example.com/card.png)")                    // ➔ true (Valide)
regex.test("[www.google.com](https://www.google.com)")                                 // ➔ false (Invalide)
regex.test("image.jpg")                                      // ➔ false (Invalide)

// 6. Description (10 à 200 caractères)
regex.test("This is a powerful monster card.") // ➔ true (Valide)
regex.test("Short")                            // ➔ false (Invalide)
