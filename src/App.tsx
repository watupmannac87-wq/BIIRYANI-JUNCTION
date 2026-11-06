/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  Flame,
  Zap,
  Tag,
  Menu as MenuIcon,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Send,
  Navigation
} from 'lucide-react';

/* ==========================================================================
   DIRECT ASSET IMPORTS (BUNDLED VIA VITE FOR 100% RELIABILITY)
   These resolve properly in both development server and production builds.
   ========================================================================== */
import heroBiryaniPotImg from './assets/images/hero_biryani_pot_1793951325565.jpg';
import dishChickenBiryaniImg from './assets/images/dish_chicken_biryani_1793951326719.jpg';
import dishBonelessBiryaniImg from './assets/images/dish_boneless_biryani_1793952190741.jpg';
import dishMuttonBiryaniImg from './assets/images/dish_mutton_biryani_1793951326937.jpg';
import dishMuttonHandiImg from './assets/images/dish_mutton_handi_family_1793952192406.jpg';
import dishVegPaneerImg from './assets/images/dish_veg_paneer_biryani_1793951327983.jpg';
import dishSubzBiryaniImg from './assets/images/dish_subz_veg_biryani_1793952191645.jpg';
import dishStarterKebabImg from './assets/images/dish_tandoori_starter_1793951326949.jpg';
import dishLollipopImg from './assets/images/dish_chicken_lollipop_1793952189750.jpg';
import comboFeastImg from './assets/images/combo_biryani_feast_1793952193238.jpg';
import mangoLassiImg from './assets/images/dish_mango_lassi_1793952192796.jpg';

/* ==========================================================================
   RESILIENT FOOD IMAGE COMPONENT WITH MULTI-TIER FALLBACK
   Prevents broken image icons or missing frames from ever rendering.
   ========================================================================== */
interface FoodImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
}

function FoodImage({
  src,
  fallbackSrc = '/images/hero_biryani_pot.jpg',
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy'
}: FoodImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasFailedAll, setHasFailedAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    setCurrentSrc(src);
    setHasFailedAll(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasFailedAll(true);
    }
  };

  if (hasFailedAll) {
    return (
      <div className={`relative flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#8B1B15] to-[#540E0A] text-white ${className}`}>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
          <Flame className="w-5 h-5 text-amber-300" />
        </div>
        <p className="font-display text-sm font-bold line-clamp-1">{alt}</p>
        <span className="text-[11px] text-amber-200/90 mt-0.5">Biryani Junction · Fresh Dum</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-900/10 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200/50 animate-pulse flex items-center justify-center pointer-events-none">
          <Flame className="w-6 h-6 text-amber-500/25" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  );
}

/* ==========================================================================
   1. EDITABLE BUSINESS CONFIGURATION & DETAILS
   Shop owner can easily modify contact numbers, addresses, timings, etc.
   ========================================================================== */
export const RESTAURANT_CONFIG = {
  name: "Biryani Junction",
  tagline: "Authentic Biryani, Made Fresh Every Day",
  subTagline: "Handcrafted with aged basmati rice, slow-cooked in traditional clay dum pots, and infused with secret royal spices in Talegaon Dabhade.",
  phoneDisplay: "09096321998",
  phoneTel: "tel:09096321998",
  phoneRaw: "919096321998",
  whatsappBaseUrl: "https://wa.me/919096321998",
  address: "Mantra City 360, Talegaon Dabhade, Maharashtra 410506",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Mantra+City+360+Talegaon+Dabhade+Maharashtra+410506",
  googleMapsEmbedUrl: "https://www.google.com/maps?q=Mantra+City+360+Talegaon+Dabhade+Maharashtra+410506&output=embed",
  rating: "4.8",
  ratingStars: 4.8,
  totalReviews: 43,
  openingHours: {
    weekdays: "11:30 AM – 11:00 PM",
    weekends: "11:30 AM – 11:30 PM",
    kitchenNote: "Fresh Dum Batches Ready by 12:30 PM & 7:30 PM",
  },
  services: ["Takeaway & Dine-in", "Pre-orders on WhatsApp", "Party & Bulk Catering", "Mantra City Fast Delivery"],
};

/* ==========================================================================
   2. EDITABLE MENU ITEMS & CATEGORIES
   ========================================================================== */
export interface MenuItem {
  id: string;
  category: 'Chicken Biryani' | 'Mutton Biryani' | 'Veg Biryani' | 'Starters' | 'Drinks';
  name: string;
  description: string;
  price: number;
  image: string;
  fallbackImage?: string;
  isBestseller?: boolean;
  portion: string;
  serves: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Authentic Spicy';
  dietType: 'non-veg' | 'veg';
}

