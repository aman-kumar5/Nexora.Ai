import React, { useState } from "react";

import {
  Layers,
  Zap,
  Terminal as TermIcon,
  Bot,
  ShieldAlert,
  BarChart3,
  Link,
  Calendar,
  ChevronDown
} from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gridClass: string;
  illustration: React.ReactNode;
}

export const FeatureShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);


  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set cursor spotlight variables
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    // Set 3D tilt variables
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;

    const rx = -(dy / yc) * 8; // Rotate X (max 8 deg)
    const ry = (dx / xc) * 8;  // Rotate Y (max 8 deg)

    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    // Smooth reset
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  const features: FeatureItem[] = [
    {
      id: 0,
      title: "Infinite Visual Canvas",
      description: "Map out complex automated flows with a drag-and-drop builder. Connect triggers, AI nodes, database operations, and notifications seamlessly.",
      icon: Layers,
      gridClass: "lg:col-span-8 md:col-span-2",
      illustration: (
        <div className="relative w-full h-32 bg-black/40 rounded-lg border border-border-primary overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="flex items-center gap-6 z-10">
            <div className="px-3 py-1.5 bg-nocturnal-expedition border border-mystic-mint/20 rounded text-[10px] font-jetbrains text-arctic-powder">
              Start
            </div>
            <div className="w-8 h-px bg-forsythia-yellow relative">
              <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-forsythia-yellow animate-ping" />
            </div>
            <div className="px-3 py-1.5 bg-forsythia-yellow text-oceanic-noir font-bold rounded text-[10px] font-jetbrains">
              Agent Node
            </div>
            <div className="w-8 h-px bg-mystic-mint/30" />
            <div className="px-3 py-1.5 bg-nocturnal-expedition border border-mystic-mint/20 rounded text-[10px] font-jetbrains text-arctic-powder">
              Output
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Autonomous Execution",
      description: "Zero server management. Trigger flows on webhook callbacks, CRON schedules, or on-demand API runs with isolated computing runtimes.",
      icon: Zap,
      gridClass: "lg:col-span-4 md:col-span-1",
      illustration: (
        <div className="w-full h-32 bg-black/40 rounded-lg border border-border-primary p-3 font-jetbrains text-[9px] text-left overflow-hidden flex flex-col gap-1.5">
          <p className="text-forsythia-yellow">~$ nexora exec workflow_3</p>
          <p className="text-text-secondary/70">[12:04.11] ✔ Trigger fired (webhook)</p>
          <p className="text-text-secondary/70">[12:04.12] ⚙ Spin up isolation block</p>
          <p className="text-deep-saffron">[12:04.13] ⚡ Agent analyzing dataset...</p>
          <p className="text-green-400">[12:04.15] ✔ Executed in 40ms</p>
        </div>
      )
    },
    {
      id: 2,
      title: "Production Ready Stack",
      description: "Built for scaling teams. Version control configurations via YAML files, write custom JavaScript code blocks, and sync directly with GitHub.",
      icon: TermIcon,
      gridClass: "lg:col-span-4 md:col-span-1",
      illustration: (
        <div className="w-full h-32 bg-black/40 rounded-lg border border-border-primary p-3 text-left overflow-hidden font-jetbrains text-[10px]">
          <span className="text-deep-saffron">import</span> {"{ AI }"} <span className="text-deep-saffron">from</span> <span className="text-text-secondary">"nexora"</span>;
          <br />
          <span className="text-gray-500">// Run custom JS node</span>
          <br />
          <span className="text-forsythia-yellow">const</span> res = <span className="text-deep-saffron">await</span> AI.run({`{`}
          <br />
          &nbsp;&nbsp;prompt: <span className="text-text-secondary">"Summarize data"</span>
          <br />
          {`})`};
        </div>
      )
    },
    {
      id: 3,
      title: "AI Agents Integration",
      description: "Plug in leading LLMs. Configure memory, persona, and action limits for each agent to let them call APIs and take autonomous decisions.",
      icon: Bot,
      gridClass: "lg:col-span-8 md:col-span-2",
      illustration: (
        <div className="w-full h-32 bg-black/40 rounded-lg border border-border-primary p-3 flex flex-col justify-between text-left">
          <div className="flex items-center justify-between border-b border-mystic-mint/5 pb-2">
            <span className="text-[10px] font-jetbrains text-forsythia-yellow">LLM AGENT CONFIG</span>
            <span className="text-[10px] font-jetbrains text-text-secondary/40">max_tokens: 2048</span>
          </div>
          <div className="flex items-center gap-3 py-1">
            <div className="w-6 h-6 rounded-full bg-deep-saffron flex items-center justify-center text-xs text-oceanic-noir font-bold shrink-0">
              A
            </div>
            <p className="text-[10px] text-text-primary">"Act as a support triage agent. Route billing bugs to engineering."</p>
          </div>
          <div className="flex gap-2 text-[9px] font-jetbrains">
            <span className="px-2 py-0.5 rounded bg-nocturnal-expedition border border-mystic-mint/20 text-mystic-mint">Temperature: 0.2</span>
            <span className="px-2 py-0.5 rounded bg-nocturnal-expedition border border-mystic-mint/20 text-mystic-mint">Model: GPT-4o</span>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Enterprise Security",
      description: "Data encryption at rest and in transit. Standard single sign-on (SSO), granular workspace permissions, and audit logs keeping you secure.",
      icon: ShieldAlert,
      gridClass: "lg:col-span-6 md:col-span-1",
      illustration: (
        <div className="w-full h-32 bg-black/40 rounded-lg border border-border-primary flex flex-col justify-center items-center gap-2">
          <div className="w-12 h-12 rounded-full border border-forsythia-yellow/20 bg-forsythia-yellow/10 flex items-center justify-center text-forsythia-yellow relative">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-jetbrains text-text-secondary/70">AES-256 ENCRYPTION ACTIVE</span>
        </div>
      )
    },
    {
      id: 5,
      title: "Real-time Monitoring",
      description: "Watch runs execute in real-time. Review step-by-step logs, measure latency, track credit usage, and configure instant notifications.",
      icon: BarChart3,
      gridClass: "lg:col-span-6 md:col-span-2",
      illustration: (
        <div className="w-full h-32 bg-black/40 rounded-lg border border-border-primary p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-jetbrains">
            <span className="text-text-secondary/60">WORKFLOW LATENCY (ms)</span>
            <span className="text-forsythia-yellow">AVG: 42ms</span>
          </div>
          <div className="flex items-end gap-1.5 h-16 w-full pt-2">
            {[40, 60, 20, 90, 30, 45, 80, 50, 65, 35, 75, 42].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-deep-saffron to-forsythia-yellow rounded-t-sm transition-all duration-300"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Native Integrations",
      description: "Connect to slack, discord, postgres, airtable, linear, and 100+ integrations natively out of the box with zero OAuth setup.",
      icon: Link,
      gridClass: "lg:col-span-4 md:col-span-1",
      illustration: (
        <div className="w-full h-32 bg-black/40 rounded-lg border border-border-primary p-4 flex flex-wrap gap-2 items-center justify-center">
          {["Slack", "Github", "Discord", "Postgres", "AWS", "Notion"].map((name, i) => (
            <span
              key={i}
              className="text-[10px] font-jetbrains px-2.5 py-1.5 rounded border border-border-primary bg-nocturnal-expedition/30 text-text-secondary hover:border-forsythia-yellow hover:text-forsythia-yellow transition-all duration-200 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      )
    },
    {
      id: 7,
      title: "Smart Scheduling",
      description: "Deploy workflows on customizable cron schedules, rate limit node execution to respect API quotas, and configure automatic retries.",
      icon: Calendar,
      gridClass: "lg:col-span-8 md:col-span-2",
      illustration: (
        <div className="w-full h-32 bg-black/40 rounded-lg border border-border-primary p-3 flex flex-col justify-between text-left">
          <div className="flex justify-between items-center text-[10px] font-jetbrains text-text-secondary/60 border-b border-border-primary pb-2">
            <span>SCHEDULER CONFIG</span>
            <span className="text-deep-saffron">*/15 * * * *</span>
          </div>
          <div className="flex justify-around items-center pt-2">
            {[0, 15, 30, 45].map((minute) => (
              <div key={minute} className="flex flex-col items-center">
                <span className="text-[10px] font-jetbrains text-text-primary">:{minute}</span>
                <span className={`w-2 h-2 rounded-full mt-1 ${minute === 0 ? "bg-forsythia-yellow shadow-[0_0_8px_#FFC801]" : "bg-mystic-mint/20"}`} />
              </div>
            ))}
          </div>
          <p className="text-[9px] font-jetbrains text-text-secondary/40 text-center">Triggers every 15 minutes, 24/7</p>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-bg-primary relative z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-jetbrains text-forsythia-yellow uppercase tracking-widest mb-3">
            FEATURES SHOWCASE
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-4 font-jetbrains">
            Engineered For Scale, Designed For Speed
          </p>
          <p className="text-text-secondary text-base">
            Nexora AI brings visual layout systems together with highly developer-optimized execution pipelines.
          </p>
        </div>

        {/* Desktop Bento Grid with 3D Tilt and cursor spotlight */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeIndex === index;
            return (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className={`${feature.gridClass} bento-card-tilt relative rounded-2xl border flex flex-col justify-between overflow-hidden group cursor-pointer ${
                  isActive
                    ? "border-forsythia-yellow/50 bg-card-bg shadow-[0_15px_30px_rgba(17,76,90,0.15)]"
                    : "border-border-primary bg-nocturnal-expedition/5 hover:border-mystic-mint/30"
                }`}
                style={{
                  transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                  "--mx": "50%",
                  "--my": "50%",
                  "--rx": "0deg",
                  "--ry": "0deg",
                } as React.CSSProperties}
              >
                {/* Mouse-following Radial Spotlight */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(circle 120px at var(--mx) var(--my), var(--spotlight-color) 0%, transparent 100%)"
                  }}
                />

                {/* Subtle top glow */}
                <div
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,200,1,0.04),transparent_60%)] transition-opacity duration-300 pointer-events-none ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative z-10 flex-1 flex flex-col justify-between p-6">
                  {/* Top: Icon & Headline */}
                  <div className="mb-6">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                        isActive
                          ? "bg-forsythia-yellow text-oceanic-noir scale-110"
                          : "bg-nocturnal-expedition text-mystic-mint group-hover:text-forsythia-yellow"
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="font-jetbrains text-lg font-bold text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary/80 font-inter leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Illustration Area */}
                  <div className="mt-4 w-full">{feature.illustration}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden flex flex-col gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isOpen = activeIndex === index;
            return (
              <div
                key={feature.id}
                className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-forsythia-yellow/50 bg-card-bg shadow-lg"
                    : "border-border-primary bg-nocturnal-expedition/10"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        isOpen ? "bg-forsythia-yellow text-oceanic-noir" : "bg-nocturnal-expedition text-mystic-mint"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-jetbrains text-sm font-semibold text-text-primary">
                      {feature.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-forsythia-yellow" : ""
                    }`}
                  />
                </button>

                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1 border-t border-border-primary/5 flex flex-col gap-4">
                      <p className="text-xs text-text-secondary/80 font-inter leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="w-full">{feature.illustration}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
