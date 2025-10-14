/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "@/services";
import cookiesHandler from "@/utils/storage/cookies";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/AuthLayout/Header";
import React, { FormEvent, useEffect, useState } from "react";

interface ILoginCred {
	username: string;
	password: string;
}

function Signin() {
	const [isLoading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const [cred, _setCred] = useState<ILoginCred>({
		username: "",
		password: "",
	});

	// This function remains the same
	const setCred = (label: string, value: string) => {
		_setCred({
			...cred,
			[label]: value,
		});
	};

	// This function remains the same
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

	// Updated to handle form submission
	const handleLogin = async (e: FormEvent) => {
		e.preventDefault(); // Prevent default form submission
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

	// This useEffect hook remains the same
	useEffect(() => {
		checkLoggedIn();
	}, []);

	// Key Change: The entire JSX structure is updated below
	return (
		<div className="flex min-h-screen">
			{/* Left Side: Navigation and Form */}
			<div className="relative flex flex-1 flex-col justify-center bg-white py-12 px-4 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
				{/* Header Navigation */}
				
				<div className="absolute top-0 left-0 right-0 z-10 w-full px-4 pt-6 sm:px-6 lg:px-8">
				    <Header />
				</div>
				<div className="mx-auto w-full max-w-sm lg:w-96 pt-20">
					<div>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900">
							Selamat Datang Kembali
						</h2>
						<p className="mt-2 text-sm text-gray-600">
							Masukkan nama pengguna dan kata sandi Anda untuk masuk
						</p>
					</div>

					<div className="mt-8">
						<form onSubmit={handleLogin} className="space-y-6">
							<div>
								<label
									htmlFor="username"
									className="block text-sm font-medium text-gray-700"
								>
									Nama pengguna
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
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Kata sandi
								</label>
								<div className="mt-1">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										onChange={(e) => setCred("password", e.target.value)}
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900"
								>
									Ingat saya
								</label>
							</div>

							<div>
								<button
									type="submit"
									disabled={isLoading}
									className="flex w-full justify-center rounded-md border border-transparent bg-indigo-800 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
								>
									{isLoading ? <LoadingOutlined /> : "MASUK"}
								</button>
							</div>
						</form>
						<p className="mt-4 text-center text-sm text-gray-600">
							Sudah memiliki akun?{' '}
							<Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
								Daftar
							</Link>
						</p>
					</div>
				</div>
			</div>

			{/* Right Side: Decorative Image */}
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

export default Signin;