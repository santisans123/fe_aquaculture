/* eslint-disable react-hooks/exhaustive-deps */
import { Cities, Ponds, Pools, Provinces } from "@/services";
import capitalizeFirstLetter from "@/utils/helpers/capitalize";
import { Popconfirm, Skeleton } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// Import ikon Ant Design yang relevan
import { EnvironmentOutlined, HomeOutlined, DeleteOutlined, FolderOpenOutlined } from "@ant-design/icons";

interface IPonds {
    _id: string;
    pondsName: string;
    userId: string;
    cityId: string;
    listRefresher: Function;
}

interface ICity {
    _id: string;
    cityName: string;
    provinceId: string;
    latitude: string;
    longitude: string;
}

interface IProvince {
    _id: string;
    provinceName: string;
    latitude: string;
    longitude: string;
}

function PondCards(props: IPonds) {
    const [city, setCity] = useState<ICity>();
    const [province, setProvince] = useState<IProvince>();
    const [numberOfPools, setNumberOfPools] = useState<number>(0);

    const getLocation = async () => {
        Cities.getCityById({
            cityId: props.cityId,
            isNotify: false,
        }).then((res: any) => {
            if (!res) return;
            setCity(res.data);
            Provinces.getProvinceById({
                provinceId: res.data.provinceId,
                isNotify: false,
            }).then((res2) => {
                if (!res2) return;
                setProvince(res2.data);
            });
        });
    };

    const getPools = async () => {
        Pools.getPoolsByPondId({ isNotify: false, pondId: props._id }).then(
            (res) => {
                if (!res) return;
                setNumberOfPools(res.data.length);
            }
        );
    };

    const handleDelete = async () => {
        return await Ponds.deletePondsById({
            isNotify: false,
            pondsId: props._id,
        }).then((res) => {
            if (!res) return;
            return props.listRefresher();
        });
    };

    useEffect(() => {
        getLocation();
        getPools();
    }, [props]);

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
                {/* Judul Tambak dengan ikon */}
                <h4 className="text-2xl font-bold flex items-center gap-2">
                    <HomeOutlined className="text-amber-100" />
                    {props.pondsName}
                </h4>

                <div className="flex flex-col gap-3 mt-4">
                    {/* Lokasi Tambak dengan ikon */}
                    <div className="flex items-start gap-3">
                        <EnvironmentOutlined className="text-xl text-amber-100 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            {city?.cityName ? (
                                <p className="text-sm font-semibold leading-tight">
                                    {capitalizeFirstLetter(
                                        (city?.cityName.toLowerCase() as string) || ""
                                    )}
                                </p>
                            ) : (
                                <Skeleton.Button
                                    active={true}
                                    size="small"
                                    shape="default"
                                    block={false}
                                    className="!w-2/3"
                                />
                            )}

                            {province?.provinceName ? (
                                <p className="text-xs font-light leading-tight">
                                    {capitalizeFirstLetter(
                                        (province?.provinceName.toLowerCase() as string) || ""
                                    )}
                                </p>
                            ) : (
                                <Skeleton.Button
                                    active={true}
                                    size="small"
                                    shape="default"
                                    block={false}
                                    className="!w-1/2 mt-1"
                                />
                            )}
                        </div>
                    </div>

                    {/* Jumlah Kolam dengan ikon */}
                    <div className="flex items-center gap-3">
                        <FolderOpenOutlined className="text-xl text-amber-100 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm">Jumlah Kolam</p>
                            {numberOfPools !== undefined ? (
                                <p className="text-3xl font-bold">{numberOfPools}</p>
                            ) : (
                                <Skeleton.Button
                                    active={true}
                                    size="large"
                                    shape="default"
                                    block={false}
                                    className="!w-1/3 mt-1"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-row gap-4 w-full mt-6 pt-4 border-t border-white/30">
                <Link className="flex-1" href={"/dashboard/ponds/" + props._id}>
                    <button className="
                        w-full py-2
                        bg-amber-500 text-orange-950 font-semibold
                        rounded-xl shadow-md hover:bg-amber-400 transition-colors
                    ">
                        Buka
                    </button>
                </Link>
                <Popconfirm
                    title="Hapus tambak?"
                    description="Apakah anda yakin untuk menghapus tambak ini?"
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
                </Popconfirm>
            </div>
        </div>
    );
}

export default PondCards;
