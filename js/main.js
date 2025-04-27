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

    // 改进实验室结构子菜单的交互
    const labStructureLink = document.querySelector('.lab-structure');
    const subDropdown = document.querySelector('.sub-dropdown.key-labs');
    
    if (labStructureLink && subDropdown) {
        // 鼠标悬停在实验室结构链接上时
        labStructureLink.addEventListener('mouseenter', function() {
            subDropdown.style.display = 'block';
            // 使用setTimeout延迟添加visible类，创建淡入效果
            setTimeout(() => {
                subDropdown.classList.add('visible');
            }, 50);
        });
        
        // 为子菜单添加延迟隐藏
        let hideTimeout;
        
        // 鼠标离开实验室结构链接时，不立即隐藏
        labStructureLink.addEventListener('mouseleave', function(e) {
            // 检查鼠标是否移向子菜单方向
            const rect = labStructureLink.getBoundingClientRect();
            const isMovingToSubmenu = e.clientX > rect.right; // 鼠标向右移动（子菜单方向）
            
            if (!isMovingToSubmenu) {
                hideTimeout = setTimeout(() => {
                    subDropdown.classList.remove('visible');
                    // 在过渡效果完成后隐藏
                    setTimeout(() => {
                        if (!subDropdown.classList.contains('visible')) {
                            subDropdown.style.display = 'none';
                        }
                    }, 300);
                }, 300);
            }
        });
        
        // 鼠标进入子菜单时，清除隐藏计时器
        subDropdown.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
        });
        
        // 鼠标离开子菜单时，开始倒计时隐藏
        subDropdown.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(() => {
                subDropdown.classList.remove('visible');
                // 在过渡效果完成后隐藏
                setTimeout(() => {
                    if (!subDropdown.classList.contains('visible')) {
                        subDropdown.style.display = 'none';
                    }
                }, 300);
            }, 300); // 300ms延迟，让用户有时间将鼠标移回
        });
    }

    // 移动端菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 获取所有实验室结构链接
    const labStructureLinks = document.querySelectorAll('.lab-structure');
    
    // 为每个链接添加点击事件监听器
    labStructureLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // 阻止默认行为（阻止链接跳转）
            event.preventDefault();
        });
    });
}); 