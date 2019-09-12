class BTreeNode {
  constructor(key, data = {}) {
    this.key = key;
    this.data = data;
    this.left = null;
    this.right = null;
  }

  setLeftBranch(node) {
    this.left = node;
    return this;
  }

  setRightBranch(node) {
    this.right = node;
    return this;
  }

  hasLeftBranch() {
    return this.left !== null;
  }
}

export default BTreeNode;
