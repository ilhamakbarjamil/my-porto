import { NextResponse } from "next/server";

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
};

export async function GET() {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    return NextResponse.json(
      { message: "GITHUB_USERNAME belum dikonfigurasi", repos: [] },
      { status: 200 }
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Gagal mengambil repositori GitHub", repos: [] },
        { status: 200 }
      );
    }

    const data: GitHubRepo[] = await response.json();

    const repos = data
      .filter((repo) => !repo.fork)
      .slice(0, 6)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
      }));

    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil repositori", repos: [] },
      { status: 200 }
    );
  }
}
