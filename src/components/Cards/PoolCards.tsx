/* eslint-disable react-hooks/exhaustive-deps */
import {
    Monitoring,
    Ponds, // <-- Catatan: Fungsi deletePondsById di sini, seharusnya deletePoolsById?
    Pools,
    Sampling,
} from "@/services";
import capitalizeFirstLetter from "@/utils/helpers/capitalize"; // Tidak digunakan di sini, bisa dihapus jika tidak ada teks yang perlu di-capitalize.
import { Popconfirm, Skeleton } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Import ikon Ant Design yang relevan
import {
    DeleteOutlined,
    FolderOpenOutlined,
    DoubleRightOutlined,
    // Ikon untuk parameter air
    ExperimentOutlined, // pH
    CloudOutlined, // Oxygen
    BgColorsOutlined, // Salinity
    CoffeeOutlined, // Temperature (atau sejenisnya)
    DashOutlined // Placeholder untuk data yang tidak ada
} from "@ant-design/icons";

interface IRecord {
    salinity: number;
    acidity: number; // pH
    oxygen: number;
    temperature: number;
}

interface IPoolsCard {
    _id: string;
    pondsId: string;
    poolsName: string;
    listRefresher: Function;
}

function PoolCards(props: IPoolsCard) {
    const [recentMonitoring, setRecentMonitoring] = useState<IRecord | null>(null); // Ubah initial state ke null
    const [recentSampling, setRecentSampling] = useState<IRecord | null>(null); // Ubah initial state ke null
    const [loadingMonitoring, setLoadingMonitoring] = useState<boolean>(true);
    const [loadingSampling, setLoadingSampling] = useState<boolean>(true);


    // --- CATATAN PENTING ---
    // Fungsi handleDelete di sini memanggil Ponds.deletePondsById.
    // Ini kemungkinan adalah kesalahan. Seharusnya Pools.deletePoolsById.
    // Saya akan biarkan sesuai kode Anda, tapi pastikan ini benar.
    const handleDelete = async () => {
        return await Ponds.deletePondsById({ // <-- Periksa ini!
            isNotify: false,
            pondsId: props._id, // <-- Ini ID kolam (poolsId), bukan pondsId
        }).then((res) => {
            if (!res) return;
            return props.listRefresher();
        });
    };

    const getMonitoring = async () => {
        setLoadingMonitoring(true);
        Monitoring.getAllMonitoring({
            from: "",
            to: "",
            isNotify: false,
            limit: 9999,
            page: 1,
            poolsId: props._id,
            newestTime: "true",
        }).then((res) => {
            if (res && res.data.length > 0) {
                setRecentMonitoring(res.data[res.data.length - 1]);
            } else {
                setRecentMonitoring(null); // Atur ke null jika tidak ada data
            }
            setLoadingMonitoring(false);
        }).catch(() => {
            setLoadingMonitoring(false);
            setRecentMonitoring(null);
        });
    };

    const getSampling = async () => {
        setLoadingSampling(true);
        Sampling.getAllSampling({
            from: "",
            to: "",
            isNotify: false,
            limit: 1,
            page: 1,
            poolsId: props._id,
            newestTime: "true",
        }).then((res) => {
            if (res && res.data.length > 0) {
                setRecentSampling(res.data[0]);
            } else {
                setRecentSampling(null); // Atur ke null jika tidak ada data
            }
            setLoadingSampling(false);
        }).catch(() => {
            setLoadingSampling(false);
            setRecentSampling(null);
        });
    };

    useEffect(() => {
        getMonitoring();
        getSampling();
    }, [props]);

    // Helper untuk menampilkan data atau skeleton
    const renderValue = (value: number | undefined | null, unit: string, isLoading: boolean) => {
        if (isLoading) {
            return <Skeleton.Input active size="small" className="!w-8" />;
        }
        return value !== undefined && value !== null ? `${value} ${unit}` : <DashOutlined className="text-gray-400" />;
    };

    return (
        // *****************************************************************
        // Perubahan Warna & Gradasi untuk Konsisten dengan Sidebar (Orange/Cokelat)
        // Menambahkan Shadow dan Rounded yang lebih menonjol
        // *****************************************************************
        <div className="
            bg-gradient-to-br from-amber-600 to-orange-800
            rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
            p-6 text-white flex flex-col justify-between h-full
        ">
            <div>
                {/* Judul Kolam dengan ikon */}
                <h4 className="text-2xl font-bold flex items-center gap-2 mb-4 pb-2 border-b border-white/30">
                    <FolderOpenOutlined className="text-amber-100" />
                    {props.poolsName}
                </h4>

                <div className="flex flex-row mt-2 mb-4 gap-4">
                    {/* Pemantauan Terakhir */}
                    <div className="flex-1 flex flex-col justify-between pr-2 border-r border-white/20">
                        <h5 className="text-sm font-semibold text-amber-100 mb-2 flex items-center gap-1">
                            <ExperimentOutlined /> Pemantauan Terakhir
                        </h5>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center justify-between">
                                <p className="flex items-center gap-2"><ExperimentOutlined className="text-orange-200" /> pH :</p> {renderValue(recentMonitoring?.acidity, '', loadingMonitoring)}
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="flex items-center gap-2"><CloudOutlined className="text-orange-200" /> O2 :</p> {renderValue(recentMonitoring?.oxygen, '%', loadingMonitoring)}
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="flex items-center gap-2"><BgColorsOutlined className="text-orange-200" /> Salinitas :</p> {renderValue(recentMonitoring?.salinity, 'ppt', loadingMonitoring)}
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="flex items-center gap-2"><CoffeeOutlined className="text-orange-200" /> Suhu :</p> {renderValue(recentMonitoring?.temperature, '°C', loadingMonitoring)}
                            </li>
                        </ul>
                    </div>

                    {/* Sampel Terakhir */}
                    <div className="flex-1 flex flex-col justify-between pl-2">
                        <h5 className="text-sm font-semibold text-amber-100 mb-2 flex items-center gap-1">
                            <ExperimentOutlined /> Sampel Terakhir
                        </h5>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center justify-between">
                                <p className="flex items-center gap-2"><ExperimentOutlined className="text-orange-200" /> pH :</p> {renderValue(recentSampling?.acidity, '', loadingSampling)}
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="flex items-center gap-2"><CloudOutlined className="text-orange-200" /> O2 :</p> {renderValue(recentSampling?.oxygen, '%', loadingSampling)}
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="flex items-center gap-2"><BgColorsOutlined className="text-orange-200" /> Salinitas :</p> {renderValue(recentSampling?.salinity, 'ppt', loadingSampling)}
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="flex items-center gap-2"><CoffeeOutlined className="text-orange-200" /> Suhu :</p> {renderValue(recentSampling?.temperature, '°C', loadingSampling)}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-row gap-4 w-full mt-6 pt-4 border-t border-white/30">
                <Link className="flex-1" href={"/dashboard/ponds/" + props.pondsId + "/pools/" + props._id}>
                    <button className="
                        w-full py-2
                        bg-amber-500 text-orange-950 font-semibold
                        rounded-xl shadow-md hover:bg-amber-400 transition-colors
                        flex items-center justify-center gap-2
                    ">
                        <DoubleRightOutlined /> Buka
                    </button>
                </Link>
                <Popconfirm
                    title="Hapus kolam?"
                    description="Apakah anda yakin untuk menghapus kolam ini?"
                    onConfirm={handleDelete}
                    okText="Iya"
                    cancelText="Tidak"
                    okButtonProps={{ loading: false }}
                >
                    <button className="
                        w-full flex-1 py-2
                        bg-red-600 text-white font-semibold
                        rounded-xl shadow-md hover:bg-red-500 transition-colors
                        flex items-center justify-center gap-2
                    ">
                        <DeleteOutlined /> Hapus
                    </button>
                </Popconfirm>{" "}
            </div>
        </div>
    );
}

export default PoolCards;
