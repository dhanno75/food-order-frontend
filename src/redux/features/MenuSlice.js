import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../globals";
import axios from "axios";

export const getMenus = createAsyncThunk("menu/getMenu", async () => {
  try {
    const { data } = await axios.get(`${API}/menu/65537e80f57219fa75f63778`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const MenuSlice = createSlice({
  name: "menus",
  initialState: {
    menus: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMenus.fulfilled, (state, { payload }) => {
      state.menus = payload.data;
    });
  },
});

export default MenuSlice.reducer;
