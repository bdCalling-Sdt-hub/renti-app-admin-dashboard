import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../Config'


const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    userData:{},
    accessToken:""

};


export const UserData=createAsyncThunk(

    "UserData",
    async (value, thunkAPI) => {
        console.log("redux",value)
        try {
          
            let response=await axios.post("api/user/sign-in",value);

           return response.data
           

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


export const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
      
    },

    extraReducers:{
        [UserData.pending]:(state,action)=>{
            state.isLoading=true
        },
        [UserData.fulfilled]:(state,action)=>{
            state.isError= false,
            state.isSuccess= true,
            state.isLoading= false,
            state.message= action.payload.message,
            state.userData=action.payload.user,
            state.accessToken=action.payload.accessToken
        },
        [UserData.rejected]:(state,action)=>{
            state.isError= true,
            state.isSuccess= false,
            state.isLoading= false,   
            state.message=action.payload
        },
    }
  })
  
  // Action creators are generated for each case reducer function
  export const {  } = signinSlice.actions
  
  export default signinSlice.reducer




