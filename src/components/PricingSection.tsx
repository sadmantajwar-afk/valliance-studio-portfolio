import React, { useState } from 'react';
import {
  Terminal,
  Check,
  ArrowUpRight,
  Sparkles,
  Bot,
  Zap,
  ShieldCheck,
  Plus,
  Minus,
  Layers,
  Info,
  Globe2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { sound } from '../utils/audio';
import { useMarket, Market, MARKETS } from '../utils/geoPricing';

interface PricingSectionProps {
  onOpenContact: (preset?: { service?: string; budget?: string }) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  const {
    market,
    setMarket,
    currencySymbol,
    currencyCode,
    websitePackages,
    aiServices,
    maintenancePlan,
    formatPrice
  } = useMarket();

  const [activeTab, setActiveTab] = useState<'all' | 'websites' | 'automation' | 'care'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSelectPackage = (serviceId: string, serviceName: string, startingPrice: string) => {
    sound.playClick(800);
    const budgetEstimate = startingPrice.includes('quote')
      ? 'Custom Quote'
      : `${startingPrice} – ${currencySymbol}${(
          parseInt(startingPrice.replace(/[^0-9]/g, '')) * 1.8
        ).toFixed(0)}`;

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('setInquiryPreset', {
          detail: {
            serviceId,
            service: serviceName,
            budget: budgetEstimate,
            market,
          },
        })
      );
    }
    onOpenContact({ service: serviceName, budget: budgetEstimate });
  };

  const toggleFaq = (idx: number) => {
    sound.playClick(600);
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const faqs = [
    {
      question: `How does location-aware pricing work between the US and UK?`,
      answer:
        `We work directly with founders and teams across the United States and United Kingdom. Pricing is tailored directly in USD ($) and GBP (£) to reflect localized business operations and commercial parity. Our displayed "From" prices represent the baseline for production-ready engineering with no live FX markups or hidden fees.`
    },
    {
      question: `Why is the monthly maintenance plan mandatory?`,
      answer:
        `Every production deployment requires proactive observation, framework dependency patching, and security monitoring. To uphold our standard of high uptime and sub-second performance, we maintain every website we deploy at a modest flat rate (${market === 'UK' ? '£40/month' : '$50/month'}). This fee begins only after final project launch and acceptance.`
    },
    {
      question: `What is included in the project price vs. external costs?`,
      answer:
        `Our project price covers full custom UI/UX design, engineering, responsive layout testing, performance optimization, SEO fundamentals, and technical deployment. External operational utilities—such as your custom domain, cloud hosting, transactional email, or third-party AI model tokens (OpenAI/Anthropic)—are paid directly to vendors without agency markup.`
    },
    {
      question: `How do e-commerce projects work without a separate tier?`,
      answer:
        `Every e-commerce brand has distinct SKU volumes, checkout architectures, and logistics requirements. We quote e-commerce builds through our "Custom Website" tier—ensuring your store receives bespoke UX art direction, payment gateway configuration (Stripe, Apple Pay), and inventory workflows tailored specifically to your business.`
    },
    {
      question: `Who owns the intellectual property and code?`,
      answer:
        `You do. Upon final project settlement, 100% full ownership of custom Figma artboards, frontend source repositories, tailored components, and digital assets transfers to your company. We never lock you into proprietary platforms or retainers.`
    },
    {
      question: `What are your project milestones and payment structure?`,
      answer:
        `We operate on an industry-standard 50/50 milestone agreement: a 50% deposit to initiate strategic sprint planning and design, with the remaining 50% due upon milestone approval and before live DNS cutover. You receive weekly milestone previews throughout.`
    }
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#08090b] text-[#f5f3ed] border-b border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#e8002d]/6 via-transparent to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-16 sm:space-y-20 relative z-10">
        {/* ============================================================== */}
        {/* SECTION HEADER & REGIONAL MARKET SELECTOR */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider font-semibold">
              <Terminal className="w-4 h-4" />
              <span>INDEX // 03 — COMMERCIAL ARCHITECTURE &amp; PRICING</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.35rem,7.5vw,5.5rem)] tracking-tight text-[#f5f3ed] uppercase leading-[0.92] break-words">
              TRANSPARENT VALUE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8002d] via-[#f5f3ed] to-[#cfc8ba]">
                COMMERCIAL CLARITY.
              </span>
            </h2>
            <p className="font-space text-base sm:text-xl text-[#cfc8ba] font-normal leading-relaxed pt-2">
              Fixed-scope engineering, bespoke art direction, and 100% full code ownership for US &amp; UK founders, startups, and high-growth brands.
            </p>
          </div>

          {/* Regional Currency & Market Switcher */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-[#a79e8f]">
              <Globe2 className="w-3.5 h-3.5 text-[#e8002d]" />
              <span className="uppercase tracking-wider">Select Market Region:</span>
            </div>

            <div className="inline-flex p-1 rounded-full bg-[#121316] border border-white/15 shadow-inner">
              {(['US', 'UK'] as Market[]).map((m) => {
                const isActive = market === m;
                return (
                  <button
                    key={m}
                    onClick={() => {
                      sound.playClick(700);
                      setMarket(m);
                    }}
                    className={`btn-tactile px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#e8002d] text-[#fff6ec] font-bold shadow-[0_0_15px_rgba(232,0,45,0.4)]'
                        : 'text-[#cfc8ba] hover:text-[#f5f3ed] hover:bg-white/5'
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Switch pricing to ${MARKETS[m].countryName} (${MARKETS[m].currencyCode})`}
                  >
                    <span>{MARKETS[m].flag}</span>
                    <span>{m === 'US' ? 'United States ($)' : 'United Kingdom (£)'}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] font-mono text-[#8a8172]">
              Active Currency: <strong className="text-[#f5f3ed]">{currencyCode} ({currencySymbol})</strong> • Fixed Discrete Tariffs
            </span>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'websites', label: '01 Website Packages' },
            { id: 'automation', label: '02 AI Automation' },
            { id: 'care', label: '03 Mandatory Care Plan' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick(600);
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`btn-tactile px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                activeTab === tab.id
                  ? 'bg-[#e8002d] text-[#fff6ec] border-[#e8002d] font-bold shadow-[0_0_20px_rgba(232,0,45,0.35)]'
                  : 'bg-white/5 text-[#cfc8ba] hover:text-[#f5f3ed] hover:bg-white/10 border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* 01. WEBSITE PACKAGES (4 Packages Grid) */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'websites') && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                  DISCIPLINE 01 // BESPOKE DIGITAL PRESENCE
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f5f3ed] uppercase tracking-tight mt-1">
                  Website Development Packages
                </h3>
              </div>
              <span className="font-mono text-xs text-[#8a8172] uppercase">
                {market === 'UK' ? 'All Prices in GBP (£)' : 'All Prices in USD ($)'} • Fixed-Scope Deliverables
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {websitePackages.map((pkg) => {
                const rawPrice = pkg.price[market];
                const displayPrice = rawPrice ? `${currencySymbol}${rawPrice.toLocaleString()}` : 'Custom quote';
                const isRecommended = Boolean(pkg.recommended);

                return (
                  <div
                    key={pkg.id}
                    className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl transition-all duration-300 space-y-6 ${
                      isRecommended
                        ? 'bg-[#161213] border-2 border-[#e8002d] shadow-[0_0_35px_rgba(232,0,45,0.18)] lg:-translate-y-2'
                        : 'bg-[#121316] border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {isRecommended && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#e8002d] text-[#fff6ec] font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                        <Sparkles className="w-3 h-3" />
                        <span>RECOMMENDED CHOICE</span>
                      </div>
                    )}

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <span className="font-mono text-[11px] text-[#8a8172] uppercase tracking-widest block font-medium">
                          {pkg.pages}
                        </span>
                        <h4 className="font-display font-extrabold text-2xl text-[#f5f3ed] uppercase tracking-tight">
                          {pkg.name}
                        </h4>
                        <p className="text-xs text-[#cfc8ba] font-sans leading-relaxed min-h-[48px]">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Pricing Display */}
                      <div className="pt-4 border-t border-white/10">
                        <div className="font-mono text-[11px] text-[#8a8172] uppercase">
                          {rawPrice ? 'Starting at' : 'Scope Consultation'}
                        </div>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="font-display font-black text-3xl sm:text-4xl text-[#f5f3ed]">
                            {rawPrice ? `${currencySymbol}${rawPrice.toLocaleString()}` : 'Custom'}
                          </span>
                          <span className="font-mono text-xs text-[#cfc8ba]">
                            {rawPrice ? '/ project' : 'quote'}
                          </span>
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] text-[10px] font-mono text-[#a79e8f]">
                          <span>Turnaround: {pkg.turnaround}</span>
                        </div>
                      </div>

                      {/* Inclusions */}
                      <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-[#cfc8ba]">
                        <div className="font-mono text-[11px] text-[#f5f3ed] uppercase tracking-wider font-semibold">
                          Key Deliverables:
                        </div>
                        {pkg.features.slice(0, 7).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <Check className="w-3.5 h-3.5 text-[#e8002d] shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>

                      {pkg.scopeNote && (
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10.5px] font-mono text-[#a79e8f] leading-relaxed">
                          <span className="text-[#e8002d] font-bold">NOTE:</span> {pkg.scopeNote}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <button
                        onClick={() => handleSelectPackage(pkg.id, pkg.name, displayPrice)}
                        className={`btn-tactile w-full min-h-[46px] py-3 px-5 rounded-full font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
                          isRecommended
                            ? 'bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] shadow-[0_0_20px_rgba(232,0,45,0.35)]'
                            : 'bg-white/5 hover:bg-white/10 text-[#f5f3ed] hover:text-[#e8002d] border border-white/15'
                        }`}
                      >
                        <span>{pkg.ctaText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ecommerce Note */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 max-w-3xl">
                <Info className="w-4 h-4 text-[#e8002d] shrink-0 mt-0.5" />
                <p className="text-xs text-[#cfc8ba] leading-relaxed">
                  <strong className="text-[#f5f3ed]">Need to sell products online?</strong> We engineer custom headless storefronts, Shopify integrations, and friction-free carts via the <strong>Custom Website</strong> package. Every e-commerce solution is custom-architected based on your specific inventory, catalog, and checkout requirements.
                </p>
              </div>
              <button
                onClick={() => handleSelectPackage('custom', 'Custom Ecommerce Storefront', 'Custom quote')}
                className="btn-tactile px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#f5f3ed] font-mono text-xs uppercase tracking-wider border border-white/15 shrink-0 whitespace-nowrap"
              >
                Quote Ecommerce Build ↗
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 02. AI AUTOMATION SERVICES ("Make Your Business Work Smarter.") */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'automation') && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                  DISCIPLINE 02 // INTELLIGENT WORKFLOWS
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f5f3ed] uppercase tracking-tight mt-1">
                  Make Your Business Work Smarter.
                </h3>
                <p className="text-sm text-[#cfc8ba] mt-1 max-w-xl">
                  Deploy targeted AI agents and automated pipelines to capture inquiries, qualify prospective clients, and eliminate manual busywork.
                </p>
              </div>
              <span className="font-mono text-xs text-[#8a8172] uppercase">
                One-Time Setup &amp; Implementation • {currencyCode}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiServices.map((service) => {
                const rawPrice = service.price[market];
                const displayPrice = rawPrice ? `${currencySymbol}${rawPrice.toLocaleString()}` : 'Custom quote';

                const iconMap: Record<string, React.ReactNode> = {
                  ai_chatbot: <Bot className="w-5 h-5 text-[#e8002d]" />,
                  workflow_automation: <Zap className="w-5 h-5 text-[#e8002d]" />,
                  ai_support: <Layers className="w-5 h-5 text-[#e8002d]" />,
                  custom_ai: <Sparkles className="w-5 h-5 text-[#e8002d]" />,
                };

                return (
                  <div
                    key={service.id}
                    className="p-7 rounded-3xl bg-[#121316] border border-white/10 hover:border-white/20 flex flex-col justify-between space-y-6 transition-all"
                  >
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-[#e8002d]/10 border border-[#e8002d]/30 flex items-center justify-center">
                        {iconMap[service.id]}
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-lg text-[#f5f3ed] uppercase leading-tight">
                          {service.name}
                        </h4>
                        <div className="flex items-baseline gap-1.5 mt-2">
                          <span className="font-display font-black text-2xl sm:text-3xl text-[#f5f3ed]">
                            {rawPrice ? `${currencySymbol}${rawPrice.toLocaleString()}` : 'Custom'}
                          </span>
                          <span className="font-mono text-[11px] text-[#8a8172] uppercase">
                            {rawPrice ? 'Setup' : 'Quote'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#a79e8f] leading-relaxed">
                        {service.tagline}
                      </p>

                      <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs text-[#cfc8ba]">
                        {service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#e8002d] shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectPackage(service.id, service.name, displayPrice)}
                      className="btn-tactile w-full py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 text-[#f5f3ed] font-mono text-xs uppercase tracking-wider font-semibold border border-white/10 flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* AI Scope and Guardrail Notice */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-[#8a8172] leading-relaxed">
              <strong className="text-[#f5f3ed]">Scope Clarity:</strong> AI services are not unlimited or fully autonomous. Third-party model API token fees (OpenAI/Anthropic) and telephony carrier rates are paid directly at cost by their respective providers. Custom pipelines and complex multi-agent frameworks are scoped under Custom Solutions.
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 03. MANDATORY MONTHLY MAINTENANCE (Single Mandatory Plan) */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'care') && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                  DISCIPLINE 03 // CONTINUOUS OBSERVABILITY &amp; INTEGRITY
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f5f3ed] uppercase tracking-tight mt-1">
                  Mandatory Monthly Maintenance
                </h3>
              </div>
              <span className="font-mono text-xs text-[#8a8172] uppercase">
                Single Standard Tier • Billed Monthly After Launch
              </span>
            </div>

            {/* Editorial Showcase Card for Mandatory Maintenance */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#151213] via-[#101114] to-[#0d0e11] border-2 border-[#e8002d]/40 shadow-[0_0_40px_rgba(232,0,45,0.12)] space-y-10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8002d]/10 border border-[#e8002d]/30 text-xs font-mono text-[#e8002d] uppercase tracking-wider font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>MANDATORY PRODUCTION POLICY</span>
                  </div>
                  <h4 className="font-display font-extrabold text-2xl sm:text-4xl text-[#f5f3ed] uppercase tracking-tight">
                    Dedicated Observability &amp; Care
                  </h4>
                  <p className="text-sm sm:text-base text-[#cfc8ba] leading-relaxed">
                    To guarantee that every website we build maintains sub-second page performance, flawless mobile responsiveness, and zero security vulnerabilities over time, monthly maintenance is <strong>mandatory for all production projects</strong>. Billed monthly starting after project handover and DNS launch.
                  </p>
                </div>

                {/* Price Display */}
                <div className="space-y-1 bg-[#1a1516] p-6 rounded-2xl border border-[#e8002d]/30 shrink-0 min-w-[240px]">
                  <span className="font-mono text-xs text-[#e8002d] uppercase font-bold block">
                    Maintenance Retainer
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display font-black text-4xl sm:text-5xl text-[#f5f3ed]">
                      {currencySymbol}{maintenancePlan.price[market]}
                    </span>
                    <span className="font-mono text-xs text-[#cfc8ba]">/ month</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#a79e8f] block pt-1">
                    Setup &amp; build fees billed separately
                  </span>
                </div>
              </div>

              {/* Inclusions & Exclusions Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm">
                {/* Inclusions */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#f5f3ed] uppercase font-bold tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#e8002d]" />
                    <span>Included in Every Active Maintenance Plan:</span>
                  </div>
                  <div className="space-y-2.5 text-[#cfc8ba]">
                    {maintenancePlan.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#e8002d] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exclusions & Scope Guardrails */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#a79e8f] uppercase font-bold tracking-wider">
                    <AlertCircle className="w-4 h-4 text-[#8a8172]" />
                    <span>Excluded from Baseline Maintenance (Billed Separately):</span>
                  </div>
                  <div className="space-y-2.5 text-[#8a8172]">
                    {maintenancePlan.exclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#e8002d] font-mono font-bold shrink-0">✕</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agreement Notice */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10 text-xs font-mono text-[#a79e8f]">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#e8002d] shrink-0" />
                  <span>Transparent SLA: No long-term lock-in contracts. Cancelable at any time upon written notification.</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/5 text-[#f5f3ed] text-[11px] font-mono shrink-0">
                  Flat Fee: {currencySymbol}{maintenancePlan.price[market]}/mo
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 04. COMMERCIAL POLICIES & CODE OWNERSHIP */}
        {/* ============================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#101114] border border-white/10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#e8002d] uppercase tracking-wider font-semibold">
              COMMERCIAL RULES &amp; POLICIES
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#f5f3ed] uppercase tracking-tight">
              How We Work Together
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#cfc8ba]">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="font-mono text-xs text-[#e8002d] uppercase font-bold block">
                01 // Fixed-Price Transparency
              </span>
              <p className="leading-relaxed text-[#a79e8f]">
                "From" prices reflect our complete baseline deliverables. You receive a guaranteed fixed-price scope proposal before any code or design commences.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="font-mono text-xs text-[#e8002d] uppercase font-bold block">
                02 // 50 / 50 Milestone Policy
              </span>
              <p className="leading-relaxed text-[#a79e8f]">
                We operate on an industry-standard 50% upfront deposit to initiate development, with the remaining 50% due upon milestone approval before live deployment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="font-mono text-xs text-[#e8002d] uppercase font-bold block">
                03 // 100% Code &amp; Asset Ownership
              </span>
              <p className="leading-relaxed text-[#a79e8f]">
                You own all custom source code, Figma design files, and tailored assets upon final settlement. No proprietary platform lock-in or developer hostages.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="font-mono text-xs text-[#e8002d] uppercase font-bold block">
                04 // Direct Third-Party Billing
              </span>
              <p className="leading-relaxed text-[#a79e8f]">
                Custom domains, cloud hosting, commercial font licenses, and AI token usages are paid directly to providers without agency markup.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="font-mono text-xs text-[#e8002d] uppercase font-bold block">
                05 // Sprint-Based Delivery
              </span>
              <p className="leading-relaxed text-[#a79e8f]">
                We provide weekly staging previews so you inspect living progress in real time rather than waiting weeks for an unverified reveal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="font-mono text-xs text-[#e8002d] uppercase font-bold block">
                06 // Mandatory Care Governance
              </span>
              <p className="leading-relaxed text-[#a79e8f]">
                Every website remains safeguarded under our flat monthly care agreement ({currencySymbol}{maintenancePlan.price[market]}/mo), billed monthly after launch.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 05. CONCISE PRICING FAQ (Accordion) */}
        {/* ============================================================== */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#e8002d] uppercase tracking-wider font-semibold">
              ANSWERS &amp; ASSURANCE
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#f5f3ed] uppercase tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-[#cfc8ba]">
              Everything you need to know about pricing, maintenance, revisions, and ownership.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-5 transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="btn-tactile w-full flex items-center justify-between gap-4 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-[#f5f3ed] group-hover:text-[#e8002d] transition-colors">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-[#f5f3ed] group-hover:border-[#e8002d] group-hover:text-[#e8002d] transition-all">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-[#cfc8ba] font-sans leading-relaxed pt-3 pr-8 animate-fadeIn">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 06. CUSTOM INQUIRY CTA BANNER */}
        {/* ============================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141011] via-[#121316] to-[#0c0d10] border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-[#e8002d] uppercase tracking-wider font-semibold">
              BESPOKE ARCHITECTURE &amp; SCOPE
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#f5f3ed] uppercase tracking-tight">
              Have a unique project or enterprise timeline?
            </h3>
            <p className="text-xs sm:text-sm text-[#cfc8ba] leading-relaxed">
              We architect custom platforms, headless stores, and proprietary AI workflows tailored specifically to your business operations.
            </p>
          </div>

          <button
            onClick={() => handleSelectPackage('custom', 'Custom Architecture Proposal', 'Custom quote')}
            className="btn-tactile min-h-[50px] px-8 py-4 rounded-full bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_30px_rgba(232,0,45,0.4)] flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.97]"
          >
            <span>Request a Custom Quote</span>
            <ArrowUpRight className="w-4 h-4 font-bold" />
          </button>
        </div>
      </div>
    </section>
  );
};
