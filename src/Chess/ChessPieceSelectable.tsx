import {ChessPiecesEnum} from "./ChessPiecesEnum";
import {ChessPiece} from "./ChessPiece";

interface Props {
  piece: ChessPiecesEnum,
  isSelected: boolean,
  onClick: (value: ChessPiecesEnum) => void
}

export function ChessPieceSelectable({ piece, isSelected, onClick }: Props): JSX.Element {
  return (
    <>
      <span style={{display: 'flex'}} onClick={() => onClick(piece)}>
        <ChessPiece piece={piece} isSelected={isSelected}/>
      </span>
    </>
  )
}