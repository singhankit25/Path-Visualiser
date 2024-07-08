// import React, { useState } from 'react';
// import { bfs, dfs, dijkstra, aStar } from '../algorithms/algorithms';
// import '../style.css';

// const Visualizer: React.FC = () => {
//   const numRows = 20;
//   const numCols = 50;

//   const createInitialGrid = () => {
//     const grid = [];
//     for (let row = 0; row < numRows; row++) {
//       const currentRow = [];
//       for (let col = 0; col < numCols; col++) {
//         currentRow.push(0);
//       }
//       grid.push(currentRow);
//     }
//     return grid;
//   };

//   const [grid, setGrid] = useState<number[][]>(createInitialGrid());
//   const [startNode, setStartNode] = useState<[number, number]>([0, 0]);
//   const [endNode, setEndNode] = useState<[number, number]>([19, 49]);
//   const [selecting, setSelecting] = useState<'start' | 'end' | null>(null);

//   const handleAlgorithm = async (algorithm: Function) => {
//     const visitedNodesInOrder = algorithm(grid, startNode, endNode);
//     animatePath(visitedNodesInOrder);
//   };

//   const animatePath = (path: [number, number][]) => {
//     for (let i = 0; i < path.length; i++) {
//       setTimeout(() => {
//         const newGrid = grid.slice();
//         const [row, col] = path[i];
//         newGrid[row][col] = 2; // Indicate visited node
//         setGrid(newGrid);
//       }, 50 * i);
//     }
//   };

//   const handleCellClick = (row: number, col: number) => {
//     if (selecting === 'start') {
//       setStartNode([row, col]);
//     } else if (selecting === 'end') {
//       setEndNode([row, col]);
//     } else {
//       const newGrid = grid.slice();
//       newGrid[row][col] = newGrid[row][col] === 1 ? 0 : 1; // Toggle wall
//       setGrid(newGrid);
//     }
//     setSelecting(null);
//   };

//   const resetGrid = () => {
//     setGrid(createInitialGrid());
//     setStartNode([0, 0]);
//     setEndNode([19, 49]);
//   };

//   return (
//     <div>
//       <button onClick={() => handleAlgorithm(bfs)}>BFS</button>
//       <button onClick={() => handleAlgorithm(dfs)}>DFS</button>
//       <button onClick={() => handleAlgorithm(dijkstra)}>Dijkstra's</button>
//       <button onClick={() => handleAlgorithm(aStar)}>A*</button>
//       <button onClick={() => setSelecting('start')}>Set Start Node</button>
//       <button onClick={() => setSelecting('end')}>Set End Node</button>
//       <button onClick={resetGrid}>Reset Grid</button>
//       <div className="grid">
//         {grid.map((row, rowIndex) => (
//           <div key={rowIndex} className="row">
//             {row.map((cell, colIndex) => {
//               const isStart = startNode[0] === rowIndex && startNode[1] === colIndex;
//               const isEnd = endNode[0] === rowIndex && endNode[1] === colIndex;
//               const cellClass = `cell ${
//                 cell === 1 ? 'wall' : cell === 2 ? 'visited' : ''
//               } ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''}`;
//               return (
//                 <div
//                   key={colIndex}
//                   className={cellClass}
//                   onClick={() => handleCellClick(rowIndex, colIndex)}
//                 ></div>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Visualizer;
import React, { useState } from 'react';
import { bfs, dfs, dijkstra, aStar } from '../algorithms/algorithms';
import '../style.css';

const Visualizer: React.FC = () => {
  const numRows = 20;
  const numCols = 50;

  const createInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        currentRow.push(0);
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const [grid, setGrid] = useState<number[][]>(createInitialGrid());
  const [startNode, setStartNode] = useState<[number, number]>([0, 0]);
  const [endNode, setEndNode] = useState<[number, number]>([19, 49]);
  const [selecting, setSelecting] = useState<'start' | 'end' | null>(null);

  const handleAlgorithm = async (algorithm: Function) => {
    const visitedNodesInOrder = algorithm(grid, startNode, endNode);
    animatePath(visitedNodesInOrder);
  };

  const animatePath = (path: [number, number][]) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const newGrid = grid.slice();
        const [row, col] = path[i];
        newGrid[row][col] = 2; // Indicate visited node
        setGrid(newGrid);
      }, 50 * i);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (selecting === 'start') {
      setStartNode([row, col]);
    } else if (selecting === 'end') {
      setEndNode([row, col]);
    } else {
      const newGrid = grid.slice();
      newGrid[row][col] = newGrid[row][col] === 1 ? 0 : 1; // Toggle wall
      setGrid(newGrid);
    }
    setSelecting(null);
  };

  const resetGrid = () => {
    setGrid(createInitialGrid());
    setStartNode([0, 0]);
    setEndNode([19, 49]);
  };

  return (
    <div className="visualizer">
      <div className="controls">
        <button onClick={() => handleAlgorithm(bfs)}>BFS</button>
        <button onClick={() => handleAlgorithm(dfs)}>DFS</button>
        <button onClick={() => handleAlgorithm(dijkstra)}>Dijkstra's</button>
        <button onClick={() => handleAlgorithm(aStar)}>A*</button>
        <button onClick={() => setSelecting('start')}>Set Start Node</button>
        <button onClick={() => setSelecting('end')}>Set End Node</button>
        <button onClick={resetGrid}>Reset Grid</button>
      </div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => {
              const isStart = startNode[0] === rowIndex && startNode[1] === colIndex;
              const isEnd = endNode[0] === rowIndex && endNode[1] === colIndex;
              const cellClass = `cell ${
                cell === 1 ? 'wall' : cell === 2 ? 'visited' : ''
              } ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''}`;
              return (
                <div
                  key={colIndex}
                  className={cellClass}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;
