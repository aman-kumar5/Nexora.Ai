import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Subscription mock success!");
  };

  return (
    <footer className="bg-bg-primary border-t border-border-primary pt-20 pb-10 relative z-20 overflow-hidden transition-colors duration-300">
      {/* Background Accent Glow */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-nocturnal-expedition/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand and Newsletter */}
          <div className="lg:col-span-2 text-left">
            <a href="#home" className="flex items-center gap-2.5 mb-6 group">
              <img
                src="/logo.png"
                className="w-12 h-12 object-contain"
                alt="Nexora Logo"
              />
              <span className="font-jetbrains text-2xl font-bold tracking-tight text-text-primary">
                NEXORA<span className="text-forsythia-yellow">.AI</span>
              </span>
            </a>
            
            <p className="text-xs text-text-secondary/60 leading-relaxed font-inter mb-6">
              Next-generation AI workflow orchestration engine. Built for modern software builders and scaling teams.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <span className="text-[10px] font-jetbrains font-bold text-text-secondary/40 uppercase tracking-widest">
                SUBSCRIBE TO THE CHANGELOG
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@domain.com"
                  required
                  className="px-3.5 py-2 rounded-lg bg-nocturnal-expedition/30 border border-border-primary text-text-primary text-xs placeholder-text-secondary/30 focus:outline-none focus:border-forsythia-yellow focus:ring-1 focus:ring-forsythia-yellow flex-1"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-nocturnal-expedition border border-border-primary text-xs font-semibold font-jetbrains text-text-primary hover:text-forsythia-yellow hover:border-forsythia-yellow transition-all duration-200 cursor-pointer"
                >
                  JOIN
                </button>
              </div>
            </form>
          </div>

          {/* Link Column 1: Product */}
          <div className="text-left md:pl-8">
            <h4 className="text-xs font-jetbrains font-bold text-text-primary uppercase tracking-wider mb-4">
              PRODUCT
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary/70">
              <li><a href="#features" className="hover:text-forsythia-yellow transition-colors">Features</a></li>
              <li><a href="#workflow" className="hover:text-forsythia-yellow transition-colors">Live Demo</a></li>
              <li><a href="#pricing" className="hover:text-forsythia-yellow transition-colors">Pricing</a></li>
              <li><a href="#solutions" className="hover:text-forsythia-yellow transition-colors">Enterprise</a></li>
            </ul>
          </div>

          {/* Link Column 2: Developers */}
          <div className="text-left">
            <h4 className="text-xs font-jetbrains font-bold text-text-primary uppercase tracking-wider mb-4">
              DEVELOPERS
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary/70">
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">Documentation</a></li>
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">API Reference</a></li>
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">GitHub Repo</a></li>
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Link Column 3: Company */}
          <div className="text-left">
            <h4 className="text-xs font-jetbrains font-bold text-text-primary uppercase tracking-wider mb-4">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary/70">
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">About Us</a></li>
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">Careers</a></li>
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">Security</a></li>
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Link Column 4: Legal */}
          <div className="text-left">
            <h4 className="text-xs font-jetbrains font-bold text-text-primary uppercase tracking-wider mb-4">
              LEGAL
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary/70">
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">Privacy Policy</a></li>
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">Terms of Service</a></li>
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">Subprocessors</a></li>
              <li><a href="#home" className="hover:text-forsythia-yellow transition-colors">Trust Center</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border-primary mb-8" />

        {/* Bottom Socials & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary/50 mb-12">
          <span>&copy; {currentYear} Nexora AI, Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-forsythia-yellow transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-forsythia-yellow transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-forsythia-yellow transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Gigantic outline wordmark */}
        <div className="w-full text-center mt-12 select-none pointer-events-none">
          <h3 className="font-jetbrains text-[10vw] font-black leading-none text-nocturnal-expedition/20 tracking-tighter uppercase">
            NEXORA
          </h3>
        </div>
      </div>
    </footer>
  );
};
