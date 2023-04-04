import axios from "axios";
import qs from "qs";
const URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: `${URL}`,
});

export const createGame = async (game) => {
  const response = await api.post("games", game);
  return response;
};

export const getGames = async ({ searchValue, startDate, endDate }) => {
  const query = qs.stringify({
    search: searchValue,
    startDate,
    endDate,
  });

  const result = await api.get(`games?${query}`);
  return result.data;
};

export const deleteGame = async (id) => {
  const result = await api.delete(`games/${id}`);
  return result.data;
};

export const updateGame = async (id, data) => {
  const result = await api.put(`games/${id}`, data);
  return result;
};
