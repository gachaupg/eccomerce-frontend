import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";

const SingleTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setTours] = useState([]);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/find/${id}`
        );

        // res.data.sort(compare)
        // const result = res.data.filter((_, index) => index < 1);
        setTours(res.data);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const { id } = useParams();
  return (
    <div
      style={{
        padding: "1rem",
        gap: "2.7rem",
        flexDirection: "row",
        flexWrap: "wrap",
        display: "flex",
        alinItems: "center",
        justifyContent: "center",
        width:'100%'
      }}
    >
      <Card border="orange" style={{ width: "18rem" }}>
        <Card.Header>{users.name}</Card.Header>
        <Card.Body>
          <img style={{ width: "100%" }} src={users.image?.url} alt="" />
          <Card.Text>
            {" "}
            <span>price</span> ${users.price}
          </Card.Text>
          <Card.Text>
            {" "}
            <span>phone</span> {users.No}
          </Card.Text>
          <Card.Text>
            {" "}
            <span>Category</span> {users.brand}
          </Card.Text>
        </Card.Body>
        <button
          style={{
            background: "blue",
            borderRadius: "2px",
            border: "none",
            color: "white",
          }}
          onClick={() => handleAddToCart(users)}
        >
          Buy the Item
        </button>
      </Card>
      <Card border="orange" style={{ width: "70%" }}>
        <Card.Header>Features</Card.Header>
        <Card.Body>
          <Card.Text style={{ display: "flex", gap: "5.5rem" }}>
            <span>specification one:</span> <span>{users.ram}</span>
          </Card.Text>
          <Card.Text style={{ display: "flex", gap: "5.5rem" }}>
            <span>Specification two:</span> {users.rom}
          </Card.Text>
          <Card.Text style={{ display: "flex", gap: "5rem" }}>
            <span>Specification three</span> {users.battery}
          </Card.Text>
          <Card.Text style={{ display: "flex", gap: "5rem" }}>
            <span>Specification four:</span> {users.camera}
          </Card.Text>
          <Card.Text style={{ display: "flex", gap: "5rem" }}>
            {" "}
            <span>Specification five</span> {users.os}
          </Card.Text>
          <Card.Text style={{ display: "flex", gap: "6rem" }}>
            {" "}
            <span></span> {users.sim}
          </Card.Text>
          <p>Description</p>
          <Card.Text>{users.desc}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleTour;
