/**
 * 实验室网站研究项目页面的JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');

    // 获取所有项目卡片
    const projectCards = document.querySelectorAll('.project-card');
    
    // 获取所有筛选按钮（包括页面内筛选区域和导航栏下拉菜单中的按钮）
    const filterButtons = document.querySelectorAll('.projects-filter .filter-btn');
    const navFilterButtons = document.querySelectorAll('.dropdown-content .filter-btn');
    
    // 合并所有筛选按钮
    const allFilterButtons = [...filterButtons, ...navFilterButtons];

    // 获取各类项目的section
    const nationalSection = document.getElementById('national-projects');
    const enterpriseSection = document.getElementById('enterprise-projects');
    const internationalSection = document.getElementById('international-projects');
    
    // 根据URL参数设置初始筛选状态，确保页面加载时应用正确的筛选
    if (filter) {
        allFilterButtons.forEach(button => {
            if (button.getAttribute('data-filter') === filter) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // 显示对应的项目和标题
        filterContent(filter);
    }

    // 为页面内筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有按钮的active类
            allFilterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // 更新URL参数
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('filter', filterValue);
            window.history.pushState({}, '', newUrl);
            
            // 显示对应的项目和标题
            filterContent(filterValue);
        });
    });

    // 确保导航栏下拉菜单中的链接包含正确的筛选参数
    navFilterButtons.forEach(button => {
        const filterValue = button.getAttribute('data-filter');
        const href = button.getAttribute('href').split('?')[0]; // 移除可能已有的参数
        button.setAttribute('href', `${href}?filter=${filterValue}`);
        
        // 如果当前已经在projects页面，添加点击事件处理
        if (window.location.pathname.includes('projects.html')) {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // 阻止默认导航行为
                
                // 移除所有按钮的active类
                allFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // 为当前点击的按钮添加active类
                button.classList.add('active');
                
                // 更新URL参数
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('filter', filterValue);
                window.history.pushState({}, '', newUrl);
                
                // 显示对应的项目和标题
                filterContent(filterValue);
            });
        }
    });

    // 为研究项目导航链接添加点击事件，显示全部项目
    const projectsNavLink = document.querySelector('.dropdown > a[href="projects.html"]');
    if (projectsNavLink) {
        projectsNavLink.addEventListener('click', function(e) {
            if (window.location.pathname.includes('projects.html')) {
                e.preventDefault(); // 如果已经在projects页面，阻止默认行为
                
                // 清除URL中的filter参数
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete('filter');
                window.history.pushState({}, '', newUrl);
                
                // 移除所有按钮的active类
                allFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // 显示所有项目
                filterContent('all');
            }
            // 如果不在projects页面，让默认导航行为发生
        });
    }

    // 筛选内容的函数
    function filterContent(filterValue) {
        console.log('Filtering content:', filterValue); // 调试日志
        
        // 处理卡片显示
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            console.log('Card category:', category); // 调试日志
            
            if (filterValue === 'all' || category.includes(filterValue)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // 处理标题显示
        if (filterValue === 'all') {
            nationalSection.style.display = 'block';
            enterpriseSection.style.display = 'block';
            internationalSection.style.display = 'block';
        } else if (filterValue === 'national') {
            nationalSection.style.display = 'block';
            enterpriseSection.style.display = 'none';
            internationalSection.style.display = 'none';
        } else if (filterValue === 'enterprise') {
            nationalSection.style.display = 'none';
            enterpriseSection.style.display = 'block';
            internationalSection.style.display = 'none';
        } else if (filterValue === 'international') {
            nationalSection.style.display = 'none';
            enterpriseSection.style.display = 'none';
            internationalSection.style.display = 'block';
        }
    }
    
    // 为每个项目卡片设置初始动画延迟
    projectCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    
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