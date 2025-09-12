// UI functionality
function renderCategoryTree() {
    const treeContainer = document.getElementById('categoryTree');
    const surveyKey = activeSurvey === 'nfhs4' ? 'nfhs_4' : 'nfhs_5';
    treeContainer.innerHTML = '';

    Object.entries(categoriesData.categories).forEach(([categoryKey, categoryData]) => {
        const availableIndicators = getAvailableIndicators(categoryData.indicators, surveyKey);
        
        if (availableIndicators.length > 0) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.innerHTML = `
                <div class="category-header" onclick="toggleCategory('${categoryKey}')">
                    <span class="material-icons category-icon">chevron_right</span>
                    <span class="category-title">${formatCategoryName(categoryKey)}</span>
                    <span class="indicator-count">${availableIndicators.length}</span>
                </div>
                <div class="indicators">
                    ${availableIndicators.map(indicator => `
                        <div class="indicator" onclick="selectIndicator('${categoryKey}', '${indicator}')">
                            ${indicator}
                        </div>
                    `).join('')}
                </div>
            `;
            treeContainer.appendChild(categoryDiv);
        }
    });
}

function toggleCategory(categoryKey) {
    event.currentTarget.parentElement.classList.toggle('expanded');
}

function selectIndicator(categoryKey, indicator) {
    document.querySelectorAll('.indicator.selected').forEach(el => el.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    selectedIndicator = { category: categoryKey, indicator: indicator };
    updateContentArea(categoryKey, indicator);
}

function toggleSurvey(survey) {
    activeSurvey = survey;
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(survey + 'Btn').classList.add('active');
    renderCategoryTree();
    selectedIndicator = null;
    document.getElementById('mapLegend').style.display = 'none';
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
        geoJsonLayer = null;
    }
    document.getElementById('kpiContainer').innerHTML = `
        <h5 style="margin: 0 0 12px 0; color: #666; font-weight: 500;">Quick Stats</h5>
        <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; font-size: 14px;">
            <div style="margin-bottom: 8px;">📊 Total Categories: <strong>10</strong></div>
            <div style="margin-bottom: 8px;">📈 Total Indicators: <strong>127</strong></div>
            <div>🏥 Districts Covered: <strong>32</strong></div>
        </div>
    `;
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
        geoJsonLayer = null;
    }
    document.getElementById('mapLegend').style.display = 'none';
}

function updateContentArea(categoryKey, indicator) {
    loadMapData(indicator);
    generateKPIDashboard(indicator);
}

function showDisclaimer() {
    alert('Data Information:\\n\\n• NFHS-4 data: 2015-16 survey\\n• NFHS-5 data: 2019-21 survey\\n• Newly formed districts (Chengalpattu, Kallakurichi, Mayiladuthurai, Ranipet, Tenkasi, Tirupathur) use data from their parent districts\\n• Source: National Family Health Survey, Government of India');
}