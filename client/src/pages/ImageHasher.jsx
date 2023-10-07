import React, { useState } from "react";
import Lottie from "lottie-react";
import drop from "../img/drop.json";
import { hostC, hostS, clientHost, serverHost } from "../apiHelp";

function ImageHasher() {
  const [fileHashes, setfileHashes] = useState([]);
  const host = hostS;
  const [responseBatch, setResponseBatch] = useState(null);

  async function hashImage(file) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  async function handleFileChange(event) {
    const files = event.target.files;
    const fileHashes = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const hash = await hashImage(file);
      fileHashes.push(hash);
      console.log(fileHashes);
    }

    setfileHashes(fileHashes);
  }

  const pushHashesOnChain = async (fileHashes) => {
    try {
      const response = await fetch(
        `${host}/api/ceritificateBatches/createBatch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            batchName: "asdfasdf",
            arraysOfHash: fileHashes,
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const { batchName, _id } = json.batch; // Destructure the fields you need
        setResponseBatch({ batchName, _id }); // Set the response with only batchName and _id
      } else {
        // Handle error cases if needed
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const fileHashes = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const hash = await hashImage(file);
      fileHashes.push(hash);
      console.log(fileHashes);
    }

    setfileHashes(fileHashes);
  }

  const handlClick = async () => {
    console.log("push Ho raha hey");
    await pushHashesOnChain(fileHashes);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center md:mt-36 mt-12">
      <div className="max-w-md mx-auto w-[90%] md:w-[50%] border-2 border-[rgba(109,40,217)] shadow-[5px_5px_0px_0px_rgba(109,40,217)] rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold mb-4" onClick={handlClick}>
          Drop your Certificates here..
        </h2>
        <div>{<Lottie animationData={drop} />}</div>
        <label
          className="block py-16 px-4 bg-black text-white rounded-md cursor-pointer hover:bg-purpleColor text-center w-full"
          htmlFor="fileInput"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          Drop File(s) Here
        </label>

        <label
          className="block py-16 px-4 bg-black text-white rounded-md cursor-pointer hover:bg-purpleColor text-center w-full"
          onClick={handlClick}
        >
          Push
        </label>

        <input
          type="file"
          id="fileInput"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>{" "}
      <div>
        <ul className="mt-4 border p-3 border-purpleColor text-purpleColor">
          <p className=" font-semibold text-xl mb-3">Image Hashes:</p>
          {fileHashes.map((filename, index) => (
            <li key={index} className="text-lg mb-2 ">
              {filename.length > 20 ? `${filename.slice(0, 20)}...` : filename}
            </li>
          ))}
        </ul>
        {responseBatch && (
          <div className=" mt-6 border p-3 border-purpleColor text-purpleColor">
             <p className=" font-semibold text-xl mb-3">Response From Server:</p>
            <p>Batch Name: {responseBatch.batchName}</p>
            <p>ID: {responseBatch._id}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageHasher;
