import { productQtyInCartSelector , increament , decreament} from "@/store/features/cartlice";
import { useAppDispatch, useAppSelector } from "@/store/store"
import { Product } from "@/types/interfaces";
import QtyBtn from "./QtyBtn";

interface Props {
    product : Product
}
const AddToCartBtn = (props : Props) => {

    const quantity = useAppSelector((state) =>
    productQtyInCartSelector(state, props.product.$id)
  );
  const dispatch = useAppDispatch();
  if (!quantity)
    return (
      <div className="flex justify-center">
        <button
        className="hover:cursor-pointer rounded-md px-6 py-1 text-center bg-dataOrange text-white"
          onClick={() => dispatch(increament(props.product))}
        >
          Add To Cart
        </button>
      </div>
    );
  

    return (
        <QtyBtn
        onDecrease={() => dispatch(decreament(props.product))}
        onIncrease={() => dispatch(increament(props.product))}
        qty={quantity}
      />
    )
}


export default AddToCartBtn;