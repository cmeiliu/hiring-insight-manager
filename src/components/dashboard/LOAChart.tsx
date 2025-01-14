import { Card } from "@/components/ui/card";
import { LOAData } from "@/lib/data";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LOAChartProps {
  data: LOAData[];
}

export function LOAChart({ data }: LOAChartProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const totalImpact = data.reduce((sum, item) => sum + item.impactPercentage, 0);
  const highestImpact = data.reduce((max, item) => item.impactPercentage > max.impactPercentage ? item : max, data[0]);

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-2">LOA Impact Analysis</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {`Total LOA impact is ${totalImpact.toFixed(1)}% across all segments. `}
        {highestImpact && `${highestImpact.segment} has the highest impact at ${highestImpact.impactPercentage.toFixed(1)}%.`}
      </p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="segment"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}