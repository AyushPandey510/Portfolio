const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "Rust", "JavaScript", "TypeScript", "Dart", "SQL"],
  },
  {
    title: "Backend",
    skills: ["Actix Web", "Warp", "FastAPI", "Flask", "REST APIs", "JWT", "RBAC"],
  },
  {
    title: "Frontend & Mobile",
    skills: ["React", "Flutter"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "SQLite"],
  },
  {
    title: "Tools",
    skills: ["Docker", "Git", "Linux", "CI/CD", "Swagger/OpenAPI"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-sm tracking-wider text-muted-foreground mb-4 block">
          02 — Skills
        </span>
        <h2 className="text-headline mb-16">Technical Arsenal</h2>

        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div key={category.title} className="grid md:grid-cols-4 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <span className="font-mono text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold mt-1">{category.title}</h3>
              </div>
              <div className="md:col-span-3 flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
