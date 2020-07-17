import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/notes/create">Add a note</Link>
      <Link to="/login">Login</Link>
      <Link to="/sign-up">Sign Up</Link>
    </nav>
  );
};

export default Navbar;