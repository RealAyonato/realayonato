import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Filter, 
  X, 
  Grid, 
  LayoutGrid, 
  Sparkles, 
  Palette, 
  Zap,
  ChevronDown,
  ChevronUp,
  Loader,
  Search,
  ExternalLink,
  Star,
  Trophy,
  Clock,
  Heart,
  Award,
  TrendingUp,
  Check,
  Eye,
  Download,
  ArrowUpRight,
  Calendar,
  Users,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/ui/button";
import Card from "../components/ui/card";
import LazyImage from "../components/ui/lazyImage";
import { SiDiscord, SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: 'thumbnail' | 'gfx' | 'banner' | 'position';
  width: number;
  height: number;
  aspectRatio: string;
  type: 'thumbnail' | 'gfx' | 'banner' | 'position';
  details: string;
  client?: string;
  tags: string[];
  likes: number;
  views: number;
  featured: boolean;
  date: string;
}

const allPortfolioImages: PortfolioImage[] = [
  // Thumbnails (8 صور)
  {
    id: 1,
    src: "https://i.ibb.co/yFf3QtXs/md7-update-29-v2.png",
    alt: "MD7 Game Update Thumbnail",
    title: "MD7 Major Update",
    category: 'thumbnail',
    type: 'thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: "16:9",
    details: "High-impact thumbnail for major game update announcement. Features dynamic lighting, custom typography, and strategic color psychology to maximize click-through rate.",
    client: "Gaming Studio",
    tags: ["Gaming", "Update", "Action", "Dynamic", "3D", "Cinematic"],
    likes: 245,
    views: 12500,
    featured: true,
    date: "2024-03-15"
  },
  {
    id: 2,
    src: "https://i.ibb.co/cKQc54qW/onix-new-fruits.png",
    alt: "Onix Fruits Thumbnail",
    title: "Onix Fruits Update",
    category: 'thumbnail',
    type: 'thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: "16:9",
    details: "Vibrant thumbnail showcasing new in-game content. Utilizes complementary colors and clear visual hierarchy to highlight key features.",
    client: "Onix Games",
    tags: ["Roblox", "Fruits", "Colorful", "Update", "Vibrant", "Game"],
    likes: 189,
    views: 9800,
    featured: true,
    date: "2024-02-28"
  },
  {
    id: 3,
    src: "https://i.ibb.co/yFSQJy3y/takzo-christmas-event.png",
    alt: "Christmas Event Thumbnail",
    title: "Holiday Event",
    category: 'thumbnail',
    type: 'thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: "16:9",
    details: "Seasonal thumbnail design for limited-time holiday event. Features festive color palette and thematic elements to drive engagement.",
    client: "Takzo Games",
    tags: ["Holiday", "Event", "Festive", "Limited", "Seasonal", "Christmas"],
    likes: 312,
    views: 18700,
    featured: false,
    date: "2023-12-10"
  },
  {
    id: 4,
    src: "https://i.ibb.co/7JJq8Dgy/Takzo-fruits-rework.png",
    alt: "Game Rework Thumbnail",
    title: "Game Overhaul",
    category: 'thumbnail',
    type: 'thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: "16:9",
    details: "Announcement thumbnail for significant game rework. Uses before/after visual cues and bold typography to communicate major changes.",
    client: "Takzo Games",
    tags: ["Rework", "Update", "Comparison", "Bold", "Modern", "Gaming"],
    likes: 167,
    views: 8900,
    featured: false,
    date: "2024-01-22"
  },
  {
    id: 5,
    src: "https://i.ibb.co/1YmTmMzD/wasimox-buddha-awake.png",
    alt: "Mythological Thumbnail",
    title: "Mythological Awakening",
    category: 'thumbnail',
    type: 'thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: "16:9",
    details: "Mythology-inspired thumbnail with dramatic lighting and symbolic imagery to create intrigue and curiosity.",
    client: "Wasimox Channel",
    tags: ["Mythology", "Dramatic", "Symbolic", "Mysterious", "Artistic", "Epic"],
    likes: 421,
    views: 23400,
    featured: true,
    date: "2024-03-05"
  },
  {
    id: 6,
    src: "https://i.ibb.co/CpJhkDqF/wasimox-reaching-level-max.png",
    alt: "Achievement Thumbnail",
    title: "Level Max Achievement",
    category: 'thumbnail',
    type: 'thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: "16:9",
    details: "Celebratory thumbnail design for major gaming achievement milestone. Uses golden accents and victory-themed elements.",
    client: "Wasimox Channel",
    tags: ["Achievement", "Milestone", "Golden", "Victory", "Celebration", "Gaming"],
    likes: 289,
    views: 15600,
    featured: false,
    date: "2024-02-14"
  },
  {
    id: 7,
    src: "https://i.ibb.co/tT69rrxz/dragon-10k.png",
    alt: "10K Milestone Thumbnail",
    title: "10K Subscriber Special",
    category: 'thumbnail',
    type: 'thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: "16:9",
    details: "Milestone celebration thumbnail with detailed dragon artwork and celebratory elements.",
    client: "Dragon Channel",
    tags: ["Milestone", "Celebration", "Dragon", "Special", "Anniversary", "YouTube"],
    likes: 534,
    views: 29800,
    featured: true,
    date: "2024-01-30"
  },
  {
    id: 8,
    src: "https://i.ibb.co/BVQfjvcB/onix-dark-leaks.png",
    alt: "Dark Theme Thumbnail",
    title: "Dark Leaks Teaser",
    category: 'thumbnail',
    type: 'thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: "16:9",
    details: "Dark themed teaser thumbnail with atmospheric lighting and mysterious elements to build anticipation.",
    client: "Onix Games",
    tags: ["Dark", "Teaser", "Mysterious", "Atmospheric", "Mystery", "Leak"],
    likes: 198,
    views: 11200,
    featured: false,
    date: "2024-02-05"
  },
  
  // GFX Designs (6 صور)
  {
    id: 9,
    src: "https://i.ibb.co/qLNc7SvS/1681665482917.jpg",
    alt: "Professional Gaming Logo",
    title: "Esports Team Logo",
    category: 'gfx',
    type: 'gfx',
    width: 800,
    height: 800,
    aspectRatio: "1:1",
    details: "Modern esports logo design for competitive gaming team. Combines aggressive typography with symbolic imagery to create memorable brand identity.",
    client: "Professional Esports",
    tags: ["Logo", "Esports", "Modern", "Branding", "Team", "Professional"],
    likes: 156,
    views: 8700,
    featured: true,
    date: "2024-03-10"
  },
  {
    id: 10,
    src: "https://i.ibb.co/bMm9hFMP/dragon-logo.jpg",
    alt: "Dragon Logo GFX",
    title: "Dragon Logo",
    category: 'gfx',
    type: 'gfx',
    width: 800,
    height: 800,
    aspectRatio: "1:1",
    details: "Detailed dragon logo with intricate line work and metallic effects. Perfect for fantasy gaming brands and streamers.",
    client: "Fantasy Gaming",
    tags: ["Logo", "Dragon", "Fantasy", "Detailed", "Mythical", "Icon"],
    likes: 278,
    views: 14500,
    featured: true,
    date: "2024-02-20"
  },
  {
    id: 11,
    src: "https://i.ibb.co/q37kPd6q/ALPHA-GFX-Copy.jpg",
    alt: "Alpha GFX Logo",
    title: "Alpha GFX Logo",
    category: 'gfx',
    type: 'gfx',
    width: 800,
    height: 800,
    aspectRatio: "1:1",
    details: "Modern GFX studio logo with clean typography and symbolic elements representing creativity and technology.",
    client: "Alpha GFX Studio",
    tags: ["Logo", "Studio", "Modern", "Clean", "Creative", "Brand"],
    likes: 134,
    views: 7200,
    featured: false,
    date: "2024-01-15"
  },
  {
    id: 12,
    src: "https://i.ibb.co/PsRvK6qN/yaso-gfx.jpg",
    alt: "Yaso GFX Logo",
    title: "Yaso GFX Logo",
    category: 'gfx',
    type: 'gfx',
    width: 800,
    height: 800,
    aspectRatio: "1:1",
    details: "Streamer brand logo with custom typography and character integration for personal branding.",
    client: "Yaso Gaming",
    tags: ["Logo", "Streamer", "Branding", "Typography", "Personal", "Channel"],
    likes: 189,
    views: 9800,
    featured: false,
    date: "2024-01-25"
  },
  {
    id: 13,
    src: "https://i.ibb.co/21qWKBQL/mine.jpg",
    alt: "Profile Logo",
    title: "Profile Logo",
    category: 'gfx',
    type: 'gfx',
    width: 800,
    height: 800,
    aspectRatio: "1:1",
    details: "Personal brand logo with modern design elements and custom iconography representing digital creativity.",
    tags: ["Logo", "Profile", "Personal", "Modern", "Digital", "Identity"],
    likes: 245,
    views: 13200,
    featured: true,
    date: "2024-03-01"
  },
  {
    id: 14,
    src: "https://i.ibb.co/chfqgx9D/money-chest.png",
    alt: "Money Chest GFX",
    title: "Treasure Chest GFX",
    category: 'gfx',
    type: 'gfx',
    width: 800,
    height: 800,
    aspectRatio: "1:1",
    details: "Treasure chest graphic design with detailed texture work, realistic lighting effects, and golden accents.",
    tags: ["Treasure", "Chest", "Graphic", "Detailed", "Gold", "Wealth"],
    likes: 167,
    views: 8900,
    featured: false,
    date: "2024-02-08"
  },
  
  // Banners (4 صور - أكبر حجماً)
  {
    id: 15,
    src: "https://i.ibb.co/yc837Y7q/image.png",
    alt: "Modern Banner Design",
    title: "Professional Banner",
    category: 'banner',
    type: 'banner',
    width: 1920,
    height: 1080,
    aspectRatio: "16:9",
    details: "Modern YouTube banner design with balanced composition, brand elements, and strategic placement for optimal visibility across all devices.",
    client: "Content Creator",
    tags: ["Banner", "YouTube", "Modern", "Professional", "Channel", "Header"],
    likes: 312,
    views: 16700,
    featured: true,
    date: "2024-03-12"
  },
  {
    id: 16,
    src: "https://i.ibb.co/1t5s7Pkf/yaso-banner.jpg",
    alt: "Yaso Banner Design",
    title: "Gaming Channel Banner",
    category: 'banner',
    type: 'banner',
    width: 1920,
    height: 1080,
    aspectRatio: "16:9",
    details: "Dynamic gaming channel banner featuring 3D elements, vibrant colors, and clear channel branding for instant recognition.",
    client: "Yaso Gaming",
    tags: ["Banner", "Gaming", "3D", "Vibrant", "Dynamic", "Channel Art"],
    likes: 234,
    views: 12800,
    featured: false,
    date: "2024-02-18"
  },
  {
    id: 17,
    src: "https://i.ibb.co/kBHq3YfN/stream-banner.jpg",
    alt: "Stream Banner Design",
    title: "Live Stream Banner",
    category: 'banner',
    type: 'banner',
    width: 1920,
    height: 1080,
    aspectRatio: "16:9",
    details: "Live streaming overlay banner with animated elements, clear information hierarchy, and professional layout design.",
    client: "Twitch Streamer",
    tags: ["Banner", "Stream", "Overlay", "Animated", "Twitch", "Live"],
    likes: 189,
    views: 10500,
    featured: false,
    date: "2024-01-30"
  },
  {
    id: 18,
    src: "https://i.ibb.co/5RL8B9sT/social-media-banner.jpg",
    alt: "Social Media Banner",
    title: "Social Media Banner",
    category: 'banner',
    type: 'banner',
    width: 1920,
    height: 1080,
    aspectRatio: "16:9",
    details: "Social media header banner with responsive design, platform-specific optimizations, and engaging visual elements.",
    client: "Brand Account",
    tags: ["Banner", "Social Media", "Header", "Responsive", "Brand", "Profile"],
    likes: 156,
    views: 8400,
    featured: true,
    date: "2024-02-25"
  },
  
  // Positions (6 صور)
  {
    id: 19,
    src: "https://i.ibb.co/T3rb7P1/suf.png",
    alt: "3D Character Render",
    title: "Character Position",
    category: 'position',
    type: 'position',
    width: 1200,
    height: 1600,
    aspectRatio: "3:4",
    details: "Professional 3D character render showcasing detailed modeling, realistic texture work, and cinematic lighting for promotional content.",
    client: "Game Studio",
    tags: ["3D", "Character", "Render", "Cinematic", "Model", "Art"],
    likes: 421,
    views: 22300,
    featured: true,
    date: "2024-03-08"
  },
  {
    id: 20,
    src: "https://i.ibb.co/v61bR1xz/abdelmourit1.png",
    alt: "Portrait Position Design",
    title: "Character Portrait",
    category: 'position',
    type: 'position',
    width: 1200,
    height: 1600,
    aspectRatio: "3:4",
    details: "Character portrait position with professional lighting setup, detailed background elements, and expressive character design.",
    client: "Content Creator",
    tags: ["Portrait", "Character", "Profile", "Social Media", "Art", "Digital"],
    likes: 278,
    views: 15600,
    featured: false,
    date: "2024-02-15"
  },
  {
    id: 21,
    src: "https://i.ibb.co/tT69rrxz/dragon-10k.png",
    alt: "10K Position Design",
    title: "10K Position Art",
    category: 'position',
    type: 'position',
    width: 1200,
    height: 1600,
    aspectRatio: "3:4",
    details: "Milestone position artwork celebrating 10K subscribers with detailed illustration, effects, and celebratory elements.",
    client: "Dragon Channel",
    tags: ["Milestone", "Artwork", "Position", "Celebration", "Anniversary", "Special"],
    likes: 356,
    views: 18900,
    featured: true,
    date: "2024-01-28"
  },
  {
    id: 22,
    src: "https://i.ibb.co/chfqgx9D/money-chest.png",
    alt: "Treasure Position",
    title: "Treasure Position",
    category: 'position',
    type: 'position',
    width: 1200,
    height: 1600,
    aspectRatio: "3:4",
    details: "Treasure chest position design with detailed modeling, environmental integration, and realistic material rendering.",
    tags: ["Treasure", "Chest", "Position", "Detailed", "3D", "Wealth"],
    likes: 189,
    views: 10200,
    featured: false,
    date: "2024-02-10"
  },
  {
    id: 23,
    src: "https://i.ibb.co/BVQfjvcB/onix-dark-leaks.png",
    alt: "Dark Position Design",
    title: "Dark Leaks Position",
    category: 'position',
    type: 'position',
    width: 1200,
    height: 1600,
    aspectRatio: "3:4",
    details: "Dark themed position artwork with atmospheric lighting, mysterious elements, and dramatic composition.",
    client: "Onix Games",
    tags: ["Dark", "Artwork", "Position", "Atmospheric", "Mysterious", "Dramatic"],
    likes: 245,
    views: 13400,
    featured: false,
    date: "2024-02-22"
  },
  {
    id: 24,
    src: "https://i.ibb.co/MyS4bNkh/yaso-dragon.png",
    alt: "Dragon Position Art",
    title: "Dragon Position",
    category: 'position',
    type: 'position',
    width: 1200,
    height: 1600,
    aspectRatio: "3:4",
    details: "Dragon themed position design with detailed creature modeling, dynamic composition, and epic fantasy atmosphere.",
    client: "Yaso Gaming",
    tags: ["Dragon", "Position", "Artwork", "Creature", "Fantasy", "Epic"],
    likes: 312,
    views: 16700,
    featured: true,
    date: "2024-03-05"
  }
];

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'thumbnail' | 'gfx' | 'banner' | 'position' | 'featured'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'likes' | 'views'>('newest');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // جلب جميع الوسوم الفريدة
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allPortfolioImages.forEach(image => {
      image.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, []);

  // تصفية الصور بناء على الفلاتر والبحث والترتيب
  const filteredImages = useMemo(() => {
    let filtered = allPortfolioImages;
    
    // تصفية حسب النوع
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'featured') {
        filtered = filtered.filter(img => img.featured);
      } else {
        filtered = filtered.filter(img => img.type === selectedFilter);
      }
    }
    
    // تصفية حسب الوسوم النشطة
    if (activeTags.length > 0) {
      filtered = filtered.filter(img => 
        activeTags.every(tag => img.tags.includes(tag))
      );
    }
    
    // تصفية حسب البحث
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(query) ||
        img.tags.some(tag => tag.toLowerCase().includes(query)) ||
        img.client?.toLowerCase().includes(query) ||
        img.details.toLowerCase().includes(query)
      );
    }
    
    // الترتيب
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popular':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [selectedFilter, searchQuery, sortBy, activeTags]);

  // الصور المعروضة حالياً
  const displayedImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount);
  }, [filteredImages, visibleCount]);

  // تحميل المزيد من الصور
  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 12, filteredImages.length));
      setLoading(false);
    }, 500);
  }, [filteredImages.length]);

  // إعادة التعيين
  const resetFilters = useCallback(() => {
    setSelectedFilter('all');
    setSearchQuery('');
    setActiveTags([]);
    setSortBy('newest');
    setVisibleCount(12);
  }, []);

  // تفاصيل الصورة
  const openImageDetail = useCallback((image: PortfolioImage) => {
    setSelectedImage(image);
  }, []);

  // إحصائيات
  const stats = useMemo(() => ({
    total: allPortfolioImages.length,
    thumbnails: allPortfolioImages.filter(img => img.type === 'thumbnail').length,
    gfx: allPortfolioImages.filter(img => img.type === 'gfx').length,
    banners: allPortfolioImages.filter(img => img.type === 'banner').length,
    positions: allPortfolioImages.filter(img => img.type === 'position').length,
    featured: allPortfolioImages.filter(img => img.featured).length,
    totalLikes: allPortfolioImages.reduce((sum, img) => sum + img.likes, 0),
    totalViews: allPortfolioImages.reduce((sum, img) => sum + img.views, 0),
  }), []);

  // نوع القالب بناء على حجم الصورة
  const getGridClass = (type: string) => {
    switch (type) {
      case 'banner':
        return 'lg:col-span-2 lg:row-span-2';
      case 'position':
        return 'lg:row-span-2';
      default:
        return '';
    }
  };

  // إضافة/إزالة وسم
  const toggleTag = useCallback((tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  // تحويل التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // تحميل الصفحة من الأعلى
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* الهيدر */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Home</span>
            </Link>
            
            <div 
              className="text-xl md:text-2xl font-bold tracking-wider font-sans cursor-pointer hover:text-red-600 transition-colors"
              onClick={() => navigate('/')}
            >
              Ayonato<span className="text-red-600">.Design</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Trophy size={14} />
                  {stats.total} Projects
                </span>
                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                <span>{filteredImages.length} Filtered</span>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-red-600 transition-colors group"
              >
                <Filter size={18} />
                <span className="hidden sm:inline">Filters</span>
                {showFilters ? <ChevronUp size={18} className="group-hover:scale-110 transition-transform" /> : <ChevronDown size={18} className="group-hover:scale-110 transition-transform" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* قسم الفلاتر */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-900/50 border-b border-gray-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 md:px-6 py-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* شريط البحث */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      placeholder="Search projects by title, tags, or client..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* فلتر النوع */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Filter by Type
                  </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="featured">Featured Only</option>
                    <option value="thumbnail">Thumbnails</option>
                    <option value="gfx">GFX Designs</option>
                    <option value="banner">Banners</option>
                    <option value="position">Positions</option>
                  </select>
                </div>

                {/* ترتيب حسب */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="likes">Most Likes</option>
                    <option value="views">Most Views</option>
                  </select>
                </div>
              </div>

              {/* فلاتر سريعة */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedFilter === 'all'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Grid size={14} />
                  All ({stats.total})
                </button>
                <button
                  onClick={() => setSelectedFilter('featured')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedFilter === 'featured'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Star size={14} />
                  Featured ({stats.featured})
                </button>
                <button
                  onClick={() => setSelectedFilter('thumbnail')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedFilter === 'thumbnail'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <LayoutGrid size={14} />
                  Thumbnails ({stats.thumbnails})
                </button>
                <button
                  onClick={() => setSelectedFilter('gfx')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedFilter === 'gfx'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Sparkles size={14} />
                  GFX ({stats.gfx})
                </button>
                <button
                  onClick={() => setSelectedFilter('banner')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedFilter === 'banner'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Palette size={14} />
                  Banners ({stats.banners})
                </button>
                <button
                  onClick={() => setSelectedFilter('position')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedFilter === 'position'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Zap size={14} />
                  Positions ({stats.positions})
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-1.5 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30 hover:bg-red-600/30 transition-colors text-sm"
                  >
                    Reset Filters
                  </button>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{filteredImages.length}</div>
                    <div className="text-sm text-gray-400">Results</div>
                  </div>
                </div>
              </div>

              {/* الوسوم */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Popular Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 10).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        activeTags.includes(tag)
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 hover:border-red-600/30 transition-colors duration-300">
            <div className="text-xl md:text-2xl font-bold text-red-600 mb-1 flex items-center justify-center gap-2">
              <Trophy size={20} />
              {stats.total}
            </div>
            <div className="text-gray-400 text-sm">Total Projects</div>
          </Card>
          <Card className="text-center p-4 hover:border-red-600/30 transition-colors duration-300">
            <div className="text-xl md:text-2xl font-bold text-red-600 mb-1 flex items-center justify-center gap-2">
              <Heart size={20} />
              {stats.totalLikes.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Total Likes</div>
          </Card>
          <Card className="text-center p-4 hover:border-red-600/30 transition-colors duration-300">
            <div className="text-xl md:text-2xl font-bold text-red-600 mb-1 flex items-center justify-center gap-2">
              <Eye size={20} />
              {stats.totalViews.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Total Views</div>
          </Card>
          <Card className="text-center p-4 hover:border-red-600/30 transition-colors duration-300">
            <div className="text-xl md:text-2xl font-bold text-red-600 mb-1 flex items-center justify-center gap-2">
              <Target size={20} />
              {stats.featured}
            </div>
            <div className="text-gray-400 text-sm">Featured Projects</div>
          </Card>
        </div>

        {/* عرض النتائج */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">
            {selectedFilter === 'all' ? 'All Portfolio Projects' : 
             selectedFilter === 'featured' ? 'Featured Projects' :
             selectedFilter === 'thumbnail' ? 'Thumbnail Designs' :
             selectedFilter === 'gfx' ? 'GFX Designs' :
             selectedFilter === 'banner' ? 'Banner Designs' : 'Position Designs'}
          </h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-gray-400">
              Showing {displayedImages.length} of {filteredImages.length} projects
              {searchQuery && ` for "${searchQuery}"`}
              {activeTags.length > 0 && ` with ${activeTags.length} tag${activeTags.length > 1 ? 's' : ''}`}
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock size={14} />
              <span>Sorted by {sortBy === 'newest' ? 'newest' : sortBy === 'popular' ? 'popularity' : sortBy}</span>
            </div>
          </div>
        </div>

        {/* شبكة الصور */}
        {displayedImages.length === 0 ? (
          <Card className="text-center py-12 hover:border-red-600/30 transition-colors duration-300">
            <div className="text-gray-400 mb-4 text-lg">No projects found matching your criteria</div>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search terms to see more results.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
            >
              <X size={18} />
              Reset All Filters
            </button>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
              {displayedImages.map((image) => (
                <motion.div
                  key={image.id}
                  className={`group cursor-pointer ${getGridClass(image.type)}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  onClick={() => openImageDetail(image)}
                  layout
                >
                  <div className={`rounded-xl overflow-hidden border-2 border-red-600/30 bg-gray-900 relative ${
                    image.type === 'banner' 
                      ? 'aspect-[16/9]' 
                      : image.type === 'position'
                      ? 'aspect-[3/4]'
                      : 'aspect-square'
                  }`}>
                    {image.featured && (
                      <div className="absolute top-2 left-2 z-20">
                        <div className="px-2 py-1 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs rounded-full flex items-center gap-1">
                          <Star size={10} />
                          Featured
                        </div>
                      </div>
                    )}
                    
                    <LazyImage
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-medium text-lg mb-2">{image.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30">
                            {image.type.toUpperCase()}
                          </span>
                          <span className="text-gray-300 text-xs">
                            {image.width}×{image.height}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3 text-xs">
                          <div className="flex items-center gap-1 text-gray-300">
                            <Heart size={12} />
                            {image.likes.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-gray-300">
                            <Eye size={12} />
                            {image.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-gray-300">
                            <Calendar size={12} />
                            {formatDate(image.date)}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {image.tags.slice(0, 3).map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 bg-gray-800/70 text-gray-300 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {image.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-800/70 text-gray-300 text-xs rounded">
                              +{image.tags.length - 3}
                            </span>
                          )}
                        </div>
                        
                        {image.client && (
                          <p className="text-gray-400 text-sm truncate">
                            Client: {image.client}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white truncate">{image.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-red-400 text-xs flex items-center gap-1">
                            {image.type === 'thumbnail' ? 'Thumbnail' :
                             image.type === 'gfx' ? 'GFX Design' :
                             image.type === 'banner' ? 'Banner' : 'Position'}
                          </span>
                          <span className="text-gray-500 text-xs">•</span>
                          <span className="text-gray-500 text-xs">
                            {image.aspectRatio}
                          </span>
                        </div>
                      </div>
                      {image.featured && (
                        <Star size={14} className="text-yellow-500 mt-1" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* زر تحميل المزيد */}
            {visibleCount < filteredImages.length && (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 group"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Projects
                      <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
                <p className="text-gray-500 text-sm mt-2">
                  Showing {visibleCount} of {filteredImages.length} projects • {filteredImages.length - visibleCount} more available
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* مودال تفاصيل الصورة */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* الهيدر */}
              <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
                <div>
                  <h3 className="text-2xl font-medium text-white">{selectedImage.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-gray-400 text-sm">{selectedImage.client || "Private Project"}</p>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} />
                      <span className="text-sm">{selectedImage.likes.toLocaleString()} likes</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* المحتوى */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="p-6">
                  {/* الصورة */}
                  <div className="rounded-xl overflow-hidden border border-gray-800 mb-6 relative">
                    <LazyImage
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      className="w-full h-auto"
                    />
                    
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {selectedImage.featured && (
                        <div className="px-3 py-1 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs rounded-full flex items-center gap-1">
                          <Star size={12} />
                          Featured Project
                        </div>
                      )}
                    </div>
                  </div>

                  {/* التفاصيل */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                        <Award size={20} />
                        Project Details
                      </h4>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {selectedImage.details}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-400 mb-1">Category</h5>
                          <span className="px-3 py-1 bg-red-600/10 text-red-600 text-sm rounded-full border border-red-600/30">
                            {selectedImage.type.toUpperCase()}
                          </span>
                        </div>
                        
                        {selectedImage.client && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-400 mb-1">Client</h5>
                            <p className="text-gray-300">{selectedImage.client}</p>
                          </div>
                        )}
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-400 mb-1">Project Date</h5>
                          <p className="text-gray-300 flex items-center gap-2">
                            <Calendar size={14} />
                            {formatDate(selectedImage.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                        <TrendingUp size={20} />
                        Technical Details
                      </h4>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                          <span className="text-gray-400">Dimensions</span>
                          <span className="text-white font-medium">
                            {selectedImage.width} × {selectedImage.height}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                          <span className="text-gray-400">Aspect Ratio</span>
                          <span className="text-white font-medium">{selectedImage.aspectRatio}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                          <span className="text-gray-400">File Type</span>
                          <span className="text-white font-medium">High Resolution</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                          <span className="text-gray-400">Engagement</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-green-400">
                              <Heart size={14} />
                              <span>{selectedImage.likes.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1 text-blue-400">
                              <Eye size={14} />
                              <span>{selectedImage.views.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Tags</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedImage.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700 hover:border-red-600/50 transition-colors cursor-default"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="p-6 border-t border-gray-800 bg-gradient-to-r from-black/50 to-gray-900/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">
                        Interested in similar work? Contact me for custom designs.
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Check size={12} />
                        <span>100% satisfaction guaranteed</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedImage(null);
                          navigate('/#contact');
                        }}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 group"
                      >
                        <ExternalLink size={18} />
                        Request Similar Project
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          // Download image logic
                          const link = document.createElement('a');
                          link.href = selectedImage.src;
                          link.download = `${selectedImage.title.replace(/\s+/g, '-')}.jpg`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="gap-2"
                      >
                        <Download size={18} />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الفوتر (بنفس تصميم الصفحة الرئيسية) */}
      <footer className="py-12 border-t border-gray-900 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-medium tracking-wider mb-4 md:mb-0 font-sans">
              <span className="text-white">Ayonato</span><span className="text-red-600">.Design</span>
            </div>
            
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <p className="text-gray-500 text-sm mb-4">
                © {new Date().getFullYear()} Ayonato Design Studio. All rights reserved.
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Connect with me:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://discord.gg/qnW2T5UBSk"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label="Discord"
                  >
                    <SiDiscord size={20} />
                  </a>
                  <a
                    href="https://instagram.com/real.ayonato"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <SiInstagram size={20} />
                  </a>
                  <a
                    href="https://youtube.com/@Ayonato"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <SiYoutube size={20} />
                  </a>
                  <a
                    href="https://tiktok.com/@ayonato"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label="TikTok"
                  >
                    <SiTiktok size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className="group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              <span>Back to top</span>
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-900 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-500">
              <div>
                <h4 className="text-gray-400 mb-2">Portfolio Stats</h4>
                <div className="space-y-1">
                  <p>{stats.total} Projects • {stats.featured} Featured</p>
                  <p>{stats.totalLikes.toLocaleString()} Likes • {stats.totalViews.toLocaleString()} Views</p>
                </div>
              </div>
              <div>
                <h4 className="text-gray-400 mb-2">Design Categories</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full">Thumbnails</span>
                  <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full">GFX</span>
                  <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full">Banners</span>
                  <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full">3D Positions</span>
                </div>
              </div>
              <div>
                <h4 className="text-gray-400 mb-2">Navigation</h4>
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => navigate('/')}
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    ← Return to Homepage
                  </button>
                  <button 
                    onClick={() => navigate('/#contact')}
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    Contact for Projects
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;