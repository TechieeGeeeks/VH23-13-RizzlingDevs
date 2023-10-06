import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import CertificateGenerator from "./components/Certificate";
import CertificateWithExport from "./components/Certificate";
import Login from "./pages/Login";
import RegisterNow from "./pages/RegisterNow";
import Courses from "./components/Courses";
import MintCertificate from "./pages/MintCertificate.jsx";
import Demo from "./components/Demo";
import { useState, createContext } from "react";
import axios from "axios";
import InputForm from "./components/qr-generation/InputForm";
import QrCode from "./components/qr-generation/QrCode";

export const InputContext = createContext();

function App() {
  const [inputValue, setInputValue] = useState({
    url: "",
    color: "",
  });
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const config = {
    headers: { Authorization: "Bearer 2b38fc30-6420-11ee-a74e-41d810857b10" },
  };
  const bodyParameters = {
    colorDark: inputValue.color,
    qrCategory: "url",
    text: inputValue.url,
  };
  const getQrCode = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://qrtiger.com/api/qr/static",
        bodyParameters,
        config
      );
      setResponse(res.data.url);
      console.log(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    inputValue,
    setInputValue,
    getQrCode,
    response,
    loading,
    error,
  };

  return (
    <div className="md:p-6 md:px-64 p-7">
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />

      <Routes>
        <Route path="/*" element={<HeroSection />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route
          path="/register-now"
          element={<RegisterNow setIsLogin={setIsLogin} />}
        />
        <Route path="/user_dashboard" element={<Courses />} />
        <Route path="/certificate/create" element={<MintCertificate />} />
      </Routes>
      {/* <Demo /> */}
      {/* <HeroSection />
       <CertificateWithExport className="Your Class Name" /> */}
      {/* <CertificateWithExport className="Your Class Name" />  */}
      <Demo
        name="John Doe"
        title="React Master"
        date="October 6, 2023"
        logo={response}
        hash="12345"
      />

      <InputContext.Provider value={value}>
        <InputForm />
        <QrCode />
      </InputContext.Provider>
    </div>
  );
}

export default App;
