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

function App() {
  return (
    <div className="md:p-6 md:px-64 p-7">
      <Navbar />

      <Routes>
        <Route path="/*" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-now" element={<RegisterNow />}/>
        <Route path="/courses" element={<Courses />}/>
        <Route path="/certificate/create" element={<MintCertificate />}/>
      </Routes>
      {/* <HeroSection />
       <CertificateWithExport className="Your Class Name" /> */}
    </div>
  );
}

export default App;
