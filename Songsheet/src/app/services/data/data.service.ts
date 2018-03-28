import { Injectable } from '@angular/core';

import idb, { DB } from '../../../../node_modules/idb';

@Injectable()
export class DataService {

  private dbPromise: Promise<DB>;

  constructor() { 
    const dbPromise = idb.open('songsheet', 1, (upgradeDb) => {
      if (!upgradeDb.objectStoreNames.contains('settings')) {
        upgradeDb.createObjectStore('settings', {keyPath: 'setting'});
      }
      if (!upgradeDb.objectStoreNames.contains('songs')) {
        upgradeDb.createObjectStore('songs', {keyPath: 'id', autoIncrement: true});
      }
      if (!upgradeDb.objectStoreNames.contains('events')) {
        upgradeDb.createObjectStore('events', {keyPath: 'id', autoIncrement: true});
      }
    });
  }

  upsert(database: string, key: string, data: object){
    return this.getByKey(database, key).then( obj => {
      return this.dbPromise.then(db => {
        let tx = db.transaction(database, 'readwrite');
        let store = tx.objectStore(database);
        store.put(data);
        return tx.complete;
      })
    }).catch(() => {
      return this.dbPromise.then(db => {
        let tx = db.transaction(database, 'readwrite');
        let store = tx.objectStore(database);
        store.add(data);
        return tx.complete;
      })
    });
  }

  getAll(database: string){
    return this.dbPromise.then(db => {
      return db.transaction(database, 'readonly').objectStore(database).getAll();
    })
  }

  getByKey(database: string, key: string){
    return this.dbPromise.then(db => {
      return db.transaction(database, 'readonly').objectStore(database).get(key);
    })
  }

  delete(database: string, key: string){
    return this.dbPromise.then(db => {
      let tx = db.transaction(database, 'readwrite');
      tx.objectStore(database).delete(key);
      return tx.complete;
    })
  }

}
