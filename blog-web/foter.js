        document.addEventListener('DOMContentLoaded', function() {
            const hijriYear = 1402;
            const copyrightText = document.querySelector('.copyright p');
            if (copyrightText) {
                copyrightText.innerHTML = copyrightText.innerHTML.replace('۱۴۰۲', hijriYear);
            }
            
            toggleAccordion('quickLinks');
            
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
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                header.classList.remove('active');
                icon.style.transform = 'rotate(0deg)';
                return;
            }
            
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
            
            content.classList.add('active');
            header.classList.add('active');
            icon.style.transform = 'rotate(180deg)';
            
        }

        document.addEventListener('DOMContentLoaded', function() {
            const hijriYear = 1402;
            const copyrightText = document.querySelector('.copyright-text p');
            if (copyrightText) {
                copyrightText.innerHTML = copyrightText.innerHTML.replace('۱۴۰۲', hijriYear);
            }
            
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
        });