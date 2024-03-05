import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { UserType } from "../types/type"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import toast from "react-hot-toast"


interface HeaderProps{
  user:UserType | null
}


const Header = ({user}:HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const logoutHandler =async()=>{

        try {
          await signOut(auth) 
          toast.success("Sign out Successful")
          
          setIsOpen(false)
  
        } catch (error) {
           toast.error("Sign out failed")
        }

    }
  return (
  <nav className="header">
    <Link onClick={()=>setIsOpen(false)} to="/">Home</Link>
    <Link  onClick={()=>setIsOpen(false)} to="/search"><FaSearch/></Link>
    <Link  onClick={()=>setIsOpen(false)} to="/cart"><FaShoppingBag/></Link>

         
         { 
            user?._id  ? ( <> <button onClick={()=>setIsOpen(prev=>!prev)}><FaUser/> </button>
            
            <dialog open={isOpen}>
                  <div>{user?.role === "admin" && (
                        <Link to="/admin/dashboard"   onClick={()=>setIsOpen(false)}>Admin</Link>
                  )}</div>
               <Link to="/orders"  onClick={()=>setIsOpen(false)}> Orders</Link>
               <button  onClick={()=>{logoutHandler()}}>
                <FaSignOutAlt/>
               </button>
        
            </dialog>
            </>
            
            ):(<Link to="/login"><FaSignInAlt/> </Link>)
         }

  </nav>
  )
}

export default Header