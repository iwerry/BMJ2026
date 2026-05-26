export interface Attraction {
  id: string;
  title: string;
  category: 'shows' | 'cinema' | 'manga-anime' | 'food' | 'shops' | 'cosplay';
  description: string;
  icon: string;
  image: string;
  isHighlight?: boolean;
  time?: string;
  day?: string;
}

export interface CinemaSession {
  id: string;
  day: 'sexta' | 'sabado' | 'domingo';
  dayLabel: string;
  dateLabel: string;
  time: string;
  title: string;
  category: 'Tokusatsu' | 'Studio Ghibli';
  description: string;
  image: string;
  priceFull: number;
  priceHalf: number;
}

export interface ScheduleItem {
  id: string;
  day: 'sexta' | 'sabado' | 'domingo';
  time: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  isHighlight?: boolean;
}

export interface Exhibitor {
  id: string;
  name: string;
  category: string;
  logoUrl?: string;
  isFeatured?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TicketPlan {
  id: string;
  name: string;
  priceFull: number;
  priceHalf: number;
  taxFull: number;
  taxHalf: number;
  installmentsFull: string;
  installmentsHalf: string;
  includes: string[];
  isPopular?: boolean;
  badge?: string;
}
