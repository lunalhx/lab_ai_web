/**
 * 实验室网站团队成员页面的JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');

    // 获取所有成员卡片
    const peopleCards = document.querySelectorAll('.people-card');
    
    // 获取所有筛选按钮
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 获取教师和学生团队的section
    const teachersSection = document.getElementById('teachers');
    const studentsSection = document.getElementById('students');
    
    // 根据URL参数设置初始筛选状态
    if (filter) {
        filterButtons.forEach(button => {
            if (button.getAttribute('data-filter') === filter) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // 显示对应的成员和标题
        filterContent(filter);
    }

    // 为筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // 更新URL参数
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('filter', filterValue);
            window.history.pushState({}, '', newUrl);
            
            // 显示对应的成员和标题
            filterContent(filterValue);
        });
    });

    // 为团队成员导航链接添加点击事件，显示全部成员
    const teamNavLink = document.querySelector('.dropdown > a[href="people.html"]');
    if (teamNavLink) {
        teamNavLink.addEventListener('click', function(e) {
            // 不阻止默认行为，让页面正常跳转
            // 但是清除URL中的filter参数
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('filter');
            window.history.pushState({}, '', newUrl);
        });
    }

    // 筛选内容的函数
    function filterContent(filterValue) {
        // 处理卡片显示
        peopleCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // 处理标题显示
        if (filterValue === 'teachers') {
            teachersSection.style.display = 'block';
            studentsSection.style.display = 'none';
        } else if (filterValue === 'students') {
            teachersSection.style.display = 'none';
            studentsSection.style.display = 'block';
        } else {
            teachersSection.style.display = 'block';
            studentsSection.style.display = 'block';
        }
    }
    
    // 滚动监听
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { // 滚动超过100px
            filterSection.classList.add('scrolled');
        } else {
            filterSection.classList.remove('scrolled');
        }
    });
    
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