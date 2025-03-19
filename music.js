//Function Musik
const dataLagu = [
    { title: "Aku Milikmu", artis:"Dewa 19", src: "assets/audio/spotifydown.com - Aku Milikmu.mp3" },
    { title: "Terima kasih", artis:"Hal", src: "assets/audio/HAL - terima kasih (Official Lyric Video) - halstage (youtube).mp3" },
    { title: "I Wanna Be Yours", artis:"Arctic Monkeys", src: "assets/audio/I Wanna Be Yours - Arctic Monkeys (youtube).mp3" },
    { title: "Perfect", artis:"Ed Sheran", src: "assets/audio/spotifydown.com - Perfect.mp3" },
    { title: "Penjaga Hati", artis:"Nadhfi Basalamah", src: "assets/audio/spotifydown.com - penjaga hati.mp3" },
    { title: "Spring Snow", artis:"10cm", src: "assets/audio/10cm – Spring Snow (봄눈) [Lovely Runner OST Part 8] [Rom_Eng Lyric] - ElyDha Subs (youtube).mp3" },
    { title: "I Love You So", artis:"The Walters", src: "assets/audio/spotifydown.com - I Love You So.mp3" },
    { title: "Aku yang jatuh cinta", artis:"Dudy Oris", src: "assets/audio/SpotiDownloader.com - Aku Yang Jatuh Cinta - Dudy Oris (1).mp3" },
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