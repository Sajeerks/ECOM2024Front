
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { MessageResponse } from "../types/api-types";

const Login = () => {
  const [gender, setGender] = useState("")
  const [date, setDate] = useState("")

  const navigate = useNavigate()

  const [login] = useLoginMutation()
const loginHandler =async()=>{

  try {
    console.log("insisel oginHandler");
      const provider = new GoogleAuthProvider()
  const {user} =   await signInWithPopup(auth,provider)
  const res =await login({
    name:user.displayName! ,
    email:user.email!,
    photo:user.photoURL!,
    gender:gender,
    role:"user",
    dob:date,
    _id:user.uid

  })
  console.log({user});
  if("data" in res){
    toast.success(res.data.message)

    navigate("/")

  }else{
    const error = res.error as FetchBaseQueryError 
    const message = (error.data  as MessageResponse).message
    toast.error(message)
  }


  } catch (error) {
      toast.error("Sign in fail")
  }

}

  return (
    <div className="login" >
    <main>
      <h1 className="heading">login</h1>
      <div>
        <label >Gender</label>
        <select value={gender} onChange={(e)=>setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        </select>

      </div>
      <div>
        <label >Date of Birth</label>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
      </div>
    
    
    <div>
      <p>Already Signed in once</p>
       <button onClick={loginHandler}>
        <FcGoogle/> <span>sign in with google</span>
       </button>
    </div>
    </main>
    
    </div>
  )
}

export default Login