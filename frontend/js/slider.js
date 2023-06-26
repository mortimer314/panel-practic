const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");


var swiper = new Swiper(".mySwiper", {
    spaceBetween: 40,
    // centeredSlides: true,
    loop: true,
    speed: 600,
    slidesPerView: 1,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {

      
        576: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
            slidesPerView: 2
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});


var swiper = new Swiper(".mySwiper2", {
    spaceBetween: 40,
    // centeredSlides: true,
    loop: true,
    speed: 800,
    slidesPerView: 1,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    },
    breakpoints: {
      
        576: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        }
    }
});

