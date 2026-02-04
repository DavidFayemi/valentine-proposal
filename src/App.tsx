import { useState, useEffect } from "react";
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
    // Update on resize
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial window size
    handleResize();

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
            className="relative modal-box bg-base-100 max-w-2xl w-full"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X size={24} />
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
                className="btn btn-primary transition-all duration-300"
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
    // Disappear immediately after 1 click
    setNoScale(0);
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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
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
            animate={{
              scale: isMobile && yesHovered ? 1.15 : 1 + (1 - noScale) * 0.75,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              mass: 1.2,
            }}
            className="btn btn-primary transition-all duration-500 text-lg px-8 sm:px-10 py-4"
          >
            <motion.span
              animate={
                yesHovered && !isMobile ? { scale: [1, 1.15, 1] } : { scale: 1 }
              }
              transition={{
                repeat: yesHovered && !isMobile ? Infinity : 0,
                duration: 1.5,
              }}
            >
              💕 Yes!
            </motion.span>
          </motion.button>

          {/* No Button - Shrinks and disappears */}
          <AnimatePresence>
            {noScale > 0 && (
              <motion.button
                onClick={handleNoClick}
                animate={{
                  scale: noScale,
                  opacity: noScale > 0.2 ? 1 : noScale / 0.2,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  duration: 0.3,
                }}
                className="btn btn-neutral transition-all duration-300 origin-center"
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
