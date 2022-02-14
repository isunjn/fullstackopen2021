import axios from "axios";

const login = async (credentials) => {
  const res = await axios.post("/api/login", credentials);
  return res.data;
};

const loginService = { login };

export default loginService;
