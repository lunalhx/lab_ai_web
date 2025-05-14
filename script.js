// 研究亮点滑块控制
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏下拉菜单优化
    const dropdowns = document.querySelectorAll('.dropdown');
    let timeout;

    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            dropdownContent.style.display = 'block';
            setTimeout(() => {
                dropdownContent.style.opacity = '1';
                dropdownContent.style.visibility = 'visible';
                dropdownContent.style.transform = 'translateX(-50%) translateY(0)';
            }, 50);
        });
        
        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                dropdownContent.style.opacity = '0';
                dropdownContent.style.visibility = 'hidden';
                dropdownContent.style.transform = 'translateX(-50%) translateY(10px)';
                setTimeout(() => {
                    if (dropdownContent.style.opacity === '0') {
                        dropdownContent.style.display = 'none';
                    }
                }, 300);
            }, 250); // 从150ms修改为250ms
        });
    });

    // 处理子下拉菜单
    const subDropdowns = document.querySelectorAll('.sub-dropdown');
    subDropdowns.forEach(subDropdown => {
        const submenu = subDropdown.querySelector('.submenu');
        if (!submenu) return;
        
        subDropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            submenu.style.display = 'block';
            setTimeout(() => {
                submenu.style.opacity = '1';
                submenu.style.visibility = 'visible';
            }, 50);
        });
        
        subDropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                submenu.style.opacity = '0';
                submenu.style.visibility = 'hidden';
                setTimeout(() => {
                    if (submenu.style.opacity === '0') {
                        submenu.style.display = 'none';
                    }
                }, 300);
            }, 250); // 从150ms修改为250ms
        });
    });

    // 团队成员筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const peopleCards = document.querySelectorAll('.people-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            peopleCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 研究亮点滑块控制
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