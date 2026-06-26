import React from "react";
import { Terminal, Cpu, Database, Cloud, Globe, Lock, Shield } from "lucide-react";

export const TrustedCompanies: React.FC = () => {
  const companies = [
    { name: "Vercel", icon: Globe },
    { name: "Supabase", icon: Database },
    { name: "Linear", icon: Terminal },
    { name: "Stripe", icon: Shield },
    { name: "Datadog", icon: Cpu },
    { name: "AWS Cloud", icon: Cloud },
    { name: "ClerkAuth", icon: Lock },
  ];

  const marqueeItems = [...companies, ...companies, ...companies];

  return (
    <section className="py-12 border-y border-border-primary bg-bg-primary/30 relative z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-jetbrains text-text-secondary/40 uppercase tracking-widest mb-6">
          TRUSTED BY DEVELOPERS AT LEADING INNOVATION HUBS
        </p>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <div className="flex gap-16 items-center w-max animate-marquee hover:[animation-play-state:paused]">
            {marqueeItems.map((company, index) => {
              const Icon = company.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2.5 text-text-secondary/50 hover:text-forsythia-yellow transition-colors duration-300 select-none cursor-default group"
                >
                  <Icon className="w-5 h-5 stroke-[1.8] group-hover:scale-105 transition-transform" />
                  <span className="font-jetbrains font-semibold text-sm tracking-wider uppercase">
                    {company.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
