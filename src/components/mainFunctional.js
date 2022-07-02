import React, { useState, useEffect } from "react";

import "./mainFunctional.css";
import { Generator } from "./Generator";

function MainFunctional() {
  return (
    <div className="App">
      <h1>Random Cat Nationalized Generator</h1>
      <Generator />
    </div>
  );
}

export default MainFunctional;
