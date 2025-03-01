import { useContext, useState, createContext } from "react";
import PropTypes from 'prop-types';
const AccountContext=createContext();

const AccountContextProvider= ({children})=>{
    const [signer, setSigner]= useState(null);
    const [network, setNetwork]= useState(null);

    return (
        <AccountContext.Provider
        value={{
            signer,
            setSigner,
            network,
            setNetwork
        }}
        >
            {children}
        </AccountContext.Provider>
    )
}

AccountContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useGlobalContext=()=>{
    return useContext(AccountContext);
}
export {AccountContext, AccountContextProvider}