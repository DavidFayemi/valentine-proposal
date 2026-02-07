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
      className="min-h-screen bg-linear-to-br from-red-50 via-amber-50 to-red-100 relative overflow-hidden selection:bg-red-700 selection:text-white group mx-auto max-w-390"
      data-theme="autumn"
    >
      {/* Attribution */}
      {/* <div className="toast hidden group-hover:flex opacity-40 z-50">
        <div className="alert alert-outline">
          <span>By David Fayemi</span>
        </div>
      </div> */}

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
              backgroundColor: "#6b1f23",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.45, filter: "grayscale(40%) contrast(0.95)" }}
              src="/VID-20260207-WA0006.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#6b1f23",
            }}
          >
            <img
              alt="memory"
              className="w-full h-full object-cover"
              style={{ opacity: 0.45, filter: "grayscale(45%) contrast(0.9)" }}
              src="/IMG-20260207-WA0008.jpg"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 5",
              gridRow: "span 2",
              backgroundColor: "#6b1f23",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.42, filter: "grayscale(50%) contrast(0.9)" }}
              src="/VID-20260207-WA0011.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          {/* Row 3 */}
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#6b1f23",
            }}
          >
            <img
              alt="memory"
              className="w-full h-full object-cover"
              style={{ opacity: 0.4, filter: "grayscale(55%) contrast(0.9)" }}
              src="/IMG-20260207-WA0009.jpg"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#6b1f23",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.4, filter: "grayscale(50%) contrast(0.9)" }}
              src="/VID-20260207-WA0013.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#6b1f23",
            }}
          >
            <img
              alt="memory"
              className="w-full h-full object-cover"
              style={{ opacity: 0.38, filter: "grayscale(60%) contrast(0.85)" }}
              src="/IMG-20260207-WA0010.jpg"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          {/* Row 5 */}
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 2",
              gridRow: "span 2",
              backgroundColor: "#6b1f23",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.42, filter: "grayscale(48%) contrast(0.92)" }}
              src="/VID-20260207-WA0014.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 3",
              gridRow: "span 2",
              backgroundColor: "#6b1f23",
            }}
          >
            <img
              alt="memory"
              className="w-full h-full object-cover"
              style={{ opacity: 0.41, filter: "grayscale(52%) contrast(0.88)" }}
              src="/IMG-20260207-WA0012.jpg"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 3",
              gridRow: "span 2",
              backgroundColor: "#6b1f23",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.44, filter: "grayscale(42%) contrast(0.93)" }}
              src="/VID-20260207-WA0015.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: "#6b1f23",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.39, filter: "grayscale(58%) contrast(0.87)" }}
              src="/VID-20260207-WA0016.mp4"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      </div>

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
              className="text-white"
              fill="#c10007"
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
          <div className="mx-auto max-w-3xl w-full backdrop-blur-md bg-white/20 border border-white/10 rounded-3xl p-6 md:p-10 shadow-lg">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 leading-tight"
            >
              Will You Be
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2"
            >
              My Valentine?
            </motion.h2>
          </div>
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
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-lg font-bold text-lg shadow-lg"
                style={{
                  borderWidth: "3px",
                  backgroundColor: getNoButtonColor().color,
                  color: "white",
                  padding: "14px 48px",
                  borderColor: getNoButtonColor().borderColor,
                }}
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
