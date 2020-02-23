<template>
  <div>
    <form class="ratioCalc" name="form" id="form">
      <div class="row">
        <div class="brew large-4 columns">
          <h2>Total Brew</h2>
          <input type="Number" name="brew" min="0" v-model="totalBrew" v-on:input="changeTotal" />
          <select name="brewUnit" v-model="unitBrew" v-on:input="getValuesAndCalculate">
            <option value="1">Milliliters</option>
            <option value="236.588">Cups</option>
            <option value="29.5735">Ounces</option>
          </select>
        </div>
        <div class="large-4 product-item columns water">
          <h2>Water</h2>
          <input type="Number" name="water" min="0" v-model="totalWater" v-on:input="changeWater" />
          <select name="waterUnit" v-model="unitWater"  v-on:input="getValuesAndCalculate">
            <option value="1">Milliliters</option>
            <option value="236.588">Cups</option>
            <option selected value="29.5735">Ounces</option>
          </select>
        </div>

        <div class="large-4 product-item columns grounds">
          <h2>Grounds</h2>
          <input type="Number" name="grounds" min="0" v-model="totalGrounds" v-on:input="changeGrounds" />
          <select name="groundsUnit" v-model="unitGrounds" v-on:input="getValuesAndCalculate">
            <option value="1">Grams</option>
            <option value="28.3527076">Ounces</option>
            <option value="7.00035">Tablespoons</option>
          </select>
          <br />
        </div>
      </div>

      <div class="ratio large-4 columns">
        <h2>Ratio</h2>
        <select name="ratio" v-model="ratio" v-on:input="getValuesAndCalculate">
          <option value="14">14:1</option>
          <option value="15">15:1</option>
          <option value="16">16:1</option>
          <option selected value="17">17:1</option>
          <option value="18">18:1</option>
        </select>
      </div>
    </form>
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
      console.log(this.lastSet);
      switch (this.lastSet) {
        case "grounds":
          this.totalWater = this.calculateWaterRatio(
            this.totalGrounds,
            this.unitGrounds,
            this.unitWater,
            this.ratio
          );
                // eslint-disable-next-line
      console.log(this.totalWater);
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