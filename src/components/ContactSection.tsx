import React, { useState } from 'react';
import {
  Terminal,
  Send,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Copy,
  Check,
  Calendar,
  Lock
} from 'lucide-react';
import { sound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>(['Digital Flagship']);
  const [selectedBudget, setSelectedBudget] = useState<string>('$50k – $100k');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Q2 / Q3 2026');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const servicesList = [
    'Digital Flagship & WebGL',
    'AI Agents & Autonomous RAG',
    'VoiceOS Telephony Intelligence',
    'Headless Commerce Platform',
    'Custom Operational Cockpit',
    'Enterprise Workflow Pipelines'
  ];

  const budgetTiers = [
    '$25k – $50k',
    '$50k – $100k',
    '$100k – $250k',
    '$250k+'
  ];

  const timelineOptions = [
    'Immediate (Next 30 Days)',
    'Q2 / Q3 2026',
    'Q4 2026 / 2027',
    'Exploratory Blueprint'
  ];

  const toggleService = (s: string) => {
    sound.playClick(600);
    if (selectedServices.includes(s)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((item) => item !== s));
      }
    } else {
      setSelectedServices([...selectedServices, s]);
    }
  };

  const handleCopyEmail = () => {
    sound.playClick(800);
    navigator.clipboard.writeText('hello@valliancestudio.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick(900);

    const errors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errors.name = 'Please provide your name';
    if (!email.trim() || !email.includes('@')) errors.email = 'Please provide a valid work email';
    if (!message.trim() || message.length < 10) errors.message = 'Please share a brief description (min 10 characters)';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      sound.playChime();
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#0b0908] overflow-hidden">
      {/* Background glowing sphere */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-t from-[#e8002d]/8 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>INDEX // 07 — INITIATE COLLABORATION</span>
          </div>

          <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#f7f3eb] uppercase leading-[0.92]">
            LET’S MAKE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8002d] via-[#f7f3eb] to-[#e8e2d6]">
              SOMETHING MATTER.
            </span>
          </h2>

          <p className="font-space text-xl sm:text-2xl text-[#cfc8ba] font-light max-w-2xl leading-relaxed">
            “Have a business to grow, a system to improve, or an idea worth building? Let’s talk.”
          </p>
        </div>

        {/* Form & Studio Information Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Interactive Project Estimator & Form */}
          <div className="lg:col-span-8">
            {isSubmitted ? (
              <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-[#e8002d]/40 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#e8002d] text-[#fff6ec] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(232,0,45,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-3xl font-bold text-[#f7f3eb] uppercase">
                      TRANSMISSION RECEIVED
                    </h3>
                    <p className="text-sm text-[#cfc8ba] max-w-md mx-auto">
                      Thank you, {name}. Our principal partners will review your {selectedBudget} scope and contact you within 24 hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#e8002d] max-w-md mx-auto">
                    TRANSACTION ID: #VAL-{Math.floor(Math.random() * 900000 + 100000)} // ENCRYPTED
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick(400);
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setOrganization('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-[#f7f3eb] uppercase tracking-wider"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/15 space-y-8 shadow-2xl"
                >
                  {/* Scope Selector */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                      01 // WHAT CAPABILITIES ARE REQUIRED? (MULTI-SELECT)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {servicesList.map((srv) => {
                        const isSelected = selectedServices.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => toggleService(srv)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                              isSelected
                                ? 'bg-[#e8002d] text-[#fff6ec] font-bold shadow-[0_0_15px_rgba(232,0,45,0.3)]'
                                : 'bg-white/5 text-[#cfc8ba] hover:bg-white/10 border border-white/10'
                            }`}
                            data-cursor="hover"
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                      02 // ESTIMATED INVESTMENT SCOPE (USD)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            sound.playClick(500);
                            setSelectedBudget(b);
                          }}
                          className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold tracking-wider transition-all text-center ${
                            selectedBudget === b
                              ? 'bg-[#e8002d] text-[#fff6ec] shadow-[0_0_15px_rgba(232,0,45,0.3)]'
                              : 'bg-white/5 text-[#cfc8ba] hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Selector */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                      03 // TARGET TIMELINE
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timelineOptions.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            sound.playClick(500);
                            setSelectedTimeline(t);
                          }}
                          className={`py-2.5 px-2 rounded-xl text-[11px] font-mono tracking-wider transition-all text-center ${
                            selectedTimeline === t
                              ? 'bg-[#e8002d] text-[#fff6ec] font-bold shadow-[0_0_15px_rgba(232,0,45,0.3)]'
                              : 'bg-white/5 text-[#cfc8ba] hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-[#8a8172] uppercase">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Elena Rostova"
                        className={`w-full px-4 py-3 rounded-xl bg-[#0b0908] border text-xs sm:text-sm text-[#f7f3eb] focus:outline-none focus:border-[#e8002d] ${
                          formErrors.name ? 'border-red-500' : 'border-white/15'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[10px] text-red-400 font-mono">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-[#8a8172] uppercase">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#0b0908] border text-xs sm:text-sm text-[#f7f3eb] focus:outline-none focus:border-[#e8002d] ${
                          formErrors.email ? 'border-red-500' : 'border-white/15'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[10px] text-red-400 font-mono">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-[#8a8172] uppercase">
                      COMPANY / VENTURE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Maison Global Group"
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0908] border border-white/15 text-xs sm:text-sm text-[#f7f3eb] focus:outline-none focus:border-[#e8002d]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-[#8a8172] uppercase">
                      PROJECT BRIEF &amp; OBJECTIVES *
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe what you want to build, existing bottlenecks, and desired timeline..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#0b0908] border text-xs sm:text-sm text-[#f7f3eb] focus:outline-none focus:border-[#e8002d] ${
                        formErrors.message ? 'border-red-500' : 'border-white/15'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[10px] text-red-400 font-mono">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,0,45,0.5)] flex items-center justify-center gap-3 disabled:opacity-50"
                      data-cursor="hover"
                    >
                      {isSubmitting ? (
                        <span>TRANSMITTING INQUIRY...</span>
                      ) : (
                        <>
                          <span>SEND PROJECT INQUIRY</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8a8172] pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#e8002d]" />
                      STRICT NDA &amp; ZERO-DATA RETENTION
                    </span>
                    <span>RESPONSE TIME: &lt; 24 HOURS</span>
                  </div>
                </form>
              )}
          </div>

          {/* Right Column: Studio Locations, Direct Email & Calendar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Direct Email Card */}
            <div className="p-6 rounded-3xl glass-panel border border-white/15 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>DIRECT INQUIRIES</span>
              </div>
              <div className="font-display text-xl text-[#f7f3eb] font-bold">
                hello@valliancestudio.com
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#cfc8ba] hover:text-[#f7f3eb] border border-white/10 flex items-center justify-center gap-2 transition-all"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#e8002d]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL ADDRESS'}</span>
              </button>
            </div>



            {/* Direct Calendar Booking Banner */}
            <div className="p-6 rounded-3xl bg-[#e8002d]/5 border border-[#e8002d]/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d]">
                <Calendar className="w-4 h-4" />
                <span>EXECUTIVE ARCHITECT CALL</span>
              </div>
              <p className="text-xs text-[#cfc8ba] leading-relaxed">
                Prefer an immediate 20-minute strategic consultation? Book directly with our Partner &amp; Lead AI Architect.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  sound.playClick(700);
                  const nameEl = document.querySelector<HTMLInputElement>('input[placeholder="Elena Rostova"]');
                  nameEl?.focus();
                  nameEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#e8002d] hover:text-[#f7f3eb] transition-colors"
              >
                <span>OPEN SPRINT CALENDAR</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
