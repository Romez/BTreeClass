import {PreOrderBTree} from "./index";

class BTreeNode {
    constructor (value) {
        this.value = value
        this.left = null
        this.right = null
    }

    compareTo(value) {
        return this.value - value
    }
}

class BTree {
    constructor () {
        this._count = 0
        this._head
    }

    add(value) {
        if (!this._head) {
            this._head = new BTreeNode(value)
        } else {
            this.addTo(this._head, value)
        }
        this._count++
    }

    addTo(node, value) {
        if (node.value > value) {
            if (node.left) {
                this.addTo(node.left, value)
            } else {
                node.left = new BTreeNode(value)
            }
        } else {
            if (node.right) {
                this.addTo(node.right, value)
            } else {
                node.right = new BTreeNode(value)
            }
        }
    }

    contains(value) {
        const {current} = this.findWithParent(value)
        return current
    }

    findWithParent(value) {
        let current = this._head

        let parent = null

        while (current) {
            if (current.value > value) {
                parent = current

                current = current.left || null
            } else if (current.value < value) {
                parent = current

                current = current.right || null
            } else {
                break
            }
        }

        return {current, parent}
    }

    get count() {
        return this._count
    }

    remove(value) {
        const {current, parent} = this.findWithParent(value)

        if (current === null) {
            return false
        }

        this._count--

        //1
        if (current.right === null) {
            if (parent === null) {
                this._head = current.left
            } else {
                if (parent.value > current.value) {
                    parent.left = current.left
                } else {
                    parent.right = current.left
                }
            }
            // 2
        } else if (current.right.left === null) {
            current.right.left = current.left

            if (parent === null) {
                this._head = current.right
            } else {
                if (parent.value > current.value) {
                    parent.left = current.right
                } else {
                    parent.right = current.right
                }
            }
        } else {
            let leftmost = current.right.left
            let leftmostParent = current.right

            while(leftmost.left) {
                leftmostParent = leftmost
                leftmost = leftmost.left
            }

            leftmostParent.left = leftmost.right

            leftmost.left = current.left
            leftmost.right = current.right

            if (parent === null) {
                this._head = leftmost
            } else {
                if (parent.value > current.value) {
                    parent.left = leftmost
                } else if (parent.value < current.value) {
                    parent.right = leftmost
                }
            }
        }
    }

    *[Symbol.iterator]() {
        if (this._head) {
            const stack = []
            let current = this._head

            let goLeftNext = true

            stack.push(current)

            while(stack.length > 0) {
                if (goLeftNext) {
                    while(current.left) {
                        stack.push(current)
                        current = current.left
                    }
                }

                yield current.value

                if (current.right) {
                    current = current.right
                    goLeftNext = true
                } else {
                    current = stack.pop()
                    goLeftNext = false
                }

            }
        }
    }
}


export default PreOrderBTree
// function run() {
//     const btree = new BTree()
//     btree.add(8)
//     btree.add(5)
//     btree.add(12)
//     btree.add(3)
//     btree.add(7)
//     btree.add(10)
//     btree.add(15)
//
//     for (let item of btree) {
//         console.log(item)
//     }
//
//     // console.log(btree.count)
//
//     // btree.remove(8)
//     // console.log(btree.contains(5))
// }
//
