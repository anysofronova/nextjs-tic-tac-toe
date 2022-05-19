import { useEffect, useState } from "react";
import Square from "../components/Square";

type typePlayer = "X" | "O" | "BOTH" | null;

const calculateWinner = (squares: typePlayer[]) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<typePlayer>(null);
  const setSquareValue = (index: number) => {
    const newData = squares.map((val, idx) => {
      if (idx === index) return currentPlayer;
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };
  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer("X");
  };
  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }
    if (!w && !squares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  });
  return (
    <div className="text-center">
      <h1 className="mb-6 text-2xl font-light">
        Hey {currentPlayer} it's your turn!
      </h1>
      <p className="h-10 font-light">
        {winner && winner !== "BOTH" && `Congratulations ${winner}!`}
        {winner && winner === "BOTH" && "Congratulations you're both winner!"}
      </p>
      <div className="grid grid-cols-3 grid-rows-3 border border-slate-800 h-72 w-72">
        {Array(9)
          .fill(null)
          .map((_, idx) => (
            <Square
              winner={winner}
              key={idx}
              onClick={() => setSquareValue(idx)}
              value={squares[idx]}
            />
          ))}
      </div>
      <button
        onClick={reset}
        className="border mt-8 px-8 py-2 rounded hover:bg-slate-100"
      >
        Reset
      </button>
    </div>
  );
};

export default Board;
