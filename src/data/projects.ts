export type Project = {
  title: string;
  category: "Sains Data" | "Pengembangan Web";
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  status: "Selesai" | "Dalam Proses" | "Riset";
  highlights: string[];
};

export const featuredProjects: Project[] = [
  {
    title: "Klasifikasi Event Sepak Bola dengan DistilBERT",
    category: "Sains Data",
    description:
      "Proyek NLP untuk mengklasifikasikan komentar pertandingan sepak bola ke dalam kategori event menggunakan fine-tuning berbasis transformer.",
    techStack: ["Python", "DistilBERT", "Hugging Face", "NLP", "Pandas"],
    githubUrl: "https://github.com/",
    status: "Riset",
    highlights: [
      "Klasifikasi teks berbasis transformer",
      "Dataset komentar sepak bola",
      "Evaluasi menggunakan accuracy, precision, recall, dan F1-score",
    ],
  },
  {
    title: "Pencarian Putusan Hukum dengan Case-Based Reasoning",
    category: "Sains Data",
    description:
      "Sistem pencarian menggunakan TF-IDF dan cosine similarity untuk menemukan kasus putusan hukum yang serupa.",
    techStack: ["Python", "TF-IDF", "Cosine Similarity", "Scikit-learn"],
    githubUrl: "https://github.com/",
    status: "Selesai",
    highlights: [
      "Representasi kasus",
      "Pencarian berbasis kemiripan",
      "Rekomendasi Top-K",
    ],
  },
  {
    title: "Klasifikasi Hasil Pertanian",
    category: "Sains Data",
    description:
      "Proyek klasifikasi machine learning untuk memprediksi hasil pertanian menggunakan data tabular terstruktur.",
    techStack: ["Python", "Scikit-learn", "Random Forest", "Data Mining"],
    githubUrl: "https://github.com/",
    status: "Selesai",
    highlights: [
      "Prapemrosesan data",
      "Pemodelan klasifikasi",
      "Evaluasi dan visualisasi model",
    ],
  },
  {
    title: "Dashboard Klasifikasi Data Mining",
    category: "Pengembangan Web",
    description:
      "Dashboard interaktif untuk menampilkan hasil klasifikasi machine learning dan analitik visual.",
    techStack: ["Streamlit", "Python", "Plotly", "Pandas"],
    githubUrl: "https://github.com/",
    status: "Selesai",
    highlights: [
      "Visualisasi interaktif",
      "Prediksi tunggal dan batch",
      "Tata letak dashboard yang rapi",
    ],
  },
  {
    title: "Website Company Profile Modern",
    category: "Pengembangan Web",
    description:
      "Website company profile responsif dengan layout rapi, bagian yang terstruktur, dan komponen UI modern.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/",
    status: "Selesai",
    highlights: [
      "Landing page responsif",
      "Struktur UI profesional",
      "Arsitektur siap deploy",
    ],
  },
  {
    title: "Website Portofolio Pribadi",
    category: "Pengembangan Web",
    description:
      "Website portofolio dengan pendekatan editorial yang hangat, menampilkan karya Sains Data dan Pengembangan Web secara terstruktur.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    githubUrl: "https://github.com/",
    status: "Dalam Proses",
    highlights: [
      "Desain editorial dengan ilustrasi geometris",
      "Integrasi repositori GitHub",
      "Animasi halus dan layout responsif",
    ],
  },
];
