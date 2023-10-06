import React, { useState } from "react";
import Lottie from "lottie-react";
import login from "../img/login.json";
import { useNavigate } from "react-router-dom";

const Login = ({setIsLogin}) => {
  const localHost = "http://localhost:8080";
  let navigate = useNavigate();
  const [imageAsset, setimageAsset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(null);

  const handleLogin = async () => {
    const response = await fetch(`${localHost}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      console.log(json.success);
      localStorage.setItem("token", json.authToken);
      setIsLogin(true);
      navigate("/user_dashboard");
     alert("Welcome to Linked Blocks")
    } else {
      alert("Login with proper credentials")
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center md:mt-36 mt-12">
      <div className="w-[90%] md:w-[50%] border-2 border-purpleColor shadow-[5px_5px_0px_0px_rgba(109,40,217)] rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <div className="group flex justify-center items-center flex-col border-2 border-dotted bg-white border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg overflow-hidden ">
        <div className="md:flex md:w-1/2 md:mt-20">
            <Lottie animationData={login} />
          </div>
        </div>

        {/* <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Tell me your name..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div> */}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter Email"
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
            className="ml-0 border border-black bg-purpleColor text-white  md:ml-auto w-full md:w-auto border-none outline-none bg-lightBlue px-12 py-2 rounded-lg text-lg font-semibold"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
