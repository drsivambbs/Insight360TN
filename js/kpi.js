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
    const values = chartData.map(d => d[1]);
    const average = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
    
    kpiContainer.innerHTML = `
        <div class="data-header">
            <span class="material-icons">table_chart</span>
            <span>District Performance</span>
        </div>
        
        <div class="stats-bar">
            <div class="stat-item">
                <span class="stat-label">Average:</span>
                <span class="stat-value">${average}%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Districts:</span>
                <span class="stat-value">${chartData.length}</span>
            </div>
        </div>
        
        <div class="data-table">
            <div class="table-header">
                <div class="col-rank">Rank</div>
                <div class="col-district">District</div>
                <div class="col-value">Value</div>
            </div>
            <div class="table-body">
                ${chartData.map((district, index) => `
                    <div class="table-row ${index < 5 ? 'top' : index >= chartData.length - 5 ? 'bottom' : 'middle'}">
                        <div class="col-rank">${index + 1}</div>
                        <div class="col-district">${district[0]}</div>
                        <div class="col-value">${district[1]}%</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}