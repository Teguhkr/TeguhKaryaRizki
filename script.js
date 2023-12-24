document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const banner = document.querySelector('.banner');
    const headerHeight = navbar.offsetHeight;

    let prevScrollPos = window.pageYOffset;

    function updateNavbarOpacity() {
        const currentScrollPos = window.pageYOffset;
        const isScrollingDown = prevScrollPos < currentScrollPos;

        if (isScrollingDown && currentScrollPos > headerHeight) {
            navbar.style.opacity = '0';
        } else {
            navbar.style.opacity = '1';
        }

        prevScrollPos = currentScrollPos;
    }

    function updateBannerOpacity() {
        const scrollPos = window.pageYOffset;

        if (scrollPos < headerHeight) {
            const opacity = 1 - scrollPos / headerHeight;
            const translateY = scrollPos / 2;

            banner.querySelector('h1').style.opacity = opacity;
            banner.querySelector('h1').style.transform = `translateY(${translateY}px)`;
            banner.querySelector('p').style.opacity = opacity;
            banner.querySelector('p').style.transform = `translateY(${translateY}px)`;
        }
    }

    function handleParallax() {
        const scrollPos = window.scrollY;
        const parallaxValue = scrollPos * 0.5;

        banner.style.transform = `translateY(${parallaxValue}px)`;
    }

    function handleScroll() {
        updateNavbarOpacity();
        updateBannerOpacity();
        handleParallax();
    }

    handleScroll();

    window.addEventListener('scroll', function () {
        requestAnimationFrame(handleScroll);
    });

    document.querySelectorAll('.menu a').forEach((menuLink) => {
        menuLink.addEventListener('click', function (event) {
            event.preventDefault();

            document.querySelectorAll('.menu a').forEach((link) => {
                link.classList.remove('active');
            });

            this.classList.add('active');

            const targetPage = this.getAttribute('href');
            console.log(`Navigating to: ${targetPage}`);
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const postsData = [
        { title: 'Post 1', thumbnail: 'path/to/thumbnail1.jpg' },
        { title: 'Post 2', thumbnail: 'path/to/thumbnail2.jpg' },
     
    ];

    const showPerPageSelect = document.getElementById('showPerPage');
    const sortBySelect = document.getElementById('sortBy');
    const postContent = document.getElementById('postContent');

    function updatePosts() {
        const showPerPage = parseInt(showPerPageSelect.value);
        const sortBy = sortBySelect.value;

        const displayedPosts = postsData.slice(0, showPerPage);

        postContent.innerHTML = '';

        displayedPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');

            postCard.innerHTML = `<img src="${post.thumbnail}" alt="${post.title}">`;

            postCard.innerHTML += `<h3>${truncateText(post.title, 3)}</h3>`;

            postContent.appendChild(postCard);
        });

    }

    updatePosts();

    showPerPageSelect.addEventListener('change', updatePosts);
    sortBySelect.addEventListener('change', updatePosts);
});

function truncateText(text, maxLines) {
    const lines = text.split('\n');
    if (lines.length > maxLines) {
        return lines.slice(0, maxLines).join('\n') + '...';
    }
    return text;
}


document.addEventListener('DOMContentLoaded', function () {
    const postsPerPage = 10; 
    const totalPosts = 100; 
    const pagesToShow = 5; 

    const paginationContainer = document.getElementById('pagination');

    function generatePagination(currentPage) {
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        const halfPagesToShow = Math.floor(pagesToShow / 2);

        let startPage = Math.max(1, currentPage - halfPagesToShow);
        let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        if (endPage - startPage + 1 < pagesToShow) {
            startPage = Math.max(1, endPage - pagesToShow + 1);
        }

        paginationContainer.innerHTML = '';

        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.classList.add('page-link');
            pageLink.textContent = i;

            if (i === currentPage) {
                pageLink.classList.add('active');
            }

            pageLink.addEventListener('click', function (event) {
                event.preventDefault();
                generatePagination(i);
            });

            paginationContainer.appendChild(pageLink);
        }
    }

    generatePagination(1); 
});

