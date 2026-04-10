"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Trash2, 
  Database,
  Zap,
  Search,
  Filter,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DropboxPage() {
  const dropboxData = [
    { no: 1, card: "Vesu", name: "Change the photo", number: "9374714610", email: "drsudipjoshi@yahoo.co.in", message: "Change the timing 8:00 am to 8:00 pm", date: "2025-10-01 08:46:46" },
    { no: 2, card: "MMA", name: "Jigar patel", number: "9924902422", email: "drjigardpatel@gmail.com", message: "Pls make one more stand and card", date: "2024-02-12 14:25:30" },
  ];

  return (
    <DashboardLayout type="admin" title="Dropbox Management">
      <div className="flex flex-col min-h-screen bg-gray-50/50 -m-4 sm:-m-8 pb-12">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-5 px-8 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Database size={24} className="text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight uppercase">Dropbox Control</h2>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">Manage User Inquiries</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white/10 hover:bg-white/20 p-2 rounded-xl border border-white/10 transition-all">
              <Download size={20} />
            </button>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 mt-8 space-y-8">
          {/* Main Table Section */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
              <div className="flex items-center gap-2 text-sm font-black text-gray-900 uppercase tracking-widest">
                <Filter size={16} className="text-blue-600" /> Data Records
              </div>
              <div className="relative w-full sm:w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Filter records..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="p-8">
              <div className="overflow-x-auto rounded-[24px] border border-gray-100 shadow-sm">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] border-r border-gray-800">No</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] border-r border-gray-800">Card Type</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] border-r border-gray-800">Patient/User</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] border-r border-gray-800">Number</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] border-r border-gray-800">Email</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] border-r border-gray-800">Action/Message</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] border-r border-gray-800">Timestamp</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dropboxData.map((row) => (
                      <tr key={row.no} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-5 border-r border-gray-50 font-black text-gray-400">{row.no}</td>
                        <td className="px-6 py-5 border-r border-gray-50">
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">{row.card}</span>
                        </td>
                        <td className="px-6 py-5 border-r border-gray-50">
                          <p className="font-black text-blue-600 group-hover:underline cursor-pointer">{row.name}</p>
                        </td>
                        <td className="px-6 py-5 border-r border-gray-50 font-bold text-gray-500">{row.number}</td>
                        <td className="px-6 py-5 border-r border-gray-50 text-xs font-bold text-gray-400">{row.email}</td>
                        <td className="px-6 py-5 border-r border-gray-50">
                          <p className="text-xs text-gray-600 leading-relaxed font-medium">{row.message}</p>
                        </td>
                        <td className="px-6 py-5 border-r border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-tighter">{row.date}</td>
                        <td className="px-6 py-5 text-center">
                          <button className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
