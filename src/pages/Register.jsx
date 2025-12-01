import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#08192B] flex items-center justify-center px-5">
      <div className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 w-full max-w-md">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="h-16 mb-2" />
          <h1 className="text-white text-2xl font-semibold">
            Create Account
          </h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">

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
            Register
          </button>
        </form>

        <p className="text-white/70 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#8BE16A]">Login</Link>
        </p>
      </div>
    </div>
  );
}
