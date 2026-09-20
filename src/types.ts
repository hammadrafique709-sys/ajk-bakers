export type TabType = 'home' | 'cakes' | 'menu' | 'occasions' | 'contact';

export interface Product {
  id: string;
  name: string;
  category: 'cakes' | 'bakery' | 'snacks' | 'sweets' | 'beverages';
  price: number;
  rating: number;
  reviewsCount: number;
  tag?: 'SIGNATURE' | 'BESTSELLER' | 'MORNING OVEN' | 'MITHAI LUXURY' | 'LIMITED' | 'CHEF PICK';
  subtitle: string;
  description: string;
  image: string;
  altText: string;
  freshTime?: string;
  batchNumber?: string;
  isVegetarian?: boolean;
  portionOptions?: string[];
  allergens?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customization?: {
    size?: string;
    message?: string;
    instructions?: string;
  };
}

export interface CategoryInfo {
  id: 'all' | 'cakes' | 'bakery' | 'snacks' | 'sweets' | 'beverages';
  name: string;
  icon: string;
  description: string;
  itemCount: number;
  badgeColor: string;
}

export interface OccasionItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  actionText: string;
  highlights: string[];
  startingPrice: number;
}

export interface CustomCakeConfig {
  tier: 'single' | 'double' | 'triple' | 'bento';
  sizeWeight: string; // e.g., '2.0 lbs'
  baseFlavor: string;
  filling: string;
  frostingColor: string;
  inscription: string;
  shape: 'round' | 'heart' | 'square';
  referenceImagePreset?: string;
  customReferenceUrl?: string;
  deliveryDate: string;
  calculatedPrice: number;
}
