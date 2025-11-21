import React, { useEffect, useState } from 'react';
import DishList from './components/DishList';
import api from './services/api';
import { initSocket } from './services/socket';

function App() {
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    async function fetchD() {
      const res = await api.get('/dishes');
      setDishes(res.data);
    }
    fetchD();

    const socket = initSocket();
    socket.on('dishUpdated', (updated) => {
      setDishes(prev => {
        const idx = prev.findIndex(d => d._id === updated._id || d.dishId === updated.dishId);
        if (idx === -1) return [updated, ...prev]; // new dish
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...updated };
        return copy;
      });
    });

    return () => {
      socket.off('dishUpdated');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Dish Manager Dashboard</h1>
        <p>Toggle published status and see real-time updates</p>
      </header>
      <main>
        <DishList dishes={dishes} setDishes={setDishes} />
      </main>
    </div>
  );
}

export default App;
