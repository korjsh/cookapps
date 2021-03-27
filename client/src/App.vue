<template>
  <div id="app">
    <cookapp />
  </div>
</template>

<script>
import cookapp from "./components/cookapp.vue";

export default {
  name: "App",
  components: {
    cookapp,
  },
};
</script>
<style lang="scss">
@import "@/assets/main.scss";
</style>
