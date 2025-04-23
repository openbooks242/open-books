document.addEventListener('DOMContentLoaded', function() {
    // Manejar el botón de "Ver ahora"
    const watchNowButton = document.querySelector('.watch-now-button');
    if (watchNowButton) {
        watchNowButton.addEventListener('click', function() {
            // Aquí se puede agregar la lógica para reproducir la película
            alert('Reproduciendo la película...');
        });
    }

    // Manejar el botón de "Añadir a mi lista"
    const addToListButton = document.querySelector('.add-to-list-button');
    if (addToListButton) {
        addToListButton.addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-check"></i> En mi lista';
                this.style.background = 'var(--primary-red)';
            } else {
                this.innerHTML = '<i class="fas fa-plus"></i> Mi lista';
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    }

    // Manejar la reproducción del tráiler
    const trailerContainer = document.querySelector('.trailer-container iframe');
    if (trailerContainer) {
        // Aquí se puede agregar la lógica para cargar el ID del video de YouTube
        const videoId = 'VIDEO_ID'; // Reemplazar con el ID real del video
        trailerContainer.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }

    // Manejar la navegación responsive
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const searchIcon = document.querySelector('.search-icon');

    if (window.innerWidth <= 768) {
        // Crear botón de menú para móviles
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-button';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        navbar.insertBefore(menuButton, navLinks);

        // Toggle del menú
        menuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuButton.classList.remove('active');
            });
        });
    }

    // Animación de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de parallax en el póster
    const moviePoster = document.querySelector('.movie-detail-poster');
    if (moviePoster) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            moviePoster.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }

    // Cargar datos de la película (simulado)
    function loadMovieData() {
        // Aquí se puede implementar la carga de datos reales desde una API
        const movieData = {
            title: "El Último Guardián",
            rating: 4.8,
            duration: "2h 15min",
            year: 2023,
            ageRating: "+16",
            genre: "Acción | Aventura | Ciencia Ficción",
            description: "En un mundo post-apocalíptico, un guardián solitario debe proteger el último fragmento de humanidad mientras lucha contra fuerzas oscuras que buscan destruirlo todo.",
            cast: [
                { name: "John Smith", role: "Protagonista", image: "img/actor1.jpg" },
                { name: "Emma Johnson", role: "Co-protagonista", image: "img/actor2.jpg" },
                { name: "Michael Brown", role: "Antagonista", image: "img/actor3.jpg" }
            ],
            technicalDetails: {
                director: "Sarah Williams",
                writer: "David Miller",
                music: "James Wilson",
                country: "Estados Unidos",
                language: "Inglés"
            }
        };

        // Actualizar la UI con los datos
        updateMovieUI(movieData);
    }

    function updateMovieUI(data) {
        // Actualizar título
        document.querySelector('.movie-detail-info h1').textContent = data.title;
        
        // Actualizar metadatos
        document.querySelector('.movie-detail-meta .rating').innerHTML = `${data.rating} <i class="fas fa-star"></i>`;
        document.querySelector('.movie-detail-meta .duration').textContent = data.duration;
        document.querySelector('.movie-detail-meta .year').textContent = data.year;
        document.querySelector('.movie-detail-meta .age-rating').textContent = data.ageRating;
        
        // Actualizar género y descripción
        document.querySelector('.movie-detail-genre').textContent = data.genre;
        document.querySelector('.movie-detail-description').textContent = data.description;

        // Actualizar elenco
        const castGrid = document.querySelector('.cast-grid');
        if (castGrid) {
            castGrid.innerHTML = data.cast.map(actor => `
                <div class="cast-member">
                    <img src="${actor.image}" alt="${actor.name}">
                    <span>${actor.name}</span>
                    <small>${actor.role}</small>
                </div>
            `).join('');
        }

        // Actualizar detalles técnicos
        const technicalDetails = document.querySelector('.technical-details');
        if (technicalDetails) {
            technicalDetails.innerHTML = `
                <div class="detail-item">
                    <span class="detail-label">Director:</span>
                    <span class="detail-value">${data.technicalDetails.director}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Guionista:</span>
                    <span class="detail-value">${data.technicalDetails.writer}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Música:</span>
                    <span class="detail-value">${data.technicalDetails.music}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">País:</span>
                    <span class="detail-value">${data.technicalDetails.country}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Idioma:</span>
                    <span class="detail-value">${data.technicalDetails.language}</span>
                </div>
            `;
        }
    }

    // Cargar datos de la película al iniciar
    loadMovieData();

    // Obtener referencias a los elementos
    const filterButtons = document.querySelectorAll('.filter-button');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const movieCards = document.querySelectorAll('.movie-card');

    // Estado actual de los filtros
    let currentType = 'all';
    let currentCategory = 'all';

    // Función para actualizar la visibilidad de las películas con animación
    function updateMoviesVisibility() {
        movieCards.forEach(card => {
            const cardType = card.dataset.type;
            const cardCategory = card.dataset.category;
            
            const matchesType = currentType === 'all' || cardType === currentType;
            const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;

            if (matchesType && matchesCategory) {
                card.style.opacity = '0';
                card.style.display = '';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Manejar clicks en los botones de tipo (Todos, Gratuitos, Premium)
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');

            // Actualizar el filtro actual
            const buttonText = button.textContent.trim().toLowerCase();
            if (buttonText === 'gratuitos') {
                currentType = 'free';
            } else if (buttonText === 'premium') {
                currentType = 'premium';
            } else {
                currentType = 'all';
            }

            updateMoviesVisibility();
        });
    });

    // Manejar clicks en los botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');

            // Actualizar la categoría actual
            currentCategory = button.dataset.category;

            updateMoviesVisibility();
        });
    });

    // Inicializar la visibilidad de las películas
    updateMoviesVisibility();
});

