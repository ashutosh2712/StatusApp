import React from "react";
import { Card } from "./ui/card";

const Features = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Key Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <h3 className="text-xl font-semibold">Real-Time Updates</h3>
            <p className="mt-2 text-gray-600">
              Push live updates about service status to your users.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold">Incident Management</h3>
            <p className="mt-2 text-gray-600">
              Track and resolve incidents efficiently.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold">Public Status Page</h3>
            <p className="mt-2 text-gray-600">
              Showcase your services' current operational status.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
