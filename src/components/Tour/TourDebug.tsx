import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTour } from '@/hooks/useTour';
import { hasSeenTour, resetTourStorage } from '@/config/tours';
import { tourConfigs } from '@/config/tours';

export const TourDebug = () => {
  const { startTour,  resetTour, hasSeenTour: checkHasSeenTour } = useTour();

  const tourStatuses = Object.values(tourConfigs).map(config => ({
    name: config.name,
    key: config.storageKey,
    seen: hasSeenTour(config.storageKey),
  }));

  const resetAllTours = () => {
    Object.values(tourConfigs).forEach(config => {
      resetTourStorage(config.storageKey);
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Tour Debug Panel</CardTitle>
        <CardDescription>
          Debug and manage tour states for development
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tour Status */}
        <div>
          <h3 className="font-semibold mb-2">Tour Status</h3>
          <div className="space-y-2">
            {tourStatuses.map((status) => (
              <div key={status.key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{status.name}</span>
                <Badge variant={status.seen ? "default" : "secondary"}>
                  {status.seen ? "Seen" : "Not Seen"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => startTour(tourConfigs.navigation)}
            >
              Start Navigation Tour
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => startTour(tourConfigs.userDashboard)}
            >
              Start User Tour
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => startTour(tourConfigs.adminDashboard)}
            >
              Start Admin Tour
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => startTour(tourConfigs.userDashboard)}
            >
              Start Agent Tour
            </Button>
          </div>
        </div>

        {/* Reset Actions */}
        <div>
          <h3 className="font-semibold mb-2">Reset Actions</h3>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={resetAllTours}
            >
              Reset All Tours
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => resetTour()}
            >
              Reset Current Tour
            </Button>
          </div>
        </div>

        {/* Current Tour Info */}
        <div>
          <h3 className="font-semibold mb-2">Current Tour Info</h3>
          <div className="text-sm text-gray-600">
            <p>Has seen current tour: {checkHasSeenTour() ? "Yes" : "No"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
