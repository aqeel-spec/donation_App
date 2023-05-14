"use client";

import { HiShoppingBag } from 'react-icons/hi'
import React from "react";
// import {
//   totalCartItemsSelector,
//   TotalPriceSelector,
// } from "@store/features/cartSlice";
import { TotalPriceSelector , totalCartItemsSelector } from "@/store/features/cartlice";
//import { useAppSelector } from "store/store";
import { useAppSelector } from "@/store/store";

interface Props {
  className?: string;
}
const CartBtn = (props: Props) => {
  const totalItems = useAppSelector(totalCartItemsSelector);
  return (
    <div className={`${props.className} relative`}>
      <HiShoppingBag className="w-16 h-10  text-white" />
      {!!totalItems && (
        <div
          key={totalItems}
          className="bg-red-500 flex justify-center items-center
        rounded-full w-6 absolute -top-2 -right-2 text-white animate-pingOnce
        "
        >
          {totalItems}
        </div>
      )}
    </div>
  );
};

export default CartBtn;