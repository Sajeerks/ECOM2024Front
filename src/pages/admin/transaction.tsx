import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAllOrdersQuery } from "../../redux/api/orderApi";
import { CustomError } from "../../types/type";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";

interface DataType {
  user: {name:string, _id:string} | string;
  // user: any;

  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

// const arr: DataType[] = [
//   {
//     user: "Charas",
//     amount: 4500,
//     discount: 400,
//     status: <span className="red">Processing</span>,
//     quantity: 3,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },

//   {
//     user: "Xavirors",
//     amount: 6999,
//     discount: 400,
//     status: <span className="green">Shipped</span>,
//     quantity: 6,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },
//   {
//     user: "Xavirors",
//     amount: 6999,
//     discount: 400,
//     status: <span className="purple">Delivered</span>,
//     quantity: 6,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },
// ];

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const  { user} = useSelector((state:RootState)=>state.userReducer)
  const {isError, isLoading,error, data} = useAllOrdersQuery(user?._id!)




  useEffect(() => {
  if(isError){
    const err = error as CustomError
    toast.error(err.data.message)
  }
  }, [isError])

  useEffect(() => {
  if(data){
    // console.log(data.allOrders);
    let datass= 
    data.allOrders.map((i)=>({
         
   
          user:  i.user.name ,
          amount:   i.total       ,
          discount:   i.discount      ,
          status: ( <span className={i.status==="Processing"?"red":i.status==="Shipped"?"green":"purple"}>{i.status}</span>),   
          quantity:  i.orderItems.length        ,
          action:    <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,    
    
        }))

        // console.log({datass});
        // console.log({rows});
        setRows(datass)
    // setRows(data.allOrders.map((i)=>({

  //     user:  i.user        ,
  //     amount:   i.total       ,
  //     discount:   i.discount      ,
  //     status:  <span className={i.status==="Processing"?"red":i.status==="Shipped"?"green":"purple"}>{i.status}</span>,   
  //     quantity:  i.orderItems.length        ,
  //     action:    <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,    

  //   })))
  }
  }, [data])


  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading?<Skeleton width="90vw" length={10}/>:
      
      <main>{Table}</main>
      
      }
    </div>
  );
};

export default Transaction;
