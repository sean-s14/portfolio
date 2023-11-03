"use client";

import { motion } from "framer-motion";
import Chevron from "@/icons/chevron";
import Tilt from "react-parallax-tilt";
import ReactIcon from "@/icons/skills/react";
import ExpressIcon from "@/icons/skills/express";
import DjangoIcon from "@/icons/skills/django";
import NextIcon from "@/icons/skills/nextjs";
import TypescriptIcon from "@/icons/skills/typescript";
import JavaScriptIcon from "@/icons/skills/javascript";
import PythonIcon from "@/icons/skills/python";
import HTML5Icon from "@/icons/skills/html";
import CSS3Icon from "@/icons/skills/css";
import NodeIcon from "@/icons/skills/nodejs";
import DockerIcon from "@/icons/skills/docker";
import GitIcon from "@/icons/skills/git";

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

const languageIcons = [
  {
    name: "TypeScript",
    Icon: TypescriptIcon,
  },
  {
    name: "JavaScript",
    Icon: JavaScriptIcon,
  },
  {
    name: "Python",
    Icon: PythonIcon,
  },
  {
    name: "HTML5",
    Icon: HTML5Icon,
  },
  {
    name: "CSS3",
    Icon: CSS3Icon,
  },
];

const frameworkIcons = [
  {
    name: "Next.js",
    Icon: NextIcon,
  },
  {
    name: "React.js",
    Icon: ReactIcon,
  },
  {
    name: "Express.js",
    Icon: ExpressIcon,
  },
  {
    name: "Django",
    Icon: DjangoIcon,
  },
];

const otherIcons = [
  {
    name: "Node.js",
    Icon: NodeIcon,
  },
  {
    name: "Docker",
    Icon: DockerIcon,
  },
  {
    name: "Git",
    Icon: GitIcon,
  },
];

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
        <div className="w-full flex gap-10 flex-wrap justify-center">
          {[
            { title: "Languages", icons: languageIcons },
            { title: "Frameworks", icons: frameworkIcons },
            { title: "Other", icons: otherIcons },
          ].map(({ title, icons }, index) => (
            <Tilt key={index}>
              <div className="w-64 h-[420px] rounded-lg border-2 p-4 px-6 flex flex-col gap-7 text-lg">
                <div>
                  <h3 className="text-xl font-semibold text-center">{title}</h3>
                  <hr className="mt-2" />
                </div>
                {icons.map(({ name, Icon }, index) => (
                  <div
                    key={`${name}-${index}`}
                    className="flex items-center gap-6"
                  >
                    <Icon className="w-10 fill-white" />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </Tilt>
          ))}
        </div>
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