export const MENU_CATEGORIES = [
  'Chicken Biryani',
  'Mutton Biryani',
  'Veg Biryani',
  'Starters',
  'Drinks'
] as const;

export type MenuCategoryType = typeof MENU_CATEGORIES[number];

export const MENU_ITEMS: MenuItem[] = [
  // --- CHICKEN BIRYANI ---
  {
    id: "cb-1",
    category: "Chicken Biryani",
    name: "Hyderabadi Chicken Dum Biryani",
    description: "Tender spiced chicken slow-cooked with aged long-grain basmati rice, fried mint, saffron milk, and caramelized birista onions.",
    price: 240,
    portion: "Half / Full",
    serves: "1-2 Persons",
    spiceLevel: "Authentic Spicy",
    dietType: "non-veg",
    isBestseller: true,
    image: dishChickenBiryaniImg,
    fallbackImage: "/images/dish_chicken_biryani.jpg"
  },
  {
    id: "cb-2",
    category: "Chicken Biryani",
    name: "Boneless Chicken Tikka Biryani",
    description: "Tender boneless chicken tikka tossed in spicy roasted gravy and layered with fragrant basmati rice and fresh lemon wedges.",
    price: 270,
    portion: "Full",
    serves: "1-2 Persons",
    spiceLevel: "Medium",
    dietType: "non-veg",
    image: dishBonelessBiryaniImg,
    fallbackImage: "/images/dish_boneless_biryani.jpg"
  },
  {
    id: "cb-3",
    category: "Chicken Biryani",
    name: "Clay Handi Chicken Biryani",
    description: "Traditional sealed earthen handi dum biryani served with spicy Mirchi Ka Salan and fresh cooling mint raita.",
    price: 320,
    portion: "Clay Handi (750g)",
    serves: "2-3 Persons",
    spiceLevel: "Authentic Spicy",
    dietType: "non-veg",
    image: heroBiryaniPotImg,
    fallbackImage: "/images/hero_biryani_pot.jpg"
  },
  {
    id: "cb-4",
    category: "Chicken Biryani",
    name: "Royal Biryani Combo Feast",
    description: "Full portion chicken dum biryani served with creamy cucumber mint raita, spicy Mirchi Ka Salan, boiled egg, and a refreshing beverage.",
    price: 299,
    portion: "Complete Combo",
    serves: "1-2 Persons",
    spiceLevel: "Medium",
    dietType: "non-veg",
    isBestseller: true,
    image: comboFeastImg,
    fallbackImage: "/images/combo_biryani_feast.jpg"
  },

  // --- MUTTON BIRYANI ---
  {
    id: "mb-1",
    category: "Mutton Biryani",
    name: "Royal Mutton Dum Biryani",
    description: "Succulent bone-in mutton pieces simmered in royal spices, kewra, and roasted cashews layered with fragrant saffron basmati rice.",
    price: 340,
    portion: "Standard Pot",
    serves: "1-2 Persons",
    spiceLevel: "Authentic Spicy",
    dietType: "non-veg",
    isBestseller: true,
    image: dishMuttonBiryaniImg,
    fallbackImage: "/images/dish_mutton_biryani.jpg"
  },
  {
    id: "mb-2",
    category: "Mutton Biryani",
    name: "Mutton Handi Biryani (Family Pack)",
    description: "Generous traditional clay handi of melt-in-mouth tender mutton and aromatic dum rice, slow-simmered over charcoal wood fire.",
    price: 640,
    portion: "Handi Family (1.2kg)",
    serves: "3-4 Persons",
    spiceLevel: "Authentic Spicy",
    dietType: "non-veg",
    image: dishMuttonHandiImg,
    fallbackImage: "/images/dish_mutton_handi_family.jpg"
  },

  // --- VEG BIRYANI ---
  {
    id: "vb-1",
    category: "Veg Biryani",
    name: "Royal Paneer Tikka Dum Biryani",
    description: "Char-grilled fresh cottage cheese cubes, seasoned with garden herbs, caramelized birista, and saffron infused basmati rice.",
    price: 210,
    portion: "Standard Plate",
    serves: "1-2 Persons",
    spiceLevel: "Medium",
    dietType: "veg",
    isBestseller: true,
    image: dishVegPaneerImg,
    fallbackImage: "/images/dish_veg_paneer_biryani.jpg"
  },
  {
    id: "vb-2",
    category: "Veg Biryani",
    name: "Subz Handi Dum Biryani",
    description: "Colorful fresh vegetables including green peas, diced carrots, french beans, and cauliflower tossed in aromatic herbs and basmati.",
    price: 190,
    portion: "Standard Plate",
    serves: "1-2 Persons",
    spiceLevel: "Medium",
    dietType: "veg",
    image: dishSubzBiryaniImg,
    fallbackImage: "/images/dish_subz_veg_biryani.jpg"
  },

  // --- STARTERS ---
  {
    id: "st-1",
    category: "Starters",
    name: "Chicken Tikka Kebab (8 Pcs)",
    description: "Juicy chicken chunks marinated in mustard oil, hung curd, and roasted degi mirch, char-grilled with mint dip and sliced onions.",
    price: 220,
    portion: "8 Pieces",
    serves: "2 Persons",
    spiceLevel: "Authentic Spicy",
    dietType: "non-veg",
    isBestseller: true,
    image: dishStarterKebabImg,
    fallbackImage: "/images/dish_tandoori_starter.jpg"
  },
  {
    id: "st-2",
    category: "Starters",
    name: "Crispy Chicken Lollipop (6 Pcs)",
    description: "Crispy Indo-Chinese chicken lollipops with foil-wrapped handles and spicy fiery schezwan glaze, served with fresh lemon.",
    price: 200,
    portion: "6 Pieces",
    serves: "2 Persons",
    spiceLevel: "Authentic Spicy",
    dietType: "non-veg",
    image: dishLollipopImg,
    fallbackImage: "/images/dish_chicken_lollipop.jpg"
  },
  {
    id: "st-3",
    category: "Starters",
    name: "Paneer Tikka Starter (6 Pcs)",
    description: "Tender spiced paneer cubes marinated in rich cashew cream and herbs, grilled with peppers and served with mint chutney.",
    price: 190,
    portion: "6 Pieces",
    serves: "2 Persons",
    spiceLevel: "Mild",
    dietType: "veg",
    image: dishVegPaneerImg,
    fallbackImage: "/images/dish_veg_paneer_biryani.jpg"
  },

  // --- DRINKS ---
  {
    id: "dr-1",
    category: "Drinks",
    name: "Royal Mango Lassi (Clay Kulhad)",
    description: "Thick, chilled Alphonso mango blended with rich creamy curd, cardamom, and garnished with saffron strands and pistachios.",
    price: 70,
    portion: "300ml Kulhad",
    serves: "1 Person",
    dietType: "veg",
    isBestseller: true,
    image: mangoLassiImg,
    fallbackImage: "/images/dish_mango_lassi.jpg"
  },
  {
    id: "dr-2",
    category: "Drinks",
    name: "Masala Chaas & Fresh Raita",
    description: "Traditional refreshing churned buttermilk tempered with roasted cumin, rock salt, ginger, and fresh mint leaves.",
    price: 40,
    portion: "300ml Glass",
    serves: "1 Person",
    dietType: "veg",
    image: comboFeastImg,
    fallbackImage: "/images/combo_biryani_feast.jpg"
  },
  {
    id: "dr-3",
    category: "Drinks",
    name: "Fresh Nimbu Shikanji",
    description: "Tangy Indian lemonade with freshly squeezed lemons, black rock salt, cumin, and fresh crushed mint leaves.",
    price: 45,
    portion: "350ml Glass",
    serves: "1 Person",
    dietType: "veg",
    image: comboFeastImg,
    fallbackImage: "/images/combo_biryani_feast.jpg"
  }
];

