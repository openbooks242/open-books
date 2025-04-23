// Datos de ejemplo para los libros
const popularBooks = [
    {
        title: 'Harry Potter y la piedra filosofal',
        author: 'J.K. Rowling',
        cover: 'img/books/harry-potter.jpg',
        rating: 4.8,
        audioIcon: true
    },
    {
        title: 'La Ley de la Atracción',
        author: 'Esther Hicks',
        cover: 'img/books/ley-atraccion.jpg',
        rating: 4.5,
        audioIcon: true
    },
    {
        title: '1984',
        author: 'George Orwell',
        cover: 'img/books/1984.jpg',
        rating: 4.9,
        audioIcon: true
    },
    {
        title: 'Corte de Espinas',
        author: 'Sarah J. Maas',
        cover: 'img/books/corte-espinas.jpg',
        rating: 4.7,
        audioIcon: true
    },
    {
        title: 'El Poder de Estar Solo',
        author: 'Brian Alba',
        cover: 'img/books/poder-solo.jpg',
        rating: 4.2,
        audioIcon: true
    },
    {
        title: 'Victoria',
        author: 'Paloma Sánchez-Garnica',
        cover: 'img/books/victoria.jpg',
        rating: 4.6,
        audioIcon: true
    }
];

// Función para crear una tarjeta de libro
function createBookCard(book) {
    return `
        <div class="book-card">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}" loading="lazy">
                ${book.audioIcon ? '<div class="audio-icon"><i class="fas fa-headphones"></i></div>' : ''}
            </div>
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <div class="book-rating">
                <span class="stars">${'★'.repeat(Math.floor(book.rating))}</span>
                <span class="rating-number">${book.rating}</span>
            </div>
        </div>
    `;
}

// Función para cargar los libros en el grid con scroll horizontal
function loadBookGrid() {
    const bookGrid = document.querySelector('.book-grid');
    if (bookGrid) {
        bookGrid.innerHTML = popularBooks.map(book => createBookCard(book)).join('');
        
        // Implementar scroll horizontal suave
        let isDown = false;
        let startX;
        let scrollLeft;

        bookGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            bookGrid.classList.add('active');
            startX = e.pageX - bookGrid.offsetLeft;
            scrollLeft = bookGrid.scrollLeft;
        });

        bookGrid.addEventListener('mouseleave', () => {
            isDown = false;
            bookGrid.classList.remove('active');
        });

        bookGrid.addEventListener('mouseup', () => {
            isDown = false;
            bookGrid.classList.remove('active');
        });

        bookGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - bookGrid.offsetLeft;
            const walk = (x - startX) * 2;
            bookGrid.scrollLeft = scrollLeft - walk;
        });
    }
}

// Función para cargar los libros en el slider
function loadBookSlider() {
    const bookSlider = document.querySelector('.book-slider');
    if (bookSlider) {
        bookSlider.innerHTML = popularBooks.map(book => createBookCard(book)).join('');
    }
}

// Función para manejar la búsqueda
function handleSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const navbar = document.querySelector('.navbar');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            const searchBar = document.createElement('div');
            searchBar.className = 'search-bar';
            searchBar.innerHTML = `
                <div class="search-container">
                    <input type="text" placeholder="Buscar libros, autores, narradores..." autofocus>
                    <button class="close-search"><i class="fas fa-times"></i></button>
                    <div class="search-suggestions">
                        <h3>Búsquedas populares</h3>
                        <div class="suggestion-tags">
                            <span class="suggestion-tag">Harry Potter</span>
                            <span class="suggestion-tag">Audiolibros de motivación</span>
                            <span class="suggestion-tag">Bestsellers</span>
                            <span class="suggestion-tag">Libros en español</span>
                            <span class="suggestion-tag">Novedades</span>
                            <span class="suggestion-tag">Storytel Originals</span>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(searchBar);
            
            // Animar la entrada
            requestAnimationFrame(() => {
                searchBar.style.opacity = '0';
                searchBar.style.transform = 'translateY(-20px)';
                requestAnimationFrame(() => {
                    searchBar.style.opacity = '1';
                    searchBar.style.transform = 'translateY(0)';
                });
            });
            
            const searchInput = searchBar.querySelector('input');
            const closeBtn = searchBar.querySelector('.close-search');
            const suggestionTags = searchBar.querySelectorAll('.suggestion-tag');
            
            // Manejar clic en sugerencias
            suggestionTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    searchInput.value = tag.textContent;
                    searchInput.focus();
                });
            });
            
            // Cerrar búsqueda
            closeBtn.addEventListener('click', () => {
                searchBar.style.opacity = '0';
                searchBar.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    searchBar.remove();
                }, 300);
            });

            // Cerrar con Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeBtn.click();
                }
            });

            // Prevenir que el fondo se desplace
            document.body.style.overflow = 'hidden';
            searchBar.addEventListener('click', (e) => {
                if (e.target === searchBar) {
                    closeBtn.click();
                }
            });
        });
    }
}

// Función para manejar el scroll y efectos de la navbar
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Función para inicializar las características expandibles
function initExpandableFeatures() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const wasActive = card.classList.contains('active');
            
            // Cerrar todas las tarjetas activas
            featureCards.forEach(c => c.classList.remove('active'));
            
            // Si la tarjeta no estaba activa, activarla
            if (!wasActive) {
                card.classList.add('active');
            }
        });
    });
}

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
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
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
        audioPlayer.currentTime = audioPlayer.currentTime; // Forzar la detención
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

// Simular estado de sesión (en un caso real esto vendría de tu sistema de autenticación)
let isLoggedIn = false; // Cambiar a true cuando el usuario inicie sesión

// Función para manejar los clicks en botones de redes sociales
function handleSocialFollow(platform) {
    if (!isLoggedIn) {
        alert('Debes iniciar sesión para seguirnos en ' + platform);
        // Aquí podrías redirigir al usuario a la página de login
        // window.location.href = 'login.html';
    } else {
        alert('¡Gracias por seguirnos en ' + platform + '! Te has suscrito exitosamente.');
        // Aquí podrías actualizar el botón o el contador de seguidores
    }
}

// Agregar event listeners a todos los botones
document.addEventListener('DOMContentLoaded', function() {
    // Instagram
    document.getElementById('followInstagram').addEventListener('click', function() {
        handleSocialFollow('Instagram');
    });

    // Facebook
    document.getElementById('followFacebook').addEventListener('click', function() {
        handleSocialFollow('Facebook');
    });

    // Twitter
    document.getElementById('followTwitter').addEventListener('click', function() {
        handleSocialFollow('Twitter');
    });

    // YouTube
    document.getElementById('followYoutube').addEventListener('click', function() {
        handleSocialFollow('YouTube');
    });
});

// Inicializar todas las funcionalidades cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    loadBookGrid();
    loadBookSlider();
    handleSearch();
    handleScroll();
    initExpandableFeatures();
}); 