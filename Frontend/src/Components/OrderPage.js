import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://tara-s-recipe-haven-backend.vercel.app/api/cart/orders/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          console.error("Failed to fetch orders:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="order-page">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Dish Name</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              order.items.map((item) => (
                <tr key={item.dish_id}>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.image_url} alt={item.name} style={{ width: '100px', height: 'auto' }} />
                  </td>
                  <td>{item.quantity || 0}</td>
                  <td>Rs.100</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found</p>
      )}
      <div className="button-container">
        <button onClick={() => navigate("/app")} className="nav-button">
          Back to Recipes
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
