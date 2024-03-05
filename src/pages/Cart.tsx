import { useEffect, useState } from "react"
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { CartItemType } from "../types/type";
import { addToCart, calculatePriceInCart, discountApplied, removeCartItem } from "../redux/cartReducer";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../App";

// const cartItems = [
//       {
//         productId:'afdasdfasfd',
//         photo:"https://m.media-amazon.com/images/I/71JsroBhNuL._AC_SL1500_.jpg",
//         name:"Macbookb",
//         price:3000,
//         quantity:500,
//         stock:1244
//       }


// ]
// const subtotal = 4000
// const tax = Math.round(subtotal * 0.18 )
// const shippingCharges = 200
// const discount = 400
// const total =  shippingCharges+ tax +subtotal
const Cart = () => {
const dispatch= useDispatch<AppDispatch>()
  const {cartItems, subtotal, tax, total, shippingCharges, discount} = useSelector((state:RootState)=>state.cartReducer)

  const [couponCode, setCouponCode] = useState("")
  const [isValidCouponCode, setisValidCouponCode] = useState(false)


const decrementHandler=(cartItem:CartItemType)=>{
  if(cartItem.quantity <=1) return toast.error("need at least one product in cart")

  dispatch(addToCart({...cartItem, quantity:cartItem.quantity-1}))

}
const incrementHandler=(cartItem:CartItemType)=>{
  if(cartItem.quantity >= cartItem.stock) return toast.error("no more stock")

  dispatch(addToCart({...cartItem, quantity:cartItem.quantity+1}))

}
const remvoeHandler=(id:string)=>{
  dispatch(removeCartItem(id))

}



  useEffect(() => {

    const {token, cancel} = axios.CancelToken.source()
    const timeOutID = setTimeout(()=>{



axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
  cancelToken:token,
})
.then((res)=>{
  // console.log(res.data)
  setisValidCouponCode(true)
  dispatch(discountApplied(res.data.discount))

})
.catch(()=>{
  dispatch(discountApplied(0))
  
  setisValidCouponCode(false)
})



      // if(Math.random() >0.5) setisValidCouponCode(true)
   
      // else  setisValidCouponCode(false)

  
    }, 1000)

    return ()=>{
      clearTimeout(timeOutID)
      setisValidCouponCode(false)
      cancel()
    }

  }, [couponCode])
useEffect(() => {
  dispatch(calculatePriceInCart())
}, [cartItems, couponCode])




  return (
    <div className="cart">
      <main>
     
    {cartItems.length>0 ? cartItems.map((singleCartItem, index)=>(
           
        <CartItem decrementHandler={decrementHandler} incrementHandler={incrementHandler}
        remvoeHandler={remvoeHandler}
        
        key={index}
        singleCartItem ={singleCartItem}
         
        
        />

    )):<h1>No itens added</h1>
  
  }



      </main>

<aside>
  <p>Subtotal : ₹{subtotal}</p>

  <p>Subtotal : ₹{subtotal}</p>
  <p>Shipping charges : ₹{shippingCharges}</p>
  <p>Tax : ₹{tax}</p>
  <p>
    Discount <em className="red">-₹{discount}</em>
  </p>
  <p>
    <b>Total - ₹{total}</b>
  </p>
 
  <input type="text"
  placeholder="Coupon code"
  value ={couponCode}
  onChange={(e)=>setCouponCode(e.target.value)}

/>
  

  {
    couponCode &&( isValidCouponCode ? <span className="green">₹{discount} off using the 
    
    <code>{couponCode}</code>
    </span>:<span className="red">Invalid coupon <VscError/></span>
 ) }

{cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
</aside>
      
      
      
      
      </div>
  )
}

export default Cart