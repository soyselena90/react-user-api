import React from "react";
import "./CommonButton.css";

const CommonButton = ({ buttonState }) => {
   return (
      <button
         className={buttonState.classType}
         onClick={buttonState.executer}
         type={buttonState.buttonType}
      >
         {buttonState.content}
      </button>
   );
};

export default CommonButton;
