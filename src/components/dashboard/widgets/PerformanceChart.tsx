
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface PerformanceDataPoint {
  name: string;
  active_users?: number;
  api_requests?: number;
  response_time?: number;
  [key: string]: any;
}

interface PerformanceChartProps {
  chartData?: PerformanceDataPoint[];
}

const PerformanceChart = ({ chartData }: PerformanceChartProps) => {
  // Default data if none is provided from API
  const data = chartData || [
    { name: "Jan", active_users: 400, api_requests: 2400, response_time: 240 },
    { name: "Feb", active_users: 300, api_requests: 1398, response_time: 139 },
    { name: "Mar", active_users: 200, api_requests: 9800, response_time: 980 },
    { name: "Apr", active_users: 278, api_requests: 3908, response_time: 390 },
    { name: "May", active_users: 189, api_requests: 4800, response_time: 480 },
    { name: "Jun", active_users: 239, api_requests: 3800, response_time: 380 },
    { name: "Jul", active_users: 349, api_requests: 4300, response_time: 430 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="active_users" 
                name="Active Users" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="api_requests" 
                name="API Requests" 
                stroke="#82ca9d" 
              />
              <Line 
                type="monotone" 
                dataKey="response_time" 
                name="Response Time (ms)" 
                stroke="#ffc658" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
