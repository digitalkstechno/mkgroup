"use client";

import { Bell, Menu, X, ShieldCheck, User as UserIcon, CreditCard, Database, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Link from "next/link";

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
    const authKey = type === 'admin' ? 'mkgroup_admin_auth' : 'mkgroup_user_auth';
    const loginPath = type === 'admin' ? '/admin/login' : '/user/login';
    const hasLocalAuth = localStorage.getItem(authKey) === 'true';
    const hasCookieAuth = document.cookie.split('; ').some((item) => item.startsWith(`${authKey}=true`));
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

  if (pathname.includes('/login')) return <>{children}</>;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Admin: top navbar layout
  if (type === 'admin') {
    const adminLinks = [
      { label: "Card Maker", href: "/admin", icon: CreditCard },
      { label: "Dropbox", href: "/admin/dropbox", icon: Database },
    ];

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 sm:px-8 h-14">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-black flex items-center justify-center text-white">
                <ShieldCheck size={16} />
              </div>
              <span className="text-base font-bold text-gray-900 uppercase tracking-tight">Admin Panel</span>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {adminLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors",
                    pathname === link.href
                      ? "bg-black text-white"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <link.icon size={15} />
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
                <Bell size={18} />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-500 hover:text-gray-900"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown nav */}
          {isSidebarOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              {adminLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 text-sm font-semibold border-b border-gray-100",
                    pathname === link.href ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <link.icon size={15} />
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </header>

        <main className="flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    );
  }

  // User: sidebar layout (unchanged)
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:block">
        <Sidebar type={type} />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="relative h-full bg-white shadow-2xl">
          <Sidebar type={type} />
          <button
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-gray-500 hover:text-gray-900 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-xs bg-blue-600 shadow-md shadow-blue-100">
              <UserIcon size={16} />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight hidden sm:block uppercase">
              User <span className="text-blue-600">Panel</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-gray-500 hover:text-gray-900 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
