/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
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

    return (
        <>
            <nav className="w-full fixed top-0 z-50 hidden md:flex justify-center items-center p-4">
                <div 
                    className="w-auto flex items-center justify-between gap-10 px-4 py-2
                               bg-white/60 backdrop-blur-lg rounded-full shadow-md border border-white/20"
                >
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
                                <h1 className="font-semibold text-sm text-gray-800 whitespace-nowrap">
                                    PENS Aquaculture Technology
                                </h1>
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-row items-center gap-6">
                        <a href="#about" className="font-medium text-sm text-gray-700 hover:text-blue-700 transition-colors">Tentang</a>
                        <a href="#developer" className="font-medium text-sm text-gray-700 hover:text-blue-700 transition-colors">Pengembang</a>
                        <a href="#contact" className="font-medium text-sm text-gray-700 hover:text-blue-700 transition-colors">Kontak</a>
                        <Link href="/prediction" className="font-medium text-sm text-gray-700 hover:text-blue-700 transition-colors">Prediksi</Link>
                        <a href="https://drive.google.com/file/d/1KzoGWIWOfHkY_2yqSjhOBsalZmeZujOr/view" className="font-medium text-sm text-gray-700 hover:text-blue-700 transition-colors whitespace-nowrap">Buku Panduan</a>
                        <a href="https://drive.google.com/drive/folders/1gJFkJNaedDHJtldLqIabSeXkhgZ4gOEH?usp=sharing" className="font-medium text-sm text-gray-700 hover:text-blue-700 transition-colors whitespace-nowrap">Aplikasi Mobile</a>
                    </div>

                    <div className="flex items-center gap-2">
                        {userData?.username ? (
                            <Link href={userData.username === "admin" ? "/admin/ponds" : "/dashboard"}>
                                <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                                    <span>{userData.username}</span>
                                    <span className="material-symbols-outlined">account_circle</span>
                                </div>
                            </Link>
                        ) : (
                            <>
                                <Link href="/auth/signin">
                                    <div className="px-6 py-2 text-sm font-semibold text-blue-800 rounded-full border border-blue-800 hover:bg-blue-50 transition-colors">
                                        MASUK
                                    </div>
                                </Link>
                                <Link href="/auth/signup">
                                    <div className="px-6 py-2 text-sm font-semibold text-white bg-blue-800 rounded-full hover:bg-blue-900 transition-colors">
                                        DAFTAR
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <nav className="w-full fixed z-50 flex md:hidden items-center justify-between p-2 bg-white/70 backdrop-blur-md shadow-sm">
                <div className="px-1 py-2 flex items-center">
                    <Link href="/">
                        <div className="flex flex-row items-center gap-4">
                            <Image
                                src="/images/logo-aquaculture-pens.webp"
                                alt="Logo PENS"
                                width={35}
                                height={35}
                                unoptimized={true}
                            />
                            <h1 className="font-bold text-xs text-gray-800">
                                PENS Aquaculture Technology
                            </h1>
                        </div>
                    </Link>
                </div>
                <div className="text-2xl text-gray-800">
                    <button onClick={showDrawer}>
                        <MenuFoldOutlined />
                    </button>
                </div>
                <Drawer
                    title="Menu"
                    placement="right"
                    width={270}
                    open={open}
                    onClose={onClose}
                    className="md:hidden"
                >
                    <div className="flex flex-col flex-1 items-center justify-center gap-4 text-black text-right">
                        <div className="flex flex-col gap-2 flex-2 justify-end w-full">
                            <a href="#about" className="flex-1 border-b py-2">
                                <div className="font-medium text-sm px-2 hover:text-blue-600">
                                    Tentang
                                </div>
                            </a>
                            <a href="#developer" className="flex-1 border-b py-2">
                                <div className="font-medium text-sm px-2 hover:text-blue-600">
                                    Pengembang
                                </div>
                            </a>
                            <a href="#contact" className="flex-1 border-b py-2">
                                <div className="font-medium text-sm px-2 hover:text-blue-600">
                                    Kontak
                                </div>
                            </a>
                            <Link href="/prediction" className="flex-1 border-b py-2">
                                <div className="font-medium text-sm px-2 hover:text-blue-600">
                                    Prediksi
                                </div>
                            </Link>
                            <a href="https://drive.google.com/file/d/1KzoGWIWOfHkY_2yqSjhOBsalZmeZujOr/view" className="flex-1 border-b py-2">
                                <div className="font-medium text-sm px-2 hover:text-blue-600 whitespace-nowrap">
                                    Buku Panduan
                                </div>
                            </a>
                            <a href="https://drive.google.com/drive/folders/1gJFkJNaedDHJtldLqIabSeXkhgZ4gOEH?usp=sharing" className="flex-1 border-b py-2">
                                <div className="font-medium text-sm px-2 hover:text-blue-600 whitespace-nowrap">
                                    Aplikasi Mobile
                                </div>
                            </a>
                        </div>
                        <div className="w-full mt-4">
                            {userData?.username ? (
                                <Link href={userData.username === "admin" ? "/admin/ponds" : "/dashboard"} className="flex-1 flex-row flex justify-end items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                                    <div className="font-semibold text-sm">
                                        {userData.username}
                                    </div>
                                    <span className="material-symbols-outlined">
                                        account_circle
                                    </span>
                                </Link>
                            ) : (
                                <div className="flex flex-col gap-3 justify-end w-full">
                                    <Link href="/auth/signin" className="flex-1 border rounded-md p-2 border-blue-800 text-blue-800 hover:bg-blue-50">
                                        <div className="font-semibold text-sm text-center">
                                            MASUK
                                        </div>
                                    </Link>
                                    <Link href="/auth/signup" className="flex-1 rounded-md p-2 bg-blue-800 text-white hover:bg-blue-900">
                                        <div className="font-semibold text-sm text-center">
                                            DAFTAR
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Drawer>
            </nav>
        </>
    );
}

export default HeaderMainLayout;