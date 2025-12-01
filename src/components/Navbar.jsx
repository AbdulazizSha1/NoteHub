import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#08192B]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="FCIT NoteHub" className="h-15 w-auto" />
          <span className="text-white font-semibold tracking-wide text-lg">
            FCIT <span className="text-[#8BE16A]">NoteHub</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {!user && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-white/90 hover:text-white transition
                              border border-white/10 hover:border-white/20 bg-white/5"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl font-semibold text-[#08192B]
                              bg-[#8BE16A] hover:bg-[#9EF07B] transition shadow
                              shadow-[#8BE16A]/30"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}
