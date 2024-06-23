import Head from "next/head";
import AdminProfile from "@/views/admin/profile/AdminProfile";
import AdminLayout from "@/layouts/AdminLayout";

export default function Profle() {
	return (
		<>
			<Head>
				<title>Daftar Tambak - PENS Aquaculture Technology</title>
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
				<AdminProfile />
			</AdminLayout>
		</>
	);
}
