import {ChessPiecesList} from "./ChessPiecesList";
import {ChessPiece} from "./ChessPiece";
import {useState} from "react";
import {ChessPiecesEnum} from "./ChessPiecesEnum";


export function Chess(): JSX.Element {
  const [selectedPiece, setSelectedPiece] = useState<ChessPiecesEnum>(ChessPiecesEnum.KING);

  return (
    <>
      <div>
        <ChessPiecesList selectedPiece={selectedPiece} onChange={setSelectedPiece}/>
      </div>
      <div style={{width: '100%', textAlign: 'center'}}>
        <ChessPiece piece={selectedPiece} isSelected={true}/>
      </div>

    </>
  )
}