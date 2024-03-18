import {  useParams } from "react-router-dom"
import { useSingleOrderQuery } from "../redux/api/orderApi"
import { useEffect } from "react"
import { CustomError } from "../types/type"
import toast from "react-hot-toast"



// const orderItems: OrderItem[] = [
//   {
//     name: "",
//     photo: "",
//     productId: "",
//     quantity: 0,
//     price: 0,
//     _id:""
//   },
// ];




// const defaultData  ={
//   shippingInfo :{ name: "",
//   address: "",
//   city: "",
//   state: "",
//   country: "",
//   pinCode: 0,},
//   status: "",
//   subtotal: 0,
//   discount: 0,
//   shippingCharges: 0,
//   tax: 0,
//   total: 0 ,
//   orderItems,
//   user:{name:"", _id:""},
//   _id:""
// }
const OrderDetails = () => {
  const {id} = useParams()


  const  {data, error} = useSingleOrderQuery(id!)
        

  useEffect(() => {
    if(error){
      const err = error as CustomError
      toast.error(err.data.message)
    }
  }, [error])
  
  return (
    <div>
{data?.singleOrder._id}


    </div>
  )
}

export default OrderDetails