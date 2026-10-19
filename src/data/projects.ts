export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: 'Digital Experiences' | 'AI & Voice' | 'Commerce & Systems';
  deliverables: string[];
  year: string;
  client: string;
  isStudioConcept: boolean;
  accentColor: string;
  bgTone: string;
  image: string;
  image400?: string;
  image640?: string;
  image800?: string;
  imagePosition?: string;
  secondaryImage: string;
  secondaryImage400?: string;
  secondaryImage640?: string;
  secondaryImage800?: string;
  secondaryImagePosition?: string;
  overview: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  livePreviewUrl?: string;
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'drev',
    number: '01',
    title: 'DREV',
    tagline: 'Architectural Streetwear, High Fashion Campaign & Runway Archive',
    category: 'Digital Experiences',
    deliverables: ['Cinematic Runway Film Scroll', 'Runway Soundscape Audio Engine', 'Permanent Catalogue Raisonné', 'Tailoring Construction Study HUD'],
    year: '2026',
    client: 'DREV (Made in Bangladesh)',
    isStudioConcept: false,
    accentColor: '#e8002d',
    bgTone: '#050505',
    image: '/products/drev_primary.webp',
    image400: '/products/drev_primary_400.webp',
    image640: '/products/drev_primary_640.webp',
    image800: '/products/drev_primary_800.webp',
    imagePosition: 'center center',
    secondaryImage: '/products/drev_secondary.webp',
    secondaryImage400: '/products/drev_secondary_400.webp',
    secondaryImage640: '/products/drev_secondary_640.webp',
    secondaryImage800: '/products/drev_secondary_800.webp',
    secondaryImagePosition: 'center top',
    overview: 'A monumental digital flagship and cinematic runway experience for DREV, an architectural streetwear and minimalist luxury tailoring label crafted in Bangladesh. Built with full-bleed runway film transitions, tactile fabric macro-inspections, ambient soundscapes, and an interactive catalogue raisonné.',
    challenge: 'Luxury runway storytelling is traditionally trapped in static lookbook PDFs or conventional multi-page grids. DREV needed an experience that commands absolute authority—conveying deconstructed silhouettes, emerald suede velvets, and bespoke horn craftsmanship with cinematic pacing.',
    solution: 'Engineered a full-viewport phased runway scroll powered by Next.js and Framer Motion, with integrated Web Audio atmospheric sounds, anatomy-of-the-piece deep inspection modals, and an instant client portal with interactive bag hydration.',
    metrics: [
      { label: 'Runway Presentation', value: '4-Phase Film' },
      { label: 'Soundscape Engine', value: 'Web Audio' },
      { label: 'Tailoring Inspection', value: 'Macro Zoom' },
      { label: 'Frontend Stack', value: 'Next.js App' }
    ],
    technologies: ['Next.js App Router', 'Turbopack', 'Tailwind CSS', 'Web Audio API', 'Framer Motion', 'TypeScript'],
    livePreviewUrl: 'https://cinematic-luxury-fashion-website.vercel.app',
    features: [
      'Kinetic 4-phase unrolling runway film with full-screen transitions',
      'Construction study module deconstructing floating horsehair interlining',
      'Interactive catalogue raisonné with category filtering and sort engines',
      'Ambient runway soundscape toggle powered by Web Audio synthesis'
    ]
  },
  {
    id: 'apex-fitness',
    number: '02',
    title: 'APEX Fitness',
    tagline: 'High-Performance Luxury Training Facility & Athletic Club',
    category: 'Digital Experiences',
    deliverables: ['Brutalist Athletic Art Direction', 'Interactive Class Booking Matrix', 'Trainer Profile Showcase', 'VIP Membership Onboarding'],
    year: '2026',
    client: 'APEX Athletic Club',
    isStudioConcept: false,
    accentColor: '#e8002d',
    bgTone: '#08080c',
    image: '/products/apex_primary.webp',
    image400: '/products/apex_primary_400.webp',
    image640: '/products/apex_primary_640.webp',
    image800: '/products/apex_primary_800.webp',
    secondaryImage: '/products/apex_secondary.webp',
    secondaryImage400: '/products/apex_secondary_400.webp',
    secondaryImage640: '/products/apex_secondary_640.webp',
    secondaryImage800: '/products/apex_secondary_800.webp',
    overview: 'A bold, adrenaline-charged web experience for APEX Fitness, a luxury athletic training facility serving 5,000+ members. Designed with punchy Bebas Neue display typography, high-contrast monochrome aesthetic, interactive program selectors, and a frictionless VIP trial conversion funnel.',
    challenge: 'Most gym websites feel generic, clunky, and overloaded with cluttered schedule widgets that drive away high-tier athletes and fitness enthusiasts looking for top-tier coaching.',
    solution: 'Architected a high-velocity visual journey blending kinetic typography, video hero layering, interactive tier calculators, and custom schedule filters that allow prospective members to book trial sessions in under 30 seconds.',
    metrics: [
      { label: 'Training Matrix', value: '4 Disciplines' },
      { label: 'Membership Tiers', value: '3 Access Levels' },
      { label: 'Display Type', value: 'Bebas Neue' },
      { label: 'Booking Matrix', value: 'Interactive' }
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    livePreviewUrl: 'https://premium-gym-website-design.vercel.app',
    features: [
      'High-contrast typography pairing Bebas Neue with precision Inter body',
      'Interactive training program switcher (Strength, Hyrox, Endurance, Recovery)',
      'Tiered membership comparison table with transparent perk breakdown',
      'Instant trial booking module with automated SMS and calendar integration'
    ]
  },
  {
    id: 'faro',
    number: '03',
    title: 'FARO',
    tagline: 'Handcrafted Full-Grain Leather Goods & Minimalist Clutches',
    category: 'Commerce & Systems',
    deliverables: ['Artisanal Brand Flagship', 'Tactile Leather Texture Shaders', 'Mobile-First Quick Cart', 'Heritage Craftsmanship Storytelling'],
    year: '2026',
    client: 'FARO Leather Goods (Bangladesh)',
    isStudioConcept: false,
    accentColor: '#e8002d',
    bgTone: '#14110f',
    image: '/products/faro_primary.webp',
    image400: '/products/faro_primary_400.webp',
    image640: '/products/faro_primary_640.webp',
    image800: '/products/faro_primary_800.webp',
    secondaryImage: '/products/faro_secondary.webp',
    secondaryImage400: '/products/faro_secondary_400.webp',
    secondaryImage640: '/products/faro_secondary_640.webp',
    secondaryImage800: '/products/faro_secondary_800.webp',
    overview: '“Carry Less. Carry Better.” FARO is an artisanal leather goods digital experience showcasing handcrafted full-grain leather clutch bags, cardholders, and pouches made in Bangladesh. Combining warm earthy tones, editorial Playfair Display typography, and seamless commerce.',
    challenge: 'Artisanal brands often struggle to convey the physical touch, aroma, and edge-finishing quality of handcrafted leather through a digital screen without high-latency 3D bloat.',
    solution: 'Developed a warm, tactile editorial canvas with rich macro-detail photography, artisanal workshop narratives, and an ultra-fast headless cart that preserves the intimate feeling of a boutique atelier.',
    metrics: [
      { label: 'Material Focus', value: 'Full-Grain Leather' },
      { label: 'Atelier Origin', value: 'Bangladesh' },
      { label: 'Visual Inspection', value: 'High-Res Macro' },
      { label: 'Commerce Cart', value: 'Slide Drawer' }
    ],
    technologies: ['React 19', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive Touch Engine'],
    livePreviewUrl: 'https://farobd.vercel.app/home',
    features: [
      'Full-grain leather texture inspection with high-definition zoom',
      'Artisan workshop behind-the-scenes storytelling layout',
      'Mobile-first drawer cart with instant currency formatting',
      'Editorial product cards with dual-angle hover reveals'
    ]
  },
  {
    id: 'aesthete',
    number: '04',
    title: 'AESTHETE',
    tagline: 'Minimalist Luxury Checkout & High-End E-Commerce Experience',
    category: 'Commerce & Systems',
    deliverables: ['Ultra-Clean Checkout Flow', 'Fluid State Transitions', 'Instant Cart Hydration', 'Minimalist Design System'],
    year: '2026',
    client: 'AESTHETE Luxury Studio',
    isStudioConcept: false,
    accentColor: '#e8002d',
    bgTone: '#0c0c10',
    image: '/products/aesthete_primary.webp',
    image400: '/products/aesthete_primary_400.webp',
    image640: '/products/aesthete_primary_640.webp',
    image800: '/products/aesthete_primary_800.webp',
    secondaryImage: '/products/aesthete_secondary.webp',
    secondaryImage400: '/products/aesthete_secondary_400.webp',
    secondaryImage640: '/products/aesthete_secondary_640.webp',
    secondaryImage800: '/products/aesthete_secondary_800.webp',
    overview: 'A purist minimalist luxury e-commerce and checkout platform. Eliminating all visual noise to highlight bespoke objects, architectural home goods, and curated luxury essentials with hyper-refined typography and effortless checkout ergonomics.',
    challenge: 'Traditional checkout funnels are plagued by cluttered form fields, high abandonment rates, and jarring layout shifts that compromise brand prestige.',
    solution: 'Engineered a single-surface checkout experience that guides customers with seamless micro-animations, real-time input validation, and instant payment tokenization.',
    metrics: [
      { label: 'Checkout Layout', value: 'Single-Surface' },
      { label: 'Design System', value: 'Minimalist' },
      { label: 'Form Ergonomics', value: 'Dynamic Stepper' },
      { label: 'Build Framework', value: 'React 19 + Vite' }
    ],
    technologies: ['React 19', 'Tailwind CSS', 'Vite', 'TypeScript', 'Motion Choreography'],
    livePreviewUrl: 'https://aesthete-blush.vercel.app',
    features: [
      'Frictionless single-page express checkout architecture',
      'Instant reactive order summary and currency converter',
      'Material Symbols micro-icons paired with crisp Inter typography',
      'Instant order receipt generation with encrypted client confirmation'
    ]
  }
];

export const SERVICES = [
  {
    id: 'digital-experiences',
    number: '01',
    title: 'Digital Experiences',
    subtitle: 'Brand Flagships, Immersive Web & Creative Art Direction',
    description: 'We design and engineer category-defining websites that command attention, communicate authority, and convert visitors into loyal advocates.',
    deliverables: ['World-Class Brand Flagships', 'Headless Next.js Architecture', 'Custom WebGL & Interactive 3D', 'Micro-Interactions & Soundscapes'],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Three.js / WebGL', 'GSAP / Motion'],
    accent: '#e8002d',
    timeline: '4 – 8 Weeks'
  },
  {
    id: 'commerce',
    number: '02',
    title: 'Commerce Architecture',
    subtitle: 'High-Velocity Storefronts & Luxury Buying Experiences',
    description: 'Custom e-commerce platforms engineered for extreme performance, seamless international checkouts, and bespoke merchandising storytelling.',
    deliverables: ['Custom Shopify Plus & Headless', 'Sub-Second Page Hydration', 'Biometric Express Checkout', 'Dynamic Merchandising Systems'],
    tech: ['Shopify Storefront API', 'Stripe Elements', 'Algolia Search', 'Edge CDN', 'Turbopack'],
    accent: '#e8e2d6',
    timeline: '6 – 10 Weeks'
  },
  {
    id: 'ai-agents',
    number: '03',
    title: 'AI Agents & Assistants',
    subtitle: 'Context-Aware Digital Employees That Drive Revenue',
    description: 'Autonomous conversational agents trained on your business data, handling customer support, lead qualification, and complex product recommendations 24/7.',
    deliverables: ['Custom RAG Knowledge Bases', 'Multi-Turn Conversational HUD', 'CRM & Ticket Orchestration', 'Live Agent Handoff Protocols'],
    tech: ['Python / LangChain', 'OpenAI / Claude API', 'Pinecone Vector DB', 'FastAPI', 'WebSockets'],
    accent: '#e8002d',
    timeline: '3 – 6 Weeks'
  },
  {
    id: 'voice-intelligence',
    number: '04',
    title: 'Voice Intelligence',
    subtitle: 'Autonomous Conversational Voice Agents for Phone & Web',
    description: 'Human-like voice AI agents that answer phone lines, handle complex appointment scheduling, qualify inbound leads, and resolve customer issues in real-time.',
    deliverables: ['Full-Duplex Voice Telephony', 'Autonomous Scheduling Engine', 'Natural Interruption Handling', 'Call Sentiment Transcripts'],
    tech: ['WebRTC Audio Streams', 'Neural Speech Synthesis', 'Twilio SIP Trunking', 'Whisper Fine-Tuning'],
    accent: '#e8002d',
    timeline: '4 – 7 Weeks'
  },
  {
    id: 'automation',
    number: '05',
    title: 'Autonomous Workflows',
    subtitle: 'Zero-Friction Enterprise Automation & Data Pipelines',
    description: 'Eliminate repetitive manual busywork by connecting your marketing, sales, accounting, and fulfillment tools into intelligent self-executing systems.',
    deliverables: ['Custom API Integrations', 'Cross-Platform Workflows', 'Automated Lead Enrichment', 'Intelligent Document Processing'],
    tech: ['Temporal.io', 'Make / n8n Enterprise', 'PostgreSQL', 'AWS Lambda', 'Stripe Webhooks'],
    accent: '#e8e2d6',
    timeline: '3 – 5 Weeks'
  },
  {
    id: 'custom-systems',
    number: '06',
    title: 'Custom Systems & Dashboards',
    subtitle: 'Bespoke Executive Portals & Operational Cockpits',
    description: 'Purpose-built internal software and telemetry dashboards tailored to your exact operational mechanics, replacing bloated off-the-shelf SaaS clutter.',
    deliverables: ['Real-Time Operational Telemetry', 'High-Density Executive HUD', 'Role-Based Access Control', 'Encrypted Business Engines'],
    tech: ['React 19', 'Tailwind v4', 'ClickHouse', 'Node.js / Express', 'Prisma ORM'],
    accent: '#e8002d',
    timeline: '6 – 12 Weeks'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    name: 'Discover',
    phase: 'Intelligence & Architecture',
    duration: 'Week 1 – 2',
    tagline: 'Deep audit of friction points, brand vision, and AI opportunities.',
    description: 'We immerse ourselves in your business metrics, customer journey friction, brand positioning, and existing tech stack. We identify exact automation high-value opportunities and construct the architectural roadmap.',
    deliverables: ['System Architecture Blueprint', 'AI Feasibility & ROI Matrix', 'Art Direction Moodboard', 'Technical Specification Document'],
    metrics: 'Complete Scope Clarity'
  },
  {
    step: '02',
    name: 'Design',
    phase: 'Editorial Art Direction & Prototyping',
    duration: 'Week 2 – 4',
    tagline: 'Crafting bold visual identities and tactile interactive prototypes.',
    description: 'We reject generic templates. We sculpt bespoke Swiss typographic layouts, cinematic motion choreography, conversational UI flows, and responsive design systems in Figma and live code prototypes.',
    deliverables: ['Figma Design System', 'Interactive Motion Prototypes', 'Conversational AI Persona Prompts', 'Responsive Component Library'],
    metrics: 'Category-Defining Aesthetic'
  },
  {
    step: '03',
    name: 'Develop',
    phase: 'High-Performance Engineering',
    duration: 'Week 4 – 7',
    tagline: 'Building ultra-fast code, neural agent pipelines, and robust APIs.',
    description: 'Our senior engineers build the solution using Next.js, TypeScript, Tailwind CSS, vector databases, and custom backend endpoints. We tune performance for sub-second responses and bulletproof reliability.',
    deliverables: ['Production Next.js Codebase', 'Fine-Tuned AI Models & Vector RAG', 'Automated CI/CD Deployment', 'End-to-End Test Coverage'],
    metrics: 'Production-Grade Build'
  },
  {
    step: '04',
    name: 'Deploy',
    phase: 'Launch, Training & Observability',
    duration: 'Week 7 – 8',
    tagline: 'Zero-downtime deployment, staff onboarding, and 24/7 telemetry.',
    description: 'We orchestrate a seamless zero-downtime launch, train your executive and operational teams on managing the systems, and establish 24/7 monitoring alerts and ongoing AI optimization loops.',
    deliverables: ['Zero-Downtime Launch', 'Executive Training Masterclass', 'Telemetry & Alerting Setup', 'Quarterly Growth Roadmap'],
    metrics: 'Continuous Observability'
  }
];
