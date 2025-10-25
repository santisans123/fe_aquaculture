/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Cities, Ponds, Pools, Provinces } from "@/services";
import AddNewPools from "./partials/AddNewPools";
import CenterEmpty from "@/components/Empty/CenterEmpty";
import PoolCards from "@/components/Cards/PoolCards";
import Link from "next/link";
import { ArrowLeftOutlined, EnvironmentOutlined, PlusOutlined } from "@ant-design/icons"; // Tambahkan PlusOutlined dan EnvironmentOutlined

// --- INTERFACE TETAP SAMA ---
interface IUserData {
    fullName: string;
    username: string;
    apiKey: string;
}

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

function PondsById() {
    // --- STATE DAN LOGIC TETAP SAMA ---
    const router = useRouter();
    const [pondData, setPondData] = useState<IPonds>();
    const [poolData, setPoolData] = useState<IPools[]>();
    const [cityData, setCityData] = useState<ICity>();
    const [provinceData, setProvinceData] = useState<IProvince>();

    const getPageData = (pondsId: string) => {
        if (!pondsId) return;
        Ponds.getPondById({
            isNotify: true,
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

            Pools.getPoolsByPondId({
                isNotify: true,
                pondId: pondsId,
            }).then((res) => {
                if (!res) return;
                setPoolData(res.data);
            });
        });
    };

    const handleRefresh = () => {
        getPageData(router?.query?.ponds_id as string);
    };

    useEffect(() => {
        getPageData(router?.query?.ponds_id as string);
    }, [router.query.ponds_id]); // Gunakan dependency yang lebih spesifik

    // --- MULAI PERUBAHAN UI ---
    return (
        // Hapus margin kustom, biarkan layout utama yang mengatur padding
        <div className="pb-16 pt-2">

            {/* Bagian Header Konten (Tombol Kembali, Judul, dan Tombol Tambah Kolam) */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">

                    {/* Judul Tambak dan Tombol Kembali */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Link href="/dashboard/ponds" legacyBehavior>
                            {/* Tombol Kembali (Orange/Rounded) */}
                            <a
                                className="p-3 bg-gray-100 rounded-full text-amber-600 hover:bg-gray-200 transition-colors shadow-sm"
                                title="Kembali ke Daftar Tambak"
                            >
                                <ArrowLeftOutlined className="text-xl" />
                            </a>
                        </Link>

                        {/* Detail Tambak */}
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {pondData?.pondsName || "Memuat Tambak..."}
                            </h2>
                            <div className="text-sm text-gray-600 flex items-center gap-1">
                                <EnvironmentOutlined className="text-amber-600" />
                                {cityData?.cityName || 'Kota'} - {provinceData?.provinceName || 'Provinsi'}
                            </div>
                        </div>
                    </div>

                    {/* Tombol Tambah Kolam */}
                    <div className="w-full md:w-auto">
                        <AddNewPools
                            listRefresher={handleRefresh}
                            pondsId={router?.query?.ponds_id as string}
                            pondsName={pondData?.pondsName as string}
                        />
                    </div>
                </div>
            </div>

            {/* Daftar Kolam (Pool Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {poolData && poolData.length > 0 ? (
                    poolData.map((pool: IPools, i: number) => {
                        return (
                            <PoolCards
                                pondsId={router?.query?.ponds_id as string}
                                poolsName={pool.poolsName}
                                _id={pool._id}
                                listRefresher={handleRefresh}
                                key={i}
                            />
                        );
                    })
                ) : (
                    // Tampilan Kosong jika tidak ada data
                    <div className="lg:col-span-3">
                        <CenterEmpty message="Belum ada kolam ditambahkan di tambak ini." />
                    </div>
                )}
            </div>

        </div>
    );
}

export default PondsById;
