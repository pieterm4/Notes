import React, { FC } from "react";
import { useToggle } from "../../Utils/Hooks";

type ToggableProps = React.PropsWithChildren<{
  title: string;
  show: boolean;
}>;

export const Toggable: FC<ToggableProps> = (props: ToggableProps) => {
  const [show, toggle] = useToggle(props.show);

  const handleExpand = (): void => {
    toggle();
  };
  return (
    <div className="toggable">
      <div className="toggable-header">
        <div className="left">
          <h2>{props.title}</h2>
        </div>
        <div className="right">
          <button onClick={handleExpand}>Dupa</button>
        </div>
      </div>
      <div className="toggable-content">{show ?? <p>Chuj</p>}</div>
    </div>
  );
};
