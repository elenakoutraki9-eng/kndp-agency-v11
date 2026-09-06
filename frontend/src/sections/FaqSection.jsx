import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { WordMask, Reveal, Kicker } from "@/components/Reveal";

const faqs = [
  {
    q: "Μπορείτε να χτίσετε ακριβώς ό,τι χρειάζομαι;",
    a: "Ναι — όλα όσα χτίζουμε είναι custom, φτιαγμένα γύρω από τον πραγματικό τρόπο λειτουργίας της επιχείρησής σου. Χωρίς έτοιμα templates που δεν ταιριάζουν στο πρόβλημά σου. Και αν κάτι δεν αξίζει να χτιστεί, θα σου το πούμε ειλικρινά κι αυτό.",
  },
  {
    q: "Πόσο διαρκεί ένα έργο;",
    a: "Οι περισσότεροι ιστότοποι παραδίδονται σε 2–4 εβδομάδες. Μεγαλύτερες εφαρμογές, εργαλεία και πλατφόρμες συνήθως χρειάζονται 4–8. Θα λάβεις ένα ξεκάθαρο χρονοδιάγραμμα με τη δωρεάν προσφορά σου — και το τηρούμε.",
  },
  {
    q: "Σε ποιον ανήκει το τελικό προϊόν;",
    a: "Σε εσένα — 100%. Ο κώδικας, το design, οι λογαριασμοί, όλα είναι στο όνομά σου και παραδίδονται πλήρως. Χωρίς δεσμεύσεις, χωρίς κρυφούς όρους.",
  },
  {
    q: "Με τι είδους επιχειρήσεις συνεργάζεστε;",
    a: "Κάθε μέγεθος, κάθε κλάδο — από μεμονωμένους ιδρυτές που ξεκινούν την πρώτη τους ιδέα, έως καθιερωμένες εταιρείες που εκσυγχρονίζουν τον τρόπο λειτουργίας τους. Αν έχεις ένα πραγματικό πρόβλημα να λύσεις, μας ενδιαφέρει.",
  },
  {
    q: "Πόσο θα κοστίσει;",
    a: "Κάθε έργο σχεδιάζεται ξεχωριστά, ώστε να πληρώνεις μόνο για ό,τι χρειάζεσαι πραγματικά. Ζήτησε μια δωρεάν προσφορά και θα λάβεις μια ειλικρινή, σταθερή τιμή — χωρίς εκπλήξεις αργότερα.",
  },
];

const FaqItem = ({ faq, index, open, onToggle }) => (
  <div
    data-testid={`faq-item-${index}`}
    className="border-b border-ink/10 last:border-b-0"
  >
    <button
      onClick={onToggle}
      data-testid={`faq-question-${index}`}
      aria-expanded={open}
      className="group flex w-full items-center justify-between gap-6 py-5 md:py-6 text-left"
    >
      <span className="flex items-baseline gap-4">
        <span className="font-display text-xs font-light text-baby-dark">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`font-display text-lg md:text-xl font-medium tracking-tight transition-colors duration-300 ${
            open ? "text-baby-dark" : "text-ink group-hover:text-baby-dark"
          }`}
        >
          {faq.q}
        </span>
      </span>
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
          open ? "bg-baby border-baby text-ink" : "border-ink/10"
        }`}
      >
        <Plus className="h-3.5 w-3.5" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p
            data-testid={`faq-answer-${index}`}
            className="pb-5 pl-8 md:pl-10 pr-4 max-w-2xl text-sm text-ink/60 leading-relaxed"
          >
            {faq.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" data-testid="faq-section" className="py-12 md:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <Kicker waypoint="faq">Συχνές Ερωτήσεις</Kicker>
              <h2
                data-testid="faq-headline"
                className="mt-3 font-display font-medium tracking-tight text-3xl md:text-4xl"
              >
                <WordMask text="Ερωτήσεις," className="block" />
                <WordMask text="απαντημένες." accent={["απαντημένες."]} delay={0.2} className="block" />
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.15}>
              <div className="border-t border-ink/10">
                {faqs.map((f, i) => (
                  <FaqItem
                    key={f.q}
                    faq={f}
                    index={i}
                    open={open === i}
                    onToggle={() => setOpen(open === i ? -1 : i)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
      </div>
    </section>
  );
}
