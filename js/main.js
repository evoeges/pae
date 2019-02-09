
function toggleDefinitions(inputSwitch) {
  console.log(inputSwitch)
  var x = document.getElementById("definitions");
  if (inputSwitch === "plain") {
    x.innerHTML = "an easier definition!";
  } else {
    x.innerHTML = "an easier definition!!!";
  }
}
