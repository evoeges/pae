
//variables for the visualization instance
var toyalgo;
var typed;


//initialize selections for the toy algo

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




function toggleDefinitions(id){

  if (id === "dollar_value") {
    $("#dollar_value_text").removeClass("definitions_hidden"),
    $("#building_age_text").addClass("definitions_hidden"),
    $("#neighborhood_text").addClass("definitions_hidden"),
    $("#sq_footage_text").addClass("definitions_hidden"),
    $("#no_occupants_text").addClass("definitions_hidden"),
    $("#business_text").addClass("definitions_hidden"),
    $("#height_text").addClass("definitions_hidden")
  }

  if (id==="age") {
      $("#building_age_text").removeClass("definitions_hidden"),
      $("#dollar_value_text").addClass("definitions_hidden"),
      $("#neighborhood_text").addClass("definitions_hidden"),
      $("#sq_footage_text").addClass("definitions_hidden"),
      $("#no_occupants_text").addClass("definitions_hidden"),
      $("#business_text").addClass("definitions_hidden"),
      $("#height_text").addClass("definitions_hidden")
    }
    if (id==="height") {
        $("#building_age_text").addClass("definitions_hidden"),
        $("#dollar_value_text").addClass("definitions_hidden"),
        $("#neighborhood_text").addClass("definitions_hidden"),
        $("#sq_footage_text").addClass("definitions_hidden"),
        $("#no_occupants_text").addClass("definitions_hidden"),
        $("#business_text").addClass("definitions_hidden"),
        $("#height_text").removeClass("definitions_hidden")
      }

      if (id==="neighborhood") {
          $("#building_age_text").addClass("definitions_hidden"),
          $("#dollar_value_text").addClass("definitions_hidden"),
          $("#neighborhood_text").removeClass("definitions_hidden"),
          $("#sq_footage_text").addClass("definitions_hidden"),
          $("#no_occupants_text").addClass("definitions_hidden"),
          $("#business_text").addClass("definitions_hidden"),
          $("#height_text").addClass("definitions_hidden")
        }
        if (id==="sq_footage") {
            $("#building_age_text").addClass("definitions_hidden"),
            $("#dollar_value_text").addClass("definitions_hidden"),
            $("#neighborhood_text").addClass("definitions_hidden"),
            $("#sq_footage_text").removeClass("definitions_hidden"),
            $("#no_occupants_text").addClass("definitions_hidden"),
            $("#business_text").addClass("definitions_hidden"),
            $("#height_text").addClass("definitions_hidden")
          }
          if (id==="no_occupants") {
              $("#building_age_text").addClass("definitions_hidden"),
              $("#dollar_value_text").addClass("definitions_hidden"),
              $("#neighborhood_text").addClass("definitions_hidden"),
              $("#sq_footage_text").addClass("definitions_hidden"),
              $("#no_occupants_text").removeClass("definitions_hidden"),
              $("#business_text").addClass("definitions_hidden"),
              $("#height_text").addClass("definitions_hidden")
            }
            if (id==="business") {
                $("#building_age_text").addClass("definitions_hidden"),
                $("#dollar_value_text").addClass("definitions_hidden"),
                $("#neighborhood_text").addClass("definitions_hidden"),
                $("#sq_footage_text").addClass("definitions_hidden"),
                $("#no_occupants_text").addClass("definitions_hidden"),
                $("#business_text").removeClass("definitions_hidden"),
                $("#height_text").addClass("definitions_hidden")
              }


    if (toyAlgoSelections.dollar_value === 0) {
        $("#dollar_value_text").addClass("definitions_hidden");
    };
    if (toyAlgoSelections.age === 0) {
        $("#building_age_text").addClass("definitions_hidden");
    };
    if (toyAlgoSelections.height === 0) {
        $("#height_text").addClass("definitions_hidden");
    };
    if (toyAlgoSelections.no_occupants === 0) {
        $("#no_occupants_text").addClass("definitions_hidden");
    };
    if (toyAlgoSelections.sq_footage === 0) {
        $("#sq_footage_text").addClass("definitions_hidden");
    };
    if (toyAlgoSelections.business === 0) {
        $("#business_text").addClass("definitions_hidden");
    };
    if (toyAlgoSelections.neighborhood === 0) {
        $("#neighborhood_text").addClass("definitions_hidden");
    };
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
  if (window.innerWidth>700) {
  toyalgo = new ToyAlgorithm("toy-algo-houses-area", data, toyAlgoSelections, window.innerWidth/2, window.innerHeight/2);
  }
  else if (window.innerWidth<=700) {
    toyalgo = new ToyAlgorithm("toy-algo-houses-area", data, toyAlgoSelections, .8*window.innerWidth, window.innerHeight/2);
    }
}


window.onresize=function() {
  if (window.innerWidth>700) {
     toyalgo.resizeSVG(window.innerWidth/2, window.innerHeight/2)
  }
  else if (window.innerWidth<=700) {
     toyalgo.resizeSVG(.8*window.innerWidth, window.innerHeight/2)
    }
}

function updateToyAlgo(id){
  if (document.getElementById(id).checked == true){
    toyAlgoSelections[id]=1;
  }

    if (document.getElementById(id).checked == false){
      toyAlgoSelections[id]=0;
    }

  toyalgo.wrangleData(toyAlgoSelections);
  toggleDefinitions();
}

 window.addEventListener("resize", reshape);

 function reshape(){

 }


//load scrollspy
$('body').scrollspy({ target: '#navbar-side' })

//initialize tooltips
  $(document).ready(function(){
    $('.tooltipped').tooltip();
  });

//enable popover
$("[data-toggle=popover]")
.popover({html:true})




$(window).bind("scroll", function() {
    if ($(this).scrollTop() > 500) {
        $("#navbar-side").fadeIn();
        $(".ads_alert").fadeIn();
        $("#navbar-side").removeClass("definitions_hidden");
        $(".ads_alert").removeClass("definitions_hidden");
    } else {
        $("#navbar-side").stop().fadeOut();
        $(".ads_alert").stop().fadeOut();
    }
});

//$(".alert_text").delay(10000).fadeOut();

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



  new Vivus('bodega_drawing', {
    duration: 200,
    file: 'img/PLDeli.svg',
    onReady: function (myVivus) {
        myVivus.el.setAttribute('width', '100%');
      },
  });

  new Vivus('mejia_drawing', {
    duration: 30,
    file: 'img/mejia_drawing.svg',
    onReady: function (myVivus) {
        myVivus.el.setAttribute('width', '100%');
      },
  });

  /*new Vivus('avocado_drawing', {
    duration: 500,
    file: 'img/avocado.svg',
    onReady: function (myVivus) {
        myVivus.el.setAttribute('width', '100%');
      },
  }); */

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

/*  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };

  mobileToy();
  function mobileToy(){
    console.log(isMobile.any());

    var chart = $("#toy-algo-houses-area"),
        aspect = chart.width() / chart.height(),
        container = chart.parent();

    if (isMobile.any()) {
        var targetWidth = container.width();
        chart.attr("width", targetWidth);
        chart.attr("height", Math.round(targetWidth / aspect));
      }

  } */

$('.modal-backdrop').click(function(){

  $('.learn_modal').modal('hide');
})



document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');

    var taskforce_alert = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });


  });

/*  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      taskforce_alert.open();
    }
  }); */
