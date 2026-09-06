import { motion } from "framer-motion";
import { ArrowRight, CircleX, CheckCircle2 } from "lucide-react";
import { Kicker } from "@/components/Reveal";
import { StackPanel } from "@/components/StackSection";
import useInViewOnce from "@/hooks/useInViewOnce";
import useIsMobile from "@/hooks/useIsMobile";

const pairs = [
  {
    problem: "Οι πελάτες δεν μπορούν να κάνουν κράτηση online",
    solution: "Custom booking app, έτοιμη σε 5 μέρες",
  },
  {
    problem: "Πνίγεσαι σε χειρωνακτική δουλειά",
    solution: "Ένας custom αυτοματισμός που τα κάνει όλα για εσένα",
  },
  {
    problem: "Το website σου φαίνεται ξεπερασμένο",
    solution: "Ένα μοντέρνο website που μετατρέπει επισκέπτες σε πελάτες",
  },
  {
    problem: "Χρειάζεσαι ένα εργαλείο που η ομάδα σου θα χρησιμοποιεί πραγματικά",
    solution: "Το χτίζουμε γύρω από τον δικό σου τρόπο δουλειάς",
  },
];

// Smooth ease-out curve for all scroll-in transitions.
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 0.5; // seconds

export default function ProblemSolutionSection(props) {
  const isMobile = useIsMobile();
  const [ref, inView] = useInViewOnce({ threshold: 0.2, rootMargin: "0px 0px -12% 0px" });

  // The title animates first; rows begin staggering after it.
  const rowDelay = (i) => 0.28 + i * 0.14;

  const transition = (delay = 0) =>
    `opacity ${DURATION}s ${EASE} ${delay}s, transform ${DURATION}s ${EASE} ${delay}s`;

  return (
    <StackPanel
      {...props}
      innerClassName="overflow-hidden"
    >
      <section id="problems" data-testid="problem-solution-section" className="py-12 md:py-16">
        <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-10">
          {/* Title — fades + slides up first */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: transition(0),
              willChange: "opacity, transform",
            }}
          >
            <Kicker waypoint="problems">Προβλήματα που λύνουμε</Kicker>
            <h2
              data-testid="problem-solution-headline"
              className="mt-3 font-display font-medium tracking-tight text-3xl md:text-5xl"
            >
              Σου ακούγεται{" "}
              <span className="text-baby-dark italic">γνωστό;</span>
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {pairs.map((p, i) => {
              const delay = rowDelay(i);
              return (
                <div
                  key={p.problem}
                  data-testid={`problem-solution-row-${i}`}
                  className="group grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4"
                >
                  {/* Problem card — slides in from the left */}
                  <div
                    className="flex items-center gap-3 rounded-xl bg-white border border-ink/8 p-4 text-ink/60"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateX(0)" : "translateX(-40px)",
                      transition: transition(delay),
                      willChange: "opacity, transform",
                    }}
                  >
                    <CircleX className="h-4 w-4 shrink-0 text-ink/30" />
                    <p className="font-medium text-sm md:text-base">{p.problem}</p>
                  </div>

                  {/* Arrow — fades in */}
                  <span
                    className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full bg-baby text-ink"
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: `opacity ${DURATION}s ${EASE} ${delay}s`,
                      willChange: "opacity",
                    }}
                  >
                    <motion.span
                      animate={isMobile ? undefined : { x: [0, 6, 0] }}
                      transition={isMobile ? undefined : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="inline-flex"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>

                  {/* Solution card — slides in from the right */}
                  <div
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateX(0)" : "translateX(40px)",
                      transition: transition(delay),
                      willChange: "opacity, transform",
                    }}
                  >
                    <div className="flex items-center gap-3 rounded-xl bg-ink text-white p-4 transition-transform duration-500 group-hover:-translate-y-0.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-baby" />
                      <p className="font-semibold text-sm md:text-base">{p.solution}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </StackPanel>
  );
}
