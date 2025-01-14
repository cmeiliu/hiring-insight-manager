import { Card } from "@/components/ui/card";
import { InterviewData } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InterviewChartProps {
  data: InterviewData[];
}

export function InterviewChart({ data }: InterviewChartProps) {
  const aggregatedData = data.reduce((acc: any[], curr) => {
    const existingSegment = acc.find(item => item.segment === curr.segment);
    if (existingSegment) {
      existingSegment.count += curr.count;
    } else {
      acc.push({ segment: curr.segment, count: curr.count });
    }
    return acc;
  }, []);

  const totalInterviews = aggregatedData.reduce((sum, item) => sum + item.count, 0);
  const highestSegment = aggregatedData.reduce((max, item) => item.count > max.count ? item : max, aggregatedData[0]);

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-2">Interview Counts by Segment</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {`Total of ${totalInterviews} interviews conducted. `}
        {highestSegment && `${highestSegment.segment} had the most interviews with ${highestSegment.count}.`}
      </p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={aggregatedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="segment" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" name="Interviews" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}