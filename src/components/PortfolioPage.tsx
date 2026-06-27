"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Github,
  Mail,
  Code2,
  Database,
  Brain,
  ExternalLink,
  Star,
  GitFork,
  CalendarDays,
} from "lucide-react";
import { featuredProjects } from "@/data/projects";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
};

const skills = {
  "Data Science": [
    "Python",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Machine Learning",
    "NLP",
    "Data Visualization",
  ],
  "Web Development": [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
  ],
  Tools: ["GitHub", "Vercel", "Google Colab", "Jupyter Notebook", "VS Code"],
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white/50">
      {children}
    </div>
  );
}

export default function PortfolioPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      try {
        const response = await fetch("/api/github");
        const data = await response.json();
        setRepos(data.repos || []);
      } catch {
        setRepos([]);
      } finally {
        setIsLoadingRepos(false);
      }
    }

    loadRepos();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="text-sm font-semibold tracking-tight">
            Ilham.
          </a>

          <div className="hidden items-center gap-7 text-sm text-white/60 md:flex">
            <a className="transition hover:text-white" href="#about">
              About
            </a>
            <a className="transition hover:text-white" href="#projects">
              Projects
            </a>
            <a className="transition hover:text-white" href="#github">
              GitHub
            </a>
            <a className="transition hover:text-white" href="#skills">
              Skills
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-white/30 hover:bg-white hover:text-black"
          >
            Let&apos;s Talk
          </a>
        </div>
      </nav>

      <section
        id="home"
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-28 md:px-8"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60">
              Data Science & Web Development Portfolio
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
              Ilham Akbar Jamil
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
              I build clean digital products and data-driven solutions by
              combining machine learning, analytics, and modern web technology.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
              >
                View Projects
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#github"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:bg-white/[0.06]"
              >
                <Github size={17} />
                GitHub Repositories
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-white/5">
              <div className="h-full rounded-[2rem] border border-white/10 bg-black/80 p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-white/25" />
                    <span className="h-3 w-3 rounded-full bg-white/15" />
                    <span className="h-3 w-3 rounded-full bg-white/10" />
                  </div>
                  <span className="text-xs text-white/35">portfolioOS</span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <Database className="mb-5 text-white/70" size={26} />
                    <p className="text-sm text-white/50">Focus Area</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                      Data Science
                    </h3>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <Code2 className="mb-5 text-white/70" size={26} />
                    <p className="text-sm text-white/50">Development</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                      Modern Web
                    </h3>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <Brain className="mb-5 text-white/70" size={26} />
                    <p className="text-sm text-white/50">Approach</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                      Clean & Analytical
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel>About</SectionLabel>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Minimal interface. Strong technical direction.
          </h2>

          <div className="space-y-6 text-lg leading-8 text-white/60">
            <p>
              I am focused on building practical solutions in Data Science and
              Web Development. My work combines data analysis, machine learning,
              NLP, and clean interface development to create products that are
              useful, structured, and easy to understand.
            </p>
            <p>
              This portfolio is designed to present selected projects in a
              professional way: not crowded, not over-decorated, and focused on
              clarity, execution, and technical value.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel>Featured Projects</SectionLabel>

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Selected work across data and web.
          </h2>
          <p className="max-w-md text-white/55">
            A curated set of projects showing technical direction, problem
            solving, and implementation quality.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/25 hover:bg-white/[0.055]"
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">
                  {project.category}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
                  {project.status}
                </span>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight">
                {project.title}
              </h3>

              <p className="mt-4 leading-7 text-white/55">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-2 text-sm text-white/50">
                {project.highlights.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>

              <div className="mt-7 flex gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  <Github size={16} />
                  GitHub
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="github" className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel>GitHub</SectionLabel>

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Latest public repositories.
          </h2>
          <p className="max-w-md text-white/55">
            This section connects directly to your GitHub account and displays
            recently updated public repositories.
          </p>
        </div>

        {isLoadingRepos ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-white/50">
            Loading GitHub repositories...
          </div>
        ) : repos.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-white/50">
            GitHub repositories are not available yet. Check your{" "}
            <span className="text-white">GITHUB_USERNAME</span> inside{" "}
            <span className="text-white">.env.local</span>.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/25 hover:bg-white/[0.055]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <Github className="text-white/55" size={22} />
                  <ArrowUpRight
                    className="text-white/30 transition group-hover:text-white"
                    size={20}
                  />
                </div>

                <h3 className="text-xl font-semibold tracking-tight">
                  {repo.name}
                </h3>

                <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-white/50">
                  {repo.description || "No description provided."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/45">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="inline-flex items-center gap-1">
                    <Star size={13} />
                    {repo.stars}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork size={13} />
                    {repo.forks}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-white/35">
                  <CalendarDays size={13} />
                  Updated {formatDate(repo.updatedAt)}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </section>

      <section id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel>Skills</SectionLabel>

        <div className="mb-12">
          <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Technical stack with practical focus.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {Object.entries(skills).map(([group, items]) => (
            <div
              key={group}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6"
            >
              <h3 className="mb-5 text-xl font-semibold">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/[0.06] px-3 py-2 text-sm text-white/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <SectionLabel>Contact</SectionLabel>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Let&apos;s build something clean and useful.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">
                Open for collaboration, project discussion, and opportunities
                related to data science, machine learning, and modern web
                development.
              </p>
            </div>

            <div className="flex flex-col justify-end gap-3">
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center justify-between rounded-full border border-white/10 px-5 py-4 text-white/70 transition hover:border-white/25 hover:text-white"
              >
                <span className="inline-flex items-center gap-3">
                  <Mail size={18} />
                  Email
                </span>
                <ArrowUpRight size={18} />
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-full border border-white/10 px-5 py-4 text-white/70 transition hover:border-white/25 hover:text-white"
              >
                <span className="inline-flex items-center gap-3">
                  <Github size={18} />
                  GitHub
                </span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-center text-sm text-white/35 md:px-8">
        © {new Date().getFullYear()} Ilham Akbar Jamil. Built with Next.js.
      </footer>
    </main>
  );
}