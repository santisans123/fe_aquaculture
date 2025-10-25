// src/components/DashboardLayout/DashboardLayout.tsx

import { useRouter } from "next/router";
import cookiesHandler from "@/utils/storage/cookies";
import Sidebar from './Sidebar';
import Header from './Header'; // Pastikan Header juga menerima 'onLogout' jika perlu
import React, { useState, Dispatch, SetStateAction } from 'react';

// Pastikan Anda telah membuat atau memperbarui komponen Header untuk menerima prop 'onLogout'
// Interface untuk prop Header (Hanya sebagai referensi, anggap sudah didefinisikan di Header.tsx)
// interface HeaderProps {
//     toggleSidebar: () => void;
//     onLogout: () => void;
// }

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Fungsi Logout dipusatkan di sini
    const handleLogout = () => {
        cookiesHandler.deleteCookie("access_token");
        router.replace("/");
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* 1. Sidebar (Meneruskan handleLogout) */}
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                onLogout={handleLogout} // ✅ FIX: Meneruskan fungsi logout
            />

            {/* Backdrop untuk mobile saat sidebar terbuka */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* 2. Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Header (Meneruskan handleLogout) */}
                <Header
                    toggleSidebar={toggleSidebar}
                    onLogout={handleLogout} // ✅ FIX: Meneruskan fungsi logout
                />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
