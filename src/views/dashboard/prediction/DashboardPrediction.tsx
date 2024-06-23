// pages/predict/[poolsId].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ChartAcidisity from '../../../components/Chart/ChartAcidicity';
import ChartOxygen from '../../../components/Chart/ChartOxygen';
import ChartTemperature from '../../../components/Chart/ChartTemperature';
import ChartSalinity from '../../../components/Chart/ChartSalinity';
import Link from 'next/link';
import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined';

interface Data {
	actual: {
		acidity: number[];
		oxygen: number[];
		salinity: number[];
		temperature: number[];
	};
	predicted: {
		acidity: number[];
		oxygen: number[];
		salinity: number[];
		temperature: number[];
	};
}

function DashboardPrediction() {
	const router = useRouter();
	const { pool_id } = router.query;
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		console.log('https://dev-python.aquaculturepens.com/predict/' + pool_id)
		if (pool_id) {
			const fetchData = async () => {
				try {
					const response = await axios.get('https://dev-python.aquaculturepens.com/predict/' + pool_id);
					setData(response.data);
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			};

			fetchData();
		}
	}, [pool_id]);

	if (!data) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Link href="/dashboard/ponds">
				<button className="text-2xl font-bold text-red-600">
					<ArrowLeftOutlined />
				</button>
			</Link>
			<h1>Acidity Levels</h1>
			<ChartAcidisity data={data} />
			<ChartTemperature data={data} />
			<ChartSalinity data={data} />
			<ChartOxygen data={data} />
		</div>
	);
};

export default DashboardPrediction;
