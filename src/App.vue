<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-content>
      <Calculator />
    </v-content>
  </v-app>
</template>

<script>
import Calculator from "@/components/Calculator.vue";

export default {
  name: "App",

  components: {
    Calculator
  },

  data: () => ({
    //
  })
};
</script>
<style scoped>
.clac {
  margin: auto;
  width: 50%;
  border: 13px solid green;
  padding: 10px;
}
</style>