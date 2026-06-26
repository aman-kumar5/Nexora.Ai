import React, { useEffect, useState, useRef } from "react";

import { Zap, CheckCircle, Database, Award } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = ""
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // easeOutQuad easing
      const easedProgress = percentage * (2 - percentage);
      const currentValue = easedProgress * end;

      setCount(currentValue);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

export const Statistics: React.FC = () => {

  const stats = [
    {
      id: 1,
      end: 120,
      suffix: "K+",
      decimals: 0,
      label: "Automations",
      desc: "Active client workflows orchestrating tasks daily.",
      icon: Zap
    },
    {
      id: 2,
      end: 98.9,
      suffix: "%",
      decimals: 1,
      label: "Success Rate",
      desc: "API calls completed without workflow errors.",
      icon: CheckCircle
    },
    {
      id: 3,
      end: 42,
      suffix: "M+",
      decimals: 0,
      label: "Tasks Processed",
      desc: "Jobs processed across cloud compute nodes.",
      icon: Database
    },
    {
      id: 4,
      end: 180,
      suffix: "+",
      decimals: 0,
      label: "Enterprise Clients",
      desc: "High-scale organizations relying on Nexora.",
      icon: Award
    }
  ];

  return (
    <section id="stats" className="py-20 bg-bg-primary/50 border-b border-border-primary z-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="p-6 rounded-2xl border border-border-primary bg-card-bg backdrop-blur-sm text-left flex flex-col justify-between hover:border-forsythia-yellow/20 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-nocturnal-expedition/50 text-mystic-mint flex items-center justify-center group-hover:bg-forsythia-yellow group-hover:text-oceanic-noir transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary font-jetbrains mb-2">
                    <AnimatedCounter
                      end={stat.end}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </h3>
                  <p className="text-sm font-semibold text-text-secondary font-jetbrains mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-text-secondary/60 font-inter leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
