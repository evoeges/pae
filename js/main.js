
function toggleDefinitions(inputSwitch) {


  var x = document.getElementById("definitions");
  if (inputSwitch === "plain") {
    x.innerHTML = "An " + "<em>" + "automated decision system" + "</em>" +  " (ADS) is any decision a city government makes that is in some way helped by a computer. Often the decision is used to guide a human decision." + "<br>" + "<br>" +
    "For example, the city might use a computer program to decide where the best location for a new park is. Or a city might use a computer program to decide where a child from a certain neighborhood should go to school." + "<br>" + "<br>" +
    "These decisions can have far reaching consequences for people, sometimes good or bad.";
  } else {
    x.innerHTML = "An " + "<em>" + "automated decision system" + "</em>" +  " (ADS) refers to any set of formal or informal processes used by a city agency or governmental body to make, or assist in making, decisions; which" +
      "<ul>" + "<br>" +
        "<li>"+  "relies on one or more components that are, partially or entirely, computerized; which" + "</li>" +
        "<ul>" +
          "<li>" + "play a material role in the decision-making process; and where" + "</li>" +
          "<li>" +  "the decision being made has a matieral impact on an affected individual or population."  + "</li>" +
        "</ul>" +
      "</ul>" +
      "An ADS may either be used to replicate a human decision or process, or establish a new process entirely. <strong> An ADS must have at least one computerized component that plays a material role in making or meaningfully influencing a decision. </strong>"
        ;
  }
}
