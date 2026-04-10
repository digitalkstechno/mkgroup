"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { 
  ArrowRight, 
  MapPin, 
  Home, 
  Calendar, 
  Download, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Zap,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UserPage() {
  const stats = [
    { label: "Project Status", value: "Under Construction", icon: Home, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Possession Date", value: "Dec 2026", icon: Calendar, color: "text-green-600", bg: "bg-green-50" },
    { label: "Location", value: "Riverside Area", icon: MapPin, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <DashboardLayout type="user" title="Customer Dashboard">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Modern Hero Section - No Black Line/Bar */}
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-12 text-white shadow-2xl shadow-blue-200">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[2px]">
                <Sparkles size={14} className="text-yellow-300" /> Premium Access
              </div>
              <h2 className="text-4xl sm:text-6xl font-black leading-tight tracking-tighter">
                Your Dream Home <br />
                <span className="text-blue-200">Is Taking Shape.</span>
              </h2>
              <p className="text-blue-100/80 text-lg max-w-xl leading-relaxed font-medium">
                Experience luxury living at its best. 
                Track your property progress and manage all services with ease.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-white text-blue-700 px-10 py-4 rounded-[20px] font-black text-sm hover:bg-blue-50 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95">
                  Explore Gallery <ArrowRight size={20} />
                </button>
                <button className="bg-blue-500/30 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-[20px] font-black text-sm hover:bg-blue-500/50 transition-all">
                  Brochure
                </button>
              </div>
            </div>
            <div className="hidden md:block relative group">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <Home size={280} className="relative z-10 text-white/20 group-hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>
          
          {/* Abstract Decorations */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-blue-100/20 transition-all group cursor-default">
              <div className="flex items-center gap-5">
                <div className={cn(
                  "p-5 rounded-[24px] transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg",
                  stat.bg, stat.color
                )}>
                  <stat.icon size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Services Area */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-[40px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Project Highlights</h3>
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Key Features & Amenities</p>
                </div>
                <button className="text-sm font-black text-blue-600 hover:text-blue-700 underline underline-offset-8 decoration-2 decoration-blue-100 hover:decoration-blue-600 transition-all">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 p-10 gap-8">
                {[
                  { title: "Smart Home Tech", desc: "Integrated automation systems for light & security.", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
                  { title: "Eco Friendly", desc: "Solar panels & rainwater harvesting systems.", icon: Sparkles, color: "text-green-500", bg: "bg-green-50" },
                  { title: "24/7 Security", desc: "Advanced surveillance & biometric access.", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
                  { title: "Clubhouse", desc: "World class gym, spa and swimming pool.", icon: CreditCard, color: "text-purple-500", bg: "bg-purple-50" },
                ].map((item) => (
                  <div key={item.title} className="group cursor-pointer">
                    <div className="flex items-start gap-5">
                      <div className={cn("p-4 rounded-2xl transition-all group-hover:scale-110", item.bg, item.color)}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 mb-1 tracking-tight">{item.title}</h4>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Gallery", icon: "🖼️", href: "/user/photos" },
                { label: "Videos", icon: "🎥", href: "/user/videos" },
                { label: "Brochure", icon: "📄", href: "/user/brochure" },
                { label: "Help", icon: "💬", href: "/user/inquiry" },
              ].map((action) => (
                <Link 
                  key={action.label} 
                  href={action.href}
                  className="flex flex-col items-center justify-center p-10 bg-white rounded-[40px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/30 transition-all group active:scale-95"
                >
                  <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">{action.icon}</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] group-hover:text-blue-600 transition-colors">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Interaction Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white rounded-[40px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-12 w-12 rounded-[20px] bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-200">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Quick Inquiry</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instant Support</p>
                </div>
              </div>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
                  <input className="w-full rounded-2xl bg-gray-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Mobile Number</label>
                  <input className="w-full rounded-2xl bg-gray-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Interest</label>
                  <select className="w-full rounded-2xl bg-gray-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white cursor-pointer">
                    <option>2 BHK Premium</option>
                    <option>3 BHK Luxury</option>
                    <option>Penthouse Suite</option>
                  </select>
                </div>
                <button className="w-full rounded-[20px] bg-blue-600 text-white py-5 font-black text-sm shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 mt-4">
                  Send Inquiry
                </button>
              </form>
            </section>

            {/* Assistance Card */}
            <div className="bg-gray-900 rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2 tracking-tight">Need Help?</h3>
                <p className="text-gray-400 text-sm mb-10 leading-relaxed font-bold">Our support team is online 24/7 to assist you.</p>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all">
                    Schedule Visit
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                    WhatsApp Chat
                  </button>
                </div>
              </div>
              {/* Abstract decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-[2s]">
                <Sparkles size={120} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
