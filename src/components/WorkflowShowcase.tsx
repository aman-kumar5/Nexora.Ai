import React, { useState, useEffect } from "react";
import { Mail, Bot, Code, Send, HelpCircle, CheckCircle2, Play } from "lucide-react";

interface WorkflowNode {
  id: number;
  label: string;
  type: "trigger" | "agent" | "code" | "notify" | "condition" | "action";
  desc: string;
  icon: React.ComponentType<any>;
  status: "idle" | "running" | "success";
  color: string;
}

export const WorkflowShowcase: React.FC = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: 1, label: "Email Trigger", type: "trigger", desc: "Incoming support email", icon: Mail, status: "success", color: "text-forsythia-yellow border-forsythia-yellow/30" },
    { id: 2, label: "AI Agent", type: "agent", desc: "Analyze intent & draft response", icon: Bot, status: "idle", color: "text-deep-saffron border-deep-saffron/30" },
    { id: 3, label: "Code Block", type: "code", desc: "Sanitize & format drafted text", icon: Code, status: "idle", color: "text-mystic-mint border-mystic-mint/30" },
    { id: 4, label: "Telegram Alert", type: "notify", desc: "Notify team of raw draft", icon: Send, status: "idle", color: "text-text-primary border-border-primary/20" },
    { id: 5, label: "Condition Node", type: "condition", desc: "Check sentiment score", icon: HelpCircle, status: "idle", color: "text-forsythia-yellow border-forsythia-yellow/30" },
    { id: 6, label: "Send Email", type: "action", desc: "Dispatch response to user", icon: CheckCircle2, status: "idle", color: "text-green-400 border-green-400/30" }
  ]);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % (nodes.length + 1);
        
        // Update node statuses dynamically
        setNodes((prevNodes) =>
          prevNodes.map((node, index) => {
            if (next === 0) {
              return { ...node, status: index === 0 ? "success" : "idle" };
            }
            if (index < next - 1) {
              return { ...node, status: "success" };
            }
            if (index === next - 1) {
              return { ...node, status: "running" };
            }
            return { ...node, status: "idle" };
          })
        );
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying, nodes.length]);

  return (
    <section id="workflow" className="py-24 bg-bg-secondary/5 border-t border-border-primary bg-grid-pattern relative z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left max-w-2xl">
            <h2 className="text-xs font-jetbrains text-forsythia-yellow uppercase tracking-widest mb-3">
              LIVE DEMONSTRATION
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-4 font-jetbrains">
              Interactive Workflow Execution
            </p>
            <p className="text-text-secondary text-base font-inter">
              Watch an incoming event process through a multi-stage AI workflow. Check performance logs and live updates at each step.
            </p>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="mt-6 md:mt-0 px-5 py-3 rounded-lg border border-border-primary bg-bg-primary/60 text-xs font-jetbrains text-text-secondary hover:text-forsythia-yellow hover:border-forsythia-yellow transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${isPlaying ? "animate-pulse" : ""}`} />
            {isPlaying ? "PAUSE SIMULATION" : "RESUME SIMULATION"}
          </button>
        </div>

        {/* Desktop Interactive Flow */}
        <div className="hidden lg:block relative min-h-[400px] w-full p-8 rounded-2xl border border-border-primary bg-bg-primary/40 backdrop-blur-sm overflow-hidden">
          {/* Background noise */}
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

          {/* SVG Connection Lines Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="workflow-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFC801" stopOpacity="0" />
                <stop offset="50%" stopColor="#FF9932" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFC801" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Path lines linking the 6 nodes in horizontal zig-zag */}
            <path d="M 130 160 Q 200 120 280 160" fill="none" stroke="var(--border-primary)" strokeWidth="2.5" />
            {activeStep > 1 && (
              <path d="M 130 160 Q 200 120 280 160" fill="none" stroke="url(#workflow-pulse)" strokeWidth="3" className="svg-pulse-line" />
            )}

            <path d="M 380 160 Q 450 200 520 160" fill="none" stroke="var(--border-primary)" strokeWidth="2.5" />
            {activeStep > 2 && (
              <path d="M 380 160 Q 450 200 520 160" fill="none" stroke="url(#workflow-pulse)" strokeWidth="3" className="svg-pulse-line" />
            )}

            <path d="M 620 160 Q 690 120 760 160" fill="none" stroke="var(--border-primary)" strokeWidth="2.5" />
            {activeStep > 3 && (
              <path d="M 620 160 Q 690 120 760 160" fill="none" stroke="url(#workflow-pulse)" strokeWidth="3" className="svg-pulse-line" />
            )}

            <path d="M 860 160 Q 930 200 1000 160" fill="none" stroke="var(--border-primary)" strokeWidth="2.5" />
            {activeStep > 4 && (
              <path d="M 860 160 Q 930 200 1000 160" fill="none" stroke="url(#workflow-pulse)" strokeWidth="3" className="svg-pulse-line" />
            )}

            <path d="M 1100 160 Q 1170 120 1240 160" fill="none" stroke="var(--border-primary)" strokeWidth="2.5" />
            {activeStep > 5 && (
              <path d="M 1100 160 Q 1170 120 1240 160" fill="none" stroke="url(#workflow-pulse)" strokeWidth="3" className="svg-pulse-line" />
            )}
          </svg>

          {/* Nodes Container */}
          <div className="relative z-20 flex justify-between items-center h-full min-h-[300px]">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isRunning = node.status === "running";
              const isSuccess = node.status === "success";

              return (
                <div
                  key={node.id}
                  className={`w-[170px] p-4 rounded-xl border bg-bg-primary/95 transition-all duration-500 relative flex flex-col items-center text-center ${
                    isRunning
                      ? "border-forsythia-yellow shadow-[0_0_25px_rgba(255,200,1,0.15)] scale-105"
                      : isSuccess
                      ? "border-border-primary opacity-90"
                      : "border-border-primary opacity-40 scale-95"
                  }`}
                >
                  {isRunning && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forsythia-yellow opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-forsythia-yellow"></span>
                    </span>
                  )}
                  {isSuccess && (
                    <div className="absolute -top-1.5 -right-1.5 bg-forsythia-yellow text-oceanic-noir rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-nocturnal-expedition" />
                    </div>
                  )}

                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                      isRunning
                        ? "bg-forsythia-yellow text-oceanic-noir"
                        : isSuccess
                        ? "bg-nocturnal-expedition text-mystic-mint"
                        : "bg-nocturnal-expedition/30 text-mystic-mint/40"
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  <span className="font-jetbrains text-xs font-bold text-text-primary mb-1">
                    {node.label}
                  </span>
                  <span className="text-[10px] text-text-secondary/65 font-inter leading-tight">
                    {node.desc}
                  </span>

                  {(isRunning || isSuccess) && (
                    <div className="mt-3 w-full pt-2 border-t border-border-primary flex justify-between items-center font-jetbrains text-[9px] text-text-secondary/40">
                      <span>t+{(index * 0.4).toFixed(1)}s</span>
                      <span className={isRunning ? "text-forsythia-yellow animate-pulse" : "text-green-400"}>
                        {isRunning ? "PROCESSING" : "COMPLETED"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Flow */}
        <div className="lg:hidden flex flex-col gap-8 relative pl-8 border-l border-border-primary py-4 max-w-md mx-auto">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isRunning = node.status === "running";
            const isSuccess = node.status === "success";

            return (
              <div
                key={node.id}
                className={`relative p-4 rounded-xl border bg-bg-primary/95 transition-all duration-300 ${
                  isRunning
                    ? "border-forsythia-yellow shadow-[0_0_20px_rgba(255,200,1,0.1)] translate-x-1"
                    : isSuccess
                    ? "border-border-primary opacity-90"
                    : "border-border-primary opacity-40 scale-95"
                }`}
              >
                <div
                  className={`absolute -left-[38px] top-6 w-4 h-4 rounded-full border-2 bg-bg-primary transition-all duration-300 flex items-center justify-center ${
                    isRunning
                      ? "border-forsythia-yellow shadow-[0_0_10px_#FFC801]"
                      : isSuccess
                      ? "border-border-primary"
                      : "border-border-primary/20"
                  }`}
                >
                  {isSuccess && <div className="w-1.5 h-1.5 rounded-full bg-text-secondary" />}
                  {isRunning && <div className="w-1.5 h-1.5 rounded-full bg-forsythia-yellow animate-ping" />}
                </div>

                <div className="flex gap-4 items-center">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isRunning
                        ? "bg-forsythia-yellow text-oceanic-noir"
                        : isSuccess
                        ? "bg-nocturnal-expedition text-mystic-mint"
                        : "bg-nocturnal-expedition/30 text-mystic-mint/40"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-jetbrains text-xs font-bold text-text-primary">
                      {node.label}
                    </h4>
                    <p className="text-[10px] text-text-secondary/60 font-inter">
                      {node.desc}
                    </p>
                  </div>
                </div>

                {(isRunning || isSuccess) && (
                  <div className="mt-3 pt-2 border-t border-border-primary flex justify-between items-center text-[9px] font-jetbrains">
                    <span className="text-text-secondary/40">Step {index + 1} of 6</span>
                    <span className={isRunning ? "text-forsythia-yellow" : "text-green-400"}>
                      {isRunning ? "RUNNING..." : "COMPLETED"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
