"use client";

import Image from "next/image";
import { Advocate } from "@/db/schema";
import { useEffect, useState } from "react";
import { isStringArray } from "./helpers";
import { AdvocateCard } from "./components/AdvocateCard";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/advocates?search=${searchTerm}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
      } catch (error) {
        console.error("Failed to fetch advocates:", error);
        setAdvocates([]); // Optionally clear advocates on error
      }
    };

    const handler = setTimeout(() => {
      fetchData();
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const onClick = () => {
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-[#25463b] font-sans flex flex-col items-center justify-center py-12 px-4">
      {/* Branding section at the top */}
      <section className="w-full max-w-7xl mb-12">
        <div className="mb-10">
          <span className="block text-lg text-white font-light mb-2 tracking-wide">
            WELCOME TO
          </span>
          <span className="text-5xl font-serif font-bold text-[#ffe066] mb-6 block tracking-tight">
            Solace
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Your first step toward a better healthcare experience.
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Find the right advocate for your needs. Search by name, city,
            specialty, or degree.
          </p>
          <div className="flex items-center gap-4 bg-[#1a2a3a]/80 rounded-full px-6 py-4 w-fit shadow-lg">
            <div className="flex -space-x-2">
              <Image
                src="/avatar1_200x200.webp"
                width={40}
                height={40}
                alt="Advocate 1"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <Image
                src="/avatar2_200x200.webp"
                width={40}
                height={40}
                alt="Advocate 2"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <Image
                src="/avatar3_200x200.webp"
                width={40}
                height={40}
                alt="Advocate 3"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <span className="text-white text-sm font-medium">
              Join over 14,000 patients and families getting better care with
              the help of a patient advocate
            </span>
          </div>
        </div>
      </section>
      {/* Search and card section below branding */}
      <section className="w-full max-w-7xl flex-1">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e3f2fd]">
          <label
            htmlFor="search"
            className="block text-lg font-semibold text-[#1a2a3a] mb-4"
          >
            Who do you need help from?
          </label>
          <div className="flex flex-row gap-4 mb-6">
            <input
              id="search"
              className="flex-1 border border-[#1a2a3a] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#25463b] transition text-lg bg-white placeholder:text-[#25463b]/60"
              placeholder="Search by name, city, specialty, degree..."
              value={searchTerm}
              onChange={onSearchTermChange}
              style={{ fontFamily: "inherit" }}
            />
            <button
              className="bg-[#40695c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#25463b] transition shadow flex items-center justify-center whitespace-nowrap"
              onClick={onClick}
            >
              Reset Search
            </button>
          </div>
          <p className="mb-4 text-[#1a2a3a] text-center text-base">
            {searchTerm ? (
              <>
                Searching for:{" "}
                <span className="font-bold text-[#40695c]">{searchTerm}</span>
              </>
            ) : (
              <>Showing all advocates</>
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {advocates.length === 0 ? (
              <div className="col-span-full text-center py-12 text-[#1a2a3a] text-xl">
                No advocates found.
              </div>
            ) : (
              advocates.map((advocate) => (
                <AdvocateCard key={advocate.id} advocate={advocate} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
