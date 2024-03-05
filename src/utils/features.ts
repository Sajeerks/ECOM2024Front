import { SerializedError } from "@reduxjs/toolkit";
import { MessageResponse, NewProductResponseType } from "../types/api-types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

type ResType =
  | {
      data: NewProductResponseType | MessageResponse; 
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {



    if("data" in res){
        toast.success(res.data.message)
        if(navigate) navigate(url)
    }else{
        const error = res.error as FetchBaseQueryError;
        const messageResponse = error.data as MessageResponse

        toast.error(messageResponse.message)
    }


    
};
