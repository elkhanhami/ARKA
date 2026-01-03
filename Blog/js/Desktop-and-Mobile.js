// کنترل سایز فونت فارسی
const smallFontBtn = document.getElementById('smallFont');
const mediumFontBtn = document.getElementById('mediumFont');
const largeFontBtn = document.getElementById('largeFont');
const articleContent = document.querySelector('.article-content');

smallFontBtn.addEventListener('click', () => {
    articleContent.style.fontSize = '16px';
    updateFontButtons(smallFontBtn);
    showToast('سایز فونت: کوچک');
});

mediumFontBtn.addEventListener('click', () => {
    articleContent.style.fontSize = '19px';
    updateFontButtons(mediumFontBtn);
    showToast('سایز فونت: متوسط');
});

largeFontBtn.addEventListener('click', () => {
    articleContent.style.fontSize = '22px';
    updateFontButtons(largeFontBtn);
    showToast('سایز فونت: بزرگ');
});

function updateFontButtons(activeBtn) {
    [smallFontBtn, mediumFontBtn, largeFontBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

// حالت تاریک فارسی
const darkModeToggle = document.getElementById('darkModeToggle');
let darkMode = false;

darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    // if (darkMode) {
    //     document.body.classList.add('dark-mode');
    //     darkModeToggle.innerHTML = '<i class="far fa-sun"></i>';
    //     darkModeToggle.title = 'تغییر به حالت روشن';
    //     showToast('حالت تاریک فعال شد');
    // } else {
    //     document.body.classList.remove('dark-mode');
    //     darkModeToggle.innerHTML = '<i class="far fa-moon"></i>';
    //     darkModeToggle.title = 'تغییر به حالت تاریک';
    //     showToast('حالت روشن فعال شد');
    // }
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

// اسکرول به بخش‌های فهرست
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

// انیمیشن‌های ظاهر شدن
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

// مشاهده المان‌ها برای انیمیشن
document.querySelectorAll('.highlight-box, .image-grid, section').forEach(el => {
    observer.observe(el);
});

// دکمه‌های قبلی/بعدی فارسی
const sections = document.querySelectorAll('section');
let currentSection = 0;

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSection < sections.length - 1) {
        currentSection++;
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        showToast(`بخش: ${sections[currentSection].querySelector('h2').textContent}`);
    } else {
        showToast('این آخرین بخش است');
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentSection > 0) {
        currentSection--;
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        showToast(`بخش: ${sections[currentSection].querySelector('h2').textContent}`);
    } else {
        showToast('این اولین بخش است');
    }
});

// تابع نمایش پیام توست
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

// اشتراک‌گذاری
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
        
        showToast(`اشتراک‌گذاری در ${platformName}`);
        
        // کپی لینک اگر دکمه لینک باشد
        if (platform.includes('link')) {
            navigator.clipboard.writeText(window.location.href)
                .then(() => showToast('لینک مقاله کپی شد'))
                .catch(err => console.error('خطا در کپی لینک:', err));
        }
    });
});

// دکمه بازگشت به بالا
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 40px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #d4a574;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 99;
`;

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-5px)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0)';
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('بازگشت به بالا');
});

document.body.appendChild(backToTop);

// نمایش دکمه هنگام اسکرول
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 500) {
//         backToTop.style.opacity = '1';
//         backToTop.style.visibility = 'visible';
//     } else {
//         backToTop.style.opacity = '0';
//         backToTop.style.visibility = 'hidden';
//     }
// });

// خواندن زمان مطالعه
// function calculateReadingTime() {
//     const text = articleContent.textContent;
//     const wordCount = text.split(/\s+/).length;
//     const readingTime = Math.ceil(wordCount / 200); // 200 کلمه در دقیقه
    
//     const readingTimeElement = document.querySelector('.info-item:nth-child(2) span');
//     if (readingTimeElement) {
//         readingTimeElement.textContent = `زمان مطالعه: ${readingTime} دقیقه`;
//     }
// }

// اجرا پس از لود کامل صفحه
window.addEventListener('load', () => {
    calculateReadingTime();
    
    // افزودن فونت Vazirmatn برای فارسی
    const fontLink = document.createElement('link');
    fontLink.href = 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // انیمیشن اولیه
    setTimeout(() => {
        document.querySelector('.article-header').classList.add('animate-in');
    }, 100);
});













        // تنظیمات خواندن
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsMenu = document.getElementById('settingsMenu');
        
        settingsBtn.addEventListener('click', () => {
            settingsMenu.classList.toggle('active');
        });
        
        // بستن منو با کلیک بیرون
        document.addEventListener('click', (e) => {
            if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
                settingsMenu.classList.remove('active');
            }
        });
        
        // کنترل سایز فونت
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
        
        // حالت تاریک
        const darkModeSwitch = document.getElementById('darkModeSwitch');
        
        darkModeSwitch.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
        });
        
        // نوار پیشرفت خواندن
        const progressBar = document.getElementById('progressBar');
        
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
        
        // نشانک‌گذاری
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
        
        // انیمیشن‌های ظاهر شدن
        // const observer = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             entry.target.classList.add('fade-in');
        //         }
        //     });
        // }, { threshold: 0.1 });
        
        // مشاهده المان‌ها
        document.querySelectorAll('.mobile-highlight, .mobile-image').forEach(el => {
            observer.observe(el);
        });
        
        // توست پیام
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
        
        // اسکرول نرم به بالا
        document.querySelector('.mobile-logo').addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // دکمه اشتراک
        document.querySelectorAll('.nav-btn')[2].addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Share options coming soon!');
        });