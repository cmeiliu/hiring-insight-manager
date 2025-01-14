import { Card } from "@/components/ui/card";
import { CandidatePoolData } from "@/lib/data";
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

interface CandidatePoolChartProps {
  data: CandidatePoolData[];
}

export function CandidatePoolChart({ data }: CandidatePoolChartProps) {
  const transformedData = {
    name: 'Candidate Pools',
    children: data.map(item => ({
      name: `${item.segment} - ${item.role}`,
      size: item.poolSize,
    })),
  };

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4">Candidate Pool Sizes</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={[transformedData]}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
          >
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}