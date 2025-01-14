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

  const filterData = <T extends { segment: Segment; role?: Role; leader?: Leader }>(data: T[]): T[] => {
    return data.filter((item) => {
      const segmentMatch = segment === 'All' || item.segment === segment;
      const roleMatch = role === 'All' || !item.role || item.role === role;
      const leaderMatch = leader === 'All' || !item.leader || item.leader === leader;
      return segmentMatch && roleMatch && leaderMatch;
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">HR Analytics Dashboard</h1>
        </div>

        <FilterBar
          segment={segment}
          role={role}
          leader={leader}
          onSegmentChange={setSegment}
          onRoleChange={setRole}
          onLeaderChange={setLeader}
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