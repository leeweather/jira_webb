import React from "react";
import "./App.css";
import { ProjectListScreen } from "scrrens/project-list";
import { TsReactTest } from "./try-use-array";
import { LoginScreen } from "scrrens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen></ProjectListScreen> */}
      {/* <TsReactTest></TsReactTest> */}
      <LoginScreen></LoginScreen>
    </div>
  );
}

export default App;
