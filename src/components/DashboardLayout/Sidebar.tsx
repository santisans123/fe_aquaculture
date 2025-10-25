// src/components/DashboardLayout/Sidebar.tsx

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    LogoutOutlined,
    UserOutlined,
    AreaChartOutlined,
    HomeOutlined
} from "@ant-design/icons";
// import cookiesHandler from "@/utils/storage/cookies"; // ❌ DIHAPUS

// ✅ FIX: Tambahkan onLogout ke SidebarProps
interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onLogout: () => void;
}

// ✅ FIX: Terima onLogout sebagai prop
const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, onLogout }) => {
    const router = useRouter();

    const navItems = [
        { href: '/dashboard', icon: HomeOutlined, label: 'Dashboard' },
        { href: '/dashboard/ponds', icon: AreaChartOutlined, label: 'Data Tambak' },
        { href: '/dashboard/profile', icon: UserOutlined, label: 'Akun' },
    ];

    const defineSidebarActiveStyle = (path: string) => {
        const isHomeRoute = path === '/dashboard';
        const currentPath = router.asPath;

        const isActive = isHomeRoute
            ? currentPath === path
            : currentPath.startsWith(path);

        return isActive
            ? 'bg-amber-500 text-amber-950 font-bold rounded-xl'
            : 'text-amber-100 hover:bg-orange-950/50 hover:text-white rounded-xl';
    };

    // ❌ DIHAPUS: Fungsi logout lokal sudah dipindahkan ke DashboardLayout
    /*
    function logout() {
        cookiesHandler.deleteCookie("access_token");
        router.replace("/");
    }
    */

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-40 lg:relative lg:translate-x-0 transform transition-transform duration-300
                        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                        flex flex-col w-64 bg-orange-950 text-white shadow-2xl h-full flex-shrink-0`}
        >
            {/* Logo Area (Konten tetap sama) */}
            <div className="flex items-center h-20 bg-orange-900/90 shadow-xl px-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                        <HomeOutlined className="text-xl text-orange-950" />
                    </div>
                    <h2 className="text-xl font-extrabold ml-1 text-white">PENS <span className="text-amber-400">Aqua</span></h2>
                </div>
            </div>

            <p className="text-xs font-semibold text-amber-300/80 uppercase mt-4 mx-7 mb-2">Menu</p>

            {/* Navigasi Menu (Konten tetap sama) */}
            <nav className="flex-1 px-4 space-y-3 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center p-3 text-base font-medium transition-all duration-200 ${defineSidebarActiveStyle(item.href)}`}
                        >
                            <Icon className="mr-3 text-xl" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Tombol Logout */}
            <div className="p-4 flex-shrink-0 border-t border-orange-900/50">
                <button
                    onClick={onLogout} // ✅ FIX: Panggil prop onLogout yang diterima dari parent
                    className="flex items-center w-full p-3 text-base font-medium text-amber-100 hover:bg-red-600 rounded-xl transition-colors duration-200"
                >
                    <LogoutOutlined className="mr-3 text-xl" />
                    Keluar
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
