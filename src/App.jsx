import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Items from './pages/Items';
import Cart from './pages/Cart';
import AddItem from './pages/AddItem';
import Orders from './pages/Orders'; 

function ProtectedLayout({ children }) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/items" element={
            <ProtectedLayout>
              <Items />
            </ProtectedLayout>
          } />

          <Route path="/add-item" element={
            <ProtectedLayout>
              <AddItem />
            </ProtectedLayout>
          } />

          <Route path="/cart" element={
            <ProtectedLayout>
              <Cart />
            </ProtectedLayout>
          } />

          {/* ✅ Added Orders Route */}
          <Route path="/orders" element={
            <ProtectedLayout>
              <Orders />
            </ProtectedLayout>
          } />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
