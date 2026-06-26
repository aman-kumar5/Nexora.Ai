import React from "react";
import { ArrowRight, Layers } from "lucide-react";

interface CtaProps {
  onCtaClick: () => void;
}

export const CTA: React.FC<CtaProps> = ({ onCtaClick }) => {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden z-20 transition-colors duration-300">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-forsythia-yellow/10 to-deep-saffron/10 blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl border border-border-primary bg-gradient-to-b from-bg-secondary/40 to-bg-primary/80 p-8 md:p-16 text-center relative overflow-hidden shadow-[0_15px_40px_rgba(17,76,90,0.2)]">
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forsythia-yellow to-deep-saffron flex items-center justify-center text-oceanic-noir mb-8 shadow-[0_0_20px_rgba(255,200,1,0.3)]">
              <Layers className="w-6 h-6 stroke-[2]" />
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight font-jetbrains">
              Power Your Operations With <span className="text-transparent bg-clip-text bg-gradient-to-r from-forsythia-yellow to-deep-saffron">Autonomous AI</span>
            </h2>

            <p className="text-sm md:text-lg text-text-secondary mb-10 leading-relaxed font-inter font-light">
              Join forward-thinking developer teams and businesses. Build your first visual workflow in minutes, automate your data pipes, and launch intelligent agents in production.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={onCtaClick}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-forsythia-yellow to-deep-saffron text-oceanic-noir font-bold text-base hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_0_25px_rgba(255,200,1,0.2)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
