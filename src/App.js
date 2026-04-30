import React, { useState } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";

export default function App() {
	const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
	const [exceptions, setExceptions] = useState({ add: [], remove: [] });
	const [limitationsText, setLimitationsText] = useState("w (1)-(7)");
	const [step, setStep] = useState(1);
	const totalSteps = 4;

	const stepTitles = {
		1: "Zakres dat obowiązywania rozkładu",
		2: "Ograniczenia kursowania",
		3: "Wyjątki kursowania",
		4: "Dodatkowy opis",
	};

	const nextStep = () => step < totalSteps && setStep(step + 1);
	const prevStep = () => step > 1 && setStep(step - 1);

	return (
		<div className="flex flex-col h-screen bg-[#f0f0f0] overflow-hidden">
			<header className="bg-[#444] text-white px-3 py-1.5 flex justify-between items-center shadow-sm">
				<div className="flex items-center gap-2">
					<div className="bg-[#fdfd96] p-0.5 rounded shadow-inner">
						<span className="text-black text-[10px]">📖</span>
					</div>
					<h1 className="font-bold text-[13px] tracking-tight">
						Tworzenie nowej legendy do rozkładu
					</h1>
				</div>
			</header>

			<nav className="bg-white border-b border-gray-300 px-4 py-2 flex justify-between items-center">
				<div className="text-[14px] font-semibold text-gray-800">
					Krok {step} z {totalSteps}:{" "}
					<span className="font-bold">{stepTitles[step]}</span>
				</div>
				<div className="flex gap-2">
					{step > 1 && (
						<button
							onClick={prevStep}
							className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded text-[12px] font-bold border border-gray-300 transition-all"
						>
							« Poprzedni krok
						</button>
					)}
					<button
						onClick={nextStep}
						className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-4 py-1 rounded text-[12px] font-bold transition-all flex items-center"
					>
						{step == totalSteps ? "Zapisz zmiany" : "Następny krok »"}
					</button>
				</div>
			</nav>

			<main className="flex-grow overflow-auto p-2">
				{step == 1 && (
					<Step1
						onRangeChange={setSelectedRange}
						selectedRange={selectedRange}
						step={step}
					/>
				)}
				{step == 2 && (
					<Step2
						selectedRange={selectedRange}
						limitationText={limitationsText}
						setLimitationsText={setLimitationsText}
						step={step}
					/>
				)}
				{step == 3 && (
					<Step3
						selectedRange={selectedRange}
						step={step}
						setExceptions={setExceptions}
						exceptions={exceptions}
					/>
				)}
			</main>

			<footer className="bg-white border-t border-gray-300 p-2 text-center">
				<div className="text-[13px] text-gray-700 font-medium italic">
					{selectedRange.from && selectedRange.to
						? `kursuje od ${format(selectedRange.from, "dd MMMM yyyy", { locale: pl })} do ${format(selectedRange.to, "d MMMM yyyy", { locale: pl })} ${limitationsText}`
						: "wybierz zakres dat na kalendarzu"}
				</div>
			</footer>
		</div>
	);
}
