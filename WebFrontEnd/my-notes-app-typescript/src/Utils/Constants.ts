const getApiURL = (): string => {
  const prod = "";
  const dev = "https://localhost:7105/api/";

  return process.env.NODE_ENV === "development" ? dev : prod;
};

export { getApiURL };
