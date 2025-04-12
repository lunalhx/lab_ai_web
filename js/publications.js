/**
 * 实验室网站论文页面的JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有筛选按钮和论文卡片
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    const searchInput = document.getElementById('pub-search');
    const searchButton = document.querySelector('.search-btn');
    const filterSection = document.querySelector('.publications-filter');
    
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
    // 当前搜索关键字
    let searchKeyword = '';
    
    // 为每个筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            button.classList.add('active');
            
            // 获取筛选类别
            activeFilter = button.getAttribute('data-filter');
            
            // 应用筛选和搜索
            applyFiltersAndSearch();
        });
    });
    
    // 为搜索输入框添加事件监听
    searchInput.addEventListener('input', () => {
        searchKeyword = searchInput.value.toLowerCase();
        applyFiltersAndSearch();
    });
    
    // 为搜索按钮添加点击事件
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            searchKeyword = searchInput.value.toLowerCase();
            applyFiltersAndSearch();
        });
    }
    
    // 为搜索输入框添加回车事件
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchKeyword = searchInput.value.toLowerCase();
            applyFiltersAndSearch();
        }
    });
    
    // 应用筛选和搜索
    function applyFiltersAndSearch() {
        publicationCards.forEach(card => {
            // 获取卡片类别
            const cardClasses = card.classList;
            
            // 检查是否符合筛选条件
            const passesFilter = activeFilter === 'all' || cardClasses.contains(activeFilter);
            
            // 检查是否符合搜索条件
            const title = card.querySelector('.pub-title').textContent.toLowerCase();
            const authors = card.querySelector('.pub-authors').textContent.toLowerCase();
            const venue = card.querySelector('.pub-venue').textContent.toLowerCase();
            const abstract = card.querySelector('.pub-abstract')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
            
            const passesSearch = searchKeyword === '' || 
                                title.includes(searchKeyword) || 
                                authors.includes(searchKeyword) || 
                                venue.includes(searchKeyword) || 
                                abstract.includes(searchKeyword) ||
                                tags.includes(searchKeyword);
            
            // 如果同时符合筛选和搜索条件，则显示卡片
            if (passesFilter && passesSearch) {
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
        
        // 检查每个年份部分是否有可见的卡片
        checkEmptyYearSections();
    }
    
    // 检查每个年份部分是否有可见的卡片，如果没有，则隐藏整个部分
    function checkEmptyYearSections() {
        const yearSections = document.querySelectorAll('.year-section');
        
        yearSections.forEach(section => {
            const cards = section.querySelectorAll('.publication-card');
            const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
            
            if (visibleCards.length === 0) {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        });
    }
    
    // 显示引用弹窗
    const citationLinks = document.querySelectorAll('.pub-link[href="#"]');
    
    citationLinks.forEach(link => {
        if (link.innerHTML.includes('引用')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 获取论文信息
                const card = link.closest('.publication-card');
                const title = card.querySelector('.pub-title').textContent;
                const authors = card.querySelector('.pub-authors').textContent;
                const venue = card.querySelector('.pub-venue').textContent;
                
                // 构建BibTeX引用
                const year = venue.match(/\d{4}/)[0] || '2024';
                const firstAuthor = authors.split(',')[0].trim().split(' ').pop();
                const bibtexId = `${firstAuthor}${year}`;
                
                const bibtex = `@inproceedings{${bibtexId},
  title={${title}},
  author={${authors}},
  booktitle={${venue}},
  year={${year}}
}`;
                
                // 创建弹窗
                const modal = document.createElement('div');
                modal.className = 'citation-modal';
                modal.innerHTML = `
                    <div class="citation-content">
                        <span class="close-btn">&times;</span>
                        <h3>引用格式</h3>
                        <div class="citation-tabs">
                            <button class="citation-tab active" data-format="bibtex">BibTeX</button>
                            <button class="citation-tab" data-format="apa">APA</button>
                        </div>
                        <div class="citation-body">
                            <pre id="bibtex-citation">${bibtex}</pre>
                            <div id="apa-citation" style="display: none;">${authors}. (${year}). ${title}. In ${venue}.</div>
                        </div>
                        <button class="copy-btn">复制</button>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // 为复制按钮添加事件
                const copyBtn = modal.querySelector('.copy-btn');
                copyBtn.addEventListener('click', () => {
                    const activeTab = modal.querySelector('.citation-tab.active').getAttribute('data-format');
                    const text = document.getElementById(`${activeTab}-citation`).textContent;
                    
                    navigator.clipboard.writeText(text).then(() => {
                        copyBtn.textContent = '已复制！';
                        setTimeout(() => {
                            copyBtn.textContent = '复制';
                        }, 2000);
                    });
                });
                
                // 为关闭按钮添加事件
                const closeBtn = modal.querySelector('.close-btn');
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                // 为引用格式标签添加事件
                const tabs = modal.querySelectorAll('.citation-tab');
                tabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        tabs.forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        
                        const format = tab.getAttribute('data-format');
                        document.getElementById('bibtex-citation').style.display = format === 'bibtex' ? 'block' : 'none';
                        document.getElementById('apa-citation').style.display = format === 'apa' ? 'block' : 'none';
                    });
                });
                
                // 点击弹窗外部关闭弹窗
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
            });
        }
    });
    
    // 为每个论文卡片设置初始动画延迟
    publicationCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index % 5);
    });
}); 