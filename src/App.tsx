import React, { useState, useEffect } from "react";

interface SquareProps {
  value: string;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button
      className="w-32 h-32 m-2 p-2 bg-gray-300 hover:bg-gray-400"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const GameBoard: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    console.log({ winner, squares });

    return () => {};
  }, [winner, squares]);

  const reset = () => {
    setSquares(Array(9).fill(""));
    setXIsNext(true);
    setWinner(null);
  };

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    if (winner || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newSquares));
  };

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const calculateWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-200">
      <h1 className="text-lg font-medium text-gray-700 mb-2">Tic Tac Toe</h1>
      <div className="text-sm text-gray-600">{status}</div>
      <div className="flex flex-row mt-4">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="flex flex-row mt-4">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="flex flex-row mt-4">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={reset} className="bg-blue-500 text-white p-2 mt-8">
        Reset
      </button>
    </div>
  );
};

export default GameBoard;
