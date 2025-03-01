import { useState } from "react";
import ConnectWalletContainer from "./ConnectWalletContainer";
import { useSelector, useDispatch } from "react-redux";
import { setAccountInfo } from "../slices/accountSlice";
import { ethers } from "ethers";
import AdminContainer from "./AdminContainer";

function DocumentStore() {
  const accountInfo = useSelector((state) => state.account);

  const [error, setError] = useState("");
  const [signer, setSigner] = useState(null);

  const dispatch = useDispatch();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const newSigner = await provider.getSigner();
        const address = await newSigner.getAddress();
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();
        setSigner(newSigner);
        return dispatch(
          setAccountInfo({
            address,
            balance: balance.toString(),
            network: network.name,
          })
        );
      } catch (err) {
        setError(err.message);
      }
    } else {
      alert("Metamask not installed. Please get the metamask extension first.");
    }
  };
  return (
    <>
      {accountInfo.address && accountInfo.balance && accountInfo.network ? (
        <AdminContainer signer={signer}/>
      ) : (
        <ConnectWalletContainer connectWallet={connectWallet} error={error} />
      )}
    </>
  );
}
export default DocumentStore;
