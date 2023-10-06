import React, { useRef, useState } from "react";
import CertificateImg from "../img/certificate.svg";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref} className=" absolute flex items-center justify-center">
    <p className=" absolute text-3xl font-bold">{props.className}</p>
    <img src={CertificateImg} />
  </div>
));

const Certificate = () => {
  const [className, setClassName] = useState("");
    const [photoUrl, setPhotoUrl] = useState(""); // Store the URL/path to the user's photo

  const componentRef = useRef();
  const handleDownload = () => {
    exportComponentAsJPEG(componentRef);
    console.log(componentRef);
  };

  return (
    <div>
      <input
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className=" border"
      />

      <ComponentToPrint
        ref={componentRef}
        className={className}
        photoUrl={photoUrl}
      />
      <button onClick={handleDownload}> Download</button>
    </div>
  );
};

export default Certificate;
