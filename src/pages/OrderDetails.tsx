import { useParams } from "react-router-dom"
import { useSingleOrderQuery } from "../redux/api/orderApi"
import { useEffect } from "react"
import { CustomError } from "../types/type"
import toast from "react-hot-toast"


const OrderDetails = () => {
  const {id} = useParams()
  // console.log({id});

  const  {data, isLoading, error} = useSingleOrderQuery(id!)


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