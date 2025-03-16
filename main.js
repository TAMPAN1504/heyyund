
$(document).ready(function(){
    $('.your-class').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768, // Tablet
                settings: {
                    slidesToShow: 3,
                    centerPadding: '40px'
                }
            },
            {
                breakpoint: 480, // Mobile
                settings: {
                    slidesToShow: 3,
                    centerPadding: '5px'
                }
            }
        ]
    });
    $('.prev').click(function(){
        $('.your-class').slick('slickPrev');
    });

    $('.next').click(function(){
        $('.your-class').slick('slickNext');
    });
});
