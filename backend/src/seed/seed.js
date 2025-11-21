require('dotenv').config();
const { connectDB } = require('../config/db');
const Dish = require('../models/Dish');
const path = require('path');
const fs = require('fs');

async function seed() {
  await connectDB();
  const file = path.join(__dirname, 'dishes.json');
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));

  // upsert each item
  for (const item of json) {
    await Dish.findOneAndUpdate(
      { dishId: item.dishId },
      { $set: item },
      { upsert: true, new: true }
    );
  }

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
