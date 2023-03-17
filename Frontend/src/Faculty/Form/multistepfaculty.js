import React from "react";
import { Steps, Step } from "react-step-builder";
import FacultyForm1 from "./faculty-form-1";
import FacultyForm2 from "./faculty-form-2";
import { config } from "./navigation";

function FacultyForm() {
  return (
    <div className="mutlistep-form">
      <Steps>
        <Step component={FacultyForm1} />
        <Step component={FacultyForm2} />
      </Steps>
    </div>
  );
}

export default FacultyForm;
