document.addEventListener('DOMContentLoaded', () => {
    console.log("a");

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
            rootMargin: '0px 0px -100px 0px'
        }
    );

    document.querySelectorAll('[data-anime]').forEach((el) => {
        observer.observe(el);
    });
});