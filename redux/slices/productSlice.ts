import api from "@/lib/api"
import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit"
import { string } from "yup";

interface ProductState{
    products: any[];           // Ideally, replace any with your BookType
    selectedproduct: any | null
    total: number;
    loading: boolean;
    error: string | null;   // ✅ Allow both string and null
    isRefresh: boolean;

}

const initialState:ProductState={
    products:[],
    selectedproduct:null,
    total:0,
    loading:false,
    error:null,
    isRefresh:false
}

//thunks - These are actions that perform API calls and dispatch results. (define outside) 

//listproduct

export const listProduct=createAsyncThunk('products/listing',async({limit,skip,token}:{limit:number,skip:number,token:string|null})=>{
    const res=await api.get(`/products/listallproduct?limit=${limit}&skip=${skip}`,
        {
            headers:{
                  Authorization: `Bearer ${token}`,
            },
        })
        console.log('product list response:',res.data);
        return res.data
})

//addproduct

export const addproduct=createAsyncThunk('products/add',async({formData,token}:{formData:FormData,token:string})=>{
    const res = await api.post(
        "/products/addproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return res.data.data
})

//getproduct

export const getproduct=createAsyncThunk('product/get',async({id,token}:{id:string,token:string|null})=>{
  const res = await api.get(`/products/${id}`,{
     headers: {
          Authorization: `Bearer ${token}`,
     },
})
console.log('product view response:',res.data);
return res.data.data
})

//deleteproduct

export const deleteproduct =createAsyncThunk('product/delete',async({id,token}:{id:string,token:string|null})=>{
     const res= await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return id
})

//updateproduct

export const updateproduct =createAsyncThunk('product/update',async({id,formData,token}:{id:string,formData:FormData,token:string|null})=>{
     const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
      const data = await res.json()
      return data.data
})




//slice

const productSlice=createSlice({
    name:'products',
    initialState:initialState,
    reducers:{},
    extraReducers:builder=>{
        builder

        //listproduct
        //pending
        .addCase(listProduct.pending,state=>{
            state.loading=true
        })
      // LIST PRODUCTS - SUCCESS
      .addCase(listProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.data;
        state.total = action.payload.total;
      })
         // LIST PRODUCTS - ERROR
      .addCase(listProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      })

      //addproduct
      .addCase(addproduct.pending,state=>{
        state.loading=true
      })
      .addCase(addproduct.fulfilled,(state,action)=>{
        state.loading=false
        state.products.push(action.payload)
        state.isRefresh=true
      })
      .addCase(addproduct.rejected,(state,action)=>{
        state.loading=false
        state.error=action.error.message||'failed to add product'
      })

      //getoneproduct
      .addCase(getproduct.pending,state=>{
        state.loading=true
      })
      .addCase(getproduct.fulfilled,(state,action)=>{
        state.loading=false
        state.selectedproduct=action.payload
      })
      .addCase(getproduct.rejected,(state,action)=>{
        state.loading=false
        state.error=action.error.message||'failed to get product'
      })
      //deleteproduct
      .addCase(deleteproduct.pending,state=>{
        state.loading=true
      })
      .addCase(deleteproduct.fulfilled,(state,action)=>{
        state.loading=false
        state.products=state.products.filter(
          (product)=>product._id !=action.payload
        )
      })
      .addCase(deleteproduct.rejected,(state,action)=>{
        state.loading=false
        state.error = action.error.message || "Failed to delete product"

      })

      //updateproduct
      .addCase(updateproduct.pending,state=>{
        state.loading=false
      })
      .addCase(updateproduct.fulfilled,(state,action)=>{
        state.loading=false
        const updatedproduct=action.payload

        state.products=state.products.map((product)=>{
          product._id===updatedproduct._id
          ?updatedproduct
          :product
        })
        
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to update product"
      })
    },
});

export default productSlice.reducer