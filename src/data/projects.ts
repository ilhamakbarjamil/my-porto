export type Project = {
  title: string;
  category: "Data Science" | "Web Development";
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  status: "Completed" | "In Progress" | "Research";
  highlights: string[];
};

export const featuredProjects: Project[] = [
  {
    title: "Football Event Classification using DistilBERT",
    category: "Data Science",
    description:
      "NLP project for classifying football match commentary into event categories using transformer-based fine-tuning.",
    techStack: ["Python", "DistilBERT", "Hugging Face", "NLP", "Pandas"],
    githubUrl: "https://github.com/",
    status: "Research",
    highlights: [
      "Transformer-based text classification",
      "Football commentary dataset",
      "Evaluation using accuracy, precision, recall, and F1-score",
    ],
  },
  {
    title: "Case-Based Reasoning Legal Decision Retrieval",
    category: "Data Science",
    description:
      "A retrieval system using TF-IDF and cosine similarity to find similar legal decision cases.",
    techStack: ["Python", "TF-IDF", "Cosine Similarity", "Scikit-learn"],
    githubUrl: "https://github.com/",
    status: "Completed",
    highlights: [
      "Case representation",
      "Similarity-based retrieval",
      "Top-K recommendation",
    ],
  },
  {
    title: "Agricultural Yield Classification",
    category: "Data Science",
    description:
      "Machine learning classification project for agricultural yield prediction using structured tabular data.",
    techStack: ["Python", "Scikit-learn", "Random Forest", "Data Mining"],
    githubUrl: "https://github.com/",
    status: "Completed",
    highlights: [
      "Data preprocessing",
      "Classification modeling",
      "Model evaluation and visualization",
    ],
  },
  {
    title: "Data Mining Classification Dashboard",
    category: "Web Development",
    description:
      "Interactive dashboard for presenting machine learning classification results and visual analytics.",
    techStack: ["Streamlit", "Python", "Plotly", "Pandas"],
    githubUrl: "https://github.com/",
    status: "Completed",
    highlights: [
      "Interactive visualization",
      "Single and batch prediction",
      "Clean dashboard layout",
    ],
  },
  {
    title: "Modern Company Profile Website",
    category: "Web Development",
    description:
      "A responsive company profile website with clean layout, structured sections, and modern UI components.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/",
    status: "Completed",
    highlights: [
      "Responsive landing page",
      "Professional UI structure",
      "Deployment-ready architecture",
    ],
  },
  {
    title: "Personal Portfolio Website",
    category: "Web Development",
    description:
      "Minimalist portfolio website inspired by Apple-style interface, focused on Data Science and Web Development works.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    githubUrl: "https://github.com/",
    status: "In Progress",
    highlights: [
      "Apple-like minimalist design",
      "GitHub repository integration",
      "Smooth animation and responsive layout",
    ],
  },
];