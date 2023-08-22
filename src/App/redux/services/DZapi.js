import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config } from "../../constant/Index";



export const DZapi = createApi({
  reducerPath: "DZapi",

  baseQuery: fetchBaseQuery({
    baseUrl: Config.serverUrl,

  }),

  //******************Api Query******************//

  endpoints: (builder) => ({
    getAllEmployees: builder.query({query: () => "employees",}),
    getOneEmployees: builder.query({query: (id) => `employees/${id}`,}), 
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetOneEmployeesQuery,

} = DZapi;
