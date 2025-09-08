import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="w-full bg-gradient-to-r from-[#416CC2] to-[#0C1A58] text-white"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap">
          {/* Lokasi */}
          <div className="w-full px-4 mb-8 lg:w-4/12">
            <h4 className="text-2xl font-bold mb-2">Lokasi Kami</h4>
            <p className="mb-4 text-gray-200">
              Ruang PS 4.17. Politeknik Elektronika Negeri Surabaya
            </p>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15830.737602343857!2d112.78725204769763!3d-7.276706145621895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa10ea2ae883%3A0xbe22c55d60ef09c7!2sPoliteknik%20Elektronika%20Negeri%20Surabaya!5e0!3m2!1sen!2sid!4v1692591292899!5m2!1sen!2sid"
                width="100%"
                height="180"
                loading="lazy"
                className="rounded-lg"
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
                <h5 className="text-lg font-semibold mb-3">Kontak Kami</h5>
                <ul className="space-y-2 text-gray-200">
                  <li>📸 Instagram: Tisaforina</li>
                  <li>📞 +62 821-5712-4128</li>
                  <li>✉️ tisaforina@pens.ac.id</li>
                </ul>
              </div>

              {/* Link Terkait */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <h5 className="text-lg font-semibold mb-3">Link Terkait</h5>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="https://www.creative-tim.com/presentation"
                      target="_blank"
                      className="hover:underline"
                    >
                      Cuaca Global
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://blog.creative-tim.com"
                      target="_blank"
                      className="hover:underline"
                    >
                      Data Iklim
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.timeanddate.com/moon/phases/"
                      target="_blank"
                      className="hover:underline"
                    >
                      Fase Bulan
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Tentang Kami */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <h5 className="text-lg font-semibold mb-3">Tentang Kami</h5>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="https://www.pens.ac.id/en/"
                      target="_blank"
                      className="hover:underline"
                    >
                      Pens
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.nationalgeographic.com/foodfeatures/aquaculture/"
                      target="_blank"
                      className="hover:underline"
                    >
                      Aquaculture
                    </Link>
                  </li>
                  <li>
                    <Link href="#about" className="hover:underline">
                      Tisaforina
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/30 mt-8 pt-4 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} by{" "}
          <span className="font-semibold">AquaculturePens.</span>
        </div>
      </div>
    </footer>
  );
}
