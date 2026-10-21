import { useState, useEffect } from 'react';

export type Market = 'US' | 'UK';

export interface MarketConfig {
  code: Market;
  countryName: string;
  currency: string;
  currencyCode: 'USD' | 'GBP';
  flag: string;
  label: string;
}

export const MARKETS: Record<Market, MarketConfig> = {
  US: {
    code: 'US',
    countryName: 'United States',
    currency: '$',
    currencyCode: 'USD',
    flag: '🇺🇸',
    label: 'US ($ USD)',
  },
  UK: {
    code: 'UK',
    countryName: 'United Kingdom',
    currency: '£',
    currencyCode: 'GBP',
    flag: '🇬🇧',
    label: 'UK (£ GBP)',
  },
};

export interface WebsitePackage {
  id: 'essential' | 'signature' | 'digital_experience' | 'custom';
  name: string;
  tagline: string;
  price: {
    US: number | null;
    UK: number | null;
  };
  recommended?: boolean;
  pages: string;
  turnaround: string;
  revisions: string;
  features: string[];
  ctaText: string;
  scopeNote?: string;
}

export interface AiServicePackage {
  id: 'ai_chatbot' | 'workflow_automation' | 'ai_support' | 'custom_ai';
  name: string;
  tagline: string;
  price: {
    US: number | null;
    UK: number | null;
  };
  feeType: 'setup' | 'quote';
  features: string[];
  ctaText: string;
}

export interface MaintenancePlan {
  name: string;
  tagline: string;
  price: {
    US: number;
    UK: number;
  };
  billingPeriod: string;
  scopeSummary: string;
  inclusions: string[];
  exclusions: string[];
  accountOwnershipNotice: string;
}

export const WEBSITE_PACKAGES: WebsitePackage[] = [
  {
    id: 'essential',
    name: 'Essential Website',
    tagline: 'For businesses that need a polished, professional online presence built with speed and precision.',
    price: {
      US: 750,
      UK: 600,
    },
    pages: 'Up to 5 custom-designed pages',
    turnaround: '2 – 3 weeks',
    revisions: 'Two structured revision rounds',
    features: [
      'Up to 5 custom-designed pages',
      'Responsive desktop, tablet & mobile layouts',
      'Custom brand-aligned UI design & typography',
      'Contact and lead-generation capture forms',
      'Basic on-page SEO setup & meta configurations',
      'Performance optimization & sub-second paint',
      'Analytics integration where applicable',
      'Two structured revision rounds',
      'Deployment & complete handover with source files'
    ],
    ctaText: 'Start Your Project',
  },
  {
    id: 'signature',
    name: 'Signature Website',
    tagline: 'For businesses that want a distinctive digital presence designed to attract and convert high-value customers.',
    price: {
      US: 1500,
      UK: 1200,
    },
    recommended: true,
    pages: 'Up to 8 custom-designed pages',
    turnaround: '3 – 5 weeks',
    revisions: 'Three structured revision rounds',
    features: [
      'Up to 8 custom-designed pages',
      'Premium UI/UX and bespoke art direction',
      'Custom visual identity implementation',
      'Advanced interactions & tasteful motion choreography',
      'Conversion-focused page structure & visual hierarchy',
      'Lead capture & CRM contact integrations',
      'Technical SEO fundamentals & schema readiness',
      'Comprehensive analytics & event setup',
      'Full mobile & desktop performance optimization',
      'Three structured revision rounds',
      'Deployment & complete technical handover'
    ],
    ctaText: 'Build Your Website',
  },
  {
    id: 'digital_experience',
    name: 'Digital Experience',
    tagline: 'For ambitious brands that require sophisticated interactive design, cinematic motion, and deep custom functionality.',
    price: {
      US: 2000,
      UK: 1600,
    },
    pages: 'Custom multi-page architecture',
    turnaround: '4 – 7 weeks',
    revisions: 'Three structured revision rounds',
    features: [
      'Bespoke UI/UX and creative art direction',
      'Custom multi-page website architecture',
      'Advanced motion & interactive web experiences',
      'Carefully optimized hardware-accelerated animations',
      'Custom components & tailored third-party integrations',
      'Advanced conversion-focused user journeys',
      'Technical SEO & edge performance optimization',
      'Analytics and event tracking where applicable',
      'Three structured revision rounds',
      'Deployment & complete technical handover'
    ],
    ctaText: 'Discuss Your Project',
    scopeNote: 'Advanced 3D/WebGL experiences, complex kinetic physics, custom backends, and specialized external API integrations may require a separate quote.',
  },
  {
    id: 'custom',
    name: 'Custom Website',
    tagline: 'For enterprise platforms, headless e-commerce storefronts, or tailored web applications with unique scope.',
    price: {
      US: null,
      UK: null,
    },
    pages: 'Unlimited / Bespoke scope',
    turnaround: 'Scope-dependent sprints',
    revisions: 'Milestone-based sprints',
    features: [
      'Tailored architectural blueprint & user experience design',
      'Custom storefront or headless e-commerce development',
      'Cart, checkout, and payment gateway configuration',
      'Complex database, CMS, or multi-role backend integration',
      'Bespoke micro-interactions & fluid 3D/canvas features',
      'Enterprise security & performance audits',
      'Custom API workflows & third-party connectors',
      'Dedicated staging preview environments',
      'Full source code, Figma files, and IP transfer'
    ],
    ctaText: 'Request Custom Quote',
    scopeNote: 'Includes full custom e-commerce builds, multi-vendor marketplaces, and complex web apps. Billed according to detailed scope.',
  },
];

