document.addEventListener('DOMContentLoaded', function() {
    const searchContainer = document.querySelector('.search-container');
    const searchIcon = document.querySelector('.search-icon');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-input');
    const searchClose = document.querySelector('.search-close');
    const navbar = document.querySelector('.navbar');

    // Base de datos simulada de contenido
    const contentDatabase = {
        audiolibros: [
            { title: 'Alas de Hierro', category: 'Audiolibro', url: 'audiolibros.html', icon: 'fa-headphones', type: 'Fantasía' },
            { title: 'El Último Guardián', category: 'Audiolibro', url: 'audiolibros.html', icon: 'fa-headphones', type: 'Aventura' },
            { title: 'Sombras del Pasado', category: 'Audiolibro', url: 'audiolibros.html', icon: 'fa-headphones', type: 'Misterio' }
        ],
        ebooks: [
            { title: 'La Ciudad de Cristal', category: 'eBook', url: 'ebooks.html', icon: 'fa-book', type: 'Ciencia Ficción' },
            { title: 'Memorias del Silencio', category: 'eBook', url: 'ebooks.html', icon: 'fa-book', type: 'Drama' },
            { title: 'El Jardín Secreto', category: 'eBook', url: 'ebooks.html', icon: 'fa-book', type: 'Infantil' }
        ],
        audioseries: [
            { title: 'Crónicas del Mañana', category: 'Audioserie', url: 'audioseries.html', icon: 'fa-podcast', type: 'Ciencia Ficción' },
            { title: 'Historias de Medianoche', category: 'Audioserie', url: 'audioseries.html', icon: 'fa-podcast', type: 'Terror' },
            { title: 'Voces del Tiempo', category: 'Audioserie', url: 'audioseries.html', icon: 'fa-podcast', type: 'Drama' }
        ],
        peliculas: [
            { title: 'El Despertar', category: 'Película', url: 'peliculas.html', icon: 'fa-film', type: 'Acción' },
            { title: 'Luna Roja', category: 'Película', url: 'peliculas.html', icon: 'fa-film', type: 'Terror' },
            { title: 'Más Allá del Horizonte', category: 'Película', url: 'peliculas.html', icon: 'fa-film', type: 'Aventura' }
        ]
    };

    // Función para abrir la búsqueda
    function openSearch() {
        if (searchBox) {
            searchBox.style.display = 'flex';
            searchBox.classList.add('active');
            searchContainer.classList.add('active');
            if (navbar) navbar.classList.add('search-active');
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 50);
        }
    }

    // Función para cerrar la búsqueda
    function closeSearch() {
        if (searchBox) {
            searchBox.classList.remove('active');
            searchContainer.classList.remove('active');
            if (navbar) navbar.classList.remove('search-active');
            setTimeout(() => {
                searchBox.style.display = 'none';
                if (searchInput) {
                    searchInput.value = '';
                    clearSearchResults();
                }
            }, 300);
        }
    }

    // Función para manejar la búsqueda
    function handleSearch() {
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        const currentPage = getCurrentPage();
        
        if (searchTerm.length > 0) {
            showSearchResults(searchTerm, currentPage);
        } else {
            clearSearchResults();
        }
    }

    // Función para obtener la página actual
    function getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('audiolibros')) return 'audiolibros';
        if (path.includes('ebooks')) return 'ebooks';
        if (path.includes('audioseries')) return 'audioseries';
        if (path.includes('peliculas')) return 'peliculas';
        return 'all';
    }

    // Función para mostrar resultados de búsqueda
    function showSearchResults(searchTerm, currentPage) {
        if (!searchBox) return;
        
        clearSearchResults();
        
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        
        const results = filterContent(searchTerm, currentPage);
        
        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('a');
                resultItem.href = result.url;
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <div class="result-icon">
                        <i class="fas ${result.icon}"></i>
                    </div>
                    <div class="result-info">
                        <div class="result-title">${result.title}</div>
                        <div class="result-category">${result.category} • ${result.type}</div>
                    </div>
                `;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>No se encontraron resultados para "${searchTerm}"</p>
                    <span>Intenta con otras palabras clave</span>
                </div>
            `;
        }

        searchBox.appendChild(resultsContainer);
    }

    // Función para limpiar resultados de búsqueda
    function clearSearchResults() {
        if (!searchBox) return;
        
        const existingResults = searchBox.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }
    }

    // Función para filtrar contenido
    function filterContent(searchTerm, currentPage) {
        let contentToSearch = [];
        
        if (currentPage === 'all') {
            Object.values(contentDatabase).forEach(items => {
                contentToSearch = contentToSearch.concat(items);
            });
        } else {
            contentToSearch = contentDatabase[currentPage] || [];
        }

        return contentToSearch.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.category.toLowerCase().includes(searchTerm) ||
            item.type.toLowerCase().includes(searchTerm)
        );
    }

    // Event Listeners
    if (searchIcon) {
        searchIcon.addEventListener('click', openSearch);
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }
    
    // Cerrar búsqueda con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchContainer && searchContainer.classList.contains('active')) {
            closeSearch();
        }
    });

    // Manejar entrada de búsqueda con debounce
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(handleSearch, 300);
        });
    }

    // Evitar que el formulario se envíe
    if (searchBox) {
        searchBox.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    // Cerrar búsqueda al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (searchContainer && searchContainer.classList.contains('active') && 
            !searchContainer.contains(e.target)) {
            closeSearch();
        }
    });
}); 