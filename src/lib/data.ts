import { addMonths, format, startOfYear } from 'date-fns';

export type Segment = 'Sales' | 'Engineering' | 'Marketing' | 'Product' | 'Support';
export type Role = 'Manager' | 'Senior' | 'Junior' | 'Lead';
export type Leader = 'John Smith' | 'Sarah Johnson' | 'Mike Chen' | 'Lisa Brown';
export type CandidateSource = 'Referral' | 'LinkedIn' | 'Job Board' | 'Agency' | 'Direct';

export interface HiringData {
  date: Date;
  segment: Segment;
  role: Role;
  leader: Leader;
  planned: number;
  actual: number;
}

export interface AttritionData {
  date: Date;
  segment: Segment;
  count: number;
  total: number;
  rate: number;
}

export interface RequisitionData {
  segment: Segment;
  role: Role;
  leader: Leader;
  open: number;
  budgeted: number;
}

export interface TimeToFillData {
  segment: Segment;
  role: Role;
  days: number;
}

export interface LOAData {
  segment: Segment;
  count: number;
  total: number;
  impactPercentage: number;
}

export interface CandidatePoolData {
  segment: Segment;
  role: Role;
  leader: Leader;
  poolSize: number;
}

export interface InterviewData {
  segment: Segment;
  role: Role;
  leader: Leader;
  count: number;
}

export interface NewHirePerformanceData {
  segment: Segment;
  role: Role;
  pprScore: number;
  payPerformance: number;
  tenuredPprScore: number;
  tenuredPayPerformance: number;
}

export interface CandidateProfileData {
  segment: Segment;
  role: Role;
  source: CandidateSource;
  successRate: number;
  conversionRate: number;
}

const segments: Segment[] = ['Sales', 'Engineering', 'Marketing', 'Product', 'Support'];
const roles: Role[] = ['Manager', 'Senior', 'Junior', 'Lead'];
const leaders: Leader[] = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Lisa Brown'];

export function generateHiringData(): HiringData[] {
  const startDate = startOfYear(new Date(2024, 0, 1));
  const data: HiringData[] = [];

  segments.forEach(segment => {
    roles.forEach(role => {
      leaders.forEach(leader => {
        for (let i = 0; i < 12; i++) {
          const planned = Math.floor(Math.random() * 10) + 1;
          const actual = Math.floor(planned * (0.7 + Math.random() * 0.6));
          
          data.push({
            date: addMonths(startDate, i),
            segment,
            role,
            leader,
            planned,
            actual
          });
        }
      });
    });
  });

  return data;
}

export function generateAttritionData(): AttritionData[] {
  const startDate = startOfYear(new Date(2024, 0, 1));
  const data: AttritionData[] = [];

  segments.forEach(segment => {
    for (let i = 0; i < 12; i++) {
      const total = Math.floor(Math.random() * 100) + 50;
      const count = Math.floor(Math.random() * 10);
      const rate = (count / total) * 100;

      data.push({
        date: addMonths(startDate, i),
        segment,
        count,
        total,
        rate
      });
    }
  });

  return data;
}

export function generateRequisitionData(): RequisitionData[] {
  const data: RequisitionData[] = [];

  segments.forEach(segment => {
    roles.forEach(role => {
      leaders.forEach(leader => {
        const budgeted = Math.floor(Math.random() * 15) + 5;
        const open = Math.floor(budgeted * (0.3 + Math.random() * 0.7));

        data.push({
          segment,
          role,
          leader,
          budgeted,
          open
        });
      });
    });
  });

  return data;
}

export function generateTimeToFillData(): TimeToFillData[] {
  const data: TimeToFillData[] = [];

  segments.forEach(segment => {
    roles.forEach(role => {
      data.push({
        segment,
        role,
        days: Math.floor(Math.random() * 60) + 30
      });
    });
  });

  return data;
}

export const allSegments = segments;
export const allRoles = roles;
export const allLeaders = leaders;

export function generateLOAData(): LOAData[] {
  return segments.map(segment => ({
    segment,
    count: Math.floor(Math.random() * 20) + 5,
    total: Math.floor(Math.random() * 100) + 50,
    impactPercentage: Math.random() * 15 + 5
  }));
}

export function generateCandidatePoolData(): CandidatePoolData[] {
  const data: CandidatePoolData[] = [];
  segments.forEach(segment => {
    roles.forEach(role => {
      leaders.forEach(leader => {
        data.push({
          segment,
          role,
          leader,
          poolSize: Math.floor(Math.random() * 50) + 10
        });
      });
    });
  });
  return data;
}

export function generateInterviewData(): InterviewData[] {
  const data: InterviewData[] = [];
  segments.forEach(segment => {
    roles.forEach(role => {
      leaders.forEach(leader => {
        data.push({
          segment,
          role,
          leader,
          count: Math.floor(Math.random() * 30) + 5
        });
      });
    });
  });
  return data;
}

export function generateNewHirePerformanceData(): NewHirePerformanceData[] {
  const data: NewHirePerformanceData[] = [];
  segments.forEach(segment => {
    roles.forEach(role => {
      data.push({
        segment,
        role,
        pprScore: Math.random() * 5,
        payPerformance: Math.random() * 120 + 80,
        tenuredPprScore: Math.random() * 5,
        tenuredPayPerformance: Math.random() * 120 + 90
      });
    });
  });
  return data;
}

export function generateCandidateProfileData(): CandidateProfileData[] {
  const sources: CandidateSource[] = ['Referral', 'LinkedIn', 'Job Board', 'Agency', 'Direct'];
  const data: CandidateProfileData[] = [];
  segments.forEach(segment => {
    roles.forEach(role => {
      sources.forEach(source => {
        data.push({
          segment,
          role,
          source,
          successRate: Math.random() * 0.6 + 0.2,
          conversionRate: Math.random() * 0.4 + 0.1
        });
      });
    });
  });
  return data;
}
