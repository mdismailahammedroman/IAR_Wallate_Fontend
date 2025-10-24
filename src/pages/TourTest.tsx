import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TourDebug } from "@/components/Tour/TourDebug";
import { useTour } from "@/hooks/useTour";
import { tourConfigs } from "@/config/tours";

export default function TourTest() {
  const { startTour } = useTour();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Tour System Test Page</h1>
        <p className="text-gray-600 mb-8">
          Test and debug the tour system functionality
        </p>
      </div>

      {/* Test Elements for Tours */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="dashboard-stats">
          <CardHeader>
            <CardTitle>Stats Cards</CardTitle>
            <CardDescription>
              These cards show important metrics and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900">Total Users</h3>
                <p className="text-2xl font-bold text-blue-600">1,234</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900">Revenue</h3>
                <p className="text-2xl font-bold text-green-600">$45,678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-chart">
          <CardHeader>
            <CardTitle>Analytics Chart</CardTitle>
            <CardDescription>
              Visual representation of your data and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="dashboard-quick-actions">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts for your workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <span className="text-lg">📊</span>
              <span>Analytics</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <span className="text-lg">👥</span>
              <span>Users</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <span className="text-lg">⚙️</span>
              <span>Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tour Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Controls</CardTitle>
          <CardDescription>
            Test different tour functionalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              onClick={() => startTour(tourConfigs.navigation)}
              variant="outline"
            >
              Test Navigation Tour
            </Button>
            <Button 
              onClick={() => startTour(tourConfigs.userDashboard)}
              variant="outline"
            >
              Test User Tour
            </Button>
            <Button 
              onClick={() => startTour(tourConfigs.adminDashboard)}
              variant="outline"
            >
              Test Admin Tour
            </Button>
            <Button 
              onClick={() => startTour(tourConfigs.userDashboard)}
              variant="outline"
            >
              Test Agent Tour
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Debug Panel */}
      <TourDebug />
    </div>
  );
}
