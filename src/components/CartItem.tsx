import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../App";
import { CartItemType } from "../types/type";


type CartItemProps = {
    singleCartItem: {  
      
      productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;}
    ,
    incrementHandler:(CartItem:CartItemType)=>void;
    decrementHandler:(CartItem:CartItemType)=>void;
    remvoeHandler:(id:string)=>void;


}


const CartItem = ({singleCartItem, incrementHandler, decrementHandler, remvoeHandler}:CartItemProps) => {
    const {
        productId,
        photo,
        name,
        price,
        quantity,
        stock,
    } = singleCartItem
  return (
    <div className="cart-items">
     <img src={`${server}/${photo}`} alt={name} />
 <article>
    <Link to={`/product/${productId}`} >{name}</Link>
    <span>₹{price}</span>
 </article>
 <div>
    <button onClick={()=>decrementHandler(singleCartItem)}>-</button>
    <p>{quantity}</p>
    <button onClick={()=>incrementHandler(singleCartItem)}>+</button>
    
 </div>

 <button onClick={()=>remvoeHandler(singleCartItem.productId)}>
    <FaTrash/>
 </button>

    </div>
  )
}

export default CartItem