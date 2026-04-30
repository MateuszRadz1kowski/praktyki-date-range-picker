import React, { useState, useEffect } from "react";
import { getMonthsData } from "../functions/getMonthData";
import Month from "../Month";
import { set } from "date-fns";

const LETTER_TOOLTIP = {
	A: "kursuje od poniedziałku do piątku",
	B: "kursuje od poniedziałku do piątku i w niedziele",
	C: "kursuje w soboty, niedziele i święta",
	D: "kursuje od poniedziałku do piątku oprócz świąt",
	E: "kursuje od poniedziałku do soboty oprócz świąt",
	1: "kursuje w poniedziałki",
	2: "kursuje we wtorki",
	3: "kursuje w środy",
	4: "kursuje w czwartki",
	5: "kursuje w piątki",
	6: "kursuje w soboty",
	7: "kursuje w niedziele",
};

export default function Step2({
	selectedRange,
	limitationText,
	setLimitationsText,
	selectedLetter,
	setSelectedLetter,
	selectedNums,
	setSelectedNums,
	isF,
	setIsF,
	step,
}) {
	const monthsData = getMonthsData();
	const [tooltip, setTooltip] = useState(null);
	const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
	const letters = ["A", "B", "C", "D", "E"];
	const numbers = ["1", "2", "3", "4", "5", "6", "7"];

	//generowanie tekstu ograniczeń na podstawie poszczególnych dni tygodnia (numery)
	const generateNumbersText = (nums) => {
		const sorted = [...nums].map(Number).sort((a, b) => a - b);
		let ranges = [];
		let start = sorted[0];
		let end = sorted[0];
		for (let i = 1; i <= sorted.length; i++) {
			if (sorted[i] == end + 1) {
				end = sorted[i];
			} else {
				ranges.push(start == end ? `(${start})` : `(${start})-(${end})`);
				start = sorted[i];
				end = sorted[i];
			}
		}
		return ranges.join(",");
	};

	// Aktualizacja tekstu ograniczeń przy zmianie ograniczeń
	useEffect(() => {
		let text = "w ";

		if (selectedLetter) {
			text += `(${selectedLetter})`;
		} else {
			if (selectedNums.length == 0 || selectedNums.length == 7) {
				text += "(1)-(7)";
			} else {
				text += generateNumbersText(selectedNums);
			}
		}

		if (isF) {
			text += ",(F)";
		}

		setLimitationsText(text);
	}, [selectedLetter, selectedNums, isF, setLimitationsText]);

	const selectLetter = (l) => {
		if (selectedLetter == l) {
			setSelectedLetter(null);
		} else {
			setSelectedLetter(l);
			setSelectedNums([]);
		}
	};

	const toggleNumber = (n) => {
		setSelectedLetter(null);
		setSelectedNums((prev) =>
			prev.includes(n) ? prev.filter((num) => num !== n) : [...prev, n],
		);
	};

	const toggleF = () => setIsF(!isF);

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-gray-50 border border-gray-300 p-4 rounded-sm shadow-sm flex flex-wrap gap-8 items-start">
				<div className="flex flex-col gap-2">
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
								onMouseEnter={(e) => {
									setTooltip(LETTER_TOOLTIP[l]);
									setTooltipPos({ x: e.clientX, y: e.clientY });
								}}
								onMouseMove={(e) =>
									setTooltipPos({ x: e.clientX, y: e.clientY })
								}
								onMouseLeave={() => setTooltip(null)}
							>
								{l}
							</button>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-2">
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
								onMouseEnter={(e) => {
									setTooltip(LETTER_TOOLTIP[n]);
									setTooltipPos({ x: e.clientX, y: e.clientY });
								}}
								onMouseMove={(e) =>
									setTooltipPos({ x: e.clientX, y: e.clientY })
								}
								onMouseLeave={() => setTooltip(null)}
							>
								{n}
							</button>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<button
						onClick={toggleF}
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
			{tooltip && (
				<div
					className="fixed z-50 bg-gray-800 text-xs text-gray-100 px-2 py-1 pointer-events-none shadow text-base rounded"
					style={{ left: tooltipPos.x + 12, top: tooltipPos.y + 16 }}
				>
					{tooltip}
				</div>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1">
				{getMonthsData().map((m) => (
					<Month
						key={m.id}
						year={m.year}
						monthIndex={m.monthIndex}
						daysInMonth={m.daysCount}
						firstDayOffset={m.offset}
						selectedRange={selectedRange}
						activeNums={
							!selectedLetter && selectedNums.length == 0
								? numbers
								: selectedNums
						}
						activeLetter={selectedLetter}
						step={step}
					/>
				))}
			</div>
		</div>
	);
}
