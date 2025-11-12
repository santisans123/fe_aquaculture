/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, Button } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs'; // ✅ Import dayjs untuk DatePicker value

import { Monitoring } from "@/services";
import RecordTable from "@/components/RecordTable";
import socketIOClient from "socket.io-client";
import {
    generateCSVFromCollections,
    downloadGeneratedCsv,
} from "@/utils/helpers/csv";

import RecordChart from "@/components/RecordChart";
import Link from "next/link";
import { DownloadOutlined, CalendarOutlined, LineChartOutlined, TableOutlined, BulbOutlined } from "@ant-design/icons";

interface IMonitoringPanel {
    poolId: string;
}

function MonitoringPanel(props: IMonitoringPanel) {
    // ✅ Set default ke tanggal 1 bulan ini dan hari ini
    const getDefaultDates = () => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return {
            start: formatDate(firstDayOfMonth),
            end: formatDate(today)
        };
    };

    const defaultDates = getDefaultDates();

    const [startDate, setStartDate] = useState<string>(defaultDates.start);
    const [endDate, setEndDate] = useState<string>(defaultDates.end);
    const [records, setRecords] = useState([]);
    const [labels, setLabels] = useState([]);
    const [oxygen, setOxygen] = useState([]);
    const [salinity, setSalinity] = useState([]);
    const [pH, setPH] = useState([]);
    const [temp, setTemp] = useState([]);
    const [isChartView, setChartView] = useState(true);
    const [isRealTime, setIsRealTime] = useState(false); // ✅ Toggle untuk mode real-time

    const getTodayMonitoring = async () => {
        const allMonitoring = await Monitoring.getTodayMonitoring({
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
        const date = `${thisDate.getFullYear()}-${thisDate.getMonth() + 1}-${thisDate.getDate()}`;
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
                    plottedPH.push(mon.acidity); // ✅ Mengambil dari 'acidity'
                    plottedTemp.push(mon.temperature);
                    lastOxy = mon.oxygen;
                    lastSal = mon.salinity;
                    lastPH = mon.acidity; // ✅ Update lastPH dari 'acidity'
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
        setPH(plottedPH); // ✅ FIX: Ubah dari setpH ke setPH
    };

    const getMonitoringByDate = async () => {
        const monitoringDataAtSelectedDate = await Monitoring.getAllMonitoring({
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
            newestTime: "false",
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

        monitoringDataAtSelectedDate?.forEach((mon: any, ine: number) => {
            plottedDate.push(new Date(mon.createdAt).toLocaleTimeString());
            plottedOxy.push(mon.oxygen);
            plottedSal.push(mon.salinity);
            plottedPH.push(mon.acidity); // ✅ Mengambil dari 'acidity'
            plottedTemp.push(mon.temperature);
            lastOxy = mon.oxygen;
            lastSal = mon.salinity;
            lastPH = mon.acidity; // ✅ Update lastPH dari 'acidity'
            lastTemp = mon.temperature;
            return;
        });

        setLabels(plottedDate);
        setOxygen(plottedOxy);
        setSalinity(plottedSal);
        setTemp(plottedTemp);
        setPH(plottedPH); // ✅ FIX: Tambahkan setPH yang hilang!
    };

    const socketInit = () => {
        const socket = socketIOClient("wss://dev-api-2023.aquaculturepens.com");
        socket.on("Monitor:" + props.poolId, async (data) => {
            getTodayMonitoring();
        });
    };

    function handleDownloadClick() {
        const csvData = generateCSVFromCollections(records);
        let filename: string = "data_monitoring";

        if (startDate && endDate) filename += `_${startDate}_${endDate}`;
        else if (startDate) filename += `_${startDate}`;
        else filename += `_${new Date().toISOString().split("T")[0]}`;
        filename += ".csv";
        downloadGeneratedCsv(csvData, filename);
    }

    useEffect(() => {
        setRecords([]);
        // ✅ Selalu gunakan getMonitoringByDate karena sudah ada default range
        getMonitoringByDate();
    }, [startDate, endDate]);

    return (
        <div className="mt-4 w-full">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full md:w-auto">
                        <DatePicker
                            onChange={(date, dateString) => {
                                setStartDate(Array.isArray(dateString) ? dateString[0] : dateString);
                            }}
                            placeholder="Tanggal Awal"
                            allowClear
                            value={startDate ? dayjs(startDate) : null}
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
                            value={endDate ? dayjs(endDate) : null}
                            className="rounded-xl border-gray-300 hover:border-amber-500 focus:border-amber-500"
                            suffixIcon={<CalendarOutlined className="text-amber-600" />}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">

                        {/* Tombol Reset ke Bulan Ini */}
                        <Button
                            className="rounded-xl border-gray-400 text-gray-600 hover:!bg-gray-50 font-semibold flex items-center justify-center gap-1"
                            onClick={() => {
                                const dates = getDefaultDates();
                                setStartDate(dates.start);
                                setEndDate(dates.end);
                            }}
                        >
                            <CalendarOutlined /> Bulan Ini
                        </Button>

                        {/* Tombol Buka Prediksi (Primary Orange/Rounded) */}
                        <Link href={"/dashboard/prediction/" + props.poolId} legacyBehavior>
                             <Button
                                className="rounded-xl bg-amber-600 text-white hover:!bg-amber-500 hover:!text-white font-semibold flex items-center justify-center gap-1"
                            >
                                <BulbOutlined /> Buka Prediksi
                            </Button>
                        </Link>

                        {/* Tombol Unduh CSV (Sekunder Orange Outline/Rounded) */}
                        <Button
                            className="rounded-xl border-amber-600 text-amber-600 hover:!bg-amber-50 font-semibold flex items-center justify-center gap-1"
                            onClick={handleDownloadClick}
                        >
                            <DownloadOutlined /> Unduh CSV
                        </Button>

                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-end mb-4">
                    <Button
                        onClick={() => setChartView(!isChartView)}
                        className="rounded-xl border-amber-600 text-amber-600 hover:!bg-amber-50 font-semibold"
                        icon={isChartView ? <TableOutlined /> : <LineChartOutlined />}
                    >
                        {isChartView ? 'Lihat Tabel' : 'Lihat Grafik'}
                    </Button>
                </div>

                {isChartView ? (
                    <>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                             <LineChartOutlined className="text-amber-600" /> Grafik Pemantauan Air
                        </h3>

                        <RecordChart
                            labels={labels}
                            temp={temp}
                            oxygen={oxygen}
                            salinity={salinity}
                            pH={pH}
                        />

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
                             <TableOutlined className="text-amber-600" /> Data Pemantauan dalam Tabel
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

export default MonitoringPanel;
