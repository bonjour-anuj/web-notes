import {Annotation} from './annotation';

let selectionStarted = false;

/**
 * Class to handle user interface behavior.
 */
export class UIController {
  /**
   * Constructor
   * @param {string} pageURL
   */
  constructor(pageURL) {
    this.pageURL = pageURL;
    this.setupListeners();
  }

  /**
   * Setup ui event listeners.
   */
  setupListeners = () => {
    document.addEventListener('selectstart', this.onSelectionStart);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  /**
   * Listener for selection start event.
   */
  onSelectionStart = () => {
    selectionStarted = true;
  };

  /**
   * Listener to mouseup event.
   */
  onMouseUp = () => {
    if (selectionStarted) {
      selectionStarted = false;
      this.processSelection(document.getSelection());
    }
  };

  /**
   * Process html selection.
   * @param {Object} selection to be annotated.
   */
  processSelection = (selection) => {
    if (selection && selection.type !== 'Range') {
      return;
    }
    const selectedNodes = {
      startNode: selection['anchorNode'],
      endNode: selection['focusNode'],
      startOffset: selection['anchorOffset'],
      endOffset: selection['focusOffset'],
      textSelection: selection.toString(),
    };
    this.createAnnotation(this.pageURL, selectedNodes);
  };

  /**
   * Add annotation to the text.
   * @param {string} page url.
   * @param {Object} selectedNodes nodes to be highlighted and saved.
   */
  createAnnotation = (page, selectedNodes) => {
    this.highlightTextSelection(selectedNodes);
  };

  /**
   * Highlight the text nodes.
   * @param {Object} selectedNodes nodes to be highlighted and saved.
   */
  highlightTextSelection = (selectedNodes) => {
    const annotation = new Annotation(selectedNodes.startNode,
        selectedNodes.endNode,
        selectedNodes.startOffset,
        selectedNodes.endOffset,
        selectedNodes.textSelection);
    annotation.render();
  };

  /**
   * Load page annotations.
   */
  loadAnnotations = () => {
    console.log('Loading annotations for page @' + this.pageURL);
  };
}

