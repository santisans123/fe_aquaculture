"use client";

import React, { useRef } from "react";
import Image from "next/image";

// Tipe props untuk card
interface ProfileCardProps {
    name: string;
    role: string;
    imageUrl: string;
    grayscale?: boolean;
}

// Data anggota tim (Data tetap sama)
const teamMembers: ProfileCardProps[] = [
    {
        name: "Dr.Eng Agus Indra Gunawan S.T., M.Sc",
        role: "Pembina",
        imageUrl: "/images/pak_agus.webp",
    },
    {
        name: "Dr. Setiawardhana S.T., M.T",
        role: "Pembina",
        imageUrl: "/images/pak_set.webp",
        grayscale: true,
    },
	{
        name: "Dr. Arna Fariza S.Kom., M.Kom",
        role: "Pembina",
        imageUrl: "/images/bu_arna.jpeg",
        grayscale: true,
    },
	{
        name: "Dr. Ir. Nu Rhahida Arini, S.T., M.T.",
        role: "Pembina",
        imageUrl: "/images/bu_arini.jpg",
        grayscale: true,
    },
	{
        name: "Dr. Eng. Teguh Hady Ariwibowo, S.T., MT.",
        role: "Pembina",
        imageUrl: "/images/pak_teguh.jpeg",
        grayscale: true,
    },
];

// Komponen card (Style Oranye/Rounded)
function ProfileCard({ name, role, imageUrl, grayscale }: ProfileCardProps) {
    return (
        // Menggunakan lebar relatif yang lebih baik untuk responsivitas
        <div className="flex-none w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] p-2 snap-center">
            <div className="
                relative rounded-xl overflow-hidden shadow-xl border-b-4 border-amber-600
                group transform transition-transform duration-300 hover:scale-[1.03]
            ">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={400}
                    height={500}
                    className={`
                        w-full h-80 object-cover object-top transition duration-500
                        group-hover:opacity-90 group-hover:grayscale-0
                    `}
                    unoptimized
                />
                {/* Overlay Detail (Gaya Minimalis) */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-white">
                    <h3 className="text-xl font-bold mb-0 text-amber-300">{name}</h3>
                    <p className="text-sm font-light opacity-80">{role}</p>
                </div>
            </div>
        </div>
    );
}

// Komponen utama
function Developer() {
    const scrollContainer = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainer.current) {
            const container = scrollContainer.current;
            // Hitung lebar card rata-rata yang terlihat (sekitar 90% dari container untuk mobile)
            const scrollAmount = container.clientWidth * 0.8;

            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // --- MULAI PERUBAHAN UI UTAMA ---
    return (
        <section id="developer" className="w-full bg-gray-50 py-20">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header dan Navigasi Carousel */}
                <div className="flex justify-between items-center mb-10 px-2">
                    <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-amber-500 pb-1">
                        Dosen Pembina
                    </h2>

                    {/* Tombol Navigasi (Orange/Rounded) */}
                    <div className="flex space-x-3">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 rounded-full bg-amber-500 shadow-lg text-white hover:bg-amber-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 rounded-full bg-amber-500 shadow-lg text-white hover:bg-amber-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scroll container */}
                <div
                    ref={scrollContainer}
                    className="flex overflow-x-auto snap-x snap-mandatory py-4 scroll-smooth hide-scrollbar -mx-2" // Tambahkan hide-scrollbar untuk menyembunyikan scrollbar bawaan browser
                >
                    {teamMembers.map((member, index) => (
                        <ProfileCard key={index} {...member} />
                    ))}
                    {/* Tambahkan elemen kosong untuk padding di akhir scroll */}
                    <div className="flex-none w-4"></div>
                </div>

                {/* Gaya untuk menyembunyikan scrollbar (bisa ditempatkan di global CSS) */}
                <style jsx global>{`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .hide-scrollbar {
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                    }
                `}</style>

            </div>
        </section>
    );
}

export default Developer;
