(function($) {

  Drupal.behaviors.fullpageJs = {
    attach: function (context, settings) {
      var fullpageSettings = {
        main: {
          sectionSelector: '.panel-pane',
          navigation: false,
          scrollBar: true,
          sectionsColor : ['#d83454', '#f1f2f2', '#f1f2f2', '#f1f2f2', '#ffffff', '#f1f2f2', '#f1f2f2', '#f1f2f2'],
          verticalCentered: true,
          slidesNavigation: true,
          normalScrollElements: '.gmap, .panel-pane',
          onLeave: function(index, nextIndex, direction) {
            var leavingSection = $(this);
            $('.next-section a').removeClass();
            $('.next-section a').addClass('active-section-' + nextIndex);
          },
          afterLoad: function(anchorLink, index) {
            var loadedSection = $(this);
            if(loadedSection.hasClass('contact')) {
              $('.next-section a').removeClass();
              $('.next-section a').addClass('last-section-is-active');
            }
          }
        }
      };
      $('.fp-wrapper > .inside', context).fullpage(fullpageSettings.main);
      // Custom Arrows Navigation
      this.arrowsInit('.panel-pane', '.next-section a', context);
    },
    createArrows: function (el, context) {
      var sectionsCount = $(el, context).length;
      $('.main-container', context).after('<div class="next-section"><a href="#">NEXT</a></div>');
    },
    arrowsInit: function(el, arrow, context) {
      this.createArrows(el, context);
      $(arrow, context).click(function(e) {
        e.preventDefault();
        var currentId = $('.panel-pane.active', context).index();
        currentId += 2;
        $.fn.fullpage.moveTo(currentId);
        return false;
      });
    }
  };

  Drupal.behaviors.slider = {
    attach: function (context, settings) {
      var sliderSettings = {
        clients: {
          arrows: true,
          infinite: true,
          slidesToShow: 3,
          dots: false,
          responsive: [{
            breakpoint: 769,
            settings: {
              arrows: true,
              dots: false,
              vertical: true,
              slidesToShow: 1,
              verticalSwiping: true
            }
          },
          {
            breakpoint: 639,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              vertical: false
            }
          }]
        },
      };
      $('.pane-views-clients-block .view-content').slick(sliderSettings.clients);
    }
  };

})(jQuery);
