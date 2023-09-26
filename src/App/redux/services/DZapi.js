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
    getAllPackages: builder.query({query: () => "packages",}),
    getOnePackages: builder.query({query: (id) => `packages/${id}`,}), 
    addEmployees: builder.mutation({
      query: (data) => ({
        url: `employees`,
        method: "POST",
        body: data,
      }),
    }),
    updateEmployees: builder.mutation({
      query: ({  id,data }) => ({
        url: `employees/${id}`,
        method: "PUT",
        body: {data: data}
      }),
    }),
    updateEmployeesRole: builder.mutation({
      query: ({  data, id }) => ({
        url: `employee-roles/${id}`,
        method: "PUT",
        data: data,
      }),
    }),
    deleteEmployees: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
    }),
    getAllEmployeesRole: builder.query({query: () => "employee-roles",}),
    
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetOneEmployeesQuery,
  useAddEmployeesMutation,
  useUpdateEmployeesMutation,
  useDeleteEmployeesMutation,
  useGetAllEmployeesRoleQuery,
  useUpdateEmployeesRoleMutation,
  useGetOnePackagesQuery,
  useGetAllPackagesQuery,
} = DZapi;
