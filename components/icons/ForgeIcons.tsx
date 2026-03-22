// components/icons/ForgeIcons.tsx
"use client";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Color palette
const colors = {
  teal: '#14B8B8',
  orange: '#FF8C42',
  green: '#52B788',
  yellow: '#FFD54F',
};

export const IconLearn = ({ className = '', size = 24, color = colors.teal }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2" strokeOpacity="0.2"/>
    <path d="M24 8L38 16V32L24 40L10 32V16L24 8Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M24 8V24M24 24L38 16M24 24L10 16" stroke={color} strokeWidth="2" strokeOpacity="0.6"/>
    <circle cx="24" cy="24" r="4" fill={color}/>
    <path d="M24 28V36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconLaunch = ({ className = '', size = 24, color = colors.orange }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2" strokeOpacity="0.2"/>
    <path d="M24 8C24 8 32 14 32 24C32 34 24 40 24 40" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 8C24 8 16 14 16 24C16 34 24 40 24 40" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="6" fill={color}/>
    <path d="M24 12L26 18H22L24 12Z" fill={color}/>
    <path d="M18 20L16 16M30 20L32 16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconBuild = ({ className = '', size = 24, color = colors.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2" strokeOpacity="0.2"/>
    <rect x="14" y="22" width="20" height="16" rx="2" stroke={color} strokeWidth="2.5"/>
    <path d="M18 22V16C18 12.6863 20.6863 10 24 10V10C27.3137 10 30 12.6863 30 16V22" stroke={color} strokeWidth="2.5"/>
    <rect x="20" y="28" width="8" height="6" rx="1" fill={color}/>
    <circle cx="24" cy="30" r="1.5" fill="white"/>
  </svg>
);

export const IconScale = ({ className = '', size = 24, color = colors.yellow }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2" strokeOpacity="0.2"/>
    <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="2.5"/>
    <circle cx="24" cy="24" r="3" fill={color}/>
    <path d="M24 10V14M24 34V38M10 24H14M34 24H38" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M14.5 14.5L17.5 17.5M30.5 30.5L33.5 33.5M14.5 33.5L17.5 30.5M30.5 17.5L33.5 14.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
  </svg>
);

export const IconClassroom = ({ className = '', size = 24, color = colors.teal }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="8" y="12" width="32" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
    <path d="M16 20H32M16 26H28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="8" r="3" fill={color}/>
    <path d="M14 40L24 36L34 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconCreator = ({ className = '', size = 24, color = colors.orange }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="16" r="8" stroke={color} strokeWidth="2.5"/>
    <path d="M12 38C12 30.268 17.3726 24 24 24C30.6274 24 36 30.268 36 38" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 12L38 6M38 6L42 10M38 6L36 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="16" r="3" fill={color}/>
  </svg>
);

