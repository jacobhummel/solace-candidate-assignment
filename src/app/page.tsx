"use client";

import Image from "next/image";
import { Advocate } from "@/db/schema";
import { useEffect, useState } from "react";
import { isStringArray } from "./helpers";

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
      {/* Search and table section below branding */}
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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow border border-[#e3f2fd]">
              <thead className="bg-[#e3f2fd]">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-[#25463b] text-base border-b border-[#e3f2fd]">
                    First Name
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-[#25463b] text-base border-b border-[#e3f2fd]">
                    Last Name
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-[#25463b] text-base border-b border-[#e3f2fd]">
                    City
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-[#25463b] text-base border-b border-[#e3f2fd]">
                    Degree
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-[#25463b] text-base border-b border-[#e3f2fd]">
                    Specialties
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-[#25463b] text-base border-b border-[#e3f2fd]">
                    Years of Experience
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-[#25463b] text-base border-b border-[#e3f2fd]">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {advocates.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 text-[#1a2a3a] text-xl"
                    >
                      No advocates found.
                    </td>
                  </tr>
                ) : (
                  advocates.map((advocate) => (
                    <tr
                      key={advocate.id}
                      className="border-b border-[#f6f7fb] hover:bg-[#e3f2fd] transition"
                    >
                      <td className="px-6 py-4 text-[#1a2a3a]">
                        {advocate.firstName}
                      </td>
                      <td className="px-6 py-4 text-[#1a2a3a]">
                        {advocate.lastName}
                      </td>
                      <td className="px-6 py-4 text-[#1a2a3a]">
                        {advocate.city}
                      </td>
                      <td className="px-6 py-4 text-[#1a2a3a]">
                        {advocate.degree}
                      </td>
                      <td className="px-6 py-4">
                        {isStringArray(advocate.specialties) &&
                          advocate.specialties.map((s) => (
                            <span
                              key={s}
                              className="inline-block bg-[#ffe066] text-[#1a2a3a] rounded-full px-3 py-1 mr-2 mb-1 text-xs font-semibold shadow"
                            >
                              {s}
                            </span>
                          ))}
                      </td>
                      <td className="px-6 py-4 text-[#1a2a3a]">
                        {advocate.yearsOfExperience}
                      </td>
                      <td className="px-6 py-4 text-[#1a2a3a]">
                        {advocate.phoneNumber}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
