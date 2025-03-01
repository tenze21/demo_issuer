import { createSlice } from "@reduxjs/toolkit";
const initialState= {address: "", balance: "", network:""};
const accountSlice= createSlice({
    name: 'accountInfo',
    initialState,
    reducers: {
        setAccountInfo: (state, action)=>{
           return {...state, ...action.payload};
        }
    }
});
export const  {setAccountInfo}=accountSlice.actions;
export default accountSlice.reducer;