/* ==========================================================================
   3. GALLERY PHOTOS DATA
   ========================================================================== */
export const GALLERY_ITEMS = [
  {
    title: "Clay Handi Dum Biryani",
    caption: "Slow-cooked over natural charcoal embers with aromatic steam",
    image: heroBiryaniPotImg,
    fallbackImage: "/images/hero_biryani_pot.jpg",
    tag: "Signature Dish"
  },
  {
    title: "Hyderabadi Chicken Dum Biryani",
    caption: "Tender spiced chicken with saffron-tinted aged basmati rice",
    image: dishChickenBiryaniImg,
    fallbackImage: "/images/dish_chicken_biryani.jpg",
    tag: "Bestseller"
  },
  {
    title: "Royal Mutton Copper Thali",
    caption: "Succulent mutton pieces layered with birista and cashews",
    image: dishMuttonBiryaniImg,
    fallbackImage: "/images/dish_mutton_biryani.jpg",
    tag: "Chef Special"
  },
  {
    title: "Grand Mutton Dum Handi",
    caption: "Overflowing family handi with prime bone-in tender cuts",
    image: dishMuttonHandiImg,
    fallbackImage: "/images/dish_mutton_handi_family.jpg",
    tag: "Family Handi"
  },
  {
    title: "Biryani Combo Feast",
    caption: "Served with cooling mint raita, mirchi ka salan, and boiled egg",
    image: comboFeastImg,
    fallbackImage: "/images/combo_biryani_feast.jpg",
    tag: "Complete Meal"
  },
  {
    title: "Crispy Chicken Lollipop",
    caption: "Spicy Indo-Chinese starters with fiery schezwan sauce",
    image: dishLollipopImg,
    fallbackImage: "/images/dish_chicken_lollipop.jpg",
    tag: "Starters"
  },
  {
    title: "Sizzling Tandoori Kebabs",
    caption: "Char-grilled fresh chicken tikka with mint chutney",
    image: dishStarterKebabImg,
    fallbackImage: "/images/dish_tandoori_starter.jpg",
    tag: "Tandoor Fresh"
  },
  {
    title: "Subz Vegetable Dum Handi",
    caption: "Farm fresh garden vegetables in authentic dum spices",
    image: dishSubzBiryaniImg,
    fallbackImage: "/images/dish_subz_veg_biryani.jpg",
    tag: "Pure Veg Choice"
  },
  {
    title: "Chilled Mango Lassi Kulhad",
    caption: "Rich Alphonso mango lassi topped with saffron & pistachios",
    image: mangoLassiImg,
    fallbackImage: "/images/dish_mango_lassi.jpg",
    tag: "Cooler"
  }
];

