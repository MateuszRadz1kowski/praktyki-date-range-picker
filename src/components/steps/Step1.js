import React, { useState, useEffect } from "react";
import Month from "../Month";
import { startOfDay, isBefore, isSameDay } from "date-fns";
import { getMonthsData } from "../functions/getMonthData";

export default function Step1({ onRangeChange, selectedRange }) {
	const [range, setRange] = useState(selectedRange);

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
					selectedRange={selectedRange}
					onDateClick={handleDateClick}
				/>
			))}
		</div>
	);
}
