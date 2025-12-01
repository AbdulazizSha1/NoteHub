import { Link, useParams } from "react-router";

const SECTIONS = [
    {
        key: "summarize",
        title: "Summarize",
        desc: "Upload summaries and condensed notes for this subject.",
    },
    {
        key: "testbank",
        title: "Test Bank",
        desc: "Previous exams, quizzes, and question banks.",
    },
    {
        key: "slides",
        title: "Slides",
        desc: "Lecture slides and presentations.",
    },
    {
        key: "resources",
        title: "Resources",
        desc: "Extra references, links, and attachments.",
    },
];

export default function SubjectOverview() {
    const { deptKey, subjectCode } = useParams();

    return (
        <div className="min-h-screen w-full bg-[#05192d] bg-gradient-to-b from-[#092037] to-[#05182b] px-6 py-10">
            <Link
                to="/home"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white
             bg-white/10 hover:bg-white/20 border border-white/10 
             px-4 py-2 rounded-xl text-sm transition"
            >
                <span className="text-lg">←</span> Back
            </Link>
            <section className="max-w-6xl mx-auto px-5 py-10">
                <div className="mb-8">
                    <p className="text-sm text-white/50 uppercase tracking-[0.2em]">
                        {deptKey.toUpperCase()}
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
                        {subjectCode}
                    </h1>
                    <p className="text-white/60 text-sm mt-2">
                        Choose what you want to explore or upload for this subject.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {SECTIONS.map((sec) => (
                        <Link
                            key={sec.key}
                            to={`/departments/${deptKey}/${subjectCode}/${sec.key}`}
                            className="group rounded-2xl p-[1px] bg-white/5 hover:bg-white/10 transition"
                        >
                            <div
                                className="rounded-2xl bg-[#0A2036] border border-white/5 p-6 h-full
                         flex flex-col justify-between group-hover:border-white/10 
                         group-hover:shadow-lg transition"
                            >
                                <div>
                                    <h3 className="text-white font-semibold text-lg">
                                        {sec.title}
                                    </h3>
                                    <p className="text-white/70 text-sm mt-2">{sec.desc}</p>
                                </div>

                                <div className="mt-4 flex items-center justify-between text-sm text-white/70">
                                    <span>Open {sec.title}</span>
                                    <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition">
                                        ➜
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
