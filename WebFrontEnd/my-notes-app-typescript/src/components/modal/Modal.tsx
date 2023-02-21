import React, { FC } from "react";
import "./Modal.css";

type ModalProps = React.PropsWithChildren<{
  title: string;
  show: boolean;
  submitText?: string;
  submit: () => void;
  cancelText?: string;
  close: () => void;
}>;

export const Modal: FC<ModalProps> = (props: ModalProps) => {
  return (
    <div className={`modal ${props.show ? "show" : ""}`}>
      <div className="modalContent">
        <div className="modalHeader">
          <h4 className="modalTitle">{props.title}</h4>
        </div>
        <div className="modalBody">{props.children}</div>
        <div className="modalFooter">
          {props.submit != null ? (
            <button
              className="modal-button modal-submit-button"
              onClick={() => props.submit()}
            >
              {props.submitText}
            </button>
          ) : null}
          <button
            className="modal-button modal-cancel-button"
            onClick={() => props.close()}
          >
            {props.cancelText !== null ? props.cancelText : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
