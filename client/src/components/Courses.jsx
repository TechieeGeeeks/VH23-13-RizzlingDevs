import React from "react";
import { courses } from "../utils/data";
import Cards from "./Cards";

const Courses = () => {
  return (
    <div>
      {courses &&
        courses.map(({organization, certificateName, id}) => <div key={id}>
            <Cards title={certificateName} organization={organization}/>
            </div>)}
    </div>
  );
};

export default Courses;
