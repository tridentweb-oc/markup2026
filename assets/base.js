const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animated');
            } else {
                entry.target.classList.remove('is-animated');
            }
        });
    },
    {
        root: null,
        threshold: 0.2,
        rootMargin: '0px 0px 0px 0px'
    }
);

document.querySelectorAll('[data-scroll]').forEach((el) => {
    observer.observe(el);
});

// Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const globalNav = document.getElementById('global-nav');

if (hamburger && globalNav) {
    hamburger.addEventListener('click', () => {
        document.body.classList.toggle('is-menu-open');
    });

    // メニュー内のリンクをクリックしたらメニューを閉じる
    globalNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('is-menu-open');
        });
    });
}

// リサイズ時の不要なアニメーション（フラッシュ）を防止する処理
let resizeTimer;
window.addEventListener('resize', () => {
    // 画面幅が700px以上になったらメニューが開いた状態をリセットする
    if (window.innerWidth >= 700) {
        document.body.classList.remove('is-menu-open');
    }

    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Slideshow Logic
const slideshows = document.querySelectorAll('.slideshow');
slideshows.forEach(slideshow => {
    const slides = Array.from(slideshow.children);
    if (slides.length === 0) return;

    let currentIndex = 0;
    slides[currentIndex].classList.add('is-active');

    setInterval(() => {
        slides[currentIndex].classList.remove('is-active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('is-active');
    }, 3000);
});

// Gallery Modal Logic
const galleryImages = document.querySelectorAll('.gallery > div > img');
if (galleryImages.length > 0) {
    // 1. 動的にモーダル要素を作成してbodyの最後に追加
    const modal = document.createElement('div');
    modal.id = 'gallery-modal';
    const modalImg = document.createElement('img');
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // 2. 画像クリックでモーダルを開き、クリックした画像のURLをセット
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer'; // カーソルを指マークに
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modal.classList.add('is-open');
        });
    });

    // 3. モーダル自体をクリックしたら閉じる
    modal.addEventListener('click', () => {
        modal.classList.remove('is-open');
    });
}