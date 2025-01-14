import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { allSegments, allRoles, allLeaders, Segment, Role, Leader } from "@/lib/data";

interface FilterBarProps {
  segment: Segment | 'All';
  role: Role | 'All';
  leader: Leader | 'All';
  onSegmentChange: (value: Segment | 'All') => void;
  onRoleChange: (value: Role | 'All') => void;
  onLeaderChange: (value: Leader | 'All') => void;
}

export function FilterBar({
  segment,
  role,
  leader,
  onSegmentChange,
  onRoleChange,
  onLeaderChange,
}: FilterBarProps) {
  return (
    <Card className="p-4 flex flex-wrap gap-4">
      <Select value={segment} onValueChange={(value) => onSegmentChange(value as Segment | 'All')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Segment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Segments</SelectItem>
          {allSegments.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={role} onValueChange={(value) => onRoleChange(value as Role | 'All')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Roles</SelectItem>
          {allRoles.map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={leader} onValueChange={(value) => onLeaderChange(value as Leader | 'All')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Leader" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Leaders</SelectItem>
          {allLeaders.map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Card>
  );
}