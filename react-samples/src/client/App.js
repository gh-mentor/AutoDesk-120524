import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Counter from './Counter';
import TodoList from './TodoList';
import UserProfile from './UserProfile';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/userprofile/:userId" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;