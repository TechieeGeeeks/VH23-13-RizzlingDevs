import React from "react";

const Demo = ({ title, name, date, hash, logo }) => {
  const qrCodeData = `ID: ${hash}`; // Data for the QR code
  const qrCodeSize = 150; // Size of the QR code square

  // Function to generate the QR code as SVG elements
  const generateQRCodeSVG = () => {
    const qrCodeElements = [];
    const qrCode = qrCodeData.split("");

    // Create the QR code squares
    for (let row = 0; row < qrCodeSize; row++) {
      for (let col = 0; col < qrCodeSize; col++) {
        const x = col * 5; // Each square is 5 units wide
        const y = row * 5; // Each square is 5 units tall
        const fill = qrCode.shift() === "1" ? "#000" : "#fff"; // Fill color based on QR code data

        qrCodeElements.push(
          <rect key={`${row}-${col}`} x={x} y={y} width="5" height="5" fill={fill} />
        );
      }
    }

    return qrCodeElements;
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" id="certificate">
      {/* QR Code */}
      <g transform="translate(50, 50)">
        {generateQRCodeSVG()}
      </g>

      {/* Certificate Border */}
      <rect
        x="50"
        y="25"
        rx="20"
        ry="20"
        width="700"
        height="450"
        id="border"
        fill="none"
        stroke="#000000"
        stroke-width="3"
      />

      {/* Certificate Title */}
      <text x="400" y="100" text-anchor="middle" fill="#000" id="bodyTitle" font-size="30" font-weight="bold">
        Certificate
      </text>

      {/* "of" Subtitle */}
      <text x="400" y="140" text-anchor="middle" fill="#000" id="bodySubTitle" font-size="20">
        of
      </text>

      {/* Title Underline */}
      <line x1="250" y1="170" x2="550" y2="170" id="titleUnderLine" stroke="#000" stroke-width="2" />

      {/* Certificate Title Text */}
      <text x="400" y="160" text-anchor="middle" fill="#000" id="title" font-size="28" font-weight="bold">
        {title}
      </text>

      {/* "Awarded to" Subtitle */}
      <text x="400" y="220" text-anchor="middle" fill="#000" id="subTitleHeader" font-size="20">
        awarded to
      </text>

      {/* Recipient Name */}
      <text x="400" y="270" text-anchor="middle" fill="#000" id="name" font-size="26">
        {name}
      </text>

      {/* Name Underline */}
      <line x1="250" y1="290" x2="550" y2="290" id="titleUnderLine" stroke="#000" stroke-width="2" />

      {/* "on" Subtitle */}
      <text x="400" y="320" text-anchor="middle" fill="#000" id="bodySubTitle" font-size="20">
        on
      </text>

      {/* Date */}
      <text x="400" y="360" text-anchor="middle" fill="#000" id="date" font-size="24">
        {date}
      </text>

      {/* Date Underline */}
      <line x1="250" y1="380" x2="550" y2="380" id="titleUnderLine" stroke="#000" stroke-width="2" />

      {/* ID */}
      <text x="70" y="480" text-anchor="start" fill="#000" id="hash" font-size="18">
        ID: {hash}
      </text>

      {/* Logo */}
      <image
        x="625"
        y="410"
        height="80px"
        width="120px"
        id="logo"
        href={logo}
      />
    </svg>
  );
};

export default Demo;
