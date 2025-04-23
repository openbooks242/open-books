// Elementos del reproductor de audio
const audioPlayer = document.getElementById('audiobook-player');
const playBtn = document.querySelector('.play-btn');
const rewindBtn = document.querySelector('.rewind-btn');
const forwardBtn = document.querySelector('.forward-btn');
const progressBar = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const currentTimeSpan = document.querySelector('.current-time');
const durationSpan = document.querySelector('.duration');

// Estado del reproductor
let isPlaying = false;

// Función para formatear el tiempo en minutos:segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Función para actualizar la barra de progreso
function updateProgress() {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
}

// Función para cambiar el estado de reproducción
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioPlayer.play().catch(error => {
            console.error('Error al reproducir:', error);
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Función para adelantar o retroceder
function skip(seconds) {
    audioPlayer.currentTime += seconds;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
rewindBtn.addEventListener('click', () => skip(-10));
forwardBtn.addEventListener('click', () => skip(10));

progressContainer.addEventListener('click', (e) => {
    const percent = e.offsetX / progressContainer.offsetWidth;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    progressBar.style.width = '0%';
}); 