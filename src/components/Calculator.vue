<template>
  <div>
    <div>
      <label>Total Brew:</label>
      <input
        id="inputTotal"
        type="number"
        placeholder
        oninput="changeTotalBrew()"
        onchange="changeTotalBrew()"
      />
      <select id="brewUnit" onchange="calculate()">
        <option value="1">Milliliters</option>
        <option value="236.588">Cups</option>
        <option value="29.5735" selected>Ounces</option>
      </select>
    </div>
    <div>
      <label>Water:</label>
      <input
        id="inputWater"
        type="number"
        placeholder
        oninput="changeWater()"
        onchange="changeWater()"
      />
      <select id="waterUnit" onchange="calculate()">
        <option value="1">Milliliters</option>
        <option value="236.588">Cups</option>
        <option value="29.5735">Ounces</option>
      </select>
    </div>
    <div>
      <label>Grounds:</label>
      <input
        id="inputCoffee"
        type="number"
        placeholder
        oninput="changeGrounds()"
        onchange="changeGrounds()"
      />
      <select id="groundsUnit" onchange="calculate()">
        <option value="1">Grams</option>
        <option value="28.3527076">Ounces</option>
      </select>
    </div>
    <div>
      <label>Ratio:</label>
      <select id="inputRatio" name="inputRatio" onchange="calculate()">
        <option value="14">14:1</option>
        <option value="15">15:1</option>
        <option value="16">16:1</option>
        <option value="17" selected>17:1</option>
        <option value="18">18:1</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
};
</script>