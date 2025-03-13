const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
main().catch(err=>console.log(err));
async function main(){
mongoose.connect('mongodb+srv://ecom123:ecom123@products.embe1.mongodb.net/', console.log("Db running"));
}

// Define the Product Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

// Route to Add Product
app.post('/api/products', async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const newProduct = new Product({ name, price, description, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error saving product', error: err });
  }
});

// Route to Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});







