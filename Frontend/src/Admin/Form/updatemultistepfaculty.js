import React from "react";
import { Steps, Step } from "react-step-builder";
import FacultyUpdateForm1 from "./FacultyUpdateForm1";
import FacultyUpdateForm2 from "./FacultyUpdateForm2";
import { config } from "./navigation";

function FacultyUpdateForm() {
  return (
    <div className="mutlistep-form">
      <Steps>
        <Step component={FacultyUpdateForm1} />
        <Step component={FacultyUpdateForm2} />
      </Steps>
    </div>
  );
}

export default FacultyUpdateForm;
