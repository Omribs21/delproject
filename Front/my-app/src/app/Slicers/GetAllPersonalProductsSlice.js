import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllPersonalProducts } from "../API/GetAllProducts";
const initialState = {
    AllPersonalProducts: [],
    status:false
};

export const GetAllPersonalProductsAsync = createAsyncThunk(
    "getallpersonalprods/getallproducts",
    async () => {
      const response = await GetAllPersonalProducts();
      return response.data;
    }
);
  
  export const GetAllPersonalProductsSlice = createSlice({
    name: "getallpersonalprods",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(GetAllPersonalProductsAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.AllPersonalProducts = action.payload
        state.status = !state.status
      });
    },
  });
  
export const selectAllPersonalprods = (state) => state.getallpersonalprods.AllPersonalProducts;
export const selectStatus = (state) => state.getallpersonalprods.status
export default GetAllPersonalProductsSlice.reducer;