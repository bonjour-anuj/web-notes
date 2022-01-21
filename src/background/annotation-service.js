/**
 * Annotation CRUD
 */
export class AnnotationService {
  /**
   *
   * @param {string} pageURL
   * @param {Object} annotation
   * @return {string} id
   */
  saveAnnotation = (pageURL, annotation) => {
    console.log('Saving Annotation');
    console.dir(annotation);
    return 'SAVED ID';
  };

  /**
   *
   * @param {Object} requestParams
   * @return {string} any
   */
  handleRequest = (...params) => {
    const request = params[0];
    // for (let i = 0; i < requestParams.length; i++) {
    //   request[requestParams[i].key] = requestParams[i].value;
    // }
    switch (request['requestPath']) {
      case 'annotation.save':
        return this.saveAnnotation(request['pageURL'], request['annotation']);
    }
  };
}
