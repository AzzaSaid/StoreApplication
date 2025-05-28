import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { connect, model, Schema } from 'mongoose';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Add basic route to test server
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

connect('mongodb+srv://admin:CSSE3101@storecluster.odvlhos.mongodb.net/StoreDB?retryWrites=true&w=majority&appName=StoreCluster')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas
const PostSchema = new Schema({
  email: String,
  username: String,
  comment: String,
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
const ItemSchema = new Schema({
  image: String,
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  likes: { type: Number, default: 0 }
});
const CartSchema = new Schema({
  username: String,
  items: [{ itemId: Schema.Types.ObjectId, quantity: Number }]
});

const Post = model('Post', PostSchema, 'posts');
const Item = model('Item', ItemSchema, 'items');
const Cart = model('Cart', CartSchema, 'cart');

// Posts
app.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});
app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});
app.post('/posts/:id/like', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  res.json(post);
});

// Items
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});
app.post('/items/:id/like', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  res.json(item);
});

// Cart
app.get('/cart/:username', async (req, res) => {
  let cart = await Cart.findOne({ username: req.params.username });
  if (!cart) cart = await Cart.create({ username: req.params.username, items: [] });
  res.json(cart);
});
app.post('/cart/:username/add', async (req, res) => {
  const { itemId, quantity } = req.body;
  let cart = await Cart.findOne({ username: req.params.username });
  if (!cart) cart = await Cart.create({ username: req.params.username, items: [] });
  const itemIndex = cart.items.findIndex(i => i.itemId.equals(itemId));
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ itemId, quantity });
  }
  await cart.save();
  res.json(cart);
});
app.post('/cart/:username/delete', async (req, res) => {
  const { itemId } = req.body;
  let cart = await Cart.findOne({ username: req.params.username });
  cart.items = cart.items.filter(i => !i.itemId.equals(itemId));
  await cart.save();
  res.json(cart);
});


// --- Admin: Add Item ---
app.post('/items', async (req, res) => {
  const { id, name, description, price, quantity, image } = req.body;
  const item = new Item({ _id: id, name, description, price, quantity, image, likes: 0 });
  await item.save();
  res.json(item);
});

// --- Admin: Update Item ---
app.put('/items/:id', async (req, res) => {
  const { name, description, price, quantity, image } = req.body;
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { name, description, price, quantity, image },
    { new: true }
  );
  res.json(item);
});

// --- Admin: Delete Item ---
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- Admin: Login ---
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Add your authentication logic here
  if (username === 'admin' && password === 'password') {
      res.status(200).json({ message: 'Login successful' });
  } else {
      res.status(401).json({ message: 'Invalid credentials' });
  }
});
app.listen(3000, () => console.log('Server running on port 3000'));