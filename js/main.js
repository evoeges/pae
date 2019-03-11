
//variables for the visualization instance
var toyalgo;
var typed;


function toggleDefinitions(inputSwitch) {

console.log(inputSwitch);

if (inputSwitch === "legalese") {
    $("#plain_text").addClass("definitions_hidden");
    $("#plain").removeClass("active");
    $("#legalese_text").removeClass("definitions_hidden");
  }
  if (inputSwitch === "plain") {
      $("#plain_text").removeClass("definitions_hidden");
      $("#legalese_text").addClass("definitions_hidden");
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

//load scrollspy
$('body').scrollspy({ target: '#navbar-side' })

//initialize tooltips
  $(document).ready(function(){
    $('.tooltipped').tooltip();
  });

//enable popover
$("[data-toggle=popover]")
.popover({html:true})

/*
initializeType();
function initializeType(){
 typed= new Typed('#typed', {
      stringsElement: '#typed-strings'
    });
} */



$(window).bind("scroll", function() {
    if ($(this).scrollTop() > 250) {
        $("#navbar-side").fadeIn();
        $("#navbar-side").removeClass("definitions_hidden");
    } else {
        $("#navbar-side").stop().fadeOut();
    }
});

$(document).ready(function(){
  $('.collapsible').collapsible();
});
