import { Card } from "@/components/ui/card";
import { CandidatePoolData } from "@/lib/data";
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

interface CandidatePoolChartProps {
  data: CandidatePoolData[];
}

export function CandidatePoolChart({ data }: CandidatePoolChartProps) {
  // Define colors for each segment
  const segmentColors: { [key: string]: string } = {
    'Sales': '#4CAF50',
    'Engineering': '#2196F3',
    'Marketing': '#FF9800',
    'Product': '#9C27B0',
    'Support': '#F44336'
  };

  const transformedData = {
    name: 'Candidate Pools',
    children: data.map(item => ({
      name: `${item.segment} - ${item.role}`,
      size: item.poolSize,
      segment: item.segment // Add segment for coloring
    })),
  };

  const totalCandidates = data.reduce((sum, item) => sum + item.poolSize, 0);
  const largestPool = data.reduce((max, item) => Math.max(max, item.poolSize), 0);
  const largestPoolSegment = data.find(item => item.poolSize === largestPool);

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, segment } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: segmentColors[segment] || '#8884d8',
            stroke: '#fff',
            strokeWidth: 2,
            strokeOpacity: 1,
          }}
        />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">Candidates: {data.size}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="dashboard-card">
      <h2 className="text-lg font-semibold mb-2">Candidate Pool Sizes</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {`Total of ${totalCandidates} candidates across all pools. `}
        {largestPoolSegment && `Largest pool is ${largestPoolSegment.segment} - ${largestPoolSegment.role} with ${largestPool} candidates.`}
      </p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={[transformedData]}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            content={<CustomizedContent />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}