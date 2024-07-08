export const bfs = (grid: number[][], startNode: [number, number], endNode: [number, number]) => {
  const queue: [number, number][] = [startNode];
  const visited: Set<string> = new Set();
  const path: [number, number][] = [];

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;
    const key = `${row},${col}`;
    if (visited.has(key)) continue;
    visited.add(key);
    path.push([row, col]);
    if (row === endNode[0] && col === endNode[1]) return path;

    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    for (const [nRow, nCol] of neighbors) {
      if (nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[0].length && grid[nRow][nCol] !== 1) {
        queue.push([nRow, nCol]);
      }
    }
  }

  return path;
};

export const dfs = (grid: number[][], startNode: [number, number], endNode: [number, number]) => {
  const stack: [number, number][] = [startNode];
  const visited: Set<string> = new Set();
  const path: [number, number][] = [];

  while (stack.length > 0) {
    const [row, col] = stack.pop()!;
    const key = `${row},${col}`;
    if (visited.has(key)) continue;
    visited.add(key);
    path.push([row, col]);
    if (row === endNode[0] && col === endNode[1]) return path;

    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    for (const [nRow, nCol] of neighbors) {
      if (nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[0].length && grid[nRow][nCol] !== 1) {
        stack.push([nRow, nCol]);
      }
    }
  }

  return path;
};

export const dijkstra = (grid: number[][], startNode: [number, number], endNode: [number, number]) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const distances = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const prevNodes: ([number, number] | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
  const queue: [number, number, number][] = [[startNode[0], startNode[1], 0]];

  distances[startNode[0]][startNode[1]] = 0;

  while (queue.length > 0) {
    queue.sort((a, b) => a[2] - b[2]);
    const [row, col, dist] = queue.shift()!;
    if (row === endNode[0] && col === endNode[1]) break;

    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    for (const [nRow, nCol] of neighbors) {
      if (nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols && grid[nRow][nCol] !== 1) {
        const newDist = dist + 1;
        if (newDist < distances[nRow][nCol]) {
          distances[nRow][nCol] = newDist;
          prevNodes[nRow][nCol] = [row, col];
          queue.push([nRow, nCol, newDist]);
        }
      }
    }
  }

  const path: [number, number][] = [];
  let [row, col] = endNode;
  while (prevNodes[row][col]) {
    path.push([row, col]);
    [row, col] = prevNodes[row][col]!;
  }
  path.push(startNode);
  return path.reverse();
};

export const aStar = (grid: number[][], startNode: [number, number], endNode: [number, number]) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const distances = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const prevNodes: ([number, number] | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
  const heuristic = (node: [number, number]) => Math.abs(node[0] - endNode[0]) + Math.abs(node[1] - endNode[1]);
  const queue: [number, number, number, number][] = [[startNode[0], startNode[1], 0, heuristic(startNode)]];

  distances[startNode[0]][startNode[1]] = 0;

  while (queue.length > 0) {
    queue.sort((a, b) => (a[2] + a[3]) - (b[2] + b[3]));
    const [row, col, dist, _] = queue.shift()!;
    if (row === endNode[0] && col === endNode[1]) break;

    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    for (const [nRow, nCol] of neighbors) {
      if (nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols && grid[nRow][nCol] !== 1) {
        const newDist = dist + 1;
        if (newDist < distances[nRow][nCol]) {
          distances[nRow][nCol] = newDist;
          prevNodes[nRow][nCol] = [row, col];
          queue.push([nRow, nCol, newDist, heuristic([nRow, nCol])]);
        }
      }
    }
  }

  const path: [number, number][] = [];
  let [row, col] = endNode;
  while (prevNodes[row][col]) {
    path.push([row, col]);
    [row, col] = prevNodes[row][col]!;
  }
  path.push(startNode);
  return path.reverse();
};
