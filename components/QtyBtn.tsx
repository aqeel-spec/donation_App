
import React from "react";
//import { Button } from "./elements";
import { BsFillTrashFill } from 'react-icons/bs';
interface Props {
  onIncrease: () => void;
  onDecrease: () => void;
  qty: number;
}
const QtyBtn = (props: Props) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        className="w-12 h-10  "
        onClick={props.onDecrease}
      >
        {props.qty === 1 ? (
          <BsFillTrashFill className="w-4" />
        ) : (
          "-"
        )}
      </button>
      <p>{props.qty}</p>
      <button
        className="w-12 h-10"
        
        onClick={props.onIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QtyBtn;