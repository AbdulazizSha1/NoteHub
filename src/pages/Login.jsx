import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { googleProvider } from "../components/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    navigate("/home");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-[#08192B] flex items-center justify-center px-5">
      <div className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 w-full max-w-md">
        
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="h-16 mb-2" />
          <h1 className="text-white text-2xl font-semibold">
            Sign In to FCIT NoteHub
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-[#0E233B] border border-white/10 text-white"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-[#0E233B] border border-white/10 text-white"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#8BE16A] rounded-xl text-[#08192B] font-semibold hover:bg-[#9EF07B] transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition border border-white/10 mt-2 flex items-center justify-center gap-2"
            >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="h-5" />
            Continue with Google
            </button>

        </form>

        <p className="text-white/70 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#8BE16A]">Register</Link>
        </p>
      </div>
    </div>
  );
}
