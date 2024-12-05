import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to My Web App</h2>
      <nav>
        <ul>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/todolist">Todo List</Link></li>
          <li><Link to="/userprofile/1">User Profile 1</Link></li>
          <li><Link to="/userprofile/2">User Profile 2</Link></li>
          <li><Link to="/userprofile/3">User Profile 3</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;