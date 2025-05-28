import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ItemsPage({ user }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/items').then(res => setItems(res.data));
  }, []);

  const handleLike = async (id) => {
    const res = await axios.post(`http://localhost:3000/items/${id}/like`);
    setItems(items.map(i => i._id === id ? res.data : i));
  };

  const handleAddToCart = async (id) => {
    await axios.post(`http://localhost:3000/cart/${user.username}/add`, { itemId: id, quantity: 1 });
    alert('Added to cart!');
  };

  return (
    <div>
      <h2>Items</h2>
      {items.map(item => (
        <div key={item._id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
          <img src={item.image} alt={item.name} width={100} />
          <div><b>{item.name}</b></div>
          <div>{item.description}</div>
          <div>Price: ${item.price}</div>
          <div>Quantity: {item.quantity}</div>
          <button onClick={() => handleLike(item._id)}>Like</button> {item.likes}
          <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ItemsPage;