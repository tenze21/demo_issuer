import PropTypes from "prop-types";

function ConnectWalletContainer({connectWallet, error}){
    return(
        <section aria-label="Connect your wallet" className="wallet-container">
            <img src="metamask_logo.png" alt="" aria-hidden="true" width={150}/>
            <button className="connect-btn" onClick={connectWallet}>Connect Metamask</button>
            {error && <p style={{color: "red"}}>Error connection to wallet: {error}</p>}
        </section>
    )
}

ConnectWalletContainer.propTypes = {
    connectWallet: PropTypes.func.isRequired,
    error: PropTypes.string
};
export default ConnectWalletContainer;