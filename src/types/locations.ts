export interface Region {
  id: string;
  name: string;
}

export interface Province {
  id: string;
  name: string;
  regionId: string;
}

export interface District {
  id: string;
  name: string;
  provinceId: string;
}

export interface Branch {
  id: string;
  name: string;
  districtId: string;
}

export interface LocationData {
  regions: Region[];
  provinces: Province[];
  districts: District[];
  branches: Branch[];
}

export interface LocationFilters {
  regionId: string;
  provinceId: string;
  districtId: string;
  branchId: string;
}

// Legacy compatibility - keep for backward compatibility
export interface CascadingFilterOptions {
  showRegion?: boolean;
  showProvince?: boolean;
  showDistrict?: boolean;
  showBranch?: boolean;
  regionLabel?: string;
  provinceLabel?: string;
  districtLabel?: string;
  branchLabel?: string;
}

// New unified filter options interface
export interface UnifiedFilterOptions extends CascadingFilterOptions {}
