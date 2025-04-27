/**
 * 实验室介绍页面的JavaScript功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取URL中的锚点
    const hash = window.location.hash;
    
    // 如果有锚点，滚动到对应的内容区域
    if (hash) {
        // 稍微延迟一下，确保页面完全加载
        setTimeout(function() {
            const target = document.querySelector(hash);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
    
    // 为内容区块添加动画
    const contentSections = document.querySelectorAll('.content-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    contentSections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}); 