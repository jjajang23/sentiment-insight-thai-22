
# คำแนะนำการตั้งค่าไฟล์ CSV สำหรับระบบ Cascading Filter

## ไฟล์ที่ต้องเพิ่ม

คุณต้องสร้างโฟลเดอร์ `public/data/` และเพิ่มไฟล์ CSV ดังนี้:

### 1. public/data/regions.csv
```csv
region_id,region_name
region_1,ภาค 1
region_2,ภาค 2
region_3,ภาค 3
...
region_18,ภาค 18
```

### 2. public/data/provinces.csv
```csv
province_id,province_name,region_id
province_bkk,กรุงเทพฯ,region_1
province_sp,สมุทรปราการ,region_1
province_cm,เชียงใหม่,region_2
...
```

### 3. public/data/districts.csv
```csv
district_id,district_name,province_id
district_bangkhen,บางเขน,province_bkk
district_rachawat,ราชวัตร,province_bkk
district_saphanmai,สะพานใหม่,province_bkk
district_0,0,province_bkk
...
```

### 4. public/data/branches.csv
```csv
branch_id,branch_name,district_id
branch_phaholyothin,สำนักพหลโยธิน,district_0
branch_bangkhen,บางเขน,district_bangkhen
branch_kasetsart,มหาวิทยาลัยเกษตรศาสตร์,district_bangkhen
branch_jatujak,จตุจักร,district_bangkhen
branch_phongphet,พงษ์เพชร,district_bangkhen
branch_prachachuen,ประชาชื่น,district_bangkhen
branch_taopoon,เตาปูน,district_bangkhen
branch_energy,เอนเนอร์ยี่ คอมเพล็กซ์,district_bangkhen
branch_market_wongsawang,มาร์เก็ต เพลส วงศ์สว่าง,district_bangkhen
branch_central_ladprao,เซ็นทรัล ลาดพร้าว,district_bangkhen
branch_prachanivet1,ประชานิเวศน์ 1,district_bangkhen
branch_green_plaza,กรีนพลาซ่า (วังหิน),district_bangkhen
branch_avenue_ratchayothin,อเวนิว รัชโยธิน,district_bangkhen
branch_rachawat,ราชวัตร,district_rachawat
branch_sriyan,ศรีย่าน,district_rachawat
branch_suan_chitralada,สวนจิตรลดา,district_rachawat
branch_mahanak,มหานาค,district_rachawat
branch_nangleng,นางเลิ้ง,district_rachawat
branch_government_house,ทำเนียบรัฐบาล,district_rachawat
branch_pradiphat,ถนนประดิพัทธ์,district_rachawat
branch_supreme_samsen,สุพรีม คอมเพล็กซ์ สามเสน,district_rachawat
branch_yaek_pichai,แยกพิชัย,district_rachawat
branch_saphanmai,สะพานใหม่,district_saphanmai
branch_donmueang,ดอนเมือง,district_saphanmai
branch_talad_wongsakorn,ตลาดวงศกร,district_saphanmai
branch_monument,อนุสรณ์สถานแห่งชาติ,district_saphanmai
branch_talad_yingcharoen,ตลาดยิ่งเจริญ (ย้ายที่ตั้งสำนักงาน 12-3-67),district_saphanmai
branch_songprapa,ถนนสรงประภา,district_saphanmai
branch_rajabhakti_b,ศูนย์ราชการเฉลิมพระเกียรติ แจ้งวัฒนะ (อาคาร B),district_saphanmai
branch_it_square,ไอที สแควร์,district_saphanmai
branch_consular,กรมการกงสุล,district_saphanmai
branch_bigc_jaengwattana,บิ๊กซี แจ้งวัฒนะ (ย้ายไปเปิดให้บริการพื้นที่ชั่วคราว 1-6-68),district_saphanmai
branch_rajabhakti_a,ศูนย์ราชการเฉลิมพระเกียรติ แจ้งวัฒนะ (อาคาร A),district_saphanmai
branch_wacharapol,วัชรพล,district_saphanmai
...
```

## โครงสร้างโฟลเดอร์
```
public/
  data/
    regions.csv
    provinces.csv
    districts.csv
    branches.csv
```

## การทำงานของระบบ

### Cascading Filter Logic:
1. **ภาค → จังหวัด**: เมื่อเลือกภาค ระบบจะแสดงเฉพาะจังหวัดที่อยู่ในภาคนั้น
2. **จังหวัด → เขต**: เมื่อเลือกจังหวัด ระบบจะแสดงเฉพาะเขตที่อยู่ในจังหวัดนั้น
3. **เขต → หน่วยบริการ**: เมื่อเลือกเขต ระบบจะแสดงเฉพาะหน่วยบริการที่อยู่ในเขตนั้น

### การใช้งาน UnifiedFilter:
```typescript
import { UnifiedFilter } from '@/components/filters/UnifiedFilter';

// ใช้งานแบบเต็ม (ทุก level)
<UnifiedFilter
  filters={locationFilters}
  onFiltersChange={setLocationFilters}
  title="พื้นที่ให้บริการ"
/>

// ใช้งานเฉพาะบางส่วน
<UnifiedFilter
  filters={locationFilters}
  onFiltersChange={setLocationFilters}
  options={{
    showRegion: true,
    showProvince: false,
    showDistrict: false,
    showBranch: false,
    regionLabel: "ภาค"
  }}
  title="เลือกภาค"
/>
```

## การจัดการข้อมูล

### Mock Data:
- หากไม่มีไฟล์ CSV ระบบจะใช้ Mock Data ที่ปรับปรุงแล้ว
- Mock Data จะสร้างข้อมูลตัวอย่างตามโครงสร้างของ CSV ที่คุณให้มา
- รวมถึงข้อมูลจาก กรุงเทพฯ ที่มีเขต: บางเขน, ราชวัตร, สะพานใหม่, และหน่วยบริการต่างๆ

### Error Handling:
- ระบบจะแสดงข้อความแจ้งเตือนเมื่อไม่สามารถโหลดไฟล์ CSV ได้
- มีคำแนะนำการแก้ไขปัญหาแสดงในหน้าเว็บ

## หมายเหตุ

- ตรวจสอบให้แน่ใจว่าไฟล์ CSV ใช้ encoding UTF-8 เพื่อรองรับภาษาไทย
- ชื่อคอลัมน์ในไฟล์ CSV ต้องตรงกับที่ระบุไว้
- ข้อมูล region_id, province_id, district_id, branch_id ต้องไม่ซ้ำกัน
- การเชื่อมโยงระหว่าง level ต้องถูกต้อง (เช่น province ต้องมี region_id ที่มีอยู่จริง)

## การทดสอบ

1. เพิ่มไฟล์ CSV ตามโครงสร้างด้านบน
2. รีเฟรชเพจ
3. ตรวจสอบใน Developer Console ว่ามีการโหลดไฟล์ CSV สำเร็จ
4. ทดสอบการทำงานของ Cascading Filter ในหน้าต่างๆ

## ไฟล์ที่ได้รับการอัปเดต

- `src/hooks/useLocationData.ts` - Hook สำหรับจัดการข้อมูลตำแหน่ง
- `src/components/filters/UnifiedFilter.tsx` - FilterComponent กลาง
- `src/utils/csvDataLoader.ts` - ปรับปรุงการโหลดข้อมูล CSV
- `src/types/locations.ts` - เพิ่ม types ใหม่
- `src/pages/RegionalPage.tsx` - ใช้ UnifiedFilter แทน CascadingFilter
- `src/components/GlobalFilters.tsx` - ใช้ UnifiedFilter แทน CascadingFilter
- `src/pages/FeedbackPage.tsx` - ใช้ UnifiedFilter แทน CascadingFilter

```
