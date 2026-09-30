export type PageView = 'home' | 'services' | 'service-detail' | 'calculator' | 'about' | 'contact';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'cooling' | 'heating' | 'maintenance' | 'air-quality' | 'commercial';
  priceStartingAt: string;
  turnaroundTime: string;
  warranty: string;
  keyFeatures: string[];
  processSteps: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  benefits: string[];
  specs: { label: string; value: string }[];
}

export interface ReviewItem {
  id: string;
  author: string;
  neighborhood: string;
  city: string;
  serviceType: string;
  rating: number;
  date: string;
  quote: string;
  verified: boolean;
  platform?: 'Google' | 'Nextdoor' | 'Yelp' | 'Direct';
  systemModel?: string;
  helpfulCount?: number;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  description: string;
  features: string[];
  discounts: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  systemType: string;
}
