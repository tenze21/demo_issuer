import { useState } from "react";
import PropTypes from "prop-types";
import { wrapDocuments } from "@govtechsg/open-attestation";
import { Buffer } from "buffer";
import { setSignedDocuments } from "../slices/signedDocumentSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";

window.Buffer = Buffer;
function XForm({documentBase, signer}) {

    const [marksheets, setMarksheets] = useState([]);
    const [wrappedMarksheets, setWrappedMarksheets] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(null);
    const dispatch= useDispatch();

    const did= useSelector((state)=>state.did.did);
    const signedDocuments= useSelector((state)=>state.signedDocuments);

    const [formData, setFormData] = useState({
        examinationTime: "",
        name: "",
        indexNo: "",
        school: "",
        dob: "",
        english: "",
        dzongkha: "",
        math: "",
        science: "",
        hcg: "",
        economics: "",
        agriculture: "",
        IT: "",
        supw: "",
        result: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const documentData={
        recepient: {
            name: formData.name,
            indexNo: formData.indexNo,
            school: formData.school,
            dob: formData.dob,
        },
        achievements: {
            english: formData.english,
            dzongkha: formData.dzongkha,
            math: formData.math,
            science: formData.science,
            hcg: formData.hcg,
            economics: formData.economics,
            agriculture: formData.agriculture,
            IT: formData.IT,
            supw: formData.supw,
        },
        result: formData.result,
    }
    
    const handleCompile=(e)=>{
        e.preventDefault();
        const rawDocument={...documentBase, ...documentData};
        setMarksheets([...marksheets, rawDocument]);
        setFormData({
            examinationTime: "",
            name: "",
            indexNo: "",
            school: "",
            dob: "",
            english: "",
            dzongkha: "",
            math: "",
            science: "",
            hcg: "",
            economics: "",
            agriculture: "",
            IT: "",
            supw: "",
            result: "",
        });
    }

    const handleWrap=async()=>{
      try {
        // wrap marksheets
        const wrappedMarksheets=wrapDocuments(marksheets);
        setWrappedMarksheets(wrappedMarksheets);

        // sign merkle root
        const merkleRoot= wrappedMarksheets[0].signature.merkleRoot;
        const signature= await signer.signMessage(merkleRoot);

        // sign each wrapped marksheet
        for(let i=0; i<wrappedMarksheets.length; i++){
          const signedDocument={...wrappedMarksheets[i], proof: [
            {
              type: "OpenAttestationSignature2018",
              created: new Date().toISOString(),
              proofPurpose: "assertionMethod",
              verificationMethod: `${did}#controller`,
              signature: signature
            }
          ]};
          dispatch(setSignedDocuments(signedDocument));
        }
      } catch (err) {
        setError(err.message);
      }
    }

    const handleDownload=()=>{
      for(let i=0; i<signedDocuments.length; i++){
        const blob = new Blob([JSON.stringify(signedDocuments[i], null, 2)], {
          type: "text/json;charset=utf-8",
        });
        const indexNo= signedDocuments[i].data.recepient.indexNo.split(":")[2];
        saveAs(blob, `${indexNo}.json`);
      }
    }

  return (
    <>
    <div style={{display: "flex", gap: "10px", alignItems: "center", justifyContent: "end", marginRight: "1rem"}}>
      <input type="checkbox" id="completed" onChange={()=>setCompleted(!completed)} style={{width: "20px", height: "20px"}}/>
      <label htmlFor="completed">Check if Completed</label>
    </div>
      <form action="" onSubmit={handleCompile}>
          <div className="form-field">
              <label htmlFor="examinationTime">Examination Time:</label>
              <input type="text" id="examinationTime" name="examinationTime" required onChange={handleChange} value={formData.examinationTime}/>
          </div>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required onChange={handleChange} value={formData.name}/>
          </div>
          <div className="form-field">
            <label htmlFor="indexNo">Index No:</label>
            <input type="number" id="indexNo" name="indexNo" required onChange={handleChange} value={formData.indexNo}/>
          </div>
          <div className="form-field">
            <label htmlFor="school">School:</label>
            <input type="text" id="school" name="school" required onChange={handleChange} value={formData.school}/>
          </div>
          <div className="form-field">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" required onChange={handleChange} value={formData.dob}/>
          </div>
          <div className="form-field">
            <label htmlFor="english">English:</label>
            <input type="number" id="english" name="english" required onChange={handleChange} value={formData.english}/>
          </div>
          <div className="form-field">
            <label htmlFor="dzongkha">Dzongkha:</label>
            <input type="number" id="dzongkha" name="dzongkha" required onChange={handleChange} value={formData.dzongkha}/>
          </div>
          <div className="form-field">
            <label htmlFor="math">Math:</label>
            <input type="number" id="math" name="math" required onChange={handleChange} value={formData.math}/>
          </div>
          <div className="form-field">
            <label htmlFor="science">Science:</label>
            <input type="number" id="science" name="science" required onChange={handleChange} value={formData.science}/>
          </div>
          <div className="form-field">
              <label htmlFor="hcg">History Civics & Geography:</label>
              <input type="number" id="hcg" name="hcg" required onChange={handleChange} value={formData.hcg}/>
          </div>
          <div className="form-field">
              <label htmlFor="economics">Economics:</label>
              <input type="number" id="economics" name="economics" onChange={handleChange} value={formData.economics}/>
          </div>
          <div className="form-field">
              <label htmlFor="agriculture">Agriculture:</label>
              <input type="number" id="agriculture" name="agriculture" onChange={handleChange} value={formData.agriculture}/>
          </div>
          <div className="form-field">
              <label htmlFor="it">IT:</label>
              <input type="number" id="it" name="IT" required onChange={handleChange} value={formData.IT}/>
          </div>
          <div className="form-field">
              <label htmlFor="supw">SUPW & Community Service Grade:</label>
              <input type="text" id="supw" name="supw" required onChange={handleChange} value={formData.supw}/>
          </div>
          <div className="form-field">
              <label htmlFor="result">Result:</label>
              <input type="text" id="result" name="result" required onChange={handleChange} value={formData.result}/>
          </div>
          <div style={{display: "flex", gap: "10px"}}>
            <button type="submit">Compile</button>
            <button type="button" onClick={handleWrap} disabled={!completed}>Wrap & Sign Marksheets</button>
          </div>
          {error && <p style={{color: "red"}}>{error}</p>}
        </form>
        <hr />
        <button type="button" onClick={handleDownload} style={{margin: "3rem auto", display: "block"}}>Download Marksheets</button>
    </>
  );
}

XForm.propTypes={
    documentBase: PropTypes.object.isRequired,
    signer: PropTypes.object.isRequired
}

export default XForm;

