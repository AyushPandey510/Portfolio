import { useEffect, useState } from "react";
import { Github } from "lucide-react";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = import.meta.env.VITE_GITHUB_TOKEN
      ? { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
      : {};

    fetch("https://api.github.com/users/AyushPandey510/repos", { headers })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

        setRepos(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="projects" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-sm tracking-wider text-muted-foreground mb-4 block">
            04 — Projects
          </span>
          <h2 className="text-headline mb-16">Selected Work</h2>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-sm tracking-wider text-muted-foreground mb-4 block">
          04 — Projects
        </span>
        <h2 className="text-headline mb-16">Selected Work</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {repos.slice(0, 5).map((repo, index) => (
            <article
              key={repo.id}
              className={`brutal-card group ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="font-mono text-sm text-muted-foreground">
                    {repo.language || "Project"}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold">{repo.name}</h3>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 brutal-border hover:bg-foreground hover:text-background transition-colors"
                  aria-label={`View ${repo.name} on GitHub`}
                >
                  <Github size={18} />
                </a>
              </div>

              {repo.description && (
                <p className="text-muted-foreground mb-6">
                  {repo.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs font-mono bg-secondary px-2 py-1">
                  ⭐ {repo.stargazers_count}
                </span>
                <span className="text-xs font-mono bg-secondary px-2 py-1">
                  🍴 {repo.forks_count}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-border">
                {repo.language && (
                  <span className="text-sm font-medium">{repo.language}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
