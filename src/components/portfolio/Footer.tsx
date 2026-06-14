'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 sm:py-10 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0a0a0a] border-t border-[#f5f0eb]/5">
      <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#f5f0eb] text-sm font-heading font-bold">
            JJS<span className="text-[#e63946]">.</span>
          </span>
          <span className="text-[#666] text-xs font-heading">
            © {currentYear} Jis John Sajan
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="mailto:jisjohnsajan@gmail.com"
            className="text-[#666] text-xs font-heading hover:text-[#e63946] transition-colors"
          >
            jisjohnsajan@gmail.com
          </a>
          <span className="text-[#f5f0eb]/10">|</span>
          <a
            href="https://github.com/jisjohnsajan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666] text-xs font-heading hover:text-[#e63946] transition-colors"
          >
            GitHub
          </a>
          <span className="text-[#f5f0eb]/10">|</span>
          <a
            href="https://www.linkedin.com/in/jis-john-sajan-4ab8382ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666] text-xs font-heading hover:text-[#e63946] transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-[#666] text-[10px] font-heading tracking-wider uppercase">
          Built with Next.js & GSAP
        </p>
      </div>
    </footer>
  );
}
