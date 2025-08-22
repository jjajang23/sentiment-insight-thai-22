
import { FeedbackEntry, KPIData, ChartData, RegionData } from '@/types/dashboard';
import { getLocationData } from '@/utils/locationDataManager';

export interface SentimentItem {
  label: string;
  value: number;
  color: string;
}

// Generate mock data using location data from CSV
const generateMockDataWithLocations = async () => {
  const locationData = await getLocationData();
  
  // Generate mock feedback entries using real location data
  const mockFeedbackEntries: FeedbackEntry[] = [];
  
  // Use actual regions, provinces, districts, and branches from CSV
  for (let i = 0; i < 500; i++) {
    const randomRegion = locationData.regions[Math.floor(Math.random() * locationData.regions.length)];
    const regionProvinces = locationData.provinces.filter(p => p.regionId === randomRegion.id);
    const randomProvince = regionProvinces[Math.floor(Math.random() * regionProvinces.length)] || locationData.provinces[0];
    const provinceDistricts = locationData.districts.filter(d => d.provinceId === randomProvince.id);
    const randomDistrict = provinceDistricts[Math.floor(Math.random() * provinceDistricts.length)] || locationData.districts[0];
    const districtBranches = locationData.branches.filter(b => b.districtId === randomDistrict.id);
    const randomBranch = districtBranches[Math.floor(Math.random() * districtBranches.length)] || locationData.branches[0];

    const serviceTypes = ['การฝากเงิน/ถอนเงิน', 'การซื้อผลิตภัณฑ์', 'การชำระค่าบริการ/ค่าธรรมเนียม', 'อื่นๆ'] as const;
    
    mockFeedbackEntries.push({
      id: `feedback_${i + 1}`,
      timestamp: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toISOString(),
      date: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toLocaleDateString('th-TH'),
      branch: {
        branch: randomBranch.name,
        district: randomDistrict.name,
        region: randomRegion.name
      },
      serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
      satisfaction: {
        care: Math.floor(Math.random() * 5) + 1,
        consultation: Math.floor(Math.random() * 5) + 1,
        speed: Math.floor(Math.random() * 5) + 1,
        accuracy: Math.floor(Math.random() * 5) + 1,
        equipment: Math.floor(Math.random() * 5) + 1,
        environment: Math.floor(Math.random() * 5) + 1,
        overall: Math.floor(Math.random() * 5) + 1
      },
      comment: `ความคิดเห็นตัวอย่างที่ ${i + 1} เกี่ยวกับการบริการ`,
      sentiment: {
        staff: Math.floor(Math.random() * 3) - 1,
        service: Math.floor(Math.random() * 3) - 1,
        technology: Math.floor(Math.random() * 3) - 1,
        products: Math.floor(Math.random() * 3) - 1,
        environment: Math.floor(Math.random() * 3) - 1,
        marketConduct: Math.floor(Math.random() * 3) - 1,
        other: Math.floor(Math.random() * 3) - 1
      },
      detailedSentiment: {
        staffPoliteness: Math.floor(Math.random() * 3) - 1,
        staffCare: Math.floor(Math.random() * 3) - 1,
        staffConsultation: Math.floor(Math.random() * 3) - 1,
        staffAccuracy: Math.floor(Math.random() * 3) - 1,
        staffSpeed: Math.floor(Math.random() * 3) - 1,
        staffProfessionalism: Math.floor(Math.random() * 3) - 1,
        staffImpression: Math.floor(Math.random() * 3) - 1,
        staffSecurity: Math.floor(Math.random() * 3) - 1,
        serviceReadiness: Math.floor(Math.random() * 3) - 1,
        serviceProcess: Math.floor(Math.random() * 3) - 1,
        serviceQueue: Math.floor(Math.random() * 3) - 1,
        serviceDocuments: Math.floor(Math.random() * 3) - 1,
        techCore: Math.floor(Math.random() * 3) - 1,
        techQueue: Math.floor(Math.random() * 3) - 1,
        techATM: Math.floor(Math.random() * 3) - 1,
        techKYC: Math.floor(Math.random() * 3) - 1,
        techApp: Math.floor(Math.random() * 3) - 1,
        techBookUpdate: Math.floor(Math.random() * 3) - 1,
        techCashCounter: Math.floor(Math.random() * 3) - 1,
        productDetails: Math.floor(Math.random() * 3) - 1,
        productConditions: Math.floor(Math.random() * 3) - 1,
        productApprovalTime: Math.floor(Math.random() * 3) - 1,
        productFlexibility: Math.floor(Math.random() * 3) - 1,
        productSimplicity: Math.floor(Math.random() * 3) - 1,
        envCleanliness: Math.floor(Math.random() * 3) - 1,
        envSpace: Math.floor(Math.random() * 3) - 1,
        envTemperature: Math.floor(Math.random() * 3) - 1,
        envDesk: Math.floor(Math.random() * 3) - 1,
        envWaitingArea: Math.floor(Math.random() * 3) - 1,
        envLighting: Math.floor(Math.random() * 3) - 1,
        envSound: Math.floor(Math.random() * 3) - 1,
        envRestroom: Math.floor(Math.random() * 3) - 1,
        envParking: Math.floor(Math.random() * 3) - 1,
        envSignage: Math.floor(Math.random() * 3) - 1,
        envOtherFacilities: Math.floor(Math.random() * 3) - 1,
        conductNoDeception: Math.floor(Math.random() * 3) - 1,
        conductNoAdvantage: Math.floor(Math.random() * 3) - 1,
        conductNoForcing: Math.floor(Math.random() * 3) - 1,
        conductNoDisturbance: Math.floor(Math.random() * 3) - 1,
        otherImpression: Math.floor(Math.random() * 3) - 1
      }
    });
  }

  return mockFeedbackEntries;
};

