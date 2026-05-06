import React from "react";
import Month from "../Month";
import { getMonthsData } from "../functions/getMonthData";

export default function Step4({
	extraDescription,
	setExtraDescription,
	selectedRange,
	exceptions,
	activeLetter,
	activeNums,
	startYear = 2025,
	startMonth = 11,
}) {
	const monthsData = getMonthsData(startYear, startMonth);

	return (
		<div className="flex flex-col gap-4 relative">
			<div className="sticky top-0 z-20 bg-[#f0f0f0] pt-1 pb-3">
				<div className="bg-white border border-gray-300 p-2 shadow-md rounded-sm">
					<textarea
						value={extraDescription}
						onChange={(e) => setExtraDescription(e.target.value)}
						placeholder="wpisz dodatkowy opis..."
						className="w-full h-12 sm:h-16 p-2 text-base sm:text-[20px] border border-gray-200 focus:outline-none focus:border-blue-400 resize-none"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1">
				{monthsData.map((m) => (
					<Month
						key={m.id}
						year={m.year}
						monthIndex={m.monthIndex}
						daysInMonth={m.daysCount}
						firstDayOffset={m.offset}
						selectedRange={selectedRange}
						exceptions={exceptions}
						activeLetter={activeLetter}
						activeNums={activeNums}
					/>
				))}
			</div>
		</div>
	);
}
