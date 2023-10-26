"use client";
import { motion } from "framer-motion";

const name = "Sean Stocker";
const title = "Full Stack Web Developer";
const description =
  "A web developer with a passion for high-quality, visually appealing websites. Committed to continuous learning and staying up-to-date with the latest web develepment trends and technologies.";

const wordAnimation = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.04,
    },
  },
};

const wordAnimation2 = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.015,
    },
  },
};

const characterAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  return (
    <div className="min-h-full min-w-full flex flex-col items-center justify-center">
      {/* Home (Intro) */}
      <section
        id="home"
        className="min-h-screen min-w-full flex items-center justify-center border-b"
      >
        <motion.div
          variants={wordAnimation}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 max-w-xl -translate-y-28"
        >
          {/* Name */}
          <div>
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="text-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                variants={characterAnimation}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Title */}
          <div>
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="text-2xl text-gray-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                variants={characterAnimation}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Description */}
          <motion.div variants={wordAnimation2}>
            {description.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="text-lg text-gray-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                variants={characterAnimation}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section
        id="about"
        className="min-h-screen min-w-full flex items-center justify-center border-b"
      >
        About
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="min-h-screen min-w-full flex items-center justify-center border-b"
      >
        Projects
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="min-h-screen min-w-full flex items-center justify-center border-b"
      >
        Contact
      </section>
    </div>
  );
}
