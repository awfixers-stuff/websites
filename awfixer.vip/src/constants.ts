import { Star, Crown, Download, Zap, Lock } from 'lucide-vue-next';

// All navigation and routing links
export const ROUTES = {
  home: '/',
  exclusive: '#exclusive',
  superPremium: '#superpremium',
  wallpapers: '#wallpapers',
  benefits: '#benefits',
  pricing: '#pricing',
  features: '#features',
  signIn: '/signin',
  support: '/support',
  contact: '/contact',
  about: '/about',
  privacy: '/privacy',
  terms: '/terms',
  unlockAccess: '/signup',
  previewContent: '/preview',
  getStarted: '/signup'
};

export const NAV_ITEMS = [
  {
    label: 'TIERS',
    bgColor: '#1a1a1a',
    textColor: '#ff006e',
    links: [
      { label: 'EXCLUSIVE', href: ROUTES.exclusive, ariaLabel: 'View exclusive membership plan' },
      { label: 'SUPER PREMIUM', href: ROUTES.superPremium, ariaLabel: 'View super premium membership plan' },
    ]
  },
  {
    label: 'CONTENT',
    bgColor: '#2d0015',
    textColor: '#ffbe0b',
    links: [
      { label: 'WALLPAPERS', href: ROUTES.wallpapers, ariaLabel: 'Browse premium wallpapers' },
      { label: 'EXCLUSIVE', href: ROUTES.benefits, ariaLabel: 'View membership benefits' },
    ]
  },
  {
    label: 'ACCESS',
    bgColor: '#0a0a0a',
    textColor: '#8338ec',
    links: [
      { label: 'SIGN IN', href: ROUTES.signIn, ariaLabel: 'Sign in to your account' },
      { label: 'SUPPORT', href: ROUTES.support, ariaLabel: 'Contact support' },
    ]
  }
];

export const PRICING_PLANS = [
  {
    id: 'exclusive',
    name: 'EXCLUSIVE',
    description: 'Premium access tier',
    price: 29,
    period: 'month',
    badge: 'EXCLUSIVE',
    badgeColor: 'bg-pink-500 text-black',
    icon: Star,
    features: [
      'Premium wallpaper vault',
      'Exclusive member content',
      'Priority support access',
      'Monthly exclusive drops'
    ],
    borderColor: 'border-pink-500/30 hover:border-pink-400/60',
    textColor: 'text-pink-400',
    buttonColor: 'border-pink-500/50 bg-transparent text-pink-400 hover:bg-pink-500/10 hover:border-pink-400',
    buttonText: 'UPGRADE NOW',
    buttonLink: ROUTES.unlockAccess
  },
  {
    id: 'superpremium',
    name: 'SUPER PREMIUM',
    description: 'Ultimate VIP experience',
    price: 99,
    period: 'month',
    badge: 'SUPER PREMIUM',
    badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600 text-black',
    icon: Crown,
    features: [
      'Everything in Exclusive',
      'Unlimited wallpaper access',
      'VIP early access',
      'Custom content requests',
      'Personal concierge service'
    ],
    borderColor: 'border-purple-500/40 hover:border-purple-400/80',
    textColor: 'text-purple-400',
    buttonColor: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-black',
    buttonText: 'UNLOCK VIP',
    buttonLink: ROUTES.unlockAccess
  }
];

export const FEATURES = [
  {
    id: 'vault',
    name: 'UNLIMITED VAULT',
    description: 'Access thousands of exclusive wallpapers and premium content collections',
    icon: Download,
    borderColor: 'border-pink-500/20 hover:border-pink-400/50',
    iconColor: 'from-pink-600 to-pink-700',
    link: ROUTES.wallpapers
  },
  {
    id: 'early-access',
    name: 'EARLY ACCESS',
    description: 'Be the first to access new releases and exclusive content drops',
    icon: Zap,
    borderColor: 'border-purple-500/20 hover:border-purple-400/50',
    iconColor: 'from-purple-600 to-purple-700',
    link: ROUTES.benefits
  },
  {
    id: 'vip-support',
    name: 'VIP SUPPORT',
    description: 'Dedicated priority support and personalized assistance for VIP members',
    icon: Lock,
    borderColor: 'border-pink-500/20 hover:border-pink-400/50',
    iconColor: 'from-pink-600 to-pink-700',
    link: ROUTES.support
  }
];

export const FOOTER_LINKS = [
  { label: 'ABOUT', href: ROUTES.about },
  { label: 'CONTACT', href: ROUTES.contact },
  { label: 'PRIVACY', href: ROUTES.privacy },
  { label: 'TERMS', href: ROUTES.terms }
];

export const HERO_BUTTONS = {
  unlockAccess: {
    text: 'UNLOCK ACCESS',
    link: ROUTES.unlockAccess,
    variant: 'primary' as const
  },
  previewContent: {
    text: 'PREVIEW CONTENT',
    link: ROUTES.previewContent,
    variant: 'secondary' as const
  }
};

export const SITE_CONFIG = {
  name: 'AWFixer VIP',
  fullName: 'AWFixer.VIP',
  tagline: 'PREMIUM ACCESS ONLY',
  description: 'Unlock exclusive content and VIP access with our premium membership tiers',
  logo: '/morty.jpeg',
  favicon: '/morty.jpeg',
  ogImage: '/mortywelcome.png',
  title: 'AWFixer VIP - Exclusive Premium Membership'
};

export const COLORS = {
  primary: {
    pink: '#ff006e',
    purple: '#8338ec',
    yellow: '#ffbe0b'
  },
  gradient: {
    pinkToPurple: 'from-pink-600 to-purple-600',
    purpleToPink: 'from-purple-600 to-pink-600',
    text: 'from-white via-pink-500 to-purple-600'
  },
  backgrounds: {
    main: 'bg-black',
    secondary: 'bg-gradient-to-br from-gray-900 to-black',
    accent: 'bg-gradient-to-br from-black via-purple-950/20 to-black'
  }
};

export const ANIMATIONS = {
  scale: 'transform hover:scale-105',
  glow: 'hover:shadow-[0_0_40px_rgba(255,0,110,0.3)]',
  glowPurple: 'hover:shadow-[0_0_60px_rgba(131,56,236,0.4)]',
  glowSmall: 'hover:shadow-[0_0_30px_rgba(255,0,110,0.2)]',
  transition: 'transition-all duration-300',
  transitionSlow: 'transition-all duration-500',
  fadeIn: 'animate-in fade-in duration-500',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-500'
};