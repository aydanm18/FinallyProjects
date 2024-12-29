import axios from "axios";
import { BASE_URL } from "./constants";

async function getAll(endpoint, token) {
  try {
    const response = await axios.get(BASE_URL + endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true // CORS-u həll etmək üçün əlavə edildi
    });
    return response.data;
  } catch (error) {
    return error.response || error;
  }
}

async function getOne(endpoint, id, token) {
  try {
    const response = await axios.get(BASE_URL + endpoint + `/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true // CORS-u həll etmək üçün əlavə edildi
    });
    return response.data;
  } catch (error) {
    return error.response || error;
  }
}

async function deleteOne(endpoint, id, token) {
  try {
    const response = await axios.delete(BASE_URL + endpoint + `/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true // CORS-u həll etmək üçün əlavə edildi
    });
    return response;
  } catch (error) {
    return error.response || error;
  }
}

async function put(endpoint, id, payload) {
  try {
    const response = await axios.put(BASE_URL + endpoint + `/${id}`, payload, {
      withCredentials: true // CORS-u həll etmək üçün əlavə edildi
    });
    return response;
  } catch (error) {
    return error.response || error;
  }
}

async function patch(endpoint, id, payload, token) {
  try {
    const response = await axios.patch(BASE_URL + endpoint + `/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true // CORS-u həll etmək üçün əlavə edildi
    });
    return response;
  } catch (error) {
    return error.response || error;
  }
}

async function post(endpoint, payload) {
  try {
    const response = await axios.post(BASE_URL + endpoint, payload, {
      withCredentials: true // CORS-u həll etmək üçün əlavə edildi
    });
    return response.data;
  } catch (error) {
    return error.response || error;
  }
}

const controller = {
  getAll: getAll,
  getOne: getOne,
  delete: deleteOne,
  post: post,
  put: put,
  patch: patch
};

export default controller;
