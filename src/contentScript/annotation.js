import $ from 'jquery';
import {textNodesBetween} from './xpath-helper';

/**
 * Class to render an annotation.
 */
export class Annotation {
  /**
   * Creates an annotation.
   * @param {Node} startNode
   * @param {Node} endNode
   * @param {number} startOffset
   * @param {number} endOffset
   * @param {string} text
   */
  constructor(startNode, endNode, startOffset, endOffset, text) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.startOffset = startOffset;
    this.endOffset = endOffset;
    this.text = text;
  }

  /**
   * Render the annotation.
   */
  render = () => {
    if (this.startNode === this.endNode) {
      let newNode;
      if (this.endOffset !== this.startNode.textContent.length) {
        newNode = this.startNode.splitText(this.endOffset);
      }
      if (this.startOffset !== 0) {
        newNode = this.startNode.splitText(this.startOffset);
        this.annotateTextNode(newNode);
      } else {
        this.annotateTextNode(this.startNode);
      }
    } else {
      const nodes = textNodesBetween(this.startNode, this.endNode);
      const that = this;
      $.each(nodes, function(i, n) {
        that.annotateTextNode(n);
      });

      if (this.startNode.nodeType === Node.TEXT_NODE) {
        const newNode = this.startNode.splitText(this.startOffset);
        this.annotateTextNode(newNode);
      }
      if (this.endNode.nodeType === Node.TEXT_NODE) {
        const newNode = this.endNode.splitText(this.endOffset);
        this.annotateTextNode(newNode.previousSibling);
      }
    }
  };

  /**
   *
   * @param {Node} node
   */
  annotateTextNode = (node) => {
    const $markerNode = $('<mark></mark>');
    $markerNode.text(node.textContent);
    $(node).replaceWith($markerNode);
  };
}
