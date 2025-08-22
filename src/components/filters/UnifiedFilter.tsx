
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LocationFilters } from '@/types/locations';
import { useLocationData } from '@/hooks/useLocationData';

export interface FilterOption {
  showRegion?: boolean;
  showProvince?: boolean;
  showDistrict?: boolean;
  showBranch?: boolean;
  regionLabel?: string;
  provinceLabel?: string;
  districtLabel?: string;
  branchLabel?: string;
}

interface UnifiedFilterProps {
  filters: LocationFilters;
  onFiltersChange: (filters: LocationFilters) => void;
  options?: FilterOption;
  title?: string;
  className?: string;
}

const defaultOptions: FilterOption = {
  showRegion: true,
  showProvince: true,
  showDistrict: true,
  showBranch: true,
  regionLabel: 'ภาค',
  provinceLabel: 'จังหวัด',
  districtLabel: 'เขต',
  branchLabel: 'หน่วยบริการ',
};

export const UnifiedFilter: React.FC<UnifiedFilterProps> = ({
  filters,
  onFiltersChange,
  options = defaultOptions,
  title = 'พื้นที่ให้บริการ',
  className = ''
}) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const { locationData, isLoading, error, availableProvinces, availableDistricts, availableBranches } = useLocationData(filters);

  // Handle cascading filter changes
  const handleFilterChange = useCallback((level: keyof LocationFilters, value: string) => {
    const newFilters = { ...filters, [level]: value };
    
    // Reset dependent filters when parent changes (Cascading logic)
    if (level === 'regionId') {
      newFilters.provinceId = 'all';
      newFilters.districtId = 'all';
      newFilters.branchId = 'all';
    } else if (level === 'provinceId') {
      newFilters.districtId = 'all';
      newFilters.branchId = 'all';
    } else if (level === 'districtId') {
      newFilters.branchId = 'all';
    }
    
    onFiltersChange(newFilters);
  }, [filters, onFiltersChange]);

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            กำลังโหลดข้อมูล...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !locationData) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-500">
            <p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
            <p className="text-sm mt-2">
              กรุณาเพิ่มไฟล์ CSV ในโฟลเดอร์ public/data/
              <br />
              (regions.csv, provinces.csv, districts.csv, branches.csv)
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Region Filter */}
          {mergedOptions.showRegion && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {mergedOptions.regionLabel}
              </label>
              <Select 
                value={filters.regionId} 
                onValueChange={(value) => handleFilterChange('regionId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`เลือก${mergedOptions.regionLabel}`} />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {locationData.regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Province Filter */}
          {mergedOptions.showProvince && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {mergedOptions.provinceLabel}
              </label>
              <Select 
                value={filters.provinceId} 
                onValueChange={(value) => handleFilterChange('provinceId', value)}
                disabled={filters.regionId === 'all' && mergedOptions.showRegion}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`เลือก${mergedOptions.provinceLabel}`} />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {availableProvinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* District Filter */}
          {mergedOptions.showDistrict && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {mergedOptions.districtLabel}
              </label>
              <Select 
                value={filters.districtId} 
                onValueChange={(value) => handleFilterChange('districtId', value)}
                disabled={filters.provinceId === 'all' && mergedOptions.showProvince}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`เลือก${mergedOptions.districtLabel}`} />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {availableDistricts.map((district) => (
                    <SelectItem key={district.id} value={district.id}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Branch Filter */}
          {mergedOptions.showBranch && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {mergedOptions.branchLabel}
              </label>
              <Select 
                value={filters.branchId} 
                onValueChange={(value) => handleFilterChange('branchId', value)}
                disabled={filters.districtId === 'all' && mergedOptions.showDistrict}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`เลือก${mergedOptions.branchLabel}`} />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {availableBranches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
