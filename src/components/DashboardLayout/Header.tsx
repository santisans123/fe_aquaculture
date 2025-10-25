// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BellOutlined, MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import cookiesHandler from "@/utils/storage/cookies";

interface HeaderProps {
    toggleSidebar: () => void;
    // FIX 1: Tambahkan onLogout ke interface HeaderProps
    onLogout: () => void;
}

// FIX 2: Hapus definisi onLogout yang salah di dalam getBreadcrumbs
const Header: React.FC<HeaderProps> = ({ toggleSidebar, onLogout }) => {
    const router = useRouter();

    const getBreadcrumbs = () => {
        const path = router.asPath;
        const pathSegments = path.split('/').filter(segment => segment !== '');

        if (pathSegments.length === 1 && pathSegments[0] === 'dashboard') {
            return <span className="text-gray-800 font-bold text-xl">Dashboard</span>;
        }

        const mappedSegments: { [key: string]: string } = {
            'dashboard': 'Dashboard',
            'account': 'Akun',
            'bagan': 'Bagan',
            'tables': 'Tabel Data',
        };

        let currentPath = '';

        // FIX 3: Hapus definisi onLogout yang salah dan tidak terpakai dari sini.
        /* function onLogout() {
            cookiesHandler.deleteCookie("access_token");
            router.replace("/");
        }
        */

        return (
            <span className="text-gray-600 text-sm flex items-center">
                {pathSegments.map((segment, index) => {
                    currentPath += `/${segment}`;
                    const displaySegment = mappedSegments[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <React.Fragment key={segment}>
                            <Link href={currentPath} className={`hover:text-amber-600 ${isLast ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                {displaySegment}
                            </Link>
                            {!isLast && <span className="mx-2 text-gray-400 font-light">/</span>}
                        </React.Fragment>
                    );
                })}
            </span>
        );
    };

    return (
        <header className="flex-shrink-0 bg-white shadow-md sticky top-0 z-20">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex justify-between items-center">

                    {/* Kiri: Toggle Mobile Menu & Breadcrumbs */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden text-gray-600 hover:text-amber-600 p-2 rounded-lg transition-colors"
                            aria-label="Toggle Menu"
                        >
                            <MenuOutlined className="text-2xl" />
                        </button>
                        {getBreadcrumbs()}
                    </div>

                    {/* Kanan: Notifikasi & User Info */}
                    <div className="flex items-center space-x-6">

                        {/* Notification Bell (Dipertahankan seperti sebelumnya) */}
                        <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <BellOutlined className="text-gray-600 text-xl hover:text-amber-600" />
                            <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold">
                                3
                            </span>
                        </div>

                        {/* User Profile Info - Dibuat jadi Tombol untuk Logout */}
                        <button
                            onClick={onLogout} // Menggunakan prop onLogout yang valid
                            className="flex items-center space-x-3 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors border-l border-gray-300 pl-6"
                            title="Klik untuk Keluar"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="font-semibold text-gray-800 text-sm">User</p>
                                <p className="text-gray-500 text-xs">Member</p>
                            </div>
                            {/* Avatar/Ikon Logout */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white border-2 border-amber-700">
                                <LogoutOutlined className="text-xl" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
