import React, { useState, useEffect } from "react";
import Month from "../Month";
import { startOfDay, isBefore, isSameDay } from "date-fns";

export default function Step1({ onRangeChange }) {
	const [range, setRange] = useState({ from: null, to: null });

	const handleDateClick = (clickedDate) => {
		const date = startOfDay(clickedDate);
		if (!range.from || (range.from && range.to)) {
			setRange({ from: date, to: null });
		} else {
			if (isBefore(date, range.from)) {
				setRange({ from: date, to: range.from });
			} else if (isSameDay(date, range.from)) {
				setRange({ from: null, to: null });
			} else {
				setRange({ from: range.from, to: date });
			}
		}
	};

	useEffect(() => {
		onRangeChange(range);
		console.log("Zakres dat został zaktualizowany:", range);
	}, [range, onRangeChange]);

	const getMonthsData = () => {
		const months = [];
		const startYear = 2025;
		const startMonth = 11;

		for (let i = 0; i < 14; i++) {
			const d = new Date(startYear, startMonth + i, 1);
			const year = d.getFullYear();
			const monthIndex = d.getMonth();
			const daysCount = new Date(year, monthIndex + 1, 0).getDate();
			const firstDayInMonth = new Date(year, monthIndex, 1).getDay();
			const offset = firstDayInMonth == 0 ? 6 : firstDayInMonth - 1;

			months.push({
				id: `${year}-${monthIndex}`,
				year,
				monthIndex,
				daysCount,
				offset,
			});
		}
		return months;
	};

	const monthsData = getMonthsData();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1 p-1">
			{monthsData.map((m) => (
				<Month
					key={m.id}
					year={m.year}
					monthIndex={m.monthIndex}
					daysInMonth={m.daysCount}
					firstDayOffset={m.offset}
					selectedRange={range}
					onDateClick={handleDateClick}
				/>
			))}
		</div>
	);
}
