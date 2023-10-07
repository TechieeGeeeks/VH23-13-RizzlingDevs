import React from "react";
import { useState, useEffect, createContext } from "react";
import { hostC, hostS, clientHost, serverHost } from "../apiHelp";
import { useParams } from "react-router-dom";
import Demo from "../components/Demo";
import axios from "axios";
export const InputContext = createContext();

const host = hostS;
const locaHostClient = hostC;

const ViewCertificate = () => {
  const { id } = useParams();
  const [response, setResponse] = useState("");
  const [resUrl, setResUrl] = useState("");
  const [error, setError] = useState(null);
  const [isVerifyClicked, setIsVerifyClicked] = useState(true);
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
    headers: { Authorization: "Bearer f6e348b0-6491-11ee-b8be-699c810708b9" },
  };
  const bodyParameters = {
    colorDark: "#000000",
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

  const validateCertificateOnChain = async () => {
    try {
      const response = await fetch(
        `${host}/api/certificate/validatecertificate/${id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log(data);
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
        alert("Hogaya");
      }
      // Now you can use the 'data' object as needed in your application.
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error as needed, e.g., display an error message to the user.
    }
  };

  useEffect(() => {
    getCertificate();
    console.log(certificate);
    return () => {};
  }, []);

  return (
    <div className=" flex flex-col items-center mt-14">
      {isVerifyClicked ? (
        <div></div>
      ) : (
        <button
          onClick={validateCertificateOnChain}
          className=" border border-purpleColor text-purpleColor p-3 rounded-lg shadow-[5px_5px_0px_0px_rgba(109,40,217)] hover:text-black hover:border-black hover:shadow-black "
        >
          Validate Certificate
        </button>
      )}

      <Demo
        name={certificate.candidateName}
        title={certificate.courseName}
        date={certificate.duration}
        logo={resUrl}
        hash={certificate._id}
      />
    </div>
  );
};

export default ViewCertificate;
