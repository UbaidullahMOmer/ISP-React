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
    addEmployees: builder.mutation({
      query: (data) => ({
        url: "employees",
        method: "POST",
        body: data,
      }),
    }),
    updateEmployees: builder.mutation({
      query: ({  data, id }) => ({
        url: `employees/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetOneEmployeesQuery,
  useAddEmployeesMutation,
  useUpdateEmployeesMutation,
} = DZapi;
