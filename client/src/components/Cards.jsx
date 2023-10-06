import React from "react";
import Lottie from "lottie-react";

import Img from '../img/1.png'

const Cards = ({
  title,
  subTitle,
  type,
  organization,
  requirements,
  img,

}) => {
  

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
        <p className=" text-justify text-gray-500 mt-6">{subTitle}</p>
        <div className="  mt-4">
     
        <button className="w-full bg-purpleColor p-2 rounded text-white ">Check Status</button>
        </div>
      </div>

      {/* for computer */}
      <div className="hidden md:flex mt-8 border-2 shadow-[5px_5px_0px_0px_rgba(109,40,217)] border-purpleColor rounded-lg mx-24">
        <div className=" flex-1 bg-white rounded-lg p-8">
          <div className="flex gap-12 items-center justify-center ">
            <div className="w-20 md:w-[15%] mb-3 rounded-full overflow-hidden object-cover py-6">
            <img
              src={img}
              className=" "
            />
            </div>
            <div className=" flex flex-col">
              <div className=" flex justify-between">
                <p className=" text-xl font-bold">{title}</p>
                <p className=" text-lg font-semibold">
                </p>
              </div>
              <div className=" flex gap-10">
                <div className=" flex-col mt-3">
                  <p className=" text-gray-500">Type</p>
                  <p className=" font-semibold">{type}</p>
                </div>
               
                <div className=" flex-col mt-3">
                  <p className=" text-gray-500">Organization</p>
                  <p className=" font-semibold">{organization}</p>
                </div>
               
              </div>
              <div className=" flex justify-between items-center gap-10">
                <p className=" text-gray-500 text-sm mt-3 w-[70%]">
                  {subTitle}
                </p>
                <div>
                  <button className=" hover:bg-purpleColor hover:text-white border-2 border-purpleColor p-2 rounded-lg  ">Check Status</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
