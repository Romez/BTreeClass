import Tree from './Tree';

class BTreePostOrder extends Tree {
  * [Symbol.iterator]() {
    if (this.head) {
      const stack = [];

      stack.push(this.head);
      let prev;
      while (stack.length > 0) {
        const current = stack[stack.length - 1];

        const hasPrevChild = (current.left === prev || current.right === prev);

        const isLeaf = (!current.left && !current.right);

        if (hasPrevChild || isLeaf) {
          yield current;

          stack.pop();

          prev = current;
        } else {
          if (current.right) {
            stack.push(current.right);
          }

          if (current.left) {
            stack.push(current.left);
          }
        }
      }
    }
  }
}

export default BTreePostOrder;
