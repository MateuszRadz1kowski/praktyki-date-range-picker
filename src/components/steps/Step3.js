import React, { useState, useEffect } from "react";
import Month from "../Month";
import { startOfDay, isBefore, isSameDay } from "date-fns";
import { getMonthsData } from "../functions/getMonthData";

export default function Step3({ selectedRange }) {
	const monthsData = getMonthsData();

	const handleDateClick = (clickedDate) => {
		console.log("Kliknięto datę:", clickedDate);
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
					onDateClick={handleDateClick}
				/>
			))}
		</div>
	);
}
