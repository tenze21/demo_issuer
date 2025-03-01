import { createSlice } from "@reduxjs/toolkit";
const initialState= [];
const signedDocumentSlice= createSlice({
    name: 'signedDocuments',
    initialState,
    reducers: {
        setSignedDocuments: (state, action)=>{
           state.push(action.payload);
        }
    }
});
export const  {setSignedDocuments}=signedDocumentSlice.actions;
export default signedDocumentSlice.reducer;