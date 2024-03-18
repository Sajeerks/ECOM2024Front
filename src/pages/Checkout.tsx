import { Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { Stripe, loadStripe } from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateNewOrderMutation } from '../redux/api/orderApi';
import { NewOrderRequestType } from '../types/api-types';
import { resetCart } from '../redux/cartReducer';
import { responseToast } from '../utils/features';




const  stripePromise  = loadStripe(import.meta.env.VITE_STRIPE_PROMISE);



const CheckoutForm = () => {
  const [isProcessing, setisProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const navigate = useNavigate()



  const dispatch = useDispatch()
  // const dispatch= useDispatch<AppDispatch>()
  const {cartItems, subtotal, tax, total, shippingCharges, discount, shippingInfo} = useSelector((state:RootState)=>state.cartReducer)
  const  { user} = useSelector((state:RootState)=>state.userReducer)

  const orderData:NewOrderRequestType ={
    shippingInfo,
    orderItems:cartItems, subTotal:subtotal, tax, total, shippingCharges,discount, user:user?._id!
  }
  const [createNewOrder]= useCreateNewOrderMutation()





  const submitHandlerPay =async (e:FormEvent<HTMLFormElement>)=>{
 e.preventDefault()
 if(!stripe || !elements) return 
setisProcessing(true)


const {paymentIntent, error} = await stripe.confirmPayment({
  elements, 
  confirmParams:{
    return_url:window.location.origin
  }, 
  redirect:"if_required",
})
if(error) {
  setisProcessing(false)

  return toast.error(error.message || "Something went wrong")
}

if(paymentIntent.status === "succeeded"){
  console.log("placing order");

  const res =  await createNewOrder(orderData)
  dispatch(resetCart())

   responseToast(res, navigate,"/orders")
 
  setisProcessing(false)
}

 


  }
  return (
    <div className='checkout-container'>
     
  <form onSubmit={submitHandlerPay}>
      <PaymentElement />
      <button type='submit' disabled={isProcessing}>
        {isProcessing?"Processing":"Pay"}
      </button>
    </form>
  
    </div>
  
  );
};



const Checkout = () => {


    const location = useLocation()
    const clientSecret:string |  undefined  = location.state
 
    if(!clientSecret)  return <Navigate  to={"/shipping"} />

 


  const options = {
    // passing the client secret obtained from the server
    // clientSecret: 'pi_3Os2YcSGb5BPIhrY1CB4MkAG_secret_Xl5V3bJUPqrx7yJ1F1RQ2DcY0',
    clientSecret
  };

  return (
    <Elements 
   options={options}
    stripe={stripePromise}>

<CheckoutForm/>

    </Elements>
  )
}

export default Checkout