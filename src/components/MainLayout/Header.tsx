/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons"; // Tambahkan UserOutlined
import { Drawer } from "antd";
import { useRouter } from "next/router";
import { Users } from "@/services";

interface IUserData {
    fullName: string;
    username: string;
    apiKey: string;
}

function HeaderMainLayout() {
    const router = useRouter();
    const [userData, setUserData] = useState<IUserData>();

    const [open, setOpen] = useState(false);
    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    useEffect(() => {
        Users.getMyProfile({ isNotify: false }).then((res: any) => {
            if (!res) return;
            setUserData(res.data);
        });
    }, []);

    // Gaya link hover yang konsisten dengan tema orange
    const linkHoverClass = "font-medium text-sm text-gray-700 hover:text-amber-700 transition-colors whitespace-nowrap";

    return (
        <>
            {/* --- 1. Header Desktop (Floating & Rounded) --- */}
            <nav className="w-full fixed top-0 z-50 hidden md:flex justify-center items-center p-4">
                <div
                    className="w-auto flex items-center justify-between gap-10 px-6 py-3
                               bg-white/70 backdrop-blur-xl rounded-full shadow-lg border border-white/40"
                >
                    {/* Logo dan Judul */}
                    <div className="flex items-center">
                        <Link href="/">
                            <div className="flex flex-row items-center gap-3">
                                <Image
                                    className="cursor-pointer"
                                    src="/images/logo-aquaculture-pens.webp"
                                    alt="Logo PENS"
                                    width={40}
                                    height={40}
                                    unoptimized={true}
                                />
                                <h1 className="font-extrabold text-lg text-gray-800 whitespace-nowrap">
                                    PENS <span className="text-amber-600">Aquaculture</span>
                                </h1>
                            </div>
                        </Link>
                    </div>

                    {/* Navigasi Menu */}
                    <div className="flex flex-row items-center gap-6">
                        <a href="#about" className={linkHoverClass}>Tentang</a>
                        <a href="#developer" className={linkHoverClass}>Pembina</a>
                        <a href="#contact" className={linkHoverClass}>Kontak</a>
                        <Link href="/prediction" className={linkHoverClass}>Prediksi</Link>
                        {/* <a href="https://drive.google.com/file/d/1KzoGWIWOfHkY_2yqSjhOBsalZmeZujOr/view" target="_blank" className={linkHoverClass}>Buku Panduan</a> */}
                        {/* <a href="https://drive.google.com/drive/folders/1gJFkJNaedDHJtldLqIabSeXkhgZ4gOEH?usp=sharing" target="_blank" className={linkHoverClass}>Aplikasi Mobile</a> */}
                    </div>

                    {/* Tombol Aksi (Login/Dashboard) */}
                    <div className="flex items-center gap-2">
                        {userData?.username ? (
                            // Link Dashboard (Orange Border)
                            <Link href={userData.username === "admin" ? "/admin/ponds" : "/dashboard"} legacyBehavior>
                                <a className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-800 rounded-full border border-amber-600 hover:bg-amber-50 transition-colors">
                                    <UserOutlined className="text-amber-600" />
                                    <span>{userData.username}</span>
                                </a>
                            </Link>
                        ) : (
                            <>
                                {/* MASUK (Outline Orange) */}
                                <Link href="/auth/signin">
                                    <div className="px-6 py-2 text-sm font-semibold rounded-full border border-amber-600 text-amber-800 hover:bg-amber-50 transition-colors">
                                        MASUK
                                    </div>
                                </Link>
                                {/* DAFTAR (Solid Orange) */}
                                <Link href="/auth/signup">
                                    <div className="px-6 py-2 text-sm font-semibold text-white bg-amber-600 rounded-full hover:bg-amber-700 transition-colors shadow-md">
                                        DAFTAR
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* --- 2. Header Mobile --- */}
            <nav className="w-full fixed z-50 flex md:hidden items-center justify-between p-3 bg-white/90 backdrop-blur-md shadow-lg">
                <div className="px-1 py-2 flex items-center">
                    <Link href="/">
                        <div className="flex flex-row items-center gap-3">
                            <Image
                                src="/images/logo-aquaculture-pens.webp"
                                alt="Logo PENS"
                                width={35}
                                height={35}
                                unoptimized={true}
                            />
                            <h1 className="font-extrabold text-base text-gray-800">
                                PENS <span className="text-amber-600">Aqua</span>
                            </h1>
                        </div>
                    </Link>
                </div>
                <div className="text-2xl text-gray-800">
                    <button onClick={showDrawer} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <MenuFoldOutlined />
                    </button>
                </div>

                {/* Drawer Mobile */}
                <Drawer
                    title={<span className="font-bold text-xl text-amber-700">Menu Navigasi</span>}
                    placement="right"
                    width={270}
                    open={open}
                    onClose={onClose}
                    className="md:hidden"
                >
                    <div className="flex flex-col flex-1 items-start justify-start gap-1 text-gray-800">
                        {/* Link Menu */}
                        <a href="#about" onClick={onClose} className="w-full border-b py-3 font-medium text-base hover:text-amber-700 transition-colors">Tentang</a>
                        <a href="#developer" onClick={onClose} className="w-full border-b py-3 font-medium text-base hover:text-amber-700 transition-colors">Pengembang</a>
                        <a href="#contact" onClick={onClose} className="w-full border-b py-3 font-medium text-base hover:text-amber-700 transition-colors">Kontak</a>
                        <Link href="/prediction" onClick={onClose} className="w-full border-b py-3 font-medium text-base hover:text-amber-700 transition-colors">Prediksi</Link>
                        {/* <a href="https://drive.google.com/file/d/1KzoGWIWOfHkY_2yqSjhOBsalZmeZujOr/view" target="_blank" onClick={onClose} className="w-full border-b py-3 font-medium text-base hover:text-amber-700 transition-colors">Buku Panduan</a> */}
                        {/* <a href="https://drive.google.com/drive/folders/1gJFkJNaedDHJtldLqIabSeXkhgZ4gOEH?usp=sharing" target="_blank" onClick={onClose} className="w-full border-b py-3 font-medium text-base hover:text-amber-700 transition-colors">Aplikasi Mobile</a> */}

                        {/* Tombol Aksi Mobile */}
                        <div className="w-full mt-6 flex flex-col gap-3">
                            {userData?.username ? (
                                <Link href={userData.username === "admin" ? "/admin/ponds" : "/dashboard"} onClick={onClose} className="w-full">
                                    <div className="text-center px-6 py-3 text-base font-semibold rounded-full border border-amber-600 text-amber-800 hover:bg-amber-50 transition-colors">
                                        <UserOutlined /> Ke Dashboard
                                    </div>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/auth/signin" onClick={onClose} className="w-full">
                                        <div className="text-center px-6 py-3 text-base font-semibold rounded-full border border-amber-600 text-amber-800 hover:bg-amber-50 transition-colors">
                                            MASUK
                                        </div>
                                    </Link>
                                    <Link href="/auth/signup" onClick={onClose} className="w-full">
                                        <div className="text-center px-6 py-3 text-base font-semibold text-white bg-amber-600 rounded-full hover:bg-amber-700 transition-colors">
                                            DAFTAR
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </Drawer>
            </nav>
        </>
    );
}

export default HeaderMainLayout;
