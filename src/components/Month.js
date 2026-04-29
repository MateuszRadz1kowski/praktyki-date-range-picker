import React from "react";
import { isSameDay, isWithinInterval, startOfDay } from "date-fns";
import { staticHolidays } from "./steps/Step2";

export default function Month({
	year,
	monthIndex,
	daysInMonth,
	firstDayOffset,
	selectedRange,
	activeNums = [],
	activeLetter = [],
	onDateClick,
}) {
	const days = [...Array(daysInMonth).keys()].map((num) => num + 1);
	const blanks = [...Array(firstDayOffset).keys()];

	const getDayColour = (day) => {
		if (!selectedRange?.from) return "";

		const currentDate = startOfDay(new Date(year, monthIndex, day));
		const from = startOfDay(selectedRange.from);

		if (selectedRange.to && activeNums.length > 0) {
			const to = startOfDay(selectedRange.to);
			const isInRange = isWithinInterval(currentDate, { start: from, end: to });

			if (!isInRange) return "";

			let dayOfWeek = currentDate.getDay();
			if (dayOfWeek === 0) dayOfWeek = 7;

			if (activeNums.includes(dayOfWeek.toString())) {
				return "bg-gray-800 text-white font-bold";
			}
			return "";
		}

		if (selectedRange.to && activeLetter != []) {
			const to = startOfDay(selectedRange.to);
			const isInRange = isWithinInterval(currentDate, { start: from, end: to });

			if (!isInRange) return "";

			let dayOfWeek = currentDate.getDay();
			if (dayOfWeek == 0) dayOfWeek = 7;

			if (activeLetter == "A") {
				if (dayOfWeek >= 1 && dayOfWeek <= 5) {
					return "bg-gray-800 text-white font-bold";
				} else {
					return "";
				}
			} else if (activeLetter == "B") {
				if ((dayOfWeek >= 1 && dayOfWeek <= 5) || dayOfWeek == 7) {
					return "bg-gray-800 text-white font-bold";
				} else {
					return "";
				}
			} else if (activeLetter == "C") {
				if (
					(dayOfWeek >= 6 && dayOfWeek <= 7) ||
					staticHolidays.some((h) => h.month == monthIndex && h.day == day)
				) {
					return "bg-gray-800 text-white font-bold";
				} else {
					return "";
				}
			} else if (activeLetter == "D") {
				if (
					dayOfWeek >= 1 &&
					dayOfWeek <= 5 &&
					!staticHolidays.some((h) => h.month == monthIndex && h.day == day)
				) {
					return "bg-gray-800 text-white font-bold";
				} else {
					return "";
				}
			} else if (activeLetter == "E") {
				if (
					dayOfWeek >= 1 &&
					dayOfWeek <= 6 &&
					!staticHolidays.some((h) => h.month == monthIndex && h.day == day)
				) {
					return "bg-gray-800 text-white font-bold";
				} else {
					return "";
				}
			}
		}

		if (isSameDay(currentDate, from)) return "bg-gray-800 text-white font-bold";

		if (selectedRange.to) {
			const to = startOfDay(selectedRange.to);
			const isInRange = isWithinInterval(currentDate, { start: from, end: to });

			if (isSameDay(currentDate, to)) return "bg-gray-800 text-white font-bold";
			if (isInRange) return "bg-gray-800 text-white";
		}

		return "";
	};

	const monthName = new Date(year, monthIndex).toLocaleString("pl-PL", {
		month: "long",
	});

	return (
		<div className="border border-gray-300 bg-white text-[10px] w-full flex flex-col h-full shadow-sm">
			<div className="bg-[#b3d1ff] text-center font-bold py-1 border-b border-gray-300 uppercase text-[9px]">
				{monthName} {year}
			</div>
			<div className="grid grid-cols-7 bg-[#d9e8ff] text-center border-b border-gray-300 font-semibold">
				{["P", "W", "Ś", "C", "P", "S", "N"].map((d, i) => (
					<div key={`label-${monthIndex}-${i}`} className="py-0.5">
						{d}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 flex-grow">
				{blanks.map((b) => (
					<div
						key={`blank-${monthIndex}-${b}`}
						className="h-6 border-b border-r border-gray-100 bg-gray-50/50"
					/>
				))}
				{days.map((day) => (
					<div
						key={`day-${monthIndex}-${day}`}
						onClick={() => onDateClick(new Date(year, monthIndex, day))}
						className={`h-6 flex items-center justify-center border-b border-r border-gray-100 cursor-pointer hover:bg-blue-100 transition-colors ${getDayColour(day)}`}
					>
						{day}
					</div>
				))}
			</div>
		</div>
	);
}
