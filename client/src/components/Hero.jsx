import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-extrabold">Simplify Status Management</h2>
        <p className="mt-4 text-lg">
          Monitor, manage, and showcase the operational status of your services
          in real-time.
        </p>
        <div className="mt-6 space-x-4">
          <Button href="/signup" variant="primary">
            Get Started
          </Button>
          <Button href="#features" variant="secondary">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
