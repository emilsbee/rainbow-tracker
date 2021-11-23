// External imports
import React from "react";

// Internal imports
import "./section.scss";

type SectionProps = {
  title:string,
}

const Section:React.FC<SectionProps> = ({ children, title }) => {

  return (
    <div id="category-section-section-container">
      <h5 id={"category-section-section-title"}>
        {title}
      </h5>
      {children}
    </div>
  );
};

export  default Section;
