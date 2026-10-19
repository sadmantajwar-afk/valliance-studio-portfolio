import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Send,
  Terminal,
  UtensilsCrossed,
  ShoppingBag,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Cpu,
  RefreshCw,
  User,
  ShieldAlert
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionPayload?: {
    type: 'booking' | 'product' | 'lead' | 'tour';
    details: string;
    cta: string;
  };
}

interface Scenario {
  id: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  systemPrompt: string;
  initialMessages: Message[];
  suggestedReplies: string[];
  replyBank: Record<string, { text: string; actionPayload?: Message['actionPayload'] }>;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'restaurant',
    title: 'Table No. 9 Concierge',
    badge: 'GASTRONOMY BOOKING',
    icon: UtensilsCrossed,
    description: 'Autonomous reservation handling, wine pairing consultation, and dietary routing.',
    systemPrompt: 'Role: Two-Michelin-Star Concierge for Table No. 9 Tokyo.',
    initialMessages: [
      {
        id: '1',
        sender: 'ai',
        text: 'Konbanwa. Welcome to Table No. 9 Tokyo. I am your autonomous culinary concierge. Would you like to reserve our 12-Course Omakase, inspect the sommelier pairing, or book a private dining room for this Friday?',
        timestamp: '19:00',
      }
    ],
    suggestedReplies: [
      'Reserve 2 guests for Friday at 8:00 PM',
      'Tell me about the Sommelier Wine Pairing',
      'Are there vegan omakase options available?'
    ],
    replyBank: {
      'Reserve 2 guests for Friday at 8:00 PM': {
        text: 'I have secured a Chef’s Counter table for 2 guests on Friday at 20:00 JST. Our head sommelier will prepare the seasonal pairing. Would you like me to send instant SMS confirmation?',
        actionPayload: {
          type: 'booking',
          details: 'Table for 2 · Friday 20:00 JST · Chef Counter',
          cta: 'CONFIRM RESERVATION'
        }
      },
      'Tell me about the Sommelier Wine Pairing': {
        text: 'Our Master Sommelier features 6 biodynamic natural vintages paired with Hokkaido uni, charcoal wagyu, and smoked white asparagus. Non-alcoholic botanical tea pairings are also curated daily.'
      },
      'Are there vegan omakase options available?': {
        text: 'Yes. Chef Kenzo crafts a dedicated Shojin-Ryori modern botanical tasting menu with 48 hours notice. I have flagged your guest profile accordingly.'
      }
    }
  },
  {
    id: 'fashion',
    title: 'Atelier AI Stylist',
    badge: 'LUXURY COMMERCE',
    icon: ShoppingBag,
    description: 'Bespoke styling recommendations, haute-couture sizing advisory, and checkout generation.',
    systemPrompt: 'Role: Senior Fashion Stylist for Atelier Paris.',
    initialMessages: [
      {
        id: '1',
        sender: 'ai',
        text: 'Bonjour. I am the Atelier Paris autonomous stylist. How may I assist your wardrobe selection for the Autumn/Winter 2026 collection?',
        timestamp: '14:20',
      }
    ],
    suggestedReplies: [
      'Recommend an outfit for Paris Fashion Week Gala',
      'What is the sizing fit for the Monolith Silk Coat?',
      'Check availability of Runway Look 04 in Size 38'
    ],
    replyBank: {
      'Recommend an outfit for Paris Fashion Week Gala': {
        text: 'For the Gala, I recommend pairing our Monolith Silk Sculpted Coat ($4,850) with the Liquid Obsidian Palazzo Trousers and Architectural Silver Cuff. All items are in stock in our Paris flagship.',
        actionPayload: {
          type: 'product',
          details: 'Gala Ensemble: Monolith Coat + Liquid Palazzo · Size 38',
          cta: 'PREPARE VIP PRIVATE FITTING'
        }
      },
      'What is the sizing fit for the Monolith Silk Coat?': {
        text: 'The Monolith Coat features an oversized Japanese architectural cut. If you prefer a tailored silhouette, we recommend sizing down one increment. Our 3D sizing shader can scan your fit in seconds.'
      },
      'Check availability of Runway Look 04 in Size 38': {
        text: 'Only 3 bespoke pieces remaining in our Paris bonded showroom. I can reserve Look 04 under your client passport for the next 24 hours.'
      }
    }
  },
  {
    id: 'lead-qual',
    title: 'B2B Enterprise Growth Agent',
    badge: 'LEAD QUALIFICATION',
    icon: Building2,
    description: 'Instant project scoping, budget qualification ($50k-$250k+), and calendar scheduling.',
    systemPrompt: 'Role: Principal Discovery Architect at Valliance Studio.',
    initialMessages: [
      {
        id: '1',
        sender: 'ai',
        text: 'Welcome to Valliance Studio. I can help evaluate your upcoming digital flagship, AI agent deployment, or automation pipeline. What are you looking to architect?',
        timestamp: '10:05',
      }
    ],
    suggestedReplies: [
      'We need a custom AI Voice Agent for our 50-person sales team',
      'Looking to redesign our luxury e-commerce platform ($75k+ budget)',
      'Can you automate our multi-warehouse ERP operations?'
    ],
    replyBank: {
      'We need a custom AI Voice Agent for our 50-person sales team': {
        text: 'We specialize in real-time VoiceOS agents integrated with Twilio and Salesforce. Typically deployed in 4-6 weeks with automated call resolution. Would you like to schedule an engineering discovery call?',
        actionPayload: {
          type: 'lead',
          details: 'VoiceOS Enterprise Deployment · 50-Seat Architecture',
          cta: 'BOOK ARCHITECT CONSULTATION'
        }
      },
      'Looking to redesign our luxury e-commerce platform ($75k+ budget)': {
        text: 'Our headless Next.js & Shopify Plus flagships deliver category-defining buying experiences. Your $75k+ scope fits our Q3 bespoke sprint cycle perfectly. Let’s lock in your sprint window.'
      },
      'Can you automate our multi-warehouse ERP operations?': {
        text: 'Yes, our CommerceOS autonomous pipelines sync inventory across Shopify, Amazon, and ERPs in real-time, eliminating manual reconciliation.'
      }
    }
  },
  {
    id: 'real-estate',
    title: 'Maison Private Concierge',
    badge: 'ESTATE SCHEDULING',
    icon: CalendarCheck,
    description: 'Discreet off-market villa discovery and private helicopter tour scheduling.',
    systemPrompt: 'Role: Private Client Concierge for Maison Estates.',
    initialMessages: [
      {
        id: '1',
        sender: 'ai',
        text: 'Greetings. I manage private acquisitions for Maison International Estates. Are you seeking contemporary brutalist villas in Kyoto, Lake Como, or the Swiss Alps?',
        timestamp: '16:45',
      }
    ],
    suggestedReplies: [
      'Show me off-market modern villas above $10M',
      'Book a private twilight helicopter viewing for Villa Kyoto',
      'What are the architectural specifications of Monolith Estate?'
    ],
    replyBank: {
      'Show me off-market modern villas above $10M': {
        text: 'I have unlocked 3 confidential off-market architectural estates in Kyoto and Lake Como. All listings feature private security perimeters and subterranean wine galleries.',
        actionPayload: {
          type: 'tour',
          details: 'Encrypted Portfolio Access · 3 Confidential Estates',
          cta: 'DOWNLOAD ENCRYPTED DOSSIER'
        }
      },
      'Book a private twilight helicopter viewing for Villa Kyoto': {
        text: 'Private helipad transfer confirmed for this Saturday at 17:30 JST. Our lead architectural director will host your private tour.'
      },
      'What are the architectural specifications of Monolith Estate?': {
        text: 'Designed by Pritzker-winning architects, Villa Monolith encompasses 14,000 sq ft of poured board-formed concrete, triple-glazed acoustic glass, and solar geothermal systems.'
      }
    }
  }
];

