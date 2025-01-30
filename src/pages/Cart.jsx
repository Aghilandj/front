import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); 
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;

      try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;

        const response = await axios.get(`https://back-nkyz.onrender.com/api/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCart(response.data);
        setLoading(false); // Data fetched, no longer loading
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError('Failed to fetch cart data');
        setLoading(false); // Stop loading on error
      }
    };

    fetchCart();
  }, [token]);

  const handleRemoveItem = async (itemId) => {
    try {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
  
      const response = await axios.delete(
        `https://back-nkyz.onrender.com/api/cart/remove/${userId}/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Update cart state with the updated data from the response
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item.');
    }
  };
  
  const handleOrder = async () => {
    const confirmOrder = window.confirm('Are you sure you want to place this order?');

    if (confirmOrder) {
      try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;

        // Pass items as well
        const items = cart.items;

        await axios.post(
          'https://back-nkyz.onrender.com/api/orders',
          { userId, items }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert('Order placed successfully!');
        setCart(null); // Clear cart after ordering
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order.');
      }
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cart && cart.items && cart.items.length > 0 ? (
        <>
          <ul className="cart-items">
            {cart.items.map((item) => (
              <li key={item.itemId} className="cart-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveItem(item.itemId)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className="order-btn" onClick={handleOrder}>Order</button>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
