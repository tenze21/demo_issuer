import { useSelector } from "react-redux";
import { ethers } from "ethers";

function Header(){
    const accountInfo= useSelector((state)=>state.account);
    return(
        <section aria-label="Account details" className="header">
            <p>Account address: {accountInfo.address}</p>
            <p>Account balance: {ethers.utils.formatEther(accountInfo.balance)}</p>
            <p>Network: {accountInfo.network}</p>
        </section>
    )
}
export default Header;