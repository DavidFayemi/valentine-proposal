import { useState, useRef, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [yesHovered, setYesHovered] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
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

  const handleYesClick = () => {
    alert("Yay! You made me the happiest! 💕");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
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

        {/* Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 relative"
        >
          {/* Yes Button */}
          <motion.button
            onClick={handleYesClick}
            onHoverStart={() => setYesHovered(true)}
            onHoverEnd={() => setYesHovered(false)}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            animate={isMobile && yesHovered ? { scale: 1.15 } : { scale: 1 }}
            className={`px-8 sm:px-10 py-4 text-lg sm:text-xl font-bold rounded-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${
              yesHovered && !isMobile
                ? "bg-pink-500 text-white"
                : "bg-gradient-to-r from-pink-400 to-rose-400 text-white hover:from-pink-500 hover:to-rose-500"
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

          {/* No Button */}
          <motion.button
            ref={noButtonRef}
            onMouseEnter={handleNoMouseEnter}
            onClick={() => alert("Don't be shy! Give it another thought 😊")}
            animate={
              isMobile && yesHovered
                ? { scale: 0.7, opacity: 0.5 }
                : isMobile
                  ? { scale: 1, opacity: 1 }
                  : { x: noPosition.x, y: noPosition.y }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="px-8 sm:px-10 py-4 text-lg sm:text-xl font-bold rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 hover:from-gray-400 hover:to-gray-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
          >
            No
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
