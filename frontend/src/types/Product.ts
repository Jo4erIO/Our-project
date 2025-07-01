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
  specifications?: { 
    title: string; 
    items: string[] 
  }[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
  discount?: number;
}