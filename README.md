# Analyseur de Traces Numériques

Une application web simple pour analyser des fichiers texte et générer des statistiques détaillées.

## Fonctionnalités

- Upload de fichiers multiples
- Support des formats : txt, csv, log, json, xml
- Analyse en temps réel
- Interface utilisateur responsive
- Visualisation des résultats détaillée

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/digital-traces-discovery.git
cd digital-traces-discovery
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet :
```env
VITE_API_URL=http://localhost:5000
```

## Démarrage

1. Lancez le serveur de développement :
```bash
npm run dev
```

2. Ouvrez votre navigateur et accédez à `http://localhost:5173`

## Utilisation

1. Sélectionnez un ou plusieurs fichiers à analyser
2. Cliquez sur "Analyser les fichiers"
3. Consultez les résultats détaillés de l'analyse

## Structure du Projet

```
src/
├── components/         # Composants React
├── config/            # Configuration et constantes
├── services/          # Services API
├── styles/           # Fichiers CSS
└── App.tsx           # Composant principal
```

## Technologies Utilisées

- React
- TypeScript
- Vite
- CSS Modules

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