export const AI_SERVICES: AiServicePackage[] = [
  {
    id: 'ai_chatbot',
    name: 'AI Website Chatbot',
    tagline: '24/7 intelligent visitor assistance, qualification, and automated meeting booking.',
    price: {
      US: 350,
      UK: 300,
    },
    feeType: 'setup',
    features: [
      'Business-specific FAQ & knowledge base responses',
      '24/7 website visitor assistance and discovery',
      'Lead capture, email collection & qualification',
      'Graceful handoff to a human representative',
      'Testing, prompt optimization & production deployment'
    ],
    ctaText: 'Configure Chatbot',
  },
  {
    id: 'workflow_automation',
    name: 'Business Workflow Automation',
    tagline: 'Eliminate repetitive manual busywork by connecting your forms, CRM, email, and bookings.',
    price: {
      US: 500,
      UK: 400,
    },
    feeType: 'setup',
    features: [
      'Automated lead follow-up & nurture sequences',
      'Form-to-CRM integrations (HubSpot, Notion, Airtable, etc.)',
      'Appointment & booking calendar workflows (Cal.com, Calendly)',
      'Instant email notifications & team Slack/Discord alerts',
      'Repetitive administrative task automation'
    ],
    ctaText: 'Automate Workflows',
  },
  {
    id: 'ai_support',
    name: 'AI Customer Support System',
    tagline: 'Autonomous first-line customer inquiry resolution with deep business knowledge vectors.',
    price: {
      US: 1000,
      UK: 800,
    },
    feeType: 'setup',
    features: [
      'Comprehensive business knowledge base integration',
      'Multi-turn customer inquiry handling with context memory',
      'Intelligent lead qualification & priority triage',
      'Selected business system & ticketing integrations',
      'Human escalation workflows with full conversation logs',
      'Rigorous edge-case testing & guided deployment'
    ],
    ctaText: 'Implement AI Support',
  },
  {
    id: 'custom_ai',
    name: 'Custom Automation Solutions',
    tagline: 'Custom autonomous agent swarms, internal business tooling, and proprietary LLM workflows.',
    price: {
      US: null,
      UK: null,
    },
    feeType: 'quote',
    features: [
      'Custom LLM orchestration & multi-agent pipelines',
      'Proprietary data vector retrieval (RAG) architecture',
      'Voice AI telephony & automated inbound call handling',
      'Enterprise API integrations & custom webhook actions',
      'Security guardrails, prompt containment & compliance'
    ],
    ctaText: 'Discuss Custom Solution',
  },
];

export const OPTIONAL_MAINTENANCE: MaintenancePlan = {
  name: 'Optional Studio Care & Maintenance',
  tagline: 'Optional monthly care plan. Guarantees peak performance, sub-second loading, routine dependency updates, and continuous security.',
  price: {
    US: 50,
    UK: 40,
  },
  billingPeriod: 'month',
  scopeSummary:
    'Completely optional care plan billed monthly after project launch and acceptance. Defaults to unselected. Can be activated or canceled anytime without long-term lock-in.',
  inclusions: [
    '24/7 uptime monitoring & sub-second latency health checks',
    'Routine maintenance, security patches & framework dependency updates',
    'Automated cloud backups & rapid disaster rollback support',
    'Monthly Core Web Vitals audit & performance tuning',
    'Minor content tweaks and text/image updates (up to 1 hour/month)',
    'Priority direct email support (< 24hr response target)'
  ],
  exclusions: [
    'Third-party hosting, platform, or Cloudflare enterprise fees',
    'Domain name registration and annual renewal fees',
    'Third-party paid API tokens and LLM model costs (e.g. OpenAI/Anthropic)',
    'Transactional email/SMS provider costs (e.g. Resend, Twilio)',
    'Third-party automation subscriptions (e.g. Make, Zapier, Retool)',
    'Complete page redesigns, major new feature builds, or structural revisions'
  ],
  accountOwnershipNotice:
    'Third-party API usage, AI provider charges, automation platform subscriptions, hosting, and other applicable external costs are paid separately by the client. Whenever practical, clients should own and pay for their own service accounts so they retain 100% control and ownership.',
};

