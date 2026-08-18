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
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
    }
);

document.querySelectorAll('[data-anime]').forEach((el) => {
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