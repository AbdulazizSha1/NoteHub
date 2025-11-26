import { Link } from "react-router";
import logo from "../assets/logo.png";

export default function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}
