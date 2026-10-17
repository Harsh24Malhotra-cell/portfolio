// N-ary tree helpers shared by the hero canvas and the theorem lab.

export interface TreeNode {
  parent: number
  depth: number
  children: number[]
}

export interface Tree {
  nodes: TreeNode[]
  tour: number[] // Euler tour: depth-first order including returns to parents
  depth: number
}

export interface Point {
  x: number
  y: number
}

export function buildTree(n: number, depth: number): Tree {
  const nodes: TreeNode[] = [{ parent: -1, depth: 0, children: [] }]
  const grow = (i: number) => {
    if (nodes[i].depth >= depth) return
    for (let k = 0; k < n; k++) {
      nodes.push({ parent: i, depth: nodes[i].depth + 1, children: [] })
      const j = nodes.length - 1
      nodes[i].children.push(j)
      grow(j)
    }
  }
  grow(0)
  const tour: number[] = []
  const dfs = (i: number) => {
    tour.push(i)
    for (const j of nodes[i].children) {
      dfs(j)
      tour.push(i)
    }
  }
  dfs(0)
  return { nodes, tour, depth }
}

export function leaves(tree: Tree, i = 0): number[] {
  const { children } = tree.nodes[i]
  return children.length ? children.flatMap((j) => leaves(tree, j)) : [i]
}

// Assigns each leaf a value in order, then places parents at the mean of their children.
export function spreadFromLeaves(tree: Tree, leafValue: (index: number, count: number) => number): number[] {
  const out = new Array<number>(tree.nodes.length).fill(0)
  const ls = leaves(tree)
  ls.forEach((leaf, i) => (out[leaf] = leafValue(i, ls.length)))
  const fill = (i: number): number => {
    const { children } = tree.nodes[i]
    if (!children.length) return out[i]
    out[i] = children.reduce((s, j) => s + fill(j), 0) / children.length
    return out[i]
  }
  fill(0)
  return out
}

export function setupCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const dpr = Math.min(2, devicePixelRatio || 1)
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { ctx, w, h }
}
