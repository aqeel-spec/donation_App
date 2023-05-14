
import { Product } from "@/types/interfaces";
import Image from "next/image";
import React from "react";
import AddToCartBtn from "./AddToCartBtn";

interface Props {
  product: Product;
}
const ProductCard = (props: Props) => {
  return (
    <div className="border rounded-md shadow hover:shadow-lg transition overflow-hidden ">
        <AddToCartBtn product={props.product} />
    </div>
  );
};

export default ProductCard;