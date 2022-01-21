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
            requestPath: 'annotation.save',
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
          {requestPath: 'annotation.delete', annotationId: annotationId},
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
          {requestPath: 'annotation.get', pageURL: pageURL}, (response) => {
            resolve(response);
          });
    });
  };
}
