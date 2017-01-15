/* Entering your JS code here */

$(document).ready(function(){

  /* Smooth scroll on link */
  $("body").on("click",".custome-link", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 600);
  });

});

/* Form validation and oad politics */

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
        $(this).addClass('error').parent().append('<i title="Заполните это поле" class="fa fa-exclamation-triangle allert" aria-hidden="true"></i>');
        error = 1;
        $(":input.error:first").focus();
        return;
      } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if ($(this).attr("type") == 'email') {
          if(!pattern.test($(this).val())) {
            $("[name=email]").val('');
            $(this).addClass('error').parent().append('<i class="fa fa-exclamation-triangle allert" title="Укажите коректный e-mail" aria-hidden="true"></i>');
            error = 1;
            $(":input.error:first").focus();
          }
        }
        var patterntel = /^([0-9_+\.-]{10,18})/i;
        if ( $(this).attr("type") == 'tel') {
          if(!patterntel.test($(this).val())) {
            $("[name=phone]").val('');
            $(this).addClass('error').parent().append('<i class="fa fa-exclamation-triangle allert" title="Укажите коректный номер телефона" aria-hidden="true"></i>');
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
        $('#sending').append('<p class="sending">Отправка данных...</p>');
        $('#sending').slideDown('400');
        if ($(this).val() == '') {
          $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: msg,
            success: function() {
              setTimeout(function(){ $('form').trigger("reset");
                $("[name=send]").removeAttr("disabled"); }, 1000);
                             //Succes calback
                             setTimeout(function() {
                              $('#sending-message').slideUp('400');
                              $('#sending p').remove();
                            }, 3000);
                             $('.modal').modal('hide');
                             $('#thank').modal('show');
                             setTimeout(function() {
                              $('#thank').modal('hide');
                            }, 4000);
                           },
                           //Error callback
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
                                    //Succes calback
                                    setTimeout(function() {
                                      $('#sending-message').slideUp('400');
                                      $('#sending p').remove();
                                    }, 3000);
                                    $('.modal').modal('hide');
                                    $('#thank').modal('show');
                                    setTimeout(function() {
                                      $('#thank').modal('hide');
                                    }, 4000);
                                  }}
                                }),
            //Error callback
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

/* Politics modal */

var privacy, refusing, compliance, destination;
$('[data-href="disclaimer"]').one('click', function() {

  var nameDisclaimer = $(this).attr('id');

  $.get('disclaimer.html', function (data) {
    privacy = $(data).closest('#privacy').html();
    refusing = $(data).closest('#refusing').html();
    compliance = $(data).closest('#compliance').html();
    disclaimerDest(nameDisclaimer);
  });

});

$('[data-href="disclaimer"]').click(function() {
  var nameDisclaimer = $(this).attr('id');
  disclaimerDest(nameDisclaimer);
});

destination = $('#disclaimer .content');
function disclaimerDest(nameDisclaimer) {

  switch (nameDisclaimer) {
    case 'privacy':
    destination.html(privacy);
    break;
    case 'refusing':
    destination.html(refusing);
    break;
    case 'compliance':
    destination.html(compliance);
    break;
  };

};
