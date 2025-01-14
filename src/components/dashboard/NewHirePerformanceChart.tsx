import { Card } from "@/components/ui/card";
import { NewHirePerformanceData } from "@/lib/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface NewHirePerformanceChartProps {
  data: NewHirePerformanceData[];
}

export function NewHirePerformanceChart({ data }: NewHirePerformanceChartProps) {
  const avgNewHirePPR = data.reduce((sum, item) => sum + item.pprScore, 0) / data.length;
  const avgTenuredPPR = data.reduce((sum, item) => sum + item.tenuredPprScore, 0) / data.length;
  const performanceGap = ((avgTenuredPPR - avgNewHirePPR) / avgTenuredPPR * 100).toFixed(1);

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-2">New Hire vs Tenured Performance</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {`New hires perform ${performanceGap}% below tenured employees. `}
        {`Average PPR scores: New Hires ${avgNewHirePPR.toFixed(2)} vs Tenured ${avgTenuredPPR.toFixed(2)}.`}
      </p>
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