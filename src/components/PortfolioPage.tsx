"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, ArrowUp, Mail, Code2, Database, Brain, Star, GitFork, Menu, X, Plus, FolderGit2 } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { HeroArt, ProjectArt } from "./PortfolioArt";

type Repo = { id: number; name: string; description: string | null; url: string; language: string | null; stars: number; forks: number; updatedAt: string };
const categories = ["Semua", "Sains Data", "Pengembangan Web"] as const;
const navigation = [["Tentang", "about"], ["Proyek", "projects"], ["Keahlian", "skills"], ["GitHub", "github"]];
const skills = [
  { title: "Sains Data", subtitle: "Menemukan cerita di balik angka.", icon: Database, items: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning", "NLP", "Visualisasi Data"] },
  { title: "Pengembangan Web", subtitle: "Membawa ide menjadi pengalaman.", icon: Code2, items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { title: "Alat & Alur Kerja", subtitle: "Proses yang rapi, hasil yang terarah.", icon: Brain, items: ["GitHub", "Vercel", "Google Colab", "Jupyter Notebook", "VS Code"] },
];
function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}
function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Semua");
  const [menuOpen, setMenuOpen] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [repoState, setRepoState] = useState<"loading" | "ready" | "error">("loading");
  const [retry, setRetry] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const controller = new AbortController();
    async function loadRepos() {
      try {
        const response = await fetch("/api/github", { signal: controller.signal });
        if (!response.ok) throw new Error("GitHub unavailable");
        const data = await response.json();
        if (!Array.isArray(data.repos)) throw new Error("Invalid repositories");
        setRepos(data.repos);
        setRepoState(data.message && data.repos.length === 0 ? "error" : "ready");
      } catch {
        if (!controller.signal.aborted) setRepoState("error");
      }
    }
    loadRepos();
    return () => controller.abort();
  }, [retry]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-15% 0px -60% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const visibleProjects = featuredProjects.map((project, index) => ({ ...project, index })).filter((project) => filter === "Semua" || project.category === filter);

  return (
    <>
      <a className="skip-link" href="#main-content">Langsung ke konten</a>
      <header className="site-header">
        <div className="container nav-inner">
          <a className="wordmark" href="#home" aria-label="Ilham, beranda" onClick={() => setMenuOpen(false)}>ilham<span>✳</span></a>
          <nav className="desktop-nav" aria-label="Navigasi utama">{navigation.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav>
          <div className="nav-actions"><a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Mari bicara <ArrowUpRight size={16} /></a><button id="menu-toggle" className="menu-toggle" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navigasi seluler" hidden={!menuOpen}>{navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}</nav>
      </header>

      <main id="main-content">
        <section id="home" className="container hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> HALO, SAYA ILHAM AKBAR JAMIL</div>
            <h1>Data bertemu<br /><em>kreativitas.</em><span className="title-spark" aria-hidden="true">✳</span></h1>
            <p className="hero-description">Mengubah data menjadi insight, dan ide menjadi pengalaman digital yang bermakna.</p>
            <p className="hero-specialties">Sains Data <span>·</span> Machine Learning <span>·</span> Pengembangan Web</p>
            <div className="hero-actions"><a className="button button-primary" href="#projects">Jelajahi karya <ArrowUpRight size={19} /></a><a className="text-link" href="#about">Kenal lebih dekat <ArrowRight size={17} /></a></div>
            <div className="hero-availability"><span className="availability-dot" /> Terbuka untuk ide & kolaborasi baru</div>
          </div>
          <HeroArt />
          <div className="hero-footer"><span>LOGIKA YANG TERSTRUKTUR. SENTUHAN YANG PERSONAL.</span><a href="#projects">Gulir untuk menjelajah <ArrowDown size={15} /></a></div>
        </section>

        <div className="discipline-strip" aria-hidden="true"><div className="container"><span>Data Science</span><span>✳</span><span>Machine Learning</span><span>✳</span><span>Web Development</span><span>✳</span><span>Creative Thinking</span></div></div>

        <section id="projects" className="container section projects-section">
          <SectionLabel number="01">KARYA PILIHAN</SectionLabel>
          <div className="section-heading"><h2>Eksplorasi menjadi<br /><em>solusi nyata.</em></h2><p>Setiap proyek adalah ruang untuk bertanya,<br className="desktop-break" /> mencoba, dan menemukan pendekatan baru.</p></div>
          <div className="project-toolbar"><div className="project-filters" role="group" aria-label="Filter kategori proyek">{categories.map((category) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}<span>{category === "Semua" ? featuredProjects.length : featuredProjects.filter((project) => project.category === category).length}</span></button>)}</div><span className="project-count" role="status">{String(visibleProjects.length).padStart(2, "0")} proyek ditampilkan</span></div>
          <div className="project-grid">{visibleProjects.map((project) => <article className="project-card" key={project.title}>
            <ProjectArt index={project.index} />
            <div className="project-info"><div className="project-meta"><span>{project.category}</span><span className={`project-status status-${project.status === "Selesai" ? "done" : "progress"}`}><i />{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tech-tags">{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-bottom"><details><summary>Di balik proyek <Plus size={15} /></summary><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></details><div className="project-links"><a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`GitHub: ${project.title}`}><FolderGit2 size={16} /><span>Kode</span><ArrowUpRight size={14} /></a>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Demo <ArrowUpRight size={14} /></a>}</div></div></div>
          </article>)}</div>
        </section>

        <section id="about" className="about-section"><div className="container about-grid"><div><SectionLabel number="02">SEDIKIT TENTANG SAYA</SectionLabel><h2>Pikiran analitis.<br /><em>Jiwa eksploratif.</em></h2><div className="about-signature">Ilham Akbar Jamil <span>↗</span></div></div><div className="about-copy"><p className="about-lead">Saya senang menemukan pola di balik kompleksitas — lalu mengubahnya menjadi sesuatu yang berguna.</p><p>Fokus saya ada pada Sains Data dan Pengembangan Web. Saya menggabungkan analisis data, machine learning, dan NLP dengan antarmuka yang intuitif untuk menjembatani persoalan teknis dan kebutuhan nyata.</p><p>Bagi saya, solusi yang baik dimulai dari rasa ingin tahu, dibangun dengan proses yang terstruktur, dan disampaikan dengan sederhana.</p><div className="about-values"><span><Database size={18} /> Berbasis data</span><span><Code2 size={18} /> Dibuat dengan teliti</span></div></div></div></section>

        <section id="skills" className="container section"><SectionLabel number="03">KEAHLIAN & PERANGKAT</SectionLabel><div className="section-heading"><h2>Alat yang tepat.<br /><em>Kemungkinan tanpa batas.</em></h2><p>Dari eksplorasi data hingga antarmuka,<br className="desktop-break" /> inilah perangkat di balik proses saya.</p></div><div className="skills-grid">{skills.map(({ title, subtitle, icon: Icon, items }, index) => <article className={`skill-card skill-card-${index}`} key={title}><div className="skill-top"><Icon size={26} strokeWidth={1.5} /><span>0{index + 1}</span></div><h3>{title}</h3><p>{subtitle}</p><div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></section>

        <section id="github" className="container section github-section"><div className="github-heading"><div><SectionLabel number="04">CATATAN DARI GITHUB</SectionLabel><h2>Terus belajar.<br /><em>Terus membangun.</em></h2></div><p>Eksperimen, ide, dan pekerjaan terbaru<br className="desktop-break" /> dari repositori publik saya.</p></div><div aria-live="polite" aria-busy={repoState === "loading"}>{repoState === "loading" ? <div className="repo-empty"><FolderGit2 size={28} /><p>Memuat eksplorasi terbaru…</p></div> : repos.length === 0 ? <div className="repo-empty"><div className="repo-empty-icon"><FolderGit2 size={28} /></div><div><h3>Eksplorasi terus berlanjut.</h3><p>Repositori belum dapat ditampilkan. Sementara itu, jelajahi karya pilihan di atas.</p></div>{repoState === "error" && <button className="text-link" onClick={() => { setRepoState("loading"); setRetry((value) => value + 1); }}>Coba lagi <ArrowRight size={16} /></button>}</div> : <div className="repo-grid">{repos.map((repo) => <a key={repo.id} className="repo-card" href={repo.url} target="_blank" rel="noreferrer"><div className="repo-top"><FolderGit2 size={21} /><ArrowUpRight size={18} /></div><h3>{repo.name}</h3><p>{repo.description || "Eksplorasi kode dan pengembangan proyek."}</p><div className="repo-meta">{repo.language && <span className="repo-language">{repo.language}</span>}<span><Star size={13} />{repo.stars}</span><span><GitFork size={13} />{repo.forks}</span></div><small>Diperbarui {formatDate(repo.updatedAt)}</small></a>)}</div>}</div></section>

        <section id="contact" className="contact-section"><div className="container contact-inner"><div className="contact-kicker"><span className="availability-dot" /> SEBUAH IDE BISA JADI AWAL YANG BAIK</div><div className="contact-row"><h2>Ada ide menarik?<br /><em>Mari kita wujudkan.</em></h2><a className="contact-arrow" href="mailto:your.email@example.com" aria-label="Hubungi Ilham melalui email"><ArrowUpRight size={48} strokeWidth={1.3} /></a></div><div className="contact-bottom"><p>Terbuka untuk kolaborasi, diskusi proyek,<br />dan kesempatan untuk tumbuh bersama.</p><div><a href="mailto:your.email@example.com"><Mail size={17} /> Kirim email <ArrowUpRight size={16} /></a><a href="https://github.com/" target="_blank" rel="noreferrer"><FolderGit2 size={17} /> GitHub <ArrowUpRight size={16} /></a></div></div><span className="contact-decoration" aria-hidden="true">✳</span></div></section>
      </main>
      <footer className="container site-footer"><a className="wordmark" href="#home">ilham<span>✳</span></a><p>© {new Date().getFullYear()} Ilham Akbar Jamil</p><a className="back-top" href="#home">Kembali ke atas <ArrowUp size={15} /></a></footer>
    </>
  );
}
