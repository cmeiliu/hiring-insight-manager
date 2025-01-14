import { Card } from "@/components/ui/card";
import { HiringData } from "@/lib/data";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HiringChartProps {
  data: HiringData[];
}

export function HiringChart({ data }: HiringChartProps) {
  const chartData = data.reduce((acc: any[], curr) => {
    const monthKey = format(curr.date, 'MMM yyyy');
    const existing = acc.find(item => item.month === monthKey);
    
    if (existing) {
      existing.planned += curr.planned;
      existing.actual += curr.actual;
    } else {
      acc.push({
        month: monthKey,
        planned: curr.planned,
        actual: curr.actual
      });
    }
    
    return acc;
  }, []);

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4">Hiring Plan vs Actuals</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="planned" stroke="#2563eb" name="Planned" />
            <Line type="monotone" dataKey="actual" stroke="#16a34a" name="Actual" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}