
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RegionalFeedbackModal } from '@/components/analytics/RegionalFeedbackModal';
import { CascadingFilter } from '@/components/filters/CascadingFilter';
import { LocationFilters } from '@/types/locations';

// Generate mock data for bar chart based on selected filters
const generateRegionalData = (locationFilters: LocationFilters) => {
  if (locationFilters.regionId === "all") {
    // Show all regions
    return Array.from({ length: 18 }, (_, i) => ({
      region: `ภาคที่ ${i + 1}`,
      positive: Math.floor(Math.random() * 100) + 50,
      negative: Math.floor(Math.random() * 50) + 10,
      neutral: Math.floor(Math.random() * 30) + 5
    }));
  } else {
    // Show selected region only
    const regionNumber = locationFilters.regionId.split('_')[1];
    return [{
      region: `ภาคที่ ${regionNumber}`,
      positive: Math.floor(Math.random() * 100) + 50,
      negative: Math.floor(Math.random() * 50) + 10,
      neutral: Math.floor(Math.random() * 30) + 5
    }];
  }
};

export const RegionalPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    regionId: "all",
    provinceId: "all",
    districtId: "all",
    branchId: "all"
  });
  
  const chartData = generateRegionalData(locationFilters);

  const handleLocationFiltersChange = (filters: LocationFilters) => {
    setLocationFilters(filters);
  };

  const getChartTitle = () => {
    if (locationFilters.regionId !== "all") {
      const regionNumber = locationFilters.regionId.split('_')[1];
      return `ข้อคิดเห็นลูกค้า - ภาคที่ ${regionNumber}`;
    }
    return "ข้อคิดเห็นลูกค้า - ทุกภาค";
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          กราฟข้อคิดเห็นลูกค้า รายพื้นที่
        </h1>

        {/* Location Filter */}
        <CascadingFilter
          options={{
            showRegion: true,
            showProvince: false,
            showDistrict: false,
            showBranch: false,
            regionLabel: "ภาค"
          }}
          onFiltersChange={handleLocationFiltersChange}
          title="เลือกภาค"
        />

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{getChartTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="region" 
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                  label={{ value: 'จำนวน (ครั้ง)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} ครั้ง`,
                    name === 'positive' ? 'เชิงบวก' : name === 'negative' ? 'เชิงลบ' : 'เป็นกลาง'
                  ]}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar dataKey="positive" fill="#10B981" name="positive" />
                <Bar dataKey="negative" fill="#EF4444" name="negative" />
                <Bar dataKey="neutral" fill="#6B7280" name="neutral" />
              </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-muted-foreground">เชิงบวก</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-muted-foreground">เชิงลบ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span className="text-sm text-muted-foreground">เป็นกลาง</span>
              </div>
            </div>

            {/* Detail Button */}
            <div className="flex justify-center mt-6">
              <Button 
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="px-6"
              >
                ดูรายละเอียด
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Feedback Modal */}
      <RegionalFeedbackModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
