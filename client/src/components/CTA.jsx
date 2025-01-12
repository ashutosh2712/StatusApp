import React from "react";
import { Button } from "./ui/button";

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold">
          Start Managing Your Services with Confidence
        </h2>
        <p className="mt-4 text-lg text-gray-200">
          Sign up today and keep your users informed with ease. Enjoy seamless
          monitoring and management of your services.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            variant="default"
            size="lg"
            className="px-8 py-4 text-lg font-bold shadow-lg"
            onClick={() => (window.location.href = "/signup")}
          >
            Get Started
          </Button>
        </div>
        <p className="mt-6 text-sm text-gray-300">
          No credit card required. Start for free today!
        </p>
      </div>
    </section>
  );
};

export default CTA;
