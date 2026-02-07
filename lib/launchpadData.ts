// lib/launchpadData.ts

/**
 * LaunchPad Program Configuration & Data
 * 
 * Centralized data for the LaunchPad program.
 * Update these values each year for new editions.
 */

// ============================================
// CONFIGURATION
// ============================================

export const LAUNCHPAD_CONFIG = {
  currentYear: 2026,
  previousYear: 2025,
  eventName: "LaunchPad 2026",
  eventDate: "2026-08-28T09:00:00", // Updated to 28th August 2026
  applicationDeadline: "2026-08-15T23:59:59",
  applicationsOpen: true,
  totalParticipants: 20, // 20 selected students
  venue: "Lagos, Nigeria",
  eligibility: "All Secondary School Students (Public & Private)",
  entryFee: "Free",
};

// ============================================
// CURRENT YEAR PRIZES (2026)
// ============================================

export const prizes = [
  {
    position: "1st Place",
    amount: "₦500,000",
    bonus: "+ Laptop",
    icon: "🥇",
    color: "from-yellow-500/20 to-yellow-600/10",
    borderColor: "border-yellow-500/30",
  },
  {
    position: "2nd Place",
    amount: "₦300,000",
    bonus: "+ Laptop",
    icon: "🥈",
    color: "from-gray-400/20 to-gray-500/10",
    borderColor: "border-gray-400/30",
  },
  {
    position: "3rd Place",
    amount: "₦200,000",
    bonus: "+ Laptop",
    icon: "🥉",
    color: "from-amber-600/20 to-amber-700/10",
    borderColor: "border-amber-600/30",
  },
];

// Additional prizes for 2026
export const additionalPrizes = {
  participants: "All other participants receive a Laptop",
  audienceGiveaway: {
    count: 50,
    prize: "₦10,000 worth of gift pack",
  },
};

// ============================================
// PREVIOUS YEAR PRIZES (2025)
// ============================================

export const previousYearPrizes = [
  {
    position: "1st Winner",
    amount: "₦100,000",
    icon: "🥇",
    color: "from-yellow-500/20 to-yellow-600/10",
    borderColor: "border-yellow-500/30",
  },
  {
    position: "2nd Winner",
    amount: "₦100,000",
    icon: "🥈",
    color: "from-gray-400/20 to-gray-500/10",
    borderColor: "border-gray-400/30",
  },
];

// ============================================
// PREVIOUS EDITION STATS (2025)
// ============================================

export const previousEditionStats = [
  { value: "₦200K", label: "Total Prize Won" },
  { value: "2", label: "Winners" },
  { value: "11", label: "Participants" },
  { value: "2", label: "Schools" },
];

// ============================================
// PROGRAM BENEFITS
// ============================================

export const programBenefits = [
  {
    title: "Real Business Skills",
    description: "Learn how to identify problems, create solutions, and build sustainable business models.",
    icon: "📊",
  },
  {
    title: "Business Development Training",
    description: "Master modern business development techniques and strategies from industry experts.",
    icon: "📈",
  },
  {
    title: "Professional Pitching",
    description: "Develop the confidence to present ideas clearly and persuasively to any audience.",
    icon: "🎤",
  },
  {
    title: "Mentorship Access",
    description: "Connect with successful entrepreneurs and industry professionals.",
    icon: "👨‍🏫",
  },
  {
    title: "Prize Funding & Laptops",
    description: "Win up to ₦500,000 plus a laptop. All participants receive a laptop.",
    icon: "💰",
  },
  {
    title: "Network Building",
    description: "Join a community of like-minded young innovators across Nigeria.",
    icon: "🌐",
  },
];

// ============================================
// TESTIMONIALS
// ============================================

