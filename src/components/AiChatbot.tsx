import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Terminal,
  User,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { sound } from '../utils/audio';
import { useMarket, Market, MARKETS, getCanonicalPriceRecord } from '../utils/geoPricing';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: () => void }[];
  recommendation?: {
    serviceId: string;
    serviceName: string;
    startingPrice: string;
    maintenance: string;
    budget: string;
    brief: string;
  };
}

export const AiChatbot: React.FC = () => {
  const { market, currencySymbol, currencyCode } = useMarket();
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  const getInitialMessages = (): Message[] => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello, I'm the Valliance Studio AI Advisor. I help founders across the ${MARKETS[market].countryName} identify the right digital architecture, estimate timelines, and recommend fixed-scope packages in ${currencyCode} (${currencySymbol}).`,
    },
    {
      id: 'welcome-2',
      sender: 'bot',
      text: `What primary digital capability are you looking to engineer?`,
      options: [
        {
          label: 'Polished Business Website (Up to 5 Pages)',
          action: () => handleSelectOption('essential'),
        },
        {
          label: 'High-Impact Brand Flagship with Motion (Up to 8 Pages)',
          action: () => handleSelectOption('signature'),
        },
        {
          label: 'Cinematic Interactive Digital Experience',
          action: () => handleSelectOption('digital_experience'),
        },
        {
          label: 'Custom Storefront / Headless E-Commerce',
          action: () => handleSelectOption('custom_ecommerce'),
        },
        {
          label: 'AI Chatbot or Workflow Automation',
          action: () => handleSelectOption('automation'),
        },
      ],
    },
  ];

  const [messages, setMessages] = useState<Message[]>(getInitialMessages);

  // Reset or adjust if market changes
  useEffect(() => {
    if (!hasInteracted) {
      setMessages(getInitialMessages());
    }
  }, [market]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSelectOption = (key: string) => {
    sound.playClick(600);
    setHasInteracted(true);

    if (key === 'essential') {
      const price = getCanonicalPriceRecord('essential', market);
      addUserMessage('I need a clean, polished business website (up to 5 pages).');
      triggerBotReply(
        `For lean brands needing rapid deployment with sub-second performance, our **Essential Website** package is ideal.`,
        {
          serviceId: 'essential',
          serviceName: 'Essential Website',
          startingPrice: price.startingPrice,
          maintenance: price.mandatoryMaintenance,
          budget: `${price.startingPrice} – ${currencySymbol}${(750 * 1.5).toFixed(0)}`,
          brief: 'Client needs an Essential Website (up to 5 pages) with rapid turnaround and responsive design.',
        }
      );
    } else if (key === 'signature') {
      const price = getCanonicalPriceRecord('signature', market);
      addUserMessage('I need a high-impact brand flagship with custom visual identity and tasteful motion.');
      triggerBotReply(
        `Our **Signature Website** is our most popular flagship tier for authority and customer conversion. It includes bespoke UI/UX art direction, up to 8 pages, micro-interactions, CRM integration, and technical SEO.`,
        {
          serviceId: 'signature',
          serviceName: 'Signature Website',
          startingPrice: price.startingPrice,
          maintenance: price.mandatoryMaintenance,
          budget: `${price.startingPrice} – ${currencySymbol}${(1500 * 1.8).toFixed(0)}`,
          brief: 'Client needs a Signature Website with bespoke art direction, conversion optimization, and tasteful motion choreography.',
        }
      );
    } else if (key === 'digital_experience') {
      const price = getCanonicalPriceRecord('digital_experience', market);
      addUserMessage('I need a cinematic, multi-page digital experience with deep interactive motion.');
      triggerBotReply(
        `For ambitious brands that demand WebGL/hardware-accelerated animations and multi-page storytelling, we recommend our **Digital Experience** package.`,
        {
          serviceId: 'digital_experience',
          serviceName: 'Digital Experience',
          startingPrice: price.startingPrice,
          maintenance: price.mandatoryMaintenance,
          budget: `${price.startingPrice} – ${currencySymbol}${(2000 * 1.8).toFixed(0)}`,
          brief: 'Client seeks a high-fidelity Digital Experience with bespoke UI/UX and complex interactive choreography.',
        }
      );
    } else if (key === 'custom_ecommerce') {
      const price = getCanonicalPriceRecord('custom', market);
      addUserMessage('I want to sell products online with custom checkout and product storytelling.');
      triggerBotReply(
        `Every e-commerce brand has unique SKU catalogs, checkout ergonomics, and inventory requirements. We engineer e-commerce builds through our **Custom Website** option with Shopify or headless Stripe integration.`,
        {
          serviceId: 'custom',
          serviceName: 'Custom Website (Ecommerce)',
          startingPrice: 'Custom quote',
          maintenance: price.mandatoryMaintenance,
          budget: market === 'UK' ? '£2,400 – £4,000+' : '$3,000 – $5,000+',
          brief: 'Client is planning an e-commerce storefront with custom product browsing and secure payment integration.',
        }
      );
    } else if (key === 'automation') {
      const price = getCanonicalPriceRecord('ai_chatbot', market);
      addUserMessage('I want to explore AI Chatbots and automated business workflows.');
      triggerBotReply(
        `We build 24/7 AI customer assistance and automated CRM lead pipelines starting at **${currencySymbol}500** setup (or **£400** setup in the UK).`,
        {
          serviceId: 'ai_chatbot',
          serviceName: 'AI Website Chatbot',
          startingPrice: price.startingPrice,
          maintenance: price.mandatoryMaintenance,
          budget: `${price.startingPrice} – ${currencySymbol}1,500`,
          brief: 'Client is interested in deploying an AI Website Chatbot or business workflow automation.',
        }
      );
    }
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text,
      },
    ]);
  };

  const triggerBotReply = (
    text: string,
    recommendation?: Message['recommendation'],
    options?: Message['options']
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      sound.playChime();
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text,
          recommendation,
          options,
        },
      ]);
    }, 700);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const query = inputMessage.trim().toLowerCase();
    addUserMessage(inputMessage);
    setInputMessage('');
    setHasInteracted(true);

    if (query.includes('price') || query.includes('cost') || query.includes('how much')) {
      triggerBotReply(
        `In ${MARKETS[market].countryName}, our websites start from ${currencySymbol}750 (${currencySymbol}600 in the UK) for Essential, ${currencySymbol}1,500 (${currencySymbol}1,200 in the UK) for Signature, and ${currencySymbol}2,000 (${currencySymbol}1,600 in the UK) for Digital Experience. All production projects also include our flat mandatory care plan (${currencySymbol}${market === 'UK' ? 40 : 50}/month).`
      );
    } else if (query.includes('care') || query.includes('maintenance')) {
      triggerBotReply(
        `Our monthly maintenance is exactly ${currencySymbol}${market === 'UK' ? 40 : 50}/month. It is mandatory for every production project and is billed monthly after launch to guarantee continuous security patches, daily backups, and sub-second performance.`
      );
    } else if (query.includes('ecommerce') || query.includes('shop') || query.includes('store')) {
      handleSelectOption('custom_ecommerce');
    } else {
      triggerBotReply(
        `Thank you for sharing your goals. Based on your project scope, our lead partner can craft a tailored fixed-price proposal. Would you like to pre-fill our project inquiry form?`,
        {
          serviceId: 'signature',
          serviceName: 'Signature Website',
          startingPrice: getCanonicalPriceRecord('signature', market).startingPrice,
          maintenance: getCanonicalPriceRecord('signature', market).mandatoryMaintenance,
          budget: market === 'UK' ? '£1,200 – £2,400' : '$1,500 – $3,000',
          brief: inputMessage,
        }
      );
    }
  };

  const applyRecommendationToForm = (rec: NonNullable<Message['recommendation']>) => {
    sound.playClick(800);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('setInquiryPreset', {
          detail: {
            serviceId: rec.serviceId,
            service: rec.serviceName,
            budget: rec.budget,
            market,
            brief: rec.brief,
          },
        })
      );

      // Smooth scroll to contact form
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo('#contact', { offset: -40 });
      } else {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const resetChat = () => {
    sound.playClick(600);
    setHasInteracted(false);
    setMessages(getInitialMessages());
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => {
              sound.playClick(800);
              setIsOpen(true);
            }}
            className="btn-tactile group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#121316] hover:bg-[#1a1c22] text-[#f7f3eb] border border-white/20 shadow-2xl hover:border-[#e8002d]/60 transition-all duration-300"
            aria-label="Open AI Project Advisor"
          >
            <div className="w-7 h-7 rounded-full bg-[#e8002d] flex items-center justify-center text-white shadow-[0_0_12px_rgba(232,0,45,0.6)]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Project Advisor // AI
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </button>
        )}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[580px] rounded-3xl bg-[#0f1013] border border-white/20 shadow-2xl flex flex-col overflow-hidden animate-fadeIn"
        >
          {/* Header */}
          <div className="p-4 px-5 bg-[#14151a] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e8002d]/15 border border-[#e8002d]/40 flex items-center justify-center text-[#e8002d]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-display font-bold text-sm text-[#f7f3eb] uppercase tracking-tight">
                  <span>Valliance Lead Advisor</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-[#a79e8f]">
                    {currencyCode}
                  </span>
                </div>
                <div className="text-[10.5px] font-mono text-[#8a8172] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online • Instant Scope Consultation</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Reset Conversation"
                className="btn-tactile p-1.5 rounded-full text-[#8a8172] hover:text-[#f7f3eb] hover:bg-white/5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  sound.playClick(500);
                  setIsOpen(false);
                }}
                className="btn-tactile p-1.5 rounded-full text-[#8a8172] hover:text-[#f7f3eb] hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs scrollbar-thin">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed ${
                      isBot
                        ? 'bg-[#18191f] text-[#f7f3eb] border border-white/10'
                        : 'bg-[#e8002d] text-[#fff6ec] font-medium'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Recommendation Card */}
                    {msg.recommendation && (
                      <div className="mt-3 p-3.5 rounded-xl bg-black/40 border border-[#e8002d]/40 space-y-2.5 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5 text-[#e8002d] font-bold uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Recommended Tier: {msg.recommendation.serviceName}</span>
                        </div>
                        <div className="space-y-1 text-[#cfc8ba]">
                          <div className="flex justify-between border-b border-white/10 pb-1">
                            <span>Starting Price:</span>
                            <span className="text-[#f7f3eb] font-bold">
                              {msg.recommendation.startingPrice}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-1">
                            <span>Mandatory Care:</span>
                            <span className="text-[#e8002d] font-bold">
                              {msg.recommendation.maintenance}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Estimated Budget:</span>
                            <span className="text-[#f7f3eb]">{msg.recommendation.budget}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => applyRecommendationToForm(msg.recommendation!)}
                          className="btn-tactile w-full mt-2 py-2.5 px-3 rounded-lg bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-bold uppercase tracking-wider text-[10.5px] flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(232,0,45,0.4)]"
                        >
                          <span>Fill Inquiry Form With This Plan</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Interactive Quick-Reply Options */}
                  {msg.options && (
                    <div className="mt-2.5 flex flex-col gap-1.5 w-full max-w-[92%]">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={opt.action}
                          className="btn-tactile text-left p-2.5 rounded-xl bg-[#131418] hover:bg-[#1a1c22] border border-white/10 hover:border-[#e8002d]/50 text-[#cfc8ba] hover:text-[#f7f3eb] transition-all flex items-center justify-between text-[11.5px]"
                        >
                          <span>{opt.label}</span>
                          <ArrowRight className="w-3 h-3 text-[#e8002d] shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-[#18191f] text-[#8a8172] w-20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8002d] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8002d] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8002d] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleCustomSend}
            className="p-3 bg-[#14151a] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about packages, timelines, maintenance..."
              className="flex-1 p-2.5 px-3 rounded-xl bg-white/5 border border-white/15 text-xs text-[#f7f3eb] placeholder-[#6d665b] focus:border-[#e8002d] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="btn-tactile p-2.5 rounded-xl bg-[#e8002d] text-white hover:bg-[#ff2a44] disabled:opacity-40 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
