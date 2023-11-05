import React from "react";
import { useState, useEffect, createContext } from "react";
import { hostC, hostS, clientHost, serverHost } from "../apiHelp";
import { useParams } from "react-router-dom";
import Demo from "../components/Demo";
import axios from "axios";
import Lottie from "lottie-react";
import bBlock from "../img/block.json";
import DBase from "../img/db.json";
import Tick from "../img/tick.json";

export const InputContext = createContext();

const host = hostS;
const locaHostClient = hostC;

const ViewCertificate = () => {
  const { id } = useParams();
  const [response, setResponse] = useState("");
  const [resUrl, setResUrl] = useState("");
  const [error, setError] = useState(null);
  const [isVerifyClicked, setIsVerifyClicked] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [dbStatus, setDbstatus] = useState(false);
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
    headers: { Authorization: "Bearer ab73bdb0-64c8-11ee-b157-c946b9aced4f" },
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
      setIsVerifyClicked(true);
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
        setTimeout(() => {
          setIsVerifyClicked(false);
          setDbstatus(true);
        }, 3000);

        setTimeout(() => {
          setDbstatus(false);
          setConnectionSuccess(true)
        }, 6000);

        setTimeout(() => {
          
          setConnectionSuccess(false)
        }, 9500);
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
    <div className=" flex flex-col items-center mt-14 h-screen justify-center pb-12">
      
        {!connectionSuccess && !isVerifyClicked &&!dbStatus && ( <button
          onClick={validateCertificateOnChain}
          className=" border border-purpleColor shadow-[5px_5px_0px_0px_rgba(109,40,217)]  text-purpleColor p-3 rounded-lg hover:text-black hover:border-black hover:shadow-black "
        >
          Validate Certificate
        </button>)}
       
      

      {connectionSuccess && (
        <div className="  mt-5 md:w-full min-w-620 flex flex-col items-center justify-center">
          <div className="  border border-purpleColor shadow-[5px_5px_0px_0px_rgba(109,40,217)]  w-[20%] flex items-center justify-center bg-white rounded-lg p-4">
            <p>Successfully Validated</p>
            <Lottie animationData={Tick} />
          </div>
        </div>
      )}

      {isVerifyClicked && (
        <div className="md:w-full min-w-620 flex flex-col items-center justify-center">
          <div className="  border border-purpleColor shadow-[5px_5px_0px_0px_rgba(109,40,217)]  w-1/4 flex items-center justify-center bg-white rounded-lg p-6">
            <p>Connecting to database...</p>
            <Lottie animationData={DBase} />
          </div>
          {/* <div className=" border border-purpleColor shadow-[5px_5px_0px_0px_rgba(109,40,217)]  mt-6 w-1/4 flex items-center justify-center bg-white rounded-lg p-6">
            <Lottie animationData={bBlock} /> <p>Connecting to blockchain...</p>
          </div> */}
        </div>
      )}

      {dbStatus && (
        <div className="md:w-full min-w-620 flex flex-col items-center justify-center">
          <div className="  border border-purpleColor shadow-[5px_5px_0px_0px_rgba(109,40,217)]  w-1/4 flex items-center justify-center bg-white rounded-lg p-6">
            <p>Connecting to Blockchain.</p>
            <Lottie animationData={bBlock} />
          </div>
          {/* <div className=" border border-purpleColor shadow-[5px_5px_0px_0px_rgba(109,40,217)]  mt-6 w-1/4 flex items-center justify-center bg-white rounded-lg p-6">
            <Lottie animationData={bBlock} /> <p>Connecting to blockchain...</p>
          </div> */}
        </div>
      )}

      {!connectionSuccess && !isVerifyClicked &&!dbStatus && (
        <Demo
          name={certificate.candidateName}
          title={certificate.courseName}
          date={certificate.duration}
          logo={resUrl}
          hash={certificate._id}
        />
      )}
    </div>
  );
};

export default ViewCertificate;
