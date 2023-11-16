import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../globals";
import axios from "axios";

export const addCart = createAsyncThunk("cart/addcart", async (values) => {
  console.log(values);
  // try {
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  };

  const { data } = await axios.post(`${API}/cart`, config, values);
  console.log(data);
  return data;
  // } catch (err) {
  //   console.log(err);
  // }
});

export const getCart = createAsyncThunk("cart/getcart", async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };

    const { data } = await axios.get(`${API}/cart`, config);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      if (item._id) {
        state.items.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCart.fulfilled, (state, { payload }) => {
        state.cart = payload;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.cart = payload;
      });
  },
});

export const { addItemToCart } = CartSlice.actions;
export default CartSlice.reducer;
