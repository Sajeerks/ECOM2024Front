import { FaPlus } from "react-icons/fa";
import { server } from "../App";
import { CartItem } from "../types/type";


interface ProductCardProps{
    productId:string;
    photo:string;
    name:string;
    price:number;
    stock:number;
    handler: (cartItem: CartItem) => string | undefined

}

const ProductCard = ({

  productId,
  photo,
  name,
  price,
  stock,
  handler,


  
}:ProductCardProps) => {


  return (
    <div className="product-card" key={productId}>
           <img src={`${server}/${photo}`} alt={name}/>

       <p>{name}</p>
       <span>₹{price}</span>


  <div>
    <button onClick={()=>handler({productId,
  photo,
  name,
  price,
  stock,
 quantity:1})}>
    <FaPlus/>
    </button>

  </div>
    </div>
  )
}

export default ProductCard