require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Example schema for categories
const CategorySchema = new mongoose.Schema({
  name: String,
  rootQuestion: mongoose.Schema.Types.Mixed // store the recursive question tree as a JS object
});
const Category = mongoose.model('Category', CategorySchema);

// Get all categories
app.get('/api/categories', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Get a single category by ID
app.get('/api/categories/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: 'Not found' });
  res.json(category);
});

// Create a new category
app.post('/api/categories', async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.json(category);
});

// Update a category
app.put('/api/categories/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
});

// Delete a category
app.delete('/api/categories/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 