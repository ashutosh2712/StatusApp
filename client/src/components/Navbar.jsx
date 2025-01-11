import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const Navbar = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">StatusApp</h1>
        <nav className="space-x-4">
          <a href="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">
            About
          </a>
          <a href="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </a>
          <Button href="/signup">Sign Up</Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
