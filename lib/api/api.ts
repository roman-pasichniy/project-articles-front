import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const getCurrentUser = async () => {
  try {
    const response = await instance.get("/api/auth/current");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};
