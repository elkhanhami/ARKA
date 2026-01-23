const projects = [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
                title: "Nature's Art in Architecture",
                description: "A green wall is a living system that vertically cultivates plants on walls and building surfaces. This technology not only enhances the aesthetics of the environment but also provides numerous ecological benefits including improved air quality, reduced noise pollution, and energy conservation.",
                meta: "Hydroponic System | Smart Irrigation"
            },
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
                title: "Modern Northern Villa",
                description: "This project was implemented in a villa in Ramsar. A 60 square meter external green wall was installed with a hydroponic system. Selected plants include Pothos, Philodendron, and Spathiphyllum which require moderate light and are fully compatible with the climate of northern Iran. A smart irrigation system with moisture sensors was installed.",
                meta: "Area: 60 m² | Duration: 2 weeks"
            },
            {
                id: 3,
                image: "image/Portfolio/f1fc8b449e797523c4cdcb7faa42f2f2.jpg",
                title: "International Restaurant",
                description: "This restaurant's green wall in Isfahan was implemented with a modular system. A special design was created with a combination of flowering and foliage plants that gain a unique appearance at night with LED lighting. This project has increased the restaurant's customer base by 30%.",
                meta: "Modular System | LED Lighting"
            },
            {
                id: 4,
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
                title: "Startup Office",
                description: "The green wall was implemented as a partition in the office space of a startup in Tehran. Minimalist design with low-maintenance plants to reduce employee stress and increase focus. This project was implemented with a fabric system that allows for organic designs.",
                meta: "Fabric System | Office Space"
            }
        ];

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        const lightboxMeta = document.getElementById('lightbox-meta');
        const closeBtn = document.getElementById('close-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            const project = projects[index];
            
            lightboxImg.src = project.image;
            lightboxTitle.textContent = project.title;
            lightboxDescription.textContent = project.description;
            lightboxMeta.textContent = project.meta;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function nextProject() {
            currentIndex = (currentIndex + 1) % projects.length;
            openLightbox(currentIndex);
        }

        function prevProject() {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
            openLightbox(currentIndex);
        }

        document.querySelectorAll('[data-lightbox]').forEach(item => {
            item.addEventListener('click', (e) => {
                const projectId = parseInt(item.getAttribute('data-lightbox'));
                const index = projects.findIndex(project => project.id === projectId);
                if (index !== -1) {
                    openLightbox(index);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', nextProject);
        prevBtn.addEventListener('click', prevProject);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    nextProject();
                    break;
                case 'ArrowLeft':
                    prevProject();
                    break;
            }
        });

        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.about-card, .type-card, .project-card, .step, .benefit-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            observer.observe(el);
        });

        window.addEventListener('load', () => {
            projects.forEach(project => {
                const img = new Image();
                img.src = project.image;
            });
        });