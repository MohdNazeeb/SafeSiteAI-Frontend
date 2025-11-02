import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import api from "../api";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        // 🟢 LOGIN
        const response = await api.post(
          "/auth/login",
          new URLSearchParams({
            username: formData.email, // FastAPI expects 'username'
            password: formData.password,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        localStorage.setItem("token", response.data.access_token);
        setMessage("✅ Login successful!");
        navigate("/dashboard");
      } else {
        // 🟢 REGISTER
        await api.post("/auth/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        setMessage("✅ Registration successful! Please login now.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ " + (error.response?.data?.detail || "Something went wrong."));
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-[radial-gradient(at_center_bottom,_#4b2e02,_#290A51)] overflow-hidden">
      <AnimatedBackground />

      <div
        className={`relative z-10 w-96 p-8 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-700 ${
          isLogin ? "bg-white/10" : "bg-white/15"
        }`}
      >
        <h2 className="text-xl font-bold text-center text-white mb-6">
          {isLogin ? "You’re back — Awesome!👋" : "Join SafeSite AI⤵"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-linear-to-r from-orange-400 to-pink-500 text-white font-semibold hover:opacity-90 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="text-center text-white mt-4 text-sm">{message}</p>
        )}

        <p className="text-center text-gray-200 text-sm mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-orange-300 hover:underline focus:outline-none"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default AuthPage;
