import React from "react";
import { Steps, Step } from "react-step-builder";
import SubForm1 from "./sub-form-1";
import SubForm2 from "./sub-form-2";
import { config } from "./navigation";

function Form() {
  return (
    <div className="mutlistep-form">
      <Steps>
        <Step component={SubForm1} />
        {/* {this.state.name && console.log(this.state.name)} */}
        <Step component={SubForm2} />
      </Steps>
    </div>
  );
}

export default Form;
