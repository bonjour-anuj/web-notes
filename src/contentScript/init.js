import {MessageService} from '../shared/services/message-service';

console.log('Content Script');
const service = new MessageService();
service.sendMessageToApp({pageURL: document.location.href}, (response) => {
  console.log(response);
});
