// KPI Dashboard functionality
function generateKPIDashboard(indicator) {
    const chartData = getChartData(indicator);
    const kpiContainer = document.getElementById('kpiContainer');
    
    if (!chartData || chartData.length === 0) {
        kpiContainer.innerHTML = `
            <h5 style="margin: 0 0 12px 0; color: #666; font-weight: 500;">No Data Available</h5>
            <div style="background: #ffeaea; padding: 12px; border-radius: 8px; font-size: 12px; color: #666;">
                Data not available for selected survey
            </div>
        `;
        return;
    }
    
    const top5 = chartData.slice(0, 5);
    const bottom5 = chartData.slice(-5).reverse();
    const values = chartData.map(d => d[1]);
    const average = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
    
    kpiContainer.innerHTML = `
        <h5 style="margin: 0 0 12px 0; color: #1976d2; font-weight: 500; display: flex; align-items: center; gap: 6px;">
            <span class="material-icons" style="font-size: 16px;">assessment</span>
            Performance Analysis
        </h5>
        
        <div class="kpi-section">
            <div class="kpi-title" style="color: #4caf50;">
                <span class="material-icons" style="font-size: 14px;">trending_up</span>
                Top 5 Districts
            </div>
            <div class="kpi-cards">
                ${top5.map((district, index) => `
                    <div class="kpi-card top">
                        <div class="kpi-district">${district[0]}</div>
                        <div class="kpi-value">${district[1]}%</div>
                        <div class="kpi-rank">#${index + 1}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="kpi-section">
            <div class="kpi-title" style="color: #ff9800;">
                <span class="material-icons" style="font-size: 14px;">analytics</span>
                State Average
            </div>
            <div class="kpi-cards">
                <div class="kpi-card average">
                    <div class="kpi-district">Tamil Nadu</div>
                    <div class="kpi-value">${average}%</div>
                    <div class="kpi-rank">${chartData.length} districts</div>
                </div>
            </div>
        </div>
        
        <div class="kpi-section">
            <div class="kpi-title" style="color: #f44336;">
                <span class="material-icons" style="font-size: 14px;">trending_down</span>
                Bottom 5 Districts
            </div>
            <div class="kpi-cards">
                ${bottom5.map((district, index) => `
                    <div class="kpi-card bottom">
                        <div class="kpi-district">${district[0]}</div>
                        <div class="kpi-value">${district[1]}%</div>
                        <div class="kpi-rank">#${chartData.length - index}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}