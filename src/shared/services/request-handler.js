/**
 * Request handler.
 */
export class RequestHandler {
  /**
   *
   */
  constructor() {
    this.requestMapping = new Map();
  }

  /**
   * Subscribe controller methods to a request path
   * @param {string} requestPath
   * @param {function} controllerMethod
   */
  subscribeRequestPath = (requestPath, controllerMethod) => {
    this.requestMapping.set(requestPath, controllerMethod);
  };

  /**
   *
   * @param {Object} requestPayload
   * @return {Promise}
   */
  handleRequest = (requestPayload) => {
    return new Promise(((resolve, reject) => {
      const method = this.requestMapping.get(requestPayload['requestPath']);
      if (method && typeof method === 'function') {
        const methodArguments = [];
        for (const key in requestPayload) {
          if (requestPayload.hasOwnProperty(key)) {
            methodArguments.push({'key': key, 'value': requestPayload[key]});
          }
        }
        const response = method.call(null, requestPayload);
        resolve(response);
      }
    }));
  };
}
