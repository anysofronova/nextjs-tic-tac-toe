import styles from "./Square.module.css";
import cn from "classnames";

type typePlayer = "X" | "O" | "BOTH" | null;

const Square = ({
  winner,
  onClick,
  value,
}: {
  winner: typePlayer;
  value: typePlayer;
  onClick: () => void;
}) => {
  if (!value)
    return (
      <button
        onClick={onClick}
        disabled={Boolean(winner)}
        className={cn(styles.square)}
      />
    );
  return (
    <button
      className={cn(styles.square, value === "X" ? styles.x : styles.y)}
      disabled
    >
      {value}
    </button>
  );
};

export default Square;
