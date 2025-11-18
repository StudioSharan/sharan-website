import React from "react";
import ProjectLayout from "../layouts/ProjectLayout";
import projectsData from "../data/projectsData";

const SiolimGoa = () => {
  const data = projectsData.moiraGoa;
  return <ProjectLayout {...data} />;
};

export default SiolimGoa;
