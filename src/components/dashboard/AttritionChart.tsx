import { Card } from "@/components/ui/card";
import { AttritionData } from "@/lib/data";
import { format } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AttritionChartProps {
  data: AttritionData[];
}

export function AttritionChart({ data }: AttritionChartProps) {
  const chartData = data.reduce((acc: any[], curr) => {
    const monthKey = format(curr.date, 'MMM yyyy');
    const existing = acc.find(item => item.month === monthKey);
    
    if (existing) {
      existing.rate = (existing.rate + curr.rate) / 2; // Average rate
    } else {
      acc.push({
        month: monthKey,
        rate: curr.rate
      });
    }
    
    return acc;
  }, []);

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4">Attrition Rate Trends</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis unit="%" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="rate" fill="#3b82f6" stroke="#2563eb" name="Attrition Rate" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}