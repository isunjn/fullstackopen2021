import axios from "axios";

const baseUrl = "/api/comments";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getOne = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const create = async (comment) => {
  const res = await axios.post(baseUrl, comment);
  return res.data;
};

const commentService = { getAll, getOne, create };

export default commentService;
