import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Login from "./pages/Login";
import RegisterNow from "./pages/RegisterNow";
import Courses from "./components/Courses";
import MintCertificate from "./pages/MintCertificate.jsx";
import { useState } from "react";
import ImageHasher from "./pages/ImageHasher"
import offlineCertificateChecker from "./pages/offlineCertificateChecker";


import ViewCertificate from "./pages/ViewCertificate";
import UserRoute from "./components/userRoute";
import Footer from "./components/Footer";
import TrustedPartners from "./components/TrustedPartners";
import Homepage from "./pages/Homepage";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <div className="md:p-6 md:px-64 p-7">
        <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />

        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route
            path="/register-now"
            element={<RegisterNow setIsLogin={setIsLogin} />}
          />
          <Route
            path="/user_dashboard"
            element={
              <UserRoute>
                <Courses />
              </UserRoute>
            }
          />
          <Route
            path="/certificate/create"
            element={
              <UserRoute>
                <MintCertificate />
              </UserRoute>
            }
          />
          <Route path="/user_dashboard" element={<Courses />} />
          <Route path="/image_hasher" element={<ImageHasher />} />
          <Route path="/certificate/create" element={<MintCertificate />} />
          <Route path="/certificate/view/:id" element={<ViewCertificate />} />
          <Route path="/offlineCertificate" element={<offlineCertificateChecker/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
