import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, Cpu, Sparkles, Code, Database, MessageSquare } from "lucide-react";
import { ThreeCanvas } from "./ThreeCanvas";

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalBoxRef = useRef<HTMLDivElement>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const logLines = [
    "~$ nexora init workflow_process_prod",
    "✔ Local environment initialized [v2.0.4]",
    "⚙ Registering Webhook trigger (support_inbox)",
    "⚙ Loading AI Agent node: intent_analyzer...",
    "⚡ GPT-4o analyzing incoming support email payload",
    "✔ Intent classified: URGENT_BILLING (99.2% confidence)",
    "⚙ Route conditions evaluated (high_priority = true)",
    "⚡ Executing Code Block: sanitize_payload.js",
    "✔ Sanitization finished in 12ms",
    "⚙ Dispatching Slack alert notify_billing_desk",
    "✔ Slack message delivered successfully",
    "⚙ Dispatching reply trigger via Sendgrid",
    "✔ Auto-response draft email dispatched",
    "✔ Workflow workflow_process_prod executed in 34ms",
    "~$ nexora monitoring --live"
  ];

  const titleWords = "Build Intelligent AI Workflows Without Complex Code".split(" ");

  useEffect(() => {
    let currentLineIndex = 0;
    setTerminalLogs([logLines[0]]);

    const interval = setInterval(() => {
      currentLineIndex++;
      if (currentLineIndex < logLines.length) {
        setTerminalLogs((prev) => [...prev, logLines[currentLineIndex]]);
      } else {
        currentLineIndex = 0;
        setTerminalLogs([logLines[0]]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Performance optimized scrolling inside the terminal container only, preventing global page scroll jumps
  useEffect(() => {
    if (terminalBoxRef.current) {
      terminalBoxRef.current.scrollTop = terminalBoxRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-24 flex items-center justify-center overflow-hidden bg-gradient-mesh bg-noise animate-mesh"
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
      } as React.CSSProperties}
    >
      {/* Radial Mouse Spotlight overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),var(--spotlight-color)_0%,transparent_40%)] pointer-events-none transition-all duration-100" />

      {/* Dynamic Glowing background Orbs */}
      <div className="absolute top-[15%] left-[5%] w-[300px] h-[300px] rounded-full bg-forsythia-yellow/5 blur-[110px] pointer-events-none z-0 animate-orb-float-1" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-deep-saffron/5 blur-[130px] pointer-events-none z-0 animate-orb-float-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-nocturnal-expedition/15 blur-[140px] pointer-events-none z-0 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        {/* Left Column: Hero Text & Actions + Live AI Terminal */}
        <div className="lg:col-span-7 text-left flex flex-col items-start">
          {/* Badge Announcement */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-primary bg-bg-secondary/30 text-text-secondary text-xs font-jetbrains mb-8">
            <Sparkles className="w-3.5 h-3.5 text-forsythia-yellow" />
            <span>Next-Gen Workflow Automation</span>
            <span className="w-1 h-1 rounded-full bg-forsythia-yellow"></span>
            <span className="text-forsythia-yellow font-semibold">V2.0 Launched</span>
          </div>

          {/* Large Title with Letter-by-Letter Blur Reveal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 font-jetbrains">
            {titleWords.map((word, wordIdx) => {
              const isHighlight = word === "AI" || word === "Workflows" || word === "Intelligent";
              const previousLettersCount = titleWords
                .slice(0, wordIdx)
                .reduce((acc, w) => acc + w.length, 0);

              return (
                <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                  {word.split("").map((letter, letterIdx) => {
                    const globalIdx = previousLettersCount + letterIdx + wordIdx;
                    return (
                      <span
                        key={letterIdx}
                        className={`inline-block opacity-0 translate-y-2 animate-letter-reveal ${
                          isHighlight
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-forsythia-yellow to-deep-saffron font-extrabold"
                            : "text-text-primary"
                        }`}
                        style={{
                          animationDelay: `${globalIdx * 20}ms`,
                        }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-text-secondary mb-8 max-w-xl leading-relaxed font-inter font-light animate-hero-desc">
            Orchestrate AI agents, data pipelines, and custom services with low-latency node execution. Nexora AI provides the visual environment and enterprise infrastructure you need to automate operations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10 animate-hero-cta">
            <button
              onClick={onCtaClick}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-forsythia-yellow to-deep-saffron text-oceanic-noir font-bold text-base hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(255,200,1,0.25)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              Start Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onCtaClick}
              className="px-8 py-4 rounded-xl border border-border-primary bg-bg-secondary/20 text-text-primary font-semibold text-base hover:border-forsythia-yellow hover:text-forsythia-yellow hover:bg-bg-secondary/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              Book Demo
            </button>
          </div>

          {/* Live AI Terminal Panel */}
          <div className="w-full max-w-xl rounded-xl border border-border-primary bg-black/85 shadow-[0_15px_30px_rgba(0,0,0,0.3)] overflow-hidden animate-hero-terminal">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-nocturnal-expedition/20 border-b border-border-primary">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="font-jetbrains text-[10px] text-text-secondary/40">AI Orchestration Logs</span>
              <div className="w-8" />
            </div>
            {/* Terminal Output */}
            <div
              ref={terminalBoxRef}
              className="p-4 h-44 overflow-y-auto font-jetbrains text-xs text-left flex flex-col gap-1.5 no-scrollbar"
            >
              {terminalLogs.map((log, idx) => {
                const isCmd = log.startsWith("~$");
                const isErr = log.includes("✖");
                const isCheck = log.includes("✔");
                const isYellow = log.includes("⚡") || log.includes("⚙");
                return (
                  <p
                    key={idx}
                    className={`${
                      isCmd
                        ? "text-forsythia-yellow"
                        : isErr
                        ? "text-red-400"
                        : isCheck
                        ? "text-green-400 font-semibold"
                        : isYellow
                        ? "text-deep-saffron"
                        : "text-text-secondary/70"
                    }`}
                  >
                    {log}
                    {idx === terminalLogs.length - 1 && (
                      <span className="animate-cursor-blink ml-1 text-forsythia-yellow">▊</span>
                    )}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Node Connection Diagram with localized ThreeCanvas background */}
        <div className="lg:col-span-5 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center pointer-events-none">
          {/* Node Frame Overlay */}
          <div className="relative w-11/12 h-5/6 rounded-2xl border border-border-primary bg-card-bg backdrop-blur-sm p-6 overflow-hidden shadow-[0_20px_50px_rgba(17,76,90,0.15)] flex flex-col justify-between pointer-events-auto animate-hero-visual">
            {/* 3D particle sphere runs strictly in the background inside this frame */}
            <ThreeCanvas />

            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-10" />

            <div className="relative flex items-center justify-between border-b border-border-primary pb-4 mb-4 z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 font-jetbrains text-xs text-text-secondary/40">nexora-workflow-prod.yaml</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-forsythia-yellow/10 border border-forsythia-yellow/20 text-forsythia-yellow font-jetbrains text-[10px]">
                ACTIVE
              </span>
            </div>

            <div className="relative flex-1 w-full h-full flex flex-col gap-6 justify-center items-center z-20">
              {/* Trigger Node */}
              <div className="absolute top-[10%] left-[5%] w-[150px] p-3 rounded-lg border border-border-primary bg-bg-primary/95 shadow-lg animate-float-slow flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-forsythia-yellow/15 flex items-center justify-center text-forsythia-yellow shrink-0">
                  <Code className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[10px] font-jetbrains text-text-secondary/40">TRIGGER</p>
                  <p className="text-xs font-semibold text-text-primary truncate">Webhook Recv</p>
                </div>
              </div>

              {/* Central Processing Node */}
              <div className="absolute top-[40%] left-[30%] w-[180px] p-4 rounded-xl border border-forsythia-yellow/20 bg-bg-primary/95 shadow-[0_0_35px_rgba(255,200,1,0.06)] animate-float-medium flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-forsythia-yellow to-deep-saffron flex items-center justify-center text-oceanic-noir shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[10px] font-jetbrains text-forsythia-yellow">AI AGENT</p>
                  <p className="text-sm font-semibold text-text-primary truncate">GPT-4 Analyst</p>
                </div>
              </div>

              {/* DB Node */}
              <div className="absolute bottom-[10%] left-[8%] w-[140px] p-3 rounded-lg border border-border-primary bg-bg-primary/95 shadow-lg animate-float-fast flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-mystic-mint/15 flex items-center justify-center text-mystic-mint shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[10px] font-jetbrains text-text-secondary/40">STORAGE</p>
                  <p className="text-xs font-semibold text-text-primary truncate">Postgres Save</p>
                </div>
              </div>

              {/* Notify Node */}
              <div className="absolute bottom-[15%] right-[5%] w-[150px] p-3 rounded-lg border border-border-primary bg-bg-primary/95 shadow-lg animate-float-slow flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-deep-saffron/15 flex items-center justify-center text-deep-saffron shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[10px] font-jetbrains text-text-secondary/40">ACTION</p>
                  <p className="text-xs font-semibold text-text-primary truncate">Slack Alert</p>
                </div>
              </div>

              {/* Connecting SVG Path Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                <path d="M 150 100 Q 200 130 220 180" fill="none" stroke="rgba(255, 215, 0, 0.12)" strokeWidth="2" />
                <path d="M 150 100 Q 200 130 220 180" fill="none" stroke="url(#hero-pulse)" strokeWidth="2" className="svg-pulse-line" />

                <path d="M 220 225 Q 180 270 150 310" fill="none" stroke="rgba(196, 213, 207, 0.08)" strokeWidth="2" />

                <path d="M 310 220 Q 350 260 380 300" fill="none" stroke="rgba(255, 163, 0, 0.12)" strokeWidth="2" />
                <path d="M 310 220 Q 350 260 380 300" fill="none" stroke="url(#hero-pulse-saffron)" strokeWidth="2" className="svg-pulse-line" />

                <defs>
                  <linearGradient id="hero-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffd700" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ffd700" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="hero-pulse-saffron" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffa300" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ffa300" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ffa300" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - z-index is set to z-30 to prevent overlap */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-none z-30">
        <span className="text-[10px] font-jetbrains text-text-secondary/40 tracking-wider">SCROLL TO DISCOVER</span>
        <div className="w-5 h-8 rounded-full border border-border-primary p-1 flex justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-forsythia-yellow animate-bounce" />
        </div>
      </div>
    </section>
  );
};
