import React from 'react';
import Navbar from './Navbar';  // Assuming Navbar is in the same directory
import Footer from './Footer';  // Assuming Footer is in the same directory

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
