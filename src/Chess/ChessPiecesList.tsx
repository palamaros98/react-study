import {ChessPiecesEnum} from "./ChessPiecesEnum";
import './ChessPiecesList.css';
import {MemoizedChessPieceSelectable} from "./ChessPieceSelectable";
import {useCallback} from "react";

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

  const callback = (selectedPieces: ChessPiecesEnum) => {
    onChange(selectedPieces);
    console.log('Chess set piece')
  }

  const memoizedCallback = useCallback((selectedPiece: ChessPiecesEnum) => {
    onChange(selectedPiece);
    console.log('Chess set piece memoized')
  }, [])

  return (
    <>
      <div className={'pieces-container'}>
        {pieces.map((piece) => (
          <MemoizedChessPieceSelectable key={piece} piece={piece} isSelected={selectedPiece === piece}
                      onClick={memoizedCallback}/>
        ))}
      </div>
    </>
  )
}
