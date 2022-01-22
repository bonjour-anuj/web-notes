import {DataService} from '../data/data-service';
import {ANNOTATIONS_MAPPING} from '../../shared/services/request-mappings';

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
    requestHandler.subscribeRequestPath(ANNOTATIONS_MAPPING.SAVE,
        this.handleRequest);
    requestHandler.subscribeRequestPath(ANNOTATIONS_MAPPING.GET,
        this.handleRequest);
    requestHandler.subscribeRequestPath(ANNOTATIONS_MAPPING.DELETE,
        this.handleRequest);
    requestHandler.subscribeRequestPath(ANNOTATIONS_MAPPING.DELETE_ALL,
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
      case ANNOTATIONS_MAPPING.SAVE:
        return this.saveAnnotation(request['pageURL'], request['annotation']);
      case ANNOTATIONS_MAPPING.GET:
        return this.getAnnotations(request['pageURL']);
      case ANNOTATIONS_MAPPING.DELETE:
        return this.deleteAnnotation(request['pageURL'],
            request['annotationId']);
      case ANNOTATIONS_MAPPING.DELETE_ALL:
        return this.deleteAll(request['pageURL']);
    }
  };
}
