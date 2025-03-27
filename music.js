//Function Musik
const dataLagu = [
    { title: "Soulmate", artis:"Kahitna", src: "assets/audio/SpotifyMate.com - Soulmate - Kahitna.mp3" },
    { title: "Always", artis:"Daniel Caesar", src: "assets/audio/SpotifyMate.com - Always - Daniel Caesar.mp3" },
    { title: "Oh Love", artis:"Delaney Bailey", src: "assets/audio/SpotifyMate.com - Oh Love - Delaney Bailey.mp3" },
    { title: "One Only", artis:"Pamungkas", src: "assets/audio/SpotifyMate.com - One Only - Pamungkas.mp3" },
    { title: "Bunga Abadi", artis:"Rio Clappy", src: "assets/audio/SpotifyMate.com - Bunga Abadi - Rio Clappy.mp3" },
    { title: "I Love You", artis:"Celine Dion", src: "assets/audio/SpotifyMate.com - I Love You - Céline Dion.mp3" },
    { title: "Jatuh Hati", artis:"Raisa", src: "assets/audio/SpotifyMate.com - Jatuh Hati - Raisa.mp3" },
    { title: "My Everything", artis:"Ariana Grande", src: "assets/audio/SpotifyMate.com - My Everything - Ariana Grande.mp3" },
];

const laguPlayer = document.getElementById("laguPlayer");
const laguSource = document.getElementById("laguSource");
const ctrlIcon = document.getElementById("ctrlIcon");
const progress = document.getElementById("progress")

// Fungsi untuk memuat dan memainkan lagu berdasarkan indeks
function loadSong(index) {
    laguSource.src = dataLagu[index].src;
    laguPlayer.load();
    laguPlayer.play();
}

// Event listener untuk gambar di galeri
const GalleryImages = document.querySelectorAll(".music-box .photo img");
GalleryImages.forEach((image) => {
    image.addEventListener("click", () => {
        const index = image.getAttribute("data-index");
        loadSong(index); // Memuat dan memainkan lagu
        openLightbox(image)
    });
});

function openLightbox(image) {
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.getElementById("lightboxImg"); // Perbaiki pemilihan elemen
    const Judul = document.getElementById("judulLagu");
    const Artis = document.getElementById("artisLagu");
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");

    lightboxImage.src = image.src; // Set gambar di lightbox
    
    const index = image.getAttribute("data-index");
    Judul.innerText = dataLagu[index].title; // Set judul lagu di lightbox
    Artis.innerText = dataLagu[index].artis; // Set artis lagu di lightbox

    lightbox.style.display = "flex"; // Tampilkan lightbox
}

function closeLightbox() {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none"; // Sembunyikan lightbox
    const konfirm = confirm("Play di background?? \nOke = Iya \nBatal = Tidak");
    if(konfirm === true){
        laguPlayer.play();
    }else{
        laguPlayer.pause();
    }
};

const playPause = () =>{
    if(ctrlIcon.classList.contains("fa-pause")){
        laguPlayer.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }else{
        laguPlayer.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
};

laguPlayer.onloadedmetadata = function(){
    progress.max = laguPlayer.duration;
    progress.value = laguPlayer.currentTime;
};

if(laguPlayer.play()){
    setInterval(()=>{
        progress.value = laguPlayer.currentTime;
    }, 500)
};

progress.onchange = function(){
    laguPlayer.play();
    laguPlayer.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
};