import axios from "axios";
import { BASE_URL } from "./constants";

async function getAll(endpoint, token) {
  try {
    const response = await axios.get(BASE_URL + endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function getOne(endpoint, id, token) {
  try {
    const response = await axios.get(BASE_URL + endpoint + `/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function deleteOne(endpoint, id,token) {
  try {
    const response = await axios.delete(BASE_URL + endpoint + `/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error;
  }
}

async function put(endpoint, id, payload) {
  try {
    const response = await axios.put(BASE_URL + endpoint + `/${id}`, payload);
    return response;
  } catch (error) {
    return error;
  }
}

async function patch(endpoint, id, payload, token) {
  try {
    const response = await axios.patch(BASE_URL + endpoint + `/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error;
  }
}

async function post(endpoint, payload) {
  try {
    const response = await axios.post(BASE_URL + endpoint, payload);
    return response.data;
  } catch (error) {
    return error;
  }
}


const controller = {
    getAll: getAll,
    getOne: getOne,
    delete: deleteOne,
    post: post,
    put: put,
    patch: patch
}

export default controller;