import React from "react";
import Mermaid from "react-mermaid2";

const RemarkGraph = (props) => {
  return (
    <>
      <Mermaid chart={props.graphData.value} />
    </>
  );
};

export default RemarkGraph;