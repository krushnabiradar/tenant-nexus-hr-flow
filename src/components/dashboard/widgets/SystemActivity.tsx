
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string | number;
  type: string;
  message: string;
  timestamp: string;
}

interface SystemActivityProps {
  activityData?: Activity[];
}

const SystemActivity = ({ activityData }: SystemActivityProps) => {
  // Default activities if none are provided
  const activities = activityData || [
    { id: 1, type: "login", message: "New admin login from 192.168.1.1", timestamp: "2 minutes ago" },
    { id: 2, type: "api", message: "API rate limit reached for tenant ABC Corp", timestamp: "15 minutes ago" },
    { id: 3, type: "system", message: "Database backup completed successfully", timestamp: "2 hours ago" },
    { id: 4, type: "security", message: "Failed login attempt for user admin@example.com", timestamp: "3 hours ago" },
    { id: 5, type: "tenant", message: "New tenant provisioned: XYZ Industries", timestamp: "5 hours ago" },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case "login":
        return "bg-blue-100 border-blue-300";
      case "api":
        return "bg-yellow-100 border-yellow-300";
      case "system":
        return "bg-green-100 border-green-300";
      case "security":
        return "bg-red-100 border-red-300";
      case "tenant":
        return "bg-purple-100 border-purple-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`p-3 rounded-md border-l-4 ${getActivityColor(activity.type)}`}
            >
              <p className="text-sm font-medium">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemActivity;
