/**
 * Message class to carry payload.
 */
class Message {
  /**
   *
   * @param {any} payload to be sent
   */
  constructor(payload) {
    this.payload = payload;
  }
}

/**
 * Service enabling message passing between background, content script & action.
 */
export class MessageService {
  /**
   * constructor
   */
  constructor() {
    chrome.runtime.onMessage.addListener(this.onMessageListener);
  }

  /**
   * Sends message to background message listener.
   * @param {Object} payload to be sent to background listener
   * @param {function} callback to be called by background to send back the
   * response if any.
   */
  sendToBackground = (payload, callback) => {
    chrome.runtime.sendMessage(new Message(payload), (message) => {
      callback(message['payload']);
    });
  };

  /**
   * Browser onMessage listener
   * @param {Object} message message received
   * @param {Object} sender sender of the message
   * @param {function} sendResponse callback
   * @return {boolean} true for async response.
   */
  onMessageListener = (message, sender, sendResponse) => {
    console.dir(message);
    console.dir(sender);
    if (sendResponse) {
      sendResponse(new Message('OK'));
    }
    return true;
  };
}
