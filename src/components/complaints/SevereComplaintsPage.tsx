import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { UnifiedFilter } from '@/components/filters/UnifiedFilter';
import { LocationFilters } from '@/types/locations';
import { generateLocationMockData } from '@/utils/locationDataManager';

interface SevereComplaint {
  id: string;
  branch: string;
  district: string;
  province: string;
  region: string;
  customerName: string;
  complainType: string;
  description: string;
  severity: 'high' | 'critical';
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  reportDate: string;
  lastUpdate: string;
  assignedTo?: string;
}

// Generate mock severe complaints data
const generateMockComplaints = (filters: LocationFilters): SevereComplaint[] => {
  const complaints: SevereComplaint[] = [];
  const complainTypes = ['การหลอกลวง', 'การบริการที่ไม่เป็นธรรม', 'ปัญหาด้านความปลอดภัย', 'การเลือกปฏิบัติ'];
  const statuses: SevereComplaint['status'][] = ['pending', 'investigating', 'resolved', 'closed'];
  const severities: SevereComplaint['severity'][] = ['high', 'critical'];

  // กรอง locations ตามตัวกรอง
  const locations = generateLocationMockData();
  const filteredLocations = locations.filter (loc => 
    (filters.regionId === 'all' || loc.region === filters.regionId) &&
    (filters.provinceId === 'all' || loc.province === filters.provinceId) &&
    (filters.districtId === 'all' || loc.district === filters.districtId) &&
    (filters.branchId === 'all' || loc.branch === filters.branchId)
  );

  for (let i = 0; i < Math.min(15, filteredLocations.length); i++) {
    const loc = filteredLocations[i];
    complaints.push({
      id: `complaint_${i + 1}`,
      branch: loc.branch,
      district: loc.district,
      province: loc.province,
      region: loc.region,
      customerName: `ลูกค้า ${i + 1}`,
      complainType: complainTypes[i % complainTypes.length],
      description: `รายละเอียดการร้องเรียนที่ ${i + 1} เกี่ยวกับปัญหาในการให้บริการที่ไม่เหมาะสม`,
      severity: severities[i % severities.length],
      status: statuses[i % statuses.length],
      reportDate: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toLocaleDateString('th-TH'),
      lastUpdate: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toLocaleDateString('th-TH'),
      assignedTo: i % 3 === 0 ? `เจ้าหน้าที่ ${i + 1}` : undefined
    });
  }

  return complaints;
};

export const SevereComplaintsPage: React.FC = () => {
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    regionId: "all",
    provinceId: "all",
    districtId: "all",
    branchId: "all"
  });

  const complaintsData = generateMockComplaints(locationFilters);

  const handleLocationFiltersChange = (filters: LocationFilters) => {
    setLocationFilters(filters);
  };

  const getSeverityColor = (severity: SevereComplaint['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityLabel = (severity: SevereComplaint['severity']) => {
    switch (severity) {
      case 'critical': return 'วิกฤต';
      case 'high': return 'สูง';
      default: return 'ปกติ';
    }
  };

  const getStatusColor = (status: SevereComplaint['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: SevereComplaint['status']) => {
    switch (status) {
      case 'pending': return 'รอดำเนินการ';
      case 'investigating': return 'กำลังตรวจสอบ';
      case 'resolved': return 'แก้ไขแล้ว';
      case 'closed': return 'ปิดเรื่อง';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const getStatusIcon = (status: SevereComplaint['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'investigating': return <AlertTriangle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const statusCounts = {
    pending: complaintsData.filter(c => c.status === 'pending').length,
    investigating: complaintsData.filter(c => c.status === 'investigating').length,
    resolved: complaintsData.filter(c => c.status === 'resolved').length,
    closed: complaintsData.filter(c => c.status === 'closed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-foreground">
          การร้องเรียนรุนแรง
        </h1>

        {/* Location Filter */}
        <UnifiedFilter
          filters={locationFilters}
          onFiltersChange={handleLocationFiltersChange}
          options={{
            showRegion: true,
            showProvince: true,
            showDistrict: true,
            showBranch: true,
            regionLabel: "ภาค",
            provinceLabel: "จังหวัด",
            districtLabel: "เขต",
            branchLabel: "หน่วยให้บริการ"
          }}
          title="เลือกพื้นที่"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">รอดำเนินการ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">กำลังตรวจสอบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.investigating}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">แก้ไขแล้ว</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.resolved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ปิดเรื่อง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{statusCounts.closed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
          <TabsTrigger value="pending">รอดำเนินการ</TabsTrigger>
          <TabsTrigger value="investigating">กำลังตรวจสอบ</TabsTrigger>
          <TabsTrigger value="resolved">แก้ไขแล้ว</TabsTrigger>
          <TabsTrigger value="closed">ปิดเรื่อง</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {complaintsData.map((complaint) => (
            <Card key={complaint.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base font-medium">
                      {complaint.complainType} - {complaint.branch}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {complaint.district}, {complaint.province}, {complaint.region}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getSeverityColor(complaint.severity)}>
                      {getSeverityLabel(complaint.severity)}
                    </Badge>
                    <Badge className={getStatusColor(complaint.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(complaint.status)}
                        {getStatusLabel(complaint.status)}
                      </div>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">
                    <span className="font-medium">ลูกค้า:</span> {complaint.customerName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">รายละเอียด:</span> {complaint.description}
                  </p>
                  {complaint.assignedTo && (
                    <p className="text-sm">
                      <span className="font-medium">ผู้รับผิดชอบ:</span> {complaint.assignedTo}
                    </p>
                  )}
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>รายงานเมื่อ: {complaint.reportDate}</span>
                    <span>อัปเดตล่าสุด: {complaint.lastUpdate}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      ดูรายละเอียด
                    </Button>
                    <Button size="sm" variant="outline">
                      อัปเดตสถานะ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {['pending', 'investigating', 'resolved', 'closed'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {complaintsData
              .filter((complaint) => complaint.status === status)
              .map((complaint) => (
                <Card key={complaint.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-medium">
                          {complaint.complainType} - {complaint.branch}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {complaint.district}, {complaint.province}, {complaint.region}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(complaint.severity)}>
                          {getSeverityLabel(complaint.severity)}
                        </Badge>
                        <Badge className={getStatusColor(complaint.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(complaint.status)}
                            {getStatusLabel(complaint.status)}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm">
                        <span className="font-medium">ลูกค้า:</span> {complaint.customerName}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">รายละเอียด:</span> {complaint.description}
                      </p>
                      {complaint.assignedTo && (
                        <p className="text-sm">
                          <span className="font-medium">ผู้รับผิดชอบ:</span> {complaint.assignedTo}
                        </p>
                      )}
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>รายงานเมื่อ: {complaint.reportDate}</span>
                        <span>อัปเดตล่าสุด: {complaint.lastUpdate}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          ดูรายละเอียด
                        </Button>
                        <Button size="sm" variant="outline">
                          อัปเดตสถานะ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
