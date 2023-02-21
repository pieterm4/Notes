import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { setCredentials, useLoginMutation } from "./loginSlice";
import { toast } from "react-toastify";
import { ILoginRequest } from "./ILoginRequest";

const useLogin = (): {
  isLoading: boolean;
  handleLogin: (loginRequest: ILoginRequest) => Promise<void>;
} => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, isSuccess, isError, data }] = useLoginMutation();

  useEffect(() => {
    if (isError) {
      toast.error(data?.validationErrors);
    }
  }, [isError]);

  useEffect(() => {
    if (data === null || data === undefined) {
      return;
    }
    if (isSuccess && data.success) {
      toast.success("Login success");
    }
  }, [isSuccess]);

  async function handleLogin(loginRequest: ILoginRequest): Promise<void> {
    try {
      const result = await login(loginRequest).unwrap();
      if (result.success) {
        dispatch(setCredentials(result));
        navigate("/");
      }
    } catch (error) {
      let message = "Unknown error";
      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  }

  return { isLoading, handleLogin };
};

export default useLogin;
