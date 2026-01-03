function magnify(imglink){
    $("#img_here").css("background",`url('${imglink}') center center`);
    $("#magnify").css("display","flex");
    $("#magnify").addClass("animated fadeIn");
    setTimeout(function(){
        $("#magnify").removeClass("animated fadeIn");
    },800);
}

function closemagnify(){
    $("#magnify").addClass("animated fadeOut");
    setTimeout(function(){
        $("#magnify").css("display","none");
        $("#magnify").removeClass("animated fadeOut");
        $("#img_here").css("background",`url('') center center`);
    },800);
}

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
    },800);
},1650);

$(document).ready(function(){
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('body,html').animate({
        scrollTop: $(hash).offset().top
        }, 1800, function(){
        window.location.hash = hash;
       });
       } 
      });
});


// blog

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.editorial-slider', {
        speed: 1200,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        effect: 'creative',
        creativeEffect: {
            prev: {
                translate: ['-120%', 0, -500],
                opacity: 0
            },
            next: {
                translate: ['120%', 0, -500],
                opacity: 0
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.next-arrow',
            prevEl: '.prev-arrow'
        },
        on: {
            init: function() {
                updateSlideCounter(this);
                updateProgressBar(this);
            },
            slideChange: function() {
                updateSlideCounter(this);
                updateProgressBar(this);
            },
            autoplayTimeLeft: function(swiper, time, progress) {
                updateProgressBar(swiper, progress);
            }
        }
    });

    // Update slide counter
    function updateSlideCounter(swiper) {
        const current = swiper.realIndex + 1;
        const total = swiper.slides.length;
        document.querySelector('.current-slide').textContent = 
            current.toString().padStart(2, '0');
        document.querySelector('.total-slides').textContent = 
            total.toString().padStart(2, '0');
    }

    // Update progress bar
    function updateProgressBar(swiper, progress = 0) {
        const progressFill = document.querySelector('.progress-fill');
        const totalSlides = swiper.slides.length;
        const currentProgress = (swiper.realIndex + progress) / totalSlides * 100;
        progressFill.style.width = currentProgress + '%';
    }

    // Hover effects for slides
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            swiper.autoplay.stop();
        });
        slide.addEventListener('mouseleave', () => {
            swiper.autoplay.start();
        });
    });

    // Parallax effect on mouse move
    document.querySelector('.editorial-slider').addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const activeSlide = document.querySelector('.swiper-slide-active .image-section');
        if (activeSlide) {
            activeSlide.style.transform = 
                `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });
});




const slider = document.getElementById('slider');
const cards = document.querySelectorAll('.card');
const videos = document.querySelectorAll('#slider .card video');
const dots = document.querySelectorAll('.dot');
const playBtn = document.getElementById('playBtn');

let index = 0;
let playing = true;
let rafId = null;

function slideWidth() { return cards[0].offsetWidth + 16; }

function resetVideo(i) {
  videos[i].pause();
  videos[i].currentTime = 0;
  videos[i].style.opacity = 0;
  cards[i].querySelector('img').style.opacity = 1;
}

function activate(i) {
  index = i;
  cards.forEach((c, idx) => {
    c.classList.toggle('active', idx === index);
    if (idx === index && playing) {
      const video = videos[idx];
      const img = c.querySelector('img');
      img.style.opacity = 0;
      video.style.opacity = 0;
      video.style.display = 'block';
      setTimeout(() => video.style.opacity = 1, 50);
      video.play();
      updateProgress();
    } else {
      resetVideo(idx);
    }
  });

  dots.forEach((d, idx) => {
    d.classList.toggle('active', idx === index);
    d.querySelector('.fill').style.width = '0%';
  });

  slider.scrollTo({ left: slideWidth() * index, behavior: 'smooth' });
}

/* update progress */
function updateProgress() {
  cancelAnimationFrame(rafId);
  const video = videos[index];
  const fill = dots[index].querySelector('.fill');
  function step() {
    if (!playing) return;
    const percent = (video.currentTime / video.duration) * 100 || 0;
    fill.style.width = percent + '%';
    rafId = requestAnimationFrame(step);
  }
  step();
}

/* video ended */
videos.forEach((video, i) => {
  video.addEventListener('ended', () => {
    activate((index + 1) % cards.length);
  });
});

/* swipe/drag */
let startX = 0, scrollLeft = 0, isDragging = false;

slider.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mousemove', e => {
  if(!isDragging) return;
  const x = e.pageX - slider.offsetLeft;
  const walk = (startX - x);
  slider.scrollLeft = scrollLeft + walk;
});
slider.addEventListener('mouseup', () => { isDragging = false; activate(Math.round(slider.scrollLeft / slideWidth())); });
slider.addEventListener('mouseleave', () => { if(isDragging) { isDragging=false; activate(Math.round(slider.scrollLeft / slideWidth())); } });

slider.addEventListener('touchstart', e => { isDragging = true; startX = e.touches[0].pageX; scrollLeft = slider.scrollLeft; });
slider.addEventListener('touchmove', e => { if(!isDragging) return; const x = e.touches[0].pageX; slider.scrollLeft = scrollLeft + (startX - x); });
slider.addEventListener('touchend', e => { isDragging=false; activate(Math.round(slider.scrollLeft / slideWidth())); });

/* play/pause */
playBtn.onclick = () => {
  playing = !playing;
  playBtn.textContent = playing ? '| |' : '▶';
  const video = videos[index];
  const img = cards[index].querySelector('img');
  if (playing) {
    img.style.opacity = 0;
    video.style.opacity = 0;
    video.style.display = 'block';
    setTimeout(() => video.style.opacity = 1, 50);
    video.play();
    updateProgress();
  } else {
    video.pause();
    img.style.opacity = 1;
    video.style.opacity = 0;
  }
};
/* init */
activate(0);

$(document).ready(function(){
    console.log("اسکریپت تغییر رنگ فعال شد");
    
    $(window).on('scroll', function(){
        var scrollTop = $(window).scrollTop();
        
        // انتخابگرهای درست
        var workH1 = $('#work h1');
        var aboutH1 = $('#bio h1'); // این مهمه: bio نه about
        
        console.log("کار h1 پیدا شد:", workH1.length, "درباره h1 پیدا شد:", aboutH1.length);
        
        if(workH1.length && aboutH1.length){
            var workH1Top = workH1.offset().top;
            var aboutH1Top = aboutH1.offset().top;
            
            console.log("موقعیت h1 کار:", workH1Top, "موقعیت h1 درباره:", aboutH1Top, "اسکرول:", scrollTop);
            
            if(scrollTop >= workH1Top - 100 && scrollTop <= aboutH1Top - 100){
                console.log("🟢 داخل محدوده - رنگ تغییر میکنه");
                $('body').addClass('work-active');
                $('#work h1').addClass('active');
            } else {
                console.log("🔴 خارج از محدوده - رنگ عادی");
                $('body').removeClass('work-active');
                $('#work h1').removeClass('active');
            }
        } else {
            console.log("❌ المنت‌ها پیدا نشدن!");
        }
    });
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

// باز و بسته شدن منو
hamburger.addEventListener('click', ()=>{
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('active');
});

closeMenu.addEventListener('click', ()=>{
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
});


// بسته شدن منو با کلیک روی لینک داخلی
document.querySelectorAll('.mobile-menu a').forEach(link=>{
    link.addEventListener('click', (e)=>{
        const target = link.getAttribute('href');
        if(target.startsWith('#') && document.querySelector(target)){
            e.preventDefault();
            mobileMenu.classList.remove('open');
            menuOverlay.classList.remove('active');
            document.querySelector(target).scrollIntoView({behavior:'smooth'});
        }
    });
});

    // گالری hover
$('.gallery-item').hover(function(){
    const video = $(this).find('video')[0];
      if(video){
          $(video).show();
          video.play();
      }
  }, function(){
      const video = $(this).find('video')[0];
      if(video){
          video.pause();
          video.currentTime = 0;
          $(video).hide();
      }
});

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