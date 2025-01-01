import { api } from "../service/axios.config";

export const createShortUrl = async (url: string) => {
  const response = await api.post("/create", { url });
  return response.data;
};

export const signin = async (credentials: { email: string; password: string }) => {
  const response = await api.post("/auth/signin", credentials);
  return response.data;
};

export const signup = async (data: { name: string; email: string; password: string }) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};
