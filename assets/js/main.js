//Форма отправки 2.0 //

$('.send-message').click(function() {
  var question = $('textarea').val();
  $('.question').attr('value', question);
});

$(function() {
  $("[name=send]").click(function () {
    $(":input.error").removeClass('error');
    $(".allert").remove();

    var error;
    var btn = $(this);
    var ref = btn.closest('form').find('[required]');
    var msg = btn.closest('form').find('input');
    var send_btn = btn.closest('form').find('[name=send]');
    var send_options = btn.closest('form').find('[name=campaign_token]');

    $(ref).each(function() {
      if ($(this).val() == '') {
        var errorfield = $(this);
        $(this).addClass('error').parent('label').parent('.field').append('<div class="allert"><span>Заполните это поле</span></div>');
        error = 1;
        $(":input.error:first").focus();
        return;
      } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if ($(this).attr("type") == 'email') {
          if(!pattern.test($(this).val())) {
            $("[name=email]").val('');
            $(this).addClass('error').parent('label').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span></div>');
            error = 1;
            $(":input.error:first").focus();
          }
        }
        var patterntel = /^([0-9_+\.-]{10,18})/i;
        if ( $(this).attr("type") == 'tel') {
          if(!patterntel.test($(this).val())) {
            $("[name=phone]").val('');
            $(this).addClass('error').parent('label').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span></div>');
            error = 1;
            $(":input.error:first").focus();
          }
        }
      }
    });
    if(!(error==1)) {
      $(send_btn).each(function() {
        $(this).attr('disabled', true);
      });
      $(send_options).each(function() {
        $(btn).after('<p class="sending">Отправление заявки...</p>')
        if ($(this).val() == '') {
          $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: msg,
            success: function() {
              setTimeout(function(){ $('form').trigger("reset");
                $("[name=send]").removeAttr("disabled"); }, 1000);
                             //Настройки модального окна после удачной отправки
                             $('.modal').hide();
                             $('.modal-backdrop').hide();
                             $('body').removeClass('modal-open').css('padding', 'inherit');
                             setTimeout(function() {
                              var url =  document.location.href + 'thank.html';
                              document.location.href = url;
                            }, 800)
                           },
                           error: function(xhr, str) {
                            alert('Возникла ошибка: ' + xhr.responseCode);
                          }
                        });
        } else {
          $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: msg,
            success:
            $.ajax({
              type: 'POST',
              url: 'https://app.getresponse.com/add_subscriber.html',
              data: msg,
              statusCode: {0:function() {
                setTimeout(function(){ $('form').trigger("reset");
                  $("[name=send]").removeAttr("disabled"); }, 1000);
                                    // Настройки модального окна после удачной отправки
                                    $('.modal').hide();
                                    $('.modal-backdrop').hide();
                                    $('body').removeClass('modal-open').css('padding', 'inherit');
                                    setTimeout(function() {
                                      var url =  document.location.href + 'thank.html';
                                      document.location.href = url;
                                    }, 800)
                                  }}
                                }),
            error:  function(xhr, str) {
              alert('Возникла ошибка: ' + xhr.responseCode);
            }
          });
        }
      });
    }
    return false;
  })
});

/* Smooth scroll on link */

$(document).ready(function(){
	$("body").on("click",".custome-link", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
   top = $(id).offset().top;
   $('body,html').animate({scrollTop: top}, 600);
 });
});

/* Entering your JS code here */

$(document).ready(function(){

  new WOW().init();

  $(document).one("mouseleave", function (e) {
   if (e.pageY - $(window).scrollTop() <= 1) {
    $('#leaving').modal('show');
  }
});

  $('.btn-shop').click(function() {
    var title = $(this).parent().find('h4').text();
    $('#shop .modal-title').text(title);
    $('#shop .subject-form').attr('value', title);
  });

  $( ".form-control" ).focus(function() {
    $(this).parent().addClass('focus');
    $(this).parent().find('i').show();
  });

  $( ".form-control" ).focusout(function() {
    $(this).parent().removeClass('focus');
    $(this).parent().find('i').hide();
  });

  $('#feedback-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true
  });

  $('#feedback-slider-mobile').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true
  });

  $('.how-item').hover(function() {
    setTimeout(function(){
      $('.how-we-work .container_12').addClass('step1');
    }, 3000);
    setTimeout(function(){
      $('.how-we-work .container_12').addClass('step2');
    }, 6000);
    setTimeout(function(){
      $('.how-we-work .container_12').addClass('step3');
    }, 8000);
    setTimeout(function(){
      $('.how-we-work .container_12').addClass('step4');
    }, 9500);
    setTimeout(function(){
      $('.how-we-work .container_12').addClass('fina-step');
    }, 12000);
  });

});
