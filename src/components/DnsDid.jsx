import { useSelector, useDispatch } from "react-redux";
import { setDnsAddress } from "../slices/dnsSlice";
import { setDid } from "../slices/didSlice";
function DnsDid() {
    const dns=useSelector((state)=>state.dns.dnsAddress);
    const did=useSelector((state)=>state.did.did);
    const storeAddress=useSelector((state)=>state.documentStore);
  const dispatch = useDispatch();
  return (
    <>
    {storeAddress.storeAddress!==""?(
      <section>
        <h1>
          Please ensure that you have set up the DNS-TXT record for your domain.
        </h1>
        <form action="">
          <div className="form-field">
            <label htmlFor="domain">Domain</label>
            <input
              type="text"
              id="domain"
              onChange={(e) => dispatch(setDnsAddress(e.target.value))}
              value={dns}
            />
          </div>
          <div className="form-field">
            <label htmlFor="did">DID</label>
            <input
              type="text"
              id="did"
              onChange={(e) => dispatch(setDid(e.target.value))}
              value={did}
            />
          </div>
        </form>
      </section>
    ):(
      <h3 style={{textAlign:"center", color:"red"}}>Please enter your store adress or deploy a new instance.</h3>
    )}
    </>
  );
}

export default DnsDid;
