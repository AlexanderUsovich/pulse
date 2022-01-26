$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/Slide/Icons/left.png" alt="" /></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/Slide/Icons/right.png" alt="" /></button>',
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
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
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
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
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

});