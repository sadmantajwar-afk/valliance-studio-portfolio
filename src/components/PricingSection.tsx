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
import { useTheme } from '../utils/theme';

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

  const { isDark } = useTheme();

  const [activeTab, setActiveTab] = useState<'all' | 'websites' | 'automation' | 'care'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('signature');

  // Synchronize selection when contact section changes service
  React.useEffect(() => {
    const handleServiceChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceId: string }>;
      if (customEvent.detail?.serviceId) {
        setSelectedServiceId(customEvent.detail.serviceId);
      }
    };
    window.addEventListener('inquiryServiceChanged', handleServiceChange);
    return () => window.removeEventListener('inquiryServiceChanged', handleServiceChange);
  }, []);

  const handleSelectPackage = (serviceId: string, serviceName: string, startingPrice: string) => {
    sound.playClick(800);
    setSelectedServiceId(serviceId);
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
      question: `How does localized pricing work between the US and UK?`,
      answer:
        `We work directly with founders and teams across the United States and United Kingdom. Pricing is structured directly in USD ($) and GBP (£) to reflect regional commercial parity. Our displayed "From" prices represent the baseline for production-ready engineering with no live FX markups or hidden fees.`
    },
    {
      question: `Is the monthly care and maintenance plan mandatory?`,
      answer:
        `No. Monthly maintenance is completely optional ($50/month in the US, £40/month in the UK). It defaults to unselected. Every website is built on standard open technologies and handed over with complete documentation so your internal team can manage it independently if preferred.`
    },
    {
      question: `How are third-party API fees, hosting, and AI model costs handled?`,
      answer:
        `Third-party API usage (OpenAI, Anthropic), automation platform subscriptions (Make, Zapier, Retool), hosting infrastructure (Vercel, Cloudflare), and transactional SMS/email services are paid separately by the client. Whenever practical, clients own and pay for their own service accounts directly to maintain 100% operational ownership without agency markups.`
    },
    {
      question: `How do e-commerce projects work without a separate tier?`,
      answer:
        `Every e-commerce brand has distinct SKU volumes, checkout architectures, and logistics requirements. We quote e-commerce builds through our "Custom Website" tier—ensuring your store receives bespoke UX art direction, payment gateway configuration (Stripe, Apple Pay), and inventory workflows tailored specifically to your business.`
    },
    {
      question: `Who owns the intellectual property and code?`,
      answer:
        `You do. 100%. Upon final project payment, full ownership of all custom design files, code repositories, graphics, and assets is formally transferred to your business. We never hold your website hostage or lock you into proprietary platforms.`
    },
    {
      question: `What are your project milestones and payment structure?`,
      answer:
        `We operate on an industry-standard 50/50 milestone agreement: a 50% deposit to initiate strategic sprint planning and design, with the remaining 50% due upon milestone approval and before live DNS cutover. You receive weekly milestone previews throughout.`
    }
  ];

  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-200 overflow-hidden"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text-primary)',
        borderColor: 'var(--theme-border)',
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#F3264B]/6 via-transparent to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-white/[0.02] dark:bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-16 sm:space-y-20 relative z-10">
        {/* ============================================================== */}
        {/* SECTION HEADER & REGIONAL MARKET SELECTOR */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F3264B] uppercase tracking-wider font-semibold">
              <Terminal className="w-4 h-4" />
              <span>INDEX // 03 — COMMERCIAL ARCHITECTURE &amp; PRICING</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.35rem,7.5vw,5.5rem)] tracking-tight uppercase leading-[0.92] break-words" style={{ color: 'var(--theme-text-primary)' }}>
              TRANSPARENT VALUE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3264B] via-[#FF2A44] to-[#8A8172]">
                COMMERCIAL CLARITY.
              </span>
            </h2>
            <p className="font-space text-base sm:text-xl font-normal leading-relaxed pt-2" style={{ color: 'var(--theme-text-secondary)' }}>
              Fixed-scope engineering, bespoke art direction, and 100% full code ownership for US &amp; UK founders, startups, and high-growth brands.
            </p>
          </div>

          {/* Regional Currency & Market Switcher */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--theme-text-muted)' }}>
              <Globe2 className="w-3.5 h-3.5 text-[#F3264B]" />
              <span className="uppercase tracking-wider">Select Market Region:</span>
            </div>

            <div
              className="inline-flex p-1 rounded-full border shadow-inner transition-colors"
              style={{
                backgroundColor: 'var(--theme-surface-elevated)',
                borderColor: 'var(--theme-border)',
              }}
            >
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
                        ? 'bg-[#F3264B] text-white font-bold shadow-[0_0_15px_rgba(243,38,75,0.4)]'
                        : 'hover:opacity-80'
                    }`}
                    style={{
                      color: isActive ? '#FFFFFF' : 'var(--theme-text-secondary)',
                    }}
                    aria-pressed={isActive}
                    aria-label={`Switch pricing to ${MARKETS[m].countryName} (${MARKETS[m].currencyCode})`}
                  >
                    <span>{MARKETS[m].flag}</span>
                    <span>{m === 'US' ? 'United States ($)' : 'United Kingdom (£)'}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] font-mono" style={{ color: 'var(--theme-text-muted)' }}>
              Active Currency: <strong style={{ color: 'var(--theme-text-primary)' }}>{currencyCode} ({currencySymbol})</strong> • Fixed Discrete Tariffs
            </span>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'websites', label: '01 Website Packages' },
            { id: 'automation', label: '02 AI Automation' },
            { id: 'care', label: '03 Optional Care Plan' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick(600);
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`btn-tactile px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                activeTab === tab.id
                  ? 'bg-[#F3264B] text-white border-[#F3264B] font-bold shadow-[0_0_20px_rgba(243,38,75,0.35)]'
                  : 'hover:opacity-90'
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? '#F3264B' : 'var(--theme-surface)',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--theme-text-secondary)',
                borderColor: activeTab === tab.id ? '#F3264B' : 'var(--theme-border)',
              }}
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
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
              <div>
                <span className="text-xs font-mono text-[#F3264B] uppercase tracking-wider">
                  DISCIPLINE 01 // BESPOKE DIGITAL PRESENCE
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight mt-1" style={{ color: 'var(--theme-text-primary)' }}>
                  Website Development Packages
                </h3>
              </div>
              <span className="font-mono text-xs uppercase" style={{ color: 'var(--theme-text-muted)' }}>
                {market === 'UK' ? 'All Prices in GBP (£)' : 'All Prices in USD ($)'} • Fixed-Scope Deliverables
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {websitePackages.map((pkg) => {
                const rawPrice = pkg.price[market];
                const displayPrice = rawPrice ? `${currencySymbol}${rawPrice.toLocaleString()}` : 'Custom quote';
                const isRecommended = Boolean(pkg.recommended);
                const isSelected = selectedServiceId === pkg.id;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => handleSelectPackage(pkg.id, pkg.name, displayPrice)}
                    className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl transition-all duration-300 space-y-6 cursor-pointer group ${
                      isSelected
                        ? 'border-2 border-[#F3264B] shadow-[0_0_35px_rgba(243,38,75,0.25)] ring-2 ring-[#F3264B]/30 lg:-translate-y-2'
                        : isRecommended
                        ? 'border-2 border-[#F3264B]/80 shadow-[0_0_25px_rgba(243,38,75,0.12)] hover:border-[#F3264B]'
                        : 'border hover:border-[#F3264B]/60 hover:shadow-lg'
                    }`}
                    style={{
                      backgroundColor: isSelected
                        ? (isDark ? '#191315' : '#FFF5F6')
                        : isRecommended
                        ? (isDark ? '#161213' : '#FFF9FA')
                        : 'var(--theme-surface-card)',
                      borderColor: isSelected
                        ? '#F3264B'
                        : isRecommended
                        ? '#F3264B'
                        : 'var(--theme-border-card)',
                    }}
                  >
                    {isSelected ? (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F3264B] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ACTIVE SELECTION</span>
                      </div>
                    ) : isRecommended ? (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F3264B] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                        <Sparkles className="w-3 h-3" />
                        <span>RECOMMENDED CHOICE</span>
                      </div>
                    ) : null}

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <span className="font-mono text-[11px] uppercase tracking-widest block font-medium" style={{ color: 'var(--theme-text-muted)' }}>
                          {pkg.pages}
                        </span>
                        <h4 className="font-display font-extrabold text-2xl uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
                          {pkg.name}
                        </h4>
                        <p className="text-xs font-sans leading-relaxed min-h-[48px]" style={{ color: 'var(--theme-text-secondary)' }}>
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Pricing Display */}
                      <div className="pt-4 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                        <div className="font-mono text-[11px] uppercase" style={{ color: 'var(--theme-text-muted)' }}>
                          {rawPrice ? 'Starting at' : 'Scope Consultation'}
                        </div>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="font-display font-black text-3xl sm:text-4xl" style={{ color: 'var(--theme-text-primary)' }}>
                            {rawPrice ? `${currencySymbol}${rawPrice.toLocaleString()}` : 'Custom'}
                          </span>
                          <span className="font-mono text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                            {rawPrice ? '/ project' : 'quote'}
                          </span>
                        </div>
                        <div
                          className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono"
                          style={{
                            backgroundColor: 'var(--theme-surface-elevated)',
                            color: 'var(--theme-text-secondary)',
                          }}
                        >
                          <span>Turnaround: {pkg.turnaround}</span>
                        </div>
                      </div>

                      {/* Inclusions */}
                      <div className="space-y-2.5 pt-4 border-t text-xs" style={{ borderColor: 'var(--theme-border)' }}>
                        <div className="font-mono text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--theme-text-primary)' }}>
                          Key Deliverables:
                        </div>
                        {pkg.features.slice(0, 7).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <Check className="w-3.5 h-3.5 text-[#F3264B] shrink-0 mt-0.5" />
                            <span className="leading-snug" style={{ color: 'var(--theme-text-secondary)' }}>{item}</span>
                          </div>
                        ))}
                      </div>

                      {pkg.scopeNote && (
                        <div
                          className="p-3 rounded-xl border text-[10.5px] font-mono leading-relaxed"
                          style={{
                            backgroundColor: 'var(--theme-surface-elevated)',
                            borderColor: 'var(--theme-border)',
                            color: 'var(--theme-text-muted)',
                          }}
                        >
                          <span className="text-[#F3264B] font-bold">NOTE:</span> {pkg.scopeNote}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPackage(pkg.id, pkg.name, displayPrice);
                        }}
                        className={`btn-tactile w-full min-h-[46px] py-3 px-5 rounded-full font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
                          isSelected || isRecommended
                            ? 'bg-[#F3264B] hover:bg-[#FF2A44] text-white shadow-[0_0_20px_rgba(243,38,75,0.35)]'
                            : 'border hover:bg-[#F3264B] hover:text-white hover:border-[#F3264B]'
                        }`}
                        style={{
                          backgroundColor: (isSelected || isRecommended) ? '#F3264B' : 'var(--theme-surface-elevated)',
                          color: (isSelected || isRecommended) ? '#FFFFFF' : 'var(--theme-text-primary)',
                          borderColor: (isSelected || isRecommended) ? '#F3264B' : 'var(--theme-border)',
                        }}
                      >
                        <span>{isSelected ? 'Selected — Proceed to Scope' : pkg.ctaText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ecommerce Note */}
            <div
              className="p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{
                backgroundColor: 'var(--theme-surface-card)',
                borderColor: 'var(--theme-border)',
              }}
            >
              <div className="flex items-start gap-3 max-w-3xl">
                <Info className="w-4 h-4 text-[#F3264B] shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  <strong style={{ color: 'var(--theme-text-primary)' }}>Need to sell products online?</strong> We engineer custom headless storefronts, Shopify integrations, and friction-free carts via the <strong>Custom Website</strong> package. Every e-commerce solution is custom-architected based on your specific inventory, catalog, and checkout requirements.
                </p>
              </div>
              <button
                onClick={() => handleSelectPackage('custom', 'Custom Ecommerce Storefront', 'Custom quote')}
                className="btn-tactile px-5 py-2.5 rounded-full border text-xs font-mono uppercase tracking-wider shrink-0 whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--theme-surface-elevated)',
                  color: 'var(--theme-text-primary)',
                  borderColor: 'var(--theme-border)',
                }}
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
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
              <div>
                <span className="text-xs font-mono text-[#F3264B] uppercase tracking-wider">
                  DISCIPLINE 02 // INTELLIGENT WORKFLOWS
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight mt-1" style={{ color: 'var(--theme-text-primary)' }}>
                  Make Your Business Work Smarter.
                </h3>
                <p className="text-sm mt-1 max-w-xl" style={{ color: 'var(--theme-text-secondary)' }}>
                  Deploy targeted AI agents and automated pipelines to capture inquiries, qualify prospective clients, and eliminate manual busywork.
                </p>
              </div>
              <span className="font-mono text-xs uppercase" style={{ color: 'var(--theme-text-muted)' }}>
                One-Time Setup &amp; Implementation • {currencyCode}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiServices.map((service) => {
                const rawPrice = service.price[market];
                const displayPrice = rawPrice ? `${currencySymbol}${rawPrice.toLocaleString()}` : 'Custom quote';
                const isSelected = selectedServiceId === service.id;

                const iconMap: Record<string, React.ReactNode> = {
                  ai_chatbot: <Bot className="w-5 h-5 text-[#F3264B]" />,
                  workflow_automation: <Zap className="w-5 h-5 text-[#F3264B]" />,
                  ai_support: <Layers className="w-5 h-5 text-[#F3264B]" />,
                  custom_ai: <Sparkles className="w-5 h-5 text-[#F3264B]" />,
                };

                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectPackage(service.id, service.name, displayPrice)}
                    className={`relative p-7 rounded-3xl border flex flex-col justify-between space-y-6 transition-all cursor-pointer group hover:shadow-lg ${
                      isSelected
                        ? 'border-2 border-[#F3264B] shadow-[0_0_30px_rgba(243,38,75,0.25)] ring-2 ring-[#F3264B]/30'
                        : 'hover:border-[#F3264B]/50'
                    }`}
                    style={{
                      backgroundColor: isSelected
                        ? (isDark ? '#191315' : '#FFF5F6')
                        : 'var(--theme-surface-card)',
                      borderColor: isSelected ? '#F3264B' : 'var(--theme-border-card)',
                    }}
                  >
                    {isSelected && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#F3264B] text-white font-mono text-[9px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1 whitespace-nowrap">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>ACTIVE SELECTION</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F3264B]/10 border border-[#F3264B]/30 flex items-center justify-center">
                        {iconMap[service.id]}
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-lg uppercase leading-tight" style={{ color: 'var(--theme-text-primary)' }}>
                          {service.name}
                        </h4>
                        <div className="flex items-baseline gap-1.5 mt-2">
                          <span className="font-display font-black text-2xl sm:text-3xl" style={{ color: 'var(--theme-text-primary)' }}>
                            {rawPrice ? `${currencySymbol}${rawPrice.toLocaleString()}` : 'Custom'}
                          </span>
                          <span className="font-mono text-[11px] uppercase" style={{ color: 'var(--theme-text-muted)' }}>
                            {rawPrice ? 'Setup' : 'Quote'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                        {service.tagline}
                      </p>

                      <div className="space-y-2.5 pt-3 border-t text-xs" style={{ borderColor: 'var(--theme-border)' }}>
                        {service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#F3264B] shrink-0 mt-0.5" />
                            <span className="leading-snug" style={{ color: 'var(--theme-text-secondary)' }}>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPackage(service.id, service.name, displayPrice);
                      }}
                      className={`btn-tactile w-full py-3 px-4 rounded-full border font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
                        isSelected
                          ? 'bg-[#F3264B] text-white border-[#F3264B] shadow-[0_0_15px_rgba(243,38,75,0.3)]'
                          : 'hover:bg-[#F3264B] hover:text-white hover:border-[#F3264B]'
                      }`}
                      style={{
                        backgroundColor: isSelected ? '#F3264B' : 'var(--theme-surface-elevated)',
                        color: isSelected ? '#FFFFFF' : 'var(--theme-text-primary)',
                        borderColor: isSelected ? '#F3264B' : 'var(--theme-border)',
                      }}
                    >
                      <span>{isSelected ? 'Selected — Configure Scope' : service.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* AI Scope and External Account Ownership Disclosure */}
            <div
              className="p-5 rounded-2xl border text-[11.5px] font-mono leading-relaxed space-y-1.5"
              style={{
                backgroundColor: 'var(--theme-surface-card)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text-secondary)',
              }}
            >
              <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--theme-text-primary)' }}>
                <Info className="w-3.5 h-3.5 text-[#F3264B]" />
                <span>External Accounts &amp; Service Subscriptions Disclosure:</span>
              </div>
              <p>
                {maintenancePlan.accountOwnershipNotice}
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 03. OPTIONAL MONTHLY CARE PLAN */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'care') && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
              <div>
                <span className="text-xs font-mono text-[#F3264B] uppercase tracking-wider">
                  DISCIPLINE 03 // CONTINUOUS OBSERVABILITY &amp; INTEGRITY
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight mt-1" style={{ color: 'var(--theme-text-primary)' }}>
                  Optional Monthly Care &amp; Maintenance
                </h3>
              </div>
              <span className="font-mono text-xs uppercase" style={{ color: 'var(--theme-text-muted)' }}>
                Completely Optional • Defaults to Unselected
              </span>
            </div>

            {/* Editorial Showcase Card for Optional Maintenance */}
            <div
              className="p-8 sm:p-12 rounded-3xl border-2 space-y-10"
              style={{
                backgroundColor: 'var(--theme-surface-card)',
                borderColor: 'var(--theme-border-strong)',
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b" style={{ borderColor: 'var(--theme-border)' }}>
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3264B]/10 border border-[#F3264B]/30 text-xs font-mono text-[#F3264B] uppercase tracking-wider font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>OPTIONAL MAINTENANCE SERVICE</span>
                  </div>
                  <h4 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
                    Dedicated Observability &amp; Platform Care
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                    For founders who want continuous peace of mind, routine security patching, automated backups, and sub-second performance audits, we offer an optional care retainer at a modest flat rate. <strong>Maintenance is completely optional and defaults to unselected.</strong>
                  </p>
                </div>

                {/* Price Display */}
                <div
                  className="space-y-1 p-6 rounded-2xl border shrink-0 min-w-[240px]"
                  style={{
                    backgroundColor: 'var(--theme-surface-elevated)',
                    borderColor: 'var(--theme-border)',
                  }}
                >
                  <span className="font-mono text-xs text-[#F3264B] uppercase font-bold block">
                    Optional Care Plan
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display font-black text-4xl sm:text-5xl" style={{ color: 'var(--theme-text-primary)' }}>
                      {currencySymbol}{maintenancePlan.price[market]}
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--theme-text-muted)' }}>/ month</span>
                  </div>
                  <span className="text-[11px] font-mono block pt-1" style={{ color: 'var(--theme-text-muted)' }}>
                    Setup &amp; build fees billed separately
                  </span>
                </div>
              </div>

              {/* Inclusions & Exclusions Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm">
                {/* Inclusions */}
                <div
                  className="p-6 rounded-2xl border space-y-4"
                  style={{
                    backgroundColor: 'var(--theme-surface-elevated)',
                    borderColor: 'var(--theme-border)',
                  }}
                >
                  <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--theme-text-primary)' }}>
                    <CheckCircle2 className="w-4 h-4 text-[#F3264B]" />
                    <span>Included in Optional Care Retainer:</span>
                  </div>
                  <div className="space-y-2.5" style={{ color: 'var(--theme-text-secondary)' }}>
                    {maintenancePlan.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#F3264B] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exclusions & Scope Guardrails */}
                <div
                  className="p-6 rounded-2xl border space-y-4"
                  style={{
                    backgroundColor: 'var(--theme-surface-elevated)',
                    borderColor: 'var(--theme-border)',
                  }}
                >
                  <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>
                    <AlertCircle className="w-4 h-4 text-[#8A8172]" />
                    <span>Excluded from Baseline Maintenance (Billed Separately):</span>
                  </div>
                  <div className="space-y-2.5" style={{ color: 'var(--theme-text-muted)' }}>
                    {maintenancePlan.exclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#F3264B] font-mono font-bold shrink-0">✕</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agreement Notice */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t text-xs font-mono" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#F3264B] shrink-0" />
                  <span>Cancelable anytime with zero penalties. Clients retain 100% code and account ownership.</span>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-[11px] font-mono shrink-0 border"
                  style={{
                    backgroundColor: 'var(--theme-surface-elevated)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text-primary)',
                  }}
                >
                  Flat Fee: {currencySymbol}{maintenancePlan.price[market]}/mo (Optional)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 04. COMMERCIAL POLICIES & CODE OWNERSHIP */}
        {/* ============================================================== */}
        <div
          className="p-8 sm:p-12 rounded-3xl border space-y-8"
          style={{
            backgroundColor: 'var(--theme-surface-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#F3264B] uppercase tracking-wider font-semibold">
              COMMERCIAL RULES &amp; POLICIES
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
              How We Work Together
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
              <span className="font-mono text-xs text-[#F3264B] uppercase font-bold block">
                01 // Fixed-Price Transparency
              </span>
              <p className="leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                "From" prices reflect our complete baseline deliverables. You receive a guaranteed fixed-price scope proposal before any code or design commences.
              </p>
            </div>

            <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
              <span className="font-mono text-xs text-[#F3264B] uppercase font-bold block">
                02 // 50 / 50 Milestone Policy
              </span>
              <p className="leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                We operate on an industry-standard 50% upfront deposit to initiate development, with the remaining 50% due upon milestone approval before live deployment.
              </p>
            </div>

            <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
              <span className="font-mono text-xs text-[#F3264B] uppercase font-bold block">
                03 // 100% Code &amp; Asset Ownership
              </span>
              <p className="leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                You own all custom source code, Figma design files, and tailored assets upon final settlement. No proprietary platform lock-in or developer hostages.
              </p>
            </div>

            <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
              <span className="font-mono text-xs text-[#F3264B] uppercase font-bold block">
                04 // Direct Third-Party Billing
              </span>
              <p className="leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                Custom domains, cloud hosting, commercial font licenses, and AI token usages are paid directly to providers. Clients own their independent accounts.
              </p>
            </div>

            <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
              <span className="font-mono text-xs text-[#F3264B] uppercase font-bold block">
                05 // Sprint-Based Delivery
              </span>
              <p className="leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                We provide weekly staging previews so you inspect living progress in real time rather than waiting weeks for an unverified reveal.
              </p>
            </div>

            <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--theme-surface-elevated)', borderColor: 'var(--theme-border)' }}>
              <span className="font-mono text-xs text-[#F3264B] uppercase font-bold block">
                06 // Optional Care Freedom
              </span>
              <p className="leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                Monthly maintenance is fully optional ({currencySymbol}{maintenancePlan.price[market]}/mo) and defaults to unselected. You choose what suits your operations.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 05. CONCISE PRICING FAQ (Accordion) */}
        {/* ============================================================== */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#F3264B] uppercase tracking-wider font-semibold">
              ANSWERS &amp; ASSURANCE
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
              Everything you need to know about pricing, optional care, revisions, and ownership.
            </p>
          </div>

          <div className="divide-y border-y" style={{ borderColor: 'var(--theme-border)' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-5 transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="btn-tactile w-full flex items-center justify-between gap-4 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-base sm:text-lg group-hover:text-[#F3264B] transition-colors" style={{ color: 'var(--theme-text-primary)' }}>
                      {faq.question}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 group-hover:border-[#F3264B] group-hover:text-[#F3264B] transition-all"
                      style={{
                        borderColor: 'var(--theme-border)',
                        color: 'var(--theme-text-primary)',
                      }}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                  {isOpen && (
                    <p className="text-xs sm:text-sm font-sans leading-relaxed pt-3 pr-8 animate-fadeIn" style={{ color: 'var(--theme-text-secondary)' }}>
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
        <div
          className="p-8 sm:p-12 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl"
          style={{
            backgroundColor: 'var(--theme-surface-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-[#F3264B] uppercase tracking-wider font-semibold">
              BESPOKE ARCHITECTURE &amp; SCOPE
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
              Have a unique project or enterprise timeline?
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              We architect custom platforms, headless stores, and proprietary AI workflows tailored specifically to your business operations.
            </p>
          </div>

          <button
            onClick={() => handleSelectPackage('custom', 'Custom Architecture Proposal', 'Custom quote')}
            className="btn-tactile min-h-[50px] px-8 py-4 rounded-full bg-[#F3264B] hover:bg-[#FF2A44] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_30px_rgba(243,38,75,0.4)] flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.97]"
          >
            <span>Request a Custom Quote</span>
            <ArrowUpRight className="w-4 h-4 font-bold" />
          </button>
        </div>
      </div>
    </section>
  );
};
