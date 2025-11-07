document.addEventListener('DOMContentLoaded', () => {
    const pages = Array.from(document.querySelectorAll('.diary__page'));
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const pageCount = document.getElementById('page-count');

    const totalSpreads = Math.ceil(pages.length / 2);
    let current = localStorage.getItem('currentPage') ? parseInt(localStorage.getItem('currentPage')) : 1;

    function render() {
        pages.forEach(p => p.style.display = 'none');

        const first = (current - 1) * 2;
        const second = first + 1;

        if (pages[first]) pages[first].style.display = '';
        if (pages[second]) pages[second].style.display = '';

        pageCount.textContent = `Page ${current}/${totalSpreads}`;
        prevBtn.disabled = current === 1;
        nextBtn.disabled = current === totalSpreads;

        localStorage.setItem('currentPage', current);
        
        // Важно! Применяем анимации после смены страниц
        setTimeout(() => applyAnnotations(), 10);
    }

    prevBtn.addEventListener('click', () => {
        if (current > 1) {
            current--;
            render();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (current < totalSpreads) {
            current++;
            render();
        }
    });

    render();
});