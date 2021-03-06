import { Injectable } from '@angular/core';
let uuid = require('uuid/v1');

import idb, { DB } from 'idb';
import { DATABASES } from '../models/databases';
import { Song } from '../models/song';
import { Songgroup } from '../models/songgroup';

@Injectable()
export class DataService {

  private dbPromise: Promise<DB>;

  constructor() { 
    this.dbPromise = idb.open('songsheet', 1, (upgradeDb) => {
      if (!upgradeDb.objectStoreNames.contains('settings')) {
        upgradeDb.createObjectStore('settings', {keyPath: 'id'});
      }
      if (!upgradeDb.objectStoreNames.contains('songs')) {
        upgradeDb.createObjectStore('songs', {keyPath: 'id', autoIncrement: true});
      }
      if (!upgradeDb.objectStoreNames.contains('events')) {
        upgradeDb.createObjectStore('events', {keyPath: 'id', autoIncrement: true});
      }
    });
  }

  public upsert(database: DATABASES, data: any){
    if(typeof data !== 'object'){
      throw new Error('data is not an object. Only objects can be added to Indexeddb');
    }
    if(!data.id && database === DATABASES.settings){
      throw new Error('Settings need an id.');
    }
    // settings has a different id property
    if(!data.id && database !== DATABASES.settings){
      data.id = uuid();
    }

    return this.getByKey(database, data.id).then( obj => {
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
      return db.transaction(database, 'readonly').objectStore(database).getAll().then( res => {
        let arr = [];
        for (let elem of res){
          switch(database){
            case DATABASES.songs:
              arr.push(new Song(elem));
              break;
            case DATABASES.events:
              arr.push(new Songgroup(elem));
              break;
            default:
              arr.push(elem);
          }
        }

        return arr;
      });
    })
  }

  getByKey(database: DATABASES, key: string){
    return this.dbPromise.then(db => {
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
