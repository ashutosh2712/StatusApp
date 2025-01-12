import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">
          Key Features
        </h2>
        <p className="mt-4 text-center text-gray-600">
          Discover the powerful features that make StatusApp the ultimate tool
          for managing your services.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-600">
                Real-Time Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Push live updates about service status to your users and keep
                them informed in real-time.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-600">
                Incident Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Track and resolve incidents efficiently to maintain operational
                excellence.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-600">
                Public Status Page
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Showcase your services' current operational status with
                transparency.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
