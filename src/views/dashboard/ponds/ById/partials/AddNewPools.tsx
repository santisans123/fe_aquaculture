import { Cities, Ponds, Pools } from "@/services";
import { Button, Input, Modal, Select } from "antd";
import React, { useState } from "react";
// Import ikon untuk konsistensi
import { PlusOutlined, FolderOpenOutlined } from "@ant-design/icons";

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

interface IAddNewPools {
    pondsName: string;
    pondsId: string;
    listRefresher: Function;
}

function AddNewPools(props: IAddNewPools) {
    const [queryName, setQueryName] = useState<string>("");
    const [isModelOpen, setModalOpen] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false); // State untuk loading button

    // --- LOGIC TETAP SAMA ---
    const handleCreatePool = async () => {
        // Logika array [ ... ] diubah menjadi blok try/finally yang lebih standar
        setIsCreating(true);
        try {
             const res = await Pools.createPools({
                data: {
                    pondsId: props.pondsId,
                    poolsName: queryName,
                },
                isNotify: true,
            });

            if (res) {
                // Refresh list jika berhasil
                props.listRefresher();
            }
        } finally {
            setIsCreating(false);
            setModalOpen(false);
        }
    };

    return (
        <>
            {/* 1. Tombol Pembuka Modal (Orange/Rounded) */}
            <button
                onClick={() => setModalOpen(true)}
                className="
                    px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold
                    hover:bg-amber-500 transition-colors shadow-md
                    flex items-center gap-2 w-full
                "
            >
                <PlusOutlined />
                <p className="text-sm">Tambah Kolam</p>
            </button>

            {/* 2. Modal Ant Design */}
            <Modal
                open={isModelOpen}
                title={<span className="font-bold text-xl text-gray-800">Tambahkan Kolam Baru</span>}
                footer={[
                    // Tombol Batal
                    <Button
                        className="rounded-xl font-semibold"
                        key="cancel"
                        onClick={() => setModalOpen(false)}
                    >
                        Batal
                    </Button>,
                    // Tombol Tambah
                    <Button
                        className="rounded-xl font-semibold bg-amber-600 text-white hover:!bg-amber-500 hover:!text-white"
                        key="submit"
                        loading={isCreating}
                        onClick={handleCreatePool}
                        disabled={!queryName} // Disable jika nama kolam kosong
                    >
                        Tambah
                    </Button>,
                ]}
                onCancel={() => setModalOpen(false)}
            >
                <div className="py-4 space-y-6">

                    {/* Detail Tambak yang Dituju */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <h2 className="text-sm font-medium text-gray-600">
                            Kolam akan ditambahkan ke Tambak:
                        </h2>
                        <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2 mt-1">
                            <FolderOpenOutlined /> {props.pondsName}
                        </h3>
                    </div>

                    {/* Input Nama Kolam */}
                    <div className="pt-2 flex flex-col gap-2">
                        <label className="font-medium text-gray-700" htmlFor="pool_name">
                            Nama Kolam
                        </label>
                        <Input
                            id="pool_name"
                            name="pool_name"
                            className="rounded-xl border-gray-300 hover:border-amber-500 focus:border-amber-500"
                            placeholder="Contoh: Kolam 1 / Kolam Timur"
                            onChange={(text) => setQueryName(text.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default AddNewPools;
