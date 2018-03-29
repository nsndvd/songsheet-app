import { Injectable } from '@angular/core';
import uuid from 'uuid/v1';

import idb, { DB } from '../../../../node_modules/idb';
import { DATABASES } from '../../../ts/databases';

@Injectable()
export class DataService {

  private dbPromise: Promise<DB>;

  constructor() { 
    this.dbPromise = idb.open('songsheet', 1, (upgradeDb) => {
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

  public upsert(database: DATABASES, key: string, data: any){
    if(typeof data !== 'object'){
      throw new Error('data is not an object. Only objects can be added to Indexeddb');
    }
    // settings has a different id property
    if(!data.id && database !== DATABASES.settings){
      data.id = uuid();
    }

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

  getAll(database: DATABASES){
    return this.dbPromise.then(db => {
      console.log(db);
      return db.transaction(database, 'readonly').objectStore(database).getAll();
    })
  }

  getByKey(database: DATABASES, key: string){
    return this.dbPromise.then(db => {
      console.log(db);
      return db.transaction(database, 'readonly').objectStore(database).get(key);
    })
  }

  delete(database: DATABASES, key: string){
    return this.dbPromise.then(db => {
      let tx = db.transaction(database, 'readwrite');
      tx.objectStore(database).delete(key);
      return tx.complete;
    })
  }

}
