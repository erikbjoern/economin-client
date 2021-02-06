<template>
  <div class="h-screen w-screen bg-cyan-800 pt-10">
    <DisplayCurrentBudget v-if="$store.state.currentBudget.id" />
    <SetNewBudget v-else />
  </div>
</template>

<script>
import DisplayCurrentBudget from "../components/DisplayCurrentBudget";
import SetNewBudget from "../components/SetNewBudget";

export default {
  name: "ManageBudget",
  components: {
    DisplayCurrentBudget,
    SetNewBudget,
  },
};
</script>
