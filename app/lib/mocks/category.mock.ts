import { PostStatus } from "~/types";
import type { Category, Posts } from "~/types";

export const categories: Category[] = [
  {
    id: '1',
    name: 'Politics',
    slug: 'politics',
    count: 124,
    subcategories: [
      { id: '1-1', name: 'Elections', slug: 'elections' },
      { id: '1-2', name: 'Governance', slug: 'governance' },
      { id: '1-3', name: 'Diplomacy', slug: 'diplomacy' },
      { id: '1-4', name: 'Policy', slug: 'policy' },
    ],
  },
  {
    id: '2',
    name: 'Business',
    slug: 'business',
    count: 89,
    subcategories: [
      { id: '2-1', name: 'Markets', slug: 'markets' },
      { id: '2-2', name: 'Startups', slug: 'startups' },
      { id: '2-3', name: 'Economy', slug: 'economy' },
      { id: '2-4', name: 'Trade', slug: 'trade' },
    ],
  },
  {
    id: '3',
    name: 'Technology',
    slug: 'technology',
    count: 156,
    subcategories: [
      { id: '3-1', name: 'Fintech', slug: 'fintech' },
      { id: '3-2', name: 'AI & Innovation', slug: 'ai-innovation' },
      { id: '3-3', name: 'Mobile', slug: 'mobile' },
      { id: '3-4', name: 'Cybersecurity', slug: 'cybersecurity' },
    ],
  },
  {
    id: '4',
    name: 'Sports',
    slug: 'sports',
    count: 203,
    subcategories: [
      { id: '4-1', name: 'Football', slug: 'football' },
      { id: '4-2', name: 'Athletics', slug: 'athletics' },
      { id: '4-3', name: 'Basketball', slug: 'basketball' },
      { id: '4-4', name: 'Cricket', slug: 'cricket' },
    ],
  },
  {
    id: '5',
    name: 'Entertainment',
    slug: 'entertainment',
    count: 178,
    subcategories: [
      { id: '5-1', name: 'Music', slug: 'music' },
      { id: '5-2', name: 'Film', slug: 'film' },
      { id: '5-3', name: 'Celebrities', slug: 'celebrities' },
      { id: '5-4', name: 'Events', slug: 'events' },
    ],
  },
  {
    id: '6',
    name: 'Health',
    slug: 'health',
    count: 67,
    subcategories: [
      { id: '6-1', name: 'Wellness', slug: 'wellness' },
      { id: '6-2', name: 'Medicine', slug: 'medicine' },
      { id: '6-3', name: 'Nutrition', slug: 'nutrition' },
    ],
  },
  {
    id: '7',
    name: 'Culture',
    slug: 'culture',
    count: 95,
    subcategories: [
      { id: '7-1', name: 'Fashion', slug: 'fashion' },
      { id: '7-2', name: 'Art', slug: 'art' },
      { id: '7-3', name: 'Heritage', slug: 'heritage' },
      { id: '7-4', name: 'Lifestyle', slug: 'lifestyle' },
    ],
  },
];

export const mockGetCategories = (): Category[] => {
  return categories;
}

export const mockGetCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
}

export const mockGetSubcategoryBySlug = (categorySlug: string, subcategorySlug: string): Category['subcategories'][0] | undefined => {
  const category = categories.find(category => category.slug === categorySlug);
  return category?.subcategories?.find(sub => sub.slug === subcategorySlug);
}