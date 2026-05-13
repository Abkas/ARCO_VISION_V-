export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-[#2C1A0E] mb-4">
          Privacy <span className="italic font-light text-[#B8956A]">Policy</span>
        </h1>
        <p className="text-[#2C1A0E]/60 text-sm mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-10 font-sans text-[#2C1A0E]">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Introduction</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              ARCO Cinema ("we," "our," or "us") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
            </p>
          </section>

          {/* Information Collection */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Information Collection and Use</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80 mb-4">
              We collect several different types of information for various purposes to provide and improve our service to you.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#B8956A] mb-2">Contact Information</h3>
                <p className="text-[#2C1A0E]/80">
                  When you contact us through our contact form, we collect your name, email address, phone number, and message content. This information is used solely to respond to your inquiry and discuss our services with you.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#B8956A] mb-2">Usage Data</h3>
                <p className="text-[#2C1A0E]/80">
                  We may automatically collect information about how you access and use our website (such as pages visited, time spent, and referral sources) through analytics tools.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Data Security</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              We are committed to protecting your data. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Data Retention</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Contact information from inquiries will be retained for a period of 2 years unless you request deletion.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Data Sharing</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or as necessary to provide our services. We may share information with trusted service providers who are contractually obligated to maintain confidentiality.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Your Rights</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#2C1A0E]/80">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of communications at any time</li>
            </ul>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80 mt-4">
              To exercise these rights, please contact us at your earliest convenience.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Contact Us</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              If you have any questions about this Privacy Policy, please contact us through the contact form on our website or reach out to us directly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
