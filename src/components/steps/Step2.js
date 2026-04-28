import React, { useState, useEffect } from "react";
import { getMonthsData } from "../functions/getMonthData";
import Month from "../Month";

export default function Step2({ selectedRange }) {
	const monthsData = getMonthsData();
	const [selectedLetter, setSelectedLetter] = useState(null);
	const [selectedNums, setSelectedNums] = useState([]);
	const [isF, setIsF] = useState(false);

	const letters = ["A", "B", "C", "D", "E"];
	const numbers = ["1", "2", "3", "4", "5", "6", "7"];

	const selectLetter = (l) => {
		setSelectedNums([]);
		setSelectedLetter(selectedLetter === l ? null : l);
	};

	const toggleNumber = (n) => {
		setSelectedLetter(null);
		setSelectedNums((prev) =>
			prev.includes(n) ? prev.filter((num) => num !== n) : [...prev, n],
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-gray-50 border border-gray-300 p-4 rounded-sm shadow-sm flex flex-wrap gap-8 items-start">
				<div className="flex flex-col gap-2">
					<span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
						Zestaw (A-E)
					</span>
					<div className="flex gap-1">
						{letters.map((l) => (
							<button
								key={l}
								onClick={() => selectLetter(l)}
								className={`w-9 h-9 flex items-center justify-center border rounded font-bold transition-all ${
									selectedLetter === l
										? "bg-blue-600 text-white border-blue-700 shadow-md"
										: "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
								}`}
							>
								{l}
							</button>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
						Dni tygodnia (1-7)
					</span>
					<div className="flex gap-1">
						{numbers.map((n) => (
							<button
								key={n}
								onClick={() => toggleNumber(n)}
								className={`w-9 h-9 flex items-center justify-center border rounded font-bold transition-all ${
									selectedNums.includes(n)
										? "bg-green-600 text-white border-green-700 shadow-md"
										: "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
								}`}
							>
								{n}
							</button>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
						Inne
					</span>
					<button
						onClick={() => setIsF(!isF)}
						className={`w-9 h-9 flex items-center justify-center border rounded font-bold transition-all ${
							isF
								? "bg-orange-500 text-white border-orange-600 shadow-md"
								: "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
						}`}
					>
						F
					</button>
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
						activeNums={selectedNums}
						onDateClick={() => {}}
					/>
				))}
			</div>
		</div>
	);
}
