import {Annotation} from './annotation';
import {xpathOf} from './xpath-helper';

let selectionStarted = false;

/**
 * Class to handle user interface behavior.
 */
export class UIController {
  /**
   * Constructor
   * @param {AnnotationService} annotationService instance
   * @param {string} pageURL
   */
  constructor(annotationService, pageURL) {
    this.annotationService = annotationService;
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
      this.handleDomSelection(document.getSelection());
    }
  };

  /**
   * Process html selection.
   * @param {Object} selection to be annotated.
   */
  handleDomSelection = (selection) => {
    if (selection && selection.type !== 'Range') {
      return;
    }
    this.createAnnotationFromHTMLSelection(this.pageURL,
        this.createSelection(selection));
  };

  /**
   *
   * @param {Object} selection
   * @return {Object}
   */
  createSelection = (selection) => {
    const range = selection.getRangeAt(0);
    const selectedRange = {
      text: range.toString(),
    };

    if ((range.startContainer === range.endContainer && range.startOffset <
            range.endOffset) ||
        (range.startContainer.compareDocumentPosition(range.endContainer))) {
      selectedRange['startNode'] = range.startContainer;
      selectedRange['endNode'] = range.endContainer;
      selectedRange['startOffset'] = range.startOffset;
      selectedRange['endOffset'] = range.endOffset;
    } else {
      if (range.startContainer.compareDocumentPosition(range.endContainer) ===
          Node.DOCUMENT_POSITION_PRECEDING) {
        selectedRange['startNode'] = range.endContainer;
        selectedRange['startOffset'] = range.endContainer.textContent.length -
            range.endOffset + 1;
        selectedRange['endNode'] = range.startContainer;
        selectedRange['endOffset'] = range.startContainer.textContent.length -
            range.startOffset;
      } else {
        selectedRange['startNode'] = range.endContainer;
        selectedRange['startOffset'] = range.startContainer.textContent.length -
            range.endOffset + 1;
        selectedRange['endNode'] = range.startContainer.textContent.length -
            range.startOffset;
      }
    }
    return selectedRange;
  };

  /**
   * Add annotation to the text.
   * @param {string} page url.
   * @param {Object} selection nodes to be highlighted and saved.
   */
  createAnnotationFromHTMLSelection = (page, selection) => {
    const annotation = new Annotation(xpathOf(selection.startNode),
        selection.startOffset, xpathOf(selection.endNode), selection.endOffset,
        selection.text);
    Promise.all([
      this.render(annotation),
      this.annotationService.saveAnnotation(page, annotation)]).finally(() => {
      console.log('Annotation Saved');
    });
  };

  /**
   * Render
   * @param {Object} uiView to be rendered
   * @return {Promise} promise of the operation
   */
  render = (uiView) => {
    return new Promise(((resolve, reject) => {
      uiView.render();
      resolve(true);
    }));
  };

  /**
   * Load page annotations.
   */
  loadAnnotations = () => {
    console.log('Loading annotations for page @' + this.pageURL);
  };
}

