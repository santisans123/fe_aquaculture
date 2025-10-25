/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, Switch, Button } from "antd";
import React, { useEffect, useState } from "react";

import { Sampling } from "@/services";
import RecordTable from "@/components/RecordTable";
import socketIOClient from "socket.io-client";
import {
    generateCSVFromCollections,
    downloadGeneratedCsv,
} from "@/utils/helpers/csv";

import RecordChart from "@/components/RecordChart";
// Import ikon untuk konsistensi
import { DownloadOutlined, CalendarOutlined, LineChartOutlined, TableOutlined } from "@ant-design/icons";

interface ISamplingPanel {
    poolId: string;
}

function SamplingPanel(props: ISamplingPanel) {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [records, setRecords] = useState([]);
    const [labels, setLabels] = useState([]);
    const [oxygen, setOxygen] = useState([]);
    const [salinity, setSalinity] = useState([]);
    const [pH, setpH] = useState([]);
    const [temp, setTemp] = useState([]);
    const [isChartView, setChartView] = useState(true); // State untuk toggle Chart/Table

    // --- LOGIC PENGAMBILAN DATA (TIDAK DIUBAH) ---
    const getTodayMonitoring = async () => {
        const allMonitoring = await Sampling.getTodaySampling({
            isNotify: false,
            poolsId: props.poolId,
        }).then((res) => {
            if (!res) return;

            setRecords(res.data);
            return res.data.map((datum: any, i: number) => {
                const time =
                    Math.round(
                        new Date(datum.updatedAt).getTime() / (1000 * 60 * 60)
                    ) *
                    60 *
                    60;
                const d = new Date(0);
                d.setUTCSeconds(time);
                return {
                    time: d,
                    ...datum,
                };
            });
        });

        const thisDate = new Date(Date.now());

        const date = `${thisDate.getFullYear()}-${thisDate.getMonth() + 1
            }-${thisDate.getDate()}`;

        const startOfDay = new Date(new Date(date).toLocaleString()).getTime();

        const recentTime = new Date(Date.now()).getTime();

        const plottedDate: any = [];
        const plottedTemp: any = [];
        const plottedOxy: any = [];
        const plottedSal: any = [];
        const plottedPH: any = [];

        let lastTemp: any = 0;
        let lastOxy: any = 0;
        let lastSal: any = 0;
        let lastPH: any = 0;

        for (let time = startOfDay; time < recentTime; time += 3600000) {
            const d = new Date(0);
            d.setUTCMilliseconds(time);

            allMonitoring?.forEach((mon: any, ine: number) => {
                if (mon.time.toString() === d.toString()) {
                    plottedDate.push(
                        new Date(mon.createdAt).toLocaleTimeString()
                    );
                    plottedOxy.push(mon.oxygen);
                    plottedSal.push(mon.salinity);
                    plottedPH.push(mon.acidity);
                    plottedTemp.push(mon.temperature);
                    lastOxy = mon.oxygen;
                    lastSal = mon.salinity;
                    lastPH = mon.acidity;
                    lastTemp = mon.temperature;
                    return;
                }
            });
            plottedDate.push("");
            plottedOxy.push(lastOxy);
            plottedSal.push(lastSal);
            plottedPH.push(lastPH);
            plottedTemp.push(lastTemp);
        }

        setLabels(plottedDate);
        setOxygen(plottedOxy);
        setSalinity(plottedSal);
        setTemp(plottedTemp);
        setpH(plottedPH);
    };

    const getSamplingByDate = async () => {
        const samplingDataAtSelectedDate = await Sampling.getAllSampling({
            isNotify: false,
            poolsId: props.poolId,
            from: startDate,
            to:
                endDate ||
                new Date(new Date(startDate).getTime() + 86400000)
                    .toISOString()
                    .split("T")[0],
            limit: 9999,
            page: 1,
            newestTime: "true",
        }).then((res) => {
            if (!res) return [];

            setRecords(res.data);
            return res.data.map((datum: any, i: number) => {
                const time =
                    Math.round(
                        new Date(datum.updatedAt).getTime() / (1000 * 60 * 60)
                    ) *
                    60 *
                    60;
                const d = new Date(0);
                d.setUTCSeconds(time);
                return {
                    time: d,
                    ...datum,
                };
            });
        });

        const plottedDate: any = [];
        const plottedTemp: any = [];
        const plottedOxy: any = [];
        const plottedSal: any = [];
        const plottedPH: any = [];

        let lastTemp: any = 0;
        let lastOxy: any = 0;
        let lastSal: any = 0;
        let lastPH: any = 0;

        samplingDataAtSelectedDate?.forEach((mon: any, ine: number) => {
            plottedDate.push(new Date(mon.createdAt).toLocaleTimeString());
            plottedOxy.push(mon.oxygen);
            plottedSal.push(mon.salinity);
            plottedPH.push(mon.acidity);
            plottedTemp.push(mon.temperature);
            lastOxy = mon.oxygen;
            lastSal = mon.salinity;
            lastPH = mon.acidity;
            lastTemp = mon.temperature;
        });

        setLabels(plottedDate);
        setOxygen(plottedOxy);
        setSalinity(plottedSal);
        setTemp(plottedTemp);
        setpH(plottedPH);
    };

    const socketInit = () => {
        const socket = socketIOClient("wss://dev-api-2023.aquaculturepens.com");
        socket.on("Sample:" + props.poolId, async (data) => {
            getTodayMonitoring();
        });
    };

    function handleDownloadClick() {
        const csvData = generateCSVFromCollections(records);
        let filename: string = "data_sampling";

        if (startDate && endDate) filename += `_${startDate}_${endDate}`;
        else if (startDate) filename += `_${startDate}`;
        else filename += `_${new Date().toISOString().split("T")[0]}`;
        filename += ".csv";
        downloadGeneratedCsv(csvData, filename);
    }

    useEffect(() => {
        setRecords([]);
        if (startDate || endDate) {
            getSamplingByDate();
        } else {
            getTodayMonitoring();
            socketInit();
        }
    }, [startDate, endDate]);
    // --- AKHIR LOGIC PENGAMBILAN DATA ---

    return (
        <div className="mt-4 w-full">

            {/* Bagian Filter Tanggal dan Download */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                    {/* Filter Tanggal */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full md:w-auto">
                        <DatePicker
                            onChange={(date, dateString) => {
                                setStartDate(Array.isArray(dateString) ? dateString[0] : dateString);
                            }}
                            placeholder="Tanggal Awal"
                            allowClear
                            // Gaya Rounded dan Ikon
                            className="rounded-xl border-gray-300 hover:border-amber-500 focus:border-amber-500"
                            suffixIcon={<CalendarOutlined className="text-amber-600" />}
                        />
                        <span className="hidden md:inline font-bold text-gray-500">-</span>
                        <DatePicker
                            onChange={(date, dateString) => {
                                setEndDate(Array.isArray(dateString) ? dateString[0] : dateString);
                            }}
                            placeholder="Tanggal Akhir"
                            disabled={!startDate}
                            allowClear
                            // Gaya Rounded dan Ikon
                            className="rounded-xl border-gray-300 hover:border-amber-500 focus:border-amber-500"
                            suffixIcon={<CalendarOutlined className="text-amber-600" />}
                        />
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex gap-4">
                        {/* Tombol Unduh CSV (Orange/Rounded) */}
                        <Button
                            className="rounded-xl bg-amber-600 text-white hover:!bg-amber-500 hover:!text-white font-semibold flex items-center gap-1"
                            onClick={handleDownloadClick}
                        >
                            <DownloadOutlined /> Unduh CSV
                        </Button>

                        {/* Toggle Chart/Table */}
                        <Button
                            onClick={() => setChartView(!isChartView)}
                            className="rounded-xl border-amber-600 text-amber-600 hover:!bg-amber-50 font-semibold"
                            icon={isChartView ? <TableOutlined /> : <LineChartOutlined />}
                        >
                            {isChartView ? 'Lihat Tabel' : 'Lihat Grafik'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Area Data: Grafik atau Tabel */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                {isChartView ? (
                    <>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                             <LineChartOutlined className="text-amber-600" /> Grafik Sampel Air
                        </h3>

                        <RecordChart
                            labels={labels}
                            temp={temp}
                            oxygen={oxygen}
                            salinity={salinity}
                            pH={pH}
                        />

                        {/* Legenda (Disesuaikan dengan tema) */}
                        <div className="mt-8 flex flex-wrap items-center justify-center text-sm text-gray-600 border-t pt-4">
                            <span className="flex items-center mr-4">
                                <span className="w-4 h-4 bg-gray-700 rounded-full mr-2"></span>
                                Normal
                            </span>
                            <span className="flex items-center mr-4">
                                <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                                Dibawah Batas Bawah
                            </span>
                            <span className="flex items-center">
                                <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                                Diatas Batas Atas
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                             <TableOutlined className="text-amber-600" /> Data Sampel dalam Tabel
                        </h3>
                        <div className="mt-4 overflow-x-auto">
                            <RecordTable records={records} />
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}

export default SamplingPanel;
