import React from "react";
import { BiLogoMedium, BiLogoLinkedin, BiLogoTelegram } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
const SocialIcons = () => {
  return (
    <div className="flex gap-3">
      <a href="https://twitter.com/DevAbhii">
        <div className=" rounded-full border p-2 hover:bg-purpleColor hover:text-lightBlue">
          <FaXTwitter alt="twitter" className=" cursor-pointer text-sm " />
        </div>
      </a>
      <a href="https://web3jobshunt.medium.com/">
        <div className=" rounded-full border p-2 hover:bg-purpleColor hover:text-lightBlue">
          <BiLogoMedium alt="medium" className="cursor-pointer text-sm" />
        </div>
      </a>
      <a href="https://www.linkedin.com/in/abhishek-yadav-a567a3250/">
        <div className=" rounded-full border p-2 hover:bg-purpleColor hover:text-lightBlue">
          <BiLogoLinkedin
            alt="linkedin_icon"
            className=" cursor-pointer text-sm"
          />
        </div>
      </a>{" "}
      <a href="https://t.me/that_abhii">
        <div className=" rounded-full border p-2 hover:bg-purpleColor hover:text-lightBlue">
          <BiLogoTelegram alt="telegram" className=" cursor-pointer text-sm" />
        </div>
      </a>
    </div>
  );
};

export default SocialIcons;