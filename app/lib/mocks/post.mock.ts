import { PostStatus } from "~/types";
import type { Category, Posts } from "~/types";

export const posts: Posts = [
  {
    id: '1',
    title: 'Africa\'s Tech Revolution: How Startups Are Reshaping the Continent',
    excerpt: 'From Lagos to Nairobi, a new generation of entrepreneurs is building the future of African technology.',
    content: 'The African tech ecosystem has witnessed unprecedented growth over the past decade. Young entrepreneurs across the continent are leveraging technology to solve uniquely African challenges, from mobile banking to healthcare delivery...',
    slug: 'africas-tech-revolution-how-startups-are-reshaping-the-continent',
    category: {
      id: '3',
      name: 'Technology',
      slug: 'technology'
    },
    subcategory: {
      id: '3-2',
      name: 'AI & Innovation',
      slug: 'ai-innovation'
    },
    author: {
      id: '1',
      name: 'Amara Okonkwo',
      role: 'Senior Tech Correspondent',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
    },
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    views: 15420,
    trending: true,
    hotTopic: true,
    status: PostStatus.PUBLISHED,
    tags: ['Innovation', 'Startups', 'Economy'],
  },
  {
    id: '2',
    title: 'The Rise of Afrobeats: How African Music Conquered the World',
    excerpt: 'Nigerian and Ghanaian artists are dominating global charts, bringing African sounds to every corner of the planet.',
    content: 'What started in the clubs of Lagos has become a global phenomenon. Afrobeats has transcended borders, with artists like Burna Boy, Wizkid, and Tems becoming household names worldwide...',
    slug: 'the-rise-of-afrobeats-how-african-music-conquered-the-world',
    category: {
      id: '5',
      name: 'Entertainment',
      slug: 'entertainment'
    },
    subcategory: {
      id: '5-1',
      name: 'Music',
      slug: 'music'
    },
    author: {
      id: '2',
      name: 'Amina Yusuf',
      role: 'Entertainment Editor',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800'
    },
    date: '2024-01-14',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    views: 28340,
    trending: true,
    hotTopic: true,
    status: PostStatus.PUBLISHED,
    tags: ['Music', 'Breaking News'],
    externalUrl: 'https://www.example.com/the-rise-of-afrobeats-how-african-music-conquered-the-world'
  },
  {
    id: '3',
    title: 'Economic Summit: African Leaders Unite for Continental Free Trade',
    excerpt: 'The African Continental Free Trade Area promises to transform intra-African commerce and boost GDP growth.',
    content: 'Leaders from across the continent gathered this week to discuss the implementation of the African Continental Free Trade Area (AfCFTA). This landmark agreement aims to create the world\'s largest free trade area...',
    slug: 'economic-summit-african-leaders-unite-for-continental-free-trade',
    category: {
      id: '1',
      name: 'Politics',
      slug: 'politics'
    },
    subcategory: {
      id: '1-2',
      name: 'Diplomacy',
      slug: 'diplomacy'
    },
    author: {
      id: '3',
      name: 'Fatima Al-Hassan',
      role: 'Political Correspondent',
      avatar: 'https://images.unsplash.com/photo-1544037986-9e2c0c0f8c7f?w=800'
    },
    date: '2024-01-13',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    views: 9870,
    trending: true,
    status: PostStatus.PUBLISHED,
    tags: ['Economy', 'Elections'],
  },
  {
    id: '4',
    title: 'African Cup of Nations: Teams to Watch This Year',
    excerpt: 'As the tournament approaches, we analyze the strongest contenders for continental glory.',
    content: 'The African Cup of Nations returns with all the drama and excitement fans have come to expect. With stars from Europe\'s top leagues returning to represent their nations...',
    slug: 'african-cup-of-nations-teams-to-watch-this-year',
    category: {
      id: '4',
      name: 'Sports',
      slug: 'sports'
    },
    subcategory: {
      id: '4-1',
      name: 'Football',
      slug: 'football'
    },
    author: {
      id: '4',
      name: 'Samuel Eto\'o Jr',
      role: 'Sports Correspondent',
      avatar: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'
    },
    date: '2024-01-12',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    views: 45230,
    trending: true,
    hotTopic: true,
    status: PostStatus.PUBLISHED,
    tags: ['Football', 'Breaking News'],
    externalUrl: 'https://www.example.com/african-cup-of-nations-teams-to-watch-this-year'
  },
  {
    id: '5',
    title: 'Sustainable Fashion: African Designers Leading the Green Revolution',
    excerpt: 'From traditional textiles to modern sustainability, African fashion is setting global trends.',
    content: 'African designers are at the forefront of the sustainable fashion movement, combining traditional techniques with modern eco-friendly practices...',
    slug: 'sustainable-fashion-african-designers-leading-the-green-revolution',
    category: {
      id: '2',
      name: 'Culture',
      slug: 'culture'
    },
    subcategory: {
      id: '2-1',
      name: 'Fashion',
      slug: 'fashion'
    },
    author: {
      id: '5',
      name: 'Lara Mensah',
      role: 'Culture Editor',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800'
    },
    date: '2024-01-11',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
    views: 12450,
    status: PostStatus.PUBLISHED,
    tags: ['Climate', 'Innovation'],
  },
  {
    id: '6',
    title: 'Fintech Boom: Mobile Money Transforms Rural Banking',
    excerpt: 'How digital financial services are reaching millions of unbanked Africans.',
    content: 'Mobile money has revolutionized financial inclusion across Africa. What started in Kenya with M-Pesa has spread across the continent...',
    slug: 'fintech-boom-mobile-money-transforms-rural-banking',
    category: {
      id: '3',
      name: 'Business',
      slug: 'business'
    },
    subcategory: {
      id: '3-1',
      name: 'Startups',
      slug: 'startups'
    },
    author: {
      id: '6',
      name: 'Kwame Nkrumah',
      role: 'Business Analyst',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800'
    },
    date: '2024-01-10',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    views: 8920,
    status: PostStatus.DRAFT,
    tags: ['Startups', 'Economy', 'Innovation'],
    externalUrl: 'https://www.example.com/fintech-boom-mobile-money-transforms-rural-banking'
  },
  {
    id: '7',
    title: 'Health Innovation: New Malaria Vaccine Shows Promising Results',
    excerpt: 'Clinical trials across multiple African countries report unprecedented efficacy rates.',
    content: 'A new malaria vaccine developed through African-led research has shown remarkable results in clinical trials conducted across the continent...',
    slug: 'health-innovation-new-malaria-vaccine-shows-promising-results',
    category: {
      id: '6',
      name: 'Health',
      slug: 'health'
    },
    subcategory: {
      id: '6-1',
      name: 'Medicine',
      slug: 'medicine'
    },
    author: {
      id: '7',
      name: 'Dr. Grace Nkrumah',
      role: 'Medical Researcher',
      avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800'
    },
    date: '2024-01-09',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    views: 18760,
    status: PostStatus.DRAFT,
    tags: ['Healthcare', 'Innovation', 'Breaking News'],
  },
  {
    id: '8',
    title: 'Renewable Energy: Solar Farms Power Economic Growth',
    excerpt: 'African nations invest heavily in solar infrastructure to meet growing energy demands.',
    content: 'With abundant sunshine and growing energy needs, African countries are turning to solar power as a sustainable solution...',
    slug: 'renewable-energy-solar-farms-power-economic-growth',
    category: {
      id: '7',
      name: 'Technology',
      slug: 'technology'
    },
    subcategory: {
      id: '7-1',
      name: 'AI & Innovation',
      slug: 'ai-innovation'
    },
    author: {
      id: '8',
      name: 'Emmanuel Obi',
      role: 'Technology Correspondent',
      avatar: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800'
    },
    date: '2024-01-08',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    views: 7650,
    status: PostStatus.PUBLISHED,
    tags: ['Climate', 'Infrastructure', 'Economy'],
    externalUrl: 'https://www.example.com/renewable-energy-solar-farms-power-economic-growth'
  },
];

interface getPostsParams {
  category?: string;
  subcategory?: string;
  trending?: boolean;
  hotTopic?: boolean;
  status?: PostStatus;
}
export const mockGetPosts = (params: getPostsParams): Posts => {
  return posts.filter(post => {
    let isValid = true;
    if (params.category && post.category.id !== params.category) {
      isValid = false;
    }
    if (params.subcategory && post.subcategory.id !== params.subcategory) {
      isValid = false;
    }
    if (params.trending !== undefined && post.trending !== params.trending) {
      isValid = false;
    }
    if (params.hotTopic !== undefined && post.hotTopic !== params.hotTopic) {
      isValid = false;
    }
    if (params.status && post.status !== params.status) {
      isValid = false;
    }
    return isValid;
  });
};

export const getPost = (slug: string) => {
 const post = posts.find((p) => String(p.slug) === slug);
 if(!post) return null;
 let relatedPosts: Posts = posts
    .filter((p) => String(p.slug) !== slug && p.category === post?.category)
    .slice(0, 3)
 return {
  post, relatedPosts
 }
}