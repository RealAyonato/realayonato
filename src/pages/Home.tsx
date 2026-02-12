import Button from "../components/ui/button";
import Card from "../components/ui/card";
import LazyImage from "../components/ui/lazyImage";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { 
  Instagram, 
  Youtube, 
  ArrowRight, 
  Star, 
  X,
  Sparkles,
  Zap,
  Palette,
  LayoutGrid,
  Coffee,
  Crown,
  Diamond,
  Rocket,
  Check,
  Quote,
  Calendar,
  Award,
  Trophy,
  Shield,
  Clock,
  Menu,
  Filter,
  Eye,
  Maximize2
} from "lucide-react";
import { SiDiscord, SiTiktok, SiX, SiReddit } from "react-icons/si";
import { Plus } from "../components/ui/icons";

// ===== TypeScript Interfaces & Types =====

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'xl';
  className?: string;
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  gradient: string;
  icon: React.ReactNode;
  modalContent: {
    description: string;
    process: string[];
    deliverables: string[];
  };
}

interface SkillItem {
  name: string;
  level: number;
  color: string;
  logo: string;
}

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
  highResSrc?: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  date: string;
  project: string;
}

interface PricingPackage {
  id: number;
  name: string;
  originalPrice?: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  icon: React.ReactNode;
  color: string;
  deliveryTime: string;
}

interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
}

interface NavItem {
  id: string;
  label: string;
}

// ===== Image Optimization & Lazy Loading =====
class ImageOptimizer {
  static getOptimizedUrl(url: string, width?: number, quality: number = 85): string {
    const baseUrl = url.split('?')[0];
    
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
      return url;
    }
    
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    params.append('q', quality.toString());
    params.append('fm', 'webp');
    params.append('auto', 'format');
    
    return `${baseUrl}?${params.toString()}`;
  }
  
  static getThumbnailUrl(url: string): string {
    return this.getOptimizedUrl(url, 400, 80);
  }
  
  static getFullSizeUrl(url: string): string {
    return this.getOptimizedUrl(url, 1200, 90);
  }
  
  static getAvatarUrl(url: string): string {
    return this.getOptimizedUrl(url, 100, 90);
  }
}

