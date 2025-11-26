import { Link } from "react-router";

const DEPTS = [
    {
        key: "cs",
        title: "Computer Science",
        short: "CS",
        desc: "Algorithms, AI, software foundations, and theoretical depth.",
        accent: "from-[#2F3B7A]/30 to-transparent",
        glow: "shadow-[#2F3B7A]/30",
    },
    {
        key: "it",
        title: "Information Technology",
        short: "IT",
        desc: "Networks, cybersecurity, cloud, and real-world infrastructure.",
        accent: "from-[#8BE16A]/25 to-transparent",
        glow: "shadow-[#8BE16A]/30",
    },
    {
        key: "is",
        title: "Information Systems",
        short: "IS",
        desc: "Business + tech, analytics, and systems for organizations.",
        accent: "from-emerald-400/20 to-transparent",
        glow: "shadow-emerald-400/25",
    },
];

export default function Department() {
    return (
        <section id="departments" className="max-w-6xl mx-auto px-5 py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Choose Your Track
                </h2>
                <p className="mt-2 text-white/65">
                    Each department contains notes, slides, reviews, and summaries organized by levels.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {DEPTS.map((d) => (
                    <div
                        key={d.key}
                        className={`group relative rounded-2xl p-[1px] bg-white/5 
                        hover:bg-white/10 transition`}
                    >
                        <div
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${d.accent} opacity-0 
                          group-hover:opacity-100 transition`}
                        />

                        <div
                            className={`relative rounded-2xl bg-[#0A2036] border border-white/5
                          p-6 h-full flex flex-col ${d.glow}
                          group-hover:shadow-lg group-hover:border-white/10 transition`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-white font-semibold text-lg">
                                    {d.title}
                                </span>
                                <span className="text-white/50 text-sm font-bold tracking-widest">
                                    {d.short}
                                </span>
                            </div>

                            <p className="mt-3 text-white/70 text-sm leading-relaxed flex-1">
                                {d.desc}
                            </p>

                            <Link
                                to={`/departments/${d.key}`}
                                className="mt-5 inline-flex items-center justify-center
                           px-4 py-2 rounded-xl text-white font-medium
                           bg-white/5 hover:bg-white/10 border border-white/10
                           hover:border-white/20 transition"
                            >
                                Explore {d.short}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Small note */}
            <p className="text-center text-white/50 text-sm mt-6">
                * Full content access requires logging in.
            </p>
        </section>
    );
}
