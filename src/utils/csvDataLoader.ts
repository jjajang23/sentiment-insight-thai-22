
import { LocationData } from '../types/locations';

// CSV Data Loading Instructions:
// คุณต้องเพิ่มไฟล์ CSV ในโฟลเดอร์ public/data/ ดังนี้:
// 1. public/data/regions.csv - โครงสร้าง: region_id,region_name
// 2. public/data/provinces.csv - โครงสร้าง: province_id,province_name,region_id
// 3. public/data/districts.csv - โครงสร้าง: district_id,district_name,province_id
// 4. public/data/branches.csv - โครงสร้าง: branch_id,branch_name,district_id
//
// หากไม่มีไฟล์ CSV ระบบจะใช้ Mock Data แทน

// Enhanced Mock data based on your CSV example
const generateMockLocationData = (): LocationData => {
  // Generate regions (ภาค 1-18)
  const regions = Array.from({ length: 18 }, (_, i) => ({
    id: `region_${i + 1}`,
    name: `ภาค ${i + 1}`,
  }));

  // Generate provinces with realistic distribution
  const provinces = [
    { id: 'province_bkk', name: 'กรุงเทพฯ', regionId: 'region_1' },
    { id: 'province_sp', name: 'สมุทรปราการ', regionId: 'region_1' },
    { id: 'province_cm', name: 'เชียงใหม่', regionId: 'region_2' },
    { id: 'province_cr', name: 'เชียงราย', regionId: 'region_2' },
    // Add more provinces distributed across regions
    ...Array.from({ length: 73 }, (_, i) => ({
      id: `province_${i + 5}`,
      name: `จังหวัด ${i + 5}`,
      regionId: `region_${Math.floor(i / 4) + 1}`,
    }))
  ];

  // Generate districts based on your CSV example
  const districts = [
    { id: 'district_bangkhen', name: 'บางเขน', provinceId: 'province_bkk' },
    { id: 'district_rachawat', name: 'ราชวัตร', provinceId: 'province_bkk' },
    { id: 'district_saphanmai', name: 'สะพานใหม่', provinceId: 'province_bkk' },
    { id: 'district_0', name: '0', provinceId: 'province_bkk' },
    // Add more districts
    ...Array.from({ length: 196 }, (_, i) => ({
      id: `district_${i + 5}`,
      name: `เขต ${i + 5}`,
      provinceId: `province_${Math.floor(i / 2.5) + 1}`,
    }))
  ];

  // Generate branches based on your CSV example
  const branches = [
    // Bangkok branches from your example
    { id: 'branch_phaholyothin', name: 'สำนักพหลโยธิน', districtId: 'district_0' },
    { id: 'branch_bangkhen', name: 'บางเขน', districtId: 'district_bangkhen' },
    { id: 'branch_kasetsart', name: 'มหาวิทยาลัยเกษตรศาสตร์', districtId: 'district_bangkhen' },
    { id: 'branch_jatujak', name: 'จตุจักร', districtId: 'district_bangkhen' },
    { id: 'branch_phongphet', name: 'พงษ์เพชร', districtId: 'district_bangkhen' },
    { id: 'branch_prachachuen', name: 'ประชาชื่น', districtId: 'district_bangkhen' },
    { id: 'branch_taopoon', name: 'เตาปูน', districtId: 'district_bangkhen' },
    { id: 'branch_energy', name: 'เอนเนอร์ยี่ คอมเพล็กซ์', districtId: 'district_bangkhen' },
    { id: 'branch_market_wongsawang', name: 'มาร์เก็ต เพลส วงศ์สว่าง', districtId: 'district_bangkhen' },
    { id: 'branch_central_ladprao', name: 'เซ็นทรัล ลาดพร้าว', districtId: 'district_bangkhen' },
    { id: 'branch_prachanivet1', name: 'ประชานิเวศน์ 1', districtId: 'district_bangkhen' },
    { id: 'branch_green_plaza', name: 'กรีนพลาซ่า (วังหิน)', districtId: 'district_bangkhen' },
    { id: 'branch_avenue_ratchayothin', name: 'อเวนิว รัชโยธิน', districtId: 'district_bangkhen' },
    { id: 'branch_rachawat', name: 'ราชวัตร', districtId: 'district_rachawat' },
    { id: 'branch_sriyan', name: 'ศรีย่าน', districtId: 'district_rachawat' },
    { id: 'branch_suan_chitralada', name: 'สวนจิตรลดา', districtId: 'district_rachawat' },
    { id: 'branch_mahanak', name: 'มหานาค', districtId: 'district_rachawat' },
    { id: 'branch_nangleng', name: 'นางเลิ้ง', districtId: 'district_rachawat' },
    { id: 'branch_government_house', name: 'ทำเนียบรัฐบาล', districtId: 'district_rachawat' },
    { id: 'branch_pradiphat', name: 'ถนนประดิพัทธ์', districtId: 'district_rachawat' },
    { id: 'branch_supreme_samsen', name: 'สุพรีม คอมเพล็กซ์ สามเสน', districtId: 'district_rachawat' },
    { id: 'branch_yaek_pichai', name: 'แยกพิชัย', districtId: 'district_rachawat' },
    { id: 'branch_saphanmai', name: 'สะพานใหม่', districtId: 'district_saphanmai' },
    { id: 'branch_donmueang', name: 'ดอนเมือง', districtId: 'district_saphanmai' },
    { id: 'branch_talad_wongsakorn', name: 'ตลาดวงศกร', districtId: 'district_saphanmai' },
    { id: 'branch_monument', name: 'อนุสรณ์สถานแห่งชาติ', districtId: 'district_saphanmai' },
    { id: 'branch_talad_yingcharoen', name: 'ตลาดยิ่งเจริญ (ย้ายที่ตั้งสำนักงาน 12-3-67)', districtId: 'district_saphanmai' },
    { id: 'branch_songprapa', name: 'ถนนสรงประภา', districtId: 'district_saphanmai' },
    { id: 'branch_rajabhakti_b', name: 'ศูนย์ราชการเฉลิมพระเกียรติ แจ้งวัฒนะ (อาคาร B)', districtId: 'district_saphanmai' },
    { id: 'branch_it_square', name: 'ไอที สแควร์', districtId: 'district_saphanmai' },
    { id: 'branch_consular', name: 'กรมการกงสุล', districtId: 'district_saphanmai' },
    { id: 'branch_bigc_jaengwattana', name: 'บิ๊กซี แจ้งวัฒนะ (ย้ายไปเปิดให้บริการพื้นที่ชั่วคราว 1-6-68)', districtId: 'district_saphanmai' },
    { id: 'branch_rajabhakti_a', name: 'ศูนย์ราชการเฉลิมพระเกียรติ แจ้งวัฒนะ (อาคาร A)', districtId: 'district_saphanmai' },
    { id: 'branch_wacharapol', name: 'วัชรพล', districtId: 'district_saphanmai' },
    // Add more mock branches
    ...Array.from({ length: 467 }, (_, i) => ({
      id: `branch_${i + 100}`,
      name: `หน่วยบริการ ${i + 100}`,
      districtId: `district_${Math.floor(i / 2.5) + 1}`,
    }))
  ];

  return { regions, provinces, districts, branches };
};

