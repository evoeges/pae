
//variables for the visualization instance
var toyalgo;
var typed;

//initialize selections for the toy algo
/*var toyAlgoSelections={
  age:0,
  style:0,
  sq_footage:0,
  neighborhood:0,
  prev_fire:0,
  height:0,
  no_occupants:0,
  business:0,
  last_inspection:0,
  no_windows:0
}; */

var toyAlgoSelections={
  age:0,
  sq_footage:0,
  neighborhood:0,
  no_occupants:0,
  business:0,
  no_windows:0,
  dollar_value:0,
  height:0
};




function toggleDefinitions(inputSwitch) {

console.log(inputSwitch);

if (inputSwitch === "legalese") {
    $("#plain_text").addClass("definitions_hidden");
    $("#plain").removeClass("definitions_hidden");
    $("#legalese_text").removeClass("definitions_hidden");
    $("#legalese").addClass("definitions_hidden");
  }
  if (inputSwitch === "plain") {
      $("#plain_text").removeClass("definitions_hidden");
      $("#legalese_text").addClass("definitions_hidden");
      $("#plain").addClass("definitions_hidden");
      $("#legalese").removeClass("definitions_hidden");
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
        data[i].Proximity_Prev_Fires = +data[i].Proximity_Prev_Fires;
        data[i].Square_Footage = +data[i].Square_Footage;
        data[i].Fire = +data[i].Fire;
    }
}

function createToyAlgoViz(data){
  toyalgo = new ToyAlgorithm("toy-algo-houses-area", data, toyAlgoSelections);
}

function updateToyAlgo(id){
  if (document.getElementById(id).checked == true){
    toyAlgoSelections[id]=1;
  }

    if (document.getElementById(id).checked == false){
      toyAlgoSelections[id]=0;
    }

  toyalgo.wrangleData(toyAlgoSelections);
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

makeDrawings();
function makeDrawings(){

  new Vivus('skyline_drawing', {
    duration: 200,
    file: 'img/newyork2.svg',
    onReady: function (myVivus) {
        myVivus.el.setAttribute('width', '75%');
      },
    type: 'sync',
    start: 'autostart'
  });

  /*new Vivus('porfirio_drawing', {
    duration: 200,
    file: 'img/porfirio.svg',
    onReady: function (myVivus) {
        myVivus.el.setAttribute('width', '100%');
      },
  }); */

  new Vivus('bodega_drawing', {
    duration: 200,
    file: 'img/PLDeli.svg',
    onReady: function (myVivus) {
        myVivus.el.setAttribute('width', '100%');
      },
  });

  new Vivus('register_drawing', {
    duration: 500,
    file: 'img/register2.svg',
    type: 'oneByOne',
    onReady: function (myVivus) {
        myVivus.el.setAttribute('width', '100%');
      },
  });

  new Vivus('avocado_drawing', {
    duration: 500,
    file: 'img/avocado.svg',
    onReady: function (myVivus) {
        myVivus.el.setAttribute('width', '100%');
      },
  });

}

$(".card-hover").hover(
  function(){
    $(this).addClass('z-depth-4')},
    function(){
    $(this).removeClass('z-depth-4')
  })

    jQuery(document).ready(function($) {
    var alterClass = function() {
      var ww = document.body.clientWidth;
      if (ww < 700) {
        $('.sticky_card_section').removeClass('sticky');
      } else if (ww >= 700) {
        $('.sticky_card_section').addClass('sticky');
      };
    };
    $(window).resize(function(){
      alterClass();
    });
    //Fire it when the page first loads:
    alterClass();
  });

var chart = $("#toy-algo-houses-area"),
    aspect = chart.width() / chart.height(),
    container = chart.parent();

$(window).on("resize", function() {
    var targetWidth = container.width();
    chart.attr("width", targetWidth);
    chart.attr("height", Math.round(targetWidth / aspect));
}).trigger("resize");

$('.modal-backdrop').click(function(){
  console.log("hello");
  $('.learn_modal').modal('hide');
})
