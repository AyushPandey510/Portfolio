import { Trophy, Award, Star } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Inter-College Debugging Competition",
    subtitle: "Winner",
  },
  {
    icon: Award,
    title: "Inter-College Algorithm Writing",
    subtitle: "Winner",
  },
  {
    icon: Star,
    title: "Solo Hackathon — Aptech Learning",
    subtitle: "Winner, 2024",
  },
];

const Achievements = () => {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-sm tracking-wider opacity-60 mb-4 block">
          05 — Achievements
        </span>
        <h2 className="text-headline mb-16">Honors & Awards</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.title}
                className="border-2 border-background p-8 group hover:bg-background hover:text-foreground transition-all duration-300"
              >
                <Icon size={40} className="mb-6" />
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="opacity-60">{achievement.subtitle}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-16 border-t border-background/20">
          <h3 className="text-2xl font-bold mb-6">Leadership & Volunteering</h3>
          <div className="border-2 border-background p-8">
            <h4 className="text-xl font-bold mb-2">Head Organizer — Zettabyte Technical Event</h4>
            <p className="opacity-80">
              Led planning and execution of college-level coding events and coordinated volunteer teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
