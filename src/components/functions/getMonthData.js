//dane do generowania miesięcy w kalendarzu
export const getMonthsData = () => {
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
