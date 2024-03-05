export interface UserType {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
}

export interface ProductType {
  name: string;
  price: number;
  stock: number;
  _id: string;
  category: string;

  photo: string;
}



export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};
export type OrderItem = Omit<CartItemType, "stock"> & { _id: string };



export type  CartItemType = {
  productId:string;
  name:string;
  photo:string;
 
  price:number;
  quantity:number
  stock:number;
}







export interface CustomError{
  status:number,
  data:{
    message:string;
    success:boolean
  }
}



export type  ShppingInfoType = {
  address:string;
  city:string;
  state:string;
  country:string;
  pinCode:number
}




