import { useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

const backendUrl = import.meta.env.VITE_DOMAIN_URL;

interface RequestOptions {
  method: "get" | "post" | "put" | "delete" | "patch";
  body?: any;
}

export const useAuthRequest = ({ url }: { url: string }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<null | any>(null);

  const makeRequest = async (method: RequestOptions["method"], body?: any) => {
    setLoading(<LoaderCircle className="animate-spin" />);
    setError(null);
    try {
      const response = await axios({
        method,
        url:`${backendUrl}${url}`,
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    get: () => makeRequest("get"),
    post: (body: any) => makeRequest("post", body),
    put: (body: any) => makeRequest("put", body),
    delete: () => makeRequest("delete"),
  };
};
