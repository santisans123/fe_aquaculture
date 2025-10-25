import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import About from "./partials/About";
import Developer from "./partials/Developer";
import Footer from "./partials/Footer";
import Sponsor from "./partials/Sponsor";

function HomeViews() {
    const { locale } = useRouter();

    const jumbotronSponsors = [
        { src: "/images/sponsor/logopens.webp", alt: "PENS" },
        { src: "/images/logo-aquaculture-pens.webp", alt: "AQUACULTURE PENS" },
        { src: "/images/sponsor/lpdp.webp", alt: "LPDP" },
        { src: "/images/sponsor/kemendikbud.webp", alt: "KEMENDIKBUD" },
        { src: "/images/sponsor/mitrasdudi.webp", alt: "Mitras DUDI" },
    ];

    return (
        <div className="w-full flex flex-col">
            {/* 1. Jumbotron (Hero Section) */}
            <div
                className="w-full h-screen relative flex items-center overflow-hidden" // Tambahkan overflow-hidden
                style={{
                    backgroundImage: `url('/images/jumbotron.webp')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay Dinamis dan Konten Utama */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-start px-4 md:px-24">
                    <div className="text-white max-w-3xl">

                        {/* Sub Judul */}
                        <h2 className=" mt-32
                            text-lg md:text-xl font-medium
                            uppercase tracking-wider
                            text-amber-400
                        ">
                            Riset Grup Inovasi Akuakultur PENS
                        </h2>

                        {/* Judul Utama (Lebih Dampak) */}
                        <h1 className="
                            text-2xl sm:text-5xl lg:text-6xl font-extrabold
                            leading-tight drop-shadow-lg
                        ">
                            Penerapan Teknologi Elektro untuk <span className="text-amber-300">Akuakultur Cerdas</span>
                        </h1>

                        {/* CTA (Contoh penambahan tombol login/masuk) */}
                        <div className="mt-8 flex gap-4">
                            <Link href="/login" legacyBehavior>
                                <a className="
                                    px-8 py-3 bg-amber-500 text-black font-bold text-lg
                                    rounded-full shadow-lg hover:bg-amber-400
                                    transition duration-300 transform hover:scale-105
                                ">
                                    Mulai Dashboard
                                </a>
                            </Link>
                            {/* Jika Anda ingin menambahkan tombol Learn More */}
                            <Link href="#about" legacyBehavior>
                                <a className="
                                    px-8 py-3 border-2 border-white text-white font-semibold text-lg
                                    rounded-full hover:bg-white/20 transition duration-300
                                ">
                                    Pelajari Lebih Lanjut
                                </a>
                            </Link>
                        </div>

                        {/* Sponsor Unggulan di Jumbotron */}
                        <div className="mt-12 pt-6 border-t border-white/30">
                            <p className="text-white text-sm font-medium mb-4 uppercase opacity-75">Didukung oleh</p>
                            <div className="flex flex-wrap items-center gap-6 md:gap-8">
                                {jumbotronSponsors.map((sponsor) => (
                                    <div
                                        key={sponsor.alt}
                                        className="
                                            bg-white rounded-lg p-2
                                            hover:bg-amber-50 transition-all duration-300
                                        "
                                    >
                                        <Image
                                            src={sponsor.src}
                                            alt={sponsor.alt}
                                            width={64}
                                            height={64}
                                            className="
                                                rounded object-contain h-10 w-auto
                                                grayscale hover:grayscale-0 transition-all duration-300
                                            "
                                            unoptimized={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Konten Lainnya */}
            <div id="content" className='flex flex-col items-center justify-center w-full'>
                <About />
                <Developer />
            </div>

            {/* 3. Sponsor dan Footer */}
            <Sponsor />
            <Footer />
        </div>
    );
}

export default HomeViews;
