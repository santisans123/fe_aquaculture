import React from "react";
import Image from "next/image";
// Import ikon untuk konsistensi
import { StarFilled } from '@ant-design/icons';

const sponsorsData = [
    { name: "PENS", src: "/images/sponsor/logopens.webp" },
    { name: "AQUACULTURE PENS", src: "/images/logo-aquaculture-pens.webp" },
    { name: "LPDP", src: "/images/sponsor/lpdp.webp" },
    { name: "MITRAS DUDI", src: "/images/sponsor/mitrasdudi.webp" },
    { name: "KEMENDIKBUD", src: "/images/sponsor/kemendikbud.webp" },
];

export default function Sponsor() {
    return (
        // Mengganti padding vertikal agar lebih proporsional
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Judul Utama */}
                <div className="flex flex-wrap justify-center text-center mb-16">
                    <div className="w-full lg:w-8/12 px-4">
                        <h2 className="
                            text-sm font-bold uppercase tracking-widest text-amber-600
                            flex items-center justify-center gap-2 mb-2
                        ">
                            <StarFilled /> Mitra Kami
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Sponsor & Institusi Pendukung
                        </h3>
                        <p className="text-lg leading-relaxed mt-4 text-gray-600">
                            Pelaksanaan kegiatan riset dan pengembangan platform ini didukung oleh beberapa lembaga dan institusi unggulan.
                        </p>
                    </div>
                </div>

                {/* Daftar Logo (Grid Style) */}
                <div className="flex flex-wrap justify-center -mx-4">
                    {sponsorsData.map((sponsor, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-4 mb-8">
                            <div className="
                                flex flex-col items-center justify-center h-full p-6
                                bg-white rounded-xl shadow-lg hover:shadow-2xl
                                transition-all duration-300 transform hover:-translate-y-1
                            ">
                                {/* Logo (Grayscale dengan Hover Warna) */}
                                <Image
                                    alt={sponsor.name}
                                    src={sponsor.src}
                                    className="
                                        mx-auto object-contain h-24 w-auto
                                        transition-all duration-500
                                    "
                                    width={150}
                                    height={150}
                                    unoptimized={true}
                                />
                                {/* Nama Sponsor */}
                                <div className="pt-4 text-center">
                                    <h5 className="text-base font-bold text-gray-700">
                                        {sponsor.name}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
