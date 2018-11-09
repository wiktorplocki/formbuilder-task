# formbuilder-task

Recursive form builder app built with React, Reactstrap 4 and Dexie(IndexedDB).

Implemented functionality:
1. Items can be added ad infinitum.
2. Form shape persists through IndexedDB

TODO:
1. Passing data between children and parents
2. Further improve DB (item deletion, manipulation)

Known issues:
1. Deleting an item deletes all items up to and including the parent node from which the clicked child originates

## Installation
### With yarn
`yarn`

### With npm
`npm install`

## Running the app
`yarn start` or `npm start`
