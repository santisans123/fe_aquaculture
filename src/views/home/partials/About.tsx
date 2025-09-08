import React from "react";

function About() {
    return (
        <section id="about" className="relative bg-slate-50 py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-start">
                    <div className="w-full md:w-5/12 lg:w-4/12 px-4 mb-8 md:mb-0">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-8">
                            <img
                                alt="Tim TISASforINA"
                                src="/images/about_tisas.webp" 
                                className="w-full align-middle rounded-lg shadow-xl"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-800 mb-3">Visi</h3>
                        <p className="text-slate-600 leading-relaxed text-justify">
                            Mewujudkan sektor budidaya air untuk ketahanan pangan Indonesia yang mandiri, maju dan kuat berdasarkan keadilan dan beradab.
                        </p>
                    </div>

                    <div className="w-full md:w-7/12 lg:w-8/12 px-4">
                        <div className="md:pl-6">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                                Tentang Kami
                            </h2>
                            <p className="text-lg leading-relaxed mt-4 mb-4 text-slate-600 text-justify indent-8">
                                TISASforINA adalah sebuah platform digital yang dibangun dengan tujuan untuk mendukung penguatan sektor budidaya perairan (akuakultur) Indonesia yang maju dan mandiri. Platform ini dibangun oleh tim Riset Grup Aquacultural Engineering Applied Technology (ACE App-Tech) Politeknik Elektronika Negeri Surabaya dan didanai oleh Direktorat Jenderal Pendidikan Vokasi, Kementerian Pendidikan dan Kebudayaan, Riset dan Teknologi, Republik Indonesia yang dikelola oleh Lembaga Pengelolaan Dana Pendidikan (LPDP).
                            </p>
                            <p className="text-lg leading-relaxed mt-0 mb-8 text-slate-600 text-justify indent-8">
                                TISASforINA merupakan singkatan dari Totally Integrated Smart Aquaculture System for Indonesia yang merupakan sebuah platform online yang menjadi tempat bertemu pengusaha, peneliti, pengajar, komunitas akuakultur (budidaya air) serta pemerintah untuk mempromosikan potensi akuakultur Indonesia.
                            </p>
                            
                            <div className="mt-12">
                                <h3 className="text-2xl font-semibold text-slate-800 mb-3">Misi</h3>
                                <p className="text-slate-600 leading-relaxed text-justify">
                                    Mempertemukan dan mengkolaborasikan pengusaha, peneliti, pengajar, komunitas dan pemerintah untuk memiliki persamaan persepsi mengembangkan akuakultur Indonesia melalui penelitian, inovasi dan penerapan teknologi.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

				<div className="mt-24 w-2/3 mx-auto h-px bg-gradient-to-r from-slate-50 via-blue-500 to-slate-50"></div>
            </div>
        </section>
    );
}

export default About;




