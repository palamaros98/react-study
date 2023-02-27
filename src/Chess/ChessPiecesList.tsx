import {ChessPiecesEnum} from "./ChessPiecesEnum";
import './ChessPiecesList.css';
import {ChessPieceSelectable} from "./ChessPieceSelectable";

interface Props {
  selectedPiece: ChessPiecesEnum,
  onChange: (newValue: ChessPiecesEnum) => void
}

const pieces: ChessPiecesEnum[] = [
  ChessPiecesEnum.BISHOP,
  ChessPiecesEnum.KING,
  ChessPiecesEnum.PAWN,
  ChessPiecesEnum.KNIGHT,
  ChessPiecesEnum.QUEEN,
  ChessPiecesEnum.ROOK
]

export function ChessPiecesList({selectedPiece, onChange}: Props): JSX.Element {
  return (
    <>
      <div className={'pieces-container'}>
        {pieces.map((piece) => (
          <ChessPieceSelectable key={piece} piece={piece} isSelected={selectedPiece === piece}
                      onClick={() => onChange(piece)}/>
        ))}
      </div>
    </>
  )
}