// KPI Dashboard functionality
function generateKPIDashboard(indicator) {
    const chartData = getChartData(indicator);
    const kpiContainer = document.getElementById('kpiContainer');
    const rightSidebar = document.querySelector('.right-sidebar');
    
    if (!chartData || chartData.length === 0) {
        rightSidebar.classList.remove('expanded');
        kpiContainer.innerHTML = `
            <h5 style="margin: 0 0 12px 0; color: #666; font-weight: 500;">No Data Available</h5>
            <div style="background: #ffeaea; padding: 12px; border-radius: 8px; font-size: 12px; color: #666;">
                Data not available for selected survey
            </div>
        `;
        return;
    }
    
    rightSidebar.classList.add('expanded');
    const top5 = chartData.slice(0, 5);
    const bottom5 = chartData.slice(-5);
    const values = chartData.map(d => d[1]);
    const average = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
    
    kpiContainer.innerHTML = `
        <div class="data-header">
            <span class="material-icons">leaderboard</span>
            <span>Performance Ranking</span>
        </div>
        
        <div class="stats-summary">
            <div class="summary-card">
                <div class="summary-label">State Average</div>
                <div class="summary-value">${average}%</div>
            </div>
        </div>
        
        <div class="ranking-section">
            <div class="section-title top-section">
                <span class="material-icons">emoji_events</span>
                <span>Top 5 Districts</span>
            </div>
            <div class="ranking-table">
                ${top5.map((district, index) => `
                    <div class="rank-row top-row">
                        <div class="rank-number">${index + 1}</div>
                        <div class="district-name">${district[0]}</div>
                        <div class="district-score">${district[1]}%</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="ranking-section">
            <div class="section-title bottom-section">
                <span class="material-icons">trending_down</span>
                <span>Bottom 5 Districts</span>
            </div>
            <div class="ranking-table">
                ${bottom5.map((district, index) => `
                    <div class="rank-row bottom-row">
                        <div class="rank-number">${chartData.length - 4 + index}</div>
                        <div class="district-name">${district[0]}</div>
                        <div class="district-score">${district[1]}%</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}