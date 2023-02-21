import React from "react";
import { Spinner } from "../spinner/Spinner";
import "./SubmitButton.css";

interface ISubmitButtonProps {
  content: string;
  isLoading: boolean;
}

export const SubmitButton = (props: ISubmitButtonProps): JSX.Element => {
  return (
    <>
      <button type="submit" className="submitButton">
        <span className="submitButtonText">
          <Spinner isVisible={props.isLoading} />
          {props.content}
        </span>
      </button>
    </>
  );
};
