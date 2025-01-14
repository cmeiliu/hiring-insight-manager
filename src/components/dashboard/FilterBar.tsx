import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { allSegments, allRoles, allLeaders, Segment, Role, Leader } from "@/lib/data";
import { DatePicker } from "@/components/ui/date-picker";
import { addMonths, startOfYear, endOfYear, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface FilterBarProps {
  segment: Segment | 'All';
  role: Role | 'All';
  leader: Leader | 'All';
  dateRange: { from: Date | undefined; to: Date | undefined };
  onSegmentChange: (value: Segment | 'All') => void;
  onRoleChange: (value: Role | 'All') => void;
  onLeaderChange: (value: Leader | 'All') => void;
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

export function FilterBar({
  segment,
  role,
  leader,
  dateRange,
  onSegmentChange,
  onRoleChange,
  onLeaderChange,
  onDateRangeChange,
}: FilterBarProps) {
  const currentYear = new Date().getFullYear();
  const defaultFrom = startOfYear(new Date(currentYear, 0));
  const defaultTo = endOfYear(new Date(currentYear, 0));

  const handleQuickDateSelect = (months: number) => {
    const today = new Date();
    const from = addMonths(today, -months);
    onDateRangeChange({ from, to: today });
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
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
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">Date Range</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickDateSelect(3)}
          >
            Last 3 Months
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickDateSelect(6)}
          >
            Last 6 Months
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickDateSelect(12)}
          >
            Last 12 Months
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateRangeChange({ from: defaultFrom, to: defaultTo })}
          >
            This Year
          </Button>
        </div>
        <div className="flex gap-2">
          <DatePicker
            date={dateRange.from}
            onChange={(date) => onDateRangeChange({ ...dateRange, from: date })}
          />
          <span className="self-center">to</span>
          <DatePicker
            date={dateRange.to}
            onChange={(date) => onDateRangeChange({ ...dateRange, to: date })}
          />
        </div>
      </div>
    </Card>
  );
}