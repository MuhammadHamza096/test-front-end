import axios from "axios";
import qs from "qs";
const URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: `${URL}`,
});

export const createUser = async (user) => {
  const response = await api.post("users", user);
  return response;
};

export const getUsers = async (search) => {
  const query = qs.stringify({
    search,
  });
  const result = await api.get(`users?${query}`);
  return result.data;
};

export const deleteUser = async (id) => {
  const result = await api.delete(`users/${id}`);
  return result.data;
};

export const updateUser = async (id, data) => {
  const result = await api.put(`users/${id}`, data);
  return result;
};
