import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import JSZip from 'jszip';
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
} from './data';

const convertToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Format dates and handle special values
      if (value instanceof Date) {
        return format(value, 'yyyy-MM-dd');
      }
      return typeof value === 'string' ? `"${value}"` : value;
    });
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
};

export const downloadAllDatasets = () => {
  const datasets = [
    { name: 'hiring', data: generateHiringData() },
    { name: 'attrition', data: generateAttritionData() },
    { name: 'requisition', data: generateRequisitionData() },
    { name: 'timeToFill', data: generateTimeToFillData() },
    { name: 'loa', data: generateLOAData() },
    { name: 'candidatePool', data: generateCandidatePoolData() },
    { name: 'interview', data: generateInterviewData() },
    { name: 'newHirePerformance', data: generateNewHirePerformanceData() },
    { name: 'candidateProfile', data: generateCandidateProfileData() },
  ];

  // Create a zip file containing all CSVs
  const zip = new JSZip();
  
  datasets.forEach(({ name, data }) => {
    const csv = convertToCSV(data, name);
    zip.file(`${name}.csv`, csv);
  });

  // Generate and download the zip file
  zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
    saveAs(content, `hr-analytics-data-${format(new Date(), 'yyyy-MM-dd')}.zip`);
  });
};