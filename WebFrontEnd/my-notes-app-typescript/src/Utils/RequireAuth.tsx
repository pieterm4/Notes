import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const parseJwt = (token: string): any => {
  try {
    const base64Url = token.split(".")[1]; // token you get
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodedData = JSON.parse(
      Buffer.from(base64, "base64").toString("binary")
    );

    return decodedData;
  } catch (e) {
    return null;
  }
};

const isExpired = (expirationTimeFromToken: number): boolean => {
  return expirationTimeFromToken * 1000 < Date.now();
};

type Props = {
  logOut(): void;
  children: JSX.Element;
};

export default function RequireAuth({ logOut, children }: Props): any {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  if (token) {
    const { exp } = parseJwt(token) as { exp: number };
    if (isExpired(exp)) {
      logOut();

      navigate("/login");
      return null;
    }

    return children;
  }

  navigate("/login");
  return null;
}
