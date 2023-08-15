import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config } from "../../constant/Index";



export const DZapi = createApi({
  reducerPath: "DZapi",

  baseQuery: fetchBaseQuery({
    baseUrl: Config.serverUrl,

  }),

  //******************Api Query******************//

  endpoints: (builder) => ({
    getAllEmployees: builder.query({query: () => "/employees",}),
  }),
});

export const {
  useGetAllEmployeesQuery,

} = DZapi;
