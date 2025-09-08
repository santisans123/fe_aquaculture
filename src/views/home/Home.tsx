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
            <div
                className="w-full h-screen relative flex items-center"
                style={{
                    backgroundImage: `url('/images/jumbotron.webp')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-start px-8 md:px-24 lg:px-48">
                    <div className="text-white max-w-2xl">
                        <h2 className="text-lg md:text-xl font-light mb-2">
                            Riset Grup
                        </h2>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Penerapan Teknologi Elektro untuk Teknologi Akuakultur
                        </h1>
                        
                        <div className="mt-8">
                            <p className="text-white text-base font-medium mb-4">Sponsor Unggulan</p>
                            <div className="flex flex-row items-center gap-6">
                                {jumbotronSponsors.map((sponsor) => (
                                    <div key={sponsor.alt} className="bg-white rounded-full p-1">
                                        <Image
                                            src={sponsor.src}
                                            alt={sponsor.alt}
                                            width={56}
                                            height={56}
                                            className="rounded-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                            unoptimized={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="content" className='flex flex-col items-center justify-center w-full'>
                <About />
                <Developer />
            </div>

            <Sponsor /> 
            <Footer />
        </div>
    );
}

export default HomeViews;