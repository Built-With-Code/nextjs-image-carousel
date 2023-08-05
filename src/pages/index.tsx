import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import Left from "../../public/left.svg";
import Right from "../../public/right.svg";

const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const onPrevClick = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const onNextClick = () => {
    if (current < images.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
        <div className="relative w-full max-w-[1500px] flex items-center">
          {/* Left/right controls */}
          <AnimatePresence>
            {isFocus && (
              <motion.div
                className="absolute left-2 right-2 flex justify-between z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onHoverStart={() => setIsFocus(true)}
                onHoverEnd={() => setIsFocus(false)}
              >
                <button onClick={onPrevClick}>
                  <Left className="h-8 w-8" />
                </button>
                <button onClick={onNextClick}>
                  <Right className="h-8 w-8" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* List of images */}
          <motion.div
            className="flex gap-4 flex-nowrap"
            animate={{ x: `calc(-${current * 100}% - ${current}rem)` }}
            onHoverStart={() => setIsFocus(true)}
            onHoverEnd={() => setIsFocus(false)}
          >
            {[...images].map((image, idx) => (
              <motion.img
                key={idx}
                src={image}
                alt={image}
                animate={{ opacity: idx === current ? 1 : 0.3 }}
                className="aspect-[16/9] object-cover"
              />
            ))}
          </motion.div>
          {/* Controll pill */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex gap-3 px-3 py-2 bg-gray-400 rounded-full opacity-80">
              {[...images].map((_, idx) => (
                <button key={idx} onClick={() => setCurrent(idx)}>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      idx === current ? "bg-white" : "bg-zinc-600"
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </MotionConfig>
    </main>
  );
}
