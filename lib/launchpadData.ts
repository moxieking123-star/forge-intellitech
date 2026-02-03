/**
 * LaunchPad Program Data
 * 
 * Central data file for the LaunchPad Youth Entrepreneurship & AI Innovation Program.
 * Update this file to change content across the LaunchPad page.
 */

/* ============================================
   PROGRAM CONFIGURATION
   ============================================ */

export const LAUNCHPAD_CONFIG = {
  // Current edition
  currentYear: 2026,
  
  // Event details
  eventDate: "2026-08-28T10:00:00+01:00",
  eventName: "LaunchPad 2026",
  eventLocation: "Lagos, Nigeria",
  eventTime: "10:00 AM WAT",
  
  // Participant details
  totalParticipants: 26,
  eligibilityYear: "2025/2026",
  
  // Application status
  applicationsOpen: true,
  applicationDeadline: "2026-07-31",
  
  // Prize pool
  totalPrizePool: "₦1,000,000",
  
  // Previous edition
  previousYear: 2024,
};

/* ============================================
   PRIZE STRUCTURE
   ============================================ */

export interface Prize {
  position: string;
  amount: string;
  description: string;
  color: string;
  borderColor: string;
  icon: string;
}

export const prizes: Prize[] = [
  {
    position: "1st Place",
    amount: "₦500,000",
    description: "Grand prize for the most innovative and viable business idea",
    color: "from-yellow-500/20 to-yellow-600/10",
    borderColor: "border-yellow-500/30",
    icon: "🥇",
  },
  {
    position: "2nd Place",
    amount: "₦300,000",
    description: "Runner-up prize for exceptional entrepreneurial thinking",
    color: "from-gray-400/20 to-gray-500/10",
    borderColor: "border-gray-400/30",
    icon: "🥈",
  },
  {
    position: "3rd Place",
    amount: "₦200,000",
    description: "Third place prize for promising business potential",
    color: "from-amber-600/20 to-amber-700/10",
    borderColor: "border-amber-600/30",
    icon: "🥉",
  },
];

/* ============================================
   IMPACT STATISTICS
   ============================================ */

export interface ImpactStat {
  value: string;
  label: string;
  description?: string;
}

export const previousEditionStats: ImpactStat[] = [
  { 
    value: "11", 
    label: "Students Participated",
    description: "From 2 partner schools in Lagos"
  },
  { 
    value: "2", 
    label: "Partner Schools",
    description: "Secondary schools in Ikosi-Isheri"
  },
  { 
    value: "₦500K+", 
    label: "Prize Money Awarded",
    description: "Distributed to winning students"
  },
  { 
    value: "1", 
    label: "LGA Partnership",
    description: "Ikosi-Isheri LCDA"
  },
];

export const currentEditionGoals: ImpactStat[] = [
  { 
    value: "26", 
    label: "Target Participants",
    description: "More than double from 2024"
  },
  { 
    value: "5+", 
    label: "Target Schools",
    description: "Expanding our reach"
  },
  { 
    value: "₦1M+", 
    label: "Prize Pool",
    description: "Increased rewards for winners"
  },
  { 
    value: "3+", 
    label: "Target LGA Partners",
    description: "Growing government support"
  },
];

/* ============================================
   PROGRAM BENEFITS
   ============================================ */

export interface ProgramBenefit {
  title: string;
  description: string;
  icon: string;
  details?: string[];
}

export const programBenefits: ProgramBenefit[] = [
  {
    title: "Business Fundamentals",
    description: "Learn how to identify problems, develop solutions, and create viable business models that can scale.",
    icon: "💼",
    details: [
      "Problem identification and validation",
      "Business model canvas development",
      "Market research basics",
      "Revenue model design",
    ],
  },
  {
    title: "AI-Assisted Innovation",
    description: "Discover how to leverage artificial intelligence tools to research, ideate, and develop your business concepts.",
    icon: "🤖",
    details: [
      "Introduction to AI tools for business",
      "Using AI for market research",
      "AI-powered content creation",
      "Responsible AI usage",
    ],
  },
  {
    title: "Pitching & Presentation",
    description: "Master the art of presenting your ideas confidently to investors, judges, and potential partners.",
    icon: "🎤",
    details: [
      "Pitch deck structure and design",
      "Public speaking techniques",
      "Handling Q&A sessions",
      "Storytelling for business",
    ],
  },
  {
    title: "Problem-Solving Skills",
    description: "Develop critical thinking abilities to tackle real-world challenges in your community and beyond.",
    icon: "🧩",
    details: [
      "Design thinking methodology",
      "Root cause analysis",
      "Creative solution generation",
      "Iterative problem solving",
    ],
  },
  {
    title: "Mentorship Access",
    description: "Connect with experienced entrepreneurs and business leaders who guide you through your journey.",
    icon: "👥",
    details: [
      "One-on-one mentorship sessions",
      "Industry expert workshops",
      "Peer learning groups",
      "Alumni network access",
    ],
  },
  {
    title: "Real Prize Money",
    description: "Compete for substantial cash prizes that can help kickstart your entrepreneurial journey.",
    icon: "🏆",
    details: [
      "Cash prizes for top 3 winners",
      "No strings attached funding",
      "Use for your business or education",
      "Recognition and credibility",
    ],
  },
];

