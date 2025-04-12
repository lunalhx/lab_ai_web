/**
 * 实验室网站研究项目页面的JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有筛选按钮和项目卡片
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const filterSection = document.querySelector('.projects-filter');
    
    // 滚动监听
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { // 滚动超过100px
            filterSection.classList.add('scrolled');
        } else {
            filterSection.classList.remove('scrolled');
        }
    });
    
    // 当前激活的筛选类别
    let activeFilter = 'all';
    
    // 为每个筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            button.classList.add('active');
            
            // 获取筛选类别
            activeFilter = button.getAttribute('data-filter');
            
            // 应用筛选
            applyFilter();
        });
    });
    
    // 应用筛选
    function applyFilter() {
        projectCards.forEach(card => {
            // 获取卡片的类别
            const cardCategories = card.getAttribute('data-category').split(' ');
            
            // 如果筛选类别是"all"或卡片类别包含筛选类别，则显示卡片
            if (activeFilter === 'all' || cardCategories.includes(activeFilter)) {
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
        
        // 检查每个类别是否有可见的卡片
        checkEmptyCategories();
    }
    
    // 检查每个类别是否有可见的卡片，如果没有，则隐藏整个部分
    function checkEmptyCategories() {
        const projectCategories = document.querySelectorAll('.projects-category');
        
        projectCategories.forEach(category => {
            const cards = category.querySelectorAll('.project-card');
            const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
            
            if (visibleCards.length === 0) {
                category.classList.add('hidden');
            } else {
                category.classList.remove('hidden');
            }
        });
    }
    
    // 图片延迟加载
    const lazyImages = document.querySelectorAll('.project-image img');
    
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
    
    // 合作伙伴logo鼠标悬停动画
    const partnerLogos = document.querySelectorAll('.collaborator-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    });
    
    // 项目卡片点击展开更多信息（在移动端）
    if (window.innerWidth < 768) {
        const projectDescriptions = document.querySelectorAll('.project-description');
        
        projectDescriptions.forEach(desc => {
            const originalText = desc.textContent;
            if (originalText.length > 100) {
                const shortText = originalText.substring(0, 100) + '...';
                desc.textContent = shortText;
                desc.classList.add('collapsed');
                
                const expandButton = document.createElement('button');
                expandButton.textContent = '显示更多';
                expandButton.className = 'expand-btn';
                desc.parentNode.insertBefore(expandButton, desc.nextSibling);
                
                expandButton.addEventListener('click', () => {
                    if (desc.classList.contains('collapsed')) {
                        desc.textContent = originalText;
                        desc.classList.remove('collapsed');
                        expandButton.textContent = '收起';
                    } else {
                        desc.textContent = shortText;
                        desc.classList.add('collapsed');
                        expandButton.textContent = '显示更多';
                    }
                });
            }
        });
    }
    
    // 为每个项目卡片添加动画延迟
    projectCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index % 3);
    });
    
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