// Initialize mock data
let mockFeedbackEntries: FeedbackEntry[] = [];

// Load mock data
generateMockDataWithLocations().then(data => {
  mockFeedbackEntries = data;
}).catch(error => {
  console.error('Failed to generate mock data with locations:', error);
  // Fallback to basic mock data if location data fails
  mockFeedbackEntries = Array.from({ length: 500 }, (_, i) => ({
    id: `feedback_${i + 1}`,
    timestamp: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toISOString(),
    date: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toLocaleDateString('th-TH'),
    branch: {
      branch: `หน่วยบริการ ${i + 1}`,
      district: `เขต ${Math.floor(i / 10) + 1}`,
      region: `ภาค ${Math.floor(i / 50) + 1}`
    },
    serviceType: ['การฝากเงิน/ถอนเงิน', 'การซื้อผลิตภัณฑ์', 'การชำระค่าบริการ/ค่าธรรมเนียม', 'อื่นๆ'][Math.floor(Math.random() * 4)] as any,
    satisfaction: {
      care: Math.floor(Math.random() * 5) + 1,
      consultation: Math.floor(Math.random() * 5) + 1,
      speed: Math.floor(Math.random() * 5) + 1,
      accuracy: Math.floor(Math.random() * 5) + 1,
      equipment: Math.floor(Math.random() * 5) + 1,
      environment: Math.floor(Math.random() * 5) + 1,
      overall: Math.floor(Math.random() * 5) + 1
    },
    comment: `ความคิดเห็นตัวอย่างที่ ${i + 1}`,
    sentiment: {
      staff: Math.floor(Math.random() * 3) - 1,
      service: Math.floor(Math.random() * 3) - 1,
      technology: Math.floor(Math.random() * 3) - 1,
      products: Math.floor(Math.random() * 3) - 1,
      environment: Math.floor(Math.random() * 3) - 1,
      marketConduct: Math.floor(Math.random() * 3) - 1,
      other: Math.floor(Math.random() * 3) - 1
    },
    detailedSentiment: {
      staffPoliteness: Math.floor(Math.random() * 3) - 1,
      staffCare: Math.floor(Math.random() * 3) - 1,
      staffConsultation: Math.floor(Math.random() * 3) - 1,
      staffAccuracy: Math.floor(Math.random() * 3) - 1,
      staffSpeed: Math.floor(Math.random() * 3) - 1,
      staffProfessionalism: Math.floor(Math.random() * 3) - 1,
      staffImpression: Math.floor(Math.random() * 3) - 1,
      staffSecurity: Math.floor(Math.random() * 3) - 1,
      serviceReadiness: Math.floor(Math.random() * 3) - 1,
      serviceProcess: Math.floor(Math.random() * 3) - 1,
      serviceQueue: Math.floor(Math.random() * 3) - 1,
      serviceDocuments: Math.floor(Math.random() * 3) - 1,
      techCore: Math.floor(Math.random() * 3) - 1,
      techQueue: Math.floor(Math.random() * 3) - 1,
      techATM: Math.floor(Math.random() * 3) - 1,
      techKYC: Math.floor(Math.random() * 3) - 1,
      techApp: Math.floor(Math.random() * 3) - 1,
      techBookUpdate: Math.floor(Math.random() * 3) - 1,
      techCashCounter: Math.floor(Math.random() * 3) - 1,
      productDetails: Math.floor(Math.random() * 3) - 1,
      productConditions: Math.floor(Math.random() * 3) - 1,
      productApprovalTime: Math.floor(Math.random() * 3) - 1,
      productFlexibility: Math.floor(Math.random() * 3) - 1,
      productSimplicity: Math.floor(Math.random() * 3) - 1,
      envCleanliness: Math.floor(Math.random() * 3) - 1,
      envSpace: Math.floor(Math.random() * 3) - 1,
      envTemperature: Math.floor(Math.random() * 3) - 1,
      envDesk: Math.floor(Math.random() * 3) - 1,
      envWaitingArea: Math.floor(Math.random() * 3) - 1,
      envLighting: Math.floor(Math.random() * 3) - 1,
      envSound: Math.floor(Math.random() * 3) - 1,
      envRestroom: Math.floor(Math.random() * 3) - 1,
      envParking: Math.floor(Math.random() * 3) - 1,
      envSignage: Math.floor(Math.random() * 3) - 1,
      envOtherFacilities: Math.floor(Math.random() * 3) - 1,
      conductNoDeception: Math.floor(Math.random() * 3) - 1,
      conductNoAdvantage: Math.floor(Math.random() * 3) - 1,
      conductNoForcing: Math.floor(Math.random() * 3) - 1,
      conductNoDisturbance: Math.floor(Math.random() * 3) - 1,
      otherImpression: Math.floor(Math.random() * 3) - 1
    }
  }));
});

