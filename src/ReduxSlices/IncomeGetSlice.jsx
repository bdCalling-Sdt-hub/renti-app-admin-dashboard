import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../Config'


const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    incomeData:[]

};


export const IncomeData=createAsyncThunk(

    "Income",
    async (value, thunkAPI) => {
        try {

           

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
                
            return thunkAPI.rejectWithValue(message)
        }
    }

);


export const incomeGetSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const {  } = incomeGetSlice.actions
  
  export default incomeGetSlice.reducer




