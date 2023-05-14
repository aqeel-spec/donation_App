import { CartItem, Product } from "@/types/interfaces";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartState {
    cartItems : CartItem[];
};

const initialState : CartState = {
    cartItems : [],
}

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        increament : (state , action: PayloadAction<Product>) => {
            const item = state.cartItems.find(
                (ele) => ele.product.$id == action.payload.$id
            );

            if(item) item.quantity;
            else {
                state.cartItems.push({
                    product : action.payload,
                    quantity : 1
                });
            }
        },
        
        decreament : (state,action:PayloadAction<Product>) => {
            const item = state.cartItems.find(
                (el) => el.product.$id == action.payload.$id
            );

            if(item) {
                item.quantity--;
                if(item.quantity===0) {
                    state.cartItems = state.cartItems.filter(
                        el => el.product.$id !== action.payload.$id
                    );
                }
            }

        },

    },
});

const cartItems = (state : RootState ) => state.cart.cartItems;
// const totalCartItemSelector = createSelector([cartItems],(cartItems) => 
//   cartItems.reduce((total : number , curr :CartItem ) => 
//   total += curr.quantity,0)
// );
export const totalCartItemsSelector = createSelector(
    [cartItems],
    (cartItems) =>
      cartItems.reduce(
        (total: number, curr: CartItem) =>
          (total += curr.quantity),
        0
      )
  );

export const TotalPriceSelector = createSelector(
    [cartItems],
    (cartItems) =>
      cartItems.reduce(
        (total: number, curr: CartItem) =>
          (total += curr.quantity * curr.product.Price),
        0
      )
);
export const productQtyInCartSelector = createSelector(
    [cartItems, (cartItems, productId: number) => productId],
    (cartItems, productId) =>
      cartItems.find((el) => el.product.$id == productId)?.quantity
);

export const { increament , decreament } = cartSlice.actions;
export default cartSlice.reducer;