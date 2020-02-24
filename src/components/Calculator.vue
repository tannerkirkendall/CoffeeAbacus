<template>
  <div class="main">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="50" />
        </v-col>

        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">Welcome to Coffee Abacus</h1>

          <p class="subheading font-weight-regular">
            For help and collaboration with other Vuetify developers,
            <br />please join our online
            <a
              href="https://community.vuetifyjs.com"
              target="_blank"
            >Discord Community</a>
          </p>
        </v-col>

        <v-col class="mb-5" cols="12">
          <h2>Total Brew</h2>
          <v-layout row wrap>
            <v-flex xs8>
              <v-text-field
                :rules="rules"
                type="Number"
                name="brew"
                min="0"
                v-model="totalBrew"
                v-on:input="changeTotal"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <select name="brewUnit" v-model="unitBrew" v-on:change="getValuesAndCalculate">
                <option value="1">Milliliters</option>
                <option value="236.588">Cups</option>
                <option value="29.5735">Ounces</option>
              </select>
            </v-flex>
          </v-layout>
        </v-col>

        <v-col class="mb-5" cols="12">
          <h2>Water</h2>
          <v-layout row wrap>
            <v-flex xs8>
              <v-text-field
                :rules="rules"
                type="Number"
                name="water"
                min="0"
                v-model="totalWater"
                v-on:input="changeWater"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <select name="waterUnit" v-model="unitWater" v-on:change="getValuesAndCalculate">
                <option value="1">Milliliters</option>
                <option value="236.588">Cups</option>
                <option selected value="29.5735">Ounces</option>
              </select>
            </v-flex>
          </v-layout>
        </v-col>

        <v-col class="mb-5" cols="12">
          <h2>Grounds</h2>
          <v-layout row wrap>
            <v-flex xs8>
              <v-text-field
                :rules="rules"
                type="Number"
                name="grounds"
                min="0"
                v-model="totalGrounds"
                v-on:input="changeGrounds"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <select name="groundsUnit" v-model="unitGrounds" v-on:change="getValuesAndCalculate">
                <option value="1">Grams</option>
                <option value="28.3527076">Ounces</option>
                <option value="7.00035">Tablespoons</option>
              </select>
            </v-flex>
          </v-layout>
        </v-col>
        <v-col class="mb-5" cols="12">
          <h2>Ratio</h2>
          <select name="ratio" v-model="ratio" v-on:change="getValuesAndCalculate">
            <option value="14">14:1</option>
            <option value="15">15:1</option>
            <option value="16">16:1</option>
            <option selected value="17">17:1</option>
            <option value="18">18:1</option>
          </select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      lastSet: "",
      totalGrounds: "",
      totalBrew: "",
      totalWater: "",
      unitGrounds: "1",
      unitBrew: "29.5735",
      unitWater: "1",
      ratio: "17"
    };
  },
  methods: {
    changeGrounds: function() {
      this.lastSet = "grounds";
      this.getValuesAndCalculate();
    },
    changeWater: function() {
      this.lastSet = "water";
      this.getValuesAndCalculate();
    },
    changeTotal: function() {
      this.lastSet = "total";
      this.getValuesAndCalculate();
    },
    getValuesAndCalculate: function() {
      // eslint-disable-next-line
      console.log(this.unitBrew);
      switch (this.lastSet) {
        case "grounds":
          this.totalWater = this.calculateWaterRatio(
            this.totalGrounds,
            this.unitGrounds,
            this.unitWater,
            this.ratio
          );
          this.calculateBrewRatio(
            this.totalWater,
            this.unitWater,
            this.totalGrounds,
            this.unitGrounds,
            this.unitBrew
          );
          break;
        case "water":
          this.totalGrounds = this.calculateGroundsRatio(
            this.totalWater,
            this.unitWater,
            this.ratio,
            this.unitGrounds
          );
          this.calculateBrewRatio(
            this.totalWater,
            this.unitWater,
            this.totalGrounds,
            this.unitGrounds,
            this.unitBrew
          );
          break;
        case "total":
          this.totalGrounds = this.calculateGroundsFromBrew(
            this.totalBrew,
            this.unitBrew,
            this.unitGrounds,
            this.ratio
          );
          this.calculateWaterRatio(
            this.totalGrounds,
            this.unitGrounds,
            this.unitWater,
            this.ratio
          );
          break;
      }
    },

    calculateBrewRatio: function(w, ww, g, gw, bw) {
      var b = ((w * ww - 2 * g * gw) / bw).toFixed(3);
      this.totalBrew = b;
    },

    calculateGroundsFromBrew: function(b, bw, gw, r) {
      var g = ((b * bw) / (r - 2) / gw).toFixed(3);
      this.totalGrounds = g;
      return g;
    },

    calculateWaterRatio: function(g, gw, ww, r) {
      var w = ((g * gw * r) / ww).toFixed(3);
      this.totalWater = w;
      return w;
    },

    calculateGroundsRatio: function(w, ww, r, gw) {
      var g = ((w * ww) / (r * gw)).toFixed(3);
      this.totalGrounds = g;
      return g;
    }
  }
};
</script>
<style scoped>
.main {
  padding: 15%;
}
</style>