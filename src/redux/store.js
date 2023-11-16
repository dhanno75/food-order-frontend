import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/UserSlice";
import MenuSlice from "./features/MenuSlice";
import CartSlice from "./features/CartSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
    menus: MenuSlice,
    cart: CartSlice,
  },
});
