import {ChessPiecesEnum} from "./ChessPiecesEnum";
import {CSSProperties} from "react";
import {useLoggedLifecycle} from "../Hooks/useLoggedLifecycle";

interface Props {
  piece: ChessPiecesEnum,
  isSelected: boolean,
}

export function ChessPiece({ piece, isSelected }: Props): JSX.Element {
  const style: CSSProperties = {
    color: isSelected ? 'red' : 'black',
    transform: isSelected ? 'scale(1.5)' : 'scale(1)',
    fontSize: '64px',
    userSelect: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  }
  useLoggedLifecycle(piece);

  return (
    <>
      <span style={style}>{piece}</span>
    </>
  )
}