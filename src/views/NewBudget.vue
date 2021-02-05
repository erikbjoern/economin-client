<template>
  <div class="h-screen w-screen bg-cyan-800 pt-10">
    <div class="h-screen mx-auto flex flex-col items-center">
      <h1 class="text-center text-lg text-gray-200 font-semibold font-main">
        Ny budget
      </h1>
      <form
        @submit="createBudget"
        class="flex flex-col h-1/2 justify-evenly mt-8"
      >
        <div class="formgrid grid grid-cols-auto-3 gap-2">
          <label class="font-semibold text-gray-200 mb-6">Från:</label>
          <functional-calendar
            class="col-span-2"
            id="startDay"
            :is-date-picker="true"
            :is-modal="true"
            :transition="true"
            :is-auto-closeable="true"
            :is-typeable="true"
            :is-layout-expandable="true"
            :placeholder="this.today"
            v-model="calendarData"
          ></functional-calendar>
          <label htmlFor="length" class="font-semibold text-gray-200"
            >Längd:</label
          >
          <input
            id="length"
            type="number"
            class="w-14 rounded-sm text-gray-600 text-right pr-px"
            v-model="length"
          />
          <select
            name="unit"
            id="unit"
            class="rounded-sm text-gray-600"
            v-model="this.unit"
          >
            <option value="DAYS">{{ computedDays }}</option>
            <option value="MONTHS">{{ computedMonths }} </option>
          </select>
          <label htmlFor="amount" class="font-semibold text-gray-200"
            >Summa:</label
          >
          <input
            id="amount"
            type="number"
            class="w-14 rounded-sm text-gray-600 text-right pr-px"
            v-model="amount"
            step="100"
          />
          <select
            name="currency"
            id="currency"
            class="rounded-sm text-gray-600"
          >
            <option value="SEK">kr</option>
            <option value="USD">$</option>
            <option value="EUR">€</option>
            <option value="GBP">£</option>
            <option value="YEN">¥</option>
          </select>
        </div>
        <div class="flex items-center justify-center gap-3">
          <input id="recurring" name="recurring" type="checkbox" />
          <label htmlFor="recurring" class="text-gray-200"
            >Upprepa automatiskt</label
          >
        </div>
        <button
          type="submit"
          class="bg-lime-400 rounded w-36 mx-auto text-cyan-900 font-semibold pb-1"
        >
          Spara
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { FunctionalCalendar } from "vue-functional-calendar";
import CREATE_BUDGET from "../graphql/mutations/createBudget.gql";

export default {
  name: "NewBudget",
  components: {
    FunctionalCalendar,
  },
  data() {
    return {
      calendarData: {},
      currentDay: new Date().getDay(),
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      length: 1,
      unit: "MONTHS",
      amount: 1000,
    };
  },
  computed: {
    today() {
      return [this.currentDay, this.currentMonth, this.currentYear].join("/");
    },
    computedMonths() {
      return this.length === 1 ? "månad" : "månader";
    },
    computedDays() {
      return this.length === 1 ? "dag" : "dagar";
    },
    startDay() {
      return parseInt(this.getPartFromDate(/^\d+/)) || this.currentDay;
    },
    startMonth() {
      return parseInt(this.getPartFromDate(/(?<=\/)\d+(?=\/)/)) || this.currentMonth;
    },
    startYear() {
      return parseInt(this.getPartFromDate(/\d+$/)) || this.currentYear;
    },
  },
  methods: {
    getPartFromDate(regex) {
      return this.calendarData.selectedDate?.match(regex)[0];
    },
    async createBudget(event) {
      event.preventDefault();

      try {
        const result = await this.$apollo.mutate({
          mutation: CREATE_BUDGET,
          variables: {
            input: {
              amount: this.amount,
              startDay: this.startDay,
              startMonth: this.startMonth,
              startYear: this.startYear,
              length: this.length,
              unit: this.unit,
              recurring: false,
            },
          },
        });

        this.$store.commit('UPDATE_CURRENT_BUDGET', result.data.createBudget)
      } catch (error) {
        debugger;
      }
    },
  },
};
</script>

<style>
/* Changes the color of 'today' in the date picker */
.vfc-week .vfc-day span.vfc-span-day.vfc-today {
  background-color: rgb(158, 182, 151) !important;
}
</style>
