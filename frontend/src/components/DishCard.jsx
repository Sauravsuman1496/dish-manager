import React, { useState } from 'react';
import api from '../services/api';

export default function DishCard({ dish, setDishes }) {
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      // call backend by dishId first
      const id = dish.dishId || dish._id;
      const res = await api.patch(`/dishes/${id}/toggle`);
      // update local
      setDishes(prev => prev.map(p => (p._id === res.data._id || p.dishId === res.data.dishId) ? res.data : p));
    } catch (err) {
      console.error('toggle error', err);
      alert('Failed to toggle published');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`card ${dish.isPublished ? 'published' : 'unpublished'}`}>
      <img src={dish.imageUrl || 'https://picsum.photos/seed/default/400/300'} alt={dish.dishName} />
      <div className="card-body">
        <h3>{dish.dishName}</h3>
        <p>ID: {dish.dishId || dish._id}</p>
        <p>Status: <strong>{dish.isPublished ? 'Published' : 'Unpublished'}</strong></p>
        <button onClick={toggle} disabled={loading}>
          {loading ? 'Updating…' : (dish.isPublished ? 'Unpublish' : 'Publish')}
        </button>
      </div>
    </div>
  );
}
