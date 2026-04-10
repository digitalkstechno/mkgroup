"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      localStorage.setItem('mkgroup_admin_auth', 'true');
      document.cookie = 'mkgroup_admin_auth=true; path=/; max-age=86400; samesite=lax';
      router.push("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[450px]">
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-black text-white mb-4 shadow-xl">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">Admin Panel</h1>
          <p className="text-gray-500 mt-2">Sign in to manage cards and records</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  placeholder="admin@mkgroup.com"
                  className="w-full bg-gray-50 border-none rounded-2xl px-12 py-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-none rounded-2xl px-12 py-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-xs font-bold text-black hover:underline">Forgot Password?</a>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-black text-white rounded-2xl py-4 font-bold text-sm shadow-xl shadow-gray-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In to Admin <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-sm text-gray-500">
            Are you a user? {" "}
            <Link href="/user/login" className="font-bold text-black hover:underline">User Login</Link>
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/" className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">Return to Home</Link>
            <span className="h-1 w-1 bg-gray-300 rounded-full" />
            <a href="#" className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
}
