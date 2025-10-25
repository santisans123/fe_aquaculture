import PondCards from "@/components/Cards/PondCards";
import CenterEmpty from "@/components/Empty/CenterEmpty";
import { Cities, Ponds, Provinces, Users } from "@/services";
import {
    CloseCircleFilled,
    CopyOutlined,
    SearchOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import AddNewPonds from "./partials/AddNewPonds";

// --- INTERFACE TETAP SAMA ---
interface IPonds {
    _id: string;
    pondsName: string;
    userId: string;
    cityId: string;
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

function DashboardPonds() {
    // --- STATE DAN LOGIC TETAP SAMA ---
    const [pondsData, setPondsData] = useState<IPonds[]>();
    const [provincesData, setProvincesData] = useState<IProvince[]>();
    const [citiesData, setCitiesData] = useState<ICity[]>();
    const [selectedProv, setSelectedProv] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [queryName, setQueryName] = useState<string>("");

    // Fungsi handle data tidak diubah
    const handleChangeProv = (value: string) => {
        setSelectedProv(value);
        findPonds(queryName, "", value);
        Cities.getAllCitiesByProvinceId({
            isNotify: false,
            provinceId: value,
        }).then((res: any) => {
            if (!res) return setCitiesData([]);
            setCitiesData(res.data);
        });
    };

    const handleChangeCity = (value: string, label: any) => {
        setSelectedCity(value);
        findPonds(queryName, value, "");
    };

    const findPonds = async (
        pondName: string,
        cityId: string,
        provinceId: string
    ) => {
        Ponds.getAllPonds({
            isNotify: false,
            pondsName: pondName,
            limit: 9999,
            page: 1,
            cityId,
            provinceId,
        }).then((res: any) => {
            if (!res) return setPondsData([]);
            setPondsData(res.data);
        });
    };

    const findProvince = async (provName: string) => {
        Provinces.getAllProvinces({
            isNotify: false,
            provinceName: provName,
        }).then((res: any) => {
            if (!res) return setProvincesData([]);
            setProvincesData(res.data);
        });
    };

    // Definisikan handleRefresh (Sesuai perbaikan terakhir)
    const handleRefresh = () => {
        findPonds(queryName, selectedCity, selectedProv);
    };

    useEffect(() => {
        findPonds("", "", "");
        findProvince("");
    }, []);

    // --- MULAI PERUBAHAN UI ---
    return (
        <div className="pb-16 pt-2">

            {/* Bagian Judul dan Tombol Tambah */}
            <div className="w-full flex justify-between items-center mb-6 pt-4">
                <h2 className="text-3xl font-bold text-gray-800">Daftar Tambak</h2>
                <AddNewPonds
                    listRefresher={() =>
                        findPonds(queryName, selectedCity, selectedProv)
                    }
                    provincesData={provincesData as IProvince[]}
                />
            </div>

            {/* Area Filter dan Pencarian - Menggunakan card style Orange/Rounded */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

    {/* CONTAINER UTAMA DUA KOLOM: Nama Tambak (kiri) dan Filter Lokasi (kanan) */}
    <div className="flex flex-col md:flex-row gap-6">

        {/* KOLOM KIRI: Cari Nama Tambak */}
        <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">
                Cari Tambak berdasarkan Nama
            </p>
            <Input
                onChange={(txt) => {
                    setQueryName(txt.target.value);
                    findPonds(txt.target.value, selectedCity, selectedProv);
                }}
                className="w-full rounded-xl border-gray-300 hover:border-amber-500 focus:border-amber-500"
                placeholder="Cari nama tambak anda..."
                prefix={<SearchOutlined className="text-gray-400" />}
            />
        </div>

        {/* KOLOM KANAN: Filter Lokasi (Provinsi & Kota) */}
        <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">Filter berdasarkan Lokasi</p>

            {/* SUB-KOLOM LOKASI (Provinsi dan Kota) Berdampingan */}
            <div className="flex flex-col sm:flex-row gap-4">

                {/* Pilih Provinsi */}
                <div className="flex-1 flex items-center gap-2">
                    {/* Menggunakan label yang lebih ringkas agar fit */}
                    <label className="text-sm font-medium text-gray-700 flex-shrink-0" htmlFor="prov_list">
                        <EnvironmentOutlined className="mr-1" /> Provinsi
                    </label>
                    <Select
                        value={selectedProv || undefined}
                        placeholder="Pilih Provinsi"
                        className="flex-1 custom-select-rounded"
                        style={{ margin: "0" }}
                        onChange={handleChangeProv}
                        options={provincesData?.map((prov: IProvince) => {
                            return {
                                value: prov._id,
                                label: prov.provinceName,
                            };
                        })}
                    />
                    <button
                        onClick={() => {
                            setSelectedProv("");
                            setSelectedCity(""); // Kosongkan kota juga saat provinsi di-reset
                            findPonds(queryName, "", "");
                        }}
                        className="text-xl text-red-500 hover:text-red-700 transition-colors"
                    >
                        <CloseCircleFilled />
                    </button>
                </div>

                {/* Pilih Kota (Hanya tampil jika Provinsi dipilih) */}
                {selectedProv && (
                    <div className="flex-1 flex items-center gap-2 mt-4 sm:mt-0">
                        {/* Menggunakan label yang lebih ringkas agar fit */}
                        <label className="text-sm font-medium text-gray-700 flex-shrink-0" htmlFor="city_list">
                            <EnvironmentOutlined className="mr-1" /> Kota
                        </label>
                        <Select
                            value={selectedCity || undefined}
                            placeholder="Pilih Kota"
                            className="flex-1 custom-select-rounded"
                            onChange={handleChangeCity}
                            options={citiesData?.map((city: ICity) => {
                                return {
                                    value: city._id,
                                    label: city.cityName,
                                };
                            })}
                        />
                        <button
                            onClick={() => setSelectedCity("")}
                            className="text-xl text-red-500 hover:text-red-700 transition-colors"
                        >
                            <CloseCircleFilled />
                        </button>
                    </div>
                )}
            </div>
				</div>

			</div>
		</div>

            {/* Daftar Kartu Tambak */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                {/* Menampilkan Skeleton jika data belum ada */}
                {!pondsData?.length && (
                    <div className="lg:col-span-3">
                        <Skeleton active paragraph={{ rows: 2 }} />
                        <Skeleton active paragraph={{ rows: 2 }} className="mt-4" />
                        <CenterEmpty message="Tambak tidak ditemukan" />
                    </div>
                )}

                {pondsData?.map((pond: IPonds) => {
                    return (
                        <PondCards
                            listRefresher={handleRefresh}
                            {...pond}
                            key={pond._id}
                        />
                    );
                })}
            </div>

        </div>
    );
}

export default DashboardPonds;
