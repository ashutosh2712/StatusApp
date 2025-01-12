import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DashboardHome = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="max-w-lg shadow-md">
        <CardHeader>
          <h1 className="text-4xl font-bold text-blue-600">
            Welcome to{" "}
            <span className="text-gray-800">StatusApp Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage your organizations, services, incidents, and more. Select a
            module from the sidebar to get started!
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mt-4">
            <Button
              variant="default"
              onClick={() =>
                (window.location.href = "/dashboard/organizations")
              }
            >
              Manage Organizations
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/dashboard/services")}
            >
              View Services
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between mt-6">
          <Badge variant="outline">Status Management</Badge>
          <Badge variant="secondary">Real-time Updates</Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardHome;
