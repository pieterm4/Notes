import React from "react";
import { FC } from "react";
import "./Title.css";

interface ITitleProps {
  text: string;
}
export const Title: FC<ITitleProps> = ({ text }: ITitleProps) => {
  return <div className="Title">{text}</div>;
};
