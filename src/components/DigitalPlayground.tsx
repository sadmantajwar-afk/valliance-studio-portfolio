import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Globe,
  Bot,
  GitBranch,
  Play,
  RotateCcw,
  Sparkles,
  Cpu,
  CheckCircle2,
  Volume2,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/audio';

export const DigitalPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'website' | 'ai-agent' | 'automation'>('website');

  // Website Sandbox State
  const [themeMode, setThemeMode] = useState<'crimson' | 'ink' | 'cream'>('crimson');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [cartCount, setCartCount] = useState<number>(1);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);

  // AI Agent Sandbox State
  const [selectedNode, setSelectedNode] = useState<string>('vector-rag');
  const [aiQuery, setAiQuery] = useState<string>('Analyze VIP customer cohort for Tokyo Atelier flagship');
  const [isAgentExecuting, setIsAgentExecuting] = useState<boolean>(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    'System standby: Ready for multi-turn contextual inference...',
    'Vector memory loaded: 142,000 indexed luxury product embeddings'
  ]);

  // Automation Sandbox State
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);

  // Waveform canvas
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let x = 0; x < width; x++) {
        const freq = activeTab === 'ai-agent' ? 0.08 : activeTab === 'automation' ? 0.04 : 0.03;
        const amp = activeTab === 'ai-agent' ? 18 : 10;
        const y = centerY + Math.sin(x * freq + time) * amp * Math.sin(x * 0.01 + time * 0.5);
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = activeTab === 'ai-agent' ? '#e8002d' : 'rgba(232, 0, 45, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      time += 0.08;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  // Execute AI Agent Simulation
  const handleExecuteAIAgent = () => {
    if (isAgentExecuting) return;
    setIsAgentExecuting(true);
    sound.playAIPulse();

    setAgentLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Query received: "${aiQuery}"`,
      `[${new Date().toLocaleTimeString()}] Routing through Neural Intent Classifier (Status: Verified)`,
      ...prev
    ]);

    setTimeout(() => {
      sound.playClick(600);
      setAgentLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Vector RAG retrieved 42 semantic matches from Pinecone DB (Status: Verified)`,
        ...prev
      ]);
    }, 600);

    setTimeout(() => {
      sound.playChime();
      setIsAgentExecuting(false);
      setAgentLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Autonomous Action: Dispatched VIP personalized lookbook & allocated concierge slot in Tokyo.`,
        ...prev
      ]);
    }, 1400);
  };

  // Execute Automation Pipeline Simulation
  const handleRunPipeline = () => {
    if (pipelineState === 'running') return;
    setPipelineState('running');
    setCurrentStep(1);
    sound.playClick(500);
    setPipelineLogs([`[0.0s] Trigger: Stripe VIP Checkout Event Captured ($12,450.00 USD)`]);

    setTimeout(() => {
      setCurrentStep(2);
      sound.playClick(650);
      setPipelineLogs((prev) => [
        `[0.4s] Action 1: Neural Document Extractor generated tax compliance invoice & encrypted receipt`,
        ...prev
      ]);
    }, 700);

    setTimeout(() => {
      setCurrentStep(3);
      sound.playClick(800);
      setPipelineLogs((prev) => [
        `[0.8s] Action 2: CommerceOS allocated inventory across Tokyo & London bonded vaults`,
        ...prev
      ]);
    }, 1400);

    setTimeout(() => {
      setCurrentStep(4);
      sound.playClick(950);
      setPipelineLogs((prev) => [
        `[1.2s] Action 3: Autonomous VoiceOS triggered VIP phone call confirmation & calendar lock`,
        ...prev
      ]);
    }, 2100);

    setTimeout(() => {
      setCurrentStep(5);
      setPipelineState('completed');
      sound.playChime();
      setPipelineLogs((prev) => [
        `[1.6s] Execution Complete: 4 systems synchronized autonomously with zero manual friction.`,
        ...prev
      ]);
    }, 2800);
  };

  const resetPipeline = () => {
    sound.playClick(400);
    setPipelineState('idle');
    setCurrentStep(0);
    setPipelineLogs([]);
  };

  return (
    <section id="playground" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#080606] border-b border-white/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#e8002d]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>INDEX // 02 — INTERACTIVE DIGITAL PLAYGROUND</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#f7f3eb] uppercase">
              NOT JUST PIXELS. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8002d] to-[#f7f3eb]">
                NOT JUST PROMPTS.
              </span>
            </h2>
          </div>

          <div className="space-y-4 lg:max-w-md">
            <p className="text-sm sm:text-base text-[#cfc8ba] font-sans font-light leading-relaxed">
              Experience how our engineering laboratory merges experimental creative art direction, responsive interface dynamics, and autonomous multi-agent intelligence.
            </p>
          </div>
        </div>

        {/* Tab Controls Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl glass-panel border border-white/15">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick(600);
                setActiveTab('website');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'website'
                  ? 'bg-[#e8002d] text-[#fff6ec] font-bold shadow-[0_0_20px_rgba(232,0,45,0.3)]'
                  : 'text-[#cfc8ba] hover:text-[#f7f3eb] hover:bg-white/5'
              }`}
              data-cursor="hover"
            >
              <Globe className="w-4 h-4" />
              <span>01 — WEBSITE PROTOTYPE</span>
            </button>

            <button
              onClick={() => {
                sound.playClick(700);
                setActiveTab('ai-agent');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'ai-agent'
                  ? 'bg-[#e8002d] text-[#fff6ec] font-bold shadow-[0_0_20px_rgba(232,0,45,0.3)]'
                  : 'text-[#cfc8ba] hover:text-[#f7f3eb] hover:bg-white/5'
              }`}
              data-cursor="hover"
            >
              <Bot className="w-4 h-4" />
              <span>02 — AI NEURAL GRAPH</span>
            </button>

            <button
              onClick={() => {
                sound.playClick(800);
                setActiveTab('automation');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'automation'
                  ? 'bg-[#e8002d] text-[#fff6ec] font-bold shadow-[0_0_20px_rgba(232,0,45,0.3)]'
                  : 'text-[#cfc8ba] hover:text-[#f7f3eb] hover:bg-white/5'
              }`}
              data-cursor="hover"
            >
              <GitBranch className="w-4 h-4" />
              <span>03 — AUTOMATION PIPELINE</span>
            </button>
          </div>

          {/* Right Mode Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 text-xs font-mono text-[#8a8172]">
            <Activity className="w-3.5 h-3.5 text-[#e8002d] animate-pulse" />
            <span>REALTIME SANDBOX ACTIVE</span>
          </div>
        </div>

        {/* Playground Stage Area */}
        <div className="relative min-h-[540px] rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            {/* MODE 1: Interactive Website Prototype */}
            {activeTab === 'website' && (
              <motion.div
                key="website-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Control Toolbars */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-mono">
                  {/* Theme Switcher */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#8a8172]">PALETTE:</span>
                    <button
                      onClick={() => {
                        sound.playClick(400);
                        setThemeMode('crimson');
                      }}
                      className={`px-2.5 py-1 rounded-md ${
                        themeMode === 'crimson' ? 'bg-[#e8002d] text-[#fff6ec] font-bold' : 'bg-white/5 text-[#cfc8ba]'
                      }`}
                    >
                      BRAND CRIMSON
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick(400);
                        setThemeMode('ink');
                      }}
                      className={`px-2.5 py-1 rounded-md ${
                        themeMode === 'ink' ? 'bg-white/20 text-[#f7f3eb] font-bold' : 'bg-white/5 text-[#cfc8ba]'
                      }`}
                    >
                      DEEP INK
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick(400);
                        setThemeMode('cream');
                      }}
                      className={`px-2.5 py-1 rounded-md ${
                        themeMode === 'cream' ? 'bg-[#f3ebdd] text-[#0b0908] font-bold' : 'bg-white/5 text-[#cfc8ba]'
                      }`}
                    >
                      LOGO CREAM
                    </button>
                  </div>

                  {/* Viewport Resizer */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#8a8172]">VIEWPORT:</span>
                    <button
                      onClick={() => setViewportMode('desktop')}
                      className={`p-1.5 rounded ${viewportMode === 'desktop' ? 'text-[#e8002d]' : 'text-[#8a8172]'}`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewportMode('tablet')}
                      className={`p-1.5 rounded ${viewportMode === 'tablet' ? 'text-[#e8002d]' : 'text-[#8a8172]'}`}
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewportMode('mobile')}
                      className={`p-1.5 rounded ${viewportMode === 'mobile' ? 'text-[#e8002d]' : 'text-[#8a8172]'}`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>

                    <span className="text-[#8a8172] ml-2">|</span>
                    <button
                      onClick={() => setIsWireframe(!isWireframe)}
                      className={`ml-2 px-2 py-1 rounded border ${
                        isWireframe ? 'border-[#e8002d] text-[#e8002d]' : 'border-white/10 text-[#8a8172]'
                      }`}
                    >
                      {isWireframe ? 'WIREFRAME: ON' : 'WIREFRAME: OFF'}
                    </button>
                  </div>
                </div>

                {/* Floating Mockup Stage */}
                <div className="flex justify-center py-4">
                  <div
                    className={`transition-all duration-500 rounded-2xl border ${
                      isWireframe
                        ? 'border-dashed border-[#e8002d]/60 bg-transparent'
                        : themeMode === 'cream'
                        ? 'border-black/15 bg-[#f3ebdd] text-[#0b0908]'
                        : themeMode === 'ink'
                        ? 'border-white/20 bg-[#060505] text-[#f7f3eb]'
                        : 'border-white/15 bg-[#0e0e14] text-[#f7f3eb]'
                    } ${
                      viewportMode === 'desktop'
                        ? 'w-full max-w-4xl'
                        : viewportMode === 'tablet'
                        ? 'w-full max-w-xl'
                        : 'w-full max-w-sm'
                    } overflow-hidden shadow-2xl p-4 sm:p-6`}
                  >
                    {/* Mockup Browser Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="ml-2 font-mono text-[10px] text-[#8a8172]">
                          https://atelier-paris.valliance.studio/runway/2026
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#e8002d]">
                          BAG ({cartCount})
                        </span>
                      </div>
                    </div>

                    {/* Mockup Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-4">
                        <span className="font-mono text-[11px] text-[#e8002d] uppercase tracking-wider">
                          HAUTE COUTURE FW26
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#f7f3eb] uppercase tracking-tight">
                          MONOLITH SILK COAT
                        </h3>
                        <p className="text-xs text-[#cfc8ba] leading-relaxed">
                          Sculpted architectural wool with Japanese liquid metallic fibers. Hand-tailored in Paris with kinetic ergonomic seams.
                        </p>
                        <div className="font-display text-xl text-[#f7f3eb] font-bold">
                          $4,850.00 USD
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            onClick={() => {
                              sound.playChime();
                              setCartCount((c) => c + 1);
                            }}
                            className="px-5 py-2.5 bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono text-xs font-bold uppercase rounded-lg transition-all"
                          >
                            + ADD TO RUNWAY BAG
                          </button>
                          <span className="text-[10px] font-mono text-[#8a8172]">
                            1-CLICK EXPRESS READY
                          </span>
                        </div>
                      </div>

                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group">
                        <img
                          src="https://images.pexels.com/photos/18889257/pexels-photo-18889257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200"
                          alt="Fashion Prototype"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#e8002d]">
                          8K SHADER ACTIVE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MODE 2: AI Neural Node Network */}
            {activeTab === 'ai-agent' && (
              <motion.div
                key="ai-agent-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Node Graph Selector Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'intent', label: 'Intent Classifier', status: 'Active Verified', icon: Sparkles },
                    { id: 'vector-rag', label: 'Vector RAG Memory', status: '142k Vectors', icon: Cpu },
                    { id: 'sentiment', label: 'Sentiment Monitor', status: 'Realtime HUD', icon: Activity },
                    { id: 'dispatch', label: 'Action Dispatcher', status: 'Instant Sync', icon: Zap }
                  ].map((node) => {
                    const Icon = node.icon;
                    return (
                      <button
                        key={node.id}
                        onClick={() => {
                          sound.playClick(600);
                          setSelectedNode(node.id);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          selectedNode === node.id
                            ? 'bg-[#e8002d]/10 border-[#e8002d] text-[#f7f3eb]'
                            : 'bg-white/5 border-white/10 text-[#cfc8ba] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Icon className={`w-4 h-4 ${selectedNode === node.id ? 'text-[#e8002d]' : 'text-[#8a8172]'}`} />
                          <span className="text-[10px] font-mono text-[#e8002d]">{node.status}</span>
                        </div>
                        <div className="font-mono text-xs font-bold">{node.label}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Query Input Sandbox */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8a8172]">
                    <span>PROMPT INFERENCE SIMULATOR:</span>
                    <span className="text-[#e8002d]">AGENT ENGINE: VALLIANCE-LLM-v4</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Type an enterprise AI agent request..."
                      className="flex-1 px-4 py-2.5 rounded-lg bg-[#0b0908] border border-white/15 text-xs font-mono text-[#f7f3eb] focus:outline-none focus:border-[#e8002d]"
                    />
                    <button
                      onClick={handleExecuteAIAgent}
                      disabled={isAgentExecuting}
                      className="px-5 py-2.5 bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono font-bold text-xs uppercase rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isAgentExecuting ? (
                        <Activity className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                      <span>{isAgentExecuting ? 'INFERRING...' : 'EXECUTE'}</span>
                    </button>
                  </div>
                </div>

                {/* Telemetry Log Terminal */}
                <div className="p-4 rounded-xl bg-[#0b0908] border border-white/10 font-mono text-xs space-y-2 max-h-48 overflow-y-auto">
                  <div className="flex items-center gap-2 text-[#8a8172] pb-2 border-b border-white/5">
                    <Terminal className="w-3.5 h-3.5 text-[#e8002d]" />
                    <span>LIVE INFERENCE LOGS // WEBSOCKET STREAM</span>
                  </div>
                  {agentLogs.map((log, i) => (
                    <div key={i} className="text-[#cfc8ba] flex items-start gap-2">
                      <span className="text-[#e8002d]">›</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* MODE 3: Enterprise Automation Pipeline */}
            {activeTab === 'automation' && (
              <motion.div
                key="automation-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Visual Pipeline Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {[
                    { step: 1, title: 'VIP Stripe Event', desc: '$12,450 Checkout' },
                    { step: 2, title: 'Neural Invoice', desc: 'Auto Tax Compliance' },
                    { step: 3, title: 'Vault Allocation', desc: 'Tokyo & London Sync' },
                    { step: 4, title: 'VoiceOS Dispatch', desc: 'VIP Call Confirmation' }
                  ].map((s) => (
                    <div
                      key={s.step}
                      className={`p-4 rounded-xl border transition-all ${
                        currentStep >= s.step
                          ? 'bg-[#e8002d]/10 border-[#e8002d] text-[#f7f3eb]'
                          : 'bg-white/5 border-white/10 text-[#8a8172]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-[#e8002d]">STEP 0{s.step}</span>
                        {currentStep >= s.step && (
                          <CheckCircle2 className="w-4 h-4 text-[#e8002d]" />
                        )}
                      </div>
                      <div className="font-display text-sm font-bold">{s.title}</div>
                      <div className="font-mono text-[10px] text-[#cfc8ba]">{s.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Trigger Controller Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRunPipeline}
                      disabled={pipelineState === 'running'}
                      className="px-6 py-2.5 bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{pipelineState === 'running' ? 'PROCESSING...' : 'SIMULATE PIPELINE'}</span>
                    </button>

                    <button
                      onClick={resetPipeline}
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#cfc8ba] hover:text-[#f7f3eb] border border-white/10"
                      title="Reset Pipeline"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs font-mono text-[#cfc8ba]">
                    STATUS:{' '}
                    <span className="text-[#e8002d] font-bold">
                      {pipelineState === 'idle'
                        ? 'STANDBY'
                        : pipelineState === 'running'
                        ? `EXECUTING STEP 0${currentStep} / 04`
                        : 'ALL SYSTEMS SYNCHRONIZED'}
                    </span>
                  </div>
                </div>

                {/* Pipeline Logs Output */}
                <div className="p-4 rounded-xl bg-[#0b0908] border border-white/10 font-mono text-xs space-y-2 max-h-40 overflow-y-auto">
                  <div className="flex items-center gap-2 text-[#8a8172] pb-2 border-b border-white/5">
                    <Zap className="w-3.5 h-3.5 text-[#e8002d]" />
                    <span>ORCHESTRATION PIPELINE LOGS</span>
                  </div>
                  {pipelineLogs.length === 0 ? (
                    <div className="text-[#8a8172] italic">
                      Click "SIMULATE PIPELINE" to trigger real-time multi-agent data orchestration...
                    </div>
                  ) : (
                    pipelineLogs.map((log, i) => (
                      <div key={i} className="text-[#cfc8ba] flex items-start gap-2">
                        <span className="text-[#e8002d]">✓</span>
                        <span>{log}</span>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Waveform & Telemetry HUD */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-[#e8002d]" />
              <canvas
                ref={waveCanvasRef}
                width={160}
                height={30}
                className="w-40 h-8 opacity-80"
              />
              <span className="text-[10px] font-mono text-[#8a8172] hidden sm:inline">
                ACOUSTIC HUD FREQUENCY
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-[#8a8172]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e8002d]" />
              <span>VALLIANCE LABS ENGINE // INTERACTIVE SANDBOX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
