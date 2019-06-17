# Instructions

- Faire un git clone dans le dossier de votre choix

- ouvrir une console à la base du fichier

- taper npm install, puis npm start

## Fichier Entrée

Deux fichiers Entrée sont disponibles, un étant inspiré des instructions (Entrée.txt), et un autre pour tester de grandes valeurs de C (Entrée-Grand.txt).

Pour modifier le fichier d'entrée, aller dans

- Code/ActionsFichiers/LectureFichierEntrée/LectureFichierEntrée.js à la ligne 7

et remplacer 'Fichiers/Entrée.txt' ou 'Fichiers/Entrée-Grand.txt' par le chemin du fichier de votre choix.

## Fichier Sortie

Pour modifier le chemin du fichier de sortie, aller dans :

- Code/ActionsFichiers/EcritureFichierSortie/EcritureFichierSortie.js à la ligne 3

et remplacer 'Fichiers/Sortie.txt' ou 'Fichiers/Sortie-Grand.txt' par le chemin du fichier de votre choix.

## Test (Fichiers en cours d'écriture)

Pour lancer les test :

- Mettre la dernière instruction 'EcrireFichier(instructions_finales)' à la ligne 308 de Script.js dans le dossier Code/Script en commentaire pour éviter une erreur de log (recherche de solution en cours)

- taper npm test dans la console

## Améliorations possibles

- Ajouter des .catch avec des logs d'erreurs éventuelles lors de l'éxecution finale du script
- Optimiser la fonction permettant à chaque aventurier de se déplacer tout en mettant à jour la map, afin de ne pas devoir refaire un initMap et createMap une fois les instructions finales reçues
- Créer un fichier Map.js afin de faire en sorte que le fichier Script soit juste la partie exécutante
- Compléter les fichiers .test
