import { useState } from "react";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { HiringChart } from "@/components/dashboard/HiringChart";
import { AttritionChart } from "@/components/dashboard/AttritionChart";
import { RequisitionChart } from "@/components/dashboard/RequisitionChart";
import { TimeToFillChart } from "@/components/dashboard/TimeToFillChart";
import { LOAChart } from "@/components/dashboard/LOAChart";
import { CandidatePoolChart } from "@/components/dashboard/CandidatePoolChart";
import { InterviewChart } from "@/components/dashboard/InterviewChart";
import { NewHirePerformanceChart } from "@/components/dashboard/NewHirePerformanceChart";
import { CandidateProfileChart } from "@/components/dashboard/CandidateProfileChart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadAllDatasets } from "@/lib/exportUtils";
import {
  generateHiringData,
  generateAttritionData,
  generateRequisitionData,
  generateTimeToFillData,
  generateLOAData,
  generateCandidatePoolData,
  generateInterviewData,
  generateNewHirePerformanceData,
  generateCandidateProfileData,
  Segment,
  Role,
  Leader
} from "@/lib/data";
import { startOfYear, endOfYear, isWithinInterval } from "date-fns";

const hiringData = generateHiringData();
const attritionData = generateAttritionData();
const requisitionData = generateRequisitionData();
const timeToFillData = generateTimeToFillData();
const loaData = generateLOAData();
const candidatePoolData = generateCandidatePoolData();
const interviewData = generateInterviewData();
const newHirePerformanceData = generateNewHirePerformanceData();
const candidateProfileData = generateCandidateProfileData();

export default function Index() {
  const [segment, setSegment] = useState<Segment | 'All'>('All');
  const [role, setRole] = useState<Role | 'All'>('All');
  const [leader, setLeader] = useState<Leader | 'All'>('All');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: startOfYear(new Date()),
    to: endOfYear(new Date())
  });

  const filterData = <T extends { segment: Segment; role?: Role; leader?: Leader; date?: Date }>(data: T[]): T[] => {
    return data.filter((item) => {
      const segmentMatch = segment === 'All' || item.segment === segment;
      const roleMatch = role === 'All' || !item.role || item.role === role;
      const leaderMatch = leader === 'All' || !item.leader || item.leader === leader;
      const dateMatch = !item.date || !dateRange.from || !dateRange.to || 
        isWithinInterval(item.date, { start: dateRange.from, end: dateRange.to });
      
      return segmentMatch && roleMatch && leaderMatch && dateMatch;
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">HR Analytics Dashboard</h1>
          <Button onClick={downloadAllDatasets} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download All Data
          </Button>
        </div>

        <FilterBar
          segment={segment}
          role={role}
          leader={leader}
          dateRange={dateRange}
          onSegmentChange={setSegment}
          onRoleChange={setRole}
          onLeaderChange={setLeader}
          onDateRangeChange={setDateRange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HiringChart data={filterData(hiringData)} />
          <AttritionChart data={filterData(attritionData)} />
          <RequisitionChart data={filterData(requisitionData)} />
          <TimeToFillChart data={filterData(timeToFillData)} />
          <LOAChart data={filterData(loaData)} />
          <CandidatePoolChart data={filterData(candidatePoolData)} />
          <InterviewChart data={filterData(interviewData)} />
          <NewHirePerformanceChart data={filterData(newHirePerformanceData)} />
          <CandidateProfileChart data={filterData(candidateProfileData)} />
        </div>
      </div>
    </div>
  );
}