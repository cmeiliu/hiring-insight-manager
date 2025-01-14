import { addMonths, format, startOfYear } from 'date-fns';

export type Segment = 'Sales' | 'Engineering' | 'Marketing' | 'Product' | 'Support';
export type Role = 'Manager' | 'Senior' | 'Junior' | 'Lead';
export type Leader = 'John Smith' | 'Sarah Johnson' | 'Mike Chen' | 'Lisa Brown';

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

const segments: Segment[] = ['Sales', 'Engineering', 'Marketing', 'Product', 'Support'];
const roles: Role[] = ['Manager', 'Senior', 'Junior', 'Lead'];
const leaders: Leader[] = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Lisa Brown'];

export function generateHiringData(): HiringData[] {
  const startDate = startOfYear(new Date(2025, 0, 1));
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
  const startDate = startOfYear(new Date(2025, 0, 1));
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