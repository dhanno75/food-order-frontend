import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "../redux/features/MenuSlice";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addCart } from "../redux/features/CartSlice";
import { API } from "../globals";

const Menu = () => {
  const dispatch = useDispatch();
  const { menus } = useSelector((state) => state);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  console.log(menus.menus);
  useEffect(() => {
    dispatch(getMenus());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleCart = async (e, item) => {
    if (e && item._id) {
      // dispatch(addCart({ foodItemsID: item._id, quantity: 1 }));
      await fetch(`${API}/cart`, {
        method: "POST",
        body: JSON.stringify({ foodItemsID: item._id, quantity: 1 }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
    }
  };

  function handleDisable() {
    return menus.menus.filter((i) => i.id === menus.menus.id).length;
  }
  return (
    <div id="food-listing-container" className="container mt-3">
      <Row>
        {menus.menus.length > 0 ? (
          menus.menus.map((fi, i) => (
            <Col key={fi._id} xs={6} sm={6} md={4} lg={3}>
              <Card className="product-card">
                <Card.Img
                  variant="top"
                  src={fi.image}
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title>{fi.name}</Card.Title>
                  <Card.Text>{fi.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => handleCart(e, fi)}
                    // disabled={handleDisable() > 0 ? true : false}
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Pizza is not available today</p>
        )}
      </Row>
    </div>
  );
};

export default Menu;
