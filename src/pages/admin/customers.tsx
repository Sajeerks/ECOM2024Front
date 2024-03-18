import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAllUsersQuery, useDelteUserMutation } from "../../redux/api/userApi";
import { CustomError } from "../../types/type";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";
import { responseToast } from "../../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];










const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const arr: Array<DataType> = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img}
        alt="Shoes"
      />
    ),
    name: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },

  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img2}
        alt="Shoes"
      />
    ),
    name: "May Scoot",
    email: "aunt.may@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

const Customers = () => {
  const [rows, setRows] = useState<DataType[]>(arr);
  const {user} = useSelector((state:RootState)=>state.userReducer)
  

  const { isLoading , error, isError, data} = useAllUsersQuery(user?._id!)
  const [deleteUser] = useDelteUserMutation()
  if(error){
    const err = error as CustomError
    toast.error(err.data.message)
  }

  const deleteUserHandler =async (userToBeDeletedID:string)=>{


const res = await deleteUser({userToBeDeletedID,userId:user?._id!} )

responseToast(res, null, "")

  }
useEffect(() => {
  if(data){
    setRows(
      data.users.map((i)=>({
        name:i.name,
        email:i.email,
        gender:i.gender,
        role:i.role,
        avatar:   <img
        style={{
          borderRadius: "50%",
        }}
        src={i.photo}
        alt={i.name}
      />, 
      action:  <button onClick={()=>deleteUserHandler(i._id)}>
      <FaTrash />
    </button>

      }))

    )
  }
    
}, [data])



  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{ isLoading? <Skeleton length={20}/>:Table}</main>
    </div>
  );
};

export default Customers;
