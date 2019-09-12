import BTreeNode from './BTreeNode';

export default class Tree {
  constructor() {
    this.count = 0;
    this.head = null;
  }

  add(key, data = {}) {
    if (!this.head) {
      this.head = new BTreeNode(key, data);
    } else {
      this.addTo(this.head, key, data);
    }
    this.count += 1;
  }

  addTo(node, key, data) {
    if (node.key > key) {
      if (node.hasLeftBranch()) {
        this.addTo(node.left, key, data);
      } else {
        node.setLeftBranch(new BTreeNode(key, data));
      }
    } else if (node.hasRightBranch()) {
      this.addTo(node.right, key, data);
    } else {
      node.setRightBranch(new BTreeNode(key, data));
    }
  }

  findWithParent(key) {
    let current = this.head;
    let parent = null;

    while (current) {
      if (current.key > key) {
        parent = current;
        current = current.left || null;
      } else if (current.key < key) {
        parent = current;
        current = current.right || null;
      } else {
        break;
      }
    }

    return { current, parent };
  }


  contains(key) {
    const { current } = this.findWithParent(key);
    return current;
  }

  remove(key) {
    const { current, parent } = this.findWithParent(key);

    if (current === null) {
      return false;
    }

    this.count -= 1;

    // 1
    if (current.right === null) {
      if (parent === null) {
        this.head = current.left;
      } else if (parent.value > current.value) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
      // 2
    } else if (current.right.left === null) {
      current.right.left = current.left;

      if (parent === null) {
        this.head = current.right;
      } else if (parent.key > current.key) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else {
      let leftmost = current.right.left;
      let leftmostParent = current.right;

      while (leftmost.left) {
        leftmostParent = leftmost;
        leftmost = leftmost.left;
      }

      leftmostParent.left = leftmost.right;

      leftmost.left = current.left;
      leftmost.right = current.right;

      if (parent === null) {
        this.head = leftmost;
      } else if (parent.key > current.key) {
        parent.left = leftmost;
      } else if (parent.key < current.key) {
        parent.right = leftmost;
      }
    }
    return true;
  }
}
