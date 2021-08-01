/*!
 * Item: Kitzu
 * Description: Personal Portfolio Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v2.0.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- Table of Contents -----------*/

/**
 * Globals
 * Navbar
 * Home
 * Services
 * Testimonials
 * Contact
 * Preloader
 * Portfolio
 */

(function($) {
  'use strict';
  $(function() {
    /*----------- Globals -----------*/

    /* Lity setup */
    $(document).on('click', '[data-lightbox]', lity.options('template', '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><div class="lity-close" data-lity-close aria-label="Close (Press escape to close)"><span class="btn-line"></span></div></div></div></div>'));

    /* Function to check if element exists */
    function ifExists(el, f) {
      if ($(el).length) {
        f();
      }
    }

    /* Custom function to remove margin bottom from items in the last row depending on the screen size / how many columns the grid has. This function was made to fix spacing issues in columns instead of having to manually fix them on different screen sizes which is not very user-friendly */
    function responsiveColumns(array) {
      function main(selector, value, classList) {
        var lastRow = $(selector[0]).find(selector[1]).slice(-value);
        if (selector[2] === null) {
          lastRow.addClass(classList);
        } else {
          lastRow.find(selector[2]).addClass(classList);
        }
      }
      $.each(array, function(index, object) {
        var selector = [object[0][0], object[0][1], object[0][2]];
        if (!$(selector[0]).length) {
          return true;
        }
        var options = object[1];
        var classList = object[2];
        $.each(options, function(index, value) {
          var columns = value.columns;
          if (window.matchMedia(value.matchMedia).matches) {
            var remainder = $(selector[0]).find(selector[1]).length % columns;
            if (remainder === 0) {
              main(selector, columns, classList);
            } else {
              main(selector, remainder, classList);
            }
          }
        });
      })
    }

    responsiveColumns([
      [
        ['#about', '.services-section .single-service', null],
        [{
            matchMedia: '(max-width: 767.98px)',
            columns: 1,
          },
          {
            matchMedia: '(max-width: 991.98px)',
            columns: 2,
          }, {
            matchMedia: '(min-width: 991.98px)',
            columns: 3,
          }
        ],
        'rc-mb-0'
      ],
      [
        ['#about', '.pricing-section .single-plan', null],
        [{
          matchMedia: '(max-width: 991.98px)',
          columns: 1,
        }, {
          matchMedia: '(min-width: 991.98px)',
          columns: 3,
        }],
        'rc-mb-0'
      ],
      [
        ['#portfolio', '.portfolio-section .single-item .portfolio-item', '.portfolio-wrapper'],
        [{
          matchMedia: '(max-width: 991.98px)',
          columns: 2,
        }, {
          matchMedia: '(min-width: 991.98px)',
          columns: 3,
        }],
        'rc-mb-0'
      ],
      [
        ['#blog', '.blog-section .single-post', null],
        [{
          matchMedia: '(max-width: 991.98px)',
          columns: 1,
        }, {
          matchMedia: '(min-width: 991.98px)',
          columns: 3,
        }],
        'rc-mb-0'
      ]
    ]);

    /* Fix a browser bug related to 100vh.
    More info: https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser */
    function appHeight() {
      const doc = document.documentElement
      doc.style.setProperty('--vh', (window.innerHeight * .01) + 'px');
    }

    window.addEventListener('resize', appHeight);
    appHeight();

    /*----------- Navbar -----------*/

    /* Lightboxes setup */
    $('.navbar .navbar-nav .nav-link[href^="#"]').each(function() {
      $(this).animatedModal({
        animatedIn: 'fadeIn',
        animatedOut: 'fadeOut',
        animationDuration: '0s',
        beforeOpen: function() {
          $('#overlay-effect').addClass('animate-up').removeClass('animate-down');
          $('#' + this.modalTarget).css({
            'animationDelay': '.5s',
            'animationFillMode': 'both'
          });
        },
        afterOpen: function() {
          $('#' + this.modalTarget).css({
            'animationFillMode': 'none'
          });
        },
        beforeClose: function() {
          $('#overlay-effect').addClass('animate-down').removeClass('animate-up');
          $('#' + this.modalTarget).css({
            'animationDelay': '.5s',
            'animationFillMode': 'both'
          });
        },
        afterClose: function() {
          $('#' + this.modalTarget).css({
            'animationFillMode': 'none'
          });
        }
      });
    });

    $('.lightbox-wrapper').each(function() {
      if (!$('.navbar .navbar-nav .nav-link[href^="#' + this.id + '"]').length) {
        $(this).hide();
      }
    });

    /* Hides the the mobile navbar dropdown when the user clicks outside of it */
    $(document).on('mouseup', function(event) {
      if ($('.navbar #navbarSupportedContent').hasClass('show')) {
        // The mobile Bootstrap navbar dropdown
        var navbarToggler = $('.navbar .navbar-menu');
        if (!navbarToggler.is(event.target) && navbarToggler.has(event.target).length === 0) {
          navbarToggler.trigger('click');
        }
      }
    });

    /*----------- Home -----------*/

    /* Animated heading text */
    (function() {
      // Set animation timing
      var animationDelay = 2500,
        // Clip effect
        revealDuration = 660,
        revealAnimationDelay = 1500;

      initHeadline();

      function initHeadline() {
        // Initialise headline animation
        animateHeadline($('.cd-headline'));
      }

      function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function() {
          var headline = $(this);
          if (headline.hasClass('clip')) {
            var spanWrapper = headline.find('.cd-words-wrapper'),
              newWidth = spanWrapper.width() + 10;
            spanWrapper.css('width', newWidth);
          }

          //trigger animation
          setTimeout(function() {
            hideWord(headline.find('.is-visible').eq(0));
          }, duration);
        });
      }

      function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.cd-headline').hasClass('clip')) {
          $word.parents('.cd-words-wrapper').animate({
            width: '2px'
          }, revealDuration, function() {
            switchWord($word, nextWord);
            showWord(nextWord);
          });

        }
      }

      function showWord($word, $duration) {
        if ($word.parents('.cd-headline').hasClass('clip')) {
          $word.parents('.cd-words-wrapper').animate({
            'width': $word.width() + 10
          }, revealDuration, function() {
            setTimeout(function() {
              hideWord($word);
            }, revealAnimationDelay);
          });
        }
      }


      function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
      }

      function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
      }

      function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
      }
    }())

    /* Home variants manager */

    // If Video variant
    if ($('.home-area').hasClass('video-variant')) {
      $('#homeVideo').YTPlayer();
    }

    /*----------  About: Testimonials  ----------*/

    ifExists('#about .testimonials-section', function() {
      var testimonials = tns({
        container: '#about .testimonials-section .my-slider',
        items: 2,
        gutter: 30,
        "responsive": {
          "0": {
            "items": 1,
            "gutter": 0
          },
          "768": {
            "items": 2,
            "gutter": 30
          }
        },
        preventScrollOnTouch: 'auto',
        slideBy: "page",
        mouseDrag: true,
        swipeAngle: false,
        speed: 400,
        controls: false,
        autoHeight: true,
        navPosition: 'bottom'
      });
    });

    /*----------  Resume: Skills  ----------*/

    ifExists('#resume .skills-section', function() {
      var initPercentageElement = function() {
        $('#resume .skills-section .single-skill').each(function() {
          var percentage = Math.min(100, Math.max(0, $(this).data('percentage')));
          var barWidth = $(this).find('.skill-progress').outerWidth(true);
          var percentageElementOffset = barWidth - (barWidth * (percentage / 100));
          $(this).find('.skill-percentage').text(percentage + '%').css('margin-right', percentageElementOffset);
          $(this).find('.progress-bar').attr('aria-valuenow', percentage).css('width', percentage + '%');
        });
      }
      initPercentageElement();
      $(window).on('resize', function() {
        initPercentageElement();
      });
    });

    /*----------  Portfolio: Portfolio  ----------*/

    ifExists('#portfolio .portfolio-section', function() {
      /* Setup Isotope */
      var grid = $('#portfolio .portfolio-section .portfolio-grid');
      var filters = $('#portfolio .portfolio-section .filter-control li');
      grid.imagesLoaded(function() {
        grid.isotope({
          itemSelector: '#portfolio .portfolio-section .single-item',
          masonry: {
            horizontalOrder: true
          }
        });
        filters.on('click', function() {
          filters.removeClass('tab-active');
          $(this).addClass('tab-active');
          var selector = $(this).data('filter');
          grid.isotope({
            filter: selector,
            transitionDuration: '.25s'
          });
        });
      });
    });

    /*----------- Contact: Contact -----------*/

    ifExists('#contact .contact-section', function() {
      $('#contact .contact-section .contact-form').on('submit', function(event) {
        var form = $(this);
        var submitBtn = form.find('#contact-submit');
        var submitBtnText = submitBtn.text();
        var feedbackEl = form.find('.contact-feedback');
        event.preventDefault();
        // Waiting for the response from the server
        submitBtn.html('Wait...').addClass('wait').prop('disabled', true);
        setTimeout(function() {
          // Posts the Form's data to the server using Ajax
          $.ajax({
              url: form.attr('action'),
              type: 'POST',
              data: form.serialize(),
            })
            // Getting a response from the server
            .done(function(response) {
              // If the PHP file succeed sending the message
              if (response == 'success') {
                // Feedback to the user
                submitBtn.removeClass('wait').html('Success').addClass('success');
                feedbackEl.addClass('success').html('Thank you for your message. It has been sent.').fadeIn(200);
                setTimeout(function() {
                  submitBtn.html(submitBtnText).removeClass('success').prop('disabled', false);
                  feedbackEl.fadeOut(200).removeClass('success').html('');
                }, 6000);
                // Clears the Form
                form[0].reset();
                // If something is wrong
              } else {
                // Feedback to the user
                console.log(response);
                submitBtn.removeClass('wait').html('Error').addClass('error');
                feedbackEl.addClass('error').html('Server error! Please check your browser console log for more details.').fadeIn(200);
                setTimeout(function() {
                  submitBtn.html(submitBtnText).removeClass('error').prop('disabled', false);
                  feedbackEl.fadeOut(200).removeClass('error').html('');
                }, 6000);
              }
            });
        }, 1000);
      });
    });

  });
  $(window).on('load', function() {
    /*----------- Preloader -----------*/

    $('.preloader-icon').fadeOut(400);
    $('.preloader').delay(500).fadeOut('slow');

  });
}(jQuery));