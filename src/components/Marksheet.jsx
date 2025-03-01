import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import XForm from "./XForm";
import PropTypes from "prop-types";
function Marksheet({signer}) {
  const dns = useSelector((state) => state.dns.dnsAddress);
  const did = useSelector((state) => state.did.did);
  const storeAddress = useSelector((state) => state.documentStore);

  const documentBase = {
    $template: {
      name: "SIMPLE_COO",
      type: "EMBEDDED_RENDERER",
      url: "https://generic-templates.tradetrust.io",
    },
    issuers: [
      {
        id: did,
        name: "Demo Issuer",
        revocation: {
          type: "REVOCATION_STORE",
          location: storeAddress.storeAddress,
        },
        identityProof: {
          type: "DNS-DID",
          location: dns,
          key: did,
        },
      },
    ],
  };
  return (
    <>
    {storeAddress.storeAddress!=="" && dns!=="" && did!=="" ?(
      <>
      <h1>Student Details</h1>
      <Tabs>
        <TabList>
          <Tab>Class X</Tab>
          <Tab>Science</Tab>
          <Tab>Commerce</Tab>
          <Tab>Arts</Tab>
        </TabList>
        <div>
          <TabPanel>
            <XForm documentBase={documentBase} signer={signer} />
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </div>
      </Tabs>
      </>
    ):(
      <h3 style={{textAlign:"center", color:"red"}}>Seems like you haven&apos;t set up your store address, DNS or DID yet.</h3>
    )}
    </>
  );
}
Marksheet.propTypes={
  signer: PropTypes.object.isRequired
}
export default Marksheet;
