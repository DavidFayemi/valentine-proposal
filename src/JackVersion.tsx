import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { sendResponseEmail } from "./lib/supabase";

export default function JackVersion() {
  const [noClickCount, setNoClickCount] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);

  const fallingHearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 18 + Math.random() * 20,
        delay: Math.random() * 2,
        duration: 7 + Math.random() * 4,
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [],
  );

  const noDodges = useMemo(
    () => [
      { x: 0, y: 0, rotate: 0 },
      { x: -70, y: -18, rotate: -6 },
      { x: 80, y: -10, rotate: 6 },
      { x: -60, y: 20, rotate: -6 },
    ],
    [],
  );

  const currentDodge = noDodges[Math.min(noClickCount, noDodges.length - 1)];

  const handleNoClick = () => {
    const newClickCount = noClickCount + 1;
    setNoClickCount(newClickCount);

    if (newClickCount >= 3) {
      sendResponseEmail("no");
    }
  };

  const handleYesClick = () => {
    sendResponseEmail("yes");
    modalRef.current?.showModal();

    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        shapes: ["circle"],
        colors: ["#f472b6", "#f9a8d4", "#fbcfe8", "#fef3c7"],
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 110,
          origin: { y: 0.4 },
          shapes: ["star"],
          colors: ["#fff1f2", "#fde68a"],
        });
      }, 140);
    }, 200);
  };

  const getNoButtonText = () => {
    switch (noClickCount) {
      case 0:
        return "No";
      case 1:
        return "Are you sure?";
      case 2:
        return "Still no";
      default:
        return "No";
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-base-100 text-base-content selection:bg-primary selection:text-primary-content"
      data-theme="valentine"
    >
      {/* Soft background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/10 blur-[140px]" />
      </div>

      {/* Falling hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {fallingHearts.map((heart) => (
          <motion.div
            key={`heart-${heart.id}`}
            className="absolute text-2xl"
            style={{ left: heart.left, top: -40, opacity: heart.opacity }}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, heart.opacity, 0] }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.5em] text-base-content/50"
        >
          From Ore
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="ore-title mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold"
        >
          Will you be my Valentine?
        </motion.h1>

        {/* <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-base-content/70"
        >
          I already know my answer.
        </motion.p> */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <motion.button
            onClick={handleYesClick}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 30px rgba(236,72,153,0.45)",
            }}
            whileTap={{ scale: 0.96 }}
            className="btn btn-primary btn-lg w-full sm:w-auto rounded-full px-12 py-5 text-base uppercase tracking-[0.4em] sm:px-10 sm:py-4 sm:text-sm"
          >
            Yes
          </motion.button>

          {noClickCount < 3 && (
            <motion.button
              key={`no-button-${noClickCount}`}
              onClick={handleNoClick}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                x: currentDodge.x,
                rotate: currentDodge.rotate,
              }}
              exit={{
                scale: 0,
                opacity: 0,
                rotate: 120,
                transition: { duration: 0.4 },
              }}
              transition={{ type: "spring", stiffness: 150, damping: 16 }}
              whileHover={{
                x: currentDodge.x + (noClickCount % 2 === 0 ? -16 : 16),
                y: currentDodge.y - 6,
                scale: 1.02,
              }}
              className="btn btn-outline btn-secondary w-full sm:w-auto rounded-full px-12 py-4 text-sm uppercase tracking-[0.35em] sm:px-10 sm:py-3 sm:text-xs"
            >
              {getNoButtonText()}
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Celebration Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 text-base-content">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -120 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 90 }}
              className="mb-6 text-4xl font-black text-primary"
            >
              YES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-semibold"
            >
              I love you.
            </motion.h2>
            <p className="mt-3 text-sm sm:text-base text-base-content/70">
              Thank you for choosing me.
            </p>

            <div className="modal-action justify-center">
              <form method="dialog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary rounded-full px-8 text-xs uppercase tracking-[0.35em]"
                >
                  Close
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
