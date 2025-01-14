import { Card } from "@/components/ui/card";
import { TimeToFillData } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeToFillChartProps {
  data: TimeToFillData[];
}

export function TimeToFillChart({ data }: TimeToFillChartProps) {
  const chartData = data.reduce((acc: any[], curr) => {
    const segmentData = acc.find((item: any) => item.segment === curr.segment);
    
    if (segmentData) {
      segmentData.days = (segmentData.days + curr.days) / 2;
    } else {
      acc.push({
        segment: curr.segment,
        days: curr.days
      });
    }
    
    return acc;
  }, []);

  const averageDays = chartData.reduce((sum, item) => sum + item.days, 0) / chartData.length;
  const longestSegment = chartData.reduce((max, item) => item.days > max.days ? item : max, chartData[0]);

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-2">Average Time to Fill (Days)</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {`Overall average time to fill is ${averageDays.toFixed(1)} days. `}
        {longestSegment && `${longestSegment.segment} takes longest at ${longestSegment.days.toFixed(1)} days.`}
      </p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="segment" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="days" fill="#3b82f6" name="Days to Fill" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}