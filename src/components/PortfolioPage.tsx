"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  Code2,
  Database,
  Brain,
  ExternalLink,
  Star,
  GitFork,
  CalendarDays,
  Sun,
  Moon,
} from "lucide-react";
import { featuredProjects } from "@/data/projects";

type Theme = "dark" | "light";

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
  "Sains Data": [
    "Python",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Machine Learning",
    "NLP",
    "Visualisasi Data",
  ],
  "Pengembangan Web": [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
  ],
  Alat: ["GitHub", "Vercel", "Google Colab", "Jupyter Notebook", "VS Code"],
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getThemeClasses(theme: Theme) {
  const isDark = theme === "dark";

  return {
    page: isDark
      ? "bg-black text-white"
      : "bg-[#f5f5f7] text-[#111111]",

    glow: isDark
      ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]"
      : "bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.06),transparent_30%)]",

    nav: isDark
      ? "border-white/10 bg-black/60"
      : "border-black/10 bg-[#f5f5f7]/75",

    textMuted: isDark ? "text-white/60" : "text-black/60",
    textSoft: isDark ? "text-white/50" : "text-black/50",
    textVerySoft: isDark ? "text-white/35" : "text-black/35",

    border: isDark ? "border-white/10" : "border-black/10",

    panel: isDark
      ? "border-white/10 bg-white/[0.035]"
      : "border-black/10 bg-white/80 shadow-sm shadow-black/5",

    panelHover: isDark
      ? "hover:border-white/25 hover:bg-white/[0.055]"
      : "hover:border-black/20 hover:bg-white",

    softPanel: isDark
      ? "border-white/10 bg-white/[0.04]"
      : "border-black/10 bg-white/75 shadow-sm shadow-black/5",

    softChip: isDark
      ? "border-white/10 bg-white/[0.04] text-white/60"
      : "border-black/10 bg-white/80 text-black/60",

    tinyChip: isDark
      ? "border-white/10 text-white/55"
      : "border-black/10 text-black/55",

    statusChip: isDark
      ? "bg-white text-black"
      : "bg-black text-white",

    skillChip: isDark
      ? "bg-white/[0.06] text-white/60"
      : "bg-black/[0.05] text-black/60",

    primaryButton: isDark
      ? "bg-white text-black hover:bg-white/85"
      : "bg-black text-white hover:bg-black/85",

    secondaryButton: isDark
      ? "border-white/15 text-white/80 hover:border-white/30 hover:bg-white/[0.06]"
      : "border-black/15 text-black/80 hover:border-black/30 hover:bg-black/[0.04]",

    navButton: isDark
      ? "border-white/15 text-white/80 hover:border-white/30 hover:bg-white hover:text-black"
      : "border-black/15 text-black/80 hover:border-black/30 hover:bg-black hover:text-white",

    footer: isDark ? "border-white/10 text-white/35" : "border-black/10 text-black/35",

    deviceOuter: isDark
      ? "border-white/10 bg-white/[0.04] shadow-white/5"
      : "border-black/10 bg-white/80 shadow-black/10",

    deviceInner: isDark
      ? "border-white/10 bg-black/80"
      : "border-black/10 bg-[#f5f5f7]",

    dot1: isDark ? "bg-white/25" : "bg-black/25",
    dot2: isDark ? "bg-white/15" : "bg-black/15",
    dot3: isDark ? "bg-white/10" : "bg-black/10",
  };
}

