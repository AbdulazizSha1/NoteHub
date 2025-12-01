import { useState, useEffect } from "react";
import { Link } from "react-router";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Hero() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsub();
    }, []);

    return (
        <section className="relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full 
                        bg-[#8BE16A]/10 blur-[90px]" />
                <div className="absolute top-10 right-0 w-[520px] h-[520px] rounded-full 
                        bg-[#2F3B7A]/15 blur-[110px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-10 text-center">

                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    Your FCIT Notes,
                    <span className="text-[#8BE16A]"> Organized</span> & Accessible
                </h1>

                <p className="mt-4 text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    FCIT NoteHub brings together student notes and resources in one place. <br />
                    Choose your department and start your journey with confidence.
                </p>

                {/* Show only if NOT logged in */}
                {!user && (
                    <div className="mt-7 flex items-center justify-center">
                        <Link
                            to="/register"
                            className="px-6 py-3 rounded-2xl font-semibold text-[#08192B]
                            bg-[#8BE16A] hover:bg-[#9EF07B] transition shadow
                            shadow-[#8BE16A]/30"
                        >
                            Get Started
                        </Link>
                    </div>
                )}
            </div>

        </section>
    );
}
