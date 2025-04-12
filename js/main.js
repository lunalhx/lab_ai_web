/**
 * 实验室网站主页的JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            if (scrollTop > lastScrollTop) {
                // 向下滚动
                header.classList.add('header-hidden');
            } else {
                // 向上滚动
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    // 亮点论文轮播
    const publicationSlider = document.querySelector('.publication-slider');
    if (publicationSlider) {
        const publicationCards = document.querySelectorAll('.publication-card');
        let currentIndex = 0;
        
        // 如果有超过3篇论文，则启用轮播
        if (publicationCards.length > 3) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % publicationCards.length;
                publicationSlider.style.transform = `translateX(-${currentIndex * 33.33}%)`;
            }, 5000);
        }
    }

    // 图片延迟加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // 回退到简单的延迟加载
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
        });
    }

    // 添加动画效果
    const animatedElements = document.querySelectorAll('.area-card, .news-item, .publication-card');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // 一旦添加了动画类，就不再观察这个元素
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // 如果不支持IntersectionObserver，就直接添加动画类
        animatedElements.forEach(element => {
            element.classList.add('animate');
        });
    }

    // 移动端菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}); 