import React from 'react';

function ItemCard({ item, children }) {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      {children} {/* This will render the Add to Cart button here */}
    </div>
  );
}

export default ItemCard;
