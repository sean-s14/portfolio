"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Chevron from "@/icons/chevron";
import { getProjects } from "@/app/projects/actions";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Exo_2 } from "next/font/google";

// Icons for skills
import ReactIcon from "@/icons/skills/react";
import ExpressIcon from "@/icons/skills/express";
import DjangoIcon from "@/icons/skills/django";
import NextIcon from "@/icons/skills/nextjs";
import TypescriptIcon from "@/icons/skills/typescript";
import JavaScriptIcon from "@/icons/skills/javascript";
import PythonIcon from "@/icons/skills/python";
import HTML5Icon from "@/icons/skills/html";
import CSS3Icon from "@/icons/skills/css";
import GitIcon from "@/icons/skills/git";
import NodeIcon from "@/icons/skills/nodejs";
import DockerIcon from "@/icons/skills/docker";
import KubernetesIcon from "@/icons/skills/kubernetes";

// Social Media Icons
import GmailIcon from "@/icons/social/gmail";
import TelegramIcon from "@/icons/social/telegram";
import LinkedInIcon from "@/icons/social/linkedin";
import GitHubIcon from "@/icons/social/github";

const exo2 = Exo_2({ subsets: ["latin"] });

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
    name: "Git",
    Icon: GitIcon,
  },
  {
    name: "Node.js",
    Icon: NodeIcon,
  },
  {
    name: "Docker",
    Icon: DockerIcon,
  },
  {
    name: "Kubernetes",
    Icon: KubernetesIcon,
  },
];