// ===== Utility Functions =====
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const smoothScrollTo = (
  elementId: string,
  offset: number = 80,
  duration: number = 800
): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const startPosition = window.pageYOffset;
  const elementPosition = element.getBoundingClientRect().top;
  const distance = elementPosition - offset;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    const run = easeInOutCubic(progress) * distance;
    window.scrollTo(0, startPosition + run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// ===== Data Arrays (Memoized) =====

const useNavItems = () => useMemo<NavItem[]>(() => [
  { id: "home", label: "Home" },
  { id: "services", label: "What I Do" },
  { id: "skills", label: "Expertise" },
  { id: "portfolio", label: "Work" },
  { id: "testimonials", label: "Feedback" },
  { id: "pricing", label: "Packages" },
  { id: "experience", label: "Journey" },
  { id: "contact", label: "Contact" },
], []);

const useServiceCards = () => useMemo<ServiceCard[]>(() => [
  {
    id: 1,
    title: "Roblox Thumbnails",
    description: "High-quality Roblox thumbnails designed to stand out, with strong composition, clean lighting, and eye-catching visuals.",
    features: ["Custom Roblox scenes", "Clean lighting & effects", "Strong composition", "High-resolution output"],
    imageUrl: "https://i.ibb.co/LzZnX2hK/Untitled-3.jpg",
    gradient: "from-red-600/90 to-red-500/90",
    icon: <Zap className="w-6 h-6" />,
    modalContent: {
      description: "High-quality Roblox thumbnails designed to grab attention, with strong composition, clean lighting, and clear focal points.",
      process: [
        "Style & reference discussion",
        "Scene and character setup",
        "Lighting and composition",
        "Effects and final polish",
        "Final thumbnail delivery"
      ],
      deliverables: [
        "High-resolution thumbnail",
        "Optimized for Roblox platforms",
        "Clean lighting and effects",
        "Multiple format export"
      ]
    }
  },
  {
    id: 2,
    title: "Roblox GFX",
    description: "Professional Roblox GFX creations with detailed characters, realistic lighting, and polished visual effects.",
    features: ["Character rendering", "Advanced lighting", "Visual effects", "High-detail results"],
    imageUrl: "https://i.ibb.co/pvsbHmtt/Untitled-6.jpg",
    gradient: "from-red-600/90 to-red-500/90",
    icon: <Sparkles className="w-6 h-6" />,
    modalContent: {
      description: "Professional Roblox GFX creations featuring detailed characters, realistic lighting, and polished visual effects.",
      process: [
        "Character and pose selection",
        "3D rendering setup",
        "Advanced lighting and shading",
        "Visual effects enhancement",
        "Final render delivery"
      ],
      deliverables: [
        "High-resolution GFX render",
        "Detailed character visuals",
        "Advanced lighting effects",
        "Ready-to-use final image"
      ]
    }
  },
  {
    id: 3,
    title: "Roblox Visual Enhancement",
    description: "Enhancing existing Roblox graphics by improving quality, lighting, and overall visual impact.",
    features: ["Color correction", "Lighting enhancement", "Detail refinement", "Visual optimization"],
    imageUrl: "https://i.ibb.co/cMbyWKh/Befor.png",
    gradient: "from-red-600/90 to-red-500/90",
    icon: <Palette className="w-6 h-6" />,
    modalContent: {
      description: "Enhancing existing Roblox graphics by improving lighting, colors, details, and overall visual quality.",
      process: [
        "Design review and analysis",
        "Lighting and color correction",
        "Detail enhancement",
        "Visual optimization",
        "Final enhanced delivery"
      ],
      deliverables: [
        "Improved image quality",
        "Enhanced lighting and colors",
        "Refined details",
        "Optimized final output"
      ]
    }
  }
], []);

const useSkills = () => useMemo<SkillItem[]>(() => [
  { 
    name: "Blender", 
    level: 95, 
    color: "#F5792A",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg"
  },
  { 
    name: "Photoshop", 
    level: 90, 
    color: "#31A8FF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
  },
  { 
    name: "Roblox Studio", 
    level: 85, 
    color: "#FFFFFF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Roblox_Studio_icon_2025.svg/640px-Roblox_Studio_icon_2025.svg.png" // الرابط الجديد الشغال
  }
], []);

const useExperiences = () => useMemo<ExperienceItem[]>(() => [
  {
    year: "2025 – Present",
    title: "Advanced Roblox Visual Specialist",
    company: "Professional Roblox Thumbnail & GFX Designer",
    description: "Specializing in high-impact Roblox thumbnails and cinematic visuals tailored for content creators.",
    achievements: [
      "Collaborated with growing Roblox creators",
      "Mastered multiple Roblox visual styles",
      "Optimized workflow for fast, consistent delivery"
    ]
  },
  {
    year: "2023 – 2024",
    title: "Freelance Roblox Designer",
    company: "Worked closely with Roblox content creators, building a strong portfolio focused on thumbnails and GFX.",
    description: "",
    achievements: [
      "Delivered 50+ custom Roblox thumbnails",
      "Developed a recognizable visual identity",
      "Built trust within the Roblox creator community"
    ]
  },
  {
    year: "2022",
    title: "Design Foundations & Skill Development",
    company: "Self-Taught Designer",
    description: "Began exploring Roblox visual design while learning Photoshop and Blender fundamentals.",
    achievements: [
      "Learned Photoshop for thumbnail composition",
      "Studied Blender for 3D rendering",
      "Completed 30+ personal design projects"
    ]
  }
], []);

const useStats = () => useMemo(() => [
  { label: "Projects", value: "200+", icon: "🚀" },
  { label: "Styles", value: "15+", icon: "🎨" },
  { label: "Quality", value: "Top-Tier", icon: "✨" },
  { label: "Delivery", value: "Fast", icon: "⚡" }
], []);

const usePortfolioImages = () => useMemo<PortfolioImage[]>(() => {
  // صور بدون تكرار
  const images: PortfolioImage[] = [
    // Thumbnails (6 صور)
    {
      id: 1,
      src: "https://i.ibb.co/Q3ZWqbRL/boys-vs-girls-steal-a-brainrot-hehe.png",
      alt: "Boys vs Girls Roblox Thumbnail",
      title: "Boys vs Girls Gameplay",
      category: 'thumbnail',
      type: 'thumbnail',
      width: 1280,
      height: 720,
      aspectRatio: "16:9",
      details: "Dynamic Roblox thumbnail featuring boys vs girls gameplay with vibrant colors and clear visual hierarchy.",
      highResSrc: "https://i.ibb.co/Q3ZWqbRL/boys-vs-girls-steal-a-brainrot-hehe.png"
    },
    {
      id: 2,
      src: "https://i.ibb.co/QFm4w8G0/i-am-wanted-in-rivals.png",
      alt: "Wanted in Rivals Thumbnail",
      title: "Wanted in Rivals",
      category: 'thumbnail',
      type: 'thumbnail',
      width: 1280,
      height: 720,
      aspectRatio: "16:9",
      details: "Action-packed Roblox thumbnail with dramatic lighting and intense gameplay moment.",
      highResSrc: "https://i.ibb.co/QFm4w8G0/i-am-wanted-in-rivals.png"
    },
    {
      id: 3,
      src: "https://i.ibb.co/5g5mqK7B/pookie-babyy-hehe.png",
      alt: "Funny Roblox Thumbnail",
      title: "Funny Moments",
      category: 'thumbnail',
      type: 'thumbnail',
      width: 1280,
      height: 720,
      aspectRatio: "16:9",
      details: "Humorous Roblox thumbnail with playful characters and bright, engaging colors.",
      highResSrc: "https://i.ibb.co/5g5mqK7B/pookie-babyy-hehe.png"
    },
    {
      id: 4,
      src: "https://i.ibb.co/r2xwpTDC/pranking-players-in-mm2-mic.png",
      alt: "Pranking Players Thumbnail",
      title: "Pranking Players",
      category: 'thumbnail',
      type: 'thumbnail',
      width: 1280,
      height: 720,
      aspectRatio: "16:9",
      details: "Prank-themed Roblox thumbnail featuring suspenseful gameplay and mischievous characters.",
      highResSrc: "https://i.ibb.co/r2xwpTDC/pranking-players-in-mm2-mic.png"
    },
    {
      id: 5,
      src: "https://i.ibb.co/hxgRZpCM/Whatever-My-Little-Sister-Draws-Comes-TO-LIFE-in-Steal-a-Brainrot.png",
      alt: "Sister Draws Thumbnail",
      title: "Sister's Drawings Come to Life",
      category: 'thumbnail',
      type: 'thumbnail',
      width: 1280,
      height: 720,
      aspectRatio: "16:9",
      details: "Creative Roblox thumbnail showcasing imaginative gameplay with hand-drawn elements.",
      highResSrc: "https://i.ibb.co/hxgRZpCM/Whatever-My-Little-Sister-Draws-Comes-TO-LIFE-in-Steal-a-Brainrot.png"
    },
    {
      id: 6,
      src: "https://i.ibb.co/5WzxYzs2/wasimox-angel-and-cyborg-v4.png",
      alt: "Angel and Cyborg Thumbnail",
      title: "Angel vs Cyborg",
      category: 'thumbnail',
      type: 'thumbnail',
      width: 1280,
      height: 720,
      aspectRatio: "16:9",
      details: "Epic Roblox thumbnail featuring angel and cyborg characters in dramatic confrontation.",
      highResSrc: "https://i.ibb.co/5WzxYzs2/wasimox-angel-and-cyborg-v4.png"
    },
    
    // GFX Designs (6 صور)
    {
      id: 7,
      src: "https://i.ibb.co/qLNc7SvS/1681665482917.jpg",
      alt: "Professional Gaming Logo",
      title: "Esports Team Identity",
      category: 'gfx',
      type: 'gfx',
      width: 800,
      height: 800,
      aspectRatio: "1:1",
      details: "Modern logo design for competitive gaming team.",
      highResSrc: "https://i.ibb.co/qLNc7SvS/1681665482917.jpg"
    },
    {
      id: 8,
      src: "https://i.ibb.co/q37kPd6q/ALPHA-GFX-Copy.jpg",
      alt: "Alpha GFX Logo",
      title: "Alpha GFX Logo",
      category: 'gfx',
      type: 'gfx',
      width: 800,
      height: 800,
      aspectRatio: "1:1",
      details: "Modern GFX studio logo with clean typography.",
      highResSrc: "https://i.ibb.co/q37kPd6q/ALPHA-GFX-Copy.jpg"
    },
    {
      id: 9,
      src: "https://i.ibb.co/bMm9hFMP/dragon-logo.jpg",
      alt: "Dragon Logo GFX",
      title: "Dragon Logo Design",
      category: 'gfx',
      type: 'gfx',
      width: 800,
      height: 800,
      aspectRatio: "1:1",
      details: "Detailed dragon logo with intricate line work.",
      highResSrc: "https://i.ibb.co/bMm9hFMP/dragon-logo.jpg"
    },
    {
      id: 10,
      src: "https://i.ibb.co/PsRvK6qN/yaso-gfx.jpg",
      alt: "Yaso GFX Logo",
      title: "Yaso GFX Logo",
      category: 'gfx',
      type: 'gfx',
      width: 800,
      height: 800,
      aspectRatio: "1:1",
      details: "Streamer brand logo with custom typography.",
      highResSrc: "https://i.ibb.co/PsRvK6qN/yaso-gfx.jpg"
    },
    {
      id: 11,
      src: "https://i.ibb.co/tpMQgmFz/mine.jpg",
      alt: "Profile Logo",
      title: "Profile Logo",
      category: 'gfx',
      type: 'gfx',
      width: 800,
      height: 800,
      aspectRatio: "1:1",
      details: "Personal brand logo with modern design elements.",
      highResSrc: "https://i.ibb.co/tpMQgmFz/mine.jpg"
    },
    {
      id: 12,
      src: "https://i.ibb.co/WWndHXXG/meee.png",
      alt: "Character GFX",
      title: "Character GFX",
      category: 'gfx',
      type: 'gfx',
      width: 800,
      height: 800,
      aspectRatio: "1:1",
      details: "Detailed character GFX with custom styling.",
      highResSrc: "https://i.ibb.co/WWndHXXG/meee.png"
    },
    
    // Banners (2 صور)
    {
      id: 13,
      src: "https://i.ibb.co/1t5s7Pkf/yaso-banner.jpg",
      alt: "Yaso Banner Design",
      title: "Gaming Channel Banner",
      category: 'banner',
      type: 'banner',
      width: 1920,
      height: 1080,
      aspectRatio: "16:9",
      details: "Dynamic gaming channel banner with 3D elements.",
      highResSrc: "https://i.ibb.co/1t5s7Pkf/yaso-banner.jpg"
    },
    {
      id: 14,
      src: "https://i.ibb.co/yc837Y7q/image.png",
      alt: "Modern Banner Design",
      title: "Professional Banner",
      category: 'banner',
      type: 'banner',
      width: 1920,
      height: 1080,
      aspectRatio: "16:9",
      details: "Modern YouTube banner design with balanced composition.",
      highResSrc: "https://i.ibb.co/yc837Y7q/image.png"
    },
    
    // Positions (5 صور فقط - بدون تكرار)
    {
      id: 15,
      src: "https://i.ibb.co/j9RTkW1g/hehehhe.png",
      alt: "Fun Character Position",
      title: "Fun Character Position",
      category: 'position',
      type: 'position',
      width: 1200,
      height: 1600,
      aspectRatio: "3:4",
      details: "Fun character position design with playful expression.",
      highResSrc: "https://i.ibb.co/j9RTkW1g/hehehhe.png"
    },
    {
      id: 16,
      src: "https://i.ibb.co/7JCVLR1F/be-mine-hehe.png",
      alt: "Cute Position Design",
      title: "Cute Character Position",
      category: 'position',
      type: 'position',
      width: 1200,
      height: 1600,
      aspectRatio: "3:4",
      details: "Cute character position with adorable expression.",
      highResSrc: "https://i.ibb.co/7JCVLR1F/be-mine-hehe.png"
    },
    {
      id: 17,
      src: "https://i.ibb.co/yFFLTS11/girl-ehehhe.png",
      alt: "Girl Character Position",
      title: "Girl Character Position",
      category: 'position',
      type: 'position',
      width: 1200,
      height: 1600,
      aspectRatio: "3:4",
      details: "Stylish girl character position with modern aesthetics.",
      highResSrc: "https://i.ibb.co/yFFLTS11/girl-ehehhe.png"
    },
    {
      id: 18,
      src: "https://i.ibb.co/PvW7BJFF/femboy-hehe-1.png",
      alt: "Femboy Character Position",
      title: "Femboy Character Position",
      category: 'position',
      type: 'position',
      width: 1200,
      height: 1600,
      aspectRatio: "3:4",
      details: "Androgynous character position with unique style.",
      highResSrc: "https://i.ibb.co/PvW7BJFF/femboy-hehe-1.png"
    },
    {
      id: 19,
      src: "https://i.ibb.co/FL4x992j/dragon-V-account-rating-girl.png",
      alt: "Rating Girl Position",
      title: "Rating Girl Position",
      category: 'position',
      type: 'position',
      width: 1200,
      height: 1600,
      aspectRatio: "3:4",
      details: "Character position design for rating/showcase purposes.",
      highResSrc: "https://i.ibb.co/FL4x992j/dragon-V-account-rating-girl.png"
    }
  ];
  
  return images;
}, []);

const useTestimonials = () => useMemo<Testimonial[]>(() => [
  {
    id: 1,
    name: "WasimoX",
    role: "Roblox Content Creator",
    content: "Absolutely loving the thumbnail design from RealAyonato! You nailed the style we were going for, it boosted our click-through instantly.",
    rating: 5,
    avatar: "https://yt3.googleusercontent.com/zCNIdyHkYdReYWd_h3h2x7uLdJNIRmEppQft1FrOjJ0cdzrwCwGv-75Ul_Tc22si5opRnEN0_g=s160-c-k-c0x00ffffff-no-rj",
    date: "March 2024",
    project: "Roblox Thumbnail Series"
  },
  {
    id: 2,
    name: "Takzo",
    role: "Roblox Creator",
    content: "Great thumbnail from RealAyonato! The composition and colors really fit our video theme.",
    rating: 4,
    avatar: "https://yt3.googleusercontent.com/WqSgrgtMCYt_ilL9gL4xz9jnvsk15FuCrMK8HrxwtC3CX-9KgtD9slomQJbWO1XXr3pPTsIZ3w=s160-c-k-c0x00ffffff-no-rj",
    date: "February 2024",
    project: "Roblox Gameplay Thumbnail"
  },
  {
    id: 3,
    name: "Onix",
    role: "Roblox Content Creator",
    content: "RealAyonato delivered beyond expectations! The thumbnail style matched our Roblox gameplay vibe perfectly.",
    rating: 5,
    avatar: "https://yt3.googleusercontent.com/TeBVtDV2igqwIh7M948Uy6ns1UHHEtYfQjTHjP-FKYzDtSkU5rlS5mcI_sLoT3Bl8U7GQdyp=s160-c-k-c0x00ffffff-no-rj",
    date: "April 2024",
    project: "Roblox Adventure Series"
  },
  {
    id: 4,
    name: "ALPHA",
    role: "Roblox Creator",
    content: "Really creative design by RealAyonato! The Roblox characters pop out and the thumbnail feels professional and fun.",
    rating: 4,
    avatar: "https://yt3.googleusercontent.com/OrjzhruUYC8s71rtN8R_IX69DVRW3wVBKMxfpEdJDTEuNHE1zU2EapeTo_tldutcLQJBNLZo7w=s160-c-k-c0x00ffffff-no-rj",
    date: "January 2024",
    project: "Roblox Character Thumbnail"
  },
  {
    id: 5,
    name: "Dragon V",
    role: "Roblox Content Creator",
    content: "Phenomenal thumbnail! RealAyonato captured exactly what we wanted and improved our video's visual appeal.",
    rating: 5,
    avatar: "https://yt3.googleusercontent.com/R-6zthJWVPIn3XOtGWVdxpkNfeNh07_Nk5ziWrRJ_XXEnU4c5gRtOZ6-V0Aa11eA5T2c0mY02A=s160-c-k-c0x00ffffff-no-rj",
    date: "March 2024",
    project: "Roblox Cinematic Thumbnail"
  }
], []);

const usePricingPackages = () => useMemo<PricingPackage[]>(() => [
  {
    id: 1,
    name: "Single Thumbnail",
    price: "$25",
    description: "For creators who need a Roblox thumbnail.",
    features: [
      "1 Roblox Thumbnail",
      "1 Revision",
      "Custom Style",
      "Delivery in 1–2 Days"
    ],
    popular: false,
    icon: <Rocket className="w-8 h-8" />,
    color: "from-red-600 to-red-500",
    deliveryTime: "1–2 days"
  },
  {
    id: 2,
    name: "Creator Bundle",
    originalPrice: "$75",
    price: "$60",
    description: "A discounted bundle for regular uploads.",
    features: [
      "3 Roblox Thumbnails",
      "2 Revisions per Thumbnail",
      "1 Roblox GFX Profile Picture",
      "Delivery in 1–2 Days per Thumbnail"
    ],
    popular: true,
    icon: <Crown className="w-8 h-8" />,
    color: "from-red-600 to-orange-500",
    deliveryTime: "1–2 days per thumbnail"
  },
  {
    id: 3,
    name: "Cinematic Pack",
    originalPrice: "$250",
    price: "$200",
    description: "Designed for long-term Roblox creators.",
    features: [
      "10 Cinematic Roblox Thumbnails",
      "Made using Blender & Photoshop",
      "3 Revisions per Thumbnail",
      "Delivered gradually, based on your needs",
      "1 Roblox GFX Profile Picture",
      "1 Roblox Banner"
    ],
    popular: false,
    icon: <Diamond className="w-8 h-8" />,
    color: "from-red-600 to-pink-500",
    deliveryTime: "Gradual delivery"
  }
], []);

// ===== Image Modal Component =====
interface ImageModalProps {
  image: PortfolioImage;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative max-w-7xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - تصميم احترافي */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 z-20 border border-white/20 shadow-xl"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        {/* Image container - بدون border ثابت */}
        <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-2 shadow-2xl">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={image.highResSrc || image.src}
              alt={image.alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            
            {/* Gradient overlay خفيف جداً */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Image info - شفاف ونظيف */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-black/60 backdrop-blur-md rounded-xl px-5 py-3 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">{image.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{image.width} × {image.height} • {image.type}</p>
                </div>
                <div className="px-3 py-1.5 bg-red-600/90 rounded-lg">
                  <span className="text-xs font-medium text-white uppercase tracking-wider">{image.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// ===== Reusable Modal Component =====
interface ModalProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: 'medium' | 'large';
}

const Modal: React.FC<ModalProps> = ({ title, subtitle, children, onClose, size = 'medium' }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`bg-gray-900 border border-gray-800 rounded-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto ${
          size === 'large' ? 'max-w-4xl' : 'max-w-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-900 z-10 border-b border-gray-800">
          <div className="flex justify-between items-center p-6">
            <div>
              <h3 className="text-2xl font-medium text-white">{title}</h3>
              {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
};

// ===== Main Component =====

export default function Overview() {
  const navItems = useNavItems();
  const serviceCards = useServiceCards();
  const skills = useSkills();
  const experiences = useExperiences();
  const stats = useStats();
  const portfolioImages = usePortfolioImages();
  const testimonials = useTestimonials();
  const pricingPackages = usePricingPackages();

  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  // Modal states
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  
  // Filter states for portfolio
  const [filter, setFilter] = useState<'all' | 'thumbnail' | 'gfx' | 'banner' | 'position'>('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const contactRef = useRef<HTMLDivElement>(null);

  // صور مرتبة عشوائياً - تتغير فقط عند تحميل الصفحة
  const [shuffledImages, setShuffledImages] = useState({
    all: [] as PortfolioImage[],
    thumbnail: [] as PortfolioImage[],
    gfx: [] as PortfolioImage[],
    banner: [] as PortfolioImage[],
    position: [] as PortfolioImage[]
  });

  // تحديث الترتيب العشوائي عند تحميل الصفحة فقط
  useEffect(() => {
    setShuffledImages({
      all: [...portfolioImages].sort(() => Math.random() - 0.5),
      thumbnail: portfolioImages.filter(img => img.type === 'thumbnail').sort(() => Math.random() - 0.5),
      gfx: portfolioImages.filter(img => img.type === 'gfx').sort(() => Math.random() - 0.5),
      banner: portfolioImages.filter(img => img.type === 'banner').sort(() => Math.random() - 0.5),
      position: portfolioImages.filter(img => img.type === 'position').sort(() => Math.random() - 0.5)
    });
  }, [portfolioImages]);

  // ===== Event Handlers =====
  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  }, []);

  const scrollToSection = useCallback((id: string) => {
    smoothScrollTo(id);
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    smoothScrollTo('home');
  }, []);

  const openServiceModal = useCallback((service: ServiceCard) => {
    setSelectedService(service);
    setServiceModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setServiceModalOpen(false);
    setSelectedService(null);
  }, []);

  const openImageModal = useCallback((image: PortfolioImage) => {
    setSelectedImage(image);
  }, []);

  const closeImageModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // ===== Effects =====
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Preload important images - استخدم shuffledImages بدلاً من displayImages
    const preloadImages = [
      "https://i.ibb.co/tpMQgmFz/mine.jpg",
      ...serviceCards.map(s => s.imageUrl),
      ...shuffledImages.all.map(p => p.src)
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [navItems, testimonials.length, serviceCards, shuffledImages.all]);

  // ===== Mobile Menu Component =====
  const MobileMenu = () => (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                  activeSection === item.id 
                    ? "bg-gradient-to-r from-red-600/20 to-red-500/10 text-red-500 border border-red-600/30" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </LazyMotion>
  );


  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* ===== Navigation ===== */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-gray-800' : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
            <button
              onClick={scrollToTop}
              className="text-xl md:text-2xl font-bold tracking-wider cursor-pointer font-sans select-none"
            >
              RealAyonato<span className="text-red-600">.art</span>
            </button>
            
            {/* Desktop Navigation - CENTERED */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs lg:text-sm uppercase tracking-wider transition-colors font-medium ${
                    activeSection === item.id 
                      ? "text-red-600" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Empty div for balance */}
            <div className="hidden md:block w-32"></div>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && <MobileMenu />}
          </AnimatePresence>
        </motion.nav>

        {/* ===== Hero Section ===== */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full bg-red-600/10 border border-red-600/30 mb-4 md:mb-6"
                >
                  <span className="text-red-600 text-xs md:text-sm font-medium uppercase tracking-wider">
                    Professional Roblox Graphic Designer
                  </span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 font-sans">
                  <span className="block">Creative Roblox Designs</span>
                  <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                    Built To Impress
                  </span>
                </h1>
                
                <h2 className="text-lg md:text-2xl text-gray-400 mb-6 md:mb-8">
                  <span className="text-white">Thumbnails</span> • 
                  <span className="text-red-600 mx-2">GFX</span> • 
                  <span className="text-white">Roblox Visual Design</span>
                </h2>
                
                <p className="text-gray-400 mb-8 md:mb-10 text-sm md:text-lg leading-relaxed max-w-2xl">
                  High-quality Roblox thumbnails and GFX designed with precision, style, and attention to detail.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
                  <Button 
                    size="lg"
                    className="group"
                    onClick={() => scrollToSection("pricing")}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => scrollToSection("portfolio")}
                  >
                    See My Work
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center p-3 md:p-4 bg-gray-900/30 rounded-lg border border-gray-800">
                      <div className="text-lg md:text-2xl font-bold mb-1 text-white">{stat.value}</div>
                      <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6">
                  <span className="text-gray-500 text-sm">Follow me:</span>
                  <div className="flex gap-2 md:gap-3">
                    {[
                      { 
                        icon: <Instagram size={18} />, 
                        href: "https://instagram.com/realayonato", 
                        label: "Instagram" 
                      },
                      { 
                        icon: <Youtube size={18} />, 
                        href: "https://www.youtube.com/@RealAyonato", 
                        label: "YouTube" 
                      },
                      { 
                        icon: <SiTiktok size={18} />, 
                        href: "https://www.tiktok.com/@realayonato", 
                        label: "TikTok" 
                      },
                      { 
                        icon: <SiX size={18} />, 
                        href: "https://x.com/RealAyonato", 
                        label: "X" 
                      },
                      { 
                        icon: <SiReddit size={18} />, 
                        href: "https://www.reddit.com/user/RealAyonato", 
                        label: "Reddit" 
                      }
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-800 flex items-center justify-center hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 transition-all duration-300"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center lg:justify-end mt-8 lg:mt-0"
              >
                <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
                  
                  <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-red-600/50 shadow-2xl shadow-red-600/30">
                    <LazyImage
                      src="https://i.ibb.co/tpMQgmFz/mine.jpg"
                      alt="Ayonato - Professional Roblox Graphic Designer"
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad("https://i.ibb.co/tpMQgmFz/mine.jpg")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-black/40"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={() => scrollToSection("services")}
              className="flex flex-col items-center text-gray-500 hover:text-white transition-colors"
            >
              <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-red-600 rounded-full flex justify-center cursor-pointer">
                <div className="w-1 h-2 md:h-3 bg-red-600 rounded-full mt-2"></div>
              </div>
            </button>
          </motion.div>
        </section>

        {/* ===== Services Section ===== */}
        <section id="services" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-2 text-red-600 mb-4">
                <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
                <span className="text-xs md:text-sm font-medium uppercase tracking-widest">What I Do</span>
                <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-sans">
                Professional <span className="text-red-600">Roblox Design Solutions</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                High-quality graphic design services focused exclusively on Roblox visuals, crafted with precision, style, and attention to detail.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {serviceCards.map((service) => (
                <motion.div
                  key={service.id}
                  className="relative group"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card className="h-full hover:border-red-600/50 transition-colors duration-300 cursor-pointer"
                        onClick={() => openServiceModal(service)}>
                    <div className="h-full flex flex-col p-6">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                            {service.icon}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white font-sans">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-base mb-4">{service.description}</p>
                        
                        <div className="space-y-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-red-600 text-sm font-medium">View Details</span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Expertise Section ===== */}
        <section id="skills" className="py-16 md:py-24 bg-gray-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-red-600 mb-4">
                  <div className="w-8 h-0.5 bg-red-600"></div>
                  <span className="text-xs md:text-sm font-medium uppercase tracking-widest">Expertise</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-sans">
                  Tools & <span className="text-red-600">Software</span>
                </h2>
                
                <p className="text-gray-400 mb-6 md:mb-8 text-base md:text-lg">
                  Professional tools I use to create high-quality Roblox designs, ensuring precision and consistency in every project.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {skills.map((skill, idx) => {
                  // تحديد لون الخلفية المناسب لكل تطبيق
                  let bgGradient = "";
                  let borderColor = "";
                  
                  if (skill.name === "Blender") {
                    bgGradient = "bg-gradient-to-br from-orange-500/20 to-orange-600/10";
                    borderColor = "border-orange-500/30";
                  } else if (skill.name === "Photoshop") {
                    bgGradient = "bg-gradient-to-br from-blue-500/20 to-blue-600/10";
                    borderColor = "border-blue-500/30";
                  } else if (skill.name === "Roblox Studio") {
                    bgGradient = "bg-gradient-to-br from-gray-800 to-gray-900";
                    borderColor = "border-gray-600";
                  }
                  
                  return (
                    <motion.div
                      key={idx}
                      className="flex flex-col items-center"
                      whileInView={{ opacity: 1, scale: 1 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      viewport={{ once: true }}
                    >
                      <div 
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-3 ${bgGradient} border-2 ${borderColor}`}
                      >
                        <img 
                          src={skill.logo} 
                          alt={skill.name}
                        className={`w-8 h-8 md:w-10 md:h-10 ${
                          skill.name === "Roblox Studio" ? "object-contain" : ""
                        }`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-300 text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

<section id="portfolio" className="py-16 md:py-24">
  <div className="container mx-auto px-4 md:px-6">
    <div className="text-center mb-12 md:mb-20">
      <div className="inline-flex items-center gap-2 text-red-600 mb-4">
        <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
        <span className="text-xs md:text-sm font-medium uppercase tracking-widest">Work</span>
        <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-sans">
        My <span className="text-red-600">Recent Work</span>
      </h2>
      <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
        Thumbnails and GFX created for Roblox creators
      </p>
    </div>

    {/* Filters */}
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
          filter === 'all' 
            ? 'bg-red-600 text-white' 
            : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        All Projects
      </button>
      <button
        onClick={() => setFilter('thumbnail')}
        className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
          filter === 'thumbnail' 
            ? 'bg-red-600 text-white' 
            : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        Thumbnails
      </button>
      <button
        onClick={() => setFilter('gfx')}
        className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
          filter === 'gfx' 
            ? 'bg-red-600 text-white' 
            : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        GFX Designs
      </button>
      <button
        onClick={() => setFilter('banner')}
        className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
          filter === 'banner' 
            ? 'bg-red-600 text-white' 
            : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        Banners
      </button>
      <button
        onClick={() => setFilter('position')}
        className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
          filter === 'position' 
            ? 'bg-red-600 text-white' 
            : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        Positions
      </button>
    </div>

{/* Pinterest-style Masonry Grid - مع فواصل بين الصور */}
<div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
  <AnimatePresence mode="wait">
    <motion.div
      key={filter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="contents"
    >
      {shuffledImages[filter].map((image, index) => (
        <motion.div
          key={image.id}
          className="break-inside-avoid cursor-pointer group mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.03 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => openImageModal(image)}
        >
          <div className="relative rounded-xl overflow-hidden border-2 border-red-600/30 bg-gray-900 hover:border-red-600 transition-colors duration-300">
            <LazyImage
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-contain"
              onLoad={() => handleImageLoad(image.src)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1.5 text-xs font-medium text-white bg-red-600/80 rounded-full">
                  {image.type}
                </span>
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </AnimatePresence>
</div>
    
  </div>
</section>

        {/* ===== Feedback Section ===== */}
        <section id="testimonials" className="py-16 md:py-24 bg-gray-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-2 text-red-600 mb-4">
                <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
                <span className="text-xs md:text-sm font-medium uppercase tracking-widest">Feedback</span>
                <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-sans">
                Client <span className="text-red-600">Feedback</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                What Roblox creators say about working with me
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative h-[300px] md:h-[350px]">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: activeTestimonial === index ? 1 : 0,
                      x: activeTestimonial === index ? 0 : 100,
                      zIndex: activeTestimonial === index ? 10 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="h-full">
                      <div className="h-full flex flex-col p-6">
                        <div className="flex-grow">
                          <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-600/30">
                                <LazyImage
                                  src={testimonial.avatar}
                                  alt={testimonial.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                <div>
                                  <h3 className="text-xl font-medium text-white">{testimonial.name}</h3>
                                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                </div>
                                <div className="flex items-center gap-4 mt-2 md:mt-0">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i}
                                        size={14}
                                        className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-gray-400 text-sm">{testimonial.date}</span>
                                </div>
                              </div>
                              
                              <div className="relative pl-8">
                                <Quote className="absolute left-0 top-0 w-6 h-6 text-red-600/30" />
                                <p className="text-gray-300 text-base leading-relaxed italic">
                                  "{testimonial.content}"
                                </p>
                              </div>
                              
                              <div className="mt-4">
                                <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700">
                                  {testimonial.project}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index 
                        ? 'bg-red-600 w-8' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Packages Section ===== */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-2 text-red-600 mb-4">
                <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
                <span className="text-xs md:text-sm font-medium uppercase tracking-widest">Packages</span>
                <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-sans">
                Simple <span className="text-red-600">Pricing</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                Choose the perfect package for your Roblox content needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {pricingPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  className={`relative ${pkg.popular ? 'md:scale-105' : ''}`}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-full font-medium text-sm uppercase tracking-wider shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <Card className={`h-full border-2 ${pkg.popular ? 'border-red-600/50' : 'border-gray-800'} transition-all duration-300 hover:border-red-600/30`}>
                    <div className="h-full flex flex-col p-6">
                      <div className="text-center mb-8">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pkg.color}/20 mx-auto mb-4 flex items-center justify-center border ${pkg.color.split(' ')[1]}/30`}>
                          {pkg.icon}
                        </div>
                        <h3 className="text-2xl font-medium text-white mb-2 font-sans">
                          {pkg.name}
                        </h3>
                        <div className="mb-4">
                          {pkg.originalPrice && (
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-gray-400 line-through text-base">{pkg.originalPrice}</span>
                              <span className="text-4xl font-medium text-white">{pkg.price}</span>
                            </div>
                          )}
                          {!pkg.originalPrice && (
                            <span className="text-4xl font-medium text-white">{pkg.price}</span>
                          )}
                        </div>
                        <p className="text-gray-400 text-base">{pkg.description}</p>
                      </div>
                      
                      <div className="flex-grow mb-8">
                        <div className="space-y-4">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300 text-base">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="mb-6">
                          <div className="flex items-center gap-2 justify-center">
                            <Clock className="w-4 h-4 text-red-600" />
                            <span className="text-gray-300 text-sm">{pkg.deliveryTime}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className={`w-full gap-2 group ${
                            pkg.popular 
                              ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400' 
                              : 'bg-red-600 hover:bg-red-500'
                          }`}
                          onClick={() => scrollToSection("contact")}
                        >
                          <Trophy className="w-5 h-5" />
                          Select Package
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 text-gray-400 mb-4">
                <Plus className="w-5 h-5 text-red-600" />
                <span className="text-base font-medium">Extra Revisions</span>
              </div>
              <p className="text-gray-300 text-base">
                Additional Revision: $3 (available for all packages)
              </p>
            </div>
          </div>
        </section>

        {/* ===== Journey Section ===== */}
        <section id="experience" className="py-16 md:py-24 bg-gray-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-2 text-red-600 mb-4">
                <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
                <span className="text-xs md:text-sm font-medium uppercase tracking-widest">Journey</span>
                <div className="w-8 md:w-12 h-0.5 bg-red-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-sans">
                My <span className="text-red-600">Design Journey</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                From Foundations to Professional Roblox Visual Design
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600/50 via-red-600/30 to-transparent"></div>
                
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`relative mb-12 last:mb-0 ${
                      index % 2 === 0 ? 'md:pr-1/2 md:pl-8' : 'md:pl-1/2 md:pr-8'
                    }`}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-6`}>
                      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-4 border-black z-10"></div>
                      
                      <div className={`hidden md:block w-32 text-right ${index % 2 === 0 ? 'order-1' : 'order-3'}`}>
                        <span className="text-red-600 font-medium text-lg">{exp.year}</span>
                      </div>
                      
                      <div className={`flex-grow ${index % 2 === 0 ? 'order-2 md:ml-8' : 'order-2 md:mr-8'} ml-6 md:ml-0`}>
                        <Card className="hover:border-red-600/30 transition-colors duration-300">
                          <div className="p-6">
                            <div className="md:hidden mb-4">
                              <span className="text-red-600 font-medium text-base">{exp.year}</span>
                            </div>
                            
                            <div className="mb-4">
                              <h3 className="text-2xl font-medium text-white">{exp.title}</h3>
                              <h4 className="text-gray-400 text-base">{exp.company}</h4>
                            </div>
                            
                            {exp.description && (
                              <p className="text-gray-300 text-base mb-6">{exp.description}</p>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {exp.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                                  <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center flex-shrink-0">
                                    <Trophy className="w-4 h-4 text-red-600" />
                                  </div>
                                  <span className="text-sm text-gray-300">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>


<section id="contact" ref={contactRef} className="py-16 md:py-24">
  <div className="container mx-auto px-4 md:px-6">
    <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
      <div>
        <div className="inline-flex items-center gap-2 text-red-600 mb-4">
          <div className="w-8 h-0.5 bg-red-600"></div>
          <span className="text-xs md:text-sm font-medium uppercase tracking-widest">Contact</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-sans">
          Let's <span className="text-red-600">Work Together</span>
        </h2>
        
        <p className="text-gray-400 mb-6 md:mb-8 text-base md:text-lg">
          Ready to upgrade your Roblox visuals? Join my Discord to get started.
        </p>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-800 bg-gray-900/30">
            <div className="w-12 h-12 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
              <LayoutGrid className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="font-medium text-white text-base mb-2">How to Order</h4>
              <ol className="text-gray-400 text-sm space-y-1 pl-5 list-decimal">
                <li>Join the Discord server</li>
                <li>Go to the #order channel</li>
                <li>Open a ticket</li>
                <li>Fill in your project details</li>
                <li>Confirm and wait for approval</li>
              </ol>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-800 bg-gray-900/30">
            <div className="w-12 h-12 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-white text-base mb-2">Project Requirements</h4>
              <p className="text-gray-400 text-sm">
                Please provide clear details including style preference, references, and deadlines to ensure smooth delivery.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-green-500" />
            <span className="text-gray-300 text-base">Available Daily</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-300 text-base">Response Time: Under 5 Hours</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="text-gray-300 text-base">Professional & Confidential</span>
          </div>
        </div>
      </div>

      <Card className="hover:border-red-600/30 transition-colors duration-300">
        <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] p-8">
          <div className="mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600/20 to-red-500/20 border-2 border-red-600/30 flex items-center justify-center mx-auto mb-6 transition-all duration-300">
              <img 
                src="https://i.ibb.co/tpMQgmFz/mine.jpg"
                alt="RealAyonato Logo"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-medium text-white mb-2">Join Discord Server</h3>
            <p className="text-gray-400 text-base">For commissions and project discussions</p>
          </div>
          
          <div className="w-full max-w-xs">
            <a
              href="https://discord.gg/sghJet3uNF"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block w-full mb-6"
            >
              <Button size="lg" className="w-full gap-3 group bg-[#5865F2] hover:bg-[#4752C4]">
                <SiDiscord className="w-6 h-6" />
                Join Discord Server
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            
            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center flex-shrink-0">
                  <LayoutGrid className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-white text-sm">Professional Process</h4>
                  <p className="text-gray-400 text-xs">Simple & Efficient</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                After receiving your details, I'll confirm the timeline and begin your project.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</section>

        {/* ===== Footer ===== */}
        <footer className="py-12 border-t border-gray-900 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <button
                onClick={scrollToTop}
                className="text-2xl font-medium tracking-wider mb-4 md:mb-0 font-sans cursor-pointer"
              >
                <span className="text-white">RealAyonato</span><span className="text-red-600">.art</span>
              </button>
              
              <div className="flex flex-col items-center mb-4 md:mb-0">
                <p className="text-gray-500 text-sm mb-4">
                  © {new Date().getFullYear()} RealAyonato. All rights reserved.
                </p>
                
                <a
                  href="https://ko-fi.com/realayonato"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Coffee className="w-5 h-5" />
                  Buy Me a Coffee
                </a>
              </div>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <a href="https://instagram.com/realayonato" className="text-gray-500 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/@RealAyonato" className="text-gray-500 hover:text-white transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="https://www.tiktok.com/@realayonato" className="text-gray-500 hover:text-white transition-colors">
                  <SiTiktok size={20} />
                </a>
                <a href="https://x.com/RealAyonato" className="text-gray-500 hover:text-white transition-colors">
                  <SiX size={20} />
                </a>
                <a href="https://www.reddit.com/user/RealAyonato" className="text-gray-500 hover:text-white transition-colors">
                  <SiReddit size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* ===== Service Modal ===== */}
        <AnimatePresence>
          {serviceModalOpen && selectedService && (
            <Modal
              title={selectedService.title}
              subtitle="Service Details"
              onClose={closeModal}
            >
              <div className="p-6">
                <div className="mb-8">
                  <h4 className="text-xl font-medium text-white mb-4">Service Overview</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedService.modalContent.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">Process</h4>
                    <div className="space-y-3">
                      {selectedService.modalContent.process.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-red-600 text-sm font-medium">{idx + 1}</span>
                          </div>
                          <span className="text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">Deliverables</h4>
                    <div className="space-y-3">
                      {selectedService.modalContent.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-800">
                <Button 
                  className="w-full"
                  onClick={() => {
                    closeModal();
                    scrollToSection("pricing");
                  }}
                >
                  View Packages & Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {/* ===== Image Modal ===== */}
        <AnimatePresence>
          {selectedImage && (
            <ImageModal image={selectedImage} onClose={closeImageModal} />
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}