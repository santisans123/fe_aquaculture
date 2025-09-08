"use client";

import React, { useRef } from "react";
import Image from "next/image";

// tipe props untuk card
interface ProfileCardProps {
  name: string;
  role: string;
  imageUrl: string;
  grayscale?: boolean;
}

// Data anggota tim
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
    name: "Ferry Ariyanto",
    role: "Pengembang",
    imageUrl: "/images/feri.webp",
  },
  {
    name: "Torikul Huda",
    role: "Pengembang",
    imageUrl: "/images/jon.webp",
  },
  {
    name: "Orlando Pratama Tambunan",
    role: "Pengembang",
    imageUrl: "/images/aku_1x1.webp",
  },
  {
    name: "Muhammad Wafiq Kamaluddin",
    role: "Pengembang",
    imageUrl: "/images/wafiq.webp",
  },
  {
    name: "Muhammad Aldino Habibullah",
    role: "Pengembang",
    imageUrl: "/images/aldino.webp",
  },
  {
    name: "Santi",
    role: "Front End Dev",
    imageUrl: "/images/santi.webp",
    grayscale: true,
  },
  {
    name: "Ainul Mukhlasin",
    role: "Pengembang",
    imageUrl: "/images/ainul.webp",
  },
  {
    name: "Ahmad Musafir Khoirul",
    role: "Pengembang",
    imageUrl: "/images/khoirul.webp",
  },
];

// Komponen card
function ProfileCard({ name, role, imageUrl, grayscale }: ProfileCardProps) {
  return (
    <div className="flex-none w-10/12 sm:w-1/2 md:w-1/3 p-4">
      <div className="relative rounded-xl overflow-hidden shadow-lg group transform transition-transform duration-300 hover:scale-105">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={500}
          className={`w-full h-96 object-cover ${grayscale ? "grayscale" : ""}`}
          unoptimized
        />
        <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
          <h3 className="text-md font-bold text-slate-800">{name}</h3>
          <p className="text-sm text-slate-600">{role}</p>
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
      const firstCard = scrollContainer.current.querySelector("div");
      if (firstCard) {
        const cardWidth = (firstCard as HTMLElement).clientWidth;
        scrollContainer.current.scrollBy({
          left: direction === "left" ? -cardWidth : cardWidth,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section id="developer" className="w-full bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Tim Pengembang
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white shadow-md hover:bg-slate-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white shadow-md hover:bg-slate-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto snap-x snap-mandatory gap-2 py-4 scroll-smooth"
        >
          {teamMembers.map((member, index) => (
            <ProfileCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Developer;
