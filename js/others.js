/**
 * 实验室网站其他页面的JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有筛选按钮和内容元素
    const filterButtons = document.querySelectorAll('.filter-btn');
    const admissionCards = document.querySelectorAll('.admission-card');
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    const partnerLogos = document.querySelectorAll('.partner-logo');
    const sections = document.querySelectorAll('.others-section');
    const filterSection = document.querySelector('.others-filter');
    
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
        // 处理招生信息卡片
        admissionCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (activeFilter === 'all' || activeFilter === category) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
        
        // 处理教程卡片
        tutorialCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (activeFilter === 'all' || activeFilter === category) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
        
        // 处理合作伙伴logo
        partnerLogos.forEach(logo => {
            const category = logo.getAttribute('data-category');
            if (activeFilter === 'all' || activeFilter === category) {
                logo.classList.remove('hidden');
                setTimeout(() => {
                    logo.style.opacity = '1';
                    logo.style.transform = 'translateY(0)';
                }, 50);
            } else {
                logo.classList.add('hidden');
                logo.style.opacity = '0';
                logo.style.transform = 'translateY(20px)';
            }
        });
        
        // 显示或隐藏各部分
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const category = sectionId.replace('-section', '');
            
            if (activeFilter === 'all' || activeFilter === category) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }
    
    // 合作伙伴logo悬停效果
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            const img = logo.querySelector('img');
            if (img) {
                img.style.filter = 'grayscale(0%)';
                img.style.opacity = '1';
            }
        });
        
        logo.addEventListener('mouseleave', () => {
            const img = logo.querySelector('img');
            if (img && !logo.classList.contains('active')) {
                img.style.filter = 'grayscale(100%)';
                img.style.opacity = '0.7';
            }
        });
    });
    
    // 设置元素的动画延迟
    const allItems = [...admissionCards, ...tutorialCards, ...partnerLogos];
    allItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
}); 