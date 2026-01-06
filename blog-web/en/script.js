// script.js
/**
 * July Insights Blog
 * A complete blog website with photos
 */

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

    initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        const input = document.querySelector('.newsletter-input');
        const button = document.querySelector('.newsletter-button');

        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!input.value.trim()) return;
            
            input.disabled = true;
            button.disabled = true;
            button.textContent = 'Subscribing...';
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.style.color = 'var(--color-category-consumer)';
            successMessage.style.textAlign = 'center';
            successMessage.style.marginTop = 'var(--space-md)';
            
            form.parentNode.insertBefore(successMessage, form.nextSibling);
            
            input.value = '';
            input.disabled = false;
            button.disabled = false;
            button.textContent = 'Subscribe';
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
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

const style = document.createElement('style');
style.textContent = `
    .featured-main:hover::before,
    .side-article:hover::before,
    .category-card:hover::before,
    .article-card:hover::before,
    .author-card:hover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            400px circle at var(--mouse-x) var(--mouse-y),
            rgba(77, 171, 247, 0.08),
            transparent 40%
        );
        border-radius: inherit;
        z-index: 0;
        pointer-events: none;
    }
    
    .featured-main > *,
    .side-article > *,
    .category-card > *,
    .article-card > *,
    .author-card > * {
        position: relative;
        z-index: 1;
    }
    
    .read-more svg,
    .read-more-sm svg,
    .category-link svg,
    .author-card-link svg,
    .view-all svg {
        transition: transform 0.2s ease;
    }
    
    img {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);