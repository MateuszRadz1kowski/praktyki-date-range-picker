// dane do generowania miesięcy w kalendarzu
export const getMonthsData = (
	startYear = 2025,
	startMonth = 11,
	count = 14,
) => {
	const months = [];

	for (let i = 0; i < count; i++) {
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
