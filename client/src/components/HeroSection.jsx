import React from "react";
import Lottie from "lottie-react";
import hero from "../img/hero.json";

const HeroSection = () => {
  return (
    <div className=" grid md:grid-cols-2 grid-cols-1 items-center mt-12 md:mt-0">
      <div className=" flex flex-col gap-6 pb-14 md:text-left text-center">
        <p className=" md:text-[3rem] text-[2.5rem] font-medium leading-tight">
        GET YOUR SECURED AND VERIFIED{" "}
          <span className=" text-purpleColor ">CERTIFICATES</span>
        </p>
        <p className=" text-gray-400">
        Linking Blocks provides a seamless and secure certificate management solution, ensuring that your credentials are easily accessible, tamper-proof, and instantly verifiable.
        </p>
        {/* <div>
          <a href="#">
            <CustomButton
              text={"Find Job"}
              bgColor={"lightBlue"}
              textColor={"white"}
            />
          </a>

          <a href="#">
            <CustomButton text={"Post Job"} hoverColor={"lightBlue"} />
          </a>
        </div> */}
      </div>
      <div className="pb-14 ">
        <Lottie
          animationData={hero}
          className="border md:border-none bg-white md:bg-transparent rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;