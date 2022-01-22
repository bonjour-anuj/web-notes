import {MessageService} from '../shared/services/message-service';
import {RequestHandler} from '../shared/services/request-handler';
import {AnnotationController} from './controllers/annotation-controller';

(function() {
  const requestHandler = new RequestHandler();
  new MessageService(requestHandler);
  new AnnotationController(requestHandler);
})();

