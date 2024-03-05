
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { MessageResponse } from "../../types/api-types";
import { UserType } from "../../types/type";
import axios from 'axios';
import { UserResponseType } from './reducer-types';



export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  // tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, UserType>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      // invalidatesTags: ["users"],
    }),

  }),
});



export const getUser =async(id:string)=>{
  try {

    const {data}:{data:UserResponseType} = await axios.get( `${ import.meta.env.VITE_SERVER}/api/v1/user/${id}`)


    return data
  } catch (error) {
    throw error
  }
}


export const {useLoginMutation} = userAPI