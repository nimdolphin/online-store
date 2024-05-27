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

  async delete(id) {
    const { data } = await axios({
      url: `${API_BASE_URL}/products/${id}`,
      method: "DELETE",
    });
    console.log(data);
    return data;
  },

  async addProduct(product) {
    const { data } = await axios({
      url: `${API_BASE_URL}/products`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
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

      const users = await fetchUsers();
      const user = users.find((user) => user.username === credentials.username);
      const userId = user ? user.id : null;

      if (userId) {
        Cookies.set("userId", userId, { expires: 7 });
      } else {
        throw new Error("User not found");
      }

      return { token: data.token, userId };
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getUserInfoByUsername = async (username) => {
  const users = await fetchUsers();
  const user = users.find((user) => user.username === username);
  return user ? user.id : null;
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
  Cookies.remove("userId");
};
