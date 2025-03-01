import { createSlice } from "@reduxjs/toolkit";
const initialState= {did:""};
const didSlice= createSlice({
    name: 'did',
    initialState,
    reducers: {
        setDid: (state, action)=>{
           state.did=action.payload;
        }
    }
});
export const  {setDid}=didSlice.actions;
export default didSlice.reducer;