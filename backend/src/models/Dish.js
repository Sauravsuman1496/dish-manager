const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  dishId: { type: String, required: true, unique: true, index: true },
  dishName: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Dish', DishSchema);
