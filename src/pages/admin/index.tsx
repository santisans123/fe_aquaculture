import AdminHeader from "@/components/AdminLayout/Header";
import AdminLayout from "@/layouts/AdminLayout";
import AdminHome from "@/views/admin/home/AdminHome";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Admin - PENS Aquaculture Technology</title>
				<meta
					name="description"
					content="Pascasarjana Politeknik Elektronika Negeri Surabaya"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AdminLayout>
				<AdminHome />
			</AdminLayout>
		</>
	);
}
