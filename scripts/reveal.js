(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const items = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window) || !items.length) {
            items.forEach(i => i.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach(i => io.observe(i));
    });
})();
