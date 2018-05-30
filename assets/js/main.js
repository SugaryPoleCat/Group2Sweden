"use strict";




function myFunction() { // Hides the content under the button
    var x = document.getElementById("myDiv"); 
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    document.getElementById("bottom").scrollIntoView(); // Jump down a page when the button is clicked
}

$(document).ready(function() {

	// $('.image-popup-vertical-fit').magnificPopup({
	// 	type: 'image',
	// 	closeOnContentClick: true,
	// 	mainClass: 'mfp-img-mobile',
	// 	image: {
	// 		verticalFit: true
	// 	}
		
	// });

	// $('.image-popup-fit-width').magnificPopup({
	// 	type: 'image',
	// 	closeOnContentClick: true,
	// 	image: {
	// 		verticalFit: false
	// 	}
	// });

	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

});



jQuery(document).ready(function ($) {
	
	
	/*---------------------------------------------*
     * Preloader
     ---------------------------------------------*/
	 
	$(window).load(function () {
		$(".loaded").fadeOut();
		$(".preloader").delay(1000).fadeOut("slow");
	});
	
	
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });

    /*---------------------------------------------*
     * Isotop for portfolio
     ---------------------------------------------*/

    $(function () {
        // init Isotope
        var $grid = $('.portfolio-one').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function () {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) > 50;
            },
            // show if name ends with -ium
            ium: function () {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };
        // bind filter button click
        $('.filters-button-group').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[ filterValue ] || filterValue;
            $grid.isotope({filter: filterValue});
        });
        // change is-checked class on buttons
        $('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });

    });

    /*---------------------------------------------*
     * Scroll Up
     ---------------------------------------------*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });

    /*---------------------------------------------*
     * Menu Background Change
     ---------------------------------------------*/

    var windowWidth = $(window).width();
    if (windowWidth > 757) {



        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('.navbar').fadeIn(300);
                $('.navbar').addClass('menu-bg');

            } else {

                $('.navbar').removeClass('menu-bg');
            }
        });

    }
    $('#bs-example-navbar-collapse-1').localScroll();




    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

    $.localScroll();
    
    /*---------------------------------------------*
     * Gallery Pop Up Animation
     ---------------------------------------------*/

    $('.portfolio-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });



    /*---------------------------------------------*
     * Counter 
     ---------------------------------------------*/

//    $('.statistic-counter').counterUp({
//        delay: 10,
//        time: 2000
//    });




    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

//        var wow = new WOW({
//            mobile: false // trigger animations on mobile devices (default is true)
//        });
//        wow.init();


    /* ---------------------------------------------------------------------
     Carousel
     ---------------------------------------------------------------------= */

    $('.brand-category').owlCarousel({
        responsiveClass: true,
        autoplay: false,
        items: 1,
        loop: true,
        dots: true,
        autoplayHoverPause: true,
        responsive: {
            // breakpoint from 0 up
            // breakpoint from 480 up
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            // breakpoint from 768 up
            768: {
                items: 1
            },
            980: {
                items: 1
            }
        }

    });
//fixade scrollen till hemsidan

    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html, body').animate({
                scrollTop: target.offset().top
              }, 1000);
              return false;
            }
          }
        });
      });


    //End
});

/*
//sthlm modal
var modal = document.getElementById('sthlmModal');
var btn = document.getElementById("BtnSthlm");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//falun modal
var modal1 = document.getElementById('falunModal');
var btn1 = document.getElementById("BtnFalun");
var span1 = document.getElementsByClassName("close1")[0];

btn1.onclick = function() {
    modal1.style.display = "block";
}
span1.onclick = function() {
    modal1.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
};


//Åre modal
var modal2 = document.getElementById('areModal');
var btn2 = document.getElementById("BtnAre");
var span2 = document.getElementsByClassName("close2")[0];

btn2.onclick = function() {
    modal2.style.display = "block";
}
span2.onclick = function() {
    modal2.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
};

//pausar carousellen när modalen e uppe
$('.modal').on('shown.bs.modal', function (e) {
    $('.carousel').carousel('pause');
})
$('.modal2').on('shown.bs.modal2', function (e) {
    $('.carousel').carousel('pause');
})
$('.modal1').on('shown.bs.modal1', function (e) {
    $('.carousel').carousel('pause');
})*/

$(function () {
		
	var filterList = {
	
		init: function () {
		
			// MixItUp plugin
			// http://mixitup.io
			$('#portfoliolist').mixItUp({
				selectors: {
  			  target: '.portfolio',
  			  filter: '.filter'	
  		  },
  		  load: {
    		  filter: '.app' // show app tab on first load
    		}     
			});								
		
		}

	};
	
	// Run the show!
	filterList.init();
	
});		