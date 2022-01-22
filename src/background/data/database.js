import Dexie from 'dexie';
import {dexieSchema} from './dexie-schema';
import {appConfig} from '../../appConfig';

/**
 * Database wrapper
 */

let dexie;
const DATABASE_NAME = 'WebNotes';

/**
 * Provides instance of database
 */
class Database {
  /**
   *
   * @param {string} name
   * @param {Object} schema
   */
  constructor(name, schema) {
    dexie = new Dexie(name);
    if (appConfig.dexie.cleanOnInstall) {
      dexie.delete().then(() => {
        dexie = new Dexie(name);
        dexie.version(1).stores(schema);
      }).catch((err) => {
        console.error('Could not delete database');
      }).finally(() => {
      });
    }
  }

  /**
   *
   * @param {string}tableName
   * @return {*}
   */
  table = (tableName) => {
    return dexie.table(tableName);
  };
}

const database = new Database(DATABASE_NAME, dexieSchema);
export default database;
