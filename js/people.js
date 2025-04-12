/**
 * 实验室网站团队成员页面的JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有筛选按钮和人员卡片
    const filterButtons = document.querySelectorAll('.filter-btn');
    const peopleCards = document.querySelectorAll('.people-card');
    const filterSection = document.querySelector('.people-filter');
    
    // 滚动监听
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { // 滚动超过100px
            filterSection.classList.add('scrolled');
        } else {
            filterSection.classList.remove('scrolled');
        }
    });
    
    // 为每个筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            button.classList.add('active');
            
            // 获取筛选类别
            const filterValue = button.getAttribute('data-filter');
            
            // 筛选人员卡片
            filterPeople(filterValue);
        });
    });
    
    // 筛选人员卡片的函数
    function filterPeople(category) {
        peopleCards.forEach(card => {
            // 获取卡片的类别
            const cardCategory = card.getAttribute('data-category');
            
            // 如果筛选类别是"all"或卡片类别包含筛选类别，则显示卡片
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                // 添加动画效果
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // 隐藏卡片
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
        
        // 显示或隐藏相应的部分标题
        const sections = document.querySelectorAll('.people-section');
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const cardsInSection = section.querySelectorAll('.people-card:not(.hidden)');
            
            if (category === 'all' || sectionId === category) {
                section.style.display = 'block';
            } else if (cardsInSection.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    }
    
    // 为每个人员卡片设置初始动画延迟
    peopleCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    
    // 图片延迟加载
    const lazyImages = document.querySelectorAll('.people-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                        image.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            if (image.dataset.src) {
                imageObserver.observe(image);
            }
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