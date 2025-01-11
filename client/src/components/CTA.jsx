import React from "react";
import { Button } from "./ui/button";

const CTA = () => {
  return (
    <section className="py-16 bg-gray-800 text-white text-center">
      <h2 className="text-3xl font-bold">Start Managing Your Services</h2>
      <p className="mt-4 text-lg">
        Sign up today and keep your users informed with ease.
      </p>
      <div className="mt-6">
        <Button href="/signup" variant="primary">
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default CTA;
