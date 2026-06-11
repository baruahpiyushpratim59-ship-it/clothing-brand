export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory?: string;
  image: string;
  hoverImage?: string;
  description: string;
  details: string[];
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  itemPurchased?: string;
}
