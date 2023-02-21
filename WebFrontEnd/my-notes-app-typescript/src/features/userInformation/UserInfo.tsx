import React from "react";
import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../authentication/login/loginSlice";

const UserInfo: FC = () => {
  const userInfo = useAppSelector((state) => selectCurrentUser(state));
  return <div>{userInfo.email}</div>;
};

export default UserInfo;
