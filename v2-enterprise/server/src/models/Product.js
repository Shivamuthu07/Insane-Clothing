import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 }
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  badge: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  isNewProduct: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  collectionId: { type: String, required: true },
  colors: [colorSchema],
  sizes: [sizeSchema],
  images: [{ type: String }],
  description: { type: String, required: true },
  fabric: { type: String },
  care: { type: String },
  fit: { type: String },
  tags: [{ type: String }]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
