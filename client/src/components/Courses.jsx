import React from "react";
import { courses } from "../utils/data";
import Cards from "./Cards";

const Courses = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      {courses &&
        courses.map(
          ({
            organization,
            certificateName,
            id,
            subtitle,
            type,
            img,
            isCompleted,
            duration,
          }) => (
            <div key={id}>
              <Cards
                title={certificateName}
                organization={organization}
                subTitle={subtitle}
                type={type}
                img={img}
                isCompleted={isCompleted}
                duration={duration}
              />
            </div>
          )
        )}
    </div>
  );
};

export default Courses;
