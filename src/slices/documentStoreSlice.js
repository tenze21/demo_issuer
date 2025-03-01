import { createSlice } from "@reduxjs/toolkit";
const initialState= {storeAddress:""};
const storeSlice= createSlice({
    name: 'storeAddress',
    initialState,
    reducers: {
        setDocumentStoreAddress: (state, action)=>{
           state.storeAddress=action.payload;
        }
    }
});
export const  {setDocumentStoreAddress}=storeSlice.actions;
export default storeSlice.reducer;