import React, { Component } from 'react';

class ImageHasher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashResults: [],
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
    const hashResults = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const hash = await this.hashImage(file);
      hashResults.push({ filename: file.name, hash });
    }

    this.setState({ hashResults });
  };

  render() {
    return (
      <div className="w-[90%] md:w-[50%] border-2 border-[rgba(109,40,217)] shadow-[5px_5px_0px_0px_rgba(109,40,217)] rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold mb-4">Upload your Certificates here..</h2>
        <label
          className="block py-2 px-4 bg-black text-white rounded-md cursor-pointer hover:bg-purpleColor"
          htmlFor="fileInput"
        >
          Choose File(s)
        </label>
        <input
          type="file"
          id="fileInput"
          multiple
          className="hidden"
          onChange={this.handleFileChange}
        />
        <ul className="mt-4">
          {this.state.hashResults.map((result, index) => (
            <li key={index} className="text-lg mb-2">
              <strong>{result.filename}:</strong> {result.hash}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ImageHasher;
