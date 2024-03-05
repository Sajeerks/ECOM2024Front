import { Fragment, ReactElement, useEffect, useState } from "react"
import { Column } from "react-table"
import TableHOC from "../components/admin/TableHOC"
import { Link } from "react-router-dom"
import { useMyOrdersQuery } from "../redux/api/orderApi"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { CustomError } from "../types/type"
import toast from "react-hot-toast"
import { Skeleton } from "../components/Loader"


type DataType ={
    _id:string,
    amount:number,
    quantity:number,
    discount:number,
    status:ReactElement,
    action:ReactElement,
  
  }
  
  const column :Column<DataType>[] =[
    {
      Header:"ID",
      accessor:"_id"
    }, 
    {
      Header:"Amount",
      accessor:"amount"
    }, 
    {
      Header:"Quantity",
      accessor:"quantity"
    }, 
    {
      Header:"Discount",
      accessor:"discount"
    }, 
    {
      Header:"Status",
      accessor:"status"
    }, 
    {
      Header:"Action",
      accessor:"action"
    }, 
  ]
  

const Order = () => {

const {user} = useSelector((state:RootState)=>state.userReducer)

  const {data,isLoading, error } = useMyOrdersQuery(user?._id!)
 

  useEffect(() => {
    if(error){
      const err = error as CustomError
      toast.error(err.data.message)
    }
  }, [error])
  


  const [rows, setRows] = useState<DataType[]>(
[    {
    _id:"ddddddd",
    amount:2124,
    quantity:2323,
    discount:400,
    status: <span>status</span>,
    action:<Link to={`/order/${"ddddddd"}`}>home</Link>,

  }]
  )


    const Table =TableHOC <DataType>( column,rows,"dashboard-product-box", "Orders", rows.length>6)()

useEffect(() => {
  if(data){
    console.log(data.myOrders);
    setRows(data.myOrders.map((i)=>({
      _id:i._id,
      amount:i.total,
      quantity:i.orderItems.length,
      status: <span>{i.status}</span>,
      action:<Link to={`/order/${i._id}`}>home</Link>,
      discount:i.discount
    })))
  }

}, [data])



  return (
    <Fragment>
      {isLoading?<Skeleton  width="90vw" length={10}/>: 
        <div className="container">
  <h1>My Orders</h1>
{Table}
  
    </div>}

    </Fragment>
  
  )
}

export default Order