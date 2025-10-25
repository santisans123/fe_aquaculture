// src/layouts/DashboardLayout.tsx
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { message } from "antd";

// Perbarui import sesuai permintaan Anda
import LayoutContainer from "@/components/DashboardLayout/DashboardLayout";
import cookiesHandler from "@/utils/storage/cookies";

interface IMainLayout {
	children: JSX.Element;
}

function DashboardLayout({ children }: IMainLayout) {
	const router = useRouter();
    // Tambahkan state untuk mengontrol kapan konten harus dimuat
    const [isLoading, setIsLoading] = useState(true);

	const checkLoggedIn = () => {
        // Karena fungsi ini akan dipanggil di useEffect,
        // kita TIDAK perlu lagi menambahkan pemeriksaan if (typeof window !== 'undefined') di sini.

		const isLoggedIn = cookiesHandler.getCookie("access_token");
		const role_isLoggedIn = cookiesHandler.getCookie("role");
		const username_isLoggedIn = cookiesHandler.getCookie("username");

		if (!isLoggedIn) {
			message.info({ content: "You have to logged in first!" });
			router.replace("/");
            return false; // Not logged in
		}

		if (username_isLoggedIn === "admin") {
			if (role_isLoggedIn) {
				message.info({ content: "You only admin access !" });
				router.replace("/admin/ponds");
                return false; // Redirecting admin
			}
		}
        return true; // Logged in and has access
	};

	useEffect(() => {
        // Panggil checkLoggedIn HANYA di dalam useEffect untuk memastikan
        // kode berjalan di sisi klien (browser).
		if (checkLoggedIn()) {
            setIsLoading(false);
        }
	}, []);

    // Tampilkan loader atau komponen kosong selama proses autentikasi (Client-Side Check)
    if (isLoading) {
        // Tampilkan sesuatu yang sederhana, misalnya:
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

	return (
        // Gunakan LayoutContainer yang lengkap
		<LayoutContainer>
			{children}
		</LayoutContainer>
	);
}

export default DashboardLayout;
