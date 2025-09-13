// KPI Dashboard functionality
async function generateKPIDashboard(indicator) {
    const chartData = getChartData(indicator);
    const kpiContainer = document.getElementById('kpiContainer');
    const rightSidebar = document.querySelector('.right-sidebar');
    
    if (!chartData || chartData.length === 0) {
        rightSidebar.classList.remove('expanded');
        kpiContainer.innerHTML = `
            <div class="no-data">
                <span class="material-icons">info</span>
                <span>No Data Available</span>
            </div>
        `;
        return;
    }
    
    rightSidebar.classList.add('expanded');
    await loadIndicatorCategories();
    
    const rankedData = rankDistricts(chartData, indicator);
    const performers = getTopBottomPerformers(rankedData, 5);
    const values = chartData.map(d => d[1]);
    const average = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
    const indicatorType = getIndicatorType(indicator);
    
    const topLabel = indicatorType === 'Negative' ? 'Best Performers' : 'Top Performers';
    const bottomLabel = indicatorType === 'Negative' ? 'Needs Attention' : 'Needs Improvement';
    
    kpiContainer.innerHTML = `
        <div class="analytics-header">
            <div class="header-content">
                <span class="material-icons">analytics</span>
                <div class="header-text">
                    <div class="title">Performance Analytics</div>
                    <div class="subtitle">State Average: ${average}%</div>
                </div>
            </div>
        </div>
        
        <div class="performance-grid">
            <div class="performance-card top-performers">
                <div class="card-header">
                    <span class="material-icons">emoji_events</span>
                    <span>${topLabel}</span>
                </div>
                <div class="card-body">
                    ${performers.top.map((item) => `
                        <div class="performance-item">
                            <div class="item-rank">#${item.rank}</div>
                            <div class="item-details">
                                <div class="item-name">${item.district}</div>
                                <div class="item-value">${item.value}%</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="performance-card bottom-performers">
                <div class="card-header">
                    <span class="material-icons">trending_down</span>
                    <span>${bottomLabel}</span>
                </div>
                <div class="card-body">
                    ${performers.bottom.map((item) => `
                        <div class="performance-item">
                            <div class="item-rank">#${item.rank}</div>
                            <div class="item-details">
                                <div class="item-name">${item.district}</div>
                                <div class="item-value">${item.value}%</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}