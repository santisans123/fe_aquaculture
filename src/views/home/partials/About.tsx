import React from "react";
import Image from 'next/image';

function About() {
    // --- Pengganti Icon ---
    // Simbol teks atau gaya visual murni Tailwind digunakan sebagai pengganti ikon
    const IconReplacements = {
        Info: <span className="text-amber-600 text-xl font-extrabold mr-2">i</span>,
        Target: <span className="text-amber-100 text-2xl font-bold mr-2">&#9733;</span>, // Bintang/simbol
        Mission: <span className="text-amber-600 text-2xl font-bold mr-2">&#10003;</span>, // Tanda centang
    };

    return (
        // Mengganti background slate-50 dengan putih atau off-white yang lebih bersih
        <section id="about" className="relative bg-white py-20 lg:py-24">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Judul Utama */}
                <div className="text-center mb-12">
                    <h2 className="
                        text-sm font-bold uppercase tracking-widest text-amber-600
                        flex items-center justify-center gap-2
                    ">
                        {IconReplacements.Info} Latar Belakang Kami
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-2">
                        Tentang TISASforINA
                    </h3>
                </div>

                <div className="flex flex-wrap items-start">

                    {/* Kolom Kiri: Gambar dan Visi */}
                    <div className="w-full lg:w-5/12 px-4 mb-10 lg:mb-0">
                        <div className="relative flex flex-col min-w-0 break-words w-full rounded-2xl overflow-hidden shadow-2xl bg-amber-50">
                            {/* Gambar dengan Shadow dan efek Hover */}
                            <Image
								alt="Tim TISASforINA"
								src="/images/about_tisas.webp"
								width={500}
								height={350}
								className="w-full align-middle object-cover transform hover:scale-[1.02] transition duration-500"
							/>
                        </div>

                        {/* Visi Card (Oranye/Rounded) */}
                        <div className="bg-amber-600 text-white p-6 rounded-xl shadow-lg mt-8">
                             <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                                {IconReplacements.Target} Visi
                             </h3>
                             <p className="text-amber-100 leading-relaxed text-justify text-base">
                                 Mewujudkan sektor budidaya air untuk ketahanan pangan Indonesia yang **mandiri, maju dan kuat** berdasarkan keadilan dan beradab.
                             </p>
                        </div>
                    </div>

                    {/* Kolom Kanan: Penjelasan dan Misi */}
                    <div className="w-full lg:w-7/12 px-4">
                        <div className="lg:pl-8">

                            {/* Penjelasan Utama */}
                            <p className="text-xl leading-relaxed mb-4 text-gray-700 text-justify indent-8">
                                TISASforINA adalah sebuah platform digital yang dibangun dengan tujuan untuk mendukung penguatan **sektor budidaya perairan (akuakultur)** Indonesia yang maju dan mandiri.
                            </p>
                            <p className="text-xl leading-relaxed mb-6 text-gray-700 text-justify indent-8">
                                Platform ini dibangun oleh tim Riset Grup Aquacultural Engineering Applied Technology (ACE App-Tech) Politeknik Elektronika Negeri Surabaya dan didanai oleh **Direktorat Jenderal Pendidikan Vokasi, Kementerian Pendidikan dan Kebudayaan, Riset dan Teknologi, Republik Indonesia** yang dikelola oleh Lembaga Pengelolaan Dana Pendidikan (LPDP).
                            </p>

                            <p className="text-xl font-semibold leading-relaxed mb-8 text-gray-800 text-justify">
                                TISASforINA merupakan singkatan dari **Totally Integrated Smart Aquaculture System for Indonesia**, sebuah platform online yang menjadi tempat bertemu pengusaha, peneliti, pengajar, komunitas akuakultur (budidaya air) serta pemerintah untuk mempromosikan potensi akuakultur Indonesia.
                            </p>

                            {/* Misi Card (Lebih menonjol dengan border) */}
                            <div className="bg-gray-50 p-6 rounded-xl shadow-md border-l-4 border-amber-500 mt-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    {IconReplacements.Mission} Misi Kami
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-justify text-base">
                                    Mempertemukan dan mengkolaborasikan pengusaha, peneliti, pengajar, komunitas dan pemerintah untuk memiliki persamaan persepsi mengembangkan akuakultur Indonesia melalui **penelitian, inovasi dan penerapan teknologi**.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Garis Pembatas Final */}
                <div className="mt-24 w-full mx-auto h-1 bg-gradient-to-r from-white via-amber-500 to-white rounded-full"></div>
            </div>
        </section>
    );
}

export default About;
