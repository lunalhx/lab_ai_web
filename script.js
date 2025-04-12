// 研究亮点滑块控制
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.publication-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (slider && prevBtn && nextBtn) {
        const cardWidth = slider.querySelector('.publication-card')?.offsetWidth + 20; // 卡片宽度 + 间距
        const visibleCards = 3; // 一次显示3个卡片
        
        // 向前滚动
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -cardWidth * visibleCards,
                behavior: 'smooth'
            });
        });
        
        // 向后滚动
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: cardWidth * visibleCards,
                behavior: 'smooth'
            });
        });
        
        // 检查滚动按钮可见性
        const checkScrollButtons = () => {
            const isAtStart = slider.scrollLeft <= 5;
            const isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 5;
            
            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        };
        
        // 初始检查和滚动时检查
        checkScrollButtons();
        slider.addEventListener('scroll', checkScrollButtons);
        
        // 窗口调整大小时重新计算
        window.addEventListener('resize', checkScrollButtons);
    }
}); 