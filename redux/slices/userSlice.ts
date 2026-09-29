import api from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { error } from "console"
import { boolean, string } from "yup"

interface UserType {
  firstName: string
  lastName: string
  email: string
  role: string
  image: string
}
interface UserState{
   user:UserType|null;
   token:string|null;
   loading:boolean;
   error:string|null
}

const initialstate:UserState={
   user:null,
   token:null,
   loading:false,
   error:null
}


//thunks

//getuser
export const getuser=createAsyncThunk('users/get',async({token}:{token:string})=>{
   const response= await api.get("/users/getoneuser",{
     headers:{
                Authorization :`Bearer ${token}`,
            },
   }) 
   return response.data.data
})

//edituser

export const updateuser=createAsyncThunk("users/update",async({formData,token}:{formData:FormData,token:string|null})=>{
    const response = await api.put(
        "/users/updateuser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })  
        return response.data.data
})




//slice

const UserSlice=createSlice({
    name:'users',
    initialState:initialstate,
    reducers:{},
    extraReducers:builder=>{
        builder


        //getuser
        //pending
        .addCase(getuser.pending,state=>{
            state.loading=true
        })
        .addCase(getuser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(getuser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message ||"failed to load user"
        })

        //updateuser
        .addCase(updateuser.pending,state=>{
            state.loading=true
        })
        .addCase(updateuser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(updateuser.rejected,(state,action)=>{
            state.loading = false
            state.error =
            action.error.message || "Failed to update user"
  
        })
    }
})

export default UserSlice.reducer