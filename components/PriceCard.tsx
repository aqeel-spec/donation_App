'use client'
import { CartItem } from "@/types/interfaces";
import { useAppDispatch } from "@/store/store";
import { increament , decreament } from "@/store/features/cartlice";
import QtyBtn from "./QtyBtn";

import React from 'react'
interface Props {
  cartItem: CartItem;
}

const PriceCard = ({ cartItem }: Props) => {
    const dispatch = useAppDispatch();
  return (
    <div>
        {
            (cartItem && 
              <> 
                <h1> {cartItem.product.Item_name} </h1>
                <QtyBtn
                    qty={cartItem.quantity}
                    onDecrease={() =>
                        dispatch(decreament(cartItem.product))
                    }
                    onIncrease={() =>
                        dispatch(increament(cartItem.product))
                    }
                    />
                <h1 className="pl-5">Rs.{cartItem.product.Price} </h1>
              </>
            )
        }
        <p className="text-center">
        {cartItem.quantity * cartItem.product.Price}
      </p>
    </div>
  )
}

export default PriceCard
// {
//     cartItems && cartItems.map((item) => (
//         <div key={item.product.$id} className="m-1 px-2 relative pl-1 justify-items-center items-center my-auto rounded-t-md flex p-2 justify-between mx-auto text-center text-md text-black " > 
//          <h1> {item.product.Item_name} </h1>
//          <h1 className="pl-3"> {item.quantity} </h1>
//          <h1 className="pl-5">Rs.{item.product.Price} </h1>
//         </div>
//     ))
// }