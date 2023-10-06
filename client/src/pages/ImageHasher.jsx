import React from 'react';

class ImageHasher extends React.Component {
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

    console.log(hashResults);
  };

  render() {
    return (
      <div>
        <input type="file" id="fileInput" accept="image/*" multiple onChange={this.handleFileChange} />
      </div>
    );
  }
}

export default ImageHasher;
