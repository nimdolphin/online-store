import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://fakestoreapi.com";

export const ProductService = {
  async getAll() {
    const { data } = await axios({
      url: `${API_BASE_URL}/products`,
      method: "GET",
    });
    return data;
  },

  async getById(id) {
    const { data } = await axios({
      url: `${API_BASE_URL}/products/${id}`,
      method: "GET",
    });
    console.log(data);
    return data;
  },
};

export const addUser = async (user) => {
  const response = await axios.post(`${API_BASE_URL}/users`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to add user");
  }
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to login");
    }
    const data = response.data;
    if (data.token) {
      Cookies.set("token", data.token, { expires: 7 });
    } else {
      throw new Error("Token not found in response");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  Cookies.remove("token");
};
