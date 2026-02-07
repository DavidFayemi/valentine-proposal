import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { sendResponseEmail } from "./lib/supabase";

export default function JackVersion() {
  const [displayedText, setDisplayedText] = useState("");
  const [step, setStep] = useState(0); // 0-3: different messages
  const [isAnimating, setIsAnimating] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);

  const messages = useMemo(
    () => [
      "Hey baby gangster, we've made some cute memories together and I'm looking forward to making a lot more",
      "I really don't need a special day to love you, but Valentine seems like the perfect excuse to show you how much you mean to me",
      "So...",
      "Will you be my valentine? (I promise to buy you chocolate)",
    ],
    [],
  );

  // Fade-in animation (like celebration modal)
  useEffect(() => {
    if (!isAnimating) return;

    setDisplayedText(messages[step]);
    setIsAnimating(false);
  }, [step, isAnimating, messages]);

  // Auto-start animation with delay only on first message
  useEffect(() => {
    const delay = step === 0 ? 800 : 400;
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [step]);

  // Show buttons only on last step (step 3)
  useEffect(() => {
    if (!isAnimating && step === 3) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowButtons(false);
    }
  }, [isAnimating, step]);

  const handleNext = () => {
    if (step < 3) {
      setDisplayedText("");
      setIsAnimating(false);
      setTimeout(() => {
        setStep(step + 1);
      }, 300);
    }
  };

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

    // Trigger fireworks
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ["star"],
        colors: ["#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"],
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.4 },
          shapes: ["circle"],
          colors: ["#d8b4fe", "#e9d5ff", "#f3e8ff"],
        });
      }, 100);
    }, 300);
  };

  const getNoButtonText = () => {
    switch (noClickCount) {
      case 0:
        return "Not sure yet";
      case 1:
        return "I need time";
      case 2:
        return "Still thinking...";
      default:
        return "Not sure yet";
    }
  };

  const getNoButtonColor = () => {
    switch (noClickCount) {
      case 0:
        return { borderColor: "#a78bfa", color: "#a78bfa" };
      case 1:
        return { borderColor: "#9370db", color: "#9370db" };
      case 2:
        return { borderColor: "#7c5cd4", color: "#7c5cd4" };
      default:
        return { borderColor: "#a78bfa", color: "#a78bfa" };
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden selection:bg-purple-500 selection:text-white group">
      {/* Video mosaic background (subtle, greyish memory effect) - fills entire screen */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            gap: 0,
          }}
        >
          {/* Row 1 */}
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 3",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.45, filter: "grayscale(40%) contrast(0.95)" }}
              src="/VID-20260207-WA0035.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <img
              alt="memory"
              className="w-full h-full object-top object-cover"
              style={{ opacity: 0.45, filter: "grayscale(45%) contrast(0.9)" }}
              src="/IMG-20260207-WA0033.jpg"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 5",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center "
              style={{ opacity: 0.42, filter: "grayscale(50%) contrast(0.9)" }}
              src="/VID-20260207-WA0036.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          {/* Row 3 */}
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <img
              alt="memory"
              className="w-full h-full object-cover"
              style={{ opacity: 0.4, filter: "grayscale(55%) contrast(0.9)" }}
              src="/IMG-20260207-WA0034.jpg"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.4, filter: "grayscale(50%) contrast(0.9)" }}
              src="/VID-20260207-WA0037.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.4, filter: "grayscale(50%) contrast(0.9)" }}
              src="/VID-20260207-WA0038.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          {/* Row 5 */}
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 2",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.42, filter: "grayscale(48%) contrast(0.92)" }}
              src="/VID-20260207-WA0040.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 3",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <img
              alt="memory"
              className="w-full h-full object-cover"
              style={{ opacity: 0.41, filter: "grayscale(52%) contrast(0.88)" }}
              src="/IMG-20260207-WA0034.jpg"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 3",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.44, filter: "grayscale(42%) contrast(0.93)" }}
              src="/VID-20260207-WA0043.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#59168b",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.39, filter: "grayscale(58%) contrast(0.87)" }}
              src="/VID-20260207-WA0044.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      </div>

      {/* Falling Hearts Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`falling-heart-${i}`}
            initial={{
              left: Math.random() * 100 + "%",
              top: -20,
              opacity: 0.7,
              scale: 0.8 + Math.random() * 0.4,
            }}
            animate={{
              top: "100vh",
              opacity: [0.7, 0.5, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear",
            }}
            className="absolute text-2xl"
          >
            💜
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-purple-300">
            Doyin
          </h1>
        </motion.div>

        {/* Message Box - Only shown when there's text */}
        <AnimatePresence mode="wait">
          {displayedText.length > 0 && (
            <motion.div
              key={`message-${step}`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl mb-12"
            >
              <div className="bg-linear-to-b from-purple-950 to-slate-950 border-2 border-purple-500 rounded-xl p-8 sm:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-center"
                >
                  {step === 3 ? (
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-purple-300 leading-relaxed">
                      Will you be my valentine? <br></br>
                      <span className="text-base sm:text-lg font-light text-purple-200 italic">
                        (I promise to buy you chocolate)
                      </span>
                    </p>
                  ) : (
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-purple-300 leading-relaxed">
                      {displayedText}
                    </p>
                  )}
                </motion.div>

                {/* Decorative elements for final message */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center gap-4 mt-6"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-3xl"
                    >
                      💜
                    </motion.span>
                    <motion.span
                      animate={{ scale: [1.2, 1, 1.2], rotate: [-10, 10, -10] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                      className="text-3xl"
                    >
                      ✨
                    </motion.span>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1], rotate: [10, -10, 10] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                      className="text-3xl"
                    >
                      💜
                    </motion.span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button - shown when on steps 0-2 */}
        <AnimatePresence>
          {step < 3 && displayedText.length > 0 && !isAnimating && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={handleNext}
              className="px-8 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 mb-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next ✨
            </motion.button>
          )}
        </AnimatePresence>

        {/* Yes/No buttons appear only on final step */}
        <AnimatePresence>
          {step === 3 && showButtons && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full max-w-xl px-4"
            >
              {/* Yes Button */}
              <motion.button
                onClick={handleYesClick}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-lg sm:btn-lg relative overflow-hidden group w-full sm:w-auto"
                style={{
                  background:
                    "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
                  color: "white",
                  border: "none",
                  fontSize: "1rem sm:1.125rem",
                  fontWeight: "bold",
                  padding: "16px 32px sm:12px sm:40px",
                }}
              >
                <motion.span
                  animate={{
                    background: [
                      "rgba(255,255,255,0)",
                      "rgba(255,255,255,0.2)",
                      "rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0"
                />
                <motion.span
                  className="relative"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  Yes! 💕
                </motion.span>
              </motion.button>

              {/* No Button */}
              {noClickCount < 3 && (
                <motion.button
                  key={`no-button-${noClickCount}`}
                  onClick={handleNoClick}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    rotate: 1080,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      duration: 0.8,
                    },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  }}
                  className="btn btn-outline btn-lg w-full sm:w-auto"
                  style={getNoButtonColor()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    key={`text-${noClickCount}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getNoButtonText()}
                  </motion.span>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Celebration Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative z-10 bg-linear-to-b from-purple-950 to-slate-950 border-2 border-purple-500">
          <div className="text-center">
            {/* Celebration animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              className="mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-7xl"
              >
                💜
              </motion.div>
            </motion.div>

            {/* Celebration Message */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 mb-3"
            >
              Yayyyy!!! 🎉
            </motion.h2>

            {/* Falling emojis */}
            <div className="relative h-24 overflow-hidden mb-6">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ top: -20, left: `${(i + 1) * 15}%`, opacity: 1 }}
                  animate={{
                    top: 100,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="absolute text-2xl"
                >
                  {i % 3 === 0 ? "✨" : i % 3 === 1 ? "💜" : "🌟"}
                </motion.div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="modal-action justify-center">
              <form method="dialog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
                    color: "white",
                    border: "none",
                  }}
                >
                  Close
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
