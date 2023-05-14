'use client'
import { TotalPriceSelector } from "@/store/features/cartlice";
import { useAppSelector } from "@/store/store";
import React from "react";
import { AiFillBackward } from "react-icons/ai";

function Shopping() {

    const cartItems  = useAppSelector(
        (state) => state.cart.cartItems
      );
    
      const totalPrice = useAppSelector(TotalPriceSelector);
      console.log(cartItems)
      

  return (
    <>
      <div className="">
        <h1 className="text-3xl m-6 text-white font-extra-bold">
          Food Shopping
        </h1>
        <div className="flex flex-wrap max-w-screen-desktop mx-auto space-x-6 p-6 ">
          <div className="mx-auto max-w-screen-laptop w-auto flex-grow  justify-center text-center">
            
            <div className=" divide-y-2 bg-hamerBurger text-bleck ">
              <div className="bg-[#211A24]  ">
                <div className=" rounded-t-md flex p-2 justify-between  mx-auto text-center text-md font-medium text-white">
                  <h1>Products</h1>
                  <h1>Quantity</h1>
                  <h1>Price</h1>
                </div>
              </div>
              {
                    cartItems && cartItems.map((item) => (
                        <div key={item.product.$id} className="m-1 px-2 relative pl-1 justify-items-center items-center my-auto rounded-t-md flex p-2 justify-between mx-auto text-center text-md text-black " > 
                         <h1> {item.product.Item_name ? item.product.Item_name : item.product.Product_name } </h1>
                         <h1 className="pl-3"> {item.quantity} </h1>
                         <h1 className="pl-5">Rs.{item.product.Price} </h1>
                        </div>
                    ))
                }
            </div>
            {/** go back section */}
            <div className="px-3 flex justify-between mt-6 text-white">
              <div className="flex cursor-pointer decoration-sky-500 gap-1 hover:underline-offset-1 hover:underline text-center items-center justify-center">
                <AiFillBackward className=" h-6 w-6" />
                <span>Go back</span>
              </div>
              <button className="px-5 py-[2px] rounded-[4px] bg-dataOrange ">
                CLEAR
              </button>
            </div>
          </div>
          {/**  PAY NOW SECTIO HERE */}
          <div className="mt-2 p-4 flex-grow space-y-6 mx-auto text-center bg-[#D0D3D7] max-w-sm  ">
            <h1 className="py-6 text-2xl font-bold text-black">Details</h1>
            <div className="text-sm  space-y-6  divide-yellow-500 text-black/50">
              <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                <p>Product price</p>
                <h3>Rs. { totalPrice } </h3>
              </div>
              <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                <p>Tax</p>
                <h3>Rs. 0</h3>
              </div>
              <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                <p>Total</p>
                <h3>Rs. {totalPrice} </h3>
              </div>
            </div>
            <div className=" text-end mx-auto items-center justify-center justify-items-center text-white font-sans  ">
              <button className="mx-auto justify-end px-5 py-[2px] rounded-[4px] bg-dataOrange">
                PAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shopping;