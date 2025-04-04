
import { Activity, AlertCircle, CheckCircle } from "lucide-react";

// Mock activity data
const activities = [
  {
    id: 1,
    type: "info",
    message: "System update completed successfully",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "warning",
    message: "Unusually high API usage detected from TechCorp Inc",
    time: "45 minutes ago",
  },
  {
    id: 3,
    type: "success",
    message: "New company onboarding: Acme Solutions",
    time: "2 hours ago",
  },
  {
    id: 4,
    type: "info",
    message: "Database backup completed",
    time: "5 hours ago",
  },
  {
    id: 5,
    type: "warning",
    message: "Failed login attempts from unknown IP address",
    time: "Yesterday",
  }
];

const SystemActivity = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Activity className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">System Activity</h2>
        <button className="text-sm text-hrms-blue hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start p-3 rounded-lg hover:bg-gray-50">
            <div className="mr-3">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemActivity;