function SectionLabel({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  const ui = getThemeClasses(theme);

  return (
    <div
      className={`mb-5 inline-flex rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] ${ui.softChip}`}
    >
      {children}
    </div>
  );
}

export default function PortfolioPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isMounted, setIsMounted] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);

  const ui = getThemeClasses(theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const nextTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : systemPrefersDark
          ? "dark"
          : "light";

    const frameId = window.requestAnimationFrame(() => {
      setTheme(nextTheme);
      setIsMounted(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme, isMounted]);

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

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return (
    <main className={`min-h-screen transition-colors duration-500 ${ui.page}`}>
      <div className={`pointer-events-none fixed inset-0 z-0 ${ui.glow}`} />

      <nav
        className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-500 ${ui.nav}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="text-sm font-semibold tracking-tight">
            Ilham.
          </a>

          <div className={`hidden items-center gap-7 text-sm md:flex ${ui.textMuted}`}>
            <a className="transition hover:opacity-100" href="#about">
              Tentang
            </a>
            <a className="transition hover:opacity-100" href="#projects">
              Proyek
            </a>
            <a className="transition hover:opacity-100" href="#github">
              GitHub
            </a>
            <a className="transition hover:opacity-100" href="#skills">
              Keahlian
            </a>
            <a className="transition hover:opacity-100" href="#contact">
              Kontak
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition ${ui.secondaryButton}`}
              aria-label="Ganti tema"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              <span className="hidden sm:inline">
                {theme === "dark" ? "Terang" : "Gelap"}
              </span>
            </button>

            <a
              href="#contact"
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${ui.navButton}`}
            >
              Mari Bicara
            </a>
          </div>
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
            <div
              className={`mb-6 inline-flex rounded-full border px-4 py-2 text-sm ${ui.softChip}`}
            >
              Portofolio Sains Data & Pengembangan Web
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] md:text-7xl lg:text-8xl">
              Ilham Akbar Jamil
            </h1>

            <p className={`mt-7 max-w-2xl text-lg leading-8 md:text-xl ${ui.textMuted}`}>
              Saya membangun produk digital yang rapi dan solusi berbasis data
              dengan menggabungkan machine learning, analitik, dan teknologi web
              modern.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${ui.primaryButton}`}
              >
                Lihat Proyek
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#github"
                className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition ${ui.secondaryButton}`}
              >
                <Code2 size={17} />
                Repositori GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            <div
              className={`relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2.5rem] border p-4 shadow-2xl ${ui.deviceOuter}`}
            >
              <div className={`h-full rounded-[2rem] border p-5 ${ui.deviceInner}`}>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className={`h-3 w-3 rounded-full ${ui.dot1}`} />
                    <span className={`h-3 w-3 rounded-full ${ui.dot2}`} />
                    <span className={`h-3 w-3 rounded-full ${ui.dot3}`} />
                  </div>
                  <span className={`text-xs ${ui.textVerySoft}`}>portfolioOS</span>
                </div>

                <div className="space-y-4">
                  <div className={`rounded-3xl border p-5 ${ui.softPanel}`}>
                    <Database className={ui.textMuted} size={26} />
                    <p className={`mt-5 text-sm ${ui.textSoft}`}>Fokus Utama</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                      Sains Data
                    </h3>
                  </div>

                  <div className={`rounded-3xl border p-5 ${ui.softPanel}`}>
                    <Code2 className={ui.textMuted} size={26} />
                    <p className={`mt-5 text-sm ${ui.textSoft}`}>Pengembangan</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                      Web Modern
                    </h3>
                  </div>

                  <div className={`rounded-3xl border p-5 ${ui.softPanel}`}>
                    <Brain className={ui.textMuted} size={26} />
                    <p className={`mt-5 text-sm ${ui.textSoft}`}>Pendekatan</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                      Rapi & Analitis
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel theme={theme}>Tentang</SectionLabel>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Antarmuka minimal. Arah teknis yang kuat.
          </h2>

          <div className={`space-y-6 text-lg leading-8 ${ui.textMuted}`}>
            <p>
              Saya berfokus membangun solusi praktis di bidang Sains Data dan
              Pengembangan Web. Pekerjaan saya menggabungkan analisis data,
              machine learning, NLP, dan pengembangan antarmuka yang rapi untuk
              menciptakan produk yang berguna, terstruktur, dan mudah dipahami.
            </p>
            <p>
              Portofolio ini dirancang untuk menampilkan proyek pilihan secara
              profesional: tidak ramai, tidak berlebihan, dan berfokus pada
              kejelasan, eksekusi, serta nilai teknis.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel theme={theme}>Proyek Unggulan</SectionLabel>

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Karya pilihan di bidang data dan web.
          </h2>
          <p className={`max-w-md ${ui.textMuted}`}>
            Kumpulan proyek terkurasi yang menunjukkan arah teknis, pemecahan
            masalah, dan kualitas implementasi.
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
              className={`group rounded-[2rem] border p-6 transition ${ui.panel} ${ui.panelHover}`}
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <span className={`rounded-full border px-3 py-1 text-xs ${ui.tinyChip}`}>
                  {project.category}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${ui.statusChip}`}>
                  {project.status}
                </span>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight">
                {project.title}
              </h3>

              <p className={`mt-4 leading-7 ${ui.textMuted}`}>
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full px-3 py-1 text-xs ${ui.skillChip}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className={`mt-6 space-y-2 text-sm ${ui.textSoft}`}>
                {project.highlights.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>

              <div className="mt-7 flex gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${ui.secondaryButton}`}
                >
                  <Code2 size={16} />
                  GitHub
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${ui.secondaryButton}`}
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="github" className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel theme={theme}>GitHub</SectionLabel>

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Repositori publik terbaru.
          </h2>
          <p className={`max-w-md ${ui.textMuted}`}>
            Bagian ini terhubung langsung ke akun GitHub dan menampilkan
            repositori publik yang baru diperbarui.
          </p>
        </div>

        {isLoadingRepos ? (
          <div className={`rounded-[2rem] border p-8 ${ui.panel} ${ui.textSoft}`}>
            Memuat repositori GitHub...
          </div>
        ) : repos.length === 0 ? (
          <div className={`rounded-[2rem] border p-8 ${ui.panel} ${ui.textSoft}`}>
            Repositori GitHub belum tersedia. Periksa{" "}
            <span className="font-medium">GITHUB_USERNAME</span> di dalam{" "}
            <span className="font-medium">.env.local</span>.
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
                className={`group rounded-[2rem] border p-6 transition ${ui.panel} ${ui.panelHover}`}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <Code2 className={ui.textMuted} size={22} />
                  <ArrowUpRight className={`${ui.textVerySoft} transition`} size={20} />
                </div>

                <h3 className="text-xl font-semibold tracking-tight">
                  {repo.name}
                </h3>

                <p className={`mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 ${ui.textSoft}`}>
                  {repo.description || "Belum ada deskripsi."}
                </p>

                <div className={`mt-6 flex flex-wrap gap-3 text-xs ${ui.textSoft}`}>
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

                <div className={`mt-4 flex items-center gap-2 text-xs ${ui.textVerySoft}`}>
                  <CalendarDays size={13} />
                  Diperbarui {formatDate(repo.updatedAt)}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </section>

      <section id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel theme={theme}>Keahlian</SectionLabel>

        <div className="mb-12">
          <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Stack teknis dengan fokus praktis.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className={`rounded-[2rem] border p-6 ${ui.panel}`}>
              <h3 className="mb-5 text-xl font-semibold">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full px-3 py-2 text-sm ${ui.skillChip}`}
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
        <div className={`rounded-[2.5rem] border p-8 md:p-12 ${ui.softPanel}`}>
          <SectionLabel theme={theme}>Kontak</SectionLabel>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Mari bangun sesuatu yang rapi dan berguna.
              </h2>
              <p className={`mt-6 max-w-2xl text-lg leading-8 ${ui.textMuted}`}>
                Terbuka untuk kolaborasi, diskusi proyek, dan peluang yang
                berkaitan dengan sains data, machine learning, serta
                pengembangan web modern.
              </p>
            </div>

            <div className="flex flex-col justify-end gap-3">
              <a
                href="mailto:your.email@example.com"
                className={`inline-flex items-center justify-between rounded-full border px-5 py-4 transition ${ui.secondaryButton}`}
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
                className={`inline-flex items-center justify-between rounded-full border px-5 py-4 transition ${ui.secondaryButton}`}
              >
                <span className="inline-flex items-center gap-3">
                  <Code2 size={18} />
                  GitHub
                </span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className={`relative z-10 border-t px-5 py-8 text-center text-sm md:px-8 ${ui.footer}`}>
        © {new Date().getFullYear()} Ilham Akbar Jamil. Dibuat dengan Next.js.
      </footer>
    </main>
  );
}
