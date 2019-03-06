
//variables for the visualization instance
var toyalgo;


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

$(window).scroll(function(){
    $(".fadeOut").css("opacity", 1 - $(window).scrollTop() / 250);

  });


//load toy algo data
  d3.csv("data/firecast_test.csv", function(data){
    var	toyAlgoData=data;
    convertString(toyAlgoData);
    createToyAlgoViz(toyAlgoData);
  });

  function convertString(data){
    for (var i=0; i<data.length; i++) {
        data[i].ID = +data[i].ID;
        data[i].Architectural_Style=+data[i].Architectural_Style;
        data[i].Building_Age = +data[i].Building_Age;
        data[i].Business = +data[i].Business;
        data[i].Height = +data[i].Height;
        data[i].Last_Inspection = +data[i].Last_Inspection;
        data[i].Neighborhood = +data[i].Neighborhood;
        data[i].Number_Occupants = +data[i].Number_Occupants;
        data[i].Number_Windows = +data[i].Number_Windows;
        data[i].Proximity_Prev_Firess = +data[i].Proximity_Prev_Fires;
        data[i].Square_Footage = +data[i].Square_Footage;
        data[i].Fire = +data[i].Fire;
    }
}

function createToyAlgoViz(data){
  toyalgo = new ToyAlgorithm("toy-algo-houses-area", data);
}

function updateToyAlgo(id){
  toyalgo.wrangleData(id);
}

 window.addEventListener("resize", reshape);

 function reshape(){

 }

/* $(document).ready(function() {
   $('#fullpage').fullpage({
     autoScrolling: false,
     fitToSection: false
   });
 }); */

$('body').scrollspy({ target: '#navbar-side' })
