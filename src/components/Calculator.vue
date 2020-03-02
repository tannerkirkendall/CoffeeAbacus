<template>
  <div class="main">
    <div id="back-box">
      <div id="control-box">
        <div class="input-head">
          <h2>Total Brew</h2>
        </div>
        <div class="input-box">
          <div class="input-line">
            <v-text-field
              type="Number"
              name="brew"
              min="0"
              v-model="totalBrew"
              v-on:input="changeTotal"
            ></v-text-field>
          </div>
          <div class="input-unit">
            <div class="select">
              <select
                v-model="unitBrew"
                class="select-text"
                required
                v-on:change="getValuesAndCalculate"
              >
                <option value="1">Milliliters</option>
                <option value="236.588">Cups</option>
                <option value="29.5735">Ounces</option>
              </select>
              <span class="select-highlight"></span>
              <span class="select-bar"></span>
              <label class="select-label"></label>
            </div>
          </div>
        </div>

        <div class="input-head">
          <h2>Water</h2>
        </div>
        <div class="input-box">
          <div class="input-line">
            <v-text-field
              type="Number"
              name="water"
              min="0"
              v-model="totalWater"
              v-on:input="changeWater"
            ></v-text-field>
          </div>
          <div class="input-unit">
            <div class="select">
              <select
                v-model="unitWater"
                class="select-text"
                required
                v-on:change="getValuesAndCalculate"
              >
                <option value="1">Milliliters</option>
                <option value="236.588">Cups</option>
                <option selected value="29.5735">Ounces</option>
              </select>
              <span class="select-highlight"></span>
              <span class="select-bar"></span>
              <label class="select-label"></label>
            </div>
          </div>
        </div>

        <v-container fluid>
          <h2>Grounds</h2>
          <v-row align="center">
            <v-col class="d-flex" cols="6" sm="6" xs="2">
              <v-text-field
                type="Number"
                name="grounds"
                min="0"
                v-model="totalGrounds"
                v-on:input="changeGrounds"
              ></v-text-field>
            </v-col>

            <v-col class="d-flex" cols="6" sm="6" xs="2">
              <v-select
                v-model="unitGroundsSelect"
                :items="unitListDry"
                item-text="title"
                item-value="value"
                v-on:change="getValuesAndCalculate"
                return-object
                outlined
              ></v-select>
            </v-col>
          </v-row>

          <h2>Ratio</h2>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="12">
            <v-select
              v-model="ratioSelect"
              :items="ratiosList"
              item-text="title"
              item-value="value"
              v-on:change="getValuesAndCalculate"
              return-object
              outlined
            ></v-select>
            </v-col>

          </v-row>
        </v-container>
      </div>
    </div>
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
      unitGroundsSelect: { title: "Grams", value: 1 },
      unitBrew: "29.5735",
      unitBrewSelect: { title: "Ounces", value: 29.5735 },
      unitWater: "1",
      unitWaterSelect: { title: "Milliliters", value: 1 },
      unitListVolume: [
        { title: "Milliliters", value: 1 },
        { title: "Cups", value: 236.588 },
        { title: "Ounces", value: 29.5735 }
      ],
      unitListDry: [
        { title: "Grams", value: 1 },
        { title: "Ounces", value: 28.3527076 },
        { title: "Tablespoons", value: 7.00035 }
      ],
      ratiosList: [
        { title: "14:1", value: 14 },
        { title: "15:1", value: 15 },
        { title: "16:1", value: 16 },
        { title: "17:1", value: 17 },
        { title: "18:1", value: 18 }
      ],
      ratioSelect: { title: "17:1", value: 17 }
    };
  },
  methods: {
    changeGrounds: function() {
      this.lastSet = "grounds";
      if (this.totalGrounds === "") {
        this.blankValues();
      } else {
        this.getValuesAndCalculate();
      }
    },
    changeWater: function() {
      this.lastSet = "water";
      if (this.totalWater === "") {
        this.blankValues();
      } else {
        this.getValuesAndCalculate();
      }
    },
    changeTotal: function() {
      this.lastSet = "total";
      if (this.totalBrew === "") {
        this.blankValues();
      } else {
        this.getValuesAndCalculate();
      }
    },
    blankValues: function() {
      this.totalBrew = "";
      this.totalGrounds = "";
      this.totalWater = "";
    },
    getValuesAndCalculate: function() {
      // eslint-disable-next-line
      console.log(this.unitBrew);
      switch (this.lastSet) {
        case "grounds":
          this.totalWater = this.calculateWaterRatio(
            this.totalGrounds,
            this.unitGroundsSelect.value,
            this.unitWater,
            this.ratioSelect.value
          );
          this.calculateBrewRatio(
            this.totalWater,
            this.unitWater,
            this.totalGrounds,
            this.unitGroundsSelect.value,
            this.unitBrew
          );
          break;
        case "water":
          this.totalGrounds = this.calculateGroundsRatio(
            this.totalWater,
            this.unitWater,
            this.ratioSelect.value,
            this.unitGroundsSelect.value
          );
          this.calculateBrewRatio(
            this.totalWater,
            this.unitWater,
            this.totalGrounds,
            this.unitGroundsSelect.value,
            this.unitBrew
          );
          break;
        case "total":
          this.totalGrounds = this.calculateGroundsFromBrew(
            this.totalBrew,
            this.unitBrew,
            this.unitGroundsSelect.value,
            this.ratioSelect.value
          );
          this.calculateWaterRatio(
            this.totalGrounds,
            this.unitGroundsSelect.value,
            this.unitWater,
            this.ratioSelect.value
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
  .v-select {
    font-size: .9em;
  }
.main {
  padding: 20px;
}
#back-box {
  width: 100%;
  max-width: 500px;
  min-width: 200px;
  background-color: whitesmoke;
  border-radius: 15px;
  padding: 15px;
  margin: auto;
}
#control-box {
  width: 95%; /*can be in percentage also.*/
  /* background-color: aqua; */
  height: auto;
  margin: 0 auto;
  position: relative;
}
.input-box {
  /* background-color: blue; */
  display: flex;
}
.input-head {
  width: 100%;
}
.input-line {
  width: 75%;
  /* background-color: brown; */
}
</style>