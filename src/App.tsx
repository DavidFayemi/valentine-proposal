import { useState, useRef, useEffect } from "react";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Confetti from "react-confetti";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Update on resize
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          data-theme="caramellate"
        >
          {/* Confetti Background */}
          <Confetti width={windowSize.width} height={windowSize.height} />

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 z-10"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={24} className="text-gray-600" />
            </motion.button>

            {/* Content */}
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mb-6"
              >
                <Heart
                  size={80}
                  className="text-pink-500 fill-pink-500 mx-auto"
                  strokeWidth={1.5}
                />
              </motion.div>

              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                🎉 Yay! 🎉
              </h2>

              <p className="text-xl text-gray-600 mb-8">
                You've made me the happiest person! I love you so much! 💕
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-rose-600 transition shadow-lg"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [yesHovered, setYesHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [noScale, setNoScale] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNoClick = () => {
    // Shrink more dramatically (~50% each click, disappears after ~2 clicks)
    const newScale = noScale * 0.5;
    setNoScale(newScale);
  };

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-rose-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 right-10 w-36 h-36 bg-pink-300 rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Main Content */}
      <div
        ref={containerRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8"
      >
        {/* Heart Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <Heart
            size={120}
            className="text-pink-500 fill-pink-500"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Question Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-gray-800 mb-12 leading-tight"
        >
          Will you be my <span className="text-pink-500">valentine</span>?
        </motion.h1>

        {/* Buttons Container - Dynamic sizing based on no scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`relative flex items-center justify-center ${
            noScale < 0.1
              ? "flex-col w-full max-w-md"
              : "flex-col sm:flex-row gap-4 sm:gap-6"
          }`}
        >
          {/* Yes Button */}
          <motion.button
            onClick={handleYesClick}
            onHoverStart={() => setYesHovered(true)}
            onHoverEnd={() => setYesHovered(false)}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            animate={{
              scale: isMobile && yesHovered ? 1.15 : 1 + (1 - noScale) * 0.75,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`font-bold rounded-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl bg-linear-to-r from-pink-400 to-rose-400 text-white hover:from-pink-500 hover:to-rose-500 px-8 sm:px-10 py-4 text-lg sm:text-xl`}
          >
            <motion.span
              animate={yesHovered && !isMobile ? { scale: [1, 1.15, 1] } : {}}
              transition={{
                repeat: yesHovered && !isMobile ? Infinity : 0,
                // duration: 1.5,
              }}
            >
              💕 Yes!
            </motion.span>
          </motion.button>

          {/* No Button - Shrinks and disappears */}
          <AnimatePresence>
            {noScale > 0.05 && (
              <motion.button
                ref={noButtonRef}
                onClick={handleNoClick}
                animate={{
                  scale: noScale,
                  opacity: noScale > 0.2 ? 1 : noScale / 0.2,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="px-8 sm:px-10 py-4 text-lg sm:text-xl font-bold rounded-lg bg-linear-to-r from-gray-300 to-gray-400 text-gray-700 hover:from-gray-400 hover:to-gray-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl origin-center"
              >
                No
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
