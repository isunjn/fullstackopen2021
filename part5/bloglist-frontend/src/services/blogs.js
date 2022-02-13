import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = ` bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config);
  return res.data;
};

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const blogService = {
  getAll,
  create,
  update,
  deleteOne,
  setToken,
};

export default blogService;
