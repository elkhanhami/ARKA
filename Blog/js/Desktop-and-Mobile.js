const smallFontBtn = document.getElementById('smallFont');
const mediumFontBtn = document.getElementById('mediumFont');
const largeFontBtn = document.getElementById('largeFont');
const articleContent = document.querySelector('.article-content');

smallFontBtn.addEventListener('click', () => {
    articleContent.style.fontSize = '16px';
    updateFontButtons(smallFontBtn);
});

mediumFontBtn.addEventListener('click', () => {
    articleContent.style.fontSize = '19px';
    updateFontButtons(mediumFontBtn);
});

largeFontBtn.addEventListener('click', () => {
    articleContent.style.fontSize = '22px';
    updateFontButtons(largeFontBtn);
});

function updateFontButtons(activeBtn) {
    [smallFontBtn, mediumFontBtn, largeFontBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

const darkModeToggle = document.getElementById('darkModeToggle');
let darkMode = false;

darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
     if (darkMode) {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#f0f0f0';
        articleContent.style.color = '#ddd';
        document.querySelector('.article-title').style.color = '#fff';
        document.querySelector('.section-title').style.color = '#fff';
        darkModeToggle.innerHTML = '<i class="far fa-sun"></i>';
    } else {
        document.body.style.backgroundColor = '#fefefe';
        document.body.style.color = '#1a1a1a';
        articleContent.style.color = '#333';
        document.querySelector('.article-title').style.color = '#1a1a1a';
        document.querySelector('.section-title').style.color = '#1a1a1a';
        darkModeToggle.innerHTML = '<i class="far fa-moon"></i>';
    }
});

const tocLinks = document.querySelectorAll('.toc-list a');
tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.highlight-box, .image-grid, section').forEach(el => {
    observer.observe(el);
});

const sections = document.querySelectorAll('section');
let currentSection = 0;

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSection < sections.length - 1) {
        currentSection++;
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        showToast(`${sections[currentSection].querySelector('h2').textContent}`);
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentSection > 0) {
        currentSection--;
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        showToast(`${sections[currentSection].querySelector('h2').textContent}`);
    } 
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        font-family: 'Vazirmatn', sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

const shareButtons = document.querySelectorAll('.share-btn');
shareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = button.querySelector('i').className;
        let platformName = '';
        
        if (platform.includes('twitter')) platformName = 'توییتر';
        else if (platform.includes('facebook')) platformName = 'فیسبوک';
        else if (platform.includes('linkedin')) platformName = 'لینکدین';
        else if (platform.includes('pinterest')) platformName = 'پینترست';
        else platformName = 'لینک کپی شد';
        
        // showToast(` ${platformName}`);
        
        if (platform.includes('link')) {
            navigator.clipboard.writeText(window.location.href)
                // .then(() => showToast('لینک مقاله کپی شد'))
                .catch(err => console.error('خطا در کپی لینک:', err));
                
        }
    });
});


window.addEventListener('load', () => {
    calculateReadingTime();
    
    const fontLink = document.createElement('link');
    fontLink.href = 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    setTimeout(() => {
        document.querySelector('.article-header').classList.add('animate-in');
    }, 100);
});


        const settingsBtn = document.getElementById('settingsBtn');
        const settingsMenu = document.getElementById('settingsMenu');
        
        settingsBtn.addEventListener('click', () => {
            settingsMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
                settingsMenu.classList.remove('active');
            }
        });
        
        const mobileSmallFont = document.getElementById('mobileSmallFont');
        const mobileMediumFont = document.getElementById('mobileMediumFont');
        const mobileLargeFont = document.getElementById('mobileLargeFont');
        const mobileContent = document.querySelector('.mobile-content');
        
        mobileSmallFont.addEventListener('click', () => {
            mobileContent.style.fontSize = '16px';
            updateMobileFontButtons(mobileSmallFont);
        });
        
        mobileMediumFont.addEventListener('click', () => {
            mobileContent.style.fontSize = '18px';
            updateMobileFontButtons(mobileMediumFont);
        });
        
        mobileLargeFont.addEventListener('click', () => {
            mobileContent.style.fontSize = '20px';
            updateMobileFontButtons(mobileLargeFont);
        });
        
        function updateMobileFontButtons(activeBtn) {
            [mobileSmallFont, mobileMediumFont, mobileLargeFont].forEach(btn => {
                btn.classList.remove('active');
            });
            activeBtn.classList.add('active');
        }
        
        const darkModeSwitch = document.getElementById('darkModeSwitch');
        
        darkModeSwitch.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
        });
        
        const progressBar = document.getElementById('progressBar');
        
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
        
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        let isBookmarked = false;
        
        bookmarkBtn.addEventListener('click', () => {
            isBookmarked = !isBookmarked;
            if (isBookmarked) {
                bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
                bookmarkBtn.style.color = '#d4a574';
                showToast('Article bookmarked!');
            } else {
                bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
                bookmarkBtn.style.color = '';
            }
        });
        
        document.querySelectorAll('.mobile-highlight, .mobile-image').forEach(el => {
            observer.observe(el);
        });
        
        function showToast(message) {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: #1a1a1a;
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 14px;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '1';
            }, 10);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }
        
        document.querySelector('.mobile-logo').addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.querySelectorAll('.nav-btn')[2].addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Share options coming soon!');
        });