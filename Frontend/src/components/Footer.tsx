export default function Footer() {
  return (
    <footer className="bg-[#2C1A0E] px-6 py-16 text-[#FAF7F2] md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <a href="#top" className="font-display text-3xl tracking-tight">
              ARCO <span className="italic font-light text-[#D4AE87]">Studio</span>
            </a>
            <p className="mt-4 max-w-sm font-sans text-sm font-light leading-relaxed text-[#FAF7F2]/60">
              A boutique AI-powered video production agency. Founded by Abhishek Magar &amp; Anuj Gyawali.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 font-sans text-sm">
            {["Instagram", "Vimeo", "Behance", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[#FAF7F2]/70 transition-colors hover:text-[#D4AE87]"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[#FAF7F2]/10 pt-6 font-sans text-xs text-[#FAF7F2]/50 md:flex-row">
          <span>© {new Date().getFullYear()} ARCO Studio. All rights reserved.</span>
          <span>Crafted with intention.</span>
        </div>
      </div>
    </footer>
  );
}