import {DataService} from '../data/data-service';

/**
 *
 */
export class AnnotationController {
  /**
   *
   * @param {RequestHandler} requestHandler
   */
  constructor(requestHandler) {
    this.db = new DataService();
    requestHandler.subscribeRequestPath('annotation.save', this.handleRequest);
    requestHandler.subscribeRequestPath('annotation.get', this.handleRequest);
    requestHandler.subscribeRequestPath('annotation.deleteAnnotation',
        this.handleRequest);
    requestHandler.subscribeRequestPath('annotation.deleteAll',
        this.handleRequest);
  }

  /**
   *
   * @param {string} pageURL
   * @param {Object} annotation
   * @return {Promise} promise
   */
  saveAnnotation = (pageURL, annotation) => {
    return this.db.saveAnnotation(pageURL, annotation);
  };

  /**
   *
   * @param {string} pageURL
   * @return {Promise<unknown>}
   */
  getAnnotations = (pageURL) => {
    return this.db.getAnnotations(pageURL);
  };

  /**
   *
   * @param {string} pageURL
   * @return {Promise<unknown>}
   */
  deleteAll = (pageURL) => {
    return this.db.deleteAnnotations(pageURL);
  };

  /**
   *
   * @param {string}pageURL
   * @param {number}annotationId
   * @return {Promise<Object>}
   */
  deleteAnnotation = (pageURL, annotationId) => {
    return this.db.deleteAnnotation(pageURL, annotationId);
  };

  /**
   *
   * @param {Array} params
   * @return {Promise<Object>}
   */
  handleRequest = (...params) => {
    const request = params[0];
    switch (request['requestPath']) {
      case 'annotation.save':
        return this.saveAnnotation(request['pageURL'], request['annotation']);
      case 'annotation.get':
        return this.getAnnotations(request['pageURL']);
      case 'annotation.deleteAnnotation':
        return this.deleteAnnotation(request['pageURL'],
            request['annotationId']);
      case 'annotation.deleteAll':
        return this.deleteAll(request['pageURL']);
    }
  };
}