export const MANDATORY_MAINTENANCE = OPTIONAL_MAINTENANCE; // Backward compatibility alias

const STORAGE_KEY = 'valliance_market';

export function getSavedMarket(): Market | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === 'US' || val === 'UK') return val;
  } catch {
    // Ignore storage issues
  }
  return null;
}

export function setSavedMarket(market: Market): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, market);
    window.dispatchEvent(new CustomEvent('marketChanged', { detail: { market } }));
  } catch {
    // Ignore storage issues
  }
}

let detectPromise: Promise<Market> | null = null;

export async function detectVisitorMarket(): Promise<Market> {
  const saved = getSavedMarket();
  if (saved) return saved;

  if (detectPromise) return detectPromise;

  detectPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);

      const res = await fetch('https://ipapi.co/json/', {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const country = (data.country_code || data.country || '').toUpperCase();
        if (country === 'GB' || country === 'UK') {
          return 'UK';
        }
        return 'US';
      }
    } catch {
      // Graceful fallback
    }
    return 'US';
  })();

  return detectPromise;
}

export function useMarket() {
  const [market, setMarketState] = useState<Market>(() => getSavedMarket() || 'US');
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    const handleMarketChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ market: Market }>;
      if (customEvent.detail?.market) {
        setMarketState(customEvent.detail.market);
      }
    };

    window.addEventListener('marketChanged', handleMarketChange);

    if (!getSavedMarket()) {
      detectVisitorMarket().then((detected) => {
        setMarketState(detected);
        setIsDetected(true);
      });
    } else {
      setIsDetected(true);
    }

    return () => {
      window.removeEventListener('marketChanged', handleMarketChange);
    };
  }, []);

  const changeMarket = (newMarket: Market) => {
    setMarketState(newMarket);
    setSavedMarket(newMarket);
  };

  const currentConfig = MARKETS[market];
  const currencySymbol = currentConfig.currency;
  const currencyCode = currentConfig.currencyCode;

  const formatPrice = (amount: number | null, suffix = ''): string => {
    if (amount === null) return 'Custom quote';
    return `From ${currencySymbol}${amount.toLocaleString()}${suffix}`;
  };

  return {
    market,
    setMarket: changeMarket,
    marketConfig: currentConfig,
    currencySymbol,
    currencyCode,
    websitePackages: WEBSITE_PACKAGES,
    aiServices: AI_SERVICES,
    maintenancePlan: OPTIONAL_MAINTENANCE,
    formatPrice,
    isDetected,
  };
}

export function getCanonicalPriceRecord(
  serviceId: string,
  market: Market,
  includeMaintenance: boolean = false
) {
  const webPkg = WEBSITE_PACKAGES.find((p) => p.id === serviceId);
  const careFee = `${MARKETS[market].currency}${OPTIONAL_MAINTENANCE.price[market]}/mo`;

  if (webPkg) {
    const rawPrice = webPkg.price[market];
    return {
      serviceName: webPkg.name,
      currency: MARKETS[market].currency,
      currencyCode: MARKETS[market].currencyCode,
      startingPrice: rawPrice ? `${MARKETS[market].currency}${rawPrice.toLocaleString()}` : 'Custom quote',
      numericStartingPrice: rawPrice,
      optionalMaintenance: careFee,
      maintenanceIncluded: includeMaintenance,
      maintenanceStatus: includeMaintenance ? `Selected (${careFee})` : `Not selected ($0)`,
      numericMaintenance: includeMaintenance ? OPTIONAL_MAINTENANCE.price[market] : 0,
    };
  }

  const aiPkg = AI_SERVICES.find((p) => p.id === serviceId);
  if (aiPkg) {
    const rawPrice = aiPkg.price[market];
    return {
      serviceName: aiPkg.name,
      currency: MARKETS[market].currency,
      currencyCode: MARKETS[market].currencyCode,
      startingPrice: rawPrice ? `${MARKETS[market].currency}${rawPrice.toLocaleString()}` : 'Custom quote',
      numericStartingPrice: rawPrice,
      optionalMaintenance: careFee,
      maintenanceIncluded: includeMaintenance,
      maintenanceStatus: includeMaintenance ? `Selected (${careFee})` : `Not selected ($0)`,
      numericMaintenance: includeMaintenance ? OPTIONAL_MAINTENANCE.price[market] : 0,
    };
  }

  return {
    serviceName: 'Custom Solution',
    currency: MARKETS[market].currency,
    currencyCode: MARKETS[market].currencyCode,
    startingPrice: 'Custom quote',
    numericStartingPrice: null,
    optionalMaintenance: careFee,
    maintenanceIncluded: includeMaintenance,
    maintenanceStatus: includeMaintenance ? `Selected (${careFee})` : `Not selected ($0)`,
    numericMaintenance: includeMaintenance ? OPTIONAL_MAINTENANCE.price[market] : 0,
  };
}
