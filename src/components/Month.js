// src/components/Month.js
import React from "react";

export default function Month({
	year,
	monthName,
	daysInMonth,
	firstDayOffset,
}) {
	const dayLabels = ["P", "W", "Ś", "C", "P", "S", "N"];
	const days = [...Array(daysInMonth).keys()].map((i) => i + 1);
	const blanks = [...Array(firstDayOffset).keys()];
	console.log({ year, monthName, daysInMonth, firstDayOffset, blanks, days });
	return (
		<div className="border border-gray-300 bg-white text-[10px] w-full flex flex-col h-full shadow-sm">
			<div className="bg-[#b3d1ff] text-center font-bold py-1 border-b border-gray-300 text-[11px]">
				{monthName} {year}
			</div>

			<div className="grid grid-cols-7 bg-[#d9e8ff] text-center border-b border-gray-300 font-semibold">
				{dayLabels.map((d, i) => (
					<div
						key={i}
						className="py-0.5 border-r border-gray-200 last:border-r-0"
					>
						{d}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 flex-grow">
				{blanks.map((b) => (
					<div
						key={`b-${b}`}
						className="h-6 border-b border-r border-gray-100 bg-gray-50/50"
					/>
				))}
				{days.map((day) => (
					<div
						key={day}
						className="h-6 flex items-center justify-center border-b border-r border-gray-100 hover:bg-blue-100 cursor-pointer transition-colors"
					>
						{day}
					</div>
				))}
			</div>
		</div>
	);
}
