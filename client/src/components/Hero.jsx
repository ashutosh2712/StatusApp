import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-opacity-30 bg-gradient-to-br from-blue-900 via-transparent to-purple-900"></div>
      <div className="relative container mx-auto px-6 py-20 text-center flex flex-col items-center">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
          Simplify <span className="text-yellow-300">Status Management</span>
        </h1>
        <p className="mt-6 text-lg max-w-2xl text-gray-100">
          Monitor, manage, and showcase the operational status of your services
          in real-time. Keep your customers informed with transparency.
        </p>

        <div className="mt-8 flex space-x-4">
          <Button className="px-6 py-3 text-lg font-medium shadow-lg">
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button
            href="#features"
            variant="secondary"
            className="px-6 py-3 text-lg"
          >
            Learn More
          </Button>
        </div>

        {/* <div className="mt-12">
          <img
            src="https://picsum.photos/900/400"
            alt="Dashboard Overview"
            className="rounded-lg shadow-lg border border-gray-200"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
