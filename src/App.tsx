import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Confetti from "react-confetti";
import { sendResponseEmail } from "./lib/supabase";

export default function App() {
  const [yesHovered, setYesHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [noScale, setNoScale] = useState(1);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const modalRef = useRef<HTMLDialogElement>(null);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNoClick = () => {
    // Send email asynchronously (fire and forget)
    sendResponseEmail("no");
    // Disappear immediately after 1 click
    setNoScale(0);
  };

  const handleYesClick = () => {
    // Send email asynchronously (fire and forget)
    sendResponseEmail("yes");
    // Show celebration modal
    modalRef.current?.showModal();
  };

  return (
    <div
      className="min-h-screen bg-base-100 relative overflow-hidden selection:bg-primary selection:text-primary-content group"
      data-theme="valentine"
    >
      <div className="toast hidden group-hover:flex opacity-40">
        <div className="alert alert-outline">
          <span>By David Fayemi</span>
        </div>
      </div>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 right-10 w-36 h-36 bg-accent rounded-full opacity-5 blur-3xl" />
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
            className="text-primary fill-primary"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Question Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-base-content mb-12 leading-tight"
        >
          Will you be my <span className="text-primary">valentine</span>?
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
          <AnimatePresence mode="popLayout">
            {noScale > 0 && (
              <motion.button
                key="no-button"
                onClick={handleNoClick}
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  scale: noScale,
                  opacity: noScale,
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.4,
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  mass: 1,
                }}
                className="btn btn-neutral origin-center"
              >
                No
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Celebration Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        {/* Confetti Background */}
        <Confetti width={windowSize.width} height={windowSize.height} />

        <div className="modal-box">
          <div className="text-center">
            {/* Beating Heart */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mb-6"
            >
              <Heart
                size={80}
                className="text-primary fill-primary mx-auto"
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Celebration Message */}
            <h2 className="text-4xl font-bold text-base-content mb-4">
              🎉 I LOVE YOU! 🎉
            </h2>

            {/* Modal Actions */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-primary">Close</button>
              </form>
            </div>
          </div>
        </div>

        {/* Backdrop for closing modal on outside click */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
