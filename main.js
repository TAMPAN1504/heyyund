// Simpan posisi scroll sebelum refresh
window.addEventListener("beforeunload", () => {
    localStorage.setItem("scrollPosition", window.scrollY);
});

// Kembalikan posisi scroll setelah refresh
window.addEventListener("load", () => {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
    }
});




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

// Scrapbook Function
// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 5;
let maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-10px)";
    nextBtn.style.transform = "translateX(10px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            case 4:
                paper4.classList.add("flipped");
                paper4.style.zIndex = 3;
                break;
            case 5:
                paper5.classList.add("flipped");
                paper5.style.zIndex = 3;
                closeBook(false);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 5;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 4;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 3;
                break;
            case 5:
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 2;
                break;
            case 6:
                openBook();
                paper5.classList.remove("flipped");
                paper5.style.zIndex = 1;
                break;
            default:
                throw new Error("unkown state");
        }

        currentLocation--;
    }
}

//Birthday Date Function
function updateCountdown() {
    const targetDate = new Date("June 4, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("hari").innerText = days;
        document.getElementById("jam").innerText = hours;
        document.getElementById("menit").innerText = minutes;
        document.getElementById("detik").innerText = seconds;
    } else {
        document.querySelector(".birthday-container").innerHTML = "<h2>Waktunya tiba! 🎉</h2>";
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Fungsi untuk membuat partikel love jatuh
function createLove() {
    const love = document.createElement("div");
    love.classList.add("love");
    love.innerHTML = "❤️";

    const birthdaySection = document.querySelector(".birthday");
    const loveContainer = birthdaySection.querySelector(".love-container");

    // Posisi awal acak di dalam section
    const rect = birthdaySection.getBoundingClientRect();
    love.style.left = `${Math.random() * rect.width}px`;
    love.style.top = `-20px`;

    // Ukuran acak biar lebih natural
    let size = Math.random() * 20 + 10;
    love.style.fontSize = `${size}px`;

    // Durasi lebih lama supaya jatuhnya pelan
    let duration = Math.random() * 5 + 10; 
    love.style.animationDuration = `${duration}s`;

    loveContainer.appendChild(love);

    setTimeout(() => {
        love.remove();
    }, duration * 1000);
}

// Jalankan efek love setiap 500ms (lebih lambat biar efeknya lebih natural)
setInterval(createLove, 500);

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("birthdaySong");
    let fadeInterval = null;
    let isAudioPlaying = false; // Tambahkan variabel ini

    // Fungsi untuk fade in audio
    function fadeInAudio() {
        clearInterval(fadeInterval);
        audio.play();
        fadeInterval = setInterval(() => {
            if (audio.volume < 0.5) {
                audio.volume += 0.01;
            } else {
                clearInterval(fadeInterval);
            }
        }, 50);
    }

    // Fungsi untuk fade out audio
    function fadeOutAudio() {
        clearInterval(fadeInterval);
        fadeInterval = setInterval(() => {
            if (audio.volume > 0.01) {
                audio.volume -= 0.01;
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(fadeInterval);
            }
        }, 10);
    }

    // Intersection Observer untuk deteksi scroll
    const birthdaySection = document.querySelector(".birthday");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    fadeInAudio(); // Jika masuk ke section, mulai fade in
                } else {
                    fadeOutAudio(); // Jika keluar, mulai fade out
                }
            });
        },
        { threshold: 0.1 }
    );

    observer.observe(birthdaySection);

    // Fungsi Toggle Audio
    window.toggleAudio = function () {
        let speakerIcon = document.getElementById("speakerIcon");

        if (isAudioPlaying) {
            audio.pause();
            speakerIcon.src = "assets/image/mute.png"; // Ubah ikon ke OFF
        } else {
            audio.play();
            speakerIcon.src = "assets/image/speaker-filled-audio-tool.png"; // Ubah ikon ke ON
        }

        isAudioPlaying = !isAudioPlaying; // Toggle status
    };
});
