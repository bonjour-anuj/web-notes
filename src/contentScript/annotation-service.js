import {ANNOTATIONS_MAPPING} from '../shared/services/request-mappings';

/**
 * Service to access annotations from background storage.
 */
export class AnnotationService {
  /**
   *
   * @param {Object} messageService instance of message service
   */
  constructor(messageService) {
    this.messageService = messageService;
  }

  /**
   * Save annotation in storage.
   * @param {string} pageURL url of the page
   * @param {Object} annotation annotation data
   * @return {Object} promise
   */
  saveAnnotation = (pageURL, annotation) => {
    return new Promise((resolve, reject) => {
      this.messageService.sendToBackground(
          {
            requestPath: ANNOTATIONS_MAPPING.SAVE,
            pageURL: pageURL,
            annotation: annotation,
          },
          (response) => {
            resolve(response);
          });
    });
  };

  /**
   * Delete annotation from storage.
   * @param {string} pageURL url of the pages
   * @param {string} annotationId annotation if
   * @return {Object} promise
   */
  deleteAnnotation = (pageURL, annotationId) => {
    return new Promise(((resolve, reject) => {
      this.messageService.sendToBackground(
          {requestPath: ANNOTATIONS_MAPPING.DELETE, annotationId: annotationId},
          (response) => {
            resolve(response);
          });
    }));
  };

  /**
   *
   * @param {string} pageURL
   * @return {Promise<unknown>}
   */
  deleteAllAnnotations = (pageURL) => {
    return new Promise(((resolve, reject) => {
      this.messageService.sendToBackground(
          {requestPath: ANNOTATIONS_MAPPING.DELETE_ALL, pageURL: pageURL},
          (response) => {
            resolve(response);
          });
    }));
  };

  /**
   * Fetch all the annotation of the given page url.
   * @param {string} pageURL url of the pages
   * @return {Promise<Object>} promise to resolve to annotations.
   */
  fetchAnnotations = (pageURL) => {
    return new Promise((resolve, reject) => {
      this.messageService.sendToBackground(
          {requestPath: ANNOTATIONS_MAPPING.GET, pageURL: pageURL},
          (response) => {
            resolve(response);
          });
    });
  };
}
