import React from "react";
import { useParams } from "react-router-dom";

const Order = () => {
  const params = useParams();
  return <div>Order {params.movieId}</div>;
};

export default Order;
