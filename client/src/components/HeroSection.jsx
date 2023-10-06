import React from "react";
import animationData from "../img/goal.json";
import Lottie from "lottie-react";

const HeroSection = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 ">
      <div>514</div>
      <div>
        <Lottie animationData={animationData} />
      </div>
    </div>
  );
};

export default HeroSection;
