import {MessageService} from '../shared/services/message-service';
import {UIController} from './ui-controller';
import {AnnotationService} from './annotation-service';

console.log('Content Script');
(function() {
  const messagingService = new MessageService();
  const annotationService = new AnnotationService(messagingService);
  const uiController = new UIController(annotationService,
      document.location.href);
  uiController.loadAnnotations();
  messagingService.sendToBackground({pageURL: document.location.href},
      (response) => {
        console.log(response);
      });
})();

