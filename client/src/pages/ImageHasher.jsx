import React, { Component } from 'react';
import Lottie from "lottie-react";
import drop from "../img/drop.json";

class ImageHasher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filenames: [], // Store only filenames in state
    };
  }

  async hashImage(file) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  handleFileChange = async (event) => {
    const files = event.target.files;
    const filenames = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const hash = await this.hashImage(file);
      filenames.push(file.name);
      console.log(`Filename: ${file.name}, Hash: ${hash}`); // Log both filename and hash to the console
    }

    this.setState({ filenames });
  };

  handleDrop = async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const filenames = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const hash = await this.hashImage(file);
      filenames.push(file.name);
      console.log(`Filename: ${file.name}, Hash: ${hash}`); // Log both filename and hash to the console
    }

    this.setState({ filenames });
  };

  render() {
    return (
        
        <div className="w-full flex flex-col gap-8 items-center justify-center  md:mt-36 mt-12">
        <div className="max-w-md mx-auto w-[90%] md:w-[50%] border-2 border-[rgba(109,40,217)] shadow-[5px_5px_0px_0px_rgba(109,40,217)] rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold mb-4">Drop your Certificates here..</h2>
        <div >
              <Lottie animationData={drop} />
            </div>
        <label
          className="block py-16 px-4 bg-black text-white rounded-md cursor-pointer hover:bg-purpleColor text-center w-full"
          htmlFor="fileInput"
          onDragOver={(e) => e.preventDefault()}
          onDrop={this.handleDrop}
        >
          Drop File(s) Here
        </label>
        <input
          type="file"
          id="fileInput"
          multiple
          className="hidden"
          onChange={this.handleFileChange}
        />
        <ul className="mt-4">
          {this.state.filenames.map((filename, index) => (
            <li key={index} className="text-lg mb-2">
              {filename}
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  }
}

export default ImageHasher;
