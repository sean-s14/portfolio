"use client";
import { motion } from "framer-motion";
import Chevron from "@/icons/chevron";

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
      staggerChildren: 0.035,
    },
  },
};

const wordAnimation2 = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.01,
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
      <h2 className="hidden">Intro</h2>
      <section
        id="home"
        className="min-h-screen min-w-full flex flex-col items-start justify-center border-b px-8 xs:px-16 sm:px-40"
      >
        <motion.div
          variants={wordAnimation}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col gap-1 xs:gap-2 sm:gap-3"
        >
          {/* Name */}
          <h3>
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="text-3xl xs:text-4xl sm:text-5xl"
                variants={characterAnimation}
              >
                {letter}
              </motion.span>
            ))}
          </h3>

          {/* Title */}
          <h4>
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="text-lg xs:text-xl sm:text-2xl text-gray-400"
                variants={characterAnimation}
              >
                {letter}
              </motion.span>
            ))}
          </h4>

          {/* Description */}
          <motion.div variants={wordAnimation2} className="max-w-3xl">
            {description.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="text-sm xs:text-base sm:text-lg text-gray-300"
                variants={characterAnimation}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Down Arrow */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 3 },
              },
            }}
            className="self-center mt-10 xs:mt-32"
          >
            <a
              href="#about"
              className="border border-gray-100 rounded-full h-12 w-12 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100/30 transition-colors"
            >
              <Chevron className="fill-gray-100 w-1/2 mt-1" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <h2 className="hidden">About</h2>
      <section
        id="about"
        className="min-h-screen min-w-full flex items-center justify-center border-b"
      >
        About
      </section>

      {/* Projects */}
      <h2 className="hidden">Projects</h2>
      <section
        id="projects"
        className="min-h-screen min-w-full flex items-center justify-center border-b"
      >
        Projects
      </section>

      {/* Contact */}
      <h2 className="hidden">Contact</h2>
      <section
        id="contact"
        className="min-h-screen min-w-full flex items-center justify-center border-b"
      >
        Contact
      </section>
    </div>
  );
}