// Datos de las películas
const peliculas = {
    1: {
        titulo: "El Último Guardián",
        genero: "Acción | Aventura",
        duracion: "2h 15min",
        rating: "4.8",
        tipo: "premium",
        año: "2023",
        director: "Michael Anderson",
        sinopsis: "En un mundo al borde del caos, un antiguo guardián debe proteger un artefacto sagrado que mantiene el equilibrio entre la luz y la oscuridad.",
        imagen: "img/movie1.jpg",
        backdrop: "img/movie1-backdrop.jpg",
        trailer: "https://www.youtube.com/embed/example1",
        elenco: [
            { nombre: "John Smith", personaje: "Marcus - El Guardián", imagen: "img/actor1.jpg" },
            { nombre: "Sarah Johnson", personaje: "Elena - La Guerrera", imagen: "img/actor2.jpg" }
        ],
        detallesTecnicos: {
            audio: "5.1 Dolby Digital",
            subtitulos: "Español, Inglés",
            calidad: "4K Ultra HD, HDR",
            dispositivos: "TV, Móvil, Tablet"
        }
    },
    2: {
        titulo: "La Sombra del Pasado",
        genero: "Drama | Suspenso",
        duracion: "1h 50min",
        rating: "4.5",
        tipo: "free",
        año: "2023",
        director: "Laura Martinez",
        sinopsis: "Un detective retirado se ve obligado a enfrentar un caso sin resolver de su pasado cuando nuevas pistas salen a la luz después de 20 años.",
        imagen: "img/movie2.jpg",
        backdrop: "img/movie2-backdrop.jpg",
        trailer: "https://www.youtube.com/embed/example2",
        elenco: [
            { nombre: "Robert Wilson", personaje: "Detective James Cooper", imagen: "img/actor3.jpg" },
            { nombre: "Maria García", personaje: "Ana Ruiz", imagen: "img/actor4.jpg" }
        ],
        detallesTecnicos: {
            audio: "5.1 Dolby Digital",
            subtitulos: "Español, Inglés",
            calidad: "1080p HD",
            dispositivos: "TV, Móvil, Tablet"
        }
    }
    // ... Agregar más películas aquí
};

