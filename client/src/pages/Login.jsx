import React, { useState } from "react";
import Lottie from "lottie-react";
import login from "../img/login.json";
import { useNavigate } from "react-router-dom";
import Tick from "../img/tick.json";

const Login = ({ setIsLogin }) => {
  const host = "https://linkedblocks.onrender.com";
  let navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(null);
  const [tempLogInCheck, setTempLogInCheck] = useState(false);

  const handleLogin = async () => {
    const response = await fetch(`${host}/api/auth/login`, {
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
      setTempLogInCheck(true);

      // Delay navigation for a few seconds to display the Tick animation
      setTimeout(() => {
        setIsLogin(true);
        navigate("/user_dashboard");
      }, 2500); // Adjust the delay time as needed
    } else {
      alert("Login with proper credentials");
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center md:mt-36 mt-12">
      {/* <div className="w-1/4 flex flex-col items-center justify-center bg-white border rounded border-dotted">
        <Lottie animationData={Tick} />
      </div> */}

      <div className="w-[90%] md:w-[50%] border-2 border-purpleColor shadow-[5px_5px_0px_0px_rgba(109,40,217)] rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <div className="group flex justify-center items-center flex-col border-2 border-dotted bg-white border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg overflow-hidden ">
          {tempLogInCheck ? (
            <div className="w-1/4 flex flex-col items-center justify-center bg-white border rounded border-dotted">
              <Lottie animationData={Tick} />
            </div>
          ) : (
            <div className="md:flex md:w-1/2 md:mt-20">
              <Lottie animationData={login} />
            </div>
          )}
        </div>

        {tempLogInCheck ? (
          <div></div>
        ) : (
          <div className=" w-full">
            {" "}
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
                className="ml-0 mt-4 border border-black bg-purpleColor text-white  md:ml-auto w-full md:w-auto border-none outline-none bg-lightBlue px-12 py-2 rounded-lg text-lg font-semibold"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
