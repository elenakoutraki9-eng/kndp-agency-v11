import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WordMask, Reveal, Kicker } from "@/components/Reveal";
import useIsMobile from "@/hooks/useIsMobile";

// Placeholder companies — swap names / add real logos later.
const companies = [
  { name: "Aroma Café", mono: "A", line: "Καφετέρια & brunch spot", tag: "Website · Online παραγγελίες" },
  { name: "FitZone Gym", mono: "FZ", line: "Δίκτυο γυμναστηρίων", tag: "Mobile app κρατήσεων" },
  { name: "Bella Casa", mono: "BC", line: "Έπιπλα & décor", tag: "E-shop" },
  { name: "TechNova", mono: "TN", line: "IT services", tag: "Custom dashboard" },
  { name: "Green Leaf", mono: "GL", line: "Delicatessen", tag: "Automation τιμολόγησης" },
  { name: "Marina Estates", mono: "ME", line: "Μεσιτικό γραφείο", tag: "Πλατφόρμα αγγελιών" },
  { name: "Sunset Travel", mono: "ST", line: "Ταξιδιωτικό γραφείο", tag: "Booking platform" },
  { name: "Kappa Dental", mono: "KD", line: "Οδοντιατρική κλινική", tag: "Website & ραντεβού" },
];

// Cycling studio-palette accents so the row feels colourful & creative.
const accents = [
  { grad: "from-baby to-baby-dark", dot: "bg-baby-dark", text: "text-baby-dark", shadow: "shadow-baby/30", ring: "group-hover:ring-baby/50" },
  { grad: "from-violet to-violet-dark", dot: "bg-violet-dark", text: "text-violet-dark", shadow: "shadow-violet/30", ring: "group-hover:ring-violet/50" },
  { grad: "from-teal to-teal-dark", dot: "bg-teal-dark", text: "text-teal-dark", shadow: "shadow-teal/30", ring: "group-hover:ring-teal/50" },
  { grad: "from-lime to-lime-dark", dot: "bg-lime-dark", text: "text-lime-dark", shadow: "shadow-lime/30", ring: "group-hover:ring-lime/50" },
];

function CompanyCard({ c, i }) {
  const a = accents[i % accents.length];
  return (
    <div
      data-testid={`company-card-${i}`}
      className="group relative flex w-[290px] shrink-0 snap-start flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-xl shadow-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl md:w-[340px] md:p-7"
    >
      {/* Logo mark (monogram placeholder) */}
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${a.grad} font-display text-lg font-bold text-white shadow-lg ${a.shadow}`}>
        {c.mono}
      </div>

      <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-ink md:text-xl">
        {c.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{c.line}</p>

      <div className={`mt-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] ${a.text}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
        {c.tag}
      </div>

      <div className={`pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 ${a.ring}`} />
    </div>
  );
}

function SectionHeader({ light = false }) {
  return (
    <Reveal>
      <Kicker waypoint="companies" dotClassName="bg-violet-dark">Συνεργασίες</Kicker>
      <h2
        data-testid="companies-headline"
        className="mt-3 font-display font-medium tracking-tight text-3xl md:text-5xl"
      >
        <WordMask text="Εταιρείες που" className="block" />
        <WordMask
          text="μας εμπιστεύτηκαν."
          accent={["μας", "εμπιστεύτηκαν."]}
          delay={0.2}
          className="block"
        />
      </h2>
      <p className="mt-4 flex max-w-2xl items-center gap-2 text-sm leading-relaxed text-ink/60 md:text-base">
        Επιχειρήσεις κάθε μεγέθους που εμπιστεύτηκαν την KNDP για τα ψηφιακά τους projects.
        <span className="hidden items-center gap-1 whitespace-nowrap font-semibold text-violet-dark md:inline-flex">
          Σύρε <ArrowRight className="h-4 w-4" />
        </span>
      </p>
    </Reveal>
  );
}

export default function CompaniesSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Pan the horizontal track left→right: as the user scrolls down while the
  // section is pinned, the camera travels across the row from the first card
  // (left) to the last (right). Content translates by the exact overflow
  // distance so every card is revealed by the time the pin releases.
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useLayoutEffect(() => {
    if (isMobile) return;
    const measure = () => {
      if (!trackRef.current) return;
      const d = trackRef.current.scrollWidth - window.innerWidth;
      setDistance(Math.max(0, d));
    };
    measure();
    // Re-measure after fonts/images settle and on resize.
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [isMobile]);

  // MOBILE: no pin — a native, swipeable horizontal scroller (left→right feel
  // preserved) so touch scrolling never jams.
  if (isMobile) {
    return (
      <section
        id="companies"
        data-testid="companies-section"
        className="relative bg-violet-light py-16"
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader />
        </div>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {companies.map((c, i) => (
            <CompanyCard key={c.name} c={c} i={i} />
          ))}
        </div>
      </section>
    );
  }

  // DESKTOP: pinned horizontal track. Section height = one viewport + the
  // horizontal overflow, giving a 1:1 mapping between vertical scroll and the
  // left→right pan while the inner container is stuck to the top.
  return (
    <section
      id="companies"
      data-testid="companies-section"
      ref={sectionRef}
      className="relative bg-violet-light"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <SectionHeader />
        </div>

        <div className="mt-10 md:mt-14">
          <motion.div
            ref={trackRef}
            style={{ x }}
            data-testid="companies-track"
            className="flex w-max gap-6 px-6 md:px-10"
          >
            {companies.map((c, i) => (
              <CompanyCard key={c.name} c={c} i={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
