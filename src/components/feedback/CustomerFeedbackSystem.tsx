
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Search, Filter } from 'lucide-react';
import { UnifiedFilter } from '@/components/filters/UnifiedFilter';
import { LocationFilters } from '@/types/locations';
import { generateLocationMockData } from '@/utils/locationDataManager';

interface FeedbackItem {
  id: string;
  customerName: string;
  branch: string;
  district: string;
  province: string;
  region: string;
  serviceType: string;
  rating: number;
  comment: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  date: string;
  hasContact: boolean;
}

// Generate mock feedback data
const generateMockFeedback = (filters: LocationFilters): FeedbackItem[] => {
  const feedback: FeedbackItem[] = [];
  const serviceTypes = ['การฝากเงิน/ถอนเงิน', 'การซื้อผลิตภัณฑ์', 'การชำระค่าบริการ/ค่าธรรมเนียม', 'อื่นๆ'];
  const sentiments: FeedbackItem['sentiment'][] = ['positive', 'negative', 'neutral'];

  const locations = generateLocationMockData();
  const filteredLocations = locations.filter(loc =>
    (filters.regionId === 'all' || loc.region === filters.regionId) &&
    (filters.provinceId === 'all' || loc.province === filters.provinceId) &&
    (filters.districtId === 'all' || loc.district === filters.districtId) &&
    (filters.branchId === 'all' || loc.branch === filters.branchId)
  );

  filteredLocations.forEach((loc, i) => {
    feedback.push({
      id: `feedback_${i + 1}`,
      region: loc.region,
      province: loc.province,
      district: loc.district,
      branch: loc.branch,
      customerName: `ลูกค้า ${i + 1}`,
      serviceType: serviceTypes[i % serviceTypes.length],
      rating: Math.floor(Math.random() * 5) + 1,
      comment: `ความคิดเห็นตัวอย่างที่ ${i + 1} เกี่ยวกับการบริการที่ได้รับจากหน่วยบริการ`,
      sentiment: sentiments[i % sentiments.length],
      date: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toLocaleDateString('th-TH'),
      hasContact: Math.random() > 0.7
    });
  });

  return feedback;
};

export const CustomerFeedbackSystem: React.FC = () => {
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    regionId: "all",
    provinceId: "all",
    districtId: "all",
    branchId: "all"
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

  const feedbackData = generateMockFeedback(locationFilters);

  const handleLocationFiltersChange = (filters: LocationFilters) => {
    setLocationFilters(filters);
  };

  const filteredFeedback = feedbackData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSentiment = selectedSentiment === 'all' || item.sentiment === selectedSentiment;
    
    return matchesSearch && matchesSentiment;
  });

  const getSentimentColor = (sentiment: FeedbackItem['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentLabel = (sentiment: FeedbackItem['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'เชิงบวก';
      case 'negative': return 'เชิงลบ';
      default: return 'เป็นกลาง';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const sentimentCounts = {
    positive: feedbackData.filter(f => f.sentiment === 'positive').length,
    negative: feedbackData.filter(f => f.sentiment === 'negative').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-foreground">
          ระบบจัดการข้อคิดเห็นลูกค้า
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
            branchLabel: "สาขา/หน่วยให้บริการ"
          }}
          title="เลือกพื้นที่"
        />

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ค้นหาความคิดเห็น, ชื่อลูกค้า, หรือสาขา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedSentiment === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSentiment('all')}
            >
              ทั้งหมด
            </Button>
            <Button
              variant={selectedSentiment === 'positive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSentiment('positive')}
            >
              เชิงบวก ({sentimentCounts.positive})
            </Button>
            <Button
              variant={selectedSentiment === 'negative' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSentiment('negative')}
            >
              เชิงลบ ({sentimentCounts.negative})
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackData.length}</div>
            <p className="text-xs text-muted-foreground">ความคิดเห็น</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">เชิงบวก</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{sentimentCounts.positive}</div>
            <p className="text-xs text-muted-foreground">
              {((sentimentCounts.positive / feedbackData.length) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">เชิงลบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{sentimentCounts.negative}</div>
            <p className="text-xs text-muted-foreground">
              {((sentimentCounts.negative / feedbackData.length) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            ผลการค้นหา ({filteredFeedback.length} รายการ)
          </h3>
        </div>

        {filteredFeedback.map((feedback) => (
          <Card key={feedback.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base font-medium">
                    {feedback.customerName} - {feedback.branch}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {feedback.region}, {feedback.province}, {feedback.district}, {feedback.branch}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getSentimentColor(feedback.sentiment)}>
                    {getSentimentLabel(feedback.sentiment)}
                  </Badge>
                  {feedback.hasContact && (
                    <Badge variant="outline">มีข้อมูลติดต่อ</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-sm font-medium">คะแนน:</span>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(feedback.rating)}
                      <span className="text-sm text-muted-foreground">
                        ({feedback.rating}/5)
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">บริการ:</span>
                    <p className="text-sm text-muted-foreground">{feedback.serviceType}</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium">ความคิดเห็น:</span>
                  <p className="text-sm mt-1">{feedback.comment}</p>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>วันที่: {feedback.date}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      ตอบกลับ
                    </Button>
                    <Button size="sm" variant="outline">
                      ดูรายละเอียด
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredFeedback.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">ไม่พบความคิดเห็นที่ตรงกับการค้นหา</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
