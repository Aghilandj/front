import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './Items.css';


const API_URL = 'http://localhost:3001';

function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const userId = token ? jwt_decode(token).userId : null;

  useEffect(() => {
    const fetchItems = async () => {
      if (!token) {
        setError("You need to be logged in to view items.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(`${API_URL}/api/items`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setItems(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError(error.response?.data?.message || 'Error fetching items');
      } finally {
        setLoading(false);
      }
    };
  
    fetchItems();
  }, [token]);

  const addItemToCart = async (item) => {
    if (!userId) {
      setError('Please login to add items to your cart');
      return;
    }

    try {
      const cartItem = {
        itemId: item.itemId,
        name: item.name,
        quantity: 1,
        price: item.price,
      };

      await axios.post(
        `${API_URL}/api/cart/${userId}`,
        cartItem,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setError(error.response?.data?.message || 'Error adding item to cart');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );
  return (
    <div className="items-container">
      <h1 className="items-title">Available Items</h1>
      {items.length === 0 ? (
        <p className="text-xl text-center">No items available</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.itemId} className="item-card">
              <img
                src={item.photoURL || '/api/placeholder/200/200'}
                alt={item.name}
                className="item-image"
              />
              <div className="item-content">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">${item.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addItemToCart(item)}
                  disabled={!userId}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default Items;