// Export functions to get mock data
export const getMockFeedbackEntries = (): FeedbackEntry[] => mockFeedbackEntries;

// Export as mockFeedbackData for backward compatibility
export const mockFeedbackData = mockFeedbackEntries;

export const getMockKPIData = (): KPIData => {
  const totalFeedback = mockFeedbackEntries.length;
  const feedbackWithComments = mockFeedbackEntries.filter(entry => entry.comment.length > 10);
  const severeComplaints = mockFeedbackEntries.filter(entry => 
    Object.values(entry.sentiment).some(value => value === -1)
  );
  const contactProvided = mockFeedbackEntries.filter(() => Math.random() > 0.7);

  return {
    totalFeedback,
    feedbackWithComments: {
      count: feedbackWithComments.length,
      percentage: Math.round((feedbackWithComments.length / totalFeedback) * 100)
    },
    severeComplaints: {
      count: severeComplaints.length,
      percentage: Math.round((severeComplaints.length / totalFeedback) * 100)
    },
    contactProvided: {
      count: contactProvided.length,
      percentage: Math.round((contactProvided.length / totalFeedback) * 100)
    }
  };
};

// Export with alias for backward compatibility
export const getKPIData = getMockKPIData;

export const getMockServiceTypeData = (): ChartData[] => {
  const serviceTypes = {
    'การฝากเงิน/ถอนเงิน': 0,
    'การซื้อผลิตภัณฑ์': 0,  
    'การชำระค่าบริการ/ค่าธรรมเนียม': 0,
    'อื่นๆ': 0
  };

  mockFeedbackEntries.forEach(entry => {
    serviceTypes[entry.serviceType]++;
  });

  const total = mockFeedbackEntries.length;
  
  return Object.entries(serviceTypes).map(([name, count]) => ({
    name,
    value: Math.round((count / total) * 100)
  }));
};