export const IconAfrica = ({ className = '', size = 24, color = colors.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5"/>
    <path d="M24 6C24 6 28 12 28 18C28 24 32 28 32 34C32 38 28 42 24 42C20 42 16 38 16 34C16 28 14 24 14 18C14 12 20 6 24 6Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2"/>
    <circle cx="22" cy="20" r="2" fill={color}/>
    <circle cx="26" cy="28" r="2" fill={color}/>
  </svg>
);

export const IconHeart = ({ className = '', size = 24, color = colors.orange }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 40L10.5 26.5C6.5 22.5 6.5 16 10.5 12C14.5 8 21 8 25 12L24 13L23 12C19 8 12.5 8 8.5 12" stroke={color} strokeWidth="2" strokeOpacity="0.3"/>
    <path d="M24 38C24 38 8 26 8 17C8 11.4772 12.4772 7 18 7C21.5 7 24 9 24 9C24 9 26.5 7 30 7C35.5228 7 40 11.4772 40 17C40 26 24 38 24 38Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M18 15C16 15 14 17 14 19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconTime = ({ className = '', size = 24, color = colors.teal }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <circle cx="24" cy="24" r="3" fill={color}/>
    <path d="M24 14V24L32 28" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 24H10M38 24H40M24 8V10M24 38V40" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
  </svg>
);

export const IconCommunity = ({ className = '', size = 24, color = colors.yellow }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="14" r="6" stroke={color} strokeWidth="2.5"/>
    <circle cx="12" cy="22" r="5" stroke={color} strokeWidth="2"/>
    <circle cx="36" cy="22" r="5" stroke={color} strokeWidth="2"/>
    <path d="M16 38C16 32.4772 19.5817 28 24 28C28.4183 28 32 32.4772 32 38" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M6 38C6 34 8.5 30 12 30M42 38C42 34 39.5 30 36 30" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
  </svg>
);

export const IconQuote = ({ className = '', size = 24, color = colors.orange }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M10 24C10 18 14 14 20 14V18C16 18 14 20 14 24H20V34H10V24Z" fill={color}/>
    <path d="M28 24C28 18 32 14 38 14V18C34 18 32 20 32 24H38V34H28V24Z" fill={color}/>
  </svg>
);

export const IconArrowRight = ({ className = '', size = 24, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Add these to components/icons/ForgeIcons.tsx

export const IconRocket = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4C24 4 38 12 38 28L32 36H16L10 28C10 12 24 4 24 4Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <circle cx="24" cy="20" r="5" fill={color}/>
    <path d="M20 36V42L24 40L28 42V36" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M10 28L6 32L10 36" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6"/>
    <path d="M38 28L42 32L38 36" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6"/>
  </svg>
);

export const IconMoney = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <path d="M24 12V14M24 34V36" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 20C18 17.79 20.69 16 24 16C27.31 16 30 17.79 30 20C30 22.21 27.31 24 24 24C20.69 24 18 25.79 18 28C18 30.21 20.69 32 24 32C27.31 32 30 30.21 30 28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const IconMentor = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="18" cy="14" r="6" stroke={color} strokeWidth="2.5"/>
    <path d="M8 36C8 28 12 24 18 24C24 24 28 28 28 36" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="34" cy="18" r="5" stroke={color} strokeWidth="2" strokeOpacity="0.6"/>
    <path d="M26 38C26 32 29 28 34 28C39 28 42 32 42 38" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
    <path d="M28 14L36 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3"/>
  </svg>
);

export const IconNetwork = ({ className = '', size = 24, color = '#FFD54F' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="6" fill={color}/>
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2"/>
    <circle cx="36" cy="12" r="4" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="36" r="4" stroke={color} strokeWidth="2"/>
    <circle cx="36" cy="36" r="4" stroke={color} strokeWidth="2"/>
    <path d="M16 14L20 20M28 20L32 14M20 28L16 34M28 28L32 34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconIdea = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 6C16 6 10 12 10 20C10 26 14 30 18 32V38C18 40 20 42 22 42H26C28 42 30 40 30 38V32C34 30 38 26 38 20C38 12 32 6 24 6Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M18 32H30" stroke={color} strokeWidth="2"/>
    <path d="M20 36H28" stroke={color} strokeWidth="2"/>
    <path d="M24 14V22M20 18H28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const IconGrowth = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M8 40L18 28L26 34L40 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 16H40V24" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="28" r="3" fill={color}/>
    <circle cx="26" cy="34" r="3" fill={color}/>
    <circle cx="40" cy="16" r="3" fill={color}/>
  </svg>
);

export const IconSupport = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 44C24 44 8 36 8 24V12L24 4L40 12V24C40 36 24 44 24 44Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M17 24L22 29L31 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconCalendar = ({ className = '', size = 24, color = '#FFD54F' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="8" y="12" width="32" height="30" rx="4" stroke={color} strokeWidth="2.5"/>
    <path d="M8 22H40" stroke={color} strokeWidth="2.5"/>
    <path d="M16 6V12M32 6V12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="18" cy="30" r="2" fill={color}/>
    <circle cx="24" cy="30" r="2" fill={color}/>
    <circle cx="30" cy="30" r="2" fill={color}/>
    <circle cx="18" cy="36" r="2" fill={color} fillOpacity="0.5"/>
  </svg>
);

export const IconCheck = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <path d="M15 24L21 30L33 18" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconQuestion = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <path d="M18 18C18 14 20.5 12 24 12C27.5 12 30 14 30 18C30 21 27 22 26 24C25.5 25 25 26 25 28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="25" cy="34" r="2" fill={color}/>
  </svg>
);

// Add these to components/icons/ForgeIcons.tsx

export const IconSchool = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4L4 16L24 28L44 16L24 4Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M10 20V32L24 40L38 32V20" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M44 16V30" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="44" cy="32" r="3" fill={color}/>
    <path d="M24 28V40" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
  </svg>
);

export const IconCode = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="8" width="36" height="32" rx="4" stroke={color} strokeWidth="2.5"/>
    <path d="M6 16H42" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
    <circle cx="18" cy="12" r="2" fill={color}/>
    <circle cx="24" cy="12" r="2" fill={color}/>
    <path d="M16 26L12 30L16 34" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 26L36 30L32 34" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 24L22 36" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const IconDesign = ({ className = '', size = 24, color = '#A855F7' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <circle cx="24" cy="16" r="6" stroke={color} strokeWidth="2"/>
    <circle cx="16" cy="28" r="5" stroke={color} strokeWidth="2"/>
    <circle cx="32" cy="28" r="5" stroke={color} strokeWidth="2"/>
    <path d="M20 19L19 25M28 19L29 25M22 30H26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconData = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="28" width="8" height="14" rx="2" fill={color}/>
    <rect x="20" y="18" width="8" height="24" rx="2" fill={color} fillOpacity="0.7"/>
    <rect x="34" y="8" width="8" height="34" rx="2" fill={color} fillOpacity="0.5"/>
    <path d="M10 24L24 14L38 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="10" cy="24" r="3" fill={color}/>
    <circle cx="24" cy="14" r="3" fill={color}/>
    <circle cx="38" cy="4" r="3" fill={color}/>
  </svg>
);

export const IconShield = ({ className = '', size = 24, color = '#FFD54F' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4L6 12V22C6 33 14 42 24 44C34 42 42 33 42 22V12L24 4Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M16 24L22 30L34 18" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconTeam = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="12" r="6" stroke={color} strokeWidth="2.5"/>
    <circle cx="10" cy="18" r="5" stroke={color} strokeWidth="2"/>
    <circle cx="38" cy="18" r="5" stroke={color} strokeWidth="2"/>
    <path d="M14 40C14 33 18 28 24 28C30 28 34 33 34 40" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M4 42C4 37 7 33 10 33C12 33 14 34 15 36" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
    <path d="M44 42C44 37 41 33 38 33C36 33 34 34 33 36" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
  </svg>
);

export const IconTarget = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="2"/>
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="2"/>
    <circle cx="24" cy="24" r="2" fill={color}/>
    <path d="M24 2V8M24 40V46M2 24H8M40 24H46" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
  </svg>
);

export const IconPath = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="10" cy="10" r="5" stroke={color} strokeWidth="2.5"/>
    <circle cx="38" cy="38" r="5" stroke={color} strokeWidth="2.5"/>
    <path d="M14 14C20 14 20 24 28 24C36 24 34 34 34 34" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="3" fill={color}/>
    <path d="M38 10L44 10M38 10L38 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
  </svg>
);

export const IconEthics = ({ className = '', size = 24, color = '#FFD54F' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <circle cx="24" cy="22" r="6" stroke={color} strokeWidth="2"/>
    <path d="M21 22L23 24L27 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconBuilder = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="8" y="24" width="32" height="18" rx="3" stroke={color} strokeWidth="2.5"/>
    <path d="M14 24V14C14 10 18 6 24 6C30 6 34 10 34 14V24" stroke={color} strokeWidth="2.5"/>
    <rect x="18" y="30" width="12" height="8" rx="2" fill={color}/>
    <circle cx="24" cy="33" r="2" fill="white"/>
  </svg>
);

export const IconStrategist = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="6" width="16" height="16" rx="3" stroke={color} strokeWidth="2.5"/>
    <rect x="26" y="6" width="16" height="16" rx="3" stroke={color} strokeWidth="2.5"/>
    <rect x="6" y="26" width="16" height="16" rx="3" stroke={color} strokeWidth="2.5"/>
    <rect x="26" y="26" width="16" height="16" rx="3" stroke={color} strokeWidth="2.5"/>
    <path d="M14 10V18M10 14H18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 14H38" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="14" cy="34" r="4" fill={color}/>
    <path d="M30 30L38 38M38 30L30 38" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconStoryteller = ({ className = '', size = 24, color = '#A855F7' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M8 8H40V36C40 38.2 38.2 40 36 40H12C9.8 40 8 38.2 8 36V8Z" stroke={color} strokeWidth="2.5"/>
    <path d="M8 8L24 20L40 8" stroke={color} strokeWidth="2.5"/>
    <circle cx="18" cy="28" r="4" fill={color}/>
    <circle cx="30" cy="28" r="4" fill={color}/>
    <path d="M22 32H26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconFood = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <ellipse cx="24" cy="38" rx="18" ry="6" stroke={color} strokeWidth="2.5"/>
    <path d="M6 38V26C6 16 14 8 24 8C34 8 42 16 42 26V38" stroke={color} strokeWidth="2.5"/>
    <path d="M14 24C14 20 18 18 24 18C30 18 34 20 34 24" stroke={color} strokeWidth="2"/>
    <circle cx="18" cy="28" r="2" fill={color}/>
    <circle cx="30" cy="28" r="2" fill={color}/>
    <circle cx="24" cy="32" r="2" fill={color}/>
  </svg>
);

export const IconTransport = ({ className = '', size = 24, color = '#FFD54F' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="12" width="36" height="24" rx="4" stroke={color} strokeWidth="2.5"/>
    <path d="M6 24H42" stroke={color} strokeWidth="2"/>
    <circle cx="14" cy="36" r="4" stroke={color} strokeWidth="2.5"/>
    <circle cx="34" cy="36" r="4" stroke={color} strokeWidth="2.5"/>
    <rect x="12" y="16" width="8" height="6" rx="1" fill={color} fillOpacity="0.3"/>
    <rect x="22" y="16" width="8" height="6" rx="1" fill={color} fillOpacity="0.3"/>
    <rect x="32" y="16" width="6" height="6" rx="1" fill={color} fillOpacity="0.3"/>
    <path d="M6 16L2 20V32L6 36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconUbuntu = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <circle cx="24" cy="12" r="4" fill={color}/>
    <circle cx="13" cy="32" r="4" fill={color}/>
    <circle cx="35" cy="32" r="4" fill={color}/>
    <path d="M24 16V20M17 29L20 26M31 29L28 26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="4" stroke={color} strokeWidth="2"/>
  </svg>
);

export const IconStar = ({ className = '', size = 24, color = '#FFD54F' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4L29.5 17.5H44L32.5 26.5L37 40L24 31L11 40L15.5 26.5L4 17.5H18.5L24 4Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M24 14L27 21H34L28.5 26L30.5 33L24 29L17.5 33L19.5 26L14 21H21L24 14Z" fill={color}/>
  </svg>
);

export const IconIntegrity = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4L8 12V24C8 34 15 42 24 44C33 42 40 34 40 24V12L24 4Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M24 14V28" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <circle cx="24" cy="34" r="2" fill={color}/>
  </svg>
);

export const IconInnovation = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4C16 4 10 10 10 18C10 24 14 28 18 30V36C18 38 20 40 22 40H26C28 40 30 38 30 36V30C34 28 38 24 38 18C38 10 32 4 24 4Z" stroke={color} strokeWidth="2.5"/>
    <path d="M18 42H30" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M20 46H28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 12V20M20 16H28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M16 8L14 6M32 8L34 6M10 18H6M42 18H38" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
  </svg>
);

export const IconPatience = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 44C24 44 8 36 8 20V8L24 4L40 8V20C40 36 24 44 24 44Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <circle cx="24" cy="22" r="8" stroke={color} strokeWidth="2"/>
    <path d="M24 18V22L27 25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 34H30" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconAccessibility = ({ className = '', size = 24, color = '#A855F7' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <circle cx="24" cy="14" r="4" fill={color}/>
    <path d="M14 22H34" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 22V32" stroke={color} strokeWidth="2.5"/>
    <path d="M24 32L18 42M24 32L30 42" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const IconProblem = ({ className = '', size = 24, color = '#EF4444' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <path d="M24 14V28" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <circle cx="24" cy="34" r="2" fill={color}/>
  </svg>
);

export const IconSolution = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <path d="M14 24L22 32L36 18" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Add these to components/icons/ForgeIcons.tsx

export const IconMail = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="10" width="40" height="28" rx="4" stroke={color} strokeWidth="2.5"/>
    <path d="M4 14L24 28L44 14" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M4 38L18 24M44 38L30 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
  </svg>
);

export const IconLocation = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4C15.2 4 8 11.2 8 20C8 32 24 44 24 44C24 44 40 32 40 20C40 11.2 32.8 4 24 4Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <circle cx="24" cy="20" r="6" stroke={color} strokeWidth="2.5"/>
    <circle cx="24" cy="20" r="2" fill={color}/>
  </svg>
);

export const IconPhone = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M14 4H20L24 14L19 18C21.5 23 25 26.5 30 29L34 24L44 28V34C44 37.3 41.3 40 38 40C20 40 8 28 8 10C8 6.7 10.7 4 14 4Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
  </svg>
);

export const IconSocial = ({ className = '', size = 24, color = '#A855F7' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <circle cx="16" cy="20" r="4" fill={color}/>
    <circle cx="32" cy="20" r="4" fill={color}/>
    <path d="M16 32C16 32 19 36 24 36C29 36 32 32 32 32" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const IconPartnership = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M6 24L14 16L20 22L28 14L34 20L42 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34 12H42V20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="6" y="28" width="12" height="12" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="30" y="28" width="12" height="12" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M18 34H30" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
  </svg>
);

export const IconCareer = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="8" y="16" width="32" height="26" rx="4" stroke={color} strokeWidth="2.5"/>
    <path d="M16 16V12C16 8.7 18.7 6 22 6H26C29.3 6 32 8.7 32 12V16" stroke={color} strokeWidth="2.5"/>
    <path d="M8 26H40" stroke={color} strokeWidth="2"/>
    <circle cx="24" cy="26" r="4" fill={color}/>
  </svg>
);

export const IconInvestment = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
    <path d="M24 12V14M24 34V36" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 20C18 17 20.5 15 24 15C27.5 15 30 17 30 20C30 23 27 24 24 24C21 24 18 25 18 28C18 31 20.5 33 24 33C27.5 33 30 31 30 28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const IconPress = ({ className = '', size = 24, color = '#FFD54F' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="8" width="36" height="32" rx="4" stroke={color} strokeWidth="2.5"/>
    <path d="M6 16H42" stroke={color} strokeWidth="2"/>
    <rect x="12" y="22" width="12" height="12" rx="2" fill={color} fillOpacity="0.3"/>
    <path d="M28 22H36M28 28H36M28 34H32" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconCamera = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="14" width="40" height="28" rx="4" stroke={color} strokeWidth="2.5"/>
    <circle cx="24" cy="28" r="8" stroke={color} strokeWidth="2.5"/>
    <circle cx="24" cy="28" r="4" fill={color}/>
    <rect x="14" y="6" width="12" height="8" rx="2" stroke={color} strokeWidth="2"/>
    <circle cx="36" cy="20" r="2" fill={color}/>
  </svg>
);

export const IconGallery = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="8" width="28" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
    <rect x="16" y="16" width="28" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
    <circle cx="14" cy="18" r="3" fill={color}/>
    <path d="M4 28L10 22L16 28L26 18L32 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconMessage = ({ className = '', size = 24, color = '#A855F7' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M8 12C8 9.8 9.8 8 12 8H36C38.2 8 40 9.8 40 12V30C40 32.2 38.2 34 36 34H16L8 42V12Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M16 18H32M16 24H26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconSend = ({ className = '', size = 24, color = '#FF8C42' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M6 24L42 6L34 42L22 28L6 24Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M22 28L42 6" stroke={color} strokeWidth="2"/>
  </svg>
);

export const IconTalent = ({ className = '', size = 24, color = '#14B8B8' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="14" r="8" stroke={color} strokeWidth="2.5"/>
    <path d="M10 42C10 34 16 28 24 28C32 28 38 34 38 42" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 10L38 4M38 4L44 10M38 4V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconConnect = ({ className = '', size = 24, color = '#52B788' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="10" cy="24" r="6" stroke={color} strokeWidth="2.5"/>
    <circle cx="38" cy="12" r="6" stroke={color} strokeWidth="2.5"/>
    <circle cx="38" cy="36" r="6" stroke={color} strokeWidth="2.5"/>
    <path d="M16 22L32 14M16 26L32 34" stroke={color} strokeWidth="2.5"/>
  </svg>
);

export const IconFrame = ({ className = '', size = 24, color = '#FFD54F' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="6" width="36" height="36" rx="4" stroke={color} strokeWidth="2.5"/>
    <rect x="12" y="12" width="24" height="24" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M6 14H12M36 14H42M6 34H12M36 34H42M14 6V12M34 6V12M14 36V42M34 36V42" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);