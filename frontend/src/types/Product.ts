export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  discount?: number;
  stock?: number;
  features?: string[]; 
  colors?: string[];
  details?: string;
  specifications?: { title: string; items: string[] }[];
}