
import { LocationData, Region, Province, District, Branch } from '@/types/locations';

// Single CSV data structure - all location data in one file
interface LocationCSVRow {
  region: string;
  province: string;
  district: string;
  branch: string;
}

// Generate enhanced mock data based on the CSV example you provided
const generateLocationMockData = (): LocationCSVRow[] => {
  const mockData: LocationCSVRow[] = [
    // Bangkok data from your example
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: '0', branch: 'สำนักพหลโยธิน' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'บางเขน' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'มหาวิทยาลัยเกษตรศาสตร์' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'จตุจักร' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'พงษ์เพชร' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'ประชาชื่น' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'เตาปูน' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'เอนเนอร์ยี่ คอมเพล็กซ์' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'มาร์เก็ต เพลส วงศ์สว่าง' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'เซ็นทรัล ลาดพร้าว' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'ประชานิเวศน์ 1' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'กรีนพลาซ่า (วังหิน)' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'บางเขน', branch: 'อเวนิว รัชโยธิน' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'ราชวัตร', branch: 'ราชวัตร' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'ราชวัตร', branch: 'ศรีย่าน' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'ราชวัตร', branch: 'สวนจิตรลดา' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'ราชวัตร', branch: 'มหานาค' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'ราชวัตร', branch: 'นางเลิ้ง' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'ราชวัตร', branch: 'ทำเนียบรัฐบาล' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'ราชวัตร', branch: 'ถนนประดิพัทธ์' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'ราชวัตร', branch: 'สุพรีม คอมเพล็กซ์ สามเสน' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'ราชวัตร', branch: 'แยกพิชัย' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'สะพานใหม่' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'ดอนเมือง' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'ตลาดวงศกร' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'อนุสรณ์สถานแห่งชาติ' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'ตลาดยิ่งเจริญ (ย้ายที่ตั้งสำนักงาน 12-3-67)' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'ถนนสรงประภา' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'ศูนย์ราชการเฉลิมพระเกียรติ แจ้งวัฒนะ (อาคาร B)' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'ไอที สแควร์' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'กรมการกงสุล' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'บิ๊กซี แจ้งวัฒนะ (ย้ายไปเปิดให้บริการพื้นที่ชั่วคราว 1-6-68)' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'ศูนย์ราชการเฉลิมพระเกียรติ แจ้งวัฒนะ (อาคาร A)' },
    { region: 'ภาค 1', province: 'กรุงเทพฯ', district: 'สะพานใหม่', branch: 'วัชรพล' },
    
    // Add more sample data for other regions
    { region: 'ภาค 2', province: 'เชียงใหม่', district: 'เมืองเชียงใหม่', branch: 'เชียงใหม่' },
    { region: 'ภาค 2', province: 'เชียงใหม่', district: 'เมืองเชียงใหม่', branch: 'แกดสวนแก้ว' },
    { region: 'ภาค 2', province: 'เชียงราย', district: 'เมืองเชียงราย', branch: 'เชียงราย' },
    
    // Generate additional mock data for other regions (ภาค 3-18)
    ...Array.from({ length: 200 }, (_, i) => ({
      region: `ภาค ${Math.floor(i / 12) + 3}`,
      province: `จังหวัด ${i + 4}`,
      district: `เขต ${i + 4}`,
      branch: `หน่วยบริการ ${i + 50}`
    }))
  ];

  return mockData;
};

// Function to parse CSV file
async function parseLocationCSV(csvText: string): Promise<LocationCSVRow[]> {
  const lines = csvText.trim().split('\n');
  // Skip header line, parse data lines
  return lines.slice(1).map(line => {
    const columns = line.split('\t'); // Using tab delimiter based on your example
    return {
      region: columns[0]?.trim() || '',
      province: columns[1]?.trim() || '',
      district: columns[2]?.trim() || '',
      branch: columns[3]?.trim() || ''
    };
  }).filter(row => row.region && row.province); // Filter out empty rows
}

// Load location data from single CSV file
async function loadLocationCSVData(): Promise<LocationCSVRow[]> {
  try {
    console.log('Attempting to load location data from public/data/locations.csv...');
    
    const response = await fetch('/data/locations.csv');
    if (!response.ok) {
      throw new Error('locations.csv not found');
    }

    const csvText = await response.text();
    const data = await parseLocationCSV(csvText);
    
    console.log('Successfully loaded location CSV data:', data.length, 'rows');
    return data;
    
  } catch (error) {
    console.warn('CSV file not found or failed to load, using mock data:', error);
    console.log('To use real data, please add locations.csv to public/data/ with columns: ภาค, จังหวัด, เขต, หน่วยให้บริการ');
    
    return generateLocationMockData();
  }
}

// Transform CSV data into structured location data
function transformToLocationData(csvData: LocationCSVRow[]): LocationData {
  // Extract unique regions
  const uniqueRegions = [...new Set(csvData.map(row => row.region))];
  const regions: Region[] = uniqueRegions.map((regionName, index) => ({
    id: `region_${index + 1}`,
    name: regionName
  }));

  // Extract unique provinces with region relationships
  const uniqueProvinces = [...new Set(csvData.map(row => `${row.region}|${row.province}`))];
  const provinces: Province[] = uniqueProvinces.map((combo, index) => {
    const [regionName, provinceName] = combo.split('|');
    const region = regions.find(r => r.name === regionName);
    return {
      id: `province_${index + 1}`,
      name: provinceName,
      regionId: region?.id || 'region_1'
    };
  });

  // Extract unique districts with province relationships
  const uniqueDistricts = [...new Set(csvData.map(row => `${row.province}|${row.district}`))];
  const districts: District[] = uniqueDistricts.map((combo, index) => {
    const [provinceName, districtName] = combo.split('|');
    const province = provinces.find(p => p.name === provinceName);
    return {
      id: `district_${index + 1}`,
      name: districtName,
      provinceId: province?.id || 'province_1'
    };
  });

  // Extract branches with district relationships
  const branches: Branch[] = csvData.map((row, index) => {
    const district = districts.find(d => d.name === row.district);
    return {
      id: `branch_${index + 1}`,
      name: row.branch,
      districtId: district?.id || 'district_1'
    };
  });

  return { regions, provinces, districts, branches };
}

// Global variables for easy access
let locationDataCache: LocationData | null = null;
let regionsData: Region[] = [];
let provincesData: Province[] = [];
let districtsData: District[] = [];
let branchesData: Branch[] = [];

// Initialize and cache location data
export async function initializeLocationData(): Promise<LocationData> {
  if (!locationDataCache) {
    const csvData = await loadLocationCSVData();
    locationDataCache = transformToLocationData(csvData);
    
    // Set global variables for easy access
    regionsData = locationDataCache.regions;
    provincesData = locationDataCache.provinces;
    districtsData = locationDataCache.districts;
    branchesData = locationDataCache.branches;
    
    console.log('Location data initialized:', {
      regions: regionsData.length,
      provinces: provincesData.length,
      districts: districtsData.length,
      branches: branchesData.length
    });
  }
  
  return locationDataCache;
}

// Easy access variables - these will be populated after initializeLocationData() is called
export const getRegions = (): Region[] => regionsData;
export const getProvinces = (): Province[] => provincesData;
export const getDistricts = (): District[] => districtsData;
export const getBranches = (): Branch[] => branchesData;

// Get full location data
export const getLocationData = async (): Promise<LocationData> => {
  return await initializeLocationData();
};

// Clear cache function (useful for development)
export function clearLocationDataCache(): void {
  locationDataCache = null;
  regionsData = [];
  provincesData = [];
  districtsData = [];
  branchesData = [];
}
