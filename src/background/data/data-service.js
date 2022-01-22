import database from './database';

/**
 *
 */
export class DataService {
  /**
   * Saves annotation for a given pageURL
   * @param {string} pageURL
   * @param {Object} annotation
   * @return {Promise<Object>}
   */
  saveAnnotation = (pageURL, annotation) => {
    return new Promise(((resolve, reject) => {
      annotation['pageURL'] = pageURL;
      annotation['id'] = Date.now();
      const annotations = database.table('annotations');
      annotations.add(annotation).then((id) => {
        resolve({annotationId: id});
      }).catch((e) => {
        reject(new Error(e));
      });
    }));
  };

  /**
   *
   * @param {string}pageURL
   * @return {Promise<Array>}
   */
  getAnnotations = (pageURL) => {
    return new Promise(((resolve, reject) => {
      const table = database.table('annotations');
      const annotations = table.where({pageURL: pageURL}).toArray();
      resolve(annotations);
    }));
  };

  /**
   *
   * @param {string}pageURL
   * @return {Promise<Object>}
   */
  deleteAnnotations = (pageURL) => {
    return new Promise(((resolve, reject) => {
      const table = database.table('annotations');
      table.where({pageURL: pageURL}).delete().then((deleteCount) => {
        resolve({deleteCount: deleteCount});
      }).catch((e) => {
        console.error(e);
        reject(e);
      });
    }));
  };

  /**
   *
   * @param {string}pageURL
   * @param {number}annotationId
   * @return {Promise<Object>}
   */
  deleteAnnotation = (pageURL, annotationId) => {
    return new Promise(((resolve, reject) => {
      const table = database.table('annotations');
      table.delete(annotationId).then(() => {
        resolve({deleteCount: 1});
      }).catch((e) => {
        console.error(e);
        reject(e);
      });
    }));
  };
}
