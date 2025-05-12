document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchBox');
    const posts = document.querySelectorAll('.blog-posts article');
    const articles = document.querySelectorAll("article");
    const buttons = document.querySelectorAll(".filter-btn");

    // Search functionality
    searchBox.addEventListener('keyup', () => {
        const query = searchBox.value.toLowerCase();
        posts.forEach(post => {
            const topic = post.getAttribute('data-topic');
            const title = post.querySelector('h2').innerText.toLowerCase();
            const content = post.querySelector('p').innerText.toLowerCase();

            post.style.display = (topic.includes(query) || title.includes(query) || content.includes(query)) ? 'block' : 'none';
        });
    });

    // Scroll animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "fadeIn 1s ease forwards";
            }
        });
    }, { threshold: 0.1 });

    articles.forEach(article => {
        article.style.opacity = 0;
        observer.observe(article);
    });

    // Filter logic
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            articles.forEach(article => {
                const topic = article.dataset.topic;
                article.style.display = (filter === "all" || topic === filter) ? "block" : "none";
            });
        });
    });

    // Hash-based single post view
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            articles.forEach(article => article.style.display = "none");
            target.style.display = "block";
            target.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Read more logic
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const article = btn.closest('.blog-card');
            document.querySelectorAll('.blog-card').forEach(card => {
                card.querySelector('.full-content').classList.add('hidden');
                card.querySelector('.read-more').style.display = 'inline-block';
                if (card !== article) card.style.display = 'none';
            });
            article.querySelector('.full-content').classList.remove('hidden');
            btn.style.display = 'none';
        });
    });

    // Back button logic
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.blog-card').forEach(card => {
                card.style.display = 'block';
                card.querySelector('.read-more').style.display = 'inline-block';
                card.querySelector('.full-content').classList.add('hidden');
            });
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.classList.add('dark-mode-toggle');
    const moonIcon = document.createElement('i');
    moonIcon.classList.add('fa', 'fa-moon');
    darkModeToggle.appendChild(moonIcon);
    document.body.appendChild(darkModeToggle);

    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        moonIcon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        moonIcon.classList.toggle('fa-sun', isDark);
        moonIcon.classList.toggle('fa-moon', !isDark);
        localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
    });

    // Slider logic
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        const totalSlides = slides.length;
        currentSlideIndex = (index + totalSlides) % totalSlides;
        const offset = -currentSlideIndex * 100;
        document.querySelector('.slider-container').style.transform = `translateX(${offset}%)`;
    }

    window.moveSlide = (direction) => {
        showSlide(currentSlideIndex + direction);
    };

    showSlide(currentSlideIndex);
});
