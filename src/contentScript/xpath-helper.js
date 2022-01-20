/**
 * Returns xpath of given node
 * @param {Node} node
 * @return {string}
 */
function xpathOf(node) {
  return xPathOfHelper(node, '').
      toLowerCase().
      replace('#text', 'text()');
}

/**
 * xpath to find nodes between startNode and endNode
 * @param {Node} startNode
 * @param {Node} endNode
 * @return {string} xpath of text nodes between two given nodes
 */
function xpathOfTextNodesBetween(startNode, endNode) {
  const ns1 = xpathOf(startNode) +
      '/following::text()[normalize-space(.)!=""]';
  const ns2 = xpathOf(endNode) + '/preceding::text()';
  return ns1 + '[count' + '(' + '.|' + ns2 + ')' + '=' + 'count(' + ns2 +
      ')]';
}

/**
 *
 * @param {Node} startNode
 * @param {Node} endNode
 * @return {*[]} array of nodes between two given nodes
 */
function textNodesBetween(startNode, endNode) {
  const nodes = [];
  const xpath = xpathOfTextNodesBetween(startNode, endNode);
  const xPathResult = document.evaluate(xpath, document, null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);
  for (let i = 0; i < xPathResult.snapshotLength; i++) {
    nodes.push(xPathResult.snapshotItem(i));
  }
  return nodes;
}

/**
 *
 * @param {Node} currentNode
 * @param {string} currentPath
 * @return {*}
 */
function xPathOfHelper(currentNode, currentPath) {
  if (currentNode === null || currentNode === undefined) {
    return currentPath;
  }
  let similarNodesCount = 0;
  if (currentNode.parentNode) {
    for (let i = 0; i < currentNode.parentNode.childNodes.length; i++) {
      if (currentNode.nodeName ===
          currentNode.parentNode.childNodes[i].nodeName) {
        similarNodesCount++;
      }
    }
  }
  let nodePos = 1;
  let previousSibling = currentNode.previousSibling;
  while (previousSibling) {
    if (currentNode.nodeName === previousSibling.nodeName) {
      nodePos++;
    }
    previousSibling = previousSibling.previousSibling;
  }
  currentPath = '/' + (similarNodesCount === 1 ?
      currentNode.nodeName:
      currentNode.nodeName + '[' + nodePos + ']') + currentPath;
  return xPathOfHelper(currentNode.parentElement, currentPath);
}

export {xpathOf, textNodesBetween};
