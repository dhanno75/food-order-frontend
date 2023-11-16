import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/features/CartSlice";

const pizzaLogo = "https://cdn-icons-png.flaticon.com/512/3595/3595458.png";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { cart } = useSelector((state) => state);
  // const name = localStorage.getItem("name");
  console.log(cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const routeToCart = () => {
    navigate("/cart");
  };
  return (
    <Navbar bg="dark" variants="dark">
      <Container>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={pizzaLogo}
              alt="Pizza logo"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <p style={{ color: "#fff", margin: "0px" }}>Food Order</p>
          </div>
          {isLoggedIn ? (
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100px",
              }}
            >
              <div>
                <FiShoppingCart color="#fff" onClick={routeToCart} />
                {/* {cart.cart.data.foodItems.length > 0 ? (
                  <span className="quantity-bubble">
                    {cart.cart.data.foodItems.length}
                  </span>
                ) : (
                  <></>
                )} */}
              </div>
              <FiLogOut onClick={handleLogout} color="orangered" />
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "200px",
              }}
            >
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
