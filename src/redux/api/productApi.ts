
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { AllCategoriesResponse, AllProductsResponse, DeleteProductRequestType, LatestProductsResponse, MessageResponse, NewProductRequestType, NewProductResponseType, ProductDetailsResponseType, SearchProductQueryType, SearchProductResponseType, UpdateProductRequestType } from '../../types/api-types';



export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
tagTypes:["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<LatestProductsResponse,string>({
      query: () => "latest",
 providesTags:["product"]
    }),
    allProducts: builder.query<AllProductsResponse,string>({
      query: (id) => `allproducts?id=${id}`,
      providesTags:["product"]

    }),
    allCategories: builder.query<AllCategoriesResponse,string>({
      query: () => `categories`,
      providesTags:["product"]

    }),

    searchProducts: builder.query<SearchProductResponseType,SearchProductQueryType>({
      query: ({price,
        page,
        category,
        search,
        sort,}) => {
               let base = `all?search=${search}&page=${page}}`

               if(price)  base += `&price=${price}`
               if(category)  base += `&category=${category}`
               if(sort)  base += `&sort=${sort}`


               return base
        } ,
        providesTags:["product"]

    }),

    productDetails: builder.query<ProductDetailsResponseType,string>({
      query: (id) => `${id}`,
      providesTags:["product"]

    }),
    newProduct: builder.mutation< NewProductResponseType,NewProductRequestType>({
      query: ({formData,id}) => ({
        url:`/newproduct/?id=${id}`,
        method:"POST",
        body:formData
      }),
invalidatesTags:['product']
    }),
    updatePRoduct: builder.mutation< NewProductResponseType,UpdateProductRequestType>({
      query: ({formData,productId,userId}) => ({
        url:`/${productId}/?id=${userId}`,
        method:"PUT",
        body:formData
      }),
        invalidatesTags:['product']
    }), 

    deleteProduct: builder.mutation< MessageResponse,DeleteProductRequestType>({
      query: ({productId,userId}) => ({
        url:`/${productId}/?id=${userId}`,
        method:"DELETE",
  
      }),
        invalidatesTags:['product']
    }), 

  }),
});


export const  {useLatestProductsQuery, useAllProductsQuery, useAllCategoriesQuery, useSearchProductsQuery,
useNewProductMutation,
useProductDetailsQuery,useUpdatePRoductMutation,useDeleteProductMutation,


} = productAPI