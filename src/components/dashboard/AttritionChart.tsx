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
      existing.rate = (existing.rate + curr.rate) / 2;
    } else {
      acc.push({
        month: monthKey,
        rate: curr.rate
      });
    }
    
    return acc;
  }, []);

  const averageRate = chartData.reduce((sum, item) => sum + item.rate, 0) / chartData.length;
  const latestRate = chartData[chartData.length - 1]?.rate;

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-2">Attrition Rate Trends</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {`The average attrition rate is ${averageRate.toFixed(1)}%. `}
        {latestRate && `The most recent rate is ${latestRate.toFixed(1)}%, `}
        {latestRate && averageRate && latestRate > averageRate 
          ? "showing an increase from the average."
          : "showing a decrease from the average."}
      </p>
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