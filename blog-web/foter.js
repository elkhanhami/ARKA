// foter mobile


        document.addEventListener('DOMContentLoaded', function() {
            const hijriYear = 1402;
            const copyrightText = document.querySelector('.copyright p');
            if (copyrightText) {
                copyrightText.innerHTML = copyrightText.innerHTML.replace('۱۴۰۲', hijriYear);
            }
            
            // باز کردن اولین آکاردئون به صورت پیش‌فرض
            toggleAccordion('quickLinks');
            
            // مدیریت دکمه بازگشت به بالا
            const backToTopBtn = document.getElementById('backToTop');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        function toggleAccordion(id) {
            const content = document.getElementById(id);
            const header = content.previousElementSibling;
            const icon = header.querySelector('i');
            
            // اگر آکاردئون قبلاً باز است، آن را ببند
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                header.classList.remove('active');
                icon.style.transform = 'rotate(0deg)';
                return;
            }
            
            // بستن همه آکاردئون‌های دیگر
            const allContents = document.querySelectorAll('.accordion-content');
            const allHeaders = document.querySelectorAll('.accordion-header');
            const allIcons = document.querySelectorAll('.accordion-header i');
            
            allContents.forEach(item => {
                if (item.id !== id) {
                    item.classList.remove('active');
                }
            });
            
            allHeaders.forEach(headerItem => {
                if (headerItem !== header) {
                    headerItem.classList.remove('active');
                }
            });
            
            allIcons.forEach(iconItem => {
                if (iconItem !== icon) {
                    iconItem.style.transform = 'rotate(0deg)';
                }
            });
            
            // باز کردن آکاردئون انتخاب شده
            content.classList.add('active');
            header.classList.add('active');
            icon.style.transform = 'rotate(180deg)';
            
            // اسکرول به آکاردئون باز شده
            // setTimeout(() => {
            //     header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            // }, 300);
        }





// foter desktop




        document.addEventListener('DOMContentLoaded', function() {
            const hijriYear = 1402;
            const copyrightText = document.querySelector('.copyright-text p');
            if (copyrightText) {
                copyrightText.innerHTML = copyrightText.innerHTML.replace('۱۴۰۲', hijriYear);
            }
            
            // افکت hover برای آیتم‌های تماس
            const contactItems = document.querySelectorAll('.contact-item');
            contactItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.querySelector('i').style.transform = 'scale(1.2)';
                    this.querySelector('i').style.color = 'var(--gold-secondary)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.querySelector('i').style.transform = 'scale(1)';
                    this.querySelector('i').style.color = 'var(--gold-primary)';
                });
            });
            
            // اسکرول نرم برای لینک‌ها
            const footerLinks = document.querySelectorAll('.footer-links a');
            footerLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId.startsWith('#')) {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        });