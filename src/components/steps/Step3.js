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

	//Wybieranie wyjątków
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

	// Funkcja pomocnicze do określania statusu dnia (wybrany/niewybrany)
	const checkIfDateIsActive = (date) => {
		if (!selectedRange.from || !selectedRange.to) return false;

		const currentStart = startOfDay(date);
		const from = startOfDay(selectedRange.from);
		const to = startOfDay(selectedRange.to);

		if (!isWithinInterval(currentStart, { start: from, end: to })) return false;

		let dayOfWeek = currentStart.getDay();
		if (dayOfWeek == 0) dayOfWeek = 7;

		if (activeNums.length > 0) {
			return activeNums.includes(dayOfWeek.toString());
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
					activeNums={activeNums}
					activeLetter={activeLetter}
				/>
			))}
		</div>
	);
}