// Function to parse CSV file
async function parseCSV(csvText: string): Promise<any[]> {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  });
}

// Load CSV data from files
export async function loadLocationDataFromCSV(): Promise<LocationData> {
  try {
    console.log('Attempting to load CSV files from public/data/...');
    
    // Try to load CSV files
    const [regionsRes, provincesRes, districtsRes, branchesRes] = await Promise.all([
      fetch('/data/regions.csv'),
      fetch('/data/provinces.csv'), 
      fetch('/data/districts.csv'),
      fetch('/data/branches.csv'),
    ]);

    if (!regionsRes.ok || !provincesRes.ok || !districtsRes.ok || !branchesRes.ok) {
      throw new Error('One or more CSV files not found');
    }

    const [regionsCSV, provincesCSV, districtsCSV, branchesCSV] = await Promise.all([
      regionsRes.text(),
      provincesRes.text(),
      districtsRes.text(),
      branchesRes.text(),
    ]);

    const [regionsData, provincesData, districtsData, branchesData] = await Promise.all([
      parseCSV(regionsCSV),
      parseCSV(provincesCSV),
      parseCSV(districtsCSV),
      parseCSV(branchesCSV),
    ]);

    console.log('Successfully loaded CSV data');
    
    return {
      regions: regionsData.map(r => ({
        id: r.region_id,
        name: r.region_name,
      })),
      provinces: provincesData.map(p => ({
        id: p.province_id,
        name: p.province_name,
        regionId: p.region_id,
      })),
      districts: districtsData.map(d => ({
        id: d.district_id,
        name: d.district_name,
        provinceId: d.province_id,
      })),
      branches: branchesData.map(b => ({
        id: b.branch_id,
        name: b.branch_name,
        districtId: b.district_id,
      })),
    };
  } catch (error) {
    console.warn('CSV files not found or failed to load, using enhanced mock data:', error);
    console.log('To use real data, please add the following CSV files to public/data/:');
    console.log('- regions.csv (columns: region_id, region_name)');
    console.log('- provinces.csv (columns: province_id, province_name, region_id)');
    console.log('- districts.csv (columns: district_id, district_name, province_id)');
    console.log('- branches.csv (columns: branch_id, branch_name, district_id)');
    
    return generateMockLocationData();
  }
}

// Global location data cache
let locationDataCache: LocationData | null = null;

export async function getLocationData(): Promise<LocationData> {
  if (!locationDataCache) {
    locationDataCache = await loadLocationDataFromCSV();
  }
  return locationDataCache;
}

// Clear cache function (useful for development)
export function clearLocationDataCache(): void {
  locationDataCache = null;
}
