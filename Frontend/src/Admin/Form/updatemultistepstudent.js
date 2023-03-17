import React from "react";
import { Steps, Step } from "react-step-builder";
import StudentUpdateForm1 from "./StudentUpdateForm1";
import StudentUpdateForm2 from "./StudentUpdateForm2";
import { config } from "./navigation";

function StudentUpdateForm() {
  return (
    <div className="mutlistep-form">
      <Steps>
        <Step component={StudentUpdateForm1} />
        <Step component={StudentUpdateForm2} />
      </Steps>
    </div>
  );
}

export default StudentUpdateForm;