/* ============================================
   STUDENT TESTIMONIALS
   ============================================ */

export interface Testimonial {
  name: string;
  school: string;
  quote: string;
  image?: string;
  year: number;
  placement?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Oluwaseun Adebayo",
    school: "Victory Model College",
    quote: "LaunchPad taught me that my ideas have value. Before this program, I never thought a student like me could pitch a business idea. Now I know I can build something real. The mentors believed in us even when we doubted ourselves.",
    year: 2024,
    placement: "1st Place Winner",
  },
  {
    name: "Chidinma Okonkwo",
    school: "Graceland International School",
    quote: "Learning how to use AI to develop my business idea was incredible. The mentors showed us that technology is a tool we can use to solve real problems in our community. I've already started building my app!",
    year: 2024,
    placement: "2nd Place Winner",
  },
  {
    name: "Ibrahim Yusuf",
    school: "Victory Model College",
    quote: "The pitching competition was nerve-wracking but amazing. I learned to present my ideas with confidence. This experience will stay with me forever. Now my parents see me differently — as someone who can create, not just consume.",
    year: 2024,
  },
];

/* ============================================
   APPLICATION STEPS
   ============================================ */

export interface ApplicationStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  tips?: string[];
}

export const applicationSteps: ApplicationStep[] = [
  {
    step: "01",
    title: "Check Eligibility",
    description: "You must be a secondary school student writing your final examinations (WAEC/NECO) in 2025 or 2026.",
    icon: "✅",
    tips: [
      "Must be currently enrolled in a Nigerian secondary school",
      "Final year students (SS3) get priority",
      "Age range: 15-19 years old",
    ],
  },
  {
    step: "02",
    title: "Develop Your Idea",
    description: "Think about a problem in your community or Nigeria that you want to solve with a business solution.",
    icon: "💡",
    tips: [
      "Look for problems you personally experience",
      "Consider issues in your school or neighborhood",
      "Think about how technology could help",
    ],
  },
  {
    step: "03",
    title: "Complete Application",
    description: "Fill out the application form with your personal details, school information, and business idea.",
    icon: "📝",
    tips: [
      "Be specific about the problem you're solving",
      "Explain who would pay for your solution",
      "Show you've thought about growth",
    ],
  },
  {
    step: "04",
    title: "Submit & Wait",
    description: "Submit your application before the deadline. Selected students will be contacted for the next steps.",
    icon: "📤",
    tips: [
      "Double-check all information before submitting",
      "Make sure your email is correct",
      "Check your spam folder for our response",
    ],
  },
];

/* ============================================
   PARTNERS & SUPPORTERS
   ============================================ */

export interface Partner {
  name: string;
  role: string;
  contribution: string;
  year: number;
  logo?: string;
}

export const partners: Partner[] = [
  {
    name: "Ikosi-Isheri LCDA",
    role: "Local Government Partner",
    contribution: "Official partnership, venue provision, and program endorsement",
    year: 2024,
  },
  {
    name: "Princess Samiat Bada",
    role: "Chairman, Ikosi-Isheri LCDA",
    contribution: "Championed youth development and provided council hall during election period",
    year: 2024,
  },
  {
    name: "Chief Alaka",
    role: "Lagos State President, NAPPS",
    contribution: "Cash sponsorship enabling prize distribution to winners",
    year: 2024,
  },
];

/* ============================================
   SPONSOR BENEFITS
   ============================================ */

