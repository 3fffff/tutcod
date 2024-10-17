const readline = require("readline").createInterface(process.stdin, process.stdout)

readline.on("line", line => {
  let arr = line.split(" ").map(Number)
  // console.time()
  const graph = createGraph(arr)
  const last = arr.length
  arr = null
  const nodeState = new Map()
  const startNode = { id: 0, distanceToSource: Number.POSITIVE_INFINITY, visited: false, open: false, heapId: -1 };
  startNode.distanceToSource = 0
  nodeState.set(0, startNode)
  startNode.open = true
  const queue = Queue()
  queue.push(startNode);
  while (queue.length) {
    const parent = queue.pop()
    parent.visited = true
    if (parent.id === 2 * last - 1) break
    graph[parent.id].forEach(curr => {
      let currNode = nodeState.get(curr);
      if (!currNode) {
        currNode = { id: curr, distanceToSource: Number.POSITIVE_INFINITY, visited: false, open: false, heapId: -1 };
        nodeState.set(curr, currNode);
      }

      if (currNode.visited) return

      if (currNode.open === false) {
        queue.push(currNode);
        currNode.open = true;
      }

      const distance = parent.distanceToSource + 1;
      if (distance >= currNode.distanceToSource) return;

      //currNode.parent = parent.id;
      currNode.distanceToSource = distance;
      // currNode.fScore = distance //+ heuristic(curr, arr.length - 1);
      queue.updateItem(currNode.heapId)
    });
    //graph.delete(parent.id)
  }
  // console.timeEnd()
  console.log(Math.floor(nodeState.get(2 * (last) - 2).distanceToSource / 2))
  readline.close()
}).on("close", () => process.exit(0))

function createGraph(arr) {
  const mapArr = new Map()
  /* for (let i = 0; i < arr.length; i++) {
     if (!mapArr.has(arr[i])) mapArr.set(arr[i], [i])
     else mapArr.get(arr[i]).push(i)
   }*/
  const graph = []
  for (let i = 0; i < 2 * arr.length; i++) {
    const node = []
    if (i + 1 < 2 * arr.length)
      node.push(i + 1)
    if (i - 1 >= 0)
      node.push(i - 1)
    graph.push(node)
    // const findKey = mapArr.get(arr[i])
    //  node.push(...findKey.filter(x => x != i - 1 || x != i + 1))
    //  graph.set(i, node.filter(x => x != i).sort((a, b) => b - a))
  }
  for (let i = 0; i < arr.length; i++) {
    if (!mapArr.has(arr[i])) {
      mapArr.set(arr[i], graph.length)
      graph.push([])
    }
    graph[2 * i].push(mapArr.get(arr[i]))
    graph[mapArr.get(arr[i])].push(2 * i)
  }
  return graph
}

const heuristic = (from, to) => to - from

function Queue() {
  class PriorityQueue {
    constructor() {
      this.data = []
      this.length = this.data.length;
    }

    compare = (a, b) => { return a.distanceToSource - b.distanceToSource }

    notEmpty() {
      return this.length > 0
    }

    pop() {
      if (this.length === 0) return undefined;

      const top = this.data[0];
      this.length--;

      if (this.length > 0) {
        this.data[0] = this.data[this.length];
        this.data[0].heapId = 0
        this.down(0);
      }
      this.data.pop();

      return top;
    }

    push(item) {
      this.data.push(item);
      item.heapId = this.length
      this.length++;
      this.up(this.length - 1);
    }

    up(pos) {
      const item = this.data[pos];

      while (pos > 0) {
        const parent = (pos - 1) >> 1;
        const current = this.data[parent];
        if (this.compare(item, current) >= 0) break;
        this.data[pos] = current;
        current.heapId = pos
        pos = parent;
      }

      item.heapId = pos
      this.data[pos] = item;
    }

    down(pos) {
      const halfLength = this.length >> 1;
      const item = this.data[pos];

      while (pos < halfLength) {
        let left = (pos << 1) + 1;
        const right = left + 1;
        let best = this.data[left];

        if (right < this.length && this.compare(this.data[right], best) < 0) {
          left = right;
          best = this.data[right];
        }
        if (this.compare(best, item) >= 0) break;

        this.data[pos] = best;
        best.heapId = pos
        pos = left;
      }

      item.heapId = pos
      this.data[pos] = item;
    }
    updateItem(pos) {
      this.down(pos);
      this.up(pos);
    }
  }

  return new PriorityQueue();
}
