/* eslint-disable react-hooks/exhaustive-deps */
import { Cities, Ponds, Pools, Provinces } from "@/services";
import {
    ArrowLeftOutlined,
    LinkOutlined,
    EditOutlined,
    DisconnectOutlined,
    FolderOpenOutlined,
    ExperimentOutlined,
    PlusOutlined // <-- FIX: Tambahkan PlusOutlined di sini
} from "@ant-design/icons";
import { Input, Popconfirm, Switch, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MonitoringPanel from "./partials/MonitoringPanel";
import SamplingPanel from "./partials/SamplingPanel";

// --- INTERFACE TETAP SAMA ---
interface IPonds {
    _id: string;
    pondsName: string;
    userId: string;
    cityId: string;
}

interface IPools {
    _id: string;
    poolsName: string;
    userId: string;
    pondsId: string;
    deviceName: string;
}

interface IProvince {
    _id: string;
    provinceName: string;
    latitude: string;
    longitude: string;
}

interface ICity {
    _id: string;
    cityName: string;
    latitude: string;
    longitude: string;
}

function PoolsView() {
    const router = useRouter().query;
    const { ponds_id, pools_id } = router;
    const [isEdit, setEdit] = useState(false);

    const [willUpdatedBindDevice, setWillBindDevice] = useState<string>("");

    const [pondData, setPondData] = useState<IPonds>();
    const [poolData, setPoolData] = useState<IPools>();
    const [cityData, setCityData] = useState<ICity>();
    const [provinceData, setProvinceData] = useState<IProvince>();

    const [isMonitoring, setMonitoring] = useState<boolean>(true);

    // --- LOGIC TETAP SAMA ---
    const handleBindPools = async () => {
        Pools.bindPools({
            isNotify: true,
            poolsId: pools_id as string,
            data: {
                deviceName: willUpdatedBindDevice,
            },
        }).then((res) => {
            if (!res) return;
            getPageData(ponds_id as string);
            setEdit(false);
        });
    };

    const handleUnbindPools = async () => {
        Pools.bindPools({
            isNotify: true,
            poolsId: pools_id as string,
            data: {
                deviceName: "",
            },
        }).then((res) => {
            if (!res) return;
            getPageData(ponds_id as string);
            setEdit(false);
        });
    };

    const getPageData = (pondsId: string) => {
        if (!pondsId) return;
        Ponds.getPondById({
            isNotify: false,
            pondsId,
        }).then((res) => {
            if (!res) return;
            setPondData(res?.data);

            const cityId = res?.data?.cityId;

            Cities.getCityById({ cityId, isNotify: false }).then((res) => {
                if (!res) return;
                setCityData(res?.data);

                Provinces.getProvinceById({
                    isNotify: false,
                    provinceId: res?.data?.provinceId,
                }).then((res) => {
                    if (!res) return;
                    setProvinceData(res?.data);
                });
            });

            Pools.getPoolsById({
                isNotify: false,
                poolsId: pools_id as string,
            }).then((res) => {
                if (!res) return;
                setPoolData(res.data);
                setWillBindDevice(res.data?.deviceName);
            });
        });
    };

    useEffect(() => {
        getPageData(ponds_id as string);
    }, [router.ponds_id, router.pools_id]);

    // --- MULAI PERUBAHAN UI ---
    return (
        <div className="pb-16 pt-2">

            {/* Bagian Header Konten (Tombol Kembali & Judul) */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-6">

                    {/* Judul Kolam dan Tombol Kembali */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Link href={`/dashboard/ponds/${ponds_id}`} legacyBehavior>
                            {/* Tombol Kembali (Orange/Rounded) */}
                            <a
                                className="p-3 bg-gray-100 rounded-full text-amber-600 hover:bg-gray-200 transition-colors shadow-sm"
                                title="Kembali ke Daftar Kolam"
                            >
                                <ArrowLeftOutlined className="text-xl" />
                            </a>
                        </Link>

                        {/* Detail Kolam dan Tambak */}
                        <div className="flex flex-col">
                            {/* Nama Kolam */}
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FolderOpenOutlined className="text-amber-600" />
                                {poolData?.poolsName || "Memuat Kolam..."}
                            </h2>
                            {/* Nama Tambak dan Lokasi */}
                            <p className="text-sm font-medium text-gray-500 mt-1">
                                {pondData?.pondsName || 'Tambak'}
                                {cityData?.cityName &&
                                    <span className="ml-2 text-xs">
                                        ({cityData.cityName}, {provinceData?.provinceName})
                                    </span>
                                }
                            </p>
                        </div>
                    </div>

                    {/* Perangkat Tertaut (Link/Unlink) */}
                    <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <LinkOutlined /> Perangkat Tertaut
                        </p>

                        {/* Tampilan Input atau Nama Perangkat */}
                        <div className="flex items-center gap-2">
                            {/* Tampilkan Input saat Edit */}
                            {isEdit ? (
                                <Input
                                    value={willUpdatedBindDevice}
                                    onChange={(text) => setWillBindDevice(text.target.value)}
                                    className="rounded-xl border-gray-300 hover:border-amber-500 focus:border-amber-500 flex-1"
                                    placeholder="Masukkan nama perangkat..."
                                />
                            ) : (
                                // Tampilkan Nama Perangkat
                                <p className={`text-base font-medium flex-1 ${!poolData?.deviceName ? 'italic text-gray-400' : 'text-gray-800'}`}>
                                    {poolData?.deviceName || "Belum ada perangkat tertaut."}
                                </p>
                            )}

                            {/* Tombol Aksi: Edit/OK/Tambah/Lepas */}
                            {!poolData?.deviceName ? ( // Jika BELUM ADA DEVICE
                                !isEdit ? (
                                    <Button onClick={() => setEdit(true)} className="rounded-xl bg-amber-600 text-white hover:!bg-amber-500">
                                        <PlusOutlined /> Tambah
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button onClick={handleBindPools} className="rounded-xl bg-green-600 text-white hover:!bg-green-500">
                                            Okay
                                        </Button>
                                        <Button onClick={() => setEdit(false)} className="rounded-xl bg-red-500 text-white hover:!bg-red-400">
                                            Batal
                                        </Button>
                                    </div>
                                )
                            ) : !isEdit ? ( // Jika SUDAH ADA DEVICE, mode TAMPIL
                                <div className="flex gap-2">
                                    <Button onClick={() => setEdit(true)} className="rounded-xl border-amber-600 text-amber-600 hover:!bg-amber-50">
                                        <EditOutlined /> Ganti
                                    </Button>
                                    <Popconfirm
                                        title="Lepas perangkat?"
                                        description="Apakah anda yakin untuk melepaskan perangkat ini?"
                                        onConfirm={handleUnbindPools}
                                        okText="Iya"
                                        cancelText="Tidak"
                                        okButtonProps={{ loading: false }}
                                    >
                                        <Button className="rounded-xl bg-red-500 text-white hover:!bg-red-400">
                                            <DisconnectOutlined /> Lepas
                                        </Button>
                                    </Popconfirm>
                                </div>
                            ) : ( // Jika SUDAH ADA DEVICE, mode EDIT
                                <div className="flex gap-2">
                                    <Button onClick={handleBindPools} className="rounded-xl bg-green-600 text-white hover:!bg-green-500">
                                        Okay
                                    </Button>
                                    <Button onClick={() => setEdit(false)} className="rounded-xl bg-red-500 text-white hover:!bg-red-400">
                                        Batal
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Pemilihan Mode: Monitoring vs Sampling */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-xl shadow-md mb-6">
                <p className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3 md:mb-0">
                    <ExperimentOutlined /> Pilih Mode Data
                </p>

                {/* Switch Mode */}
                <Switch
                    onChange={(checked) => setMonitoring(checked)}
                    checkedChildren={
                        <div className="w-44 font-bold text-white text-center">
                            <p>Monitoring</p>
                        </div>
                    }
                    unCheckedChildren={
                        <div className="w-44 font-bold text-white text-center">
                            <p>Sampling</p>
                        </div>
                    }
                    defaultChecked={isMonitoring}
                    className="custom-amber-switch"
                    style={{ backgroundColor: isMonitoring ? '#f97316' : '#6b7280' }}
                />
            </div>

            {/* Panel Data */}
            {isMonitoring ? (
                <MonitoringPanel poolId={pools_id as string} />
            ) : (
                <SamplingPanel poolId={pools_id as string} />
            )}

        </div>
    );
}

export default PoolsView;