const socialIcons = [
  {
    name: "Gmail",
    Icon: GmailIcon,
    link: `mailto:${process.env.NEXT_PUBLIC_GMAIL}`,
  },
  {
    name: "LinkedIn",
    Icon: LinkedInIcon,
    link: `https://www.linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN}`,
  },
  {
    name: "Telegram",
    Icon: TelegramIcon,
    link: `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM}`,
  },
  {
    name: "GitHub",
    Icon: GitHubIcon,
    link: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB}`,
  },
];

const projectsBucket = supabase.storage.from("projects");

export default function Home() {
  return (
    <div className="min-h-full min-w-full flex flex-col items-center justify-center">
      {/* Home (Intro) */}
      <h2 className="hidden">Intro</h2>
      <Intro />

      {/* About */}
      <h2 className="hidden">About</h2>
      <About />

      {/* Projects */}
      <h2 className="hidden">Projects</h2>
      <Projects />

      {/* Contact */}
      <h2 className="hidden">Contact</h2>
      <Contact />
    </div>
  );
}

function Intro() {
  return (
    <section
      id="home"
      className="min-h-screen min-w-full flex flex-col items-start justify-center px-8 xs:px-16 sm:px-40"
      aria-label="Intro"
    >
      <motion.div
        variants={wordAnimation}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col gap-1 xs:gap-2 sm:gap-3"
      >
        {/* Name */}
        <h3 aria-label={name} tabIndex={0}>
          <div aria-hidden="true">
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="text-3xl xs:text-4xl sm:text-5xl"
                variants={characterAnimation}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </h3>

        {/* Title */}
        <h4 aria-label={title} tabIndex={0}>
          <div aria-hidden="true">
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="text-lg xs:text-xl sm:text-2xl text-gray-400"
                variants={characterAnimation}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </h4>

        {/* Description */}
        <div aria-label={description} tabIndex={0}>
          <motion.div
            variants={wordAnimation2}
            className="max-w-3xl"
            aria-hidden="true"
          >
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
        </div>

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
          aria-label="Down Arrow"
        >
          <a
            href="#about"
            className="border border-gray-100 rounded-full h-12 w-12 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100/30 transition-colors"
            aria-label="Scroll Down"
          >
            <Chevron className="fill-gray-100 w-1/2 mt-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const classNames = ["lg:mt-0", "lg:mt-24", "lg:mt-48"];

  return (
    <section
      id="about"
      className="min-h-screen min-w-full flex items-center justify-center px-4 sm:px-10"
      aria-label="About"
    >
      <div
        ref={ref}
        className="w-full flex gap-8 flex-wrap justify-center"
        aria-label="Skills"
      >
        {[
          { title: "Languages", icons: languageIcons },
          { title: "Frameworks", icons: frameworkIcons },
          { title: "Other", icons: otherIcons },
        ].map(({ title, icons }, index) => (
          <motion.div
            tabIndex={0}
            key={index}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, delay: 0.4 + index * 0.4 },
              },
            }}
            initial="hidden"
            animate={mainControls}
            className={`mt-0 ${classNames[index]} `}
            aria-label={title}
          >
            <Tilt className="w-52 sm:w-72 h-[300px] sm:h-[420px] rounded-lg border p-2 sm:p-4 px-4 sm:px-6 flex flex-col gap-4 sm:gap-7 text-lg shadow-md shadow-slate-400">
              <div aria-hidden="true">
                <h3
                  className="text-base sm:text-xl font-semibold text-center tracking-widest"
                  tabIndex={0}
                >
                  {title.toUpperCase()}
                </h3>
                <hr className="mt-2" />
              </div>
              {icons.map(({ name, Icon }, index) => (
                <div
                  key={`${name}-${index}`}
                  className="flex items-center gap-6"
                  aria-label={name}
                >
                  <Icon className="w-8 sm:w-10 fill-white" />
                  <span
                    className="text-sm sm:text-base"
                    aria-hidden="true"
                    tabIndex={0}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [projects, setProjects] = useState<
    | {
        id: string;
        title: string;
        slug: string;
        url: string;
        description: string | null;
        tags: string[];
        imageLinks: string[];
        createdAt: Date;
        updatedAt: Date;
      }[]
    | null
  >(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    const updateProjects = async () => {
      const projects = await getProjects();
      setProjects(projects);
    };
    updateProjects();
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen min-w-full flex flex-col items-center justify-center p-4 sm:p-8"
      aria-label="Projects"
    >
      <Link
        href="/projects"
        className={
          exo2.className +
          " text-xl tracking-widest mb-6 flex hover:text-blue-300 [&>svg]:hover:fill-blue-300 p-2 px-4 rounded"
        }
      >
        <span>VIEW ALL PROJECTS</span>
        <Chevron className="w-4 ml-2 fill-white -rotate-90" />
      </Link>

      {/* TODO: Add project name and description when hovering */}
      <div ref={ref} className="grid grid-cols-2 gap-4 sm:gap-8">
        {projects?.slice(0, 4).map((project, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, delay: 0.4 + index * 0.4 },
              },
            }}
            initial="hidden"
            animate={mainControls}
            className="relative [&>div]:hover:bg-black/30"
          >
            <div className="w-full h-full absolute top-0 left-0 pointer-events-none transition-colors duration-300"></div>
            <Link href={`/projects/${project.slug}`}>
              <Image
                key={`${project.title}-${index}`}
                src={
                  projectsBucket.getPublicUrl(`${project.slug}/main.png`).data
                    .publicUrl
                }
                alt={project.title + " website"}
                priority
                width={390}
                height={260}
                className="rounded-lg shadow-2xl shadow-neutral-950"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <section
      id="contact"
      className="min-h-screen min-w-full flex flex-col items-center justify-start pt-64"
      aria-label="Contact"
    >
      <div
        ref={ref}
        className="grid grid-cols-2 gap-10"
        aria-label="Contact Methods"
      >
        {socialIcons.map(({ name, Icon, link }, index) => (
          <motion.div
            key={`${name}-${index}`}
            variants={{
              hidden: { scale: 0 },
              visible: {
                scale: 1,
                transition: {
                  duration: 0.8,
                  delay: 0.4 + index * 0.4,
                  type: "spring",
                  ease: "easeOut",
                },
              },
            }}
            initial="hidden"
            animate={mainControls}
          >
            <Link
              aria-label={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 hover:scale-125 rounded-full cursor-pointer flex justify-center items-center transition-all"
              style={{
                boxShadow:
                  "0 20px 30px rgba(0, 0, 0, 0.2), inset -8px 15px 30px 5px rgba(255, 255, 255, 0.6)",
              }}
            >
              <Icon className="w-14 sm:w-20" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