export const AIAssistantDemo: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('restaurant');
  const [messages, setMessages] = useState<Message[]>(SCENARIOS[0].initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [telemetry, setTelemetry] = useState({
    intent: 'Table_Reservation_Query',
    confidence: 'Verified',
    speed: 'Real-time',
    tokenRate: '94 tok/s'
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const currentScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  useEffect(() => {
    setMessages(currentScenario.initialMessages);
    setInputText('');
    setIsTyping(false);
    setTelemetry({
      intent: `${currentScenario.badge.replace(/\s+/g, '_')}_INIT`,
      confidence: 'Verified',
      speed: 'Real-time',
      tokenRate: '88 tok/s'
    });
  }, [activeScenarioId, currentScenario]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    sound.playClick(800);

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Look up response in reply bank or synthesize contextual fallback
    const matched = currentScenario.replyBank[textToSend];
    const replyText = matched
      ? matched.text
      : `I understand your request regarding "${textToSend}". In a live deployment, our model executes context-aware retrieval and dynamic API orchestration. Would you like to test another scenario?`;

    const actionPayload = matched ? matched.actionPayload : undefined;

    setTimeout(() => {
      sound.playAIPulse();
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionPayload,
        }
      ]);
      setTelemetry({
        intent: `${currentScenario.id.toUpperCase()}_INFERRED_ACTION`,
        confidence: 'Verified',
        speed: 'Real-time',
        tokenRate: '98 tok/s'
      });
    }, 850);
  };

  const handleReset = () => {
    sound.playClick(400);
    setMessages(currentScenario.initialMessages);
  };

  return (
    <section id="ai-demo" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b0908] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>INDEX // 04 — MAKE AI TANGIBLE</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#f7f3eb] uppercase">
              YOUR WEBSITE CAN DO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8002d] to-[#f7f3eb]">
                MORE THAN LOOK GOOD.
              </span>
            </h2>
          </div>

          <div className="space-y-4 lg:max-w-md">
            <p className="text-sm sm:text-base text-[#cfc8ba] font-sans font-light leading-relaxed">
              We turn passive brochures into autonomous digital workforces. Test our interactive AI assistant simulation across 4 commercial scenarios.
            </p>
          </div>
        </div>

        {/* Scenario Switcher Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SCENARIOS.map((scen) => {
            const Icon = scen.icon;
            const isSelected = activeScenarioId === scen.id;

            return (
              <button
                key={scen.id}
                onClick={() => {
                  sound.playClick(600);
                  setActiveScenarioId(scen.id);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#e8002d]/10 border-[#e8002d] text-[#f7f3eb] shadow-[0_0_20px_rgba(232,0,45,0.2)]'
                    : 'bg-white/5 border-white/10 text-[#cfc8ba] hover:bg-white/10 hover:border-white/20'
                }`}
                data-cursor="hover"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-[#e8002d]' : 'text-[#8a8172]'}`} />
                  <span className="text-[10px] font-mono text-[#e8002d]">{scen.badge}</span>
                </div>
                <div className="font-display font-bold text-sm text-[#f7f3eb]">{scen.title}</div>
                <div className="text-[11px] text-[#8a8172] line-clamp-1 mt-1">{scen.description}</div>
              </button>
            );
          })}
        </div>

        {/* AI Chatbot Terminal Window */}
        <div className="relative rounded-3xl glass-panel border border-white/15 overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#e8002d] text-[#fff6ec] flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-[#f7f3eb]">
                    {currentScenario.title}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#e8002d] animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-[#8a8172]">
                  {currentScenario.systemPrompt}
                </span>
              </div>
            </div>

            {/* Live Telemetry Pills */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#cfc8ba]">
              <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">
                INTENT: <span className="text-[#e8002d]">{telemetry.intent}</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">
                CONFIDENCE: <span className="text-[#e8002d]">{telemetry.confidence}</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">
                SPEED: <span className="text-[#e8002d]">{telemetry.speed}</span>
              </span>
              <button
                onClick={handleReset}
                className="p-1 rounded bg-white/5 hover:bg-white/15 text-[#8a8172] hover:text-[#f7f3eb]"
                title="Reset Conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Conversation Stream Area */}
          <div
            ref={chatContainerRef}
            className="p-6 space-y-4 min-h-[340px] max-h-[460px] overflow-y-auto bg-[#0b0908]/90 font-sans"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#e8002d] mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 ${
                    msg.sender === 'user'
                      ? 'bg-[#e8002d] text-[#fff6ec] font-medium rounded-tr-none'
                      : 'bg-white/5 border border-white/10 text-[#f7f3eb] rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Embedded Action Card if returned */}
                  {msg.actionPayload && (
                    <div className="p-3.5 rounded-xl bg-black/60 border border-[#e8002d]/40 space-y-2 mt-2">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#e8002d]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>ACTION READY FOR EXECUTION</span>
                      </div>
                      <div className="font-mono text-xs text-[#f7f3eb]">
                        {msg.actionPayload.details}
                      </div>
                      <button
                        onClick={() => sound.playChime()}
                        className="w-full py-2 bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono font-bold text-[10px] uppercase rounded-lg transition-all"
                      >
                        {msg.actionPayload.cta}
                      </button>
                    </div>
                  )}

                  <div
                    className={`text-[9px] font-mono ${
                      msg.sender === 'user' ? 'text-[#0b0908]/70 text-right' : 'text-[#8a8172]'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0 text-[#f7f3eb] mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-xs font-mono text-[#e8002d] p-2"
              >
                <Cpu className="w-4 h-4 animate-spin" />
                <span>Synthesizing response at 94 tok/s...</span>
              </motion.div>
            )}
          </div>

          {/* Quick Reply Pills */}
          <div className="px-6 py-3 bg-white/[0.02] border-t border-white/10 flex flex-wrap gap-2">
            <span className="text-[10px] font-mono text-[#8a8172] flex items-center mr-1">
              SUGGESTED PROMPTS:
            </span>
            {currentScenario.suggestedReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(reply)}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#e8002d] hover:text-[#fff6ec] text-xs font-mono text-[#cfc8ba] transition-all border border-white/10"
                data-cursor="hover"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-4 bg-white/5 border-t border-white/10 flex items-center gap-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${currentScenario.title}... (e.g., book table, inquire, ask questions)`}
              className="flex-1 px-4 py-3 bg-[#0b0908] rounded-xl border border-white/15 text-xs sm:text-sm text-[#f7f3eb] focus:outline-none focus:border-[#e8002d]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="px-5 py-3 bg-[#e8002d] hover:bg-[#ff2a44] disabled:opacity-40 text-[#fff6ec] font-mono font-bold text-xs uppercase rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(232,0,45,0.3)]"
            >
              <span>SEND</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Transparency Disclaimer Footer */}
          <div className="px-6 py-2.5 bg-black border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#8a8172]">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3 text-[#e8002d]" />
              TRANSPARENT STUDIO DEMO · DETERMINISTIC NEURAL SANDBOX
            </span>
            <span className="hidden sm:inline">ZERO TELEMETRY RECORDED</span>
          </div>
        </div>
      </div>
    </section>
  );
};
