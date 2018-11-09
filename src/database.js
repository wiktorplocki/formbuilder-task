import Dexie from 'dexie';
import 'dexie-observable';

const db = new Dexie('formBuilder');
db.version(1).stores({
  data: `++id`,
});
db.version(2).stores({});

export default db;
