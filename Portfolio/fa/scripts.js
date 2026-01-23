const projects = [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
                title: "هنر طبیعت در معماری",
                description: "دیوار سبز یک سیستم زنده است که گیاهان را به صورت عمودی بر روی دیوارها و سطوح ساختمان پرورش می‌دهد. این فناوری نه تنها زیبایی‌شناسی محیط را ارتقا می‌دهد، بلکه مزایای زیست‌محیطی فراوانی از جمله بهبود کیفیت هوا، کاهش آلودگی صوتی و صرفه‌جویی در مصرف انرژی را به همراه دارد.",
                meta: "سیستم هیدروپونیک | آبیاری هوشمند"
            },
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
                title: "ویلای مدرن شمال",
                description: "این پروژه در یک ویلا در رامسر اجرا شده است. دیوار سبز خارجی به مساحت ۶۰ متر مربع با سیستم هیدروپونیک نصب شد. گیاهان انتخاب شده شامل پتوس، فیلودندرون و اسپاتی فیلوم هستند که نیاز به نور متوسط دارند و با شرایط آب و هوایی شمال ایران کاملاً سازگار هستند. سیستم آبیاری هوشمند با سنسور رطوبت سنج نصب شده است.",
                meta: "مساحت: ۶۰ متر مربع | مدت اجرا: ۲ هفته"
            },
            {
                id: 3,
                image: "image/Portfolio/istockphoto-1475725191-1024x1024.jpg",
                title: "رستوران بین‌المللی",
                description: "دیوار سبز این رستوران در اصفهان با سیستم مدولار اجرا شده است. طراحی خاص با ترکیب گیاهان گلدار و برگ‌دار ایجاد شده که در شب با نورپردازی LED جلوه‌ای خاص پیدا می‌کند. این پروژه باعث افزایش ۳۰٪ی مشتریان رستوران شده است.",
                meta: "سیستم مدولار | نورپردازی LED"
            },
            {
                id: 4,
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
                title: "دفتر کار استارتاپ",
                description: "دیوار سبز به عنوان پارتیشن در فضای اداری یک استارتاپ در تهران اجرا شده است. طراحی مینیمال با گیاهان کم‌نیاز برای کاهش استرس کارمندان و افزایش تمرکز. این پروژه با سیستم نمدی اجرا شده که امکان ایجاد طرح‌های ارگانیک را فراهم می‌کند.",
                meta: "سیستم نمدی | فضای اداری"
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
                    prevProject();
                    break;
                case 'ArrowLeft':
                    nextProject();
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