/* eslint-disable react-hooks/exhaustive-deps */
import PondCards from "@/components/Cards/PondCards";
import CenterEmpty from "@/components/Empty/CenterEmpty";
import { Ponds, Users } from "@/services";
import cookiesHandler from "@/utils/storage/cookies";
import { CopyOutlined, UserOutlined, HomeOutlined, EyeOutlined } from "@ant-design/icons"; // Tambahkan ikon
import { message, Skeleton, Button } from "antd"; // Tambahkan Button ke import
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface IUserData {
    fullName: string;
    username: string;
    apiKey: string;
}

interface IPonds {
    _id: string;
    pondsName: string;
    userId: string;
    cityId: string;
}

function DashboardHome() {
    const [userData, setUserData] = useState<IUserData>();
    const [pondsData, setPondsData] = useState<IPonds[]>();
    const router = useRouter();

    function buttonCopy() {
        // Logik penyalinan API Key
        if (userData?.apiKey) {
            navigator.clipboard.writeText(userData.apiKey);
            message.success({
                content: `User ID: ${userData.apiKey} berhasil disalin!`,
            });
        }
    }

    const getPonds = async () => {
        Ponds.getAllPonds({
            isNotify: true,
            pondsName: "",
            limit: 2, // Mengambil 2 kartu sesuai logic lama
            page: 1,
            cityId: "",
            provinceId: "",
        }).then((res: any) => {
            if (!res) return;
            setPondsData(res.data);
        });
    };

    useEffect(() => {
        const username_isLoggedIn = cookiesHandler.getCookie("username");

        if (username_isLoggedIn == "admin") {
            // FIX: Mengganti router.replace("/dashboard") yang tidak perlu
            router.replace("/admin/ponds");
        } else {
            // FIX: Logika ini menyebabkan loop/masalah. Asumsikan komponen ini hanya
            // dirender di /dashboard dan ganti logic ini dengan sesuatu yang lebih aman
            // (Saya hapus router.replace("/dashboard") agar tidak bentrok)
        }

        Users.getMyProfile({ isNotify: false }).then((res: any) => {
            if (!res) {
                cookiesHandler.deleteCookie("access_token");
                router.replace("/");
                return;
            }
            setUserData(res.data);
        });

        getPonds();
    }, []);

    return (
        // Hapus margin kustom, pertahankan padding bawah
        <div className="pb-16 pt-2">

            {/* 1. Bagian Sambutan dan Info Akun (Card Style) */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white border-2 border-amber-700">
                        <UserOutlined className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-base text-gray-500">Selamat datang kembali!</p>
                        {userData?.fullName ? (
                            <h1 className="text-3xl font-extrabold text-gray-800">
                                {userData?.fullName}
                            </h1>
                        ) : (
                            <Skeleton.Input active size="large" className="!w-48 !h-8" />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">

                    {/* Username */}
                    <div className="flex flex-col">
                        <p className="text-xs font-semibold text-gray-500">Username</p>
                        {userData?.username ? (
                            <p className="text-lg font-medium text-gray-800">{userData?.username}</p>
                        ) : (
                            <Skeleton active paragraph={false} title={{ width: '80%' }} />
                        )}
                    </div>

                    {/* User ID / API Key */}
                    <div className="flex flex-col">
                        <p className="text-xs font-semibold text-gray-500">User ID</p>
                        {userData?.apiKey ? (
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-medium text-gray-800 tracking-wider">
                                    {userData?.apiKey}
                                </p>
                                <button
                                    onClick={buttonCopy}
                                    className="p-1 rounded-full text-amber-600 hover:bg-amber-50 transition-colors"
                                    title="Salin User ID"
                                >
                                    <CopyOutlined />
                                </button>
                            </div>
                        ) : (
                            <Skeleton active paragraph={false} title={{ width: '90%' }} />
                        )}
                    </div>

                </div>
            </div>

            {/* 2. Bagian Daftar Tambak Singkat */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <HomeOutlined className="text-amber-600" /> Tambak Terdaftar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tampilkan 2 kartu tambak teratas */}
                {pondsData?.length ? (
                    pondsData.map((pond: IPonds, i: number) => (
                        <PondCards
                            listRefresher={() => getPonds()}
                            {...pond}
                            key={i}
                        />
                    ))
                ) : (
                    // Tampilkan Skeleton jika data masih loading atau kosong
                    <div className="md:col-span-2">
                        <Skeleton active paragraph={{ rows: 2 }} className="mb-4" />
                        <CenterEmpty message="Belum ada tambak yang terdaftar." />
                    </div>
                )}
            </div>

            {/* Link Lihat Lainnya */}
            <Link href="/dashboard/ponds" legacyBehavior>
                <a className="
                    mt-6 float-right text-base font-semibold
                    text-amber-600 hover:text-amber-700 transition-colors
                    flex items-center gap-1
                ">
                    Lihat semua tambak <EyeOutlined />
                </a>
            </Link>

        </div>
    );
}

export default DashboardHome;
