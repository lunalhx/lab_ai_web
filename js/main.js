/**
 * 实验室网站主页的JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 首页轮播图功能
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let slideInterval;

    // 初始化轮播
    function initCarousel() {
        if (carouselSlides.length === 0) return;
        
        // 设置初始状态
        carouselSlides[0].classList.add('active');
        if (carouselDots.length > 0) {
            carouselDots[0].classList.add('active');
        }
        
        // 开始自动轮播
        startSlideInterval();
        
        // 添加轮播控件事件
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
                resetSlideInterval();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
                resetSlideInterval();
            });
        }
        
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSlideInterval();
            });
        });
    }
    
    // 轮播到指定幻灯片
    function goToSlide(slideIndex) {
        // 移除当前激活状态
        carouselSlides[currentSlide].classList.remove('active');
        if (carouselDots.length > 0) {
            carouselDots[currentSlide].classList.remove('active');
        }
        
        // 计算新的幻灯片索引（环形）
        currentSlide = (slideIndex + carouselSlides.length) % carouselSlides.length;
        
        // 应用新的激活状态
        carouselSlides[currentSlide].classList.add('active');
        if (carouselDots.length > 0) {
            carouselDots[currentSlide].classList.add('active');
        }
    }
    
    // 开始自动轮播
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000); // 5秒自动切换
    }
    
    // 重置轮播计时器
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // 当鼠标悬停在轮播区域时暂停轮播
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }
    
    // 初始化轮播
    initCarousel();

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

    // 下拉菜单延迟关闭功能
    const dropdowns = document.querySelectorAll('.dropdown');
    const subDropdowns = document.querySelectorAll('.sub-dropdown');
    
    // 为一级下拉菜单添加延迟关闭效果
    let dropdownTimeouts = {};
    
    dropdowns.forEach((dropdown, index) => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (!dropdownContent) return;
        
        dropdown.addEventListener('mouseenter', () => {
            // 清除该下拉菜单的关闭计时器
            if (dropdownTimeouts[index]) {
                clearTimeout(dropdownTimeouts[index]);
                delete dropdownTimeouts[index];
            }
            
            // 重置其他下拉菜单的显示状态
            dropdowns.forEach((otherDropdown, otherIndex) => {
                if (otherIndex !== index) {
                    const otherContent = otherDropdown.querySelector('.dropdown-content');
                    if (otherContent) {
                        otherContent.style.visibility = 'hidden';
                        otherContent.style.opacity = '0';
                    }
                }
            });
            
            // 显示当前下拉菜单
            dropdownContent.style.visibility = 'visible';
            dropdownContent.style.opacity = '1';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            // 设置延迟关闭计时器
            dropdownTimeouts[index] = setTimeout(() => {
                dropdownContent.style.visibility = 'hidden';
                dropdownContent.style.opacity = '0';
            }, 250); // 250毫秒延迟关闭
        });
    });
    
    // 为二级下拉菜单添加延迟关闭效果
    let submenuTimeouts = {};
    
    subDropdowns.forEach((subDropdown, index) => {
        const submenu = subDropdown.querySelector('.submenu');
        
        if (!submenu) return;
        
        subDropdown.addEventListener('mouseenter', () => {
            // 清除该子菜单的关闭计时器
            if (submenuTimeouts[index]) {
                clearTimeout(submenuTimeouts[index]);
                delete submenuTimeouts[index];
            }
            
            // 显示当前子菜单
            submenu.style.visibility = 'visible';
            submenu.style.opacity = '1';
            submenu.style.transform = 'translateX(0)';
        });
        
        subDropdown.addEventListener('mouseleave', () => {
            // 设置延迟关闭计时器
            submenuTimeouts[index] = setTimeout(() => {
                submenu.style.visibility = 'hidden';
                submenu.style.opacity = '0';
                submenu.style.transform = 'translateX(-5px)';
            }, 250); // 250毫秒延迟关闭
        });
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
                }, 250); // 250毫秒的延迟
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
            }, 250); // 250毫秒的延迟
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