import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://fakestoreapi.com";

const saveCartToLocalStorage = (userId, cart) => {
  if (userId) {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }
};

const loadCartFromLocalStorage = (userId) => {
  try {
    const serializedState = localStorage.getItem(`cart_${userId}`);
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return [];
  }
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState }) => {
    const userId = Cookies.get("userId");
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const localCart = loadCartFromLocalStorage(userId);
    if (localCart.length > 0) {
      return localCart;
    }

    const response = await axios.get(`${API_BASE_URL}/carts/user/${userId}`);
    const productDetails = await Promise.all(
      response.data
        .flatMap((cart) => cart.products)
        .map(async (product) => {
          const productResponse = await axios.get(
            `${API_BASE_URL}/products/${product.productId}`
          );
          return {
            ...product,
            product: productResponse.data,
          };
        })
    );
    saveCartToLocalStorage(userId, productDetails);
    return productDetails;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { getState }) => {
    const userId = Cookies.get("userId");
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const currentCart = getState().cart.items;
    const existingItem = currentCart.find(
      (item) => item.productId === productId
    );

    let updatedCart;
    if (existingItem) {
      updatedCart = currentCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...currentCart, { productId, quantity }];
    }

    const response = await axios.put(`${API_BASE_URL}/carts/${userId}`, {
      userId: userId,
      date: new Date().toISOString(),
      products: updatedCart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    const updatedCartWithDetails = await Promise.all(
      response.data.products.map(async (product) => {
        const productResponse = await axios.get(
          `${API_BASE_URL}/products/${product.productId}`
        );
        return {
          ...product,
          product: productResponse.data,
        };
      })
    );

    saveCartToLocalStorage(userId, updatedCartWithDetails);

    return updatedCartWithDetails;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { getState }) => {
    const userId = Cookies.get("userId");
    if (!userId) {
      throw new Error("User not authenticated");
    }

    await axios.delete(`${API_BASE_URL}/products/${productId}`);

    const currentCart = getState().cart.items;
    const updatedCart = currentCart.filter(
      (item) => item.productId !== productId
    );
    saveCartToLocalStorage(userId, updatedCart);

    return updatedCart;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }, { getState }) => {
    const userId = Cookies.get("userId");
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const currentCart = getState().cart.items;
    const updatedCart = currentCart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    const response = await axios.put(`${API_BASE_URL}/carts/${userId}`, {
      userId: userId,
      date: new Date().toISOString(),
      products: updatedCart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    const updatedCartWithDetails = await Promise.all(
      response.data.products.map(async (product) => {
        const productResponse = await axios.get(
          `${API_BASE_URL}/products/${product.productId}`
        );
        return {
          ...product,
          product: productResponse.data,
        };
      })
    );

    saveCartToLocalStorage(userId, updatedCartWithDetails);

    return updatedCartWithDetails;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {
    clearCart: (state) => {
      const userId = Cookies.get("userId");
      if (userId) {
        localStorage.removeItem(`cart_${userId}`);
      }
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
        const userId = Cookies.get("userId");
        if (userId) {
          saveCartToLocalStorage(userId, state.items);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
        const userId = Cookies.get("userId");
        if (userId) {
          saveCartToLocalStorage(userId, state.items);
        }
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
