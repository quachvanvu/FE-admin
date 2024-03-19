import React from "react";
import Sidebar from "../Sidebar";
import "./Parent.css";

const ParentComponent = ({ sidebar, childComponent }) => {
  return (
    <div className="App">
      <div className="AppGlass">
        {sidebar && <Sidebar />}
        {childComponent}
      </div>
    </div>
  );
};

export default ParentComponent;
