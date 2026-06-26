import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does the pricing engine calculate values dynamically?",
      answer: "Our pricing structure is built on a configuration layout. Base USD values are converted in real-time according to the selected currency's rate (e.g. 80x for INR) and then calculated with a 20% discount if the annual cycle is selected. State updates are restricted to the pricing component to avoid redundant page repaints."
    },
    {
      question: "Can I write custom JavaScript inside my workflows?",
      answer: "Yes, you can drop a Code Block node at any stage in your flow. Write custom vanilla JavaScript or TypeScript to transform API payloads, map properties, clean prompt strings, or execute custom mathematical logic within isolated environments."
    },
    {
      question: "Is data transmission and credential storage secure?",
      answer: "Security is built into our core. All connections, secrets, and auth tokens are encrypted using AES-256 at rest, and all traffic runs over TLS 1.3. Enterprise accounts get single sign-on (SSO) and isolated compute namespaces."
    },
    {
      question: "Does Nexora integrate with local database servers?",
      answer: "Absolutely. You can link your PostgreSQL, MySQL, Redis, or MongoDB databases. If your database is situated inside a private VPC, we provide secure SSH tunnels and static IPs for secure connectivity."
    },
    {
      question: "How does billing work for LLM token usage?",
      answer: "Starter and Professional plans provide generous monthly LLM credits. If you scale past this quota, you can seamlessly connect your own API keys (OpenAI, Anthropic, Gemini) from our dashboard with zero additional markup costs."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-bg-primary relative z-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-jetbrains text-forsythia-yellow uppercase tracking-widest mb-3">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-4 font-jetbrains">
            Questions? We Have Answers
          </p>
          <p className="text-text-secondary text-base">
            Everything you need to know about the Nexora workflow execution engine, compliance, and billing.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-forsythia-yellow/40 bg-card-bg shadow-md"
                    : "border-border-primary bg-nocturnal-expedition/5 hover:border-mystic-mint/20"
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-forsythia-yellow rounded-xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-btn-${index}`}
                >
                  <span className="font-jetbrains text-sm md:text-base font-semibold text-text-primary pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-secondary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-forsythia-yellow" : ""
                    }`}
                  />
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 border-t border-border-primary/5 text-sm md:text-base text-text-secondary/80 font-inter leading-relaxed">
                      {faq.answer}
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
