<template>
  <div>
    <h1 class="text-center text-lg text-gray-200 font-semibold font-main">
      Aktuell budget
    </h1>
    <h2 class="text-center text-gray-200 font-semibold font-main mt-5">
      {{ budgetDates }}
    </h2>
    <h2 class="text-center text-gray-200 font-semibold font-main mt-5">
      {{ $store.state.currentBudget.amount }}kr
    </h2>
    <h2 class="text-center text-gray-200 font-semibold font-main mt-5">
      {{ differenceInDays + " " + dayOrDays }}
    </h2>
  </div>
</template>

<script>
import { formatDates, calculateDifference } from "../helpers/budgetDates";

export default {
  name: "DisplayCurrentBudget",
  computed: {
    budgetDates() {
      return formatDates(this.$store.state.currentBudget);
    },
    differenceInDays() {
      return calculateDifference(this.$store.state.currentBudget);
    },
    dayOrDays() {
      return this.differenceInDays === 1 ? "dag" : "dagar";
    },
  },
};
</script>
