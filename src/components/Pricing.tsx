import React, { useState, useMemo } from "react";
import { Check } from "lucide-react";

interface CurrencyConfig {
  code: "USD" | "INR" | "EUR";
  symbol: string;
  rate: number;
}

interface TierConfig {
  name: string;
  basePriceUSD: number;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

const currencies: CurrencyConfig[] = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "INR", symbol: "₹", rate: 80 },
  { code: "EUR", symbol: "€", rate: 0.9 },
];

const tiers: TierConfig[] = [
  {
    name: "Starter",
    basePriceUSD: 0,
    features: [
      "Up to 3 active workflows",
      "1,000 tasks/month",
      "Standard node runtimes",
      "Community support",
      "1-day log retention"
    ],
    ctaText: "Start Free",
  },
  {
    name: "Professional",
    basePriceUSD: 29,
    features: [
      "Unlimited active workflows",
      "50,000 tasks/month",
      "High-speed isolated runtimes",
      "AI Agent integration",
      "7-day log retention",
      "Priority email support"
    ],
    ctaText: "Start Trial",
    isPopular: true,
  },
  {
    name: "Enterprise",
    basePriceUSD: 149,
    features: [
      "Custom task volumes",
      "Sub-millisecond node execution",
      "Dedicated AI agent nodes",
      "Custom OAuth integrations",
      "30-day log retention",
      "24/7 dedicated support & SLA"
    ],
    ctaText: "Contact Sales",
  },
];

// Sub-component for isolated pricing calculations to prevent parent re-renders
const PricingCards: React.FC<{
  billingCycle: "monthly" | "annual";
  currency: CurrencyConfig;
}> = React.memo(({ billingCycle, currency }) => {
  const isAnnual = billingCycle === "annual";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
      {tiers.map((tier) => {
        // Calculate price dynamically
        const finalPrice = useMemo(() => {
          if (tier.basePriceUSD === 0) return 0;
          let price = tier.basePriceUSD * currency.rate;
          if (isAnnual) {
            price = price * 0.8; // Apply 20% discount
          }
          return Math.round(price);
        }, [tier.basePriceUSD, currency.rate, isAnnual]);

        // Calculate original crossed out price for premium feel
        const originalPrice = useMemo(() => {
          if (tier.basePriceUSD === 0) return null;
          return Math.round(tier.basePriceUSD * currency.rate);
        }, [tier.basePriceUSD, currency.rate]);

        return (
          <div
            key={tier.name}
            className={`rounded-2xl p-8 border flex flex-col justify-between transition-all duration-300 relative ${
              tier.isPopular
                ? "border-forsythia-yellow bg-nocturnal-expedition/40 shadow-[0_15px_35px_rgba(255,200,1,0.08)] scale-105 z-10 animate-border-glow"
                : "border-border-primary bg-card-bg hover:border-mystic-mint/30"
            }`}
          >
            {tier.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-forsythia-yellow to-deep-saffron text-oceanic-noir font-jetbrains text-xs font-bold uppercase tracking-wider">
                MOST POPULAR
              </span>
            )}

            <div>
              <h3 className="font-jetbrains text-xl font-bold text-text-primary mb-2 text-left">
                {tier.name}
              </h3>
              
              <p className="text-xs text-text-secondary/60 text-left font-inter mb-6">
                {tier.basePriceUSD === 0
                  ? "For developers building sandbox automations"
                  : tier.isPopular
                  ? "For growing teams orchestrating AI operations"
                  : "For production scale with guaranteed uptime"}
              </p>

              {/* Dynamic Prices Area with 150-200ms transition */}
              <div className="flex flex-col items-start gap-1 mb-8 select-none transition-all duration-200 ease-out">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-jetbrains text-5xl font-extrabold text-text-primary transition-all duration-150">
                    {currency.symbol}
                    {finalPrice}
                  </span>
                  <span className="text-xs text-text-secondary/60 font-inter">
                    /{isAnnual ? "mo" : "mo"}
                  </span>
                </div>
                {/* Save label & original crossed out price for premium presentation */}
                {isAnnual && tier.basePriceUSD > 0 && originalPrice && (
                  <div className="flex items-center gap-2 text-[11px] font-jetbrains text-forsythia-yellow mt-1">
                    <span className="line-through text-text-secondary/40">
                      {currency.symbol}
                      {originalPrice}/mo
                    </span>
                    <span>Save 20%</span>
                  </div>
                )}
              </div>

              <div className="w-full h-px bg-border-primary mb-8" />

              <ul className="flex flex-col gap-4 text-left mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary/90">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.isPopular ? "text-forsythia-yellow" : "text-text-primary"}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                tier.isPopular
                  ? "bg-gradient-to-r from-forsythia-yellow to-deep-saffron text-oceanic-noir hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(255,200,1,0.2)]"
                  : "border border-border-primary text-text-primary hover:border-forsythia-yellow hover:text-forsythia-yellow"
              }`}
            >
              {tier.ctaText}
            </button>
          </div>
        );
      })}
    </div>
  );
});

PricingCards.displayName = "PricingCards";

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [currencyIndex, setCurrencyIndex] = useState<number>(0);

  const selectedCurrency = currencies[currencyIndex];

  return (
    <section id="pricing" className="py-24 bg-bg-primary relative z-20 transition-colors duration-300">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-nocturnal-expedition/20 blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-jetbrains text-forsythia-yellow uppercase tracking-widest mb-3">
            PRICING OPTIONS
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-4 font-jetbrains">
            Simple, Scale-ready Pricing
          </p>
          <p className="text-text-secondary text-base">
            No hidden fees. Upgrade, downgrade, or cancel at any time. Get a discount by selecting annual billing.
          </p>
        </div>

        {/* Control Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          {/* Billing Switcher */}
          <div className="flex items-center gap-3 p-1 rounded-xl bg-nocturnal-expedition/30 border border-border-primary">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-jetbrains transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-forsythia-yellow to-deep-saffron text-oceanic-noir"
                  : "text-text-secondary/70 hover:text-text-primary"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-jetbrains transition-all relative flex items-center gap-1.5 cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-forsythia-yellow to-deep-saffron text-oceanic-noir"
                  : "text-text-secondary/70 hover:text-text-primary"
              }`}
            >
              ANNUAL
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                billingCycle === "annual" ? "bg-oceanic-noir/20 text-oceanic-noir" : "bg-forsythia-yellow/15 text-forsythia-yellow"
              }`}>
                -20%
              </span>
            </button>
          </div>

          {/* Currency Dropdown / Segments */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-nocturnal-expedition/30 border border-border-primary">
            {currencies.map((curr, idx) => (
              <button
                key={curr.code}
                onClick={() => setCurrencyIndex(idx)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold font-jetbrains transition-all cursor-pointer ${
                  currencyIndex === idx
                    ? "bg-gradient-to-r from-forsythia-yellow to-deep-saffron text-oceanic-noir"
                    : "text-text-secondary/70 hover:text-text-primary"
                }`}
              >
                {curr.code}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Pricing Cards */}
        <PricingCards billingCycle={billingCycle} currency={selectedCurrency} />

        <p className="mt-12 text-xs font-jetbrains text-text-secondary/40">
          Need a custom volume tier? <a href="#home" className="text-forsythia-yellow hover:underline">Contact our Solutions team</a>.
        </p>
      </div>
    </section>
  );
};
