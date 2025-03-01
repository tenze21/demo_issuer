import { useSelector } from "react-redux";
import { formatEther } from "ethers";

function Header(){
    const accountInfo= useSelector((state)=>state.account);
    return(
        <section aria-label="Account details" className="header">
            <p>Account address: {accountInfo.address}</p>
            <p>Account balance: {formatEther(accountInfo.balance)}</p>
            <p>Network: {accountInfo.network}</p>
        </section>
    )
}
export default Header;