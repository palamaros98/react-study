import {ChessPiecesList} from "./ChessPiecesList";
import {MemoizedChess} from "./ChessPiece";
import {useCallback, useState} from "react";
import {ChessPiecesEnum} from "./ChessPiecesEnum";


export function Chess(): JSX.Element {
  const [selectedPiece, setSelectedPiece] = useState<ChessPiecesEnum>(ChessPiecesEnum.KING);

  return (
    <>
      <div>
        <ChessPiecesList selectedPiece={selectedPiece} onChange={setSelectedPiece}/>
      </div>
      <div style={{width: '100%', textAlign: 'center'}}>
        <MemoizedChess piece={selectedPiece} isSelected={true}/>
      </div>

    </>
  )
}
