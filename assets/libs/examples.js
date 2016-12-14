  /* Responsive slider */
  /* Need slick-slide http://kenwheeler.github.io/slick/*/
  $(window).on('orientationchange', function() {
    $(your-slider).slick('resize');
  });

  $(your-slider).slick({
    dots: false,
    arrow: true,
    slidesToShow: 3,
    responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  });

/* Standart slider */

$(your-selector).slick({
  dots: true,
  infinite: true,
  slidesToShow: 1
});

    /* Smooth scroll on link */
  $("body").on("click",".custome-link", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 600);
  });

/* Need viewport-checker https://github.com/dirkgroenen/jQuery-viewport-checker */

    $(yourclass).viewportChecker({
    classToAdd: yourClass,
    offset: 200,
        callbackFunction: function(){
    });
   }
  });

/* Flip clock timer */
/* Timer selector http://flipclockjs.com/ */

var timerDays = 3;

var timerMill = Date.now() + (1000 * 60 * 60 * 24) * timerDays;
var timerNow = Date.now();

var currentDate = Date.now();
var futureDate = localStorage.getItem('dateTimer');

var diff = (futureDate - currentDate) / 1000;

if (timerNow > localStorage.getItem('dateTimer')) {
  localStorage.setItem('dateTimer', timerMill);
}

var clock = $('.timer').FlipClock(diff, {
  language : "ru-ru",
  autoStart: false,
  autoStart: true,
  clockFace: 'DailyCounter',
  countdown: true
});
