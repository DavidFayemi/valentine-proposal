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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Confetti Background */}
          <Confetti width={windowSize.width} height={windowSize.height} />

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
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

              <p className="text-xl text-gray-600 mb-6">
                You've made me the happiest person! I love you so much! 💕
              </p>

              {/* Video Container */}
              <div className="mb-6 rounded-lg overflow-hidden bg-gray-900">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Celebration Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

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
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [noScale, setNoScale] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const MAX_NO_PRESSES = 15;

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle no button movement on desktop
  const handleNoMouseEnter = () => {
    if (isMobile) return;

    if (!noButtonRef.current || !containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Generate random position within container bounds
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setNoPosition({ x: randomX, y: randomY });
  };

  const handleNoClick = () => {
    // Calculate new scale (shrink by 8% each click)
    const newScale = noScale * 0.92;

    if (newScale > 0.05) {
      setNoScale(newScale);
    }
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
            animate={
              isMobile && yesHovered
                ? { scale: 1.15 }
                : noScale < 0.1
                  ? { scale: Math.min(1.5, 1 + (1 - noScale) * 0.5) }
                  : { scale: 1 + (1 - noScale) * 0.2 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`font-bold rounded-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${
              yesHovered && !isMobile
                ? "bg-pink-500 text-white px-8 sm:px-10 py-4 text-lg sm:text-xl"
                : "bg-linear-to-r from-pink-400 to-rose-400 text-white hover:from-pink-500 hover:to-rose-500 px-8 sm:px-10 py-4 text-lg sm:text-xl"
            }`}
          >
            {yesHovered && !isMobile ? (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                Yes! 💕
              </motion.span>
            ) : (
              "Yes!"
            )}
          </motion.button>

          {/* No Button - Shrinks and disappears */}
          <AnimatePresence>
            {noScale > 0.05 && (
              <motion.button
                ref={noButtonRef}
                onMouseEnter={handleNoMouseEnter}
                onClick={handleNoClick}
                animate={
                  isMobile && yesHovered
                    ? { scale: 0.7, opacity: 0.5 }
                    : isMobile
                      ? { scale: 1, opacity: 1 }
                      : { x: noPosition.x, y: noPosition.y, scale: noScale }
                }
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-8 sm:px-10 py-4 text-lg sm:text-xl font-bold rounded-lg bg-linear-to-r from-gray-300 to-gray-400 text-gray-700 hover:from-gray-400 hover:to-gray-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl origin-center"
              >
                No
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center text-gray-600 text-sm sm:text-base max-w-md"
        >
          (The "No" button doesn't work anyway 😉)
        </motion.p>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
