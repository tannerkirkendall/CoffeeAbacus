<template>
  <div class="home">
    <Calculator />
  </div>
</template>

<script>
// @ is an alias to /src
import Calculator from "@/components/Calculator.vue";

export default {
  name: "home",
  components: {
    Calculator
  }
};
</script>
<style scoped>
  .home {
  width: 100%;
    max-width: 600px;
    margin: auto;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
  }
</style>