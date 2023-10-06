import React, { useState } from "react";

const Login = () => {
  const [imageAsset, setimageAsset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(null);
  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center mt-36">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>sdcbvjkbh</p>
            </>
          )}
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Tell me your name..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Add Email"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-lightBlue px-12 py-2 rounded-lg text-lg text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
