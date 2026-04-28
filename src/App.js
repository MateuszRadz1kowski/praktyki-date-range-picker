import React, { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";

export default function App() {
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
						{step === totalSteps ? "Zapisz zmiany" : "Następny krok »"}
					</button>
				</div>
			</nav>

			<main className="flex-grow overflow-auto p-2">
				<div className="bg-white border border-gray-300 min-h-full rounded-sm">
					<CalendarGrid />
				</div>
			</main>

			<footer className="bg-white border-t border-gray-300 p-2 text-center shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
				<div className="text-[13px] text-gray-700 font-medium">
					kursuje w (1)-(7)
				</div>
			</footer>
		</div>
	);
}
