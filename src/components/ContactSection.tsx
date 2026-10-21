import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Send,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Copy,
  Check,
  ShieldCheck,
  Loader2,
  Globe2,
  ChevronRight,
  ChevronLeft,
  Building,
  User,
  Globe,
  DollarSign,
  Calendar,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Plus
} from 'lucide-react';
import { sound } from '../utils/audio';
import { trackMetaLead } from '../utils/metaPixel';
import { submitLead, LeadSubmission } from '../utils/contactApi';
import { useMarket, Market, MARKETS, getCanonicalPriceRecord, OPTIONAL_MAINTENANCE } from '../utils/geoPricing';
import { useTheme } from '../utils/theme';

export const ContactSection: React.FC = () => {
  const { market, setMarket, currencySymbol, currencyCode, websitePackages, aiServices } = useMarket();
  const { isDark } = useTheme();

  // Wizard Step: 1 = Service, 2 = Budget & Timeline, 3 = Contact & Scope, 4 = Review & Confirm
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [selectedServiceId, setSelectedServiceId] = useState<string>('signature');
  const [includeMaintenance, setIncludeMaintenance] = useState<boolean>(false); // Defaults to UNSELECTED per requirement
  const [selectedBudget, setSelectedBudget] = useState<string>('$1,500 – $3,000');
  const [customBudgetValue, setCustomBudgetValue] = useState<string>('');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Standard / Next 30–45 Days');
  const [preferredContact, setPreferredContact] = useState<'email' | 'call' | 'whatsapp'>('email');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [message, setMessage] = useState('');
  const [acknowledgedAccountNotice, setAcknowledgedAccountNotice] = useState(true);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    leadId?: string;
    mailtoFallback?: string;
    warning?: string;
  } | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Combine services for selection list
  const allServices = [
    ...websitePackages.map((p) => ({
      id: p.id,
      name: p.name,
      category: 'Website',
      price: p.price[market],
      tagline: p.tagline,
      recommended: p.recommended,
    })),
    ...aiServices.map((a) => ({
      id: a.id,
      name: a.name,
      category: 'AI Automation',
      price: a.price[market],
      tagline: a.tagline,
      recommended: false,
    })),
  ];

  // Dynamic budget options based on active market currency
  const budgetOptions = market === 'UK'
    ? [
        '£600 – £1,200',
        '£1,200 – £2,400',
        '£2,400 – £4,000',
        '£4,000+',
        'Custom Budget',
      ]
    : [
        '$750 – $1,500',
        '$1,500 – $3,000',
        '$3,000 – $5,000',
        '$5,000+',
        'Custom Budget',
      ];

  const timelineOptions = [
    'Urgent / Next 2–3 Weeks',
    'Standard / Next 30–45 Days',
    'Flexible / Next 60+ Days',
    'Exploratory Blueprint Stage',
  ];

  // Adjust default budget when market flips
  useEffect(() => {
    if (selectedBudget !== 'Custom Budget' && !selectedBudget.startsWith(currencySymbol)) {
      setSelectedBudget(budgetOptions[1]);
    }
  }, [market]);

  // Synchronize with pricing packages or chatbot presets
  useEffect(() => {
    const handlePreset = (e: Event) => {
      const customEvent = e as CustomEvent<{
        serviceId?: string;
        service?: string;
        budget?: string;
        market?: Market;
        timeline?: string;
        brief?: string;
        maintenance?: boolean;
      }>;
      const detail = customEvent.detail;
      if (!detail) return;

      if (detail.market && (detail.market === 'US' || detail.market === 'UK')) {
        setMarket(detail.market);
      }
      if (detail.serviceId) {
        setSelectedServiceId(detail.serviceId);
      } else if (detail.service) {
        const found = allServices.find((s) => s.name.toLowerCase().includes(detail.service!.toLowerCase()));
        if (found) setSelectedServiceId(found.id);
      }
      if (detail.budget) {
        setSelectedBudget(detail.budget);
      }
      if (detail.timeline) {
        setSelectedTimeline(detail.timeline);
      }
      if (detail.brief) {
        setMessage((prev) => (prev ? `${prev}\n\n${detail.brief}` : detail.brief!));
      }
      if (typeof detail.maintenance === 'boolean') {
        setIncludeMaintenance(detail.maintenance);
      }

      setCurrentStep(2);
    };

    window.addEventListener('setInquiryPreset', handlePreset);
    return () => window.removeEventListener('setInquiryPreset', handlePreset);
  }, [allServices, setMarket]);

  const activeService = allServices.find((s) => s.id === selectedServiceId) || allServices[1];
  const canonicalPrice = getCanonicalPriceRecord(selectedServiceId, market, includeMaintenance);

  const handleNextStep = () => {
    sound.playClick(700);
    const errors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!selectedServiceId) errors.service = 'Please select a service tier';
    } else if (currentStep === 2) {
      if (selectedBudget === 'Custom Budget' && !customBudgetValue.trim()) {
        errors.budget = 'Please enter your target budget';
      }
    } else if (currentStep === 3) {
      if (!name.trim()) errors.name = 'Please provide your full name';
      if (!email.trim() || !email.includes('@')) errors.email = 'Please provide a valid business email';
      if (!organization.trim()) errors.organization = 'Please provide your company or brand name';
      if (!message.trim() || message.length < 15) {
        errors.message = 'Please provide a brief summary of your project goals (min 15 characters)';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    sound.playClick(500);
    setFormErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCopyEmail = () => {
    sound.playClick(800);
    navigator.clipboard.writeText('hello@valliancestudio.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const finalBudgetText =
    selectedBudget === 'Custom Budget'
      ? `${currencySymbol}${customBudgetValue.trim()} (Custom Estimate)`
      : selectedBudget;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick(900);

    if (!acknowledgedAccountNotice) {
      setFormErrors({ notice: 'Please acknowledge the third-party accounts disclosure' });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    // 1. Trigger Meta Lead Pixel Conversion
    trackMetaLead({
      value: finalBudgetText,
      services: [activeService.name],
      organization: organization.trim(),
    });

    // 2. Transmit Lead with canonical server-side validated pricing and maintenance choice
    const result = await submitLead({
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim(),
      websiteUrl: websiteUrl.trim() || undefined,
      market,
      serviceId: selectedServiceId,
      budget: finalBudgetText,
      timeline: selectedTimeline,
      message: message.trim(),
      preferredContact,
      includeMaintenance,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    sound.playChime();

    if (result.success) {
      setSubmissionResult({
        leadId: result.leadId,
      });
    } else {
      setSubmissionResult({
        leadId: result.leadId,
        mailtoFallback: result.mailtoFallback,
        warning: 'Transmission filtered by strict corporate mail relay. You can confirm via the direct email backup below.',
      });
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmissionResult(null);
    setCurrentStep(1);
    setName('');
    setEmail('');
    setOrganization('');
    setWebsiteUrl('');
    setMessage('');
    setCustomBudgetValue('');
    setIncludeMaintenance(false);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-200 overflow-hidden"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text-primary)',
        borderColor: 'var(--theme-border)',
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-t from-[#F3264B]/10 via-transparent to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F3264B] uppercase tracking-wider font-semibold">
              <Terminal className="w-4 h-4" />
              <span>INDEX // 04 — SMART PROJECT INQUIRY SYSTEM</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,6.5vw,4.5rem)] tracking-tight uppercase leading-[0.92]" style={{ color: 'var(--theme-text-primary)' }}>
              INITIATE YOUR BUILD. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3264B] via-[#FF2A44] to-[#8A8172]">
                QUALIFY YOUR TIMELINE.
              </span>
            </h2>
            <p className="font-space text-sm sm:text-base leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              Step into high-velocity digital craftsmanship. Share your project requirements to receive a guaranteed fixed-price scope proposal within 24 hours.
            </p>
          </div>

          {/* Direct Studio Contact Pill */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <button
              onClick={handleCopyEmail}
              className="btn-tactile inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-mono transition-all"
              style={{
                backgroundColor: 'var(--theme-surface-elevated)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text-secondary)',
              }}
            >
              <Mail className="w-3.5 h-3.5 text-[#F3264B]" />
              <span>hello@valliancestudio.com</span>
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3 h-3" style={{ color: 'var(--theme-text-muted)' }} />}
            </button>
            <span className="text-[11px] font-mono" style={{ color: 'var(--theme-text-muted)' }}>
              Avg. Scope Response Time: &lt; 24 Hours
            </span>
          </div>
        </div>

        {/* Wizard Multi-Step Progress Bar */}
        {!isSubmitted && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase" style={{ color: 'var(--theme-text-muted)' }}>
              <span>Step 0{currentStep} of 04</span>
              <span style={{ color: 'var(--theme-text-primary)' }} className="font-semibold">
                {currentStep === 1 && '01 // Select Service & Market'}
                {currentStep === 2 && '02 // Budget & Desired Timeline'}
                {currentStep === 3 && '03 // Brand & Project Brief'}
                {currentStep === 4 && '04 // Scope Review & Confirmation'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentStep >= step
                      ? 'bg-[#F3264B] shadow-[0_0_10px_rgba(243,38,75,0.4)]'
                      : ''
                  }`}
                  style={{
                    backgroundColor: currentStep >= step ? '#F3264B' : 'var(--theme-border)',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div
          className="p-6 sm:p-10 rounded-3xl border shadow-2xl relative transition-colors duration-200"
          style={{
            backgroundColor: 'var(--theme-surface-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          {/* ============================================================== */}
          {/* SUCCESS SCREEN */}
          {/* ============================================================== */}
          {isSubmitted && submissionResult && (
            <div className="py-8 sm:py-12 text-center space-y-8 max-w-xl mx-auto animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#F3264B]/10 border border-[#F3264B]/40 flex items-center justify-center mx-auto text-[#F3264B]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-3">
                <span className="font-mono text-xs text-[#F3264B] uppercase tracking-widest font-semibold block">
                  INQUIRY TRANSMITTED // {submissionResult.leadId}
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
                  Brief Received Successfully.
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  Thank you, <strong style={{ color: 'var(--theme-text-primary)' }}>{name}</strong>. Our lead partner is reviewing your requirements for <strong style={{ color: 'var(--theme-text-primary)' }}>{canonicalPrice.serviceName}</strong>. You will receive our formal proposal and milestone schedule within 24 hours.
                </p>
              </div>

              {/* Summary Card */}
              <div
                className="p-5 rounded-2xl border text-left text-xs font-mono space-y-2.5"
                style={{
                  backgroundColor: 'var(--theme-surface-elevated)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}>
                  <span>Market Region:</span>
                  <span style={{ color: 'var(--theme-text-primary)' }}>{MARKETS[market].countryName} ({currencyCode})</span>
                </div>
                <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}>
                  <span>Baseline Scope:</span>
                  <span style={{ color: 'var(--theme-text-primary)' }}>{canonicalPrice.startingPrice}</span>
                </div>
                <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}>
                  <span>Optional Maintenance:</span>
                  <span className={includeMaintenance ? 'text-[#F3264B] font-bold' : ''} style={{ color: includeMaintenance ? '#F3264B' : 'var(--theme-text-primary)' }}>
                    {includeMaintenance ? `Added (${canonicalPrice.optionalMaintenance})` : 'Not selected ($0)'}
                  </span>
                </div>
                <div className="flex justify-between" style={{ color: 'var(--theme-text-muted)' }}>
                  <span>Target Budget:</span>
                  <span style={{ color: 'var(--theme-text-primary)' }}>{finalBudgetText}</span>
                </div>
              </div>

              {submissionResult.warning && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 text-left space-y-2">
                  <p>{submissionResult.warning}</p>
                  {submissionResult.mailtoFallback && (
                    <a
                      href={submissionResult.mailtoFallback}
                      className="inline-flex items-center gap-1.5 text-white underline font-mono text-[11px]"
                    >
                      <span>Click here to open pre-filled backup email ↗</span>
                    </a>
                  )}
                </div>
              )}

              <button
                onClick={resetForm}
                className="btn-tactile px-8 py-3.5 rounded-full border font-mono text-xs uppercase tracking-wider"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  color: 'var(--theme-text-primary)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                Submit Another Project Brief
              </button>
            </div>
          )}

          {/* ============================================================== */}
          {/* ACTIVE WIZARD STEPS */}
          {/* ============================================================== */}
          {!isSubmitted && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* STEP 1: SERVICE & MARKET SELECTION */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl uppercase" style={{ color: 'var(--theme-text-primary)' }}>
                        Choose Your Project Discipline
                      </h3>
                      <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>
                        Select the primary package or capability you need architected.
                      </p>
                    </div>

                    {/* Regional Market Selector inside Form */}
                    <div
                      className="inline-flex p-1 rounded-full border shrink-0"
                      style={{
                        backgroundColor: 'var(--theme-surface-elevated)',
                        borderColor: 'var(--theme-border)',
                      }}
                    >
                      {(['US', 'UK'] as Market[]).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => {
                            sound.playClick(600);
                            setMarket(m);
                          }}
                          className={`btn-tactile px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                            market === m
                              ? 'bg-[#F3264B] text-white font-bold shadow-[0_0_12px_rgba(243,38,75,0.4)]'
                              : 'hover:opacity-80'
                          }`}
                          style={{
                            color: market === m ? '#FFFFFF' : 'var(--theme-text-secondary)',
                          }}
                        >
                          <span>{MARKETS[m].flag}</span>
                          <span>{m}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {allServices.map((service) => {
                      const isSelected = selectedServiceId === service.id;
                      const formattedPrice = service.price
                        ? `${currencySymbol}${service.price.toLocaleString()}`
                        : 'Custom quote';

                      return (
                        <div
                          key={service.id}
                          onClick={() => {
                            sound.playClick(600);
                            setSelectedServiceId(service.id);
                          }}
                          className={`btn-tactile p-5 rounded-2xl cursor-pointer border text-left transition-all flex flex-col justify-between space-y-4 ${
                            isSelected
                              ? 'border-[#F3264B] shadow-[0_0_20px_rgba(243,38,75,0.25)]'
                              : 'hover:border-opacity-60'
                          }`}
                          style={{
                            backgroundColor: isSelected
                              ? (isDark ? '#191516' : '#FFF5F6')
                              : 'var(--theme-surface-elevated)',
                            borderColor: isSelected ? '#F3264B' : 'var(--theme-border)',
                          }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>
                                {service.category}
                              </span>
                              {service.recommended && (
                                <span className="text-[9px] font-mono font-bold text-[#F3264B] px-2 py-0.5 rounded-full bg-[#F3264B]/10 border border-[#F3264B]/30">
                                  POPULAR
                                </span>
                              )}
                            </div>
                            <h4 className="font-display font-bold text-base uppercase leading-tight" style={{ color: 'var(--theme-text-primary)' }}>
                              {service.name}
                            </h4>
                            <p className="text-xs leading-snug line-clamp-2" style={{ color: 'var(--theme-text-secondary)' }}>
                              {service.tagline}
                            </p>
                          </div>

                          <div className="pt-3 border-t flex items-baseline justify-between" style={{ borderColor: 'var(--theme-border)' }}>
                            <span className="text-[11px] font-mono" style={{ color: 'var(--theme-text-muted)' }}>Baseline:</span>
                            <span className="font-display font-extrabold text-sm" style={{ color: 'var(--theme-text-primary)' }}>
                              {formattedPrice}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Optional Maintenance Add-on Toggle Card (Defaulted to Unselected) */}
                  <div
                    onClick={() => {
                      sound.playClick(600);
                      setIncludeMaintenance(!includeMaintenance);
                    }}
                    className={`btn-tactile p-4 sm:p-5 rounded-2xl border cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                      includeMaintenance
                        ? 'border-[#F3264B] shadow-[0_0_15px_rgba(243,38,75,0.2)]'
                        : ''
                    }`}
                    style={{
                      backgroundColor: includeMaintenance
                        ? (isDark ? '#1A1416' : '#FFF9FA')
                        : 'var(--theme-surface-elevated)',
                      borderColor: includeMaintenance ? '#F3264B' : 'var(--theme-border)',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={includeMaintenance}
                        onChange={() => {}} // Controlled via card click
                        className="mt-1 w-4 h-4 accent-[#F3264B] rounded cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold uppercase" style={{ color: 'var(--theme-text-primary)' }}>
                            Add Optional Studio Care &amp; Maintenance Plan
                          </span>
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-white/10" style={{ color: 'var(--theme-text-muted)' }}>
                            Optional
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                          Proactive uptime observability, routine framework updates, automated backups, and sub-second performance tuning. (Defaults to unselected).
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 pl-7 sm:pl-0">
                      <div className="font-display font-black text-base text-[#F3264B]">
                        +{currencySymbol}{OPTIONAL_MAINTENANCE.price[market]}/mo
                      </div>
                      <span className="text-[10px] font-mono" style={{ color: 'var(--theme-text-muted)' }}>
                        Billed monthly after launch
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: BUDGET & TIMELINE */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="pb-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
                    <h3 className="font-display font-bold text-xl sm:text-2xl uppercase" style={{ color: 'var(--theme-text-primary)' }}>
                      Investment Budget &amp; Delivery Schedule
                    </h3>
                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>
                      Target budgets align engineering scope, animation depth, and team velocity.
                    </p>
                  </div>

                  {/* Budget Options */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider block font-semibold" style={{ color: 'var(--theme-text-primary)' }}>
                      Approximate Project Budget ({currencyCode} {currencySymbol})
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {budgetOptions.map((b) => {
                        const isSelected = selectedBudget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => {
                              sound.playClick(600);
                              setSelectedBudget(b);
                            }}
                            className={`btn-tactile p-3.5 rounded-xl border text-center font-mono text-xs transition-all ${
                              isSelected
                                ? 'bg-[#F3264B] text-white border-[#F3264B] font-bold shadow-[0_0_15px_rgba(243,38,75,0.35)]'
                                : 'hover:border-opacity-60'
                            }`}
                            style={{
                              backgroundColor: isSelected ? '#F3264B' : 'var(--theme-surface-elevated)',
                              color: isSelected ? '#FFFFFF' : 'var(--theme-text-secondary)',
                              borderColor: isSelected ? '#F3264B' : 'var(--theme-border)',
                            }}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>

                    {selectedBudget === 'Custom Budget' && (
                      <div className="pt-2 animate-fadeIn">
                        <input
                          type="text"
                          value={customBudgetValue}
                          onChange={(e) => setCustomBudgetValue(e.target.value)}
                          placeholder={`e.g. 8,500 or 12,000 ${currencyCode}`}
                          className="w-full sm:max-w-md p-3.5 rounded-xl border text-sm focus:border-[#F3264B] focus:outline-none"
                          style={{
                            backgroundColor: 'var(--theme-surface-elevated)',
                            borderColor: 'var(--theme-border)',
                            color: 'var(--theme-text-primary)',
                          }}
                        />
                        {formErrors.budget && (
                          <p className="text-xs text-[#F3264B] mt-1 font-mono">{formErrors.budget}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Timeline Options */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider block font-semibold" style={{ color: 'var(--theme-text-primary)' }}>
                      Target Launch Window
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {timelineOptions.map((t) => {
                        const isSelected = selectedTimeline === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              sound.playClick(600);
                              setSelectedTimeline(t);
                            }}
                            className={`btn-tactile p-3.5 rounded-xl border text-left font-mono text-xs transition-all ${
                              isSelected
                                ? 'border-[#F3264B] font-bold shadow-[0_0_15px_rgba(243,38,75,0.25)]'
                                : 'hover:border-opacity-60'
                            }`}
                            style={{
                              backgroundColor: isSelected
                                ? (isDark ? '#191516' : '#FFF5F6')
                                : 'var(--theme-surface-elevated)',
                              borderColor: isSelected ? '#F3264B' : 'var(--theme-border)',
                              color: isSelected ? '#F3264B' : 'var(--theme-text-secondary)',
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider block font-semibold" style={{ color: 'var(--theme-text-primary)' }}>
                      Preferred Communication Mode
                    </label>
                    <div className="grid grid-cols-3 gap-3 max-w-lg">
                      {[
                        { id: 'email', label: 'Email Only' },
                        { id: 'call', label: 'Google Meet / Call' },
                        { id: 'whatsapp', label: 'WhatsApp / DM' },
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => {
                            sound.playClick(600);
                            setPreferredContact(mode.id as typeof preferredContact);
                          }}
                          className={`btn-tactile p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                            preferredContact === mode.id
                              ? 'border-[#F3264B] font-bold text-[#F3264B]'
                              : 'hover:opacity-80'
                          }`}
                          style={{
                            backgroundColor: preferredContact === mode.id
                              ? (isDark ? '#191516' : '#FFF5F6')
                              : 'var(--theme-surface-elevated)',
                            borderColor: preferredContact === mode.id ? '#F3264B' : 'var(--theme-border)',
                            color: preferredContact === mode.id ? '#F3264B' : 'var(--theme-text-muted)',
                          }}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & BRAND DETAILS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="pb-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
                    <h3 className="font-display font-bold text-xl sm:text-2xl uppercase" style={{ color: 'var(--theme-text-primary)' }}>
                      Brand &amp; Contact Credentials
                    </h3>
                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>
                      Where should we transmit your architectural scope and sprint timeline?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--theme-text-primary)' }}>
                        <User className="w-3.5 h-3.5 text-[#F3264B]" />
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Marcus Vance"
                        className="w-full p-3.5 rounded-xl border text-sm focus:border-[#F3264B] focus:outline-none"
                        style={{
                          backgroundColor: 'var(--theme-surface-elevated)',
                          borderColor: 'var(--theme-border)',
                          color: 'var(--theme-text-primary)',
                        }}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-[#F3264B] font-mono">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Business Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--theme-text-primary)' }}>
                        <Mail className="w-3.5 h-3.5 text-[#F3264B]" />
                        <span>Work Email *</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@company.com"
                        className="w-full p-3.5 rounded-xl border text-sm focus:border-[#F3264B] focus:outline-none"
                        style={{
                          backgroundColor: 'var(--theme-surface-elevated)',
                          borderColor: 'var(--theme-border)',
                          color: 'var(--theme-text-primary)',
                        }}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-[#F3264B] font-mono">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--theme-text-primary)' }}>
                        <Building className="w-3.5 h-3.5 text-[#F3264B]" />
                        <span>Company / Brand Name *</span>
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. Vance Dynamics or Stealther Inc."
                        className="w-full p-3.5 rounded-xl border text-sm focus:border-[#F3264B] focus:outline-none"
                        style={{
                          backgroundColor: 'var(--theme-surface-elevated)',
                          borderColor: 'var(--theme-border)',
                          color: 'var(--theme-text-primary)',
                        }}
                      />
                      {formErrors.organization && (
                        <p className="text-xs text-[#F3264B] font-mono">{formErrors.organization}</p>
                      )}
                    </div>

                    {/* Website URL */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--theme-text-primary)' }}>
                        <Globe className="w-3.5 h-3.5 text-[#8A8172]" />
                        <span>Current Website URL (Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full p-3.5 rounded-xl border text-sm focus:border-[#F3264B] focus:outline-none"
                        style={{
                          backgroundColor: 'var(--theme-surface-elevated)',
                          borderColor: 'var(--theme-border)',
                          color: 'var(--theme-text-primary)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--theme-text-primary)' }}>
                      <MessageSquare className="w-3.5 h-3.5 text-[#F3264B]" />
                      <span>Project Brief &amp; Scope Objectives *</span>
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline your core goals, key pages, aesthetic references, or specific automation required..."
                      className="w-full p-3.5 rounded-xl border text-sm focus:border-[#F3264B] focus:outline-none resize-none"
                      style={{
                        backgroundColor: 'var(--theme-surface-elevated)',
                        borderColor: 'var(--theme-border)',
                        color: 'var(--theme-text-primary)',
                      }}
                    />
                    {formErrors.message && (
                      <p className="text-xs text-[#F3264B] font-mono">{formErrors.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW SUMMARY & CONFIRMATION */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="pb-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
                    <h3 className="font-display font-bold text-xl sm:text-2xl uppercase" style={{ color: 'var(--theme-text-primary)' }}>
                      Confirm Project Specifications
                    </h3>
                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>
                      Please review your commercial summary before transmission to our engineering partners.
                    </p>
                  </div>

                  {/* Summary Table */}
                  <div
                    className="p-6 rounded-2xl border divide-y text-xs font-mono space-y-3"
                    style={{
                      backgroundColor: 'var(--theme-surface-elevated)',
                      borderColor: 'var(--theme-border)',
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3">
                      <span style={{ color: 'var(--theme-text-muted)' }}>Market Region &amp; Currency:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>
                        {MARKETS[market].flag} {MARKETS[market].countryName} ({currencyCode} • {currencySymbol})
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-3">
                      <span style={{ color: 'var(--theme-text-muted)' }}>Selected Service Package:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>{canonicalPrice.serviceName}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-3">
                      <span style={{ color: 'var(--theme-text-muted)' }}>Starting Investment:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>{canonicalPrice.startingPrice}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-3">
                      <span style={{ color: 'var(--theme-text-muted)' }}>Optional Monthly Care Plan:</span>
                      <span className={includeMaintenance ? 'font-bold text-[#F3264B]' : 'font-medium'} style={{ color: includeMaintenance ? '#F3264B' : 'var(--theme-text-primary)' }}>
                        {includeMaintenance ? `Added (${canonicalPrice.optionalMaintenance})` : 'Not Selected ($0/mo)'}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-3">
                      <span style={{ color: 'var(--theme-text-muted)' }}>Indicated Budget:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>{finalBudgetText}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-3">
                      <span style={{ color: 'var(--theme-text-muted)' }}>Target Delivery:</span>
                      <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>{selectedTimeline}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-3">
                      <span style={{ color: 'var(--theme-text-muted)' }}>Point of Contact:</span>
                      <span style={{ color: 'var(--theme-text-primary)' }}>
                        {name} ({email}) • {organization}
                      </span>
                    </div>
                  </div>

                  {/* External Account & Ownership Disclosure Checkbox */}
                  <div
                    className="p-4 rounded-xl border space-y-2"
                    style={{
                      backgroundColor: 'var(--theme-surface-card)',
                      borderColor: 'var(--theme-border)',
                    }}
                  >
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={acknowledgedAccountNotice}
                        onChange={(e) => setAcknowledgedAccountNotice(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#F3264B] rounded cursor-pointer"
                      />
                      <span className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                        I understand that third-party API usage (e.g. OpenAI), cloud hosting, domain registrations, and platform subscriptions are paid separately and directly by our business, ensuring our team owns 100% of our external accounts.
                      </span>
                    </label>
                    {formErrors.notice && (
                      <p className="text-xs text-[#F3264B] font-mono pl-7">{formErrors.notice}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="btn-tactile px-5 py-3 rounded-full border font-mono text-xs uppercase tracking-wider flex items-center gap-2"
                    style={{
                      backgroundColor: 'var(--theme-surface-elevated)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text-secondary)',
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-tactile px-7 py-3 rounded-full bg-[#F3264B] hover:bg-[#FF2A44] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(243,38,75,0.4)] flex items-center gap-2 active:scale-[0.97]"
                  >
                    <span>Continue to Step 0{currentStep + 1}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-tactile px-8 py-3.5 rounded-full bg-[#F3264B] hover:bg-[#FF2A44] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_30px_rgba(243,38,75,0.45)] flex items-center gap-2 active:scale-[0.97] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Validating &amp; Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
