import React, { useState } from "react";
import Lottie from "lottie-react";

import Img from "../img/c1.svg";
import StatusPopup from "./StatusPopUp";
import { Link } from "react-router-dom";

const Cards = ({
  duration,
  title,
  subTitle,
  type,
  organization,
  requirements,
  img,
  isCompleted,
}) => {
  const [isStatusVisible, setStatusVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  const handleCheckStatusClick = () => {
    // Determine the status message based on the isCompleted property
    const statusMessage = isCompleted
      ? "Status: Completed"
      : "Status: In Progress";

    setStatusMessage(statusMessage);
    setStatusVisible(true);
  };

  // const handleMintClick = () => {
  //   // Perform minting logic here
  //   setIsMinting(true);

  //   // Simulate a delay (you can replace this with actual minting logic)
  //   setTimeout(() => {
  //     setIsMinting(false);
  //     // Add logic to confirm minting success or failure
  //     alert("Minting completed successfully!"); // Replace with your own UI feedback
  //   }, 2000); // Simulated 2-second minting process
  // };

  const handleCloseStatusPopup = () => {
    setStatusVisible(false);
  };

  return (
    <div>
      {/* for mobile */}
      <div className="p-6 md:hidden bg-white border-2 shadow-[5px_5px_0px_0px_rgba(109,40,217)] border-purpleColor rounded-lg mt-6">
        <div className=" flex items-center  font-medium gap-4">
          <div>
            <img
              src={img}
              className="w-20 md:w-[15%] mb-3 border rounded-full overflow-hidden"
            />
          </div>
          <div>
            <p>{title}</p>
            <p className=" text-sm  text-gray-400">Type: {type}</p>
          </div>
        </div>
        <p className=" text-black font-light">Organization: {organization}</p>
        <p className=" text-black font-light">Duration: {duration} Days</p>
        <p className=" text-justify text-gray-500 mt-6">{subTitle}</p>
        <div className="mt-4">
          {isCompleted ? (
            <button
              className={`w-full bg-purpleColor p-2 rounded text-white ${
                isMinting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isMinting ? (
                "Minting..."
              ) : (
                <Link to="/certificate/create">
                  <p>Mint Certificate</p>
                </Link>
              )}
            </button>
          ) : (
            <button
              onClick={handleCheckStatusClick}
              className="w-full bg-purpleColor p-2 rounded text-white "
            >
              Check Status
            </button>
          )}
        </div>
        <StatusPopup
          isVisible={isStatusVisible}
          onClose={handleCloseStatusPopup}
          status={statusMessage}
        />
      </div>

      {/* for computer */}
      <div className="hidden md:flex mt-8 border-2 shadow-[5px_5px_0px_0px_rgba(109,40,217)] border-purpleColor rounded-lg mx-24">
        <div className=" flex-1 justify-center items-center bg-white rounded-lg p-8">
          <div className="flex gap-12 items-center justify-center ">
            <div className="w-20 md:w-[15%] mb-3 rounded-full overflow-hidden object-cover py-6">
              <img src={img} className=" " />
            </div>
            <div className=" flex flex-col">
              <div className=" flex justify-between">
                <p className=" text-xl font-bold">{title}</p>
                <p className=" text-lg font-semibold"></p>
              </div>
              <div>
                <div>
                  <div className=" flex gap-10">
                    <div className=" flex-col mt-3">
                      <p className=" text-gray-500">Type</p>
                      <p className=" font-semibold">{type}</p>
                    </div>

                    <div className=" flex-col mt-3">
                      <p className=" text-gray-500">Organization</p>
                      <p className=" font-semibold">{organization}</p>
                    </div>

                    <div className=" flex-col mt-3">
                      <p className=" text-gray-500">Duration</p>
                      <p className=" font-semibold">{duration} Days</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex justify-between items-center gap-10">
                <p className=" text-gray-500 text-sm mt-3 w-[70%]">
                  {subTitle}
                </p>
                <div className="mt-4">
                  {isCompleted ? (
                    <button
                      className={`w-full bg-purpleColor p-2 rounded text-white ${
                        isMinting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isMinting ? (
                        "Minting..."
                      ) : (
                        <Link to="/certificate/create">
                          <p>Mint Certificate</p>
                        </Link>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleCheckStatusClick}
                      className="w-full bg-purpleColor p-2 rounded text-white "
                    >
                      Check Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>{" "}
          <StatusPopup
            isVisible={isStatusVisible}
            onClose={handleCloseStatusPopup}
            status={statusMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
