import {configureStore} from "@reduxjs/toolkit";
import accountSliceReducer from "./slices/accountSlice";
import storeSliceReducer from "./slices/documentStoreSlice";
import dnsSliceReducer from "./slices/dnsSlice";
import didSliceReducer from "./slices/didSlice";
import signedDocumentSliceReducer from "./slices/signedDocumentSlice";

const store=configureStore({
    reducer: {
        account: accountSliceReducer,
        documentStore: storeSliceReducer,
        dns: dnsSliceReducer,
        did: didSliceReducer,
        signedDocuments: signedDocumentSliceReducer
    },
    devTools: true,
});
export default store;