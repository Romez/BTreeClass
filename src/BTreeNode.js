class BTreeNode {
  constructor (key, data = {}) {
    this.key = key
    this.data = data
    this.left = null
    this.right = null
  }
}

export default BTreeNode
