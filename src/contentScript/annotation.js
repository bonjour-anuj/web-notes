import $ from 'jquery';

/**
 * Class to render an annotation.
 */
export class Annotation {
  /**
   * Creates an annotation.
   * @param {string} startNodePath
   * @param {number} startOffset
   * @param {string} endNodePath
   * @param {number} endOffset
   * @param {string} text
   */
  constructor(startNodePath, startOffset, endNodePath, endOffset, text) {
    this.startNodePath = startNodePath;
    this.startOffset = startOffset;
    this.endNodePath = endNodePath;
    this.endOffset = endOffset;
    this.text = text;
  }

  /**
   * On hover listener
   * @param {Event} e
   */
  onHover = (e) => {
    console.dir(e);
  };

  /**
   * Render the annotation.
   */
  render = () => {
    const startNode = this.xpathToNode(this.startNodePath);
    if (this.startNodePath === this.endNodePath) {
      let newNode;
      if (this.endOffset !== startNode.textContent.length) {
        newNode = startNode.splitText(this.endOffset);
      }
      if (this.startOffset !== 0) {
        newNode = startNode.splitText(this.startOffset);
        this.annotateTextNode(newNode);
      } else {
        this.annotateTextNode(startNode);
      }
    } else {
      const endNode = this.xpathToNode(this.endNodePath);
      const textNodesInBetween = this.textNodesBetween(this.startNodePath,
          this.endNodePath);
      const that = this;
      $.each(textNodesInBetween, function(i, n) {
        that.annotateTextNode(n);
      });

      if (startNode.nodeType === Node.TEXT_NODE) {
        const newNode = startNode.splitText(this.startOffset);
        this.annotateTextNode(newNode);
      }
      if (endNode.nodeType === Node.TEXT_NODE) {
        const newNode = endNode.splitText(this.endOffset);
        this.annotateTextNode(newNode.previousSibling);
      }
    }
  };

  /**
   *
   * @param {string} xpath
   * @return {Node}
   */
  xpathToNode = (xpath) => {
    try {
      const snapshot = document.evaluate(xpath, document, null,
          XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      return snapshot.singleNodeValue;
    } catch (e) {
      throw e;
    }
  };

  /**
   *
   * @param {string} startNodePath
   * @param {string} endNodePath
   * @return {*[]} array of nodes between two given nodes
   */
  textNodesBetween = (startNodePath, endNodePath) => {
    const nodes = [];
    const xpath = this.xpathOfTextNodesBetween(startNodePath, endNodePath);
    try {
      const xPathResult = document.evaluate(xpath, document, null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null);
      for (let i = 0; i < xPathResult.snapshotLength; i++) {
        nodes.push(xPathResult.snapshotItem(i));
      }
    } catch (e) {
      console.error(e.message, e);
      throw e;
    }
    return nodes;
  };

  /**
   * xpath to find nodes between startNode and endNode
   * @param {string} startNodePath
   * @param {string} endNodePath
   * @return {string} xpath of text nodes between two given nodes
   */
  xpathOfTextNodesBetween = (startNodePath, endNodePath) => {
    const ns1 = startNodePath + '/following::text()[normalize-space(.)!=""]';
    const ns2 = endNodePath + '/preceding::text()';
    return ns1 + '[count' + '(' + '.|' + ns2 + ')' + '=' + 'count(' + ns2 +
        ')]';
  };

  /**
   *
   * @param {Node} node
   */
  annotateTextNode = (node) => {
    const $markerNode = $('<mark class="_web-notes"></mark>');
    $markerNode.text(node.textContent);
    $(node).replaceWith($markerNode);
    $markerNode.hover(this.onHover, () => {
    });
  };
}
