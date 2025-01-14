import { Card } from "@/components/ui/card";
import { NewHirePerformanceData } from "@/lib/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface NewHirePerformanceChartProps {
  data: NewHirePerformanceData[];
}

export function NewHirePerformanceChart({ data }: NewHirePerformanceChartProps) {
  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4">New Hire vs Tenured Performance</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="segment" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pprScore" stroke="#8884d8" name="New Hire PPR" />
            <Line type="monotone" dataKey="tenuredPprScore" stroke="#82ca9d" name="Tenured PPR" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}