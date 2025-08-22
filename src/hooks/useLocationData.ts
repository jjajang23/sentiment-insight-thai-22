
import { useState, useEffect, useMemo } from 'react';
import { LocationData, LocationFilters } from '@/types/locations';
import { getLocationData } from '@/utils/csvDataLoader';

export interface UseLocationDataReturn {
  locationData: LocationData | null;
  isLoading: boolean;
  error: string | null;
  availableProvinces: Array<{id: string; name: string; regionId: string}>;
  availableDistricts: Array<{id: string; name: string; provinceId: string}>;
  availableBranches: Array<{id: string; name: string; districtId: string}>;
}

export const useLocationData = (filters: LocationFilters): UseLocationDataReturn => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load location data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getLocationData();
        setLocationData(data);
      } catch (err) {
        console.error('Failed to load location data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load location data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Calculate available options based on current filters
  const availableProvinces = useMemo(() => {
    if (!locationData) return [];
    if (filters.regionId === 'all') return locationData.provinces;
    return locationData.provinces.filter(p => p.regionId === filters.regionId);
  }, [locationData, filters.regionId]);

  const availableDistricts = useMemo(() => {
    if (!locationData) return [];
    if (filters.provinceId === 'all') return locationData.districts;
    return locationData.districts.filter(d => d.provinceId === filters.provinceId);
  }, [locationData, filters.provinceId]);

  const availableBranches = useMemo(() => {
    if (!locationData) return [];
    if (filters.districtId === 'all') return locationData.branches;
    return locationData.branches.filter(b => b.districtId === filters.districtId);
  }, [locationData, filters.districtId]);

  return {
    locationData,
    isLoading,
    error,
    availableProvinces,
    availableDistricts,
    availableBranches
  };
};
