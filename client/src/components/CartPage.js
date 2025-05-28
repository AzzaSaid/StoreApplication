import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartPage({ user }) {
  const [cart, setCart] = useState({ items: [] });
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/cart/${user.username}`).then(res => setCart(res.data));
    axios.get('http://localhost:3000/items').then(res => setItems(res.data));
  }, [user.username]);

  const handleDelete = async (itemId) => {
    await axios.post(`http://localhost:3000/cart/${user.username}/delete`, { itemId });
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(i => i.itemId !== itemId)
    }));
  };

  const getItem = (id) => items.find(i => i._id === id);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.map(ci => {
        const item = getItem(ci.itemId);
        if (!item) return null;
        return (
          <div key={ci.itemId} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
            <img src={item.image} alt={item.name} width={100} />
            <div><b>{item.name}</b></div>
            <div>{item.description}</div>
            <div>Price: ${item.price}</div>
            <div>Quantity: {ci.quantity}</div>
            <button onClick={() => handleDelete(ci.itemId)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default CartPage;