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

import ViewCertificate from "./pages/ViewCertificate";


function App() {


  const [isLogin, setIsLogin] = useState(false)



 

  return (
    
    <div className="md:p-6 md:px-64 p-7">
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin}/>

      <Routes>
        <Route path="/*" element={<HeroSection />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin}/>} />
        <Route path="/register-now" element={<RegisterNow setIsLogin={setIsLogin} />} />
        <Route path="/user_dashboard" element={<Courses />} />
        <Route path="/certificate/create" element={<MintCertificate />} />
        <Route path="/certificate/view/:id" element={<ViewCertificate/>}/>
      </Routes>
      {/* <Demo /> */}
      {/* <HeroSection />
       <CertificateWithExport className="Your Class Name" /> */}
      {/* <CertificateWithExport className="Your Class Name" />  */}
      


    </div>
  );
}

export default App;