/* Helper to build WhatsApp direct link */
function getWhatsAppOrderLink(dishName?: string, price?: number): string {
  if (dishName && price) {
    const text = `Hello Biryani Junction! I would like to order:\n- Dish: ${dishName} (₹${price})\n\nPlease share delivery / takeaway availability at Mantra City 360, Talegaon Dabhade.`;
    return `${RESTAURANT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
  }
  const generalText = `Hello Biryani Junction! I want to place an order from your menu. Please share today's specials and takeaway timing.`;
  return `${RESTAURANT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(generalText)}`;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryType>('Chicken Biryani');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Enquiry form state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryGuests, setEnquiryGuests] = useState('Takeaway Pickup');
  const [enquiryMessage, setEnquiryMessage] = useState('');

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Biryani Junction,\nI have an enquiry / order request:\n\n👤 Name: ${enquiryName || 'Customer'}\n📞 Phone: ${enquiryPhone || 'Not provided'}\n🍛 Order Type: ${enquiryGuests}\n💬 Details: ${enquiryMessage || 'Please share menu and options.'}`;
    const url = `${RESTAURANT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
    window.location.href = url;
  };

  const filteredMenuItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-[#1C1917] flex flex-col font-sans selection:bg-[#EA580C] selection:text-white">

      {/* ====================================================================
          1. STICKY HEADER
          Top Bar Contract: 3 zones separated by gap-8
          Zone 1: Logo text "Biryani Junction"
          Zone 2: Nav links
          Zone 3: "Order on WhatsApp" button
          ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FCF9F2]/95 backdrop-blur-md border-b border-[#1C1917]/10 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#8B1B15] to-[#EA580C] text-white flex items-center justify-center shadow-md shadow-[#8B1B15]/20 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-amber-200" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#8B1B15]">
                Biryani Junction
              </span>
              <span className="text-[11px] font-medium text-[#78716C] -mt-1 tracking-wider hidden sm:block">
                Talegaon Dabhade
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#44403C]">
            <a href="#menu" className="hover:text-[#8B1B15] transition-colors whitespace-nowrap shrink-0">
              Menu & Prices
            </a>
            <a href="#why-us" className="hover:text-[#8B1B15] transition-colors whitespace-nowrap shrink-0">
              Why Choose Us
            </a>
            <a href="#gallery" className="hover:text-[#8B1B15] transition-colors whitespace-nowrap shrink-0">
              Food Gallery
            </a>
            <a href="#location" className="hover:text-[#8B1B15] transition-colors whitespace-nowrap shrink-0">
              Location & Hours
            </a>
            <a href="#contact" className="hover:text-[#8B1B15] transition-colors whitespace-nowrap shrink-0">
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href={RESTAURANT_CONFIG.phoneTel}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#8B1B15] bg-[#8B1B15]/10 hover:bg-[#8B1B15]/15 rounded-xl transition-colors whitespace-nowrap shrink-0"
              title="Call Biryani Junction"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESTAURANT_CONFIG.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-[#44403C] hover:text-[#1C1917] rounded-lg hover:bg-black/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FCF9F2] border-b border-[#1C1917]/10 px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-2 text-base font-medium text-[#44403C]">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#8B1B15]/10 hover:text-[#8B1B15]"
              >
                Menu & Dishes
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#8B1B15]/10 hover:text-[#8B1B15]"
              >
                Why Choose Us
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#8B1B15]/10 hover:text-[#8B1B15]"
              >
                Food Gallery
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#8B1B15]/10 hover:text-[#8B1B15]"
              >
                Location & Map
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#8B1B15]/10 hover:text-[#8B1B15]"
              >
                Contact & Enquiry
              </a>
            </nav>
            <div className="pt-2 border-t border-[#1C1917]/10 flex flex-col sm:hidden gap-2">
              <a
                href={RESTAURANT_CONFIG.phoneTel}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-[#8B1B15] bg-[#8B1B15]/10 rounded-xl"
              >
                <Phone className="w-4 h-4" />
                <span>Call {RESTAURANT_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* ====================================================================
            2. HERO SECTION
            Large food photo hero, headline, tagline, two buttons:
            "Order on WhatsApp" and "Call Now"
            ==================================================================== */}
        <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Headline & Action */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                
                {/* Location indicator metadata */}
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#EA580C] uppercase mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Mantra City 360, Talegaon Dabhade</span>
                  <span aria-hidden="true">·</span>
                  <span>Dine-In & Takeaway</span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C1917] leading-[1.12] mb-5 text-balance">
                  Authentic Biryani, <span className="text-[#8B1B15]">Made Fresh Every Day</span>
                </h1>

                <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-8 max-w-xl">
                  {RESTAURANT_CONFIG.subTagline}
                </p>

                {/* Primary Dual Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                  <a
                    href={getWhatsAppOrderLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 text-base font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-xl shadow-lg shadow-[#15803D]/25 hover:shadow-xl transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Order on WhatsApp</span>
                  </a>

                  <a
                    href={RESTAURANT_CONFIG.phoneTel}
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 text-base font-semibold text-[#8B1B15] bg-[#8B1B15]/10 hover:bg-[#8B1B15]/15 border border-[#8B1B15]/20 rounded-xl transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now ({RESTAURANT_CONFIG.phoneDisplay})</span>
                  </a>
                </div>

                {/* Quick Trust Strip */}
                <div className="mt-8 pt-6 border-t border-[#1C1917]/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#78716C]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>Slow-cooked in Handi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>100% Halal Chicken & Mutton</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>Dedicated Veg Dum Pots</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Decorative backdrop glow */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-[#EA580C]/25 via-[#8B1B15]/20 to-amber-400/20 rounded-3xl blur-xl opacity-80" />
                  
                  {/* Card Container */}
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-black/5">
                    <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-amber-950/20 relative">
                      <FoodImage
                        src={heroBiryaniPotImg}
                        fallbackSrc="/images/hero_biryani_pot.jpg"
                        alt="Authentic Hyderabadi chicken dum biryani in traditional clay handi at Biryani Junction"
                        className="w-full h-full"
                        imgClassName="transform hover:scale-105 transition-transform duration-700"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                      
                      {/* Floating dish tag */}
                      <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                        <span className="text-xs font-semibold tracking-wider uppercase text-amber-300">
                          Handcrafted Recipe
                        </span>
                        <p className="font-display text-lg font-bold">
                          Royal Clay Handi Dum Biryani
                        </p>
                        <p className="text-xs text-white/80 line-clamp-1">
                          Aged basmati rice · Saffron aroma · Ghee birista
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ====================================================================
            3. RATING BADGE SECTION
            Exact requirement: "4.8 ★ rated by 43 customers on Google"
            ==================================================================== */}
        <section className="py-6 bg-[#F5EFE0] border-y border-[#1C1917]/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
              
              {/* Google Brand Mark & Stars */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-black/5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/80 text-amber-400'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Exact Badge Copy */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-display text-lg sm:text-xl font-bold text-[#1C1917] tracking-tight">
                  4.8 ★ rated by 43 customers on Google
                </span>
                <span className="text-xs sm:text-sm text-[#78716C]">
                  (Talegaon Dabhade's Favorite Dum Biryani Spot)
                </span>
              </div>

            </div>
          </div>
        </section>


        {/* ====================================================================
            4. MENU SECTION
            ==================================================================== */}
        <section id="menu" className="py-16 sm:py-24 bg-[#FCF9F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                Freshly Dum Cooked
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-2 mb-3">
                Our Royal Biryani Menu
              </h2>
              <p className="text-base text-[#57534E]">
                Select your favorite authentic biryani, starters, or coolers. Click "Order on WhatsApp" to send an instant order directly to our counter.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
              {MENU_CATEGORIES.map(category => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#8B1B15] text-white shadow-md shadow-[#8B1B15]/20 scale-100'
                        : 'bg-white text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5EFE0] border border-black/5'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Dish Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredMenuItems.map(dish => (
                <div
                  key={dish.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col group"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-amber-950/10">
                    <FoodImage
                      src={dish.image}
                      fallbackSrc={dish.fallbackImage || "/images/hero_biryani_pot.jpg"}
                      alt={dish.name}
                      className="w-full h-full"
                      imgClassName="group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Diet indicator badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs flex items-center gap-1.5 text-[11px] font-semibold text-[#1C1917] pointer-events-none">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          dish.dietType === 'veg' ? 'bg-emerald-600' : 'bg-red-600'
                        }`}
                      />
                      <span>{dish.dietType === 'veg' ? 'Veg' : 'Non-Veg'}</span>
                    </div>

                    {/* Serves info tag */}
                    <div className="absolute bottom-3 left-3 text-white text-xs font-medium drop-shadow-sm pointer-events-none">
                      <span>{dish.portion}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{dish.serves}</span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#1C1917] leading-snug group-hover:text-[#8B1B15] transition-colors">
                          {dish.name}
                        </h3>
                        <div className="text-right shrink-0">
                          <span className="font-display text-xl font-extrabold text-[#8B1B15] tabular-nums">
                            ₹{dish.price}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#57534E] leading-relaxed line-clamp-2 mb-4">
                        {dish.description}
                      </p>
                    </div>

                    {/* Action Area */}
                    <div className="pt-4 border-t border-black/5 flex items-center justify-between gap-3">
                      <div className="text-xs text-[#78716C]">
                        {dish.spiceLevel ? (
                          <span className="font-medium text-[#EA580C]">
                            {dish.spiceLevel}
                          </span>
                        ) : (
                          <span>Chilled fresh</span>
                        )}
                      </div>

                      <a
                        href={getWhatsAppOrderLink(dish.name, dish.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#15803D] hover:bg-[#166534] rounded-xl shadow-xs hover:shadow-md transition-all whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Order ₹{dish.price}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk / Party order notice */}
            <div className="mt-12 p-6 rounded-2xl bg-[#F5EFE0] border border-[#1C1917]/10 text-center max-w-2xl mx-auto">
              <h4 className="font-display text-lg font-bold text-[#1C1917] mb-1">
                Hosting a Celebration or Family Gathering?
              </h4>
              <p className="text-xs sm:text-sm text-[#57534E] mb-4">
                We prepare bulk Dum Biryani Handis (1 kg, 2.5 kg, 5 kg) with prior notice.
              </p>
              <a
                href={getWhatsAppOrderLink("Bulk Handi Catering (Kilos)", 1200)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8B1B15] hover:text-[#6B110B] underline underline-offset-4"
              >
                <span>Enquire about Bulk Biryani Handis on WhatsApp</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>


        {/* ====================================================================
            5. WHY CHOOSE US
            ==================================================================== */}
        <section id="why-us" className="py-16 sm:py-24 bg-white border-t border-[#1C1917]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                The Biryani Junction Promise
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-2 mb-3">
                Why Choose Us
              </h2>
              <p className="text-base text-[#57534E]">
                We honor ancient dum cooking traditions with zero compromises on quality, hygiene, and authentic flavors.
              </p>
            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-[#FCF9F2] rounded-2xl p-6 sm:p-7 border border-black/5 hover:border-[#8B1B15]/20 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#8B1B15]/10 text-[#8B1B15] flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1C1917] mb-2">
                  Fresh Ingredients
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Daily-sourced fresh tender chicken, certified mutton, aged royal basmati rice, and pure desi ghee in every batch.
                </p>
              </div>

              <div className="bg-[#FCF9F2] rounded-2xl p-6 sm:p-7 border border-black/5 hover:border-[#8B1B15]/20 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center mb-5">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1C1917] mb-2">
                  Authentic Spices
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Stone-ground whole spices, Kashmiri saffron, star anise, and Shahi jeera infused into sealed clay handis.
                </p>
              </div>

              <div className="bg-[#FCF9F2] rounded-2xl p-6 sm:p-7 border border-black/5 hover:border-[#8B1B15]/20 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1C1917] mb-2">
                  Fast Service
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Instant counter takeaway packing and prompt delivery within Mantra City 360 and Talegaon Dabhade neighborhoods.
                </p>
              </div>

              <div className="bg-[#FCF9F2] rounded-2xl p-6 sm:p-7 border border-black/5 hover:border-[#8B1B15]/20 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#15803D]/10 text-[#15803D] flex items-center justify-center mb-5">
                  <Tag className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1C1917] mb-2">
                  Affordable Prices
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Generous portions starting from ₹190, offering unbeatable value without sacrificing restaurant-grade taste.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ====================================================================
            6. GALLERY SECTION
            ==================================================================== */}
        <section id="gallery" className="py-16 sm:py-24 bg-[#FCF9F2] border-t border-[#1C1917]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                Visual Feast
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-2 mb-3">
                Food Gallery
              </h2>
              <p className="text-base text-[#57534E]">
                Take a peek at our fresh pots, steaming basmati grains, tender meat cuts, and sizzling appetizers.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-amber-950/20 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <FoodImage
                    src={item.image}
                    fallbackSrc={item.fallbackImage || "/images/hero_biryani_pot.jpg"}
                    alt={item.title}
                    className="w-full h-full"
                    imgClassName="group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Subtle darkening overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

                  {/* Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-300 mb-1 block">
                      {item.tag}
                    </span>
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* ====================================================================
            7. LOCATION & HOURS SECTION
            ==================================================================== */}
        <section id="location" className="py-16 sm:py-24 bg-white border-t border-[#1C1917]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Location Details & Hours */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                    Visit Our Counter
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-2 mb-4">
                    Location & Opening Hours
                  </h2>
                  <p className="text-base text-[#57534E] mb-8">
                    Conveniently located at Mantra City 360 with easy parking, quick pickup counters, and cozy seating.
                  </p>

                  {/* Address Box */}
                  <div className="mb-6 p-5 rounded-2xl bg-[#FCF9F2] border border-black/5 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#8B1B15]/10 text-[#8B1B15] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#1C1917] mb-1">
                        Our Address
                      </h3>
                      <p className="text-sm text-[#44403C] leading-relaxed font-medium">
                        {RESTAURANT_CONFIG.address}
                      </p>
                      <p className="text-xs text-[#78716C] mt-1">
                        Landmark: Mantra City 360 Complex
                      </p>
                    </div>
                  </div>

                  {/* Hours Box */}
                  <div className="mb-8 p-5 rounded-2xl bg-[#FCF9F2] border border-black/5 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="w-full">
                      <h3 className="font-display text-base font-bold text-[#1C1917] mb-2">
                        Opening Hours
                      </h3>
                      <div className="space-y-1.5 text-sm text-[#44403C]">
                        <div className="flex justify-between items-center py-0.5 border-b border-black/5">
                          <span className="text-[#78716C]">Monday – Friday:</span>
                          <span className="font-semibold">{RESTAURANT_CONFIG.openingHours.weekdays}</span>
                        </div>
                        <div className="flex justify-between items-center py-0.5 border-b border-black/5">
                          <span className="text-[#78716C]">Saturday & Sunday:</span>
                          <span className="font-semibold">{RESTAURANT_CONFIG.openingHours.weekends}</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#EA580C] font-medium mt-2">
                        ★ {RESTAURANT_CONFIG.openingHours.kitchenNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={RESTAURANT_CONFIG.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#8B1B15] hover:bg-[#6B110B] rounded-xl shadow-md transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>

              </div>

              {/* Embedded Google Map */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-black/10 bg-[#FCF9F2] aspect-[4/3] sm:aspect-[16/10] w-full">
                  <iframe
                    title="Biryani Junction Location at Mantra City 360, Talegaon Dabhade"
                    src={RESTAURANT_CONFIG.googleMapsEmbedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-black/5 hidden sm:flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                    <MapPin className="w-3.5 h-3.5 text-[#8B1B15]" />
                    <span>Mantra City 360, Talegaon Dabhade</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ====================================================================
            8. CONTACT & ENQUIRY SECTION
            ==================================================================== */}
        <section id="contact" className="py-16 sm:py-24 bg-[#FCF9F2] border-t border-[#1C1917]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                Get In Touch
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-2 mb-3">
                Contact & Quick Order Enquiry
              </h2>
              <p className="text-base text-[#57534E]">
                Have a question, catering request, or special dietary preference? Send us an instant message on WhatsApp or call us directly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
              
              {/* Contact Channels Card */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-black/5 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1C1917] mb-6">
                    Direct Contact Channels
                  </h3>

                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#8B1B15]/10 text-[#8B1B15] flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-[#78716C] block">Direct Phone</span>
                        <a
                          href={RESTAURANT_CONFIG.phoneTel}
                          className="font-display text-lg font-bold text-[#1C1917] hover:text-[#8B1B15] transition-colors"
                        >
                          {RESTAURANT_CONFIG.phoneDisplay}
                        </a>
                        <p className="text-xs text-[#78716C] mt-0.5">Click to call immediately</p>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#15803D]/10 text-[#15803D] flex items-center justify-center shrink-0">
                        <MessageCircle className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <span className="text-xs text-[#78716C] block">WhatsApp Counter</span>
                        <a
                          href={RESTAURANT_CONFIG.whatsappBaseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-lg font-bold text-[#15803D] hover:underline"
                        >
                          +91 90963 21998
                        </a>
                        <p className="text-xs text-[#78716C] mt-0.5">Fastest response for takeaway orders</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-[#78716C] block">Store Address</span>
                        <p className="text-sm font-semibold text-[#1C1917] leading-snug">
                          {RESTAURANT_CONFIG.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/5 text-xs text-[#78716C]">
                  <span>Serving hot, fragrant dum biryani daily across Talegaon Dabhade.</span>
                </div>
              </div>

              {/* Enquiry Form */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-black/5 shadow-sm">
                <h3 className="font-display text-xl font-bold text-[#1C1917] mb-2">
                  Send an Order or Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] mb-6">
                  Fill in your details below and hit "Send on WhatsApp" to open a pre-filled chat with our staff.
                </p>

                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#44403C] uppercase tracking-wider mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/10 focus:border-[#8B1B15] focus:ring-2 focus:ring-[#8B1B15]/20 text-sm outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[#44403C] uppercase tracking-wider mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/10 focus:border-[#8B1B15] focus:ring-2 focus:ring-[#8B1B15]/20 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="orderType" className="block text-xs font-semibold text-[#44403C] uppercase tracking-wider mb-1.5">
                      Order / Request Type
                    </label>
                    <select
                      id="orderType"
                      value={enquiryGuests}
                      onChange={(e) => setEnquiryGuests(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 focus:border-[#8B1B15] focus:ring-2 focus:ring-[#8B1B15]/20 text-sm outline-none transition-all bg-white"
                    >
                      <option value="Takeaway Pickup">Takeaway Pickup</option>
                      <option value="Home Delivery (Mantra City / Nearby)">Home Delivery (Mantra City / Nearby)</option>
                      <option value="Bulk Handi / Party Order">Bulk Handi / Party Order</option>
                      <option value="Table Reservation">Dine-in Table Enquiry</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#44403C] uppercase tracking-wider mb-1.5">
                      Message / Dishes Needed
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      placeholder="e.g., 2 Chicken Dum Biryani, 1 Chicken Tikka, delivery to Flat 402 by 8 PM..."
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 focus:border-[#8B1B15] focus:ring-2 focus:ring-[#8B1B15]/20 text-sm outline-none transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-white bg-[#15803D] hover:bg-[#166534] rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-center text-[#78716C]">
                    Direct connection to our WhatsApp counter (No registration required).
                  </p>
                </form>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* ====================================================================
          9. FOOTER
          ==================================================================== */}
      <footer className="bg-[#1C1917] text-white/90 pt-12 pb-16 sm:pb-12 border-t border-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
            
            {/* Brand Col */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B1B15] to-[#EA580C] text-white flex items-center justify-center">
                  <Flame className="w-4 h-4 text-amber-200" />
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  Biryani Junction
                </span>
              </div>
              <p className="text-sm text-stone-400 max-w-sm leading-relaxed mb-4">
                Authentic handcrafted Dum Biryani in Talegaon Dabhade. Made fresh every day with authentic whole spices and slow-cooked in traditional clay dum handis.
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>4.8 ★ rated by 43 customers on Google</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-stone-300 mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#menu" className="hover:text-amber-400 transition-colors">Menu & Pricing</a></li>
                <li><a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose Us</a></li>
                <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Food Gallery</a></li>
                <li><a href="#location" className="hover:text-amber-400 transition-colors">Location & Hours</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Order on WhatsApp</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="md:col-span-4">
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-stone-300 mb-3">
                Visit & Contact
              </h4>
              <div className="space-y-2.5 text-sm text-stone-400">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                  <span>{RESTAURANT_CONFIG.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <a href={RESTAURANT_CONFIG.phoneTel} className="hover:text-white font-medium">
                    {RESTAURANT_CONFIG.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>Daily: 11:30 AM – 11:00 PM</span>
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
            <p>© {new Date().getFullYear()} Biryani Junction. All rights reserved.</p>
            <p>Mantra City 360, Talegaon Dabhade, Maharashtra 410506</p>
          </div>

        </div>
      </footer>

      {/* ====================================================================
          10. FLOATING WHATSAPP BUTTON
          ==================================================================== */}
      <aside aria-label="Quick WhatsApp Order" className="fixed bottom-5 right-5 z-50">
        <a
          href={getWhatsAppOrderLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-[#15803D] hover:bg-[#166534] text-white pl-3.5 pr-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
          title="Chat & Order on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap">
            Order on WhatsApp
          </span>
        </a>
      </aside>

    </div>
  );
}
