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

  const totalCandidates = data.reduce((sum, item) => sum + item.poolSize, 0);
  const largestPool = data.reduce((max, item) => Math.max(max, item.poolSize), 0);
  const largestPoolSegment = data.find(item => item.poolSize === largestPool);

  const CustomizedContent = (props: any) => {
    const { root, depth, x, y, width, height, name, size } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: '#8884d8',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {width > 50 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fill: '#fff',
              fontSize: '12px',
              fontWeight: 'bold',
              pointerEvents: 'none',
            }}
          >
            <tspan x={x + width / 2} dy="-0.5em">{name}</tspan>
            <tspan x={x + width / 2} dy="1.2em">{size}</tspan>
          </text>
        )}
      </g>
    );
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
            fill="#8884d8"
            content={<CustomizedContent />}
          >
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}