import React from 'react';
import DishCard from './DishCard';

export default function DishList({ dishes, setDishes }) {
  return (
    <div className="grid">
      {dishes.map(d => (
        <DishCard key={d._id || d.dishId} dish={d} setDishes={setDishes} />
      ))}
    </div>
  );
}