// Export with alias for backward compatibility
export const getServiceTypeData = getMockServiceTypeData;

export const getMockSentimentData = (): SentimentItem[] => {
  let positive = 0, negative = 0, neutral = 0;

  mockFeedbackEntries.forEach(entry => {
    const sentimentValues = Object.values(entry.sentiment);
    const avgSentiment = sentimentValues.reduce((sum, val) => sum + val, 0) / sentimentValues.length;
    
    if (avgSentiment > 0.2) positive++;
    else if (avgSentiment < -0.2) negative++;
    else neutral++;
  });

  const total = mockFeedbackEntries.length;
  
  return [
    { label: 'เชิงบวก', value: Math.round((positive / total) * 100), color: '#10B981' },
    { label: 'เชิงลบ', value: Math.round((negative / total) * 100), color: '#EF4444' },
    { label: 'ไม่มีนัยสำคัญ', value: Math.round((neutral / total) * 100), color: '#6B7280' }
  ];
};

// Export with alias for backward compatibility
export const getSentimentDataForPie = getMockSentimentData;

export const getMockRegionalData = (): RegionData[] => {
  const regionalData: { [key: string]: { positive: number; negative: number; neutral: number; total: number } } = {};

  mockFeedbackEntries.forEach(entry => {
    const region = entry.branch.region;
    if (!regionalData[region]) {
      regionalData[region] = { positive: 0, negative: 0, neutral: 0, total: 0 };
    }

    const sentimentValues = Object.values(entry.sentiment);
    const avgSentiment = sentimentValues.reduce((sum, val) => sum + val, 0) / sentimentValues.length;
    
    if (avgSentiment > 0.2) regionalData[region].positive++;
    else if (avgSentiment < -0.2) regionalData[region].negative++;
    else regionalData[region].neutral++;
    
    regionalData[region].total++;
  });

  return Object.entries(regionalData).map(([region, data]) => ({
    region,
    score: Math.round(((data.positive - data.negative) / data.total) * 100) / 100,
    positive: data.positive,
    negative: data.negative,
    neutral: data.neutral
  }));
};

// Add missing satisfaction data functions
export const getSatisfactionData = () => {
  const satisfactionScores = mockFeedbackEntries.map(entry => ({
    overall: entry.satisfaction.overall,
    care: entry.satisfaction.care,
    consultation: entry.satisfaction.consultation,
    speed: entry.satisfaction.speed,
    accuracy: entry.satisfaction.accuracy,
    equipment: entry.satisfaction.equipment,
    environment: entry.satisfaction.environment
  }));

  return satisfactionScores;
};

export const getRegionSatisfactionData = () => {
  const regionData: { [key: string]: number[] } = {};

  mockFeedbackEntries.forEach(entry => {
    const region = entry.branch.region;
    if (!regionData[region]) {
      regionData[region] = [];
    }
    regionData[region].push(entry.satisfaction.overall);
  });

  return Object.entries(regionData).map(([region, scores]) => ({
    region,
    avgSatisfaction: scores.reduce((sum, score) => sum + score, 0) / scores.length,
    count: scores.length
  }));
};
