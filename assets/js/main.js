"use strict";


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
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({ filter: filterValue });
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
        $("html, body").animate({ scrollTop: 0 }, 1000);
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

    $(function () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    $("button").click(function () {
        $('html,body').animate({
            scrollTop: $("#submit-button").offset().top
        },
            'slow');
    });

    $('document').ready(function () {
        
        
                // RESTYLE THE DROPDOWN MENU
            $('#google_translate_element').on("click", function () {
        
                // Change font family and color
                $("iframe").contents().find(".goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div, .goog-te-menu2 *")
                    .css({
                        'color': '#544F4B',
                        'font-family': 'open_sanssemibold',
                                        'width':'100%'
                    });
                // Change menu's padding
                $("iframe").contents().find('.goog-te-menu2-item-selected').css ('display', 'none');
                    
                        // Change menu's padding
                $("iframe").contents().find('.goog-te-menu2').css ('padding', '0px');
              
                // Change the padding of the languages
                $("iframe").contents().find('.goog-te-menu2-item div').css('padding', '20px');
              
                // Change the width of the languages
                $("iframe").contents().find('.goog-te-menu2-item').css('width', '100%');
                $("iframe").contents().find('td').css('width', '100%');
              
                // Change hover effects
                $("iframe").contents().find(".goog-te-menu2-item div").hover(function () {
                    $(this).css('background-color', '#4385F5').find('span.text').css('color', 'white');
                }, function () {
                    $(this).css('background-color', 'white').find('span.text').css('color', '#544F4B');
                });
        
                // Change Google's default blue border
                $("iframe").contents().find('.goog-te-menu2').css('border', 'none');
        
                // Change the iframe's box shadow
                $(".goog-te-menu-frame").css('box-shadow', '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3)');
                
              
              
                // Change the iframe's size and position?
                $(".goog-te-menu-frame").css({
                    'height': '100%',
                    'width': '100%',
                    
    
                });
                // Change iframes's size
                $("iframe").contents().find('.goog-te-menu2').css({
                    'height': '100%',
                    'width': '100%'
                });
            });
        });
        


    

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
    		  filter: '.clearfix' // show app tab on first load
    		}     
			});								
		
		}

	};
	
	// Run the show!
	filterList.init();
    
    
});
//End



});		