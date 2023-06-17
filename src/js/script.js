$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/Slide-ic/left.png" alt="" /></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/Slide-ic/right.png" alt="" /></button>',
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
        ]
    });

    $('.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleClass(item){
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list-wrapper').eq(i).toggleClass('catalog-item__list-wrapper_active');
            });
        });
    }
    toggleClass('.catalog-item__link');
    toggleClass('.catalog-item__back');

    //Modal
    $('[data-modal=cons]').on('click', function() {
        $('.overlay, #cons').fadeIn("slow");
    });

    $('.close').on('click', function() {
        $('.overlay, #cons, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function(){
            $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });  
    });

    //Закрытие модального окна нажатием на окружающее пространство
    $(window).on('click', function (e) {
        if (e.target.classList.contains('overlay')) {
            $('.overlay, #cons, #thanks, #order').fadeOut('slow');
        }
    });

    //Закрытие модального окна нажатием на Esc
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {   // esc
            $('.overlay, #cons, #thanks, #order').fadeOut('slow');
        }
    });

    //Валидация форм
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true,
                },
                phone: "required",
            },
            messages: {
                name: {
                    required: "Пожалуйста, укажите Ваше имя",
                    minlength: jQuery.validator.format("Введите не менее {0} символов!")
                },
                email: {
                    required: "Укажите Ваш email",
                    email: "Укажите правильный email",
                },
                phone: "Укажите Ваш номер телефона",
            }
        });
    }
    validateForms('#cons form');
    validateForms('#order form');
    validateForms('#consultation-form');

    //Маска ввода
    $("input[name=phone]").mask("+375(99) 999-99-99");
    
    //Отправка форм
    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()){
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#cons, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    //Появление стрелки после прокрутки на 1600px
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('#pageup').fadeIn();
        } else {
            $('#pageup').fadeOut();
        }

        //Появление анимированных элементов
        $('.client').each(function () {
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 500) {
                $(this).addClass("animate__fadeInUpBig");

            }
        });

        $('.catalog-item').each(function () {
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 650) {
                $(this).addClass("animate__fadeIn");
            }
        });
    });


    //Плавный скролл
    $("a[href = #up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top + "px"});
        return false;
    });

    // Опция passive: true сообщает браузеру, что обработчик не собирается отменять прокрутку. Тогда браузер начинает её немедленно, обеспечивая максимально плавный интерфейс, параллельно обрабатывая событие.
    document.addEventListener('touchstart', { passive: true });

});

