(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 56
    });

    // Collapse Navbar
    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Mail
    $('#contact_loader').hide();
    var $mail_container = $('#sendMessageButton');
    $mail_container.on('click', function(e) {
        e.preventDefault();
        let $name = $('#contact_name').val();
        let $email = $('#contact_email').val();
        let $phone = $('#contact_phone').val();
        let $message = $('#contact_message').val();
        let $url = '/sendMail?name=' + $name + '&email=' + $email + '&phone=' + $phone + '&message=' + $message;
        $.ajax({
            url: $url,
            type: 'POST',
            dataType: "json",
            beforeSend: function () {
                $('#contact_loader').show();
            },
            success: function(result, status, xhr) {
                $('#contact_loader').hide();
                if(result['success'] == 1) {
                    $('#contact_info').text("Your message was send successfully");
                    $('#contact_info').css('color', 'green');
                } else {
                    $('#contact_info').text("Your message was not send successfully, please try sending me mail at bisson.th@gmail.com");
                    $('#contact_info').css('color', 'red');
                }
            },
            error: function (xhr, status, error) {
                $('#contact_loader').hide();
                $('#contact_info').text("Your message was not send successfully, please try sending me mail at bisson.th@gmail.com");
                $('#contact_info').css('color', 'red');
            }
        });
    });

})(jQuery); // End of use strict

