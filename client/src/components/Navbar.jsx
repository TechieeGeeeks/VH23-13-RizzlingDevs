import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";

const Navbar = ({ isLogin, setIsLogin }) => {
  const [isMenu, setIsMenu] = useState(false);
  let navigate = useNavigate();

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleLogOut = async () => {
    localStorage.removeItem("token");
    setIsLogin(!isLogin);
    navigate("/");
  };

  return (
    <header>
      {/* Desk */}
      <div className="hidden md:flex justify-between">
        <Link to="/">
          <p className=" flex  items-center gap-2 text-xl cursor-pointer">
            <span className=" text-purpleColor">
              <AiOutlineLink />
            </span>
            {/* <span className=" font-bold text-purpleColor">Linking</span> */}
            Blocks
          </p>
        </Link>

        <div className=" flex gap-6 ">
          {isLogin ? (
            <p
              className="  p-3 rounded hover:shadow-[5px_5px_0px_0px_#FF0000] hover:text-red-500 hover:border-red-500 cursor-pointer hover:border-2"
              onClick={handleLogOut}
            >
              Log Out
            </p>
          ) : (
            <div className=" flex gap-6">
              <Link to="/register-now">
                <p className="  p-3 rounded hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] hover:border-purpleColor cursor-pointer hover:border-2">
                  Register Now
                </p>
              </Link>

              <Link to="/login">
                <p className="  p-3 rounded hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] hover:border-purpleColor cursor-pointer hover:border-2">
                  Login
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="md:hidden flex justify-between ">
        <Link to="/">
          <p className="  text-lg cursor-pointer flex items-center gap-1 ">
            <span className=" text-purpleColor">
              <AiOutlineLink />
            </span>
            Blocks
          </p>
        </Link>
        <div className="">
          <HiOutlineMenuAlt3
            className={`${
              isLogin ? "text-red-500" : "text-purpleColor"
            } text-2xl`}
            onClick={handleMenu}
          />
          {isMenu && (
            <div
              className={`flex flex-col items-center border bg-white ${
                isLogin
                  ? "border-red-500 shadow-[5px_5px_0px_0px_#FF0000]  text-red-500"
                  : "border-[rgba(109,40,217)] shadow-[5px_5px_0px_0px_rgba(109,40,217)] "
              } rounded absolute py-1 right-8 top-16 `}
            >
              {isLogin ? (
                <p className="w-full text-center px-2 ">Logout</p>
              ) : (
                <div className="flex flex-col items-center">
                  <Link to="/register-now">
                    <p className="w-full text-center px-2 border border-b-2 border-[rgba(109,40,217)] border-t-0 border-x-0">
                      Register Now
                    </p>
                  </Link>
                  <Link to="/login">
                    <p className="w-full text-center px-2">Login</p>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
