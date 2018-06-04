import BTreeNode from './BTreeNode'

class BTreePostOrder {
  constructor () {
    this._count = 0
    this._head = null
  }

  add (key, data) {
    if (!this._head) {
      this._head = new BTreeNode(key, data)
    } else {
      this.addTo(this._head, key, data)
    }
    this._count++
  }

  addTo (node, key, data) {
    if (node.key > key) {
      if (node.left) {
        this.addTo(node.left, key, data)
      } else {
        node.left = new BTreeNode(key, data)
      }
    } else {
      if (node.right) {
        this.addTo(node.right, key, data)
      } else {
        node.right = new BTreeNode(key, data)
      }
    }
  }

  contains (key) {
    const {current} = this.findWithParent(key)
    return !!current
  }

  findWithParent (key) {
    let current = this._head
    let parent = null

    while (current) {
      if (current.key > key) {
        parent = current
        current = current.left || null
      } else if (current.key < key) {
        parent = current
        current = current.right || null
      } else {
        break
      }
    }

    return {current, parent}
  }

  get count () {
    return this._count
  }

  remove (key) {
    const {current, parent} = this.findWithParent(key)

    if (current === null) {
      return false
    }

    this._count--

    // 1 current doesnt have right
    if (current.right === null) {
      if (parent === null) {
        this._head = current.left
      } else {
        if (parent.key > current.key) {
          parent.left = current.left
        } else {
          parent.right = current.left
        }
      }
      // 2 current has right, without left
    } else if (current.right.left === null) {
      current.right.left = current.left

      if (parent === null) {
        this._head = current.right
      } else {
        if (parent.key > current.key) {
          parent.left = current.right
        } else {
          parent.right = current.right
        }
      }
    } else { // current has right with left
      let leftmost = current.right.left
      let leftmostParent = current.right

      while (leftmost.left) {
        leftmostParent = leftmost
        leftmost = leftmost.left
      }

      leftmostParent.left = leftmost.right

      leftmost.left = current.left
      leftmost.right = current.right

      if (parent === null) {
        this._head = leftmost
      } else {
        if (parent.key > current.key) {
          parent.left = leftmost
        } else if (parent.key < current.key) {
          parent.right = leftmost
        }
      }
    }
  }

  * [Symbol.iterator] () {
    if (this._head)  {
      const stack = []

      stack.push(this._head)
      let prev
      while (stack.length > 0) {

        let current = stack[stack.length - 1]

        const hasPrevChild = (current.left === prev || current.right === prev)

        const isLeaf = (!current.left && !current.right)

        if (hasPrevChild || isLeaf) {
          yield current.value

          stack.pop()

          prev = current
        } else {
          if (current.right) {
            stack.push(current.right)
          }

          if (current.left) {
            stack.push(current.left)
          }
        }
      }

    }
  }
}

export default BTreePostOrder