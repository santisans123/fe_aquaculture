import React from "react";
import Link from "next/link";
// Import ikon yang relevan
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, InstagramOutlined, GlobalOutlined, ClockCircleOutlined } from "@ant-design/icons";

export default function Footer() {
    return (
        // Mengganti gradasi biru dengan gradasi cokelat/oranye gelap yang konsisten
        <footer
            id="contact"
            className="w-full bg-gradient-to-r from-orange-950 to-amber-900 text-white"
        >
            <div className="container mx-auto px-6 py-16 max-w-7xl">
                <div className="flex flex-wrap -mx-4">

                    {/* Lokasi */}
                    <div className="w-full px-4 mb-10 lg:w-4/12">
                        <h4 className="text-3xl font-extrabold mb-4 text-amber-300">
                            PENS Aqua Tech
                        </h4>
                        <div className="flex items-start mb-4 text-amber-100">
                            <EnvironmentOutlined className="mt-1 text-xl flex-shrink-0 mr-3" />
                            <p className="text-base">
                                Ruang PS 4.17. Politeknik Elektronika Negeri Surabaya,
                                Jl. Raya ITS, Sukolilo, Surabaya, Jawa Timur 60111
                            </p>
                        </div>

                        {/* Map Placeholder */}
                        <div className="overflow-hidden rounded-xl shadow-2xl mt-6">
                            <iframe
                                // Mempertahankan URL dummy
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15830.737602343857!2d112.78725204769763!3d-7.276706145621895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa10ea2ae883%3A0xbe22c55d60ef09c7!2sPoliteknik%20Elektronika%20Negeri%20Surabaya!5e0!3m2!1sen!2sid!4v1692591292899!5m2!1sen!2sid"
                                width="100%"
                                height="200"
                                loading="lazy"
                                className="rounded-xl border-4 border-amber-600"
                            ></iframe>
                        </div>
                    </div>

                    {/* Spacer kosong */}
                    <div className="hidden lg:block lg:w-1/12"></div>

                    {/* Kontak, Link Terkait, Tentang Kami */}
                    <div className="w-full px-4 lg:w-7/12">
                        <div className="flex flex-wrap -mx-4">

                            {/* Kontak */}
                            <div className="w-full md:w-1/3 px-4 mb-8">
                                <h5 className="text-xl font-semibold mb-4 border-b border-amber-600 pb-2">
                                    Kontak Kami
                                </h5>
                                <ul className="space-y-3 text-amber-100 text-base">
                                    <li className="flex items-center gap-2">
                                        <InstagramOutlined className="text-lg" />
                                        <span>Tisaforina</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <PhoneOutlined className="text-lg" />
                                        <span>+62 821-5712-4128</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <MailOutlined className="text-lg" />
                                        <span>tisaforina@pens.ac.id</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Link Terkait */}
                            <div className="w-full md:w-1/3 px-4 mb-8">
                                <h5 className="text-xl font-semibold mb-4 border-b border-amber-600 pb-2">
                                    Link Terkait
                                </h5>
                                <ul className="space-y-3 text-amber-100 text-base">
                                    <li className="flex items-center gap-2">
                                        <GlobalOutlined />
                                        <Link
                                            href="https://www.creative-tim.com/presentation"
                                            target="_blank"
                                            className="hover:text-amber-300 transition-colors"
                                        >
                                            Cuaca Global
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ClockCircleOutlined />
                                        <Link
                                            href="https://blog.creative-tim.com"
                                            target="_blank"
                                            className="hover:text-amber-300 transition-colors"
                                        >
                                            Data Iklim
                                        </Link>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ClockCircleOutlined />
                                        <Link
                                            href="https://www.timeanddate.com/moon/phases/"
                                            target="_blank"
                                            className="hover:text-amber-300 transition-colors"
                                        >
                                            Fase Bulan
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Tentang Kami */}
                            <div className="w-full md:w-1/3 px-4 mb-8">
                                <h5 className="text-xl font-semibold mb-4 border-b border-amber-600 pb-2">
                                    Tentang Kami
                                </h5>
                                <ul className="space-y-3 text-amber-100 text-base">
                                    <li>
                                        <Link
                                            href="https://www.pens.ac.id/en/"
                                            target="_blank"
                                            className="hover:text-amber-300 transition-colors"
                                        >
                                            Pens
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="https://www.nationalgeographic.com/foodfeatures/aquaculture/"
                                            target="_blank"
                                            className="hover:text-amber-300 transition-colors"
                                        >
                                            Aquaculture
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#about" className="hover:text-amber-300 transition-colors">
                                            Tisaforina
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-amber-600 mt-12 pt-6 text-center text-sm text-amber-100">
                    © {new Date().getFullYear()} oleh{" "}
                    <span className="font-bold">ACE App-Tech PENS.</span> Hak Cipta Dilindungi.
                </div>
            </div>
        </footer>
    );
}
