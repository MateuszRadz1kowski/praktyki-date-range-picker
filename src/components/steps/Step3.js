import React from "react";
import Month from "../Month";
import { format, startOfDay, isSameDay, isWithinInterval } from "date-fns";
import { getMonthsData } from "../functions/getMonthData";

export default function Step3({
	selectedRange,
	step,
	exceptions,
	setExceptions,
	activeNums,
	activeLetter,
}) {
	const monthsData = getMonthsData();

	const handleDateClick = (clickedDate) => {
		const dateStr = format(startOfDay(clickedDate), "yyyy-MM-dd");
		const isInitiallyActive = checkIfDateIsActive(clickedDate);

		setExceptions((prev) => {
			const { add, remove } = prev;

			if (isInitiallyActive) {
				return {
					...prev,
					remove: remove.includes(dateStr)
						? remove.filter((day) => day != dateStr)
						: [...remove, dateStr],
				};
			} else {
				return {
					...prev,
					add: add.includes(dateStr)
						? add.filter((day) => day !== dateStr)
						: [...add, dateStr],
				};
			}
		});
	};

	const checkIfDateIsActive = (date) => {
		if (!selectedRange?.from || !selectedRange?.to) return false;
		const day = date.getDate();
		const currentStart = startOfDay(date);

		if (
			!isWithinInterval(currentStart, {
				start: startOfDay(selectedRange.from),
				end: startOfDay(selectedRange.to),
			})
		) {
			return false;
		}
		return true;
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1 p-1">
			{monthsData.map((m) => (
				<Month
					key={m.id}
					year={m.year}
					monthIndex={m.monthIndex}
					daysInMonth={m.daysCount}
					firstDayOffset={m.offset}
					selectedRange={selectedRange}
					step={step}
					exceptions={exceptions}
					onDateClick={handleDateClick}
				/>
			))}
		</div>
	);
}
