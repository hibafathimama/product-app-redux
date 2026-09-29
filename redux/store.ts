import {configureStore} from '@reduxjs/toolkit'
import productReducer from '@/redux/slices/productSlice'
import UserReducer from '@/redux/slices/userSlice'

export const store =configureStore({
    reducer:{
        products:productReducer,
        user:UserReducer

    }
})

// Get the type of the entire Redux state
export type RootState = ReturnType<typeof store.getState>


// ✅ Export AppDispatch and RootState for proper typing
export type AppDispatch =typeof store.dispatch