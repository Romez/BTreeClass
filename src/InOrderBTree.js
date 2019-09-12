import Tree from './Tree';

class InOrderBTree extends Tree {
  * [Symbol.iterator]() {
    if (this.head) {
      const stack = [];
      let current = this.head;

      let goLeftNext = true;

      stack.push(current);

      while (stack.length > 0) {
        if (goLeftNext) {
          while (current.left) {
            stack.push(current);
            current = current.left;
          }
        }

        yield current;

        if (current.right) {
          current = current.right;
          goLeftNext = true;
        } else {
          current = stack.pop();
          goLeftNext = false;
        }
      }
    }
  }
}

export default InOrderBTree;
