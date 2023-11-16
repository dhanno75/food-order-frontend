import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/features/CartSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(cart.cart.data.foodItems.length);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  return <div>Cart</div>;
};

export default Cart;
