import { createSlice } from "@reduxjs/toolkit";
const initialState= {dnsAddress:""};
const dnsSlice= createSlice({
    name: 'dnsAddress',
    initialState,
    reducers: {
        setDnsAddress: (state, action)=>{
           state.dnsAddress=action.payload;
        }
    }
});
export const  {setDnsAddress}=dnsSlice.actions;
export default dnsSlice.reducer;