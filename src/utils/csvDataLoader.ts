
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

    { id: 'province_bkk', name: 'กรุงเทพฯ', regionId: 'region_2' },

    { id: 'province_bkk', name: 'กรุงเทพฯ', regionId: 'region_3' },

    { id: 'province_pr', name: 'ประจวบคีรีขันธ์', regionId: 'region_4' },
    { id: 'province_rb', name: 'ราชบุรี', regionId: 'region_4' },
    { id: 'province_ssk', name: 'สมุทรสงคราม', regionId: 'region_4' },
    { id: 'province_ssk', name: 'สมุทรสาคร', regionId: 'region_4' },
    { id: 'province_pb', name: 'เพชรบุรี', regionId: 'region_4' },

    { id: 'province_kj', name: 'กาญจนบุรี', regionId: 'region_5' },
    { id: 'province_np', name: 'นครปฐม', regionId: 'region_5' },
    { id: 'province_nb', name: 'นนทบุรี', regionId: 'region_5' },
    { id: 'province_spn', name: 'สุพรรณบุรี', regionId: 'region_5' },

    { id: 'province_cn', name: 'ชัยนาท', regionId: 'region_6' },
    { id: 'province_nsw', name: 'นครสวรรค์', regionId: 'region_6' },
    { id: 'province_pc', name: 'พิจิตร', regionId: 'region_6' },
    { id: 'province_lb', name: 'ลพบุรี', regionId: 'region_6' },
    { id: 'province_ut', name: 'อุทัยธานี', regionId: 'region_6' },
    { id: 'province_pb2', name: 'เพชรบูรณ์', regionId: 'region_6' },

    { id: 'province_kp', name: 'กำแพงเพชร', regionId: 'region_7' },
    { id: 'province_tk', name: 'ตาก', regionId: 'region_7' },
    { id: 'province_pn', name: 'พิษณุโลก', regionId: 'region_7' },
    { id: 'province_skt', name: 'สุโขทัย', regionId: 'region_7' },
    { id: 'province_udt', name: 'อุตรดิตถ์', regionId: 'region_7' },

    { id: 'province_lp', name: 'ลำพูน', regionId: 'region_8' },
    { id: 'province_cm', name: 'เชียงใหม่', regionId: 'region_8' },
    { id: 'province_mhs', name: 'แม่ฮ่องสอน', regionId: 'region_8' },

    { id: 'province_nn', name: 'น่าน', regionId: 'region_9' },
    { id: 'province_py', name: 'พะเยา', regionId: 'region_9' },
    { id: 'province_lp2', name: 'ลำปาง', regionId: 'region_9' },
    { id: 'province_cr', name: 'เชียงราย', regionId: 'region_9' },
    { id: 'province_pr2', name: 'แพร่', regionId: 'region_9' },

    { id: 'province_bkk', name: 'กรุงเทพฯ', regionId: 'region_10' },
    { id: 'province_npm', name: 'นครพนม', regionId: 'region_10' },
    { id: 'province_bk', name: 'บึงกาฬ', regionId: 'region_10' },
    { id: 'province_skn', name: 'สกลนคร', regionId: 'region_10' },
    { id: 'province_nk', name: 'หนองคาย', regionId: 'region_10' },
    { id: 'province_nbl', name: 'หนองบัวลำภู', regionId: 'region_10' },
    { id: 'province_ud', name: 'อุดรธานี', regionId: 'region_10' },
    { id: 'province_ly', name: 'เลย', regionId: 'region_10' },

    { id: 'province_ks', name: 'กาฬสินธุ์', regionId: 'region_11' },
    { id: 'province_kk', name: 'ขอนแก่น', regionId: 'region_11' },
    { id: 'province_cp', name: 'ชัยภูมิ', regionId: 'region_11' },
    { id: 'province_ms', name: 'มหาสารคาม', regionId: 'region_11' },
    { id: 'province_mk', name: 'มุกดาหาร', regionId: 'region_11' },
    { id: 'province_re', name: 'ร้อยเอ็ด', regionId: 'region_11' },

    { id: 'province_br', name: 'บุรีรัมย์', regionId: 'region_12' },
    { id: 'province_ys', name: 'ยโสธร', regionId: 'region_12' },
    { id: 'province_ss', name: 'ศรีสะเกษ', regionId: 'region_12' },
    { id: 'province_sn', name: 'สุรินทร์', regionId: 'region_12' },
    { id: 'province_ac', name: 'อำนาจเจริญ', regionId: 'region_12' },
    { id: 'province_ub', name: 'อุบลราชธานี', regionId: 'region_12' },

    { id: 'province_ny', name: 'นครนายก', regionId: 'region_13' },
    { id: 'province_nrm', name: 'นครราชสีมา', regionId: 'region_13' },
    { id: 'province_prc', name: 'ปราจีนบุรี', regionId: 'region_13' },
    { id: 'province_sk', name: 'สระแก้ว', regionId: 'region_13' },

    { id: 'province_pt', name: 'ปทุมธานี', regionId: 'region_14' },
    { id: 'province_ay', name: 'พระนครศรีอยุธยา', regionId: 'region_14' },
    { id: 'province_sr', name: 'สระบุรี', regionId: 'region_14' },
    { id: 'province_sb', name: 'สิงห์บุรี', regionId: 'region_14' },
    { id: 'province_at', name: 'อ่างทอง', regionId: 'region_14' },

    { id: 'province_ct', name: 'จันทบุรี', regionId: 'region_15' },
    { id: 'province_cc', name: 'ฉะเชิงเทรา', regionId: 'region_15' },
    { id: 'province_cb', name: 'ชลบุรี', regionId: 'region_15' },
    { id: 'province_tr', name: 'ตราด', regionId: 'region_15' },
    { id: 'province_ry', name: 'ระยอง', regionId: 'region_15' },
    { id: 'province_sp2', name: 'สมุทรปราการ', regionId: 'region_15' },

    { id: 'province_cp2', name: 'ชุมพร', regionId: 'region_16' },
    { id: 'province_pg', name: 'พังงา', regionId: 'region_16' },
    { id: 'province_pk', name: 'ภูเก็ต', regionId: 'region_16' },
    { id: 'province_rn', name: 'ระนอง', regionId: 'region_16' },
    { id: 'province_sr2', name: 'สุราษฎร์ธานี', regionId: 'region_16' },

    { id: 'province_kr', name: 'กระบี่', regionId: 'region_17' },
    { id: 'province_tr2', name: 'ตรัง', regionId: 'region_17' },
    { id: 'province_nsm', name: 'นครศรีธรรมราช', regionId: 'region_17' },
    { id: 'province_ptl', name: 'พัทลุง', regionId: 'region_17' },

    { id: 'province_nt', name: 'นราธิวาส', regionId: 'region_18' },
    { id: 'province_ptn', name: 'ปัตตานี', regionId: 'region_18' },
    { id: 'province_yl', name: 'ยะลา', regionId: 'region_18' },
    { id: 'province_sg', name: 'สงขลา', regionId: 'region_18' },
    { id: 'province_st', name: 'สตูล', regionId: 'region_18' },
  ];

  // Generate districts based on your CSV example
  const districts = [
    // กรุงเทพฯ
    { id: 'district_0', name: '0', provinceId: 'province_bkk' },
    { id: 'district_klongchan', name: 'คลองจั่น', provinceId: 'province_bkk' },
    { id: 'district_thonphet', name: 'ถนนเพชรบุรี', provinceId: 'province_bkk' },
    { id: 'district_bangkholaem', name: 'บางคอแหลม', provinceId: 'province_bkk' },
    { id: 'district_bangrak', name: 'บางรัก', provinceId: 'province_bkk' },
    { id: 'district_bangkhen', name: 'บางเขน', provinceId: 'province_bkk' },
    { id: 'district_bangkae', name: 'บางแค', provinceId: 'province_bkk' },
    { id: 'district_phra_khong', name: 'พระโขนง', provinceId: 'province_bkk' },
    { id: 'district_phromphong', name: 'พร้อมพงษ์', provinceId: 'province_bkk' },
    { id: 'district_minburi', name: 'มีนบุรี', provinceId: 'province_bkk' },
    { id: 'district_rachawat', name: 'ราชวัตร', provinceId: 'province_bkk' },
    { id: 'district_ratburana', name: 'ราษฎร์บูรณะ', provinceId: 'province_bkk' },
    { id: 'district_siriraj', name: 'ศิริราช', provinceId: 'province_bkk' },
    { id: 'district_saphanmai', name: 'สะพานใหม่', provinceId: 'province_bkk' },
    { id: 'district_huaykwang', name: 'ห้วยขวาง', provinceId: 'province_bkk' },

    // สมุทรปราการ
    { id: 'district_smp1', name: 'สมุทรปราการ 1', provinceId: 'province_sp' },
    { id: 'district_smp2', name: 'สมุทรปราการ 2', provinceId: 'province_sp2' },

    // ประจวบคีรีขันธ์
    { id: 'district_prc', name: 'ประจวบคีรีขันธ์', provinceId: 'province_pr' },

    // ราชบุรี
    { id: 'district_rb', name: 'ราชบุรี', provinceId: 'province_rb' },

    // สมุทรสงคราม
    { id: 'district_ssk', name: 'สมุทรสงคราม', provinceId: 'province_ssk' },

    // สมุทรสาคร
    { id: 'district_ssk2', name: 'สมุทรสาคร', provinceId: 'province_ssk' },

    // เพชรบุรี
    { id: 'district_pb', name: 'เพชรบุรี', provinceId: 'province_pb' },

    // กาญจนบุรี
    { id: 'district_kj', name: 'กาญจนบุรี', provinceId: 'province_kj' },

    // นครปฐม
    { id: 'district_np', name: 'นครปฐม', provinceId: 'province_np' },

    // นนทบุรี
    { id: 'district_nb1', name: 'นนทบุรี 1', provinceId: 'province_nb' },
    { id: 'district_nb2', name: 'นนทบุรี 2', provinceId: 'province_nb' },

    // สุพรรณบุรี
    { id: 'district_spn', name: 'สุพรรณบุรี', provinceId: 'province_spn' },

    // ชัยนาท
    { id: 'district_cn', name: 'อุทัยธานี', provinceId: 'province_cn' },

    // นครสวรรค์
    { id: 'district_nsw', name: 'นครสวรรค์', provinceId: 'province_nsw' },

    // พิจิตร
    { id: 'district_pc', name: 'พิจิตร', provinceId: 'province_pc' },

    // ลพบุรี
    { id: 'district_lb', name: 'ลพบุรี', provinceId: 'province_lb' },

    // อุทัยธานี
    { id: 'district_ut', name: 'อุทัยธานี', provinceId: 'province_ut' },

    // เพชรบูรณ์
    { id: 'district_pb2', name: 'เพชรบูรณ์', provinceId: 'province_pb2' },

    // กำแพงเพชร
    { id: 'district_kp', name: 'กำแพงเพชร', provinceId: 'province_kp' },

    // ตาก
    { id: 'district_tk', name: 'ตาก', provinceId: 'province_tk' },

    // พิษณุโลก
    { id: 'district_pn1', name: 'พิษณุโลก 1', provinceId: 'province_pn' },
    { id: 'district_pn2', name: 'พิษณุโลก 2', provinceId: 'province_pn' },

    // สุโขทัย
    { id: 'district_skt', name: 'สุโขทัย', provinceId: 'province_skt' },

    // อุตรดิตถ์
    { id: 'district_udt', name: 'อุตรดิตถ์', provinceId: 'province_udt' },

    // ลำพูน
    { id: 'district_lp1', name: 'ลำพูน', provinceId: 'province_lp' },

    // เชียงใหม่
    { id: 'district_cm1', name: 'เชียงใหม่ 1', provinceId: 'province_cm' },
    { id: 'district_cm2', name: 'เชียงใหม่ 2', provinceId: 'province_cm' },
    { id: 'district_cm3', name: 'เชียงใหม่ 3', provinceId: 'province_cm' },

    // แม่ฮ่องสอน
    { id: 'district_mhs', name: 'แม่ฮ่องสอน', provinceId: 'province_mhs' },

    // น่าน
    { id: 'district_nn', name: 'น่าน', provinceId: 'province_nn' },

    // พะเยา
    { id: 'district_py', name: 'พะเยา', provinceId: 'province_py' },

    // ลำปาง
    { id: 'district_lp2', name: 'ลำปาง', provinceId: 'province_lp2' },

    // เชียงราย
    { id: 'district_cr', name: 'เชียงราย', provinceId: 'province_cr' },

    // แพร่
    { id: 'district_pr2', name: 'แพร่', provinceId: 'province_pr2' },

    // นครพนม
    { id: 'district_npm', name: 'นครพนม', provinceId: 'province_npm' },

    // บึงกาฬ
    { id: 'district_bk', name: 'บึงกาฬ', provinceId: 'province_bk' },

    // สกลนคร
    { id: 'district_skn', name: 'สกลนคร', provinceId: 'province_skn' },

    // หนองคาย
    { id: 'district_nk', name: 'หนองคาย', provinceId: 'province_nk' },

    // หนองบัวลำภู
    { id: 'district_nbl', name: 'หนองบัวลำภู', provinceId: 'province_nbl' },

    // อุดรธานี
    { id: 'district_ud1', name: 'อุดรธานี 1', provinceId: 'province_ud' },
    { id: 'district_ud2', name: 'อุดรธานี 2', provinceId: 'province_ud' },

    // เลย
    { id: 'district_ly', name: 'เลย', provinceId: 'province_ly' },

    // กาฬสินธุ์
    { id: 'district_ks', name: 'กาฬสินธุ์', provinceId: 'province_ks' },

    // ขอนแก่น
    { id: 'district_kk1', name: 'ขอนแก่น 1', provinceId: 'province_kk' },
    { id: 'district_kk2', name: 'ขอนแก่น 2', provinceId: 'province_kk' },

    // ชัยภูมิ
    { id: 'district_cp', name: 'ชัยภูมิ', provinceId: 'province_cp' },

    // มหาสารคาม
    { id: 'district_ms', name: 'มหาสารคาม', provinceId: 'province_ms' },

    // มุกดาหาร
    { id: 'district_mk', name: 'มุกดาหาร', provinceId: 'province_mk' },

    // ร้อยเอ็ด
    { id: 'district_re', name: 'ร้อยเอ็ด', provinceId: 'province_re' },

    // บุรีรัมย์
    { id: 'district_br', name: 'บุรีรัมย์', provinceId: 'province_br' },

    // ยโสธร
    { id: 'district_ys', name: 'ยโสธร', provinceId: 'province_ys' },

    // ศรีสะเกษ
    { id: 'district_ss', name: 'ศรีสะเกษ', provinceId: 'province_ss' },

    // สุรินทร์
    { id: 'district_sn', name: 'สุรินทร์', provinceId: 'province_sn' },

    // อำนาจเจริญ
    { id: 'district_ac', name: 'อำนาจเจริญ', provinceId: 'province_ac' },

        // อุบลราชธานี
    { id: 'district_ub1', name: 'อุบลราชธานี 1', provinceId: 'province_ub' },
    { id: 'district_ub2', name: 'อุบลราชธานี 2', provinceId: 'province_ub' },

    // นครนายก
    { id: 'district_ny', name: 'นครนายก', provinceId: 'province_ny' },

    // นครราชสีมา
    { id: 'district_nrm1', name: 'นครราชสีมา 1', provinceId: 'province_nrm' },
    { id: 'district_nrm2', name: 'นครราชสีมา 2', provinceId: 'province_nrm' },
    { id: 'district_nrm3', name: 'นครราชสีมา 3', provinceId: 'province_nrm' },

    // ปราจีนบุรี
    { id: 'district_prc2', name: 'ปราจีนบุรี', provinceId: 'province_prc' },

    // สระแก้ว
    { id: 'district_sk', name: 'สระแก้ว', provinceId: 'province_sk' },

    // ปทุมธานี
    { id: 'district_pt1', name: 'ปทุมธานี 1', provinceId: 'province_pt' },
    { id: 'district_pt2', name: 'ปทุมธานี 2', provinceId: 'province_pt' },

    // พระนครศรีอยุธยา
    { id: 'district_ay1', name: 'พระนครศรีอยุธยา 1', provinceId: 'province_ay' },
    { id: 'district_ay2', name: 'พระนครศรีอยุธยา 2', provinceId: 'province_ay' },

    // สระบุรี
    { id: 'district_sr', name: 'สระบุรี', provinceId: 'province_sr' },

    // สิงห์บุรี
    { id: 'district_sb', name: 'สิงห์บุรี', provinceId: 'province_sb' },

    // อ่างทอง
    { id: 'district_at', name: 'อ่างทอง', provinceId: 'province_at' },

    // จันทบุรี
    { id: 'district_ct', name: 'จันทบุรี', provinceId: 'province_ct' },

    // ฉะเชิงเทรา
    { id: 'district_cc', name: 'ฉะเชิงเทรา', provinceId: 'province_cc' },

    // ชลบุรี
    { id: 'district_cb1', name: 'ชลบุรี 1', provinceId: 'province_cb' },
    { id: 'district_cb2', name: 'ชลบุรี 2', provinceId: 'province_cb' },
    { id: 'district_cb3', name: 'ชลบุรี 3', provinceId: 'province_cb' },
    { id: 'district_cb4', name: 'ชลบุรี 4', provinceId: 'province_cb' },

    // ตราด
    { id: 'district_tr', name: 'ตราด', provinceId: 'province_tr' },

    // ระยอง
    { id: 'district_ry', name: 'ระยอง', provinceId: 'province_ry' },

    // ชุมพร
    { id: 'district_cp1', name: 'ชุมพร 1', provinceId: 'province_cp2' },
    { id: 'district_cp2', name: 'ชุมพร 2', provinceId: 'province_cp2' },

    // พังงา
    { id: 'district_pg', name: 'พังงา', provinceId: 'province_pg' },

    // ภูเก็ต
    { id: 'district_pk', name: 'ภูเก็ต', provinceId: 'province_pk' },

    // ระนอง
    { id: 'district_rn', name: 'ระนอง', provinceId: 'province_rn' },

    // สุราษฎร์ธานี
    { id: 'district_sr1', name: 'สุราษฎร์ธานี 1', provinceId: 'province_sr2' },
    { id: 'district_sr2', name: 'สุราษฎร์ธานี 2', provinceId: 'province_sr2' },

    // กระบี่
    { id: 'district_kr', name: 'กระบี่', provinceId: 'province_kr' },

    // ตรัง
    { id: 'district_tr2', name: 'ตรัง', provinceId: 'province_tr2' },

    // นครศรีธรรมราช
    { id: 'district_nsm1', name: 'นครศรีธรรมราช 1', provinceId: 'province_nsm' },
    { id: 'district_nsm2', name: 'นครศรีธรรมราช 2', provinceId: 'province_nsm' },

    // พัทลุง
    { id: 'district_ptl', name: 'พัทลุง', provinceId: 'province_ptl' },

    // นราธิวาส
    { id: 'district_nt', name: 'นราธิวาส', provinceId: 'province_nt' },

    // ปัตตานี
    { id: 'district_ptn', name: 'ปัตตานี', provinceId: 'province_ptn' },

    // ยะลา
    { id: 'district_yl', name: 'ยะลา', provinceId: 'province_yl' },

    // สงขลา
    { id: 'district_sg1', name: 'สงขลา 1', provinceId: 'province_sg' },
    { id: 'district_sg2', name: 'สงขลา 2', provinceId: 'province_sg' },

    // สตูล
    { id: 'district_st', name: 'สตูล', provinceId: 'province_st' },
  ];

  // Generate branches based on your CSV example
  const branches = [
    { id: 'branch_phaholyothin', name: 'สำนักพหลโยธิน', districtId: 'district_0' },
    { id: 'branch_bangkhen', name: 'บางเขน', districtId: 'district_bangkhen' },
    { id: 'branch_kasetsart', name: 'มหาวิทยาลัยเกษตรศาสตร์', districtId: 'district_bangkhen' },
    { id: 'branch_jatujak', name: 'จตุจักร', districtId: 'district_bangkhen' },
    { id: 'branch_klongchan', name: 'คลองจั่น', districtId: 'district_klongchan' },
    { id: 'branch_thonphet', name: 'ถนนเพชรบุรี', districtId: 'district_thonphet' },
    { id: 'branch_bangrak', name: 'บางรัก', districtId: 'district_bangrak' },
    { id: 'branch_phra_khong', name: 'พระโขนง', districtId: 'district_phra_khong' },
    { id: 'branch_smp1', name: 'สมุทรปราการ 1', districtId: 'district_smp1' },
    { id: 'branch_smp2', name: 'สมุทรปราการ 2', districtId: 'district_smp2' },
    { id: 'branch_rb', name: 'ราชบุรี', districtId: 'district_rb' },
    { id: 'branch_ssk', name: 'สมุทรสงคราม', districtId: 'district_ssk' },
    { id: 'branch_ssk2', name: 'สมุทรสาคร', districtId: 'district_ssk2' },
    { id: 'branch_pb', name: 'เพชรบุรี', districtId: 'district_pb' },
    { id: 'branch_kj', name: 'กาญจนบุรี', districtId: 'district_kj' },
    { id: 'branch_np', name: 'นครปฐม', districtId: 'district_np' },
    { id: 'branch_nb1', name: 'นนทบุรี 1', districtId: 'district_nb1' },
    { id: 'branch_nb2', name: 'นนทบุรี 2', districtId: 'district_nb2' },
    { id: 'branch_spn', name: 'สุพรรณบุรี', districtId: 'district_spn' },
    { id: 'branch_cn', name: 'อุทัยธานี', districtId: 'district_cn' },
    { id: 'branch_nsw', name: 'นครสวรรค์', districtId: 'district_nsw' },
    { id: 'branch_pc', name: 'พิจิตร', districtId: 'district_pc' },
    { id: 'branch_lb', name: 'ลพบุรี', districtId: 'district_lb' },
    { id: 'branch_ut', name: 'อุทัยธานี', districtId: 'district_ut' },
    { id: 'branch_pb2', name: 'เพชรบูรณ์', districtId: 'district_pb2' },
    { id: 'branch_kp', name: 'กำแพงเพชร', districtId: 'district_kp' },
    { id: 'branch_tk', name: 'ตาก', districtId: 'district_tk' },
    { id: 'branch_pn1', name: 'พิษณุโลก 1', districtId: 'district_pn1' },
    { id: 'branch_pn2', name: 'พิษณุโลก 2', districtId: 'district_pn2' },
    { id: 'branch_skt', name: 'สุโขทัย', districtId: 'district_skt' },
    { id: 'branch_udt', name: 'อุตรดิตถ์', districtId: 'district_udt' },
    { id: 'branch_lp1', name: 'ลำพูน', districtId: 'district_lp1' },
    { id: 'branch_cm1', name: 'เชียงใหม่ 1', districtId: 'district_cm1' },
    { id: 'branch_cm2', name: 'เชียงใหม่ 2', districtId: 'district_cm2' },
    { id: 'branch_cm3', name: 'เชียงใหม่ 3', districtId: 'district_cm3' },
    { id: 'branch_mhs', name: 'แม่ฮ่องสอน', districtId: 'district_mhs' },
    { id: 'branch_nn', name: 'น่าน', districtId: 'district_nn' },
    { id: 'branch_py', name: 'พะเยา', districtId: 'district_py' },
    { id: 'branch_lp2', name: 'ลำปาง', districtId: 'district_lp2' },
    { id: 'branch_cr', name: 'เชียงราย', districtId: 'district_cr' },
    { id: 'branch_pr2', name: 'แพร่', districtId: 'district_pr2' },
    { id: 'branch_npm', name: 'นครพนม', districtId: 'district_npm' },
    { id: 'branch_bk', name: 'บึงกาฬ', districtId: 'district_bk' },
    { id: 'branch_skn', name: 'สกลนคร', districtId: 'district_skn' },
    { id: 'branch_nk', name: 'หนองคาย', districtId: 'district_nk' },
    { id: 'branch_nbl', name: 'หนองบัวลำภู', districtId: 'district_nbl' },
    { id: 'branch_ud1', name: 'อุดรธานี 1', districtId: 'district_ud1' },
    { id: 'branch_ud2', name: 'อุดรธานี 2', districtId: 'district_ud2' },
    { id: 'branch_ly', name: 'เลย', districtId: 'district_ly' },
    { id: 'branch_ks', name: 'กาฬสินธุ์', districtId: 'district_ks' },
    { id: 'branch_kk1', name: 'ขอนแก่น 1', districtId: 'district_kk1' },
    { id: 'branch_kk2', name: 'ขอนแก่น 2', districtId: 'district_kk2' },
    { id: 'branch_cp', name: 'ชัยภูมิ', districtId: 'district_cp' },
    { id: 'branch_ms', name: 'มหาสารคาม', districtId: 'district_ms' },
    { id: 'branch_mk', name: 'มุกดาหาร', districtId: 'district_mk' },
    { id: 'branch_re', name: 'ร้อยเอ็ด', districtId: 'district_re' },
    { id: 'branch_br', name: 'บุรีรัมย์', districtId: 'district_br' },
    { id: 'branch_ys', name: 'ยโสธร', districtId: 'district_ys' },
    { id: 'branch_ss', name: 'ศรีสะเกษ', districtId: 'district_ss' },
    { id: 'branch_sn', name: 'สุรินทร์', districtId: 'district_sn' },
    { id: 'branch_ac', name: 'อำนาจเจริญ', districtId: 'district_ac' },
    { id: 'branch_ub1', name: 'อุบลราชธานี 1', districtId: 'district_ub1' },
    { id: 'branch_ub2', name: 'อุบลราชธานี 2', districtId: 'district_ub2' },
    { id: 'branch_ny', name: 'นครนายก', districtId: 'district_ny' },
    { id: 'branch_nrm1', name: 'นครราชสีมา 1', districtId: 'district_nrm1' },
    { id: 'branch_nrm2', name: 'นครราชสีมา 2', districtId: 'district_nrm2' },
    { id: 'branch_nrm3', name: 'นครราชสีมา 3', districtId: 'district_nrm3' },
    { id: 'branch_prc2', name: 'ปราจีนบุรี', districtId: 'district_prc2' },
    { id: 'branch_sk', name: 'สระแก้ว', districtId: 'district_sk' },
    { id: 'branch_pt1', name: 'ปทุมธานี 1', districtId: 'district_pt1' },
    { id: 'branch_pt2', name: 'ปทุมธานี 2', districtId: 'district_pt2' },
    { id: 'branch_ay1', name: 'พระนครศรีอยุธยา 1', districtId: 'district_ay1' },
    { id: 'branch_ay2', name: 'พระนครศรีอยุธยา 2', districtId: 'district_ay2' },
    { id: 'branch_sr', name: 'สระบุรี', districtId: 'district_sr' },
    { id: 'branch_sb', name: 'สิงห์บุรี', districtId: 'district_sb' },
    { id: 'branch_at', name: 'อ่างทอง', districtId: 'district_at' },
    { id: 'branch_ct', name: 'จันทบุรี', districtId: 'district_ct' },
    { id: 'branch_cc', name: 'ฉะเชิงเทรา', districtId: 'district_cc' },
    { id: 'branch_cb1', name: 'ชลบุรี 1', districtId: 'district_cb1' },
    { id: 'branch_cb2', name: 'ชลบุรี 2', districtId: 'district_cb2' },
    { id: 'branch_cb3', name: 'ชลบุรี 3', districtId: 'district_cb3' },
    { id: 'branch_cb4', name: 'ชลบุรี 4', districtId: 'district_cb4' },
    { id: 'branch_tr', name: 'ตราด', districtId: 'district_tr' },
    { id: 'branch_ry', name: 'ระยอง', districtId: 'district_ry' },
    { id: 'branch_cp1', name: 'ชุมพร 1', districtId: 'district_cp1' },
    { id: 'branch_cp2', name: 'ชุมพร 2', districtId: 'district_cp2' },
    { id: 'branch_pg', name: 'พังงา', districtId: 'district_pg' },
    { id: 'branch_pk', name: 'ภูเก็ต', districtId: 'district_pk' },
    { id: 'branch_rn', name: 'ระนอง', districtId: 'district_rn' },
    { id: 'branch_sr1', name: 'สุราษฎร์ธานี 1', districtId: 'district_sr1' },
    { id: 'branch_sr2', name: 'สุราษฎร์ธานี 2', districtId: 'district_sr2' },
    { id: 'branch_kr', name: 'กระบี่', districtId: 'district_kr' },
    { id: 'branch_tr2', name: 'ตรัง', districtId: 'district_tr2' },
    { id: 'branch_nsm1', name: 'นครศรีธรรมราช 1', districtId: 'district_nsm1' },
    { id: 'branch_nsm2', name: 'นครศรีธรรมราช 2', districtId: 'district_nsm2' },
    { id: 'branch_ptl', name: 'พัทลุง', districtId: 'district_ptl' },
    { id: 'branch_nt', name: 'นราธิวาส', districtId: 'district_nt' },
    { id: 'branch_ptn', name: 'ปัตตานี', districtId: 'district_ptn' },
    { id: 'branch_yl', name: 'ยะลา', districtId: 'district_yl' },
    { id: 'branch_sg1', name: 'สงขลา 1', districtId: 'district_sg1' },
    { id: 'branch_sg2', name: 'สงขลา 2', districtId: 'district_sg2' },
    { id: 'branch_st', name: 'สตูล', districtId: 'district_st' },
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
