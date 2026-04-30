import React from "react";
import { format, isSameDay, isWithinInterval, startOfDay } from "date-fns";
import { staticHolidays } from "./steps/Step2";

export default function Month({
	year,
	monthIndex,
	daysInMonth,
	firstDayOffset,
	selectedRange,
	activeNums = [],
	activeLetter = null,
	onDateClick,
	step,
	exceptions = { add: [], remove: [] },
}) {
	const days = [...Array(daysInMonth).keys()].map((num) => num + 1);
	const blanks = [...Array(firstDayOffset).keys()];

	const STYLE_ACTIVE = "bg-gray-800 text-white font-bold";

	const getColourByDayNumber = (dayOfWeek) => {
		if (activeNums.includes(dayOfWeek.toString())) {
			return STYLE_ACTIVE;
		}
		return "";
	};

	const getColourByLetterSet = (dayOfWeek, day) => {
		const isHoliday = staticHolidays.some(
			(h) => h.month == monthIndex && h.day == day,
		);

		switch (activeLetter) {
			case "A":
				return dayOfWeek >= 1 && dayOfWeek <= 5 ? STYLE_ACTIVE : "";
			case "B":
				return (dayOfWeek >= 1 && dayOfWeek <= 5) || dayOfWeek == 7
					? STYLE_ACTIVE
					: "";
			case "C":
				return dayOfWeek >= 6 || isHoliday ? STYLE_ACTIVE : "";
			case "D":
				return dayOfWeek >= 1 && dayOfWeek <= 5 && !isHoliday
					? STYLE_ACTIVE
					: "";
			case "E":
				return dayOfWeek >= 1 && dayOfWeek <= 6 && !isHoliday
					? STYLE_ACTIVE
					: "";
			default:
				return "";
		}
	};

	const getDayColour = (day) => {
		if (!selectedRange?.from) return "";

		const currentDate = startOfDay(new Date(year, monthIndex, day));
		const dateStr = format(currentDate, "yyyy-MM-dd");

		if (exceptions.remove.includes(dateStr)) {
			return "";
		}
		if (exceptions.add.includes(dateStr)) {
			return STYLE_ACTIVE;
		}

		const from = startOfDay(selectedRange.from);

		if (!selectedRange.to) {
			return isSameDay(currentDate, from) ? STYLE_ACTIVE : "";
		}

		const to = startOfDay(selectedRange.to);
		const isInRange = isWithinInterval(currentDate, { start: from, end: to });

		if (!isInRange) return "";

		let dayOfWeek = currentDate.getDay();
		if (dayOfWeek === 0) dayOfWeek = 7;

		if (!activeLetter && activeNums.length > 0) {
			const color = getColourByDayNumber(dayOfWeek);
			if (color) return color;
			return "";
		}

		if (activeLetter) {
			const color = getColourByLetterSet(dayOfWeek, day);
			if (color) return color;
			return "";
		}

		return STYLE_ACTIVE;
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
						className={`h-6 flex items-center justify-center border-b border-r border-gray-100 cursor-pointer hover:bg-blue-100 transition-colors ${getDayColour(day)}`}
						onClick={() => {
							const clickedDate = new Date(year, monthIndex, day);
							switch (step) {
								case 1:
									onDateClick(clickedDate);
									break;
								case 3:
									onDateClick(clickedDate);
									break;
								default:
									break;
							}
						}}
					>
						{day}
					</div>
				))}
			</div>
		</div>
	);
}
