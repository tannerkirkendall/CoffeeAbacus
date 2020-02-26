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
            <select name="brewUnit" v-model="unitBrew" v-on:change="getValuesAndCalculate">
              <option value="1">Milliliters</option>
              <option value="236.588">Cups</option>
              <option value="29.5735">Ounces</option>
            </select>
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
            <select name="waterUnit" v-model="unitWater" v-on:change="getValuesAndCalculate">
              <option value="1">Milliliters</option>
              <option value="236.588">Cups</option>
              <option selected value="29.5735">Ounces</option>
            </select>
          </div>
        </div>

        <div class="input-head">
          <h2>Grounds</h2>
        </div>
        <div class="input-box">
          <div class="input-line">
            <v-text-field
              type="Number"
              name="grounds"
              min="0"
              v-model="totalGrounds"
              v-on:input="changeGrounds"
            ></v-text-field>
          </div>
          <div class="input-unit">
            <select name="groundsUnit" v-model="unitGrounds" v-on:change="getValuesAndCalculate">
              <option value="1">Grams</option>
              <option value="28.3527076">Ounces</option>
              <option value="7.00035">Tablespoons</option>
            </select>
          </div>
        </div>


          <h2>Ratio</h2>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">{{ratioTitle}}</v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in ratiosList" :key="index" @click="set">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

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
      unitGrounds: "1",
      unitBrew: "29.5735",
      unitWater: "1",
      ratio: "17",
      ratioTitle: "17:1",
      ratiosList: [
        { title: "14:1", value: 14 },
        { title: "15:1", value: 15 },
        { title: "16:1", value: 16 },
        { title: "17:1", value: 17 },
        { title: "18:1", value: 18 }
      ]
    };
  },
  methods: {
    set: function(a) {
      // eslint-disable-next-line
      console.log(this, a.target.innerText);
      var title = a.target.innerText;
      var value = this.ratiosList.find(x => x.title == title).value;
      this.ratio = value;
      this.ratioTitle = title;
      this.getValuesAndCalculate();
    },
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
#back-box {
  width: 30%;
  background-color:whitesmoke;
  border-radius: 15px;
}
#control-box {
  width: 90%; /*can be in percentage also.*/
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
  width: 80%;
  /* background-color: brown; */
}
.input-unit {
}
</style>