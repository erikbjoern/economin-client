<template>
  <div class="h-screen mx-auto flex flex-col items-center bg-cyan-800 pt-10">
    <h1 class="text-center text-lg text-gray-200 font-semibold font-main">
      Ny budget
    </h1>
    <form @submit="createBudget" class="flex flex-col space-y-10">
      <div
        class="flex flex-col space-y-10 mt-8 transition-opacity"
        :class="{ 'opacity-40': isSaving }"
      >
        <div class="formgrid grid grid-cols-auto-3 gap-2">
          <label for="startDate" class="font-semibold text-gray-200 mb-6">
            Från:
          </label>
          <functional-calendar
            class="col-span-2"
            id="startDate"
            :is-date-picker="true"
            :is-modal="true"
            :transition="true"
            :is-auto-closeable="true"
            :is-typeable="true"
            :is-layout-expandable="true"
            :placeholder="today"
            v-model="calendarData"
            ref="calendar"
          ></functional-calendar>
          <label for="length" class="font-semibold text-gray-200">Längd:</label>
          <input
            id="length"
            type="number"
            class="w-14 rounded-sm text-gray-600 text-right pr-px shadow"
            v-model="length"
          />
          <select
            id="unit"
            class="rounded-sm text-gray-600 shadow"
            v-model="unit"
          >
            <option value="DAYS">{{ dayOrDays }}</option>
            <option value="MONTHS">{{ monthOrMonths }} </option>
          </select>
          <div
            class="pointer-events-none col-span-full max-h-0 transition-min-max-h duration-400 text-white w-56 bg-red-900 opacity-80 rounded-lg mx-auto shadow"
            :class="{ 'max-h-56': errors.dateError }"
          >
            <p
              class="p-5 opacity-0 transition-opacity duration-400"
              :class="{ 'opacity-100': errors.dateError }"
            >
              {{ errors.dateError || ":)" }}
            </p>
          </div>
          <label for="amount" class="font-semibold text-gray-200">Summa:</label>
          <input
            id="amount"
            type="number"
            class="w-14 rounded-sm text-gray-600 text-right pr-px shadow"
            v-model="amount"
            min="1"
          />
          <select id="currency" class="rounded-sm text-gray-600 shadow">
            <option value="SEK">kr</option>
            <option value="USD">$</option>
            <option value="EUR">€</option>
            <option value="GBP">£</option>
            <option value="YEN">¥</option>
          </select>
          <div
            class="relative col-span-full max-h-0 transition-min-max-h duration-400 text-white opacity-80 w-56 bg-red-900 rounded-lg mx-auto shadow"
            :class="{
              'max-h-56': errors.amountError || errors.createBudgetError,
            }"
          >
            <div
              v-if="errors.createBudgetError"
              class="absolute top-1 font-bold right-2 text-white"
              @click="$delete(errors, 'createBudgetError')"
            >
              X
            </div>
            <p
              class="p-5 opacity-0 transition-opacity duration-400"
              :class="{
                'opacity-100': errors.amountError || errors.createBudgetError,
              }"
            >
              {{ errors.amountError || errors.createBudgetError }}
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center gap-3">
          <input id="recurring" type="checkbox" class="shadow" />
          <label for="recurring" class="text-gray-200"
            >Upprepa automatiskt</label
          >
        </div>
      </div>
      <button
        type="submit"
        class="bg-emerald-500 shadow-lg rounded w-36 mx-auto text-cyan-900 font-semibold pb-px transition-opacity"
        :class="{
          'opacity-50': hasAnyErrors,
          'pointer-events-none': hasAnyErrors,
        }"
      >
        {{ isSaving ? "Sparar..." : "Spara" }}
      </button>
    </form>
  </div>
</template>

<script>
import CREATE_BUDGET from "../graphql/mutations/createBudget.gql";
import { FunctionalCalendar } from "vue-functional-calendar";
import { calculateEndDate } from "../helpers/budgetDates";

export default {
  name: "SetNewBudget",
  components: {
    FunctionalCalendar,
  },
  data() {
    return {
      amount: 1000,
      calendarData: {},
      currentDay: new Date().getDay(),
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      errors: {},
      hasAnyErrors: false,
      isSaving: false,
      length: 1,
      unit: "MONTHS",
    };
  },
  computed: {
    today() {
      return [this.currentDay, this.currentMonth, this.currentYear].join("/");
    },
    startDay() {
      return parseInt(this.getPartFromDate(/^\d+/)) || this.currentDay;
    },
    startMonth() {
      return (
        parseInt(this.getPartFromDate(/(?<=\/)\d+(?=\/)/)) || this.currentMonth
      );
    },
    startYear() {
      return parseInt(this.getPartFromDate(/\d+$/)) || this.currentYear;
    },
    monthOrMonths() {
      return this.length === 1 ? "månad" : "månader";
    },
    dayOrDays() {
      return this.length === 1 ? "dag" : "dagar";
    },
  },
  methods: {
    getPartFromDate(regex) {
      return this.calendarData.selectedDate?.match(regex)[0];
    },
    async createBudget(event) {
      event.preventDefault();

      if (this.hasAnyErrors) {
        console.log(
          "Returning from createBudget because of present errors, apparently"
        );
        return;
      }

      this.isSaving = true;

      try {
        const result = await this.$apollo.mutate({
          mutation: CREATE_BUDGET,
          variables: {
            input: {
              amount: parseInt(this.amount),
              startDay: this.startDay,
              startMonth: this.startMonth,
              startYear: this.startYear,
              length: parseInt(this.length),
              unit: this.unit,
              recurring: false,
            },
          },
        });

        this.$store.commit("UPDATE_CURRENT_BUDGET", result.data.createBudget);
      } catch (error) {
        const createBudgetErrorMessage =
          error.networkError?.message ||
          "Något gick fel. Har du redan en aktiv budget för detta datum?";

        this.$set(this.errors, "createBudgetError", createBudgetErrorMessage);
      }

      this.isSaving = false;
    },
    validateAmount() {
      if (this.amount <= 0) {
        this.$set(
          this.errors,
          "amountError",
          "Vänligen ange en summa pengar för din budget"
        );
      } else {
        this.$delete(this.errors, "amountError");
      }
    },
    validateEndDate() {
      const { startDay, startMonth, startYear, length, unit } = this;
      const { endDate } = calculateEndDate({
        startDay,
        startMonth,
        startYear,
        length,
        unit,
      });

      if (
        new Date() > endDate &&
        new Date().toString().slice(0, 15) != endDate.toString().slice(0, 15)
      ) {
        this.$set(
          this.errors,
          "dateError",
          "Din budget kan inte sluta innan dagens datum. Välj ett senare startdatum eller en längre period"
        );
      } else {
        this.$delete(this.errors, "dateError");
      }
    },
  },
  watch: {
    amount: "validateAmount",
    calendarData: {
      handler() {
        this.calendarData.selectedDate && this.validateEndDate();
        this.$delete(this.errors, "createBudgetError");
      },
      deep: true,
    },
    errors: {
      handler() {
        this.hasAnyErrors = Object.values(this.errors).some((v) => v);
      },
      deep: true,
    },
    length: "validateEndDate",
    unit: "validateEndDate",
  },
};
</script>

<style>
/* Changes the color of 'today' in the date picker */
.vfc-week .vfc-day span.vfc-span-day.vfc-today {
  background-color: rgb(158, 182, 151) !important;
}
</style>
