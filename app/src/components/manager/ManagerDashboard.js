import React, { useState, useEffect } from 'react';
import { getRoutes } from '../services/RouteService';

const ManagerDashboard = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Fetch routes data when component mounts
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const routesData = await getRoutes();
      setRoutes(routesData);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <h3>Routes:</h3>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            Driver: {route.driver}, Duration: {route.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerDashboard;