export const testimonials = [
  {
    quote: "LaunchPad changed how I see myself. I went from having ideas to actually knowing how to build a business.",
    name: "Rotimi Oreoluwa",
    school: "Fruitful Ville College International, Ibeshe, Ikorodu Lagos",
    placement: "Winner 2025",
  },
  {
    quote: "The business development training was incredible. Having real entrepreneurs guide us made all the difference.",
    name: "Ugbonna Obasi",
    school: "Gladys High School, Ketu, Lagos",
    placement: "Winner 2025",
  },
  {
    quote: "I never knew I could pitch in front of people. LaunchPad gave me that confidence.",
    name: "Oluwanifemi Olanipekun",
    school: "Fruitful Ville College International, Ibeshe, Ikorodu Lagos",
    placement: "Participant 2025",
  },
];

// ============================================
// APPLICATION STEPS
// ============================================

export const applicationSteps = [
  {
    step: 1,
    title: "Submit Application",
    description: "Fill out the form with your details and business idea. Entry is completely FREE.",
  },
  {
    step: 2,
    title: "Selection Process",
    description: "20 students will be selected from all entries across Lagos (public and private schools).",
  },
  {
    step: 3,
    title: "Business Development Training",
    description: "Selected participants undergo intensive business development training sessions.",
  },
  {
    step: 4,
    title: "Pitch Day",
    description: "Present your refined idea to judges and compete for over ₦1 Million in prizes.",
  },
];

// ============================================
// PARTNERS
// ============================================

export const partners = [
  {
    name: "Ikosi-Isheri Local Government",
    role: "Title Sponsor",
    contribution: "Financial support and venue",
    year: 2025,
  },
  {
    name: "PAD A Girl Movement",
    role: "Community Partner",
    contribution: "Student outreach and mentorship",
    year: 2025,
  },
  {
    name: "Local Business Network",
    role: "Media Partner",
    contribution: "Coverage and promotion",
    year: 2025,
  },
];

// ============================================
// SPONSOR BENEFITS
// ============================================

export const sponsorBenefits = [
  {
    title: "Brand Visibility",
    description: "Reach thousands of students, parents, and educators across Lagos.",
    icon: "📢",
  },
  {
    title: "Talent Pipeline",
    description: "Connect with Nigeria's brightest young minds before they enter the workforce.",
    icon: "🎓",
  },
  {
    title: "CSR Impact",
    description: "Demonstrate meaningful commitment to youth development and education.",
    icon: "❤️",
  },
  {
    title: "Media Coverage",
    description: "Featured in all press releases, social media, and event materials.",
    icon: "📰",
  },
];

// ============================================
// SPONSORSHIP TIERS
// ============================================

export const sponsorshipTiers = [
  {
    name: "Platinum",
    amount: "₦5,000,000+",
    benefits: [
      "Exclusive title sponsorship",
      "Keynote speaking opportunity",
      "Logo on all materials",
      "VIP access to all events",
      "Direct engagement with winners",
    ],
  },
  {
    name: "Gold",
    amount: "₦2,500,000 - ₦4,999,999",
    benefits: [
      "Co-sponsorship recognition",
      "Panel participation",
      "Logo on main materials",
      "Event booth/stand",
      "Social media features",
    ],
  },
  {
    name: "Silver",
    amount: "₦1,000,000 - ₦2,499,999",
    benefits: [
      "Supporting sponsor recognition",
      "Logo on event materials",
      "Social media mention",
      "Event tickets",
    ],
  },
  {
    name: "Bronze",
    amount: "₦500,000 - ₦999,999",
    benefits: [
      "Contributor recognition",
      "Logo on website",
      "Certificate of appreciation",
      "Event tickets",
    ],
  },
];

// ============================================
// SPONSOR CATEGORIES
// ============================================

export const sponsorCategories = [
  {
    category: "Corporate Organizations",
    examples: [
      "Banks and financial institutions",
      "Telecommunications companies",
      "Technology companies",
      "FMCG brands targeting youth",
    ],
  },
  {
    category: "Foundations & NGOs",
    examples: [
      "Education-focused foundations",
      "Youth development organizations",
      "Entrepreneurship support bodies",
      "International development agencies",
    ],
  },
];