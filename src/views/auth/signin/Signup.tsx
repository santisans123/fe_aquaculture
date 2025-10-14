/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "@/services";
import cookiesHandler from "@/utils/storage/cookies";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import Header from "@/components/AuthLayout/Header"; 

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

	// Logika diubah untuk handle registrasi
	const handleSignup = async (e: FormEvent) => {
		e.preventDefault();
		if (passwordConf !== cred.password) {
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

	return (
		<div className="flex min-h-screen">
			{/* Sisi Kiri: Form Pendaftaran */}
			<div className="relative flex flex-1 flex-col justify-center bg-white py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<Header />

				<div className="mx-auto w-full max-w-sm lg:w-96 pt-16">
					<div>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900">
							Bergabunglah dengan kami hari ini
						</h2>
						<p className="mt-2 text-sm text-gray-600">
							Masukkan nama pengguna dan kata sandi Anda untuk mendaftar
						</p>
					</div>

					<div className="mt-8">
						<form onSubmit={handleSignup} className="space-y-0">
							<div>
								<label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
									Nama Lengkap
								</label>
								<div className="mt-1">
									<input
										id="fullName"
										name="fullName"
										type="text"
										autoComplete="name"
										required
										onChange={(e) => setCred("fullName", e.target.value)}
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="username" className="block text-sm font-medium text-gray-700">
									Nama Pengguna
								</label>
								<div className="mt-1">
									<input
										id="username"
										name="username"
										type="text"
										autoComplete="username"
										required
										onChange={(e) => setCred("username", e.target.value)}
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Kata Sandi
								</label>
								<div className="mt-1">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="new-password"
										required
										onChange={(e) => setCred("password", e.target.value)}
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							
							<div>
								<label htmlFor="password-conf" className="block text-sm font-medium text-gray-700">
									Konfirmasi kata sandi
								</label>
								<div className="mt-1">
									<input
										id="password-conf"
										name="password-conf"
										type="password"
										autoComplete="new-password"
										required
										onChange={(e) => setPasswordConf(e.target.value)}
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className="flex items-center">
								<input
									id="terms"
									name="terms"
									type="checkbox"
									required
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
								<label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
									Saya setuju dengan{' '}
									<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
										Syarat dan Ketentuan
									</a>
								</label>
							</div>

							<div>
								<button
									type="submit"
									disabled={isLoading}
									className="flex w-full justify-center rounded-md border border-transparent bg-indigo-800 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
								>
									{isLoading ? <LoadingOutlined /> : "DAFTAR"}
								</button>
							</div>
						</form>
						<p className="mt-4 text-center text-sm text-gray-600">
							Sudah memiliki akun?{' '}
							<Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
								Masuk
							</Link>
						</p>
					</div>
				</div>
			</div>

			<div className="relative hidden w-0 flex-1 lg:block overflow-hidden">
				<div className="absolute inset-0 -skew-x-6 origin-bottom-left scale-125">
					<Image
						src="/images/auth_image/bg-blue.webp" // **IMPORTANT**: Replace with your actual image path
						alt="Decorative background"
						layout="fill"
						objectFit="cover"
						priority
					/>
				</div>
			</div>
		</div>
	);
}

export default Signup;