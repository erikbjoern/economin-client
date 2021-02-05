const calculateEndDate = (currentBudget) => {
  const { startDay, startMonth, startYear, unit, length } = currentBudget;

  const startDate = new Date(Date.UTC(startYear, startMonth - 1, startDay));
  let endDay, endMonth, endYear, endDate

  if (unit === "MONTHS") {
    endYear = startYear + Math.floor(length / 12)
    endMonth = startMonth + (length % 12)
    endDay = startDay
    endDate = new Date(Date.UTC(endYear, endMonth - 1, endDay))
    startDay === 1 ? endDate.setDate(0) : endDate.setDate(startDay - 1)
  } else {
    endDate = new Date(startDate)
    endDate.setDate(startDay + length - 1);
  }

  return {
    startDate,
    endDate,
    endDay: endDate.getDate(),
    endMonth: endDate.getMonth() + 1,
    endYear: endDate.getFullYear(),
  };
};

export const formatBudgetDates = (currentBudget) => {
  const {
    startDay,
    startMonth,
    startYear
  } = currentBudget
  const {
    startDate,
    endDate,
    endDay,
    endMonth,
    endYear,
  } = calculateEndDate(currentBudget);

  const days = ["sön", "mån", "tis", "ons", "tor", "fre", "lör"];
  const months = [
    "använd 1-index",
    "jan",
    "feb",
    "mars",
    "apr",
    "maj",
    "juni",
    "juli",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec",
  ];

  const startDayOfWeek = days[startDate.getDay()];
  const endDayOfWeek = days[endDate.getDay()];

  return startYear !== endYear
    ? [
        startDay,
        months[startMonth],
        startYear,
        "-",
        endDay,
        months[endMonth],
        endYear,
      ].join(" ")
    : [
        startDayOfWeek,
        startDay,
        months[startMonth],
        "-",
        endDayOfWeek,
        endDay,
        months[endMonth],
      ].join(" ");
};

export const calculateDifference = (currentBudget) => {
  const { startDate, endDate } = calculateEndDate(currentBudget);

  const difference = Math.floor(
    ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
  return difference;
};
