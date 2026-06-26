import React from "react";

import { Quote } from "lucide-react";

interface TestimonialItem {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export const Testimonials: React.FC = () => {

  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      quote: "Nexora AI allowed us to migrate 40+ manual cron jobs into a unified visual automation flow. The AI agents are incredibly smart and process context exactly like our engineering team.",
      name: "Marcus Vance",
      role: "VP of Engineering",
      company: "LinearFlow",
      avatar: "MV"
    },
    {
      id: 2,
      quote: "We use Nexora to triage inbound customer bugs. The visual layout matches our Git config perfectly, and the execution latency averages under 50ms. Absolute game changer.",
      name: "Sarah Chen",
      role: "Lead Platform Engineer",
      company: "DataNode",
      avatar: "SC"
    },
    {
      id: 3,
      quote: "Building triggers and linking them to OpenAI models used to require days of custom backend work. With Nexora, we dragged a few nodes, wrote a custom JS filter, and it worked.",
      name: "Alex Petrov",
      role: "CTO & Co-Founder",
      company: "AuraLabs",
      avatar: "AP"
    }
  ];

  return (
    <section
      id="solutions"
      className="py-24 bg-bg-primary/5 border-t border-b border-border-primary relative z-20 overflow-hidden transition-colors duration-300"
    >
      {/* Glow Ambient background */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-forsythia-yellow/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-jetbrains text-forsythia-yellow uppercase tracking-widest mb-3">
            TESTIMONIALS
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-4 font-jetbrains">
            Loved By Modern Engineering Teams
          </p>
          <p className="text-text-secondary text-base font-inter">
            See how scale-conscious organizations use Nexora AI to simplify developer overhead.
          </p>
        </div>

        {/* Layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl border border-border-primary bg-card-bg backdrop-blur-md flex flex-col justify-between items-start text-left relative hover:border-forsythia-yellow/20 hover:translate-y-[-4px] transition-all duration-300 group"
            >
              {/* Quote Mark */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-text-secondary/10 group-hover:text-forsythia-yellow/10 transition-colors" />

              <p className="text-sm md:text-base text-text-secondary/90 leading-relaxed font-inter italic mb-8 relative z-10">
                "{item.quote}"
              </p>

              {/* User Bio */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-nocturnal-expedition border border-border-primary flex items-center justify-center font-jetbrains text-sm font-bold text-forsythia-yellow">
                  {item.avatar}
                </div>
                <div className="text-left font-inter">
                  <h4 className="text-sm font-bold text-text-primary">{item.name}</h4>
                  <p className="text-xs text-text-secondary/50">
                    {item.role}, <span className="text-forsythia-yellow">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
