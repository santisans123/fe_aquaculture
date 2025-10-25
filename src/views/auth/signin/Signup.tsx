/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "@/services";
import cookiesHandler from "@/utils/storage/cookies";
import { LoadingOutlined, UserOutlined, LockOutlined, ArrowLeftOutlined, MailOutlined, ProfileOutlined } from "@ant-design/icons"; // Tambahkan ikon
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";

interface ISignupCred {
    fullName: string;
    username: string;
    password: string;
}

function Signup() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [passwordConf, setPasswordConf] = useState("");
    const [cred, _setCred] = useState<ISignupCred>({
        fullName: "",
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
        if (!isLoggedIn) return;
        router.replace("/dashboard");
    };

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        if (passwordConf !== cred.password) {
            // FIX: Gunakan message AntD untuk notifikasi error
            return message.error("Konfirmasi kata sandi tidak cocok!");
        }
        setLoading(true);
        Auth.register({
            data: cred,
            isNotify: true,
        })
            .then((res: any) => {
                if (!res) return setLoading(false);
                message.success("Pendaftaran berhasil! Silakan masuk.");
                router.push("/auth/signin");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    // --- MULAI PERUBAHAN UI ---
    return (
        <div className="flex min-h-screen">
            {/* Left Side: Form Pendaftaran */}
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
                            Buat Akun Baru
                        </h2>
                        <p className="mt-2 text-base text-gray-600">
                            Bergabunglah dengan <span className="font-semibold text-amber-600">PENS Aqua Tech</span> hari ini.
                        </p>
                    </div>

                    {/* Form Pendaftaran */}
                    <div className="mt-8">
                        <form onSubmit={handleSignup} className="space-y-4"> {/* Mengubah space-y-0 menjadi space-y-4 */}

                            {/* Nama Lengkap */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Nama Lengkap
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        onChange={(e) => setCred("fullName", e.target.value)}
                                        // Gaya Input Rounded dan Orange Focus
                                        className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-3 pl-10 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                    />
                                    <ProfileOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Nama Pengguna */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Nama Pengguna
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

                            {/* Kata Sandi */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Kata Sandi
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        onChange={(e) => setCred("password", e.target.value)}
                                        // Gaya Input Rounded dan Orange Focus
                                        className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-3 pl-10 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                    />
                                    <LockOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Konfirmasi Kata Sandi */}
                            <div>
                                <label htmlFor="password-conf" className="block text-sm font-medium text-gray-700">
                                    Konfirmasi Kata Sandi
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="password-conf"
                                        name="password-conf"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        onChange={(e) => setPasswordConf(e.target.value)}
                                        // Gaya Input Rounded dan Orange Focus
                                        className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-3 pl-10 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                    />
                                    <LockOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Syarat dan Ketentuan */}
                            <div className="flex items-center pt-2">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    // Warna Checkbox Orange
                                    className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                    Saya setuju dengan{' '}
                                    <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                                        Syarat dan Ketentuan
                                    </a>
                                </label>
                            </div>

                            {/* Tombol DAFTAR */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    // Gaya Tombol Utama Orange/Rounded
                                    className="flex w-full justify-center rounded-xl border border-transparent bg-amber-600 py-3 px-4 text-base font-semibold text-white shadow-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                                >
                                    {isLoading ? <LoadingOutlined className="text-xl" /> : "DAFTAR"}
                                </button>
                            </div>
                        </form>

                        {/* Link Masuk */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Sudah memiliki akun?{' '}
                            <Link href="/auth/signin" className="font-medium text-amber-600 hover:text-amber-500">
                                Masuk
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Decorative Image (Menggunakan /images/jumbotron.webp) */}
			<div className="relative hidden w-0 flex-1 lg:block overflow-hidden">
				<Image
					src="/images/bg_up.png"
					alt="bg"
					layout="fill"
					// Ubah 'cover' menjadi 'contain' untuk memastikan gambar utuh tidak terpotong
					objectFit="contain"
					priority
					// Ubah 'object-cover' menjadi 'object-contain'
					className="absolute inset-0 object-contain"
				/>
				<div className="absolute inset-0"></div>
			</div>
        </div>
    );
}

export default Signup;
