import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Decentralized GPS-Enabled Reward System for Logistics Optimization</h1>
        {/* Navigation bar */}
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/manager">Manager Dashboard</a></li>
            <li><a href="/driver">Driver Dashboard</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Main content */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
