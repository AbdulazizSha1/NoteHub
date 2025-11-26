import { Link } from "react-router";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">

            <div className="absolute inset-0">
                <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full 
                        bg-[#8BE16A]/10 blur-[90px]" />
                <div className="absolute top-10 right-0 w-[520px] h-[520px] rounded-full 
                        bg-[#2F3B7A]/15 blur-[110px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/30" />
            </div>

            <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    Your FCIT Notes,
                    <span className="text-[#8BE16A]"> Organized</span> & Accessible
                </h1>

                <p className="mt-4 text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    FCIT NoteHub brings together student notes and resources in one place. <br />
                    Choose your department and start your journey with confidence.
                </p>

                <div className="mt-7 flex items-center justify-center gap-3">
                    <Link
                        to="/register"
                        className="px-6 py-3 rounded-2xl font-semibold text-[#08192B]
                       bg-[#8BE16A] hover:bg-[#9EF07B] transition shadow
                       shadow-[#8BE16A]/30"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="#departments"
                        className="px-6 py-3 rounded-2xl text-white/90 hover:text-white transition
                       border border-white/10 hover:border-white/20 bg-white/5"
                    >
                        Explore Departments
                    </Link>
                </div>
            </div>
        </section>
    );
}
