// src/components/CalendarGrid.js
import React from "react";
import Month from "./Month";

export default function CalendarGrid() {
	const monthsData = [
		{ name: "Grudzień", year: 2025, days: 31, offset: 0 },
		{ name: "Styczeń", year: 2026, days: 31, offset: 3 },
		{ name: "Luty", year: 2026, days: 28, offset: 6 },
		{ name: "Marzec", year: 2026, days: 31, offset: 6 },
		{ name: "Kwiecień", year: 2026, days: 30, offset: 2 },
		{ name: "Maj", year: 2026, days: 31, offset: 4 },
		{ name: "Czerwiec", year: 2026, days: 30, offset: 0 },
		{ name: "Lipiec", year: 2026, days: 31, offset: 2 },
		{ name: "Sierpień", year: 2026, days: 31, offset: 5 },
		{ name: "Wrzesień", year: 2026, days: 30, offset: 1 },
		{ name: "Październik", year: 2026, days: 31, offset: 3 },
		{ name: "Listopad", year: 2026, days: 30, offset: 6 },
		{ name: "Grudzień", year: 2026, days: 31, offset: 1 },
		{ name: "Styczeń", year: 2027, days: 31, offset: 4 },
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1 p-1">
			{monthsData.map((m, idx) => (
				<Month
					key={`${m.year}-${m.name}`}
					year={m.year}
					monthName={m.name}
					daysInMonth={m.days}
					firstDayOffset={m.offset}
				/>
			))}
		</div>
	);
}
