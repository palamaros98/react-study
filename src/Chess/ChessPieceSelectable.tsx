import {ChessPiecesEnum} from "./ChessPiecesEnum";
import {MemoizedChess} from "./ChessPiece";
import {useLoggedLifecycle} from "../Hooks/useLoggedLifecycle";
import {memo} from "react";

interface Props {
  piece: ChessPiecesEnum,
  isSelected: boolean,
  onClick: (value: ChessPiecesEnum) => void
}

function ChessPieceSelectable({ piece, isSelected, onClick }: Props): JSX.Element {
  useLoggedLifecycle(piece);

  return (
    <>
      <span style={{display: 'flex'}} onClick={() => onClick(piece)}>
        <MemoizedChess piece={piece} isSelected={isSelected}/>
      </span>
    </>
  )
}

export const MemoizedChessPieceSelectable = memo(ChessPieceSelectable);
