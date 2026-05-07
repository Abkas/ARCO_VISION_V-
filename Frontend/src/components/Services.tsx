import { services } from "../data/services";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section id="services" className="relative bg-[#F2EBDD] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 max-w-2xl">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B8956A]">
            What We Do
          </p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] text-[#2C1A0E] md:text-6xl">
            Services built for <span className="italic text-[#B8956A]">modern brands.</span>
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.number} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}