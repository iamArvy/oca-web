import type { TPosts } from "~/types";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  views: number;
  trending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export const categories: Category[] = [
  { id: '1', name: 'Politics', slug: 'politics', count: 124 },
  { id: '2', name: 'Business', slug: 'business', count: 89 },
  { id: '3', name: 'Technology', slug: 'technology', count: 156 },
  { id: '4', name: 'Sports', slug: 'sports', count: 203 },
  { id: '5', name: 'Entertainment', slug: 'entertainment', count: 178 },
  { id: '6', name: 'Health', slug: 'health', count: 67 },
  { id: '7', name: 'Culture', slug: 'culture', count: 95 },
];

export const posts: TPosts = [
  {
    id: '1',
    title: "Africa's Tech Revolution: How Startups Are Reshaping the Continent",
    slug: "africas-tech-revolution-how-startups-are-reshaping-the-continent",
    excerpt: 'From Lagos to Nairobi, a new generation of entrepreneurs is building the future of African technology.',
    content: 'The African tech ecosystem has witnessed unprecedented growth over the past decade. Young entrepreneurs across the continent are leveraging technology to solve uniquely African challenges, from mobile banking to healthcare delivery...',
    category: 'Technology',
    author: 'Amara Okonkwo',
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    views: 15420,
    trending: true,
  },
  {
    id: '2',
    title: 'The Rise of Afrobeats: How African Music Conquered the World',
    slug: 'the-rise-of-afrobeats-how-african-music-conquered-the-world',
    excerpt: 'Nigerian and Ghanaian artists are dominating global charts, bringing African sounds to every corner of the planet.',
    content: 'What started in the clubs of Lagos has become a global phenomenon. Afrobeats has transcended borders, with artists like Burna Boy, Wizkid, and Tems becoming household names worldwide...',
    category: 'Entertainment',
    author: 'Kofi Mensah',
    date: '2024-01-14',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    views: 28340,
    trending: true,
  },
  {
    id: '3',
    title: 'Economic Summit: African Leaders Unite for Continental Free Trade',
    slug: 'economic-summit-african-leaders-unite-for-continental-free-trade',
    excerpt: 'The African Continental Free Trade Area promises to transform intra-African commerce and boost GDP growth.',
    content: 'Leaders from across the continent gathered this week to discuss the implementation of the African Continental Free Trade Area (AfCFTA). This landmark agreement aims to create the world\'s largest free trade area...',
    category: 'Politics',
    author: 'Fatima Al-Hassan',
    date: '2024-01-13',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    views: 9870,
    trending: true,
  },
  {
    id: '4',
    title: 'African Cup of Nations: Teams to Watch This Year',
    slug: 'african-cup-of-nations-teams-to-watch-this-year',
    excerpt: 'As the tournament approaches, we analyze the strongest contenders for continental glory.',
    content: 'The African Cup of Nations returns with all the drama and excitement fans have come to expect. With stars from Europe\'s top leagues returning to represent their nations...',
    category: 'Sports',
    author: "Samuel Eto'o Jr",
    date: '2024-01-12',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    views: 45230,
    trending: true,
  },
  {
    id: '5',
    title: 'Sustainable Fashion: African Designers Leading the Green Revolution',
    slug: 'sustainable-fashion-african-designers-leading-the-green-revolution',
    excerpt: 'From traditional textiles to modern sustainability, African fashion is setting global trends.',
    content: 'African designers are at the forefront of the sustainable fashion movement, combining traditional techniques with modern eco-friendly practices...',
    category: 'Culture',
    author: 'Zainab Diallo',
    date: '2024-01-11',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
    views: 12450,
  },
  {
    id: '6',
    title: 'Fintech Boom: Mobile Money Transforms Rural Banking',
    slug: 'fintech-boom-mobile-money-transforms-rural-banking',
    excerpt: 'How digital financial services are reaching millions of unbanked Africans.',
    content: 'Mobile money has revolutionized financial inclusion across Africa. What started in Kenya with M-Pesa has spread across the continent...',
    category: 'Business',
    author: 'David Kimani',
    date: '2024-01-10',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    views: 8920,
  },
  {
    id: '7',
    title: 'Health Innovation: New Malaria Vaccine Shows Promising Results',
    slug: 'health-innovation-new-malaria-vaccine-shows-promising-results',
    excerpt: 'Clinical trials across multiple African countries report unprecedented efficacy rates.',
    content: 'A new malaria vaccine developed through African-led research has shown remarkable results in clinical trials conducted across the continent...',
    category: 'Health',
    author: 'Dr. Grace Nkrumah',
    date: '2024-01-09',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    views: 18760,
  },
  {
    id: '8',
    title: 'Renewable Energy: Solar Farms Power Economic Growth',
    slug: 'renewable-energy-solar-farms-power-economic-growth',
    excerpt: 'African nations invest heavily in solar infrastructure to meet growing energy demands.',
    content: 'With abundant sunshine and growing energy needs, African countries are turning to solar power as a sustainable solution...',
    category: 'Technology',
    author: 'Emmanuel Obi',
    date: '2024-01-08',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    views: 7650,
  },
];

export const getPost = (slug: string) => {
 const post = posts.find((p) => String(p.slug) === slug);
 if(!post) return null;
 let relatedPosts: TPosts = posts
    .filter((p) => String(p.slug) !== slug && p.category === post?.category)
    .slice(0, 3)
 return {
  post, relatedPosts
 }
}

export const analyticsData = {
  totalVisits: 1250000,
  registeredUsers: 45230,
  postsPublished: 892,
  submittedPosts: 156,
  visitsVsVisitors: [
    { name: 'Mon', visits: 4000, visitors: 2400 },
    { name: 'Tue', visits: 3000, visitors: 1398 },
    { name: 'Wed', visits: 2000, visitors: 9800 },
    { name: 'Thu', visits: 2780, visitors: 3908 },
    { name: 'Fri', visits: 1890, visitors: 4800 },
    { name: 'Sat', visits: 2390, visitors: 3800 },
    { name: 'Sun', visits: 3490, visitors: 4300 },
  ],
  browserUsage: [
    { name: 'Chrome', value: 45, fill: 'hsl(var(--primary))' },
    { name: 'Safari', value: 25, fill: 'hsl(var(--accent))' },
    { name: 'Firefox', value: 15, fill: 'hsl(var(--secondary))' },
    { name: 'Edge', value: 10, fill: 'hsl(var(--muted))' },
    { name: 'Other', value: 5, fill: 'hsl(var(--border))' },
  ],
  popularCategories: [
    { name: 'Sports', posts: 203, color: 'bg-primary' },
    { name: 'Entertainment', posts: 178, color: 'bg-accent' },
    { name: 'Technology', posts: 156, color: 'bg-secondary' },
    { name: 'Politics', posts: 124, color: 'bg-gold' },
    { name: 'Culture', posts: 95, color: 'bg-terracotta' },
  ],
};
