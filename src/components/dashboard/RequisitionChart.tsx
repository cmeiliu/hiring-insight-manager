import { Card } from "@/components/ui/card";
import { RequisitionData } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RequisitionChartProps {
  data: RequisitionData[];
}

export function RequisitionChart({ data }: RequisitionChartProps) {
  const chartData = data.reduce((acc: any[], curr) => {
    const segmentData = acc.find((item: any) => item.segment === curr.segment);
    
    if (segmentData) {
      segmentData.open += curr.open;
      segmentData.budgeted += curr.budgeted;
    } else {
      acc.push({
        segment: curr.segment,
        open: curr.open,
        budgeted: curr.budgeted
      });
    }
    
    return acc;
  }, []);

  const totalOpen = chartData.reduce((sum, item) => sum + item.open, 0);
  const totalBudgeted = chartData.reduce((sum, item) => sum + item.budgeted, 0);
  const fillRate = totalBudgeted > 0 ? ((totalBudgeted - totalOpen) / totalBudgeted * 100).toFixed(1) : 0;

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-2">Open vs Budgeted Requisitions</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {`${fillRate}% of budgeted positions are filled. `}
        {`${totalOpen} positions remain open out of ${totalBudgeted} budgeted roles.`}
      </p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="segment" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budgeted" fill="#3b82f6" name="Budgeted" />
            <Bar dataKey="open" fill="#16a34a" name="Open" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}