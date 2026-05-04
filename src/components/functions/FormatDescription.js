import { format } from "date-fns";

const ROMAN_MONTHS = [
	"I",
	"II",
	"III",
	"IV",
	"V",
	"VI",
	"VII",
	"VIII",
	"IX",
	"X",
	"XI",
	"XII",
];

export const formatToRoman = (date) => {
	if (!date) return "";
	const d = new Date(date);
	const day = d.getDate();
	const month = ROMAN_MONTHS[d.getMonth()];
	const yearShort = format(d, "yy");
	console.log("formatToRoman:", { date, day, month, yearShort });
	return `${day} ${month} ${yearShort}r.`;
};

export const formatGroupedDates = (dateStrings) => {
	if (!dateStrings || dateStrings.length == 0) return "";

	const dates = dateStrings.map((d) => new Date(d)).sort((a, b) => a - b);

	const groups = [];
	let currentGroup = [];
	dates.forEach((date, index) => {
		if (index == 0) {
			currentGroup.push(date);
		} else {
			const prevDate = dates[index - 1];
			if (
				date.getMonth() == prevDate.getMonth() &&
				date.getFullYear() == prevDate.getFullYear()
			) {
				currentGroup.push(date);
			} else {
				groups.push([...currentGroup]);
				currentGroup = [date];
			}
		}
	});
	groups.push(currentGroup);
	console.log("formatGroupedDates:", { dateStrings, groups });

	return groups
		.map((group) => {
			const days = group.map((d) => d.getDate()).join(",");
			const month = ROMAN_MONTHS[group[0].getMonth()];
			const yearShort = format(group[0], "yy");
			return `${days} ${month} ${yearShort}r.`;
		})
		.join(", ");
};
