import { useState } from "react";
import Square from "../components/Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState(null);
  const setSquareValue = (index: number) => {
    const newData = squares.map((val, idx) => {
      if (idx === index) {
        return currentPlayer;
      }
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
  return (
    <div className="text-center">
      <h1 className="mb-6 text-2xl font-light">
        Hey {currentPlayer} it's your turn!
      </h1>
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
