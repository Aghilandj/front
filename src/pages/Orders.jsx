import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  let userId = null;

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  useEffect(() => {
    if (!userId) {
      setError("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/orders/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, token]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="order">
              <h3>Order ID: {order._id}</h3>
              <p className={`order-status status-${order.status.toLowerCase()}`}>
                {order.status}
              </p>
              <p>Total Amount: ${order.totalAmount || 'N/A'}</p>
              <h4>Items:</h4>
              <ul className="order-items">
                {order.items.map((item, index) => (
                  <li key={index} className="order-item">
                    <strong>{item.itemId?.name || 'Unknown Item'}</strong>
                    <p>{item.itemId?.description || 'No description available'}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}  

export default Orders;
