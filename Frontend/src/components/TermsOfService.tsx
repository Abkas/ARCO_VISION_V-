export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-[#2C1A0E] mb-4">
          Terms of <span className="italic font-light text-[#B8956A]">Service</span>
        </h1>
        <p className="text-[#2C1A0E]/60 text-sm mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-10 font-sans text-[#2C1A0E]">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Agreement to Terms</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Use License */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Use License</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80 mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on ARCO Studio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#2C1A0E]/80">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Disclaimer</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80 mb-4">
              The materials on ARCO Studio's website are provided on an "as is" basis. ARCO Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          {/* Limitations */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Limitations</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              In no event shall ARCO Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ARCO Studio's website, even if ARCO Studio or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          {/* Accuracy of Materials */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Accuracy of Materials</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              The materials appearing on ARCO Studio's website could include technical, typographical, or photographic errors. ARCO Studio does not warrant that any of the materials on its website are accurate, complete, or current. ARCO Studio may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          {/* Links */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Links</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              ARCO Studio has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ARCO Studio of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Modifications</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              ARCO Studio may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          {/* Service Engagement */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Service Engagement</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80 mb-4">
              When you engage ARCO Studio for video production services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#2C1A0E]/80">
              <li>You will provide necessary materials, information, and access required for project completion</li>
              <li>Payment terms and schedules will be discussed and agreed upon before project commencement</li>
              <li>Project timelines are estimates and may vary based on scope changes or client feedback delays</li>
              <li>Revisions are included as per the agreed-upon service package</li>
              <li>Deliverables remain our property until full payment is received</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Governing Law</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where ARCO Studio operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#2C1A0E]">Contact Us</h2>
            <p className="text-base leading-relaxed text-[#2C1A0E]/80">
              If you have any questions about these Terms of Service, please contact us through the contact form on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
