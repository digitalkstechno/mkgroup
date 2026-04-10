"use client";

import { Search, Bell, Menu, X, ShieldCheck, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "user" | "admin";
  title?: string;
}

export default function DashboardLayout({ children, type, title }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authorized
    const authKey = type === 'admin' ? 'mkgroup_admin_auth' : 'mkgroup_user_auth';
    const loginPath = type === 'admin' ? '/admin/login' : '/user/login';

    const hasLocalAuth = localStorage.getItem(authKey) === 'true';
    const hasCookieAuth = document.cookie
      .split('; ')
      .some((item) => item.startsWith(`${authKey}=true`));
    const isAuth = hasLocalAuth || hasCookieAuth;

    if (!isAuth && !pathname.includes('/login')) {
      router.push(loginPath);
    } else {
      setIsAuthorized(true);
    }
  }, [type, pathname, router]);

  const handleLogout = () => {
    const authKey = type === 'admin' ? 'mkgroup_admin_auth' : 'mkgroup_user_auth';
    localStorage.removeItem(authKey);
    document.cookie = `${authKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax`;
    router.push(type === 'admin' ? '/admin/login' : '/user/login');
  };

  // If we're on a login page, don't show the dashboard layout wrapper
  if (pathname.includes('/login')) {
    return <>{children}</>;
  }

  // Show nothing until we've checked auth (to prevent flicker)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block">
        <Sidebar type={type} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden transition-all duration-300" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="relative h-full bg-white shadow-2xl">
          <Sidebar type={type} />
          <button 
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 text-gray-500 hover:text-gray-900 lg:hidden rounded-xl hover:bg-gray-100 transition-all"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-xs",
              type === 'admin' ? "bg-black" : "bg-blue-600 shadow-md shadow-blue-100"
            )}>
              {type === 'admin' ? <ShieldCheck size={16} /> : <UserIcon size={16} />}
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight hidden sm:block uppercase">
              {type === 'admin' ? 'Admin' : 'User'} <span className={type === 'admin' ? "text-gray-400" : "text-blue-600"}>Panel</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Quick Search..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-blue-500/20 outline-none w-48 xl:w-64 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-gray-500 hover:text-gray-900 relative rounded-2xl hover:bg-gray-50 transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block" />
              <button 
                onClick={handleLogout}
                className={cn(
                  "h-9 w-9 rounded-2xl flex items-center justify-center font-black text-xs border-2 transition-all hover:scale-105 active:scale-95",
                  type === 'admin' ? "bg-black border-black text-white" : "bg-white border-blue-600 text-blue-600 shadow-sm"
                )}
              >
                {type === 'admin' ? 'A' : 'U'}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
