var lastChanged = "";

var test = {
    changedWater(){
        lastChanged = "water";
    },

    changedGrounds(){
        lastChanged = "grounds";
    },

    changedTotal(){
        lastChanged = "total";
    },

    calculate(){
        this.getValues();
    },

    getValues(){
        var inputRatio = document.getElementById("inputRatio").value;
        var inputCoffee = document.getElementById("inputCoffee").value;
        var inputWater = document.getElementById("inputWater").value;
        var inputTotal = document.getElementById("inputTotal").value;
        var r ={
            ratio:inputRatio,
            coffee:inputCoffee,
            water:inputWater,
            total:inputTotal
        }
        console.log(r);
        return r;
    }
}
  
export default test
