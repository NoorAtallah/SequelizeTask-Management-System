import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Task Management System</h1>
      <Link to="/signup">Sign Up</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
