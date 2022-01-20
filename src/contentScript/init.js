import {MessageService} from '../shared/services/message-service';
import {UIController} from './ui-controller';

console.log('Content Script');
(function() {
  const messagingService = new MessageService();
  const uiController = new UIController(document.location.href);
  uiController.loadAnnotations();
  messagingService.sendToBackground({pageURL: document.location.href},
      (response) => {
        console.log(response);
      });
})();

