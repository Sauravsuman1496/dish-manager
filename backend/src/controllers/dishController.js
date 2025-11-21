const Dish = require('../models/Dish');

async function getAllDishes(req, res) {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 }).lean();
    res.json(dishes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dishes' });
  }
}

async function togglePublished(req, res) {
  try {
    const { id } = req.params; // id is dishId or Mongo _id? We'll support dishId
    // try using dishId first
    const dish = await Dish.findOne({ dishId: id }) || await Dish.findById(id);
    if (!dish) return res.status(404).json({ error: 'Dish not found' });

    dish.isPublished = !dish.isPublished;
    await dish.save();

    // Emit via global socket (socket module will provide)
    const { emitDishUpdated } = require('../socket');
    emitDishUpdated(dish.toObject());

    res.json(dish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle dish' });
  }
}

module.exports = { getAllDishes, togglePublished };
