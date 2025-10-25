/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "@/services";
import cookiesHandler from "@/utils/storage/cookies";
import {
    LoadingOutlined,
    UserOutlined,
    LockOutlined,
    ArrowLeftOutlined,
    EyeOutlined, // Tambahkan ikon mata terbuka
    EyeInvisibleOutlined, // Tambahkan ikon mata tertutup
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";

interface ILoginCred {
    username: string;
    password: string;
}

function Signin() {
    const [isLoading, setLoading] = useState<boolean>(false);
    // 1. State baru untuk mengontrol visibilitas password
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();
    const [cred, _setCred] = useState<ILoginCred>({
        username: "",
        password: "",
    });

    // --- LOGIC TETAP SAMA ---
    const setCred = (label: string, value: string) => {
        _setCred({
            ...cred,
            [label]: value,
        });
    };

    const checkLoggedIn = () => {
        const isLoggedIn = cookiesHandler.getCookie("access_token");
        const username_isLoggedIn = cookiesHandler.getCookie("username");
        if (!isLoggedIn) return;
        if (username_isLoggedIn == "admin") {
            router.replace("/admin/ponds");
        } else {
            router.replace("/dashboard");
        }
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        Auth.login({
            data: cred,
            isNotify: true,
        })
            .then((res: any) => {
                if (!res) return setLoading(false);
                cookiesHandler.setCookie(
                    "access_token",
                    res.data.access_token,
                    9999
                );
                if (res.data.data.username) {
                    cookiesHandler.setCookie(
                        "username",
                        res.data.data.username,
                        9999
                    );
                }
                if (res.data.data.username == "admin") {
                    cookiesHandler.setCookie("role", "admin", 9999);
                }
                checkLoggedIn();
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    // Fungsi untuk mengubah visibilitas password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // --- MULAI PERUBAHAN UI ---
    return (
        <div className="flex min-h-screen">
            {/* Left Side: Form Kontainer */}
            <div className="relative flex flex-1 flex-col justify-center bg-white py-12 px-4 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
                {/* Tombol Kembali ke Landing Page */}
                <div className="absolute top-0 left-0 right-0 z-10 w-full px-4 pt-6 sm:px-6 lg:px-8">
                    <Link href="/" legacyBehavior>
                        <a className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors">
                            <ArrowLeftOutlined className="mr-2" />
                            Kembali ke Beranda
                        </a>
                    </Link>
                </div>

                <div className="mx-auto w-full max-w-sm lg:w-96 pt-16">
                    {/* Judul Form */}
                    <div className="mb-8">
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                            Masuk ke Akun
                        </h2>
                        <p className="mt-2 text-base text-gray-600">
                            Selamat datang kembali di <span className="font-semibold text-amber-600">PENS Aqua Tech</span>
                        </p>
                    </div>

                    {/* Form Login */}
                    <div className="mt-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Input Nama Pengguna */}
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nama pengguna
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        onChange={(e) => setCred("username", e.target.value)}
                                        // Gaya Input Rounded dan Orange Focus
                                        className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-3 pl-10 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                    />
                                    <UserOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Input Kata Sandi yang Sudah Dimodifikasi */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Kata sandi
                                </label>
                                <div className="mt-2 relative">
                                    {/* 2. Tentukan type input berdasarkan state showPassword */}
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setCred("password", e.target.value)}
                                        // Tambahkan padding-right untuk ikon mata
                                        className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-3 pl-10 pr-10 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                    />
                                    <LockOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                                    {/* 3. Ikon Mata untuk Toggle Visibility */}
                                    <button
                                        type="button" // Penting: Pastikan ini bukan tipe submit
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                        aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                                    >
                                        {showPassword ? (
                                            <EyeInvisibleOutlined className="text-lg" />
                                        ) : (
                                            <EyeOutlined className="text-lg" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Checkbox dan Ingat Saya */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        // Warna Checkbox Orange
                                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Ingat saya
                                    </label>
                                </div>
                                {/* Tambahkan link lupa password jika ada */}
                            </div>

                            {/* Tombol MASUK */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    // Gaya Tombol Utama Orange/Rounded
                                    className="flex w-full justify-center rounded-xl border border-transparent bg-amber-600 py-3 px-4 text-base font-semibold text-white shadow-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                                >
                                    {isLoading ? <LoadingOutlined className="text-xl" /> : "MASUK"}
                                </button>
                            </div>
                        </form>

                        {/* Link Daftar */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Belum memiliki akun?{' '}
                            <Link href="/auth/signup" className="font-medium text-amber-600 hover:text-amber-500">
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Decorative Image (Menggunakan /images/jumbotron.webp) */}
            <div className="relative hidden w-0 flex-1 lg:block overflow-hidden">
                <Image
                    src="/images/bg_in.png"
                    alt="Latar belakang akuakultur"
                    layout="fill"
                    objectFit="contain"
                    priority
                    className="absolute inset-0 object-cover"
                />
                <div className="absolute inset-0 "></div>
            </div>
        </div>
    );
}

export default Signin;
