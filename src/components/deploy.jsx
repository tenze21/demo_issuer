import { DocumentStoreFactory } from "@govtechsg/document-store";
import { useDispatch, useSelector } from "react-redux";
import { setDocumentStoreAddress } from "../slices/documentStoreSlice";
import { useState } from "react";
import PropTypes from "prop-types";

function DeployContainer({ signer }) {
  const storeAddress = useSelector((state) => state.documentStore);
  const dispatch = useDispatch();
  const [storeName, setStoreName] = useState("");

  const deployDocumentStore = async (e) => {
    e.preventDefault();
    const factory = new DocumentStoreFactory(signer);
    const documentStore = await factory.deploy(
      storeName,
      await signer.getAddress()
    );
    await documentStore.waitForDeployment();
    return dispatch(setDocumentStoreAddress(documentStore.getAddress()));
  };
  return (
    <>
      <section className="deploy-container">
        <form action="">
          <div className="form-field">
            <label htmlFor="store-address">Store Address:</label>
            <input
              type="text"
              id="store-address"
              placeholder="Enter existing (0x...), or deploy new instance"
              onChange={(e) =>
                dispatch(setDocumentStoreAddress(e.target.value))
              }
              value={storeAddress?.storeAddress}
            />
          </div>
        </form>
        <hr />
        <div className="store-deploy">
          <h2>Deploy New Instance</h2>
          <div>
            <form onSubmit={deployDocumentStore}>
              <div className="form-field">
                <label htmlFor="store-name">Store Name:</label>
                <input
                  type="text"
                  id="store-name"
                  placeholder="Enter the store name you want to keep."
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>
              <button type="submit">Deploy</button>
            </form>
            {storeAddress?.storeAddress !== "" && (
              <p>{storeAddress?.storeAddress}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

DeployContainer.propTypes = {
  signer: PropTypes.any.isRequired,
};
export default DeployContainer;
