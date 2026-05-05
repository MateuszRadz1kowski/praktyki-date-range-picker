import React, { useState } from "react";
import DateRangePicker from "./components/DateRangePicker";
import {
	formatGroupedDates,
	formatToRoman,
} from "./components/functions/FormatDescription";

// Konfiguracja – tu można zmienić rok startowy i dozwolony zakres dat
const START_YEAR = 2025;
const START_MONTH = 11;
const MIN_DATE = new Date(2025, 11, 14);
const MAX_DATE = new Date(2026, 11, 12);

export default function App() {
	const [legends, setLegends] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState(null);
	const [editInitialState, setEditInitialState] = useState(null);
	const [editInitialStep, setEditInitialStep] = useState(1);

	const openNewLegend = () => {
		setEditingIndex(null);
		setEditInitialState(null);
		setEditInitialStep(1);
		setModalOpen(true);
	};

	const openEditLegend = (index) => {
		const legend = legends[index];
		setEditingIndex(index);
		setEditInitialState(legend._ui);
		setEditInitialStep(4);
		setModalOpen(true);
	};

	const handleSave = (config) => {
		setLegends((prev) => {
			const updated = [...prev];
			if (editingIndex != null) {
				updated[editingIndex] = config;
			} else {
				updated.push(config);
			}
			return updated;
		});
		setModalOpen(false);
		console.log("Zapisano konfigurację legendy:", config);
	};

	const handleCancel = () => {
		setModalOpen(false);
	};

	const deleteLegend = (index) => {
		setLegends((prev) => prev.filter((_, i) => i != index));
	};

	const getLegendLabel = (legend) => {
		const ui = legend._ui;
		if (!ui?.selectedRange?.from || !ui?.selectedRange?.to)
			return "(brak zakresu)";
		let text = `kursuje od ${formatToRoman(ui.selectedRange.from)} do ${formatToRoman(ui.selectedRange.to)} ${ui.limitationsText}`;
		if (ui.exceptions?.add?.length > 0)
			text += ` oraz ${formatGroupedDates(ui.exceptions.add)}`;
		if (ui.exceptions?.remove?.length > 0)
			text += ` oprócz ${formatGroupedDates(ui.exceptions.remove)}`;
		if (ui.extraDescription) text += `; ${ui.extraDescription}`;
		return text;
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-xl font-bold text-gray-800 mb-4">
					Legendy do rozkładu jazdy
				</h1>

				<button
					onClick={openNewLegend}
					className="mb-6 bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-5 py-2 rounded font-bold text-sm transition-all"
				>
					+ Dodaj nową legendę
				</button>

				{legends.length == 0 && (
					<p className="text-gray-500 text-sm italic">
						Brak legend. Kliknij przycisk powyżej, aby dodać.
					</p>
				)}

				<ul className="flex flex-col gap-2">
					{legends.map((legend, index) => (
						<li
							key={index}
							className="bg-white border border-gray-300 rounded shadow-sm p-3 flex justify-between items-center gap-3"
						>
							<span className="text-[13px] text-gray-700 italic flex-1">
								{getLegendLabel(legend)}
							</span>
							<div className="flex gap-2 shrink-0">
								<button
									onClick={() => openEditLegend(index)}
									className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold transition-all"
								>
									Edytuj
								</button>
								<button
									onClick={() => deleteLegend(index)}
									className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-bold transition-all"
								>
									Usuń
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>

			{modalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-white w-full max-w-[98vw] h-[95vh] rounded shadow-2xl flex flex-col overflow-hidden">
						<DateRangePicker
							initialState={editInitialState}
							initialStep={editInitialStep}
							onSave={handleSave}
							onCancel={handleCancel}
							startYear={START_YEAR}
							startMonth={START_MONTH}
							minDate={MIN_DATE}
							maxDate={MAX_DATE}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
