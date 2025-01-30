import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [availableStock, setAvailableStock] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken'); // Get the auth token from localStorage

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('You need to be logged in to add items');
      return;
    }

    try {
      await axios.post('https://back-nkyz.onrender.com/api/items', {
        name,
        description,
        photoURL,
        price,
        category,
        availableStock,
      }, {
        headers: { Authorization: `Bearer ${token}` }, // Attach the token
      });
      alert('Item added successfully');
      navigate('/items'); // Redirect to items page
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item');
    }
  };

  return (
    <form onSubmit={handleAddItem}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        placeholder="Photo URL"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <input
        type="number"
        value={availableStock}
        onChange={(e) => setAvailableStock(e.target.value)}
        placeholder="Available Stock"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItem;
