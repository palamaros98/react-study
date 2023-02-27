import {ChessPiecesEnum} from "./ChessPiecesEnum";
import {CSSProperties, memo} from "react";
import {useLoggedLifecycle} from "../Hooks/useLoggedLifecycle";

interface Props {
  piece: ChessPiecesEnum,
  isSelected: boolean,
}

function ChessPiece({ piece, isSelected }: Props): JSX.Element {
  const style: CSSProperties = {
    color: isSelected ? 'red' : 'black',
    transform: isSelected ? 'scale(1.5)' : 'scale(1)',
    fontSize: '64px',
    userSelect: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  }

  return (
    <>
      <span style={style}>{piece}</span>
    </>
  )
}

export const MemoizedChess = memo(ChessPiece);