// Función para cargar los detalles de la película
function cargarDetallesPelicula() {
    // Obtener el ID de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id || !peliculas[id]) {
        window.location.href = 'peliculas.html';
        return;
    }

    const pelicula = peliculas[id];

    // Actualizar el backdrop
    const backdrop = document.getElementById('movie-backdrop');
    if (backdrop) {
        backdrop.style.backgroundImage = `url(${pelicula.backdrop})`;
    }

    // Actualizar la información básica
    document.getElementById('movie-poster').src = pelicula.imagen;
    document.getElementById('movie-poster').alt = pelicula.titulo;
    document.getElementById('movie-title').textContent = pelicula.titulo;
    document.getElementById('movie-type-badge').className = `movie-badge ${pelicula.tipo}`;
    document.getElementById('movie-type-badge').textContent = pelicula.tipo === 'premium' ? 'Premium' : 'Free';

    // Actualizar meta información
    document.querySelector('.movie-year').textContent = pelicula.año;
    document.querySelector('.movie-duration').textContent = pelicula.duracion;
    document.querySelector('.rating-value').textContent = pelicula.rating;

    // Actualizar géneros
    const generos = pelicula.genero.split('|').map(g => g.trim());
    const generosHTML = generos.map(g => `<span class="movie-genre">${g}</span>`).join('');
    document.querySelector('.movie-genres').innerHTML = generosHTML;

    // Actualizar sinopsis
    document.querySelector('.movie-detail-description').textContent = pelicula.sinopsis;
    document.querySelector('.synopsis-text').textContent = pelicula.sinopsis;

    // Actualizar detalles del director y otros metadatos
    document.querySelector('.director-name').textContent = pelicula.director;
    document.querySelector('.movie-detail-genre').textContent = pelicula.genero;

    // Actualizar trailer
    const trailerIframe = document.querySelector('.trailer-container iframe');
    if (trailerIframe) {
        trailerIframe.src = pelicula.trailer;
    }

    // Actualizar elenco
    const castGrid = document.querySelector('.cast-grid');
    if (castGrid && pelicula.elenco) {
        castGrid.innerHTML = pelicula.elenco.map(actor => `
            <div class="cast-member">
                <img src="${actor.imagen}" alt="${actor.nombre}">
                <div class="actor-name">${actor.nombre}</div>
                <div class="character-name">${actor.personaje}</div>
            </div>
        `).join('');
    }

    // Actualizar detalles técnicos
    const detalles = pelicula.detallesTecnicos;
    if (detalles) {
        document.querySelector('.technical-grid').innerHTML = `
            <div class="technical-item">
                <span class="tech-label">Audio</span>
                <span class="tech-value">${detalles.audio}</span>
            </div>
            <div class="technical-item">
                <span class="tech-label">Subtítulos</span>
                <span class="tech-value">${detalles.subtitulos}</span>
            </div>
            <div class="technical-item">
                <span class="tech-label">Calidad</span>
                <span class="tech-value">${detalles.calidad}</span>
            </div>
            <div class="technical-item">
                <span class="tech-label">Dispositivos</span>
                <span class="tech-value">${detalles.dispositivos}</span>
            </div>
        `;
    }
}

// Función para filtrar películas
function filtrarPeliculas() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const movieCards = document.querySelectorAll('.movie-card');

    let currentType = 'all';
    let currentCategory = 'all';

    // Filtrar por tipo (Todos, Gratuitos, Premium)
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterText = button.textContent.toLowerCase();
            currentType = filterText === 'todos' ? 'all' : 
                         filterText === 'gratuitos' ? 'free' : 'premium';
            
            updateMoviesVisibility();
        });
    });

    // Filtrar por categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentCategory = button.dataset.category;
            updateMoviesVisibility();
        });
    });

    // Función para actualizar la visibilidad de las películas
    function updateMoviesVisibility() {
        movieCards.forEach(card => {
            const cardType = card.dataset.type;
            const cardCategory = card.dataset.category;
            
            const typeMatch = currentType === 'all' || cardType === currentType;
            const categoryMatch = currentCategory === 'all' || cardCategory === currentCategory;
            
            if (typeMatch && categoryMatch) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Inicializar las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('pelicula-detalle.html')) {
        cargarDetallesPelicula();
    } else {
        filtrarPeliculas();
    }
}); 