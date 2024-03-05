import { createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { AllOrdersResponseType, DeleteOrderResponseType, MyOrdersResponseType, NewOrderRequestType, NewOrderResponseType, SingleOrderFindResponseType, UpdateOrderRequestType, UpdateOrderResponseType } from '../../types/api-types';


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${ import.meta.env.VITE_SERVER}/api/v1/order/`,
    }),
    tagTypes: ["orders"],
    endpoints: (builder) => ({
      createNewOrder: builder.mutation<NewOrderResponseType,NewOrderRequestType >({
        query: (order) => ({
          url: `newOrder`,
          method: "POST",
          body: order,
        }),
        invalidatesTags: ["orders"],
      }),
      updateOrder: builder.mutation<UpdateOrderResponseType,UpdateOrderRequestType >({
        query: ({orderId, userId}) => ({
          url: `${orderId}?id=${userId}`,
          method: "PUT",
        
        }),
        invalidatesTags: ["orders"],
      }),
      deleteOrder: builder.mutation<DeleteOrderResponseType,UpdateOrderRequestType >({
        query: ({orderId, userId}) => ({
          url: `${orderId}?id=${userId}`,
          method: "DELETE",
        
        }),
        invalidatesTags: ["orders"],
      }),
      myOrders: builder.query<MyOrdersResponseType,string >({
          query: (id) => ({
            url: `myorder?id=${id}`,
            method: "GET",
          }),
          providesTags: ["orders"],
        }),
    allOrders: builder.query<AllOrdersResponseType,string >({
      query: (id) => ({
        url: `allorders?id=${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    singleOrder: builder.query<SingleOrderFindResponseType,string >({
      query: (id) => ({
        url: `order/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  
    }),
  });



  export const {useCreateNewOrderMutation, useMyOrdersQuery, useAllOrdersQuery
  
  , useSingleOrderQuery, 
  useUpdateOrderMutation,
  useDeleteOrderMutation,


  } = orderApi