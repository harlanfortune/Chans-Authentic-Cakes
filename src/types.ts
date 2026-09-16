export type CakeCategory = 
  | 'all'
  | 'wedding' 
  | 'birthday' 
  | 'celebration' 
  | 'novelty' 
  | 'chocolate' 
  | 'floral' 
  | 'cupcakes' 
  | 'bento'
  | 'anniversary';

export interface CakeDesign {
  id: string;
  title: string;
  category: Exclude<CakeCategory, 'all'>;
  tagline: string;
  description: string;
  imageUrl: string;
  servings: string;
  recommendedTiers: string;
  priceFrom: number;
  popular?: boolean;
  styleTags: string[];
  signatureFlavors: {
    sponge: string;
    filling: string;
  }[];
  leadTimeDays: number;
}

export interface AlbumPhoto {
  id: string;
  title: string;
  category: string;
  baseUrl: string;
  thumbnailUrl: string;
  previewUrl: string;
  fullUrl: string;
  width: number;
  height: number;
  timestamp: number;
  aspectRatio: number;
  isPortrait: boolean;
}

export interface CollectionCategory {
  id: string;
  title: string;
  categoryKey: CakeCategory;
  imageUrl: string;
  description: string;
  count?: number;
}

export interface OrderInquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  eventDate: string;
  servingsCount: number;
  selectedPhotoId?: string;
  selectedPhotoTitle?: string;
  selectedPhotoUrl?: string;
  flavorNotes: string;
  deliveryOption: 'pickup' | 'delivery';
  notes: string;
  createdAt: string;
}
