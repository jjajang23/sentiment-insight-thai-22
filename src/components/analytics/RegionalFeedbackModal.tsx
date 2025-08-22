
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UnifiedFilter } from '@/components/filters/UnifiedFilter';
import { LocationFilters } from '@/types/locations';

interface RegionalFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate mock feedback data
const generateMockFeedback = (filters: LocationFilters) => {
  const feedbackItems = [];
  const sentiments = ['positive', 'negative', 'neutral'];
  const services = ['การฝากเงิน/ถอนเงิน', 'การซื้อผลิตภัณฑ์', 'การชำระค่าบริการ/ค่าธรรมเนียม', 'อื่นๆ'];
  
  for (let i = 0; i < 20; i++) {
    feedbackItems.push({
      id: `feedback_${i}`,
      branch: `หน่วยบริการ ${i + 1}`,
      district: `เขต ${Math.floor(i / 5) + 1}`,
      province: `จังหวัด ${Math.floor(i / 10) + 1}`,
      region: `ภาค ${Math.floor(i / 15) + 1}`,
      service: services[i % services.length],
      sentiment: sentiments[i % sentiments.length],
      comment: `ความคิดเห็นตัวอย่างที่ ${i + 1} เกี่ยวกับการบริการที่ได้รับ`,
      rating: Math.floor(Math.random() * 5) + 1,
      date: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toLocaleDateString('th-TH')
    });
  }
  return feedbackItems;
};

export const RegionalFeedbackModal: React.FC<RegionalFeedbackModalProps> = ({
  isOpen,
  onClose
}) => {
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    regionId: "all",
    provinceId: "all",
    districtId: "all",
    branchId: "all"
  });

  const feedbackData = generateMockFeedback(locationFilters);

  const handleLocationFiltersChange = (filters: LocationFilters) => {
    setLocationFilters(filters);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'เชิงบวก';
      case 'negative': return 'เชิงลบ';
      default: return 'เป็นกลาง';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>รายละเอียดข้อคิดเห็นลูกค้า รายพื้นที่</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
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

          {/* Tabs for different views */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">รายการข้อคิดเห็น</TabsTrigger>
              <TabsTrigger value="summary">สรุปผล</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {feedbackData.map((feedback) => (
                <Card key={feedback.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          {feedback.branch} - {feedback.district}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {feedback.province} - {feedback.region}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getSentimentColor(feedback.sentiment)}>
                          {getSentimentLabel(feedback.sentiment)}
                        </Badge>
                        <Badge variant="outline">
                          คะแนน: {feedback.rating}/5
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">บริการ:</span> {feedback.service}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">ความคิดเห็น:</span> {feedback.comment}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        วันที่: {feedback.date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">เชิงบวก</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {feedbackData.filter(f => f.sentiment === 'positive').length}
                    </div>
                    <p className="text-sm text-muted-foreground">ความคิดเห็น</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">เชิงลบ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {feedbackData.filter(f => f.sentiment === 'negative').length}
                    </div>
                    <p className="text-sm text-muted-foreground">ความคิดเห็น</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-600">เป็นกลาง</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-600">
                      {feedbackData.filter(f => f.sentiment === 'neutral').length}
                    </div>
                    <p className="text-sm text-muted-foreground">ความคิดเห็น</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
