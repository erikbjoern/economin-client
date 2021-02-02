<template>
  <div class="h-screen w-screen bg-yellow-500 pt-10">
    <div class="w-4/5 mx-auto flex flex-col items-center">
      <h1 class="text-center text-lg">Ny budget:</h1>
      <form class="mt-10 flex flex-col space-y-10">
        <div>
          <div class="flex space-x-28">
            <label>Från:</label>
            <label class="mr-32">Till:</label>
          </div>
          <functional-calendar
            :is-date-range="true"
            :is-modal="true"
            :transition="true"
            :is-auto-closeable="true"
            :is-typeable="true"
            :is-layout-expandable="true"
          ></functional-calendar>
        </div>
        <div class="flex space-x-5">
          <label htmlFor="length">Längd:</label>
          <input id="length" type="number" class="w-14" />
          <select name="unit" id="unit">
            <option value="DAYS">dagar</option>
            <option value="MONTHS">månader</option>
          </select>
        </div>
        <div class="flex space-x-5">
          <label htmlFor="amount">Summa:</label>
          <input id="amount" type="number" class="w-36"/>
          <select name="currency" id="currency">
            <option value="SEK">kr</option>
            <option value="USD">$</option>
            <option value="EUR">€</option>
            <option value="GBP">£</option>
            <option value="YEN">¥</option>
          </select>
        </div>
        <button type="submit" class="bg-green-600 rounded w-36 mx-auto text-yellow-400 pb-1">Spara</button>
      </form>
    </div>
  </div>
</template>

<script>
import { FunctionalCalendar } from "vue-functional-calendar";

export default {
  name: "NewBudget",
  components: {
    FunctionalCalendar,
  },
};
</script>

<style scoped>
h1,
h2 {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>

<style>
.vfc-week .vfc-day span.vfc-span-day.vfc-today {
  background-color: rgb(158, 182, 151) !important;
}
</style>
