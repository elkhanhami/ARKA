class BlogWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initNewsletterForm();
        this.initImageLoading();
        
        this.checkScrollAnimations();
    }

    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle?.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            const bars = document.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    initScrollAnimations() {
        window.addEventListener('scroll', () => this.checkScrollAnimations());
    }

    checkScrollAnimations() {
        const elements = document.querySelectorAll(
            '.section-title, .section-description, .featured-main, .side-article, .category-card, .article-card, .author-card'
        );
        const triggerBottom = window.innerHeight * 0.85;

        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
                element.style.transitionDelay = `${(index % 5) * 5}ms`;
            }
        });
    }

    initHoverEffects() {
        const cards = document.querySelectorAll('.featured-main, .side-article, .category-card, .article-card, .author-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        const readMoreLinks = document.querySelectorAll('.read-more, .read-more-sm, .category-link, .author-card-link, .view-all');
        readMoreLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.gap = '8px';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.gap = '4px';
            });
        });
    }

    initImageLoading() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.3s ease';
            });
            
            img.style.opacity = '1';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BlogWebsite();
});

document.head.appendChild(style);