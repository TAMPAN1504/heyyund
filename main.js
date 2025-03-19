//Function Gallery Image
$(document).ready(function(){
    $('.your-class').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 2000,
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

// Paper Message Function

document.querySelector(".readmeItem").addEventListener("click", () =>{
    document.querySelector("#paperSfx").load();
    document.querySelector("#paperSfx").play();
    document.querySelector(".readmeMsg").style.display = "flex";
});

// fungsi ketika paper diklik di luar area gambar;
document.querySelector(".readmeMsg").addEventListener("click", () =>{
    if (event.target !== document.querySelector(".paper-bg")) {
        document.querySelector("#paperSfx").load();
        document.querySelector("#paperSfx").play();
        document.querySelector(".readmeMsg").style.display = "none";
    }
    });