import {MessageService} from '../shared/services/message-service';
import {RequestHandler} from '../shared/services/request-handler';
import {AnnotationService} from './annotation-service';

(function() {
  const requestHandler = new RequestHandler();
  new MessageService(requestHandler);
  const annotationService = new AnnotationService();
  requestHandler.subscribeRequestPath('annotation.save',
      annotationService.handleRequest);
})();

console.log('Background Service Worker');


