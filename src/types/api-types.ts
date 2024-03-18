import {  CartItemType, OrderItem, ProductType, ShppingInfoType, UserType } from "./type";

export interface MessageResponse {
  success: boolean;
  message: string;
}



export interface AllUsersResponse {
  success: boolean;
  message: string;
  users:UserType[]
}

export interface DeleteUserRequest {
  userId:string
  userToBeDeletedID:string
}

export interface StatsType{
  cartegoryCount:Record<string, number>[]
    changePercent: {
      products: number;
      users: number;
      orders: number;
      revenue: number;
  }
    toatalRevenue:number
    count: {
      user: number;
      product: number;
      orders: number;
  }
    chart:{
        order:number[],
        revenue:number[]
},

userRatio:{
  male: number;
  female: number;
},
latestTransactions:{
  _id: string;
  discount: number;
  amount: number;
  quantity: number;
  status: "Processing" | "Shipped" | "Delivered";
}[]
    



}


export interface PieType{
  orderFullFillment: {
    processing: number;
    shipped: number;
    delivered: number;
}
productCategories: Record<string, number>[]
stockAvaliability: {
  inStock: number;
  ourOfStock: number;
}  

revenueDistribution: {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
  grossIncome: number;
}
adminCustomers: {
  admin: number;
  customer: number;
}
usersAgeGroup: {
  teen: number;
  adult: number;
  old: number;
}



}


export interface LineType {
  users:number[],
  products:number[],
        order:number[],
        total:number[],
        discount:number[]

}


export interface BarType{

  users:number[], 
  product:number[],
  order:number[]


}

export interface StatsResponse {
  success:boolean
  message:string
 stats:StatsType
}




export interface PieResponse {
  success:boolean
  message:string
 charts:PieType
}

export interface BarResponse {
  success:boolean
  message:string
 charts:BarType
}


export interface LineResponse {
  success:boolean
  message:string
 charts:LineType
}




export interface LatestProductsResponse {
  success: boolean;
  latestProducts: ProductType[];
}

export interface ProductDetailsResponseType {
  success: boolean;
  product: ProductType;
  message: string;
}

export interface AllProductsResponse {
  success: boolean;
  products: ProductType[];
  message: string;
  totalNoOfProducts: number;
}

export interface AllCategoriesResponse {
  success: boolean;
  categories: string[];
  message: string;
}

export interface SearchProductResponseType {
  success: boolean;

  message: string;

  products: ProductType[];
  totalPages: number;
}

export interface SearchProductQueryType {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
}

export interface NewProductResponseType {
  success: boolean;
  product: ProductType;
  message: string;
}

export interface UpdateProductRequestType {
  productId: string;
  formData: FormData;
  userId: string;
}

export interface DeleteProductRequestType {
    productId:string;
 
    userId:string;
 
    
 
 }

export interface NewProductRequestType {
  id: string;
  formData: FormData;
}

//



export interface NewOrderRequestType {


  shippingInfo: ShppingInfoType;
orderItems: CartItemType[];
subTotal: number;
tax: number;
shippingCharges: number;
discount: number;
total: number;
user: string;
}


export interface  UserObjectType{
name:string;
 _id:string}

export interface NewOrderResponseType {

  success: boolean;
  
  message: string;
  order:{
    shippingInfo:ShppingInfoType;
user: {name:string;_id:string},
// user:any,

subTotal:number;
tax:number;
shippingCharges:number;
discount:number;
total:number;
status: string;
orderItems:OrderItem[]
  }
}





// type SingleOrderItemType = Omit < NewOrderResponseType,"success" | "message"  >
// type SingleOrderItemType = Pick < NewOrderResponseType,"order"  > 
// type SingleOrderItemTypeOrderType= Pick < SingleOrderItemType,"order"  > 



// type SingleOrderTyoe = 
// SingleOrderItemType[keyof SingleOrderItemType]
// ["order"];



type SingleOrderTyoe = 
NewOrderResponseType["order"] & {_id:string}




// type SingleOrderTyoe = Required<
// NewOrderResponseType[keyof NewOrderResponseType]
// >["order"];

export interface MyOrdersResponseType  {
   
   success: boolean;
   myordersLength:number
  message: string;
  myOrders:SingleOrderTyoe []

}



export interface AllOrdersResponseType {
  _id:string;
  success: boolean;
  totalNoOfOrders:number
 message: string;
 allOrders:SingleOrderTyoe []
}



export interface SingleOrderFindResponseType {

  success: boolean;

 message: string;
 singleOrder:SingleOrderTyoe ;
}




export interface UpdateOrderRequestType {

orderId:string;
userId:string
}



export interface UpdateOrderResponseType  {
   
  success: boolean;

 message: string;
 order:SingleOrderTyoe 

}


export type DeleteOrderResponseType = Omit< UpdateOrderResponseType,"order">





// type ComplexType = {
//   a: number;
//   b: string;
// }

// type EventsCollection = {
//   [k: string]: {
//       name: string;
//       events?: ComplexType;
//       desc: string;
//   };
// }

// type Events = Required<
//   EventsCollection[keyof EventsCollection]
// >["events"];

// const events: Events = {
//   a: 1,
//   b: "2",
// };