import { Cities, Ponds } from "@/services";
import { Button, Input, Modal, Select } from "antd";
import React, { useState } from "react";
// Import ikon untuk konsistensi
import { PlusOutlined, EnvironmentOutlined } from "@ant-design/icons";

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

interface IAddNewPonds {
    provincesData: IProvince[];
    listRefresher: Function;
}

function AddNewPonds(props: IAddNewPonds) {
    const [selectedProv, setSelectedProv] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [citiesData, setCitiesData] = useState<ICity[]>();
    const [queryName, setQueryName] = useState<string>("");
    const [isModelOpen, setModalOpen] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false); // State untuk loading button

    // --- LOGIC TETAP SAMA ---
    const handleChangeProv = (value: string) => {
        setSelectedProv(value);
        setSelectedCity("");

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
    };

    const handleCreatePond = async () => {
        setIsCreating(true);
        // Memanggil listRefresher di sini agar daftar tambak terupdate
        Ponds.createPonds({
            data: {
                cityId: selectedCity,
                pondsName: queryName,
            },
            isNotify: true,
        })
            .then((res) => {
                if (res) {
                    props.listRefresher(); // Refresh list jika berhasil
                    setModalOpen(false);
                }
            })
            .finally(() => {
                setIsCreating(false);
            });
    };
    // --- AKHIR LOGIC TETAP SAMA ---

    return (
        <>
            {/* 1. Tombol Pembuka Modal (Orange/Rounded) */}
            <button
                onClick={() => setModalOpen(true)}
                className="
                    px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold
                    hover:bg-amber-500 transition-colors shadow-md
                    flex items-center gap-2
                "
            >
                <PlusOutlined />
                <p className="text-sm">Tambah Tambak</p>
            </button>

            {/* 2. Modal Ant Design */}
            <Modal
                open={isModelOpen}
                title={<span className="font-bold text-xl text-gray-800">Tambahkan Tambak Baru</span>}
                // Menambahkan footer yang sudah di-style
                footer={[
                    <Button
                        className="rounded-xl font-semibold"
                        key="cancel"
                        onClick={() => setModalOpen(false)}
                    >
                        Batal
                    </Button>,
                    <Button
                        className="rounded-xl font-semibold bg-amber-600 text-white hover:!bg-amber-500 hover:!text-white"
                        key="submit"
                        loading={isCreating}
                        onClick={handleCreatePond}
                        // Disable jika nama kosong atau kota belum dipilih
                        disabled={!queryName || !selectedCity}
                    >
                        Tambah
                    </Button>,
                ]}
                onCancel={() => setModalOpen(false)}
            >
                {/* Konten Form */}
                <div className="py-4 space-y-4">

                    {/* Pilih Provinsi */}
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-700 flex items-center gap-1">
                            <EnvironmentOutlined /> Pilih Provinsi
                        </label>
                        <Select
                            placeholder="Pilih Provinsi"
                            className="rounded-xl overflow-hidden custom-select-rounded"
                            style={{ width: '100%' }}
                            onChange={handleChangeProv}
                            options={props.provincesData?.map((prov: IProvince) => {
                                return { value: prov._id, label: prov.provinceName };
                            })}
                        />
                    </div>

                    {/* Pilih Kota (Jika Provinsi dipilih) */}
                    {selectedProv && (
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700 flex items-center gap-1">
                                <EnvironmentOutlined /> Pilih Kota
                            </label>
                            <Select
                                placeholder="Pilih Kota"
                                value={selectedCity || undefined}
                                className="rounded-xl overflow-hidden custom-select-rounded"
                                style={{ width: '100%' }}
                                onChange={handleChangeCity}
                                options={citiesData?.map((city: ICity) => {
                                    return { value: city._id, label: city.cityName };
                                })}
                            />
                        </div>
                    )}

                    {/* Nama Tambak */}
                    <div className="pt-2 flex flex-col gap-2">
                        <label className="font-medium text-gray-700" htmlFor="pond_name">
                            Nama Tambak
                        </label>
                        <Input
                            id="pond_name"
                            name="pond_name"
                            className="rounded-xl border-gray-300 hover:border-amber-500 focus:border-amber-500"
                            placeholder="Masukkan nama tambak baru"
                            onChange={(text) => setQueryName(text.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default AddNewPonds;
