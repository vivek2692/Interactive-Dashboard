import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./progress-bar.css";

function MultiStepProgressBar({ index }) {
  return (
    <div className="progress-bar">
      <ProgressBar
        percent={(index - 1) * 100}
        filledBackground="linear-gradient(to right, #72b2e4, #92e1e2,#72b2e4)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={`step-${accomplished ? "completed" : "incomplete"}`}
            >
              <p>1</p>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={`step-${accomplished ? "completed" : "incomplete"}`}
            >
              <p>2</p>
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
}

export default MultiStepProgressBar;
