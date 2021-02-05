import { formatBudgetDates, calculateDifference } from "../../src/helpers/budgetDates"

const oneMonthBudget = {
  startDay: 1,
  startMonth: 1,
  startYear: 2021,
  length: 1,
  unit: "MONTHS"
}

const twoMonthBudget = {
  startDay: 28,
  startMonth: 2,
  startYear: 2021,
  length: 2,
  unit: "MONTHS"
}

const sevenDayBudget = {
  startDay: 25,
  startMonth: 2,
  startYear: 2021,
  length: 7,
  unit: "DAYS"
}

const thirtyDayBudget = {
  startDay: 29,
  startMonth: 3,
  startYear: 2021,
  length: 30,
  unit: "DAYS"
}

const decemberToJanuaryBudget = {
  startDay: 29,
  startMonth: 12,
  startYear: 2020,
  length: 31,
  unit: "DAYS"
}

const januaryToDecemberNextYear = {
  startDay: 29,
  startMonth: 1,
  startYear: 2021,
  length: 23,
  unit: "MONTHS"
}

describe("formatBudgetDates", () => {
  describe("for dates within the same year", () => {
    it("returns day of the week, day and month for both dates", () => {
      expect(formatBudgetDates(oneMonthBudget)).toMatch(/fre 1 jan - sön 31 jan/)
      expect(formatBudgetDates(twoMonthBudget)).toMatch(/sön 28 feb - tis 27 apr/)
      expect(formatBudgetDates(sevenDayBudget)).toMatch(/tor 25 feb - ons 3 mars/)
      expect(formatBudgetDates(thirtyDayBudget)).toMatch(/mån 29 mars - tis 27 apr/)
    })
  })

  describe("for dates that reach into another year", () => {
    it("returns day, month and year for both dates", () => {
      expect(formatBudgetDates(decemberToJanuaryBudget)).toMatch(/29 dec 2020 - 28 jan 2021/)
      expect(formatBudgetDates(januaryToDecemberNextYear)).toMatch(/29 jan 2021 - 28 dec 2022/)
    })
  })
})

describe("calculateDifference", () => {
  it("returns the number of days that the budget lasts (including the start date)", () => {
    expect(calculateDifference(oneMonthBudget)).toBe(31)
    expect(calculateDifference(twoMonthBudget)).toBe(1 + 31 + 27)
    expect(calculateDifference(sevenDayBudget)).toBe(7)
    expect(calculateDifference(thirtyDayBudget)).toBe(30)
  })
})