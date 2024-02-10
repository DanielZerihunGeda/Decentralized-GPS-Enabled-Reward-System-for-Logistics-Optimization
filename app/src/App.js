import React from 'react';
import Layout from './layout/Layout';
import ManagerDashboard from './components/manager/ManagerDashboard'; // Import ManagerDashboard component

const App = () => {
  return (
    <Layout>
      {/* Content for the Manager Dashboard page */}
      <ManagerDashboard />
    </Layout>
  );
};

export default App;
