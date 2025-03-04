import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
  },
});

const wPost = async (url, data) => {
  return (await request.post(url, data)).data;
};

const wGet = async (url) => {
  return (await request.get(url)).data;
};

const wDelete = async (url) => {
  return (await request.delete(url)).data;
};

const wPut = async (url, data) => {
  return (await request.put(url, data)).data;
};

export {request, wPost, wGet, wDelete, wPut};
