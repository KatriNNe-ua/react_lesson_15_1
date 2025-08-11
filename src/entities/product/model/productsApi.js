import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import DbOperations from "./api/DbOperations";

const db = new DbOperations("products");

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // З пагінацією
    getProducts: builder.query({
      async queryFn({ page = 1, perPage = 6, cursors = [], searchValue = "" }) {
        try {
          const { data, cursor, hasMore } = await db.getAllPaginated({
            page,
            perPage,
            cursors,
            searchValue,
          });
          return { data: { data, cursor, hasMore } };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      async queryFn(id) {
        try {
          const data = await db.getById(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    addProduct: builder.mutation({
      async queryFn(product) {
        try {
          await db.add(product);
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      async queryFn({ id, data }) {
        try {
          await db.update(id, data);
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      async queryFn(id) {
        try {
          await db.delete(id);
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Product"],
    }),
    //=======================================================
    // filterProduct: builder.query({
    //   async queryFn({fieldTitle, compareOperator, valueToCompare}) {
    //     try {
    //       const data = await db.filteredData({
    //         fieldTitle,
    //         compareOperator,
    //         valueToCompare}
    //       );
    //       return { data };
    //     } catch (error) {
    //       return { error };
    //     }
    //   },
    // }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  //useFilterProductQuery
} = productsApi;
