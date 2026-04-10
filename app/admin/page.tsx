"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { 
  Plus, 
  CreditCard,
  Zap,
  BarChart3,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Clock4
} from "lucide-react";

export default function AdminPage() {
  const overview = [
    { label: "Active Cards", value: "128", icon: CreditCard, tone: "from-blue-600 to-indigo-700" },
    { label: "New Requests", value: "24", icon: Users, tone: "from-violet-600 to-fuchsia-700" },
    { label: "Today Visits", value: "1,294", icon: BarChart3, tone: "from-cyan-600 to-blue-700" },
  ];

  const recentCards = [
    { name: "Hirenbhai Patel", type: "Builder", updated: "2 min ago", status: "Published" },
    { name: "Mehul Developers", type: "Agency", updated: "12 min ago", status: "Draft" },
    { name: "MK Heights", type: "Project", updated: "45 min ago", status: "Published" },
  ];

  return (
    <DashboardLayout type="admin" title="Admin Control Center">
      <div className="flex flex-col min-h-screen bg-gray-50/50 -m-4 sm:-m-8 pb-12">
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-6 px-8 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/15 p-2.5 rounded-xl backdrop-blur-md">
              <ShieldCheck size={24} className="text-cyan-200" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight uppercase">Admin Command Center</h2>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">Card Operations and Monitoring</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs font-bold opacity-80 uppercase tracking-wider">System Health</p>
              <p className="text-sm font-black flex items-center justify-end gap-1.5 text-emerald-300">
                <span className="h-2 w-2 bg-green-400 rounded-full animate-ping" /> Online
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
              Live Analytics <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 mt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {overview.map((item) => (
              <div key={item.label} className={`bg-gradient-to-r ${item.tone} text-white rounded-3xl p-6 shadow-xl`}>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] font-black uppercase tracking-[2px] text-white/75">{item.label}</p>
                  <item.icon size={20} className="text-white/90" />
                </div>
                <p className="text-4xl font-black tracking-tight">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
               <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase">Create New Card</h3>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Enter card details below</p>
              </div>
              <div className="hidden md:inline-flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <Clock4 size={14} /> Last Saved: Just now
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-3 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Enter name" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Enter email" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
                  <input className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Enter number" />
                </div>
              </div>
              <div className="lg:col-span-4 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Reference Code</label>
                <input className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Enter refer" />
              </div>
              <div className="lg:col-span-3 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category Type</label>
                <select className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer">
                  <option>Clinic</option>
                  <option>Hospital</option>
                  <option>Individual</option>
                </select>
              </div>
              <div className="lg:col-span-2 flex gap-3">
                <button className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95">
                  <Plus size={18} /> Add
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase">Recent Cards</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Latest edits and publishing status</p>
              </div>
              <button className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>

            <div className="space-y-3">
              {recentCards.map((card) => (
                <div key={card.name} className="rounded-2xl border border-gray-100 p-4 flex items-center justify-between hover:shadow-sm transition-all">
                  <div>
                    <p className="text-sm font-black text-gray-900">{card.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{card.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{card.updated}</p>
                    <p className={`text-xs font-black mt-1 ${card.status === "Published" ? "text-emerald-600" : "text-amber-600"}`}>
                      {card.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
