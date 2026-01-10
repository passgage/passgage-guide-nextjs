export type Platform = 'ios' | 'android' | 'access-tag' | 'general';

export type Category =
  | 'troubleshooting'
  | 'permissions'
  | 'nfc'
  | 'battery'
  | 'gps'
  | 'installation'
  | 'maintenance';

export interface FAQEntry {
  id: string;
  platform: Platform;
  category: Category;
  question: string;
  answer: string;
  keywords: string[];
  relatedSteps?: number[];
  pageUrl: string;
  metadata: {
    importance: 'high' | 'medium' | 'low';
    lastUpdated: string;
  };
}

export interface FAQSearchResult extends FAQEntry {
  score: number;
  highlights?: {
    question?: string;
    answer?: string;
  };
  guideLink?: string; // Link to specific guide page section
}

export interface SearchFilters {
  platform?: Platform;
  category?: Category;
  minScore?: number;
}

export interface SearchRequest {
  query: string;
  filters?: SearchFilters;
  limit?: number;
}

export interface SearchResponse {
  results: FAQSearchResult[];
  total: number;
  queryTime: number;
}
