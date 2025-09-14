import { useState } from "react";
import { axiosInstance } from "../utils";

export function useDatabase(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (payload) => {
    setIsPending(true);
    try {
      const req = await axiosInstance.post(url, payload);
      setData((prev) =>
        Array.isArray(prev) ? [...prev, req.data] : [req.data]
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  const deletePost = async (id) => {
    setIsPending(true);
    try {
      const req = await axiosInstance.delete(`${url}/${id}`);
      setData(req.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  const getPost = async (id = "") => {
    setIsPending(true);
    try {
      const req = await axiosInstance.get(id ? `${url}/${id}` : url);
      setData(req.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { postData, deletePost, getPost, isPending, error, data };
}
