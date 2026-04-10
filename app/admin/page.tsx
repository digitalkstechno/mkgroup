"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Plus, CreditCard, BarChart3, Users, Clock4 } from "lucide-react";

export default function AdminPage() {
  const overview = [
    { label: "Active Cards", value: "128", icon: CreditCard },
    { label: "New Requests", value: "24", icon: Users },
    { label: "Today Visits", value: "1,294", icon: BarChart3 },
  ];

  const recentCards = [
    { name: "Hirenbhai Patel", type: "Builder", updated: "2 min ago", status: "Published" },
    { name: "Mehul Developers", type: "Agency", updated: "12 min ago", status: "Draft" },
    { name: "MK Heights", type: "Project", updated: "45 min ago", status: "Published" },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {overview.map((item) => (
            <div key={item.label} className="bg-white border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{item.value}</p>
              </div>
              <item.icon size={28} className="text-gray-300" />
            </div>
          ))}
        </div>

        {/* Create Card */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-tight">Create New Card</h3>
              <p className="text-xs text-gray-400 mt-0.5">Enter card details below</p>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Clock4 size={13} /> Last Saved: Just now
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-3 space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Full Name</label>
                <input className="w-full border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all" placeholder="Enter name" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Email Address</label>
                <input className="w-full border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all" placeholder="Enter email" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Mobile Number</label>
                <input className="w-full border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all" placeholder="Enter number" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Reference Code</label>
              <input className="w-full border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all" placeholder="Enter refer" />
            </div>

            <div className="lg:col-span-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Category Type</label>
              <select className="w-full border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all cursor-pointer">
                <option>Clinic</option>
                <option>Hospital</option>
                <option>Individual</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <button className="w-full bg-black text-white px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 active:bg-gray-800 transition-colors">
                <Plus size={16} /> Add Card
              </button>
            </div>
          </div>
        </div>

        {/* Recent Cards */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-tight">Recent Cards</h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest edits and publishing status</p>
            </div>
            <button className="text-xs font-semibold text-black hover:underline uppercase tracking-wider">View all</button>
          </div>

          <div className="divide-y divide-gray-100">
            {recentCards.map((card) => (
              <div key={card.name} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{card.name}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">{card.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{card.updated}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${card.status === "Published" ? "text-emerald-600" : "text-amber-600"}`}>
                    {card.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
