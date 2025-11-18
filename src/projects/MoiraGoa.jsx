import React from "react";
import ProjectLayout from "../layouts/ProjectLayout";
import projectsData from "../data/projectsData";

const MoiraGoa = () => {
  const data = projectsData.moiraGoa;
  return <ProjectLayout {...data} />;
};

export default MoiraGoa;
