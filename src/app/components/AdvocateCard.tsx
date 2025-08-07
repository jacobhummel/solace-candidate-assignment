import { useState } from "react";
import { formatPhoneNumber, isStringArray } from "../helpers";
import { Advocate } from "@/db/schema";

export function AdvocateCard({ advocate }: { advocate: Advocate }) {
  const [showAll, setShowAll] = useState(false);
  const maxTags = 5;

  const specialties = isStringArray(advocate.specialties)
    ? advocate.specialties
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col transition hover:shadow-2xl border border-[#e3f2fd]">
      <div className="w-full h-48 relative">
        <img
          src={`https://placehold.co/400x400?text=${advocate.firstName}+${advocate.lastName}`}
          alt={`${advocate.firstName} ${advocate.lastName}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2 flex items-center gap-3">
          <span className="block text-2xl font-extrabold text-[#25463b] leading-tight flex-1">
            {advocate.firstName} {advocate.lastName}
          </span>
          <span className="inline-block text-base font-semibold text-[#40695c] bg-[#e3f2fd] rounded px-2 py-1 self-end">
            {advocate.degree}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-block text-sm font-medium text-[#25463b]">
            {advocate.yearsOfExperience} yrs experience
          </span>
          <span className="inline-block text-sm text-[#40695c]">
            {advocate.city}
          </span>
        </div>
        <div className="text-sm text-[#25463b] mb-4">
          <span className="font-semibold">Phone:</span>{" "}
          {formatPhoneNumber(advocate.phoneNumber)}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {(showAll ? specialties : specialties.slice(0, maxTags)).map((s) => (
            <span
              key={s}
              className="inline-block bg-[#e3f2fd] text-[#25463b] rounded-full px-3 py-1 text-xs font-semibold shadow hover:bg-[#ffe066] transition"
            >
              {s}
            </span>
          ))}
          {specialties.length > maxTags && (
            <button
              className="text-xs text-[#25463b] underline ml-2 font-semibold"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Show less" : `+${specialties.length - maxTags} more`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
