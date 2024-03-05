import { CartItemType, ShppingInfoType, UserType } from "../../types/type";

export interface UserReducerIntialState {
  user: UserType | null;
  loading: boolean;
}



export interface UserResponseType {
    user: UserType ;
    success: boolean;
  }
  

  export interface CartReducerIntialStateType{

  loading:boolean;
  cartItems:CartItemType[];
  subtotal:number;
  tax:number;
  shippingCharges:number;
  discount:number;
  total:number;
  shippingInfo:ShppingInfoType

  }