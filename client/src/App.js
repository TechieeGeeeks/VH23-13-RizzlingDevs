import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CertificateGenerator from "./components/Certificate";
import CertificateWithExport from "./components/Certificate";

function App() {
  return (
    <div className="md:p-6 md:px-64 p-7">
      <Navbar />
      {/* <HeroSection />
       <CertificateWithExport className="Your Class Name" /> */}
    </div>
  );
}

export default App;
