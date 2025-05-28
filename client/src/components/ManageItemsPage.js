import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageItemsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', description: '', price: '', quantity: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:3000/items').then(res => setItems(res.data));
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    if (!form.id || !form.name) return;
    await axios.post('http://localhost:3000/items', { ...form, price: Number(form.price), quantity: Number(form.quantity) });
    setForm({ id: '', name: '', description: '', price: '', quantity: '', image: '' });
    fetchItems();
  };

  const handleEdit = item => {
    setEditingId(item._id);
    setForm({ id: item._id, name: item.name, description: item.description, price: item.price, quantity: item.quantity, image: item.image });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:3000/items/${editingId}`, { ...form, price: Number(form.price), quantity: Number(form.quantity) });
    setEditingId(null);
    setForm({ id: '', name: '', description: '', price: '', quantity: '', image: '' });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/items/${id}`);
    fetchItems();
  };

  return (
    <div>
      <h2>Manage Items</h2>
      <div>
        <h3>{editingId ? 'Update Item' : 'Add New Item'}</h3>
        <input name="id" placeholder="ID" value={form.id} onChange={handleChange} disabled={!!editingId} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} />
        <input name="quantity" placeholder="Quantity" type="number" value={form.quantity} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        {editingId ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
        {editingId && <button onClick={() => { setEditingId(null); setForm({ id: '', name: '', description: '', price: '', quantity: '', image: '' }); }}>Cancel</button>}
      </div>
      <div>
        <h3>Items List</h3>
        {items.map(item => (
          <div key={item._id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
            <img src={item.image} alt={item.name} width={100} />
            <div><b>{item.name}</b></div>
            <div>{item.description}</div>
            <div>Price: ${item.price}</div>
            <div>Quantity: {item.quantity}</div>
            <button onClick={() => handleEdit(item)}>Update</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ManageItemsPage;