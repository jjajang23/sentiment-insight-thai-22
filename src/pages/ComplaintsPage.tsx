import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { UnifiedFilter } from '@/components/filters/UnifiedFilter';
import { LocationFilters } from '@/types/locations';

interface Complaint {
  id: string;
  branch: string;
  district: string;
  province: string;
  region: string;
  customerName: string;
  complainType: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  reportDate: string;
  lastUpdate: string;
  assignedTo?: string;
  priority: number;
}

// Generate mock complaints data
const generateMockComplaints = (filters: LocationFilters): Complaint[] => {
  const complaints: Complaint[] = [];
  const complainTypes = [
    'การให้บริการล่าช้า',
    'พนักงานไม่สุภาพ', 
    'ปัญหาระบบคอมพิวเตอร์',
    'การหลอกลวง',
    'การบริการไม่เป็นธรรม',
    'ปัญหาด้านความปลอดภัย',
    'การเลือกปฏิบัติ',
    'ผลิตภัณฑ์ไม่ตรงตามคำโฆษณา'
  ];
  const statuses: Complaint['status'][] = ['pending', 'investigating', 'resolved', 'closed'];
  const severities: Complaint['severity'][] = ['low', 'medium', 'high', 'critical'];

  for (let i = 0; i < 30; i++) {
    complaints.push({
      id: `complaint_${i + 1}`,
      branch: `หน่วยบริการ ${i + 1}`,
      district: `เขต ${Math.floor(i / 5) + 1}`,
      province: `จังหวัด ${Math.floor(i / 10) + 1}`,
      region: `ภาค ${Math.floor(i / 15) + 1}`,
      customerName: `ลูกค้า ${i + 1}`,
      complainType: complainTypes[i % complainTypes.length],
      description: `รายละเอียดการร้องเรียนที่ ${i + 1} เกี่ยวกับปัญหาในการให้บริการ`,
      severity: severities[i % severities.length],
      status: statuses[i % statuses.length],
      reportDate: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toLocaleDateString('th-TH'),
      lastUpdate: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toLocaleDateString('th-TH'),
      assignedTo: i % 3 === 0 ? `เจ้าหน้าที่ ${i + 1}` : undefined,
      priority: Math.floor(Math.random() * 5) + 1
    });
  }

  return complaints;
};

export const ComplaintsPage: React.FC = () => {
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    regionId: "all",
    provinceId: "all",
    districtId: "all",
    branchId: "all"
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | Complaint['severity']>('all');

  const complaintsData = generateMockComplaints(locationFilters);

  const handleLocationFiltersChange = (filters: LocationFilters) => {
    setLocationFilters(filters);
  };

  const filteredComplaints = complaintsData.filter(complaint => {
    const matchesSearch = searchTerm === '' || 
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.complainType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = selectedSeverity === 'all' || complaint.severity === selectedSeverity;
    
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity: Complaint['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityLabel = (severity: Complaint['severity']) => {
    switch (severity) {
      case 'critical': return 'วิกฤต';
      case 'high': return 'สูง';
      case 'medium': return 'กลาง';
      case 'low': return 'ต่ำ';
      default: return 'ไม่ระบุ';
    }
  };

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Complaint['status']) => {
    switch (status) {
      case 'pending': return 'รอดำเนินการ';
      case 'investigating': return 'กำลังตรวจสอบ';
      case 'resolved': return 'แก้ไขแล้ว';
      case 'closed': return 'ปิดเรื่อง';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const getStatusIcon = (status: Complaint['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'investigating': return <AlertTriangle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const statusCounts = {
    all: complaintsData.length,
    pending: complaintsData.filter(c => c.status === 'pending').length,
    investigating: complaintsData.filter(c => c.status === 'investigating').length,
    resolved: complaintsData.filter(c => c.status === 'resolved').length,
    closed: complaintsData.filter(c => c.status === 'closed').length,
  };

  const severityCounts = {
    critical: complaintsData.filter(c => c.severity === 'critical').length,
    high: complaintsData.filter(c => c.severity === 'high').length,
    medium: complaintsData.filter(c => c.severity === 'medium').length,
    low: complaintsData.filter(c => c.severity === 'low').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-foreground">
          ระบบจัดการการร้องเรียน
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

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ค้นหาการร้องเรียน, ชื่อลูกค้า, ประเภท หรือสาขา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedSeverity === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeverity('all')}
            >
              ทั้งหมด
            </Button>
            <Button
              variant={selectedSeverity === 'critical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeverity('critical')}
            >
              วิกฤต ({severityCounts.critical})
            </Button>
            <Button
              variant={selectedSeverity === 'high' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeverity('high')}
            >
              สูง ({severityCounts.high})
            </Button>
            <Button
              variant={selectedSeverity === 'medium' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeverity('medium')}
            >
              กลาง ({severityCounts.medium})
            </Button>
            <Button
              variant={selectedSeverity === 'low' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeverity('low')}
            >
              ต่ำ ({severityCounts.low})
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.all}</div>
            <p className="text-xs text-muted-foreground">การร้องเรียน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">รอดำเนินการ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
            <p className="text-xs text-muted-foreground">เรื่อง</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">กำลังตรวจสอบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.investigating}</div>
            <p className="text-xs text-muted-foreground">เรื่อง</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">แก้ไขแล้ว</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.resolved}</div>
            <p className="text-xs text-muted-foreground">เรื่อง</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ปิดเรื่อง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{statusCounts.closed}</div>
            <p className="text-xs text-muted-foreground">เรื่อง</p>
          </CardContent>
        </Card>
      </div>

      {/* Complaints List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">ทั้งหมด ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="pending">รอดำเนินการ ({statusCounts.pending})</TabsTrigger>
          <TabsTrigger value="investigating">กำลังตรวจสอบ ({statusCounts.investigating})</TabsTrigger>
          <TabsTrigger value="resolved">แก้ไขแล้ว ({statusCounts.resolved})</TabsTrigger>
          <TabsTrigger value="closed">ปิดเรื่อง ({statusCounts.closed})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">
              ผลการค้นหา ({filteredComplaints.length} รายการ)
            </h3>
          </div>

          {filteredComplaints.map((complaint) => (
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
                    <Button size="sm" variant="outline">
                      ตอบกลับ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredComplaints.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">ไม่พบการร้องเรียนที่ตรงกับการค้นหา</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {['pending', 'investigating', 'resolved', 'closed'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filteredComplaints
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
                        <Button size="sm" variant="outline">
                          ตอบกลับ
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
