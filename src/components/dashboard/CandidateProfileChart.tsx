import { Card } from "@/components/ui/card";
import { CandidateProfileData } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CandidateProfileChartProps {
  data: CandidateProfileData[];
}

export function CandidateProfileChart({ data }: CandidateProfileChartProps) {
  const aggregatedData = data.reduce((acc: any[], curr) => {
    const existingSource = acc.find(item => item.source === curr.source);
    if (existingSource) {
      existingSource.successRate = (existingSource.successRate + curr.successRate) / 2;
      existingSource.conversionRate = (existingSource.conversionRate + curr.conversionRate) / 2;
    } else {
      acc.push({
        source: curr.source,
        successRate: curr.successRate,
        conversionRate: curr.conversionRate
      });
    }
    return acc;
  }, []);

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4">Candidate Profile Effectiveness</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={aggregatedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="source" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="successRate" fill="#8884d8" name="Success Rate" />
            <Bar dataKey="conversionRate" fill="#82ca9d" name="Conversion Rate" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}