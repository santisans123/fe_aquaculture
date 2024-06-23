import Head from "next/head";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPrediction from "@/views/dashboard/prediction/DashboardPrediction";

export default function Auth() {
	return (
		<>
			<Head>
				<title>Data Grafik Hasil Prediksi</title>
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
			<DashboardLayout>
				<DashboardPrediction />
			</DashboardLayout>
		</>
	);
}
