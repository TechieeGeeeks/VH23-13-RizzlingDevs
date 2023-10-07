import React from "react";
import { useState, useEffect, createContext } from "react";
import { hostC,hostS,clientHost,serverHost } from "../apiHelp";
import { useParams } from "react-router-dom";
import Demo from "../components/Demo";
import axios from "axios";
export const InputContext = createContext();


const host = hostS;
const locaHostClient=hostC;

const ViewCertificate = () => {
  const { id } = useParams();
  const [response, setResponse] = useState("");
  const[resUrl,setResUrl]=useState("");
  const [error, setError] = useState(null);
  const [certificate, setCertificate] = useState({
    _id: "",
    user: "",
    candidateName: "",
    orgName: "",
    courseName: "",
    duration: "",
  });
  const getQrCode = async () => {
    try {

      const res = await axios.post(
        "https://qrtiger.com/api/qr/static",
        bodyParameters,
        config
      );
      setResUrl(res.data.url);
      console.log(resUrl);
    } catch (err) {
      setError(err);
    } finally {

    }
  };


  const config = {
    headers: { Authorization: "Bearer 4853daa0-648f-11ee-8a91-5771e619eb20" },
  };
  const bodyParameters = {
    colorDark: '#000000',
    qrCategory: "url",
    text: `${locaHostClient}/certificate/view/${id}`,
  };


  const getCertificate = async () => {
    try {
      const response = await fetch(`${host}/api/certificate/${id}`, {
        method: "GET",
      });

      const data = await response.json();
      if (data.success) {
        setCertificate({
          _id: data.certificate._id,
          user: data.certificate.user,
          candidateName: data.certificate.candidateName,
          orgName: data.certificate.orgName,
          courseName: data.certificate.courseName,
          duration: data.certificate.duration,
        });
        console.log("Response data:", data);
        getQrCode();
      }
      // Now you can use the 'data' object as needed in your application.
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error as needed, e.g., display an error message to the user.
    }
  };

    const validateCertificateOnChain = async()=>{
      try {
        const response = await fetch(`${host}/api/certificate/validatecertificate/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          //console.log("The Certificate holders name:", data.saveCertificate.candidateName);
          //console.log("The Certificate holders id:", data.saveCertificate._id);
          console.log(data);
          setCertificate({
            _id: data.certificate._id,
            user: data.certificate.user,
            candidateName: data.certificate.candidateName,
            orgName: data.certificate.orgName,
            courseName: data.certificate.courseName,
            duration: data.certificate.duration,
          });
          alert("Hogaya")
        }
        // Now you can use the 'data' object as needed in your application.
      } catch (error) {
        console.error("Error:", error.message);
        // Handle the error as needed, e.g., display an error message to the user.
      }
    }


  useEffect(() => {
    getCertificate();
    console.log(certificate);
    return () => {};
  }, []);

  return (
    <>
      <Demo
        name={certificate.candidateName}
        title={certificate.courseName}
        date={certificate.duration}
        logo={resUrl}
        hash={certificate._id}
      />
      
      <button onClick={validateCertificateOnChain}>Validate Certificate</button>
    </>
  );
};

export default ViewCertificate;