/* eslint-disable react-hooks/exhaustive-deps */
import PondCards from "@/components/Cards/PondCards"; // Dipertahankan walau tidak dipakai
import CenterEmpty from "@/components/Empty/CenterEmpty"; // Dipertahankan walau tidak dipakai
import { Ponds, Users } from "@/services";
import cookiesHandler from "@/utils/storage/cookies";
import { CopyOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"; // Tambahkan UserOutlined dan LogoutOutlined
import { message, Skeleton, Button } from "antd"; // Tambahkan Button
import Link from "next/link"; // Dipertahankan
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

function DashboardProfile() {
    // --- STATE DAN LOGIC TETAP SAMA ---
    const [userData, setUserData] = useState<IUserData>();
    const [pondsData, setPondsData] = useState<IPonds[]>(); // State ini tidak digunakan di JSX, tapi dipertahankan
    const router = useRouter();

    function logout() {
        cookiesHandler.deleteCookie("access_token");
        router.replace("/");
    }

    function buttonCopy() {
        if (userData?.apiKey) {
            navigator.clipboard.writeText(userData.apiKey);
            message.success({
                content: `User ID: ${userData.apiKey} berhasil disalin!`,
            });
        }
    }

    useEffect(() => {
        Users.getMyProfile({ isNotify: false }).then((res: any) => {
            if (!res) {
                cookiesHandler.deleteCookie("access_token");
                router.replace("/");
                return;
            }
            setUserData(res.data);
        });
    }, []);

    // --- MULAI PERUBAHAN UI ---
    return (
        // Hapus margin kustom, pertahankan padding bawah
        <div className="pb-16 pt-2">

            <div className="bg-white p-6 rounded-xl shadow-lg">

                {/* Avatar dan Sambutan Utama */}
                <div className="flex flex-col items-center justify-center text-center mb-6 border-b pb-4 border-gray-100">
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-amber-500 text-white border-4 border-amber-300 shadow-md">
                        <UserOutlined className="text-4xl" />
                    </div>
                    <p className="text-lg text-gray-500 mt-4">Hello...!!!</p>
                    {userData?.fullName ? (
                        <h1 className="text-4xl font-extrabold text-gray-800">
                            {userData?.fullName}
                        </h1>
                    ) : (
                        <Skeleton.Input active size="large" className="!w-64 !h-10 mt-2" />
                    )}
                </div>

                {/* Detail Akun (Username & User ID) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">

                    {/* Username */}
                    <div>
                        <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                            <UserOutlined className="text-amber-600" /> Username
                        </p>
                        {userData?.username ? (
                            <p className="text-xl font-medium text-gray-800 mt-1">{userData?.username}</p>
                        ) : (
                            <Skeleton active paragraph={false} title={{ width: '80%' }} />
                        )}
                    </div>

                    {/* User ID / API Key */}
                    <div>
                        <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                            <CopyOutlined className="text-amber-600" /> User ID
                        </p>
                        {userData?.apiKey ? (
                            <div className="flex items-center justify-start gap-3 mt-1">
                                <p className="text-xl font-medium text-gray-800 tracking-wider">
                                    {userData?.apiKey}
                                </p>
                                <button
                                    onClick={buttonCopy}
                                    className="p-1 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                                    title="Salin User ID"
                                >
                                    <CopyOutlined className="text-lg" />
                                </button>
                            </div>
                        ) : (
                            <Skeleton active paragraph={false} title={{ width: '90%' }} />
                        )}
                    </div>

                </div>

                {/* Tombol Logout */}
                <div className="mt-8 pt-4 border-t border-gray-100">
                    <Button
                        onClick={logout}
                        type="default"
                        className="rounded-xl bg-red-600 text-white hover:!bg-red-500 hover:!text-white font-semibold flex items-center justify-center gap-2"
                        size="large"
                    >
                        <LogoutOutlined />
                        Logout
                    </Button>
                </div>

            </div>

        </div>
    );
}

export default DashboardProfile;
