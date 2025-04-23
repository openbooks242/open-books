document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        const expandButton = card.querySelector('.expand-button');
        const cardContent = card.querySelector('.card-content');
        const cardDescription = card.querySelector('.card-description');
        
        // Configuración inicial
        if (!card.classList.contains('expanded')) {
            cardDescription.style.maxHeight = '0';
            cardDescription.style.opacity = '0';
            cardDescription.style.marginTop = '0';
        }
        
        expandButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Obtener el estado actual
            const isExpanded = card.classList.contains('expanded');
            
            // Cerrar todas las tarjetas
            featureCards.forEach(c => {
                const desc = c.querySelector('.card-description');
                if (c !== card) {
                    c.classList.remove('expanded');
                    desc.style.maxHeight = '0';
                    desc.style.opacity = '0';
                    desc.style.marginTop = '0';
                }
            });
            
            // Alternar el estado de la tarjeta actual
            if (!isExpanded) {
                card.classList.add('expanded');
                cardDescription.style.maxHeight = cardDescription.scrollHeight + 'px';
                cardDescription.style.opacity = '1';
                cardDescription.style.marginTop = '1rem';
                expandButton.querySelector('.plus').style.display = 'none';
                expandButton.querySelector('.close').style.display = 'block';
            } else {
                card.classList.remove('expanded');
                cardDescription.style.maxHeight = '0';
                cardDescription.style.opacity = '0';
                cardDescription.style.marginTop = '0';
                expandButton.querySelector('.plus').style.display = 'block';
                expandButton.querySelector('.close').style.display = 'none';
            }
        });
    });
}); 