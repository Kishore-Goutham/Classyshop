import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(API_URL + url, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error.response?.data.message || error.message;
  }
};

export const postData = async (url, body) => {
  try {

    const { data } = await axios.post(API_URL + url, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      // withCredentials: true,
    });
    return data;
  }
   catch (error) {
    console.log(error);
    throw error.response?.data?.message || error.message;
  }
};


export const updateData = async (url, body) => {
  try {

    const { data } = await axios.put(API_URL + url, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      // withCredentials: true,
    });
    return data;
  }
   catch (error) {
    console.log(error);
    throw error.response?.data?.message || error.message;
  }
};

export const deleteData = async (url) => {
  try {

    const { data } = await axios.delete(API_URL + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      // withCredentials: true,
    });
    return data;
  }
   catch (error) {
    console.log(error);
    throw error.response?.data?.message || error.message;
  }
};
