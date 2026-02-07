import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { sendResponseEmail } from "./lib/supabase";

export default function JackVersion() {
  const [displayedText, setDisplayedText] = useState("");
  const [step, setStep] = useState(0); // 0: first message, 1: question
  const [isTyping, setIsTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);

  const messages = useMemo(
    () => [
      "hey baby, I know i keep asking you important questions in the worst ways but...",
      "Will you be my valentine?",
    ],
    [],
  );

  // Typing effect
  useEffect(() => {
    if (!isTyping) return;

    const targetText = messages[step];
    let currentIndex = 0;
    const typingSpeed = 50; // milliseconds per character

    const interval = setInterval(() => {
      if (currentIndex < targetText.length) {
        setDisplayedText(targetText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [step, isTyping, messages]);

  // Auto-start typing with delay only on first message
  useEffect(() => {
    const delay = step === 0 ? 2000 : 0; // Long delay for first message, immediate for second
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [step]);

  // Show buttons only after typing is done
  useEffect(() => {
    if (!isTyping && step === 1) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 300); // Small delay to ensure smooth transition
      return () => clearTimeout(timer);
    } else {
      setShowButtons(false);
    }
  }, [isTyping, step]);

  const handleNext = () => {
    if (step === 0) {
      // Backspace effect
      setIsTyping(false);
      setDisplayedText("");
      setTimeout(() => {
        setStep(1);
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
      {/* Attribution */}
      {/* <div className="toast hidden group-hover:flex opacity-40 z-50">
        <div className="alert alert-outline">
          <span>By David Fayemi</span>
        </div>
      </div> */}

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          top: ["0%", "20%", "0%"],
          left: ["0%", "10%", "0%"],
        }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"
      />
      <motion.div
        animate={{
          bottom: ["0%", "10%", "0%"],
          right: ["0%", "15%", "0%"],
        }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full opacity-10 blur-3xl"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            className="absolute w-1 h-1 bg-purple-300 rounded-full"
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Name at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-purple-300">
            Doyin
          </h1>
          <motion.div
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="h-1 bg-linear-to-r from-purple-400 to-pink-400 w-24 mx-auto mt-4"
          />
        </motion.div>

        {/* Typing text container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="min-h-32 flex items-center justify-center">
            <motion.p
              key={`text-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-purple-100 leading-relaxed"
            >
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-2 text-pink-400"
              >
                |
              </motion.span>
            </motion.p>
          </div>
        </motion.div>

        {/* Step 0: Next button */}
        <AnimatePresence>
          {step === 0 && !isTyping && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={handleNext}
              className="px-8 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next ✨
            </motion.button>
          )}
        </AnimatePresence>

        {/* Step 1: Yes/No buttons */}
        <AnimatePresence>
          {step === 1 &&
            !isTyping &&
            showButtons &&
            displayedText.length > 0 && (
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
              Yes! 🎉
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
