
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock performance data
const performanceData = [
  { date: "Mon", apiCalls: 3200, responseTime: 120, errorRate: 0.5 },
  { date: "Tue", apiCalls: 4500, responseTime: 130, errorRate: 0.7 },
  { date: "Wed", apiCalls: 5200, responseTime: 125, errorRate: 0.4 },
  { date: "Thu", apiCalls: 4800, responseTime: 118, errorRate: 0.6 },
  { date: "Fri", apiCalls: 6100, responseTime: 140, errorRate: 1.2 },
  { date: "Sat", apiCalls: 3700, responseTime: 110, errorRate: 0.3 },
  { date: "Sun", apiCalls: 3000, responseTime: 105, errorRate: 0.2 },
];

type MetricType = "apiCalls" | "responseTime" | "errorRate";

const metricOptions = [
  { value: "apiCalls", label: "API Calls" },
  { value: "responseTime", label: "Response Time (ms)" },
  { value: "errorRate", label: "Error Rate (%)" },
];

const PerformanceChart = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("apiCalls");

  const getMetricColor = () => {
    switch (selectedMetric) {
      case "apiCalls":
        return "#0F52BA";
      case "responseTime":
        return "#20B2AA";
      case "errorRate":
        return "#FF7F50";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">System Performance</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Metric:</span>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
            className="text-sm border-gray-300 rounded-md"
          >
            {metricOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={performanceData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.6} />
                <stop offset="95%" stopColor={getMetricColor()} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={40}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={getMetricColor()}
              fillOpacity={1}
              fill="url(#colorMetric)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