export interface SponsorBenefit {
  title: string;
  description: string;
  icon: string;
}

export const sponsorBenefits: SponsorBenefit[] = [
  {
    title: "Youth Empowerment",
    description: "Directly impact young lives by funding programs that give students practical, future-ready skills.",
    icon: "🌟",
  },
  {
    title: "Talent Discovery",
    description: "Get early access to Nigeria's brightest young minds and future entrepreneurs.",
    icon: "🔍",
  },
  {
    title: "Government Alignment",
    description: "Support initiatives that align with Lagos State's digital literacy and youth development goals.",
    icon: "🏛️",
  },
  {
    title: "Brand Visibility",
    description: "Associate your organization with innovation, education, and African youth excellence.",
    icon: "📣",
  },
];

/* ============================================
   SPONSORSHIP TIERS
   ============================================ */

export interface SponsorshipTier {
  name: string;
  amount: string;
  benefits: string[];
  highlighted?: boolean;
  color: string;
}

export const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: "Bronze Sponsor",
    amount: "₦100,000 - ₦249,999",
    benefits: [
      "Logo on event materials",
      "Social media mention",
      "Certificate of appreciation",
      "2 event tickets",
    ],
    color: "from-amber-700/20 to-amber-800/10",
  },
  {
    name: "Silver Sponsor",
    amount: "₦250,000 - ₦499,999",
    benefits: [
      "All Bronze benefits",
      "Logo on participant certificates",
      "Speaking opportunity (5 min)",
      "5 event tickets",
      "Meet the finalists",
    ],
    color: "from-gray-400/20 to-gray-500/10",
  },
  {
    name: "Gold Sponsor",
    amount: "₦500,000 - ₦999,999",
    benefits: [
      "All Silver benefits",
      "Named prize category",
      "Keynote speaking slot (10 min)",
      "10 event tickets",
      "Private networking session",
      "Blog feature",
    ],
    highlighted: true,
    color: "from-yellow-500/20 to-yellow-600/10",
  },
  {
    name: "Platinum Sponsor",
    amount: "₦1,000,000+",
    benefits: [
      "All Gold benefits",
      "Title sponsor recognition",
      "Exclusive branding opportunities",
      "VIP seating at event",
      "Direct mentorship matching",
      "Year-round partnership",
    ],
    color: "from-purple-500/20 to-purple-600/10",
  },
];

/* ============================================
   SPONSOR CATEGORIES
   ============================================ */

export interface SponsorCategory {
  category: string;
  examples: string[];
}

export const sponsorCategories: SponsorCategory[] = [
  {
    category: "Government Bodies",
    examples: [
      "Lagos State Government",
      "Local Government Areas (LGAs)",
      "LCDAs across Lagos State",
      "Ministry of Education",
      "Ministry of Youth & Social Development",
    ],
  },
  {
    category: "Private Sector",
    examples: [
      "Banks and financial institutions",
      "Technology companies",
      "Telecommunications companies",
      "Oil & gas companies (CSR)",
      "Manufacturing companies",
    ],
  },
];

/* ============================================
   FORM FIELD OPTIONS
   ============================================ */

export const schoolLevels = [
  { value: "ss3", label: "SS3 (Final Year)" },
  { value: "ss2", label: "SS2" },
  { value: "ss1", label: "SS1" },
  { value: "jss3", label: "JSS3" },
];

export const hearAboutUs = [
  { value: "school", label: "Through my school" },
  { value: "social", label: "Social media" },
  { value: "friend", label: "Friend or family" },
  { value: "teacher", label: "Teacher recommendation" },
  { value: "forge-website", label: "Forge website" },
  { value: "other", label: "Other" },
];

export const businessCategories = [
  { value: "tech", label: "Technology/Software" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health & Wellness" },
  { value: "agriculture", label: "Agriculture & Food" },
  { value: "finance", label: "Finance & Banking" },
  { value: "environment", label: "Environment & Sustainability" },
  { value: "entertainment", label: "Entertainment & Media" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "logistics", label: "Logistics & Transportation" },
  { value: "other", label: "Other" },
];

export const sponsorTypes = [
  { value: "corporate", label: "Corporate Organization" },
  { value: "government", label: "Government Body" },
  { value: "ngo", label: "NGO / Foundation" },
  { value: "individual", label: "Individual Philanthropist" },
  { value: "school", label: "Educational Institution" },
  { value: "other", label: "Other" },
];