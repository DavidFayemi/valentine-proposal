import { useState, useRef } from "react";
import { Sparkles, Gift } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { sendResponseEmail } from "./lib/supabase";

// Pre-generate random values to avoid purity issues
const generateLeafPositions = () => {
  return [...Array(8)].map(() => ({
    left: Math.random() * 100,
    duration: 8 + Math.random() * 4,
  }));
};

const leafPositions = generateLeafPositions();

export default function AutumnProposal() {
  const [noClickCount, setNoClickCount] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleNoClick = () => {
    const newClickCount = noClickCount + 1;
    setNoClickCount(newClickCount);

    // Send email asynchronously only on final disappearance
    if (newClickCount >= 3) {
      sendResponseEmail("no");
    }
  };

  const getNoButtonText = () => {
    switch (noClickCount) {
      case 0:
        return "Not yet";
      case 1:
        return "Think again 🥺?";
      case 2:
        return "Babe nauuuuu 😭";
      default:
        return "Nope";
    }
  };

  const getNoButtonColor = () => {
    switch (noClickCount) {
      case 0:
        return { borderColor: "#8b2e2e", color: "#8b2e2e" };
      case 1:
        return { borderColor: "#6b1f23", color: "#6b1f23" };
      case 2:
        return { borderColor: "#4a1419", color: "#4a1419" };
      default:
        return { borderColor: "#8b2e2e", color: "#8b2e2e" };
    }
  };

  const handleYesClick = () => {
    // Send email asynchronously
    sendResponseEmail("yes");
    // Show celebration modal with fireworks
    modalRef.current?.showModal();

    // Trigger fireworks effect
    setTimeout(() => {
      // Fireworks burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ["star"],
        colors: ["#8b4513", "#a0522d", "#b22222", "#8b2e2e"],
      });

      // Additional burst
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.4 },
          shapes: ["circle"],
          colors: ["#c41e3a", "#d4744a", "#a64d4d"],
        });
      }, 100);
    }, 300);
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-red-50 via-amber-50 to-red-100 relative overflow-hidden selection:bg-red-700 selection:text-white group"
      data-theme="autumn"
    >
      {/* Attribution */}
      {/* <div className="toast hidden group-hover:flex opacity-40 z-50">
        <div className="alert alert-outline">
          <span>By David Fayemi</span>
        </div>
      </div> */}

      {/* Decorative Leaves - Falling Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {leafPositions.map((leaf, i) => (
          <motion.div
            key={i}
            initial={{ top: -20, left: `${leaf.left}%`, opacity: 0 }}
            animate={{
              top: "100vh",
              left: `${leaf.left}%`,
              opacity: [0, 1, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute text-3xl"
          >
            💗
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-48 h-48 bg-linear-to-br from-red-600 to-transparent rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-32 right-16 w-56 h-56 bg-linear-to-br from-red-700 to-transparent rounded-full opacity-15 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-linear-to-br from-amber-700 to-transparent rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Animated Gift Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="mb-8"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Gift
              size={100}
              className="text-red-700"
              fill="currentColor"
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>

        {/* Question Text - Staggered animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-red-700 via-red-600 to-red-800 mb-4 leading-tight"
          >
            Will You Be
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-red-800 mb-2"
          >
            My Valentine?
          </motion.h2>
          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg sm:text-xl text-red-900 mt-4 font-medium"
          >
            Let's make this season unforgettable ✨
          </motion.p> */}
        </motion.div>

        {/* Buttons Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-xl"
        >
          {/* Yes Button - Grows and glows */}
          <motion.button
            onClick={handleYesClick}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 30px rgba(196, 30, 58, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-lg relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #8b2e2e 0%, #c41e3a 100%)",
              color: "white",
              border: "none",
              fontSize: "1.125rem",
              fontWeight: "bold",
              padding: "12px 40px",
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
              className="relative flex items-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Sparkles size={20} />
              Absolutely my loveeeeeee! 💗
            </motion.span>
          </motion.button>

          {/* No Button - Changes text and gets darker */}
          <AnimatePresence mode="popLayout">
            {noClickCount < 3 && (
              <motion.button
                key={`no-button-${noClickCount}`}
                onClick={handleNoClick}
                initial={{ scale: 1, opacity: 1, rotate: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                }}
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
                  mass: 1,
                }}
                className="btn btn-outline btn-lg"
                style={getNoButtonColor()}
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
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Celebration Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative z-10 bg-linear-to-b from-red-100 to-red-200 border-2 border-red-700">
          <div className="text-center">
            {/* Celebration GIF */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              className="mb-6"
            >
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcndtaDlreWN3OGZneHRzNW5qcDN6N2x4c3AxdTQ4d2tzbmd4YW9saCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ddHhhUBn25cuQ/giphy.gif"
                alt="Celebration"
                className="w-32 h-32 mx-auto rounded-lg"
              />
            </motion.div>

            {/* Celebration Message */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-red-700 to-red-900 mb-3"
            >
              Get in joor! 🎉
            </motion.h2>

            {/* <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-red-900 mb-6 font-semibold"
            >
              You just made me the happiest person alive!
            </motion.p> */}

            {/* Animated falling emojis */}
            {/* <div className="relative h-24 overflow-hidden mb-6">
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
                  {i % 3 === 0 ? "🍂" : i % 3 === 1 ? "❤️" : "✨"}
                </motion.div>
              ))}
            </div> */}

            {/* Modal Actions */}
            <div className="modal-action justify-center">
              <form method="dialog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #8b2e2e 0%, #c41e3a 100%)",
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
