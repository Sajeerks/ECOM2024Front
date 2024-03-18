import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerIntialStateType } from "./api/reducer-types";
import { CartItem, ShppingInfoType } from "../types/type";




const initialState:CartReducerIntialStateType= {
    loading:false,
    cartItems:[],
    subtotal:0,
    tax:0,
    shippingCharges:0,
    discount:0,
    total:0,
    shippingInfo:{
        address:"",
        city:"",
        state:"",
        country:"",
        pinCode:0,
      }
    }


   
   export const cartReducer = createSlice({
   
   name:"cartReducer",
   initialState,
   reducers:{
            addToCart:(state, action:PayloadAction<CartItem>)=>{
               state.loading = true;
               const index = state.cartItems.findIndex((i)=>i.productId === action.payload.productId)
               if(index !==-1){
                state.cartItems[index] = action.payload 
               }else{
                state.cartItems.push(action.payload);
                state.loading = false;
               }
                
               
               
            },
            removeCartItem:(state,  action:PayloadAction<string>)=>{
                state.loading = true;
                state.cartItems=  state.cartItems.filter((i)=>i.productId !==action.payload);
              state.loading = false;
            }, 


          calculatePriceInCart:(state)=>{
            state.loading = true;
     

            let subTotal = 0

            subTotal = state.cartItems.reduce((acc,prev)=>prev.quantity * prev.price +acc, 0)



            state.subtotal = subTotal;

            state.shippingCharges = state.subtotal > 1000?0:200;
            state.tax = Math.round(state.subtotal *0.18)
            state.total = state.subtotal +state.tax + state.shippingCharges - state.discount
            
            state.loading = false;

          },
          discountApplied:(state,  action:PayloadAction<number>)=>{
            state.loading = true;
            state.discount= action.payload
          state.loading = false;
        }, 
        saveShippingInfo:(state,  action:PayloadAction<ShppingInfoType>)=>{
             state.shippingInfo = action.payload
      }, 
      resetCart:()=>initialState, 

     

          
   
   
   },
}
)
   
   export const {addToCart, removeCartItem, calculatePriceInCart, discountApplied  , resetCart, saveShippingInfo} = cartReducer.actions