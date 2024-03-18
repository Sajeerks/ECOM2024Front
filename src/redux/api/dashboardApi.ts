import { createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BarResponse, LineResponse, PieResponse, StatsResponse } from '../../types/api-types';

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${ import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
    }),
    tagTypes: ["stats"],
    endpoints: (builder) => ({
           stats:builder.query<StatsResponse, string>({
             query:(id)=>({
                url: `stats?id=${id}`,
                method: "GET",
             })
           }),
           pie:builder.query<PieResponse, string>({
            query:(id)=>({
               url: `pie?id=${id}`,
               method: "GET",
            })
          }),
          bar:builder.query<BarResponse, string>({
            query:(id)=>({
               url: `bar?id=${id}`,
               method: "GET",
            })
          }),
          line:builder.query<LineResponse, string>({
            query:(id)=>({
               url: `line?id=${id}`,
               method: "GET",
            })
          }),
  
    }),
  });



  export const { useStatsQuery , useBarQuery,usePieQuery, useLineQuery}    = dashboardApi