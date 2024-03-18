import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { 
  useDispatch,
  // useDispatch,
   useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {  RootState } from "../redux/store"
// import { useCreateNewOrderMutation } from "../redux/api/orderApi"
// import { NewOrderRequestType } from "../types/api-types"

import { server } from "../App"
import axios from "axios"
import toast from "react-hot-toast"
import { saveShippingInfo } from "../redux/cartReducer"




const Shipping = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const dispatch= useDispatch<AppDispatch>()
    const {cartItems,  total, } = useSelector((state:RootState)=>state.cartReducer)
    // const  { user} = useSelector((state:RootState)=>state.userReducer)


    //  const [createNewOrder]= useCreateNewOrderMutation()
    const [shippingInfo, setShippingInfo] = useState({
           address:"",
           city:"",
           state:"",
           country:"",
           pinCode:0,
    })

    const changeHandler =(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setShippingInfo(prev=> ({...prev,[e.target.name]:e.target.value}))
    }

    // const order:NewOrderRequestType ={
    //   shippingInfo,
    //   orderItems:cartItems, subTotal:subtotal, tax, total, shippingCharges,discount, user:user?._id!
    // }
    const shippingFormSubmit=async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      dispatch(saveShippingInfo(shippingInfo))
      // dispatch(createNewOrder(order))
  //     const res = await createNewOrder(order)

  //  responseToast(res, navigate,"/")


  //     console.log(order);.



  try {
      const {data}  = await axios.post(`${server}/api/v1/payment/createpaymentintent`, {
        amount:total
      }, 
        {
          headers:{
            "Content-Type":"application/json"
          }
        }
      )

      navigate("/pay", {
        state:data.clientSecret
      })
  } catch (error) {
      console.log(error);

      toast.error("Something went wrong")
  }
      
}
  

    useEffect(() => {
      if(cartItems.length <=0) return navigate("/cart")
   
    }, [cartItems])


    
    


  return (
    <div className="shipping">
        <button onClick={()=>navigate("/cart")} className="back-btn">
            <BiArrowBack/>
        </button>
        <form  onSubmit={shippingFormSubmit}>
           <h1>Shipping Address</h1>
           <input required
            type="text"
            name="address"
            placeholder="address"
            value={shippingInfo.address}
            onChange={changeHandler}
           
           />
                 <input required
            type="text"
            name="city"
            placeholder="city"
            value={shippingInfo.city}
            onChange={changeHandler}
           
           />

<input required
            type="text"
            name="state"
            placeholder="state"
            value={shippingInfo.state}
            onChange={changeHandler}
           
           />

<select   name="country"

required
value={shippingInfo.country}
onChange={changeHandler}


>
<option value="">Choose Country</option>
<option value="India">India</option>
<option value="Srilanka">Srilanka</option>

</select>

<input required
            type="number"
            name="pinCode"
            placeholder="pinCode"
            value={shippingInfo.pinCode}
            onChange={changeHandler}
           
           />


<button type="submit">Pay Now</button>
        </form>




    </div>
  )
}

export default Shipping