import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducerIntialState } from "./reducer-types";
import { UserType } from "../../types/type";



const initialState:UserReducerIntialState= {

 user:null,
 loading:true,
}

export const userReducer = createSlice({

name:"userReducer",
initialState,
reducers:{
         userExist:(state, action:PayloadAction<UserType>)=>{
            state.loading = false;
            state.user = action.payload;
         },
         userNotExist:(state)=>{
            state.loading = false;
            state.user = null;
         }
      


},

})

export const {userExist, userNotExist} = userReducer.actions