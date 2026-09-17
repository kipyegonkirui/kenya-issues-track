import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    Layout,
    Menu,
    Users,
    Settings,
    BarChart2,
    Archive,
    Search,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { label: "Dashboard", to: "/admin/dashboard", icon: Layout },
    { label: "Issues", to: "/admin/issues", icon: Menu },
    { label: "Users", to: "/admin/users", icon: Users },
    { label: "Analytics", to: "/admin/analytics", icon: BarChart2 },
    { label: "Archive", to: "/admin/archive", icon: Archive }, // ✅ Added here
    { label: "Settings", to: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* SIDEBAR */}
            <aside
                className={`bg-slate-900 text-white transition-all duration-200 ${collapsed ? "w-20" : "w-64"
                    }`}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 rounded-full p-2">
                            <span className="font-bold text-lg">RI</span>
                        </div>
                        {!collapsed && <span className="text-lg font-semibold">Admin</span>}
                    </div>

                    <button
                        onClick={() => setCollapsed((v) => !v)}
                        className="p-1 rounded hover:bg-white/5"
                        aria-label="Toggle sidebar"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M6 9l6 6 6-6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <nav className="mt-4">
                    <ul className="space-y-1 px-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 w-full px-3 py-2 rounded-md transition-colors text-sm ${isActive
                                                ? "bg-white/10 text-white"
                                                : "text-slate-300 hover:bg-white/5"
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        {!collapsed && <span>{item.label}</span>}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mt-auto px-4 py-4 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white/10 w-9 h-9 flex items-center justify-center">
                            A
                        </div>
                        {!collapsed && (
                            <div className="flex-1">
                                <div className="text-sm font-medium">Admin Name</div>
                                <div className="text-xs text-slate-400">Lead Admin</div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">
                {/* TOP NAVBAR */}
                <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold">Admin Panel</h2>

                        {/* Search */}
                        <div className="hidden md:flex items-center bg-slate-100 rounded px-3 py-1 gap-2">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                                className="bg-transparent outline-none text-sm placeholder:text-slate-400"
                                placeholder="Search issues, users..."
                            />
                        </div>
                    </div>

                    {/* PROFILE DROPDOWN */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen((p) => !p)}
                            className="flex items-center gap-2 p-2 rounded hover:bg-slate-100"
                        >
                            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                                K
                            </div>
                            <div className="hidden md:block text-sm text-left">
                                <div className="font-medium">Kirui</div>
                                <div className="text-xs text-slate-500">Admin</div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-lg z-20">
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                    onClick={() => setProfileOpen(false)}
                                >
                                    Manage Account
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                    onClick={() => setProfileOpen(false)}
                                >
                                    Change Password
                                </button>
                                <hr className="my-1" />
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    onClick={async () => {
                                        try {
                                            await signOut(auth);
                                            setProfileOpen(false);
                                            navigate("/");
                                        } catch (error) {
                                            console.error("Error signing out:", error);
                                        }
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* MAIN PAGE CONTENT */}
                <main className="p-6 overflow-auto">
                    <Outlet /> {/* 👈 Nested admin routes render here */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
