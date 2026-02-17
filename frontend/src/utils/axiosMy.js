import axios from "axios";

const Helper = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "", // Default to relative path if not set (for proxy)
});

export default Helper;
