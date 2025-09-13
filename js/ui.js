// UI functionality
// UI functionality
function renderCategoryTree() {
    console.log('renderCategoryTree called');
    const treeContainer = document.getElementById('categoryTree');
    
    if (!treeContainer) {
        console.error('categoryTree element not found');
        return;
    }
    
    if (!categoriesData || !categoriesData.categories) {
        console.error('Categories data not loaded');
        treeContainer.innerHTML = '<div style="padding: 20px; color: #666;">Loading categories...</div>';
        return;
    }
    
    if (!nfhsData || !nfhsData.districts) {
        console.error('NFHS data not loaded');
        treeContainer.innerHTML = '<div style="padding: 20px; color: #666;">Loading data...</div>';
        return;
    }
    
    const surveyKey = activeSurvey === 'nfhs4' ? 'nfhs_4' : 'nfhs_5';
    console.log('Rendering categories for survey:', surveyKey);
    
    treeContainer.innerHTML = '';
    let categoriesRendered = 0;

    Object.entries(categoriesData.categories).forEach(([categoryKey, categoryData]) => {
        const indicatorNames = categoryData.indicators.map(ind => ind.name || ind);
        const availableIndicators = getAvailableIndicators(indicatorNames, surveyKey);
        
        console.log(`${categoryKey}: ${availableIndicators.length}/${indicatorNames.length} available`);
        
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
            categoriesRendered++;
        }
    });
    
    console.log(`Category tree rendered with ${categoriesRendered} categories`);
    
    if (categoriesRendered === 0) {
        treeContainer.innerHTML = '<div style="padding: 20px; color: #666;">No indicators available for this survey</div>';
    }
}

function toggleCategory(categoryKey) {
    event.currentTarget.parentElement.classList.toggle('expanded');
}

function selectIndicator(categoryKey, indicator) {
    document.querySelectorAll('.indicator.selected').forEach(el => el.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    selectedIndicator = { category: categoryKey, indicator: indicator };
    updateDashboardHeader(indicator);
    updateContentArea(categoryKey, indicator);
    
    // Auto-collapse all categories after selection
    document.querySelectorAll('.category.expanded').forEach(category => {
        category.classList.remove('expanded');
    });
}

function updateDashboardHeader(indicator) {
    const dashboardHeader = document.querySelector('.dashboard-header');
    const surveyName = activeSurvey === 'nfhs4' ? 'NFHS-4 (2015-16)' : 'NFHS-5 (2019-21)';
    
    dashboardHeader.innerHTML = `
        <div class="header-main">
            <div class="header-left">
                <h1 class="dashboard-title">Insight360TN</h1>
                <p class="dashboard-subtitle">National Family Health Survey - Dashboard for Tamil Nadu</p>
            </div>
            <div class="header-right">
                <div class="indicator-info">
                    <div class="indicator-badge">
                        <span class="material-icons">analytics</span>
                        <span class="badge-text">${surveyName}</span>
                    </div>
                    <div class="indicator-name">${indicator}</div>
                </div>
            </div>
        </div>
    `;
}

function resetDashboardHeader() {
    const dashboardHeader = document.querySelector('.dashboard-header');
    dashboardHeader.innerHTML = `
        <div class="header-main">
            <div class="header-left">
                <h1 class="dashboard-title">Insight360TN</h1>
                <p class="dashboard-subtitle">National Family Health Survey - Dashboard for Tamil Nadu</p>
            </div>
        </div>
    `;
}

function toggleSurvey(survey) {
    activeSurvey = survey;
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(survey + 'Btn').classList.add('active');
    
    // Always re-render categories for new survey
    renderCategoryTree();
    
    selectedIndicator = null;
    resetDashboardHeader();
    document.getElementById('mapLegend').style.display = 'none';
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
        geoJsonLayer = null;
    }
    document.getElementById('kpiContainer').innerHTML = `
        <div class="analytics-header">
            <div class="header-content">
                <span class="material-icons">dashboard</span>
                <div class="header-text">
                    <div class="title">Dashboard Overview</div>
                    <div class="subtitle">Tamil Nadu Health Indicators</div>
                </div>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon"><span class="material-icons">category</span></div>
                <div class="stat-content">
                    <div class="stat-number">10</div>
                    <div class="stat-label">Health Categories</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon"><span class="material-icons">location_on</span></div>
                <div class="stat-content">
                    <div class="stat-number">32</div>
                    <div class="stat-label">Districts Covered</div>
                </div>
            </div>
        </div>
        
        <div class="survey-breakdown">
            <div class="breakdown-header">
                <span class="material-icons">poll</span>
                <span>Survey Data Coverage</span>
            </div>
            <div class="survey-stats">
                <div class="survey-item">
                    <div class="survey-name">NFHS-4 (2015-16)</div>
                    <div class="survey-count">93 Indicators</div>
                </div>
                <div class="survey-item">
                    <div class="survey-name">NFHS-5 (2019-21)</div>
                    <div class="survey-count">104 Indicators</div>
                </div>
            </div>
        </div>
        
        <div class="indicator-breakdown">
            <div class="breakdown-header">
                <span class="material-icons">analytics</span>
                <span>Indicator Classification</span>
            </div>
            <div class="indicator-stats">
                <div class="indicator-item positive">
                    <div class="indicator-dot"></div>
                    <div class="indicator-info">
                        <div class="indicator-type">Positive Indicators</div>
                        <div class="indicator-desc">74 indicators (Higher is better)</div>
                    </div>
                </div>
                <div class="indicator-item negative">
                    <div class="indicator-dot"></div>
                    <div class="indicator-info">
                        <div class="indicator-type">Negative Indicators</div>
                        <div class="indicator-desc">47 indicators (Lower is better)</div>
                    </div>
                </div>
                <div class="indicator-item neutral">
                    <div class="indicator-dot"></div>
                    <div class="indicator-info">
                        <div class="indicator-type">Neutral Indicators</div>
                        <div class="indicator-desc">7 indicators (Demographic data)</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateContentArea(categoryKey, indicator) {
    loadMapData(indicator);
    generateKPIDashboard(indicator);
}

function showDisclaimer() {
    alert('Data Information:\\n\\n• NFHS-4 data: 2015-16 survey\\n• NFHS-5 data: 2019-21 survey\\n• Newly formed districts (Chengalpattu, Kallakurichi, Mayiladuthurai, Ranipet, Tenkasi, Tirupathur) use data from their parent districts\\n• Source: National Family Health Survey, Government of India');
}

function toggleLabels() {
    showLabels = document.getElementById('showLabels').checked;
    if (currentIndicator) {
        loadMapData(currentIndicator);
    } else {
        loadDefaultDistricts();
    }
}

function changeLabelType() {
    labelType = document.querySelector('input[name="labelType"]:checked').value;
    if (currentIndicator && showLabels) {
        loadMapData(currentIndicator);
    } else if (showLabels) {
        loadDefaultDistricts();
    }
}

function toggleMapControls() {
    const controls = document.getElementById('mapControls');
    controls.classList.toggle('minimized');
    controls.classList.toggle('expanded');
}

// Load categories for specific survey (emergency fix)
function loadCategoriesForSurvey(survey) {
    const surveyKey = survey === 'nfhs4' ? 'nfhs_4' : 'nfhs_5';
    
    fetch('./dashboard_files/nfhs_indicator_categories.json')
        .then(r => r.json())
        .then(categoriesData => {
            return fetch('./dashboard_files/master_nfhs_data.json')
                .then(r => r.json())
                .then(nfhsData => ({ categoriesData, nfhsData }));
        })
        .then(({ categoriesData, nfhsData }) => {
            const tree = document.getElementById('categoryTree');
            tree.innerHTML = '';
            tree.dataset.emergencyLoaded = 'true';
            
            // Get first district to check available indicators
            const firstDistrict = Object.values(nfhsData.districts)[0];
            
            Object.entries(categoriesData.categories).forEach(([key, cat]) => {
                // Filter indicators available in this survey
                const availableIndicators = cat.indicators.filter(ind => {
                    const indicatorName = ind.name || ind;
                    return firstDistrict && firstDistrict[surveyKey] && 
                           firstDistrict[surveyKey][indicatorName] !== undefined;
                });
                
                if (availableIndicators.length > 0) {
                    const div = document.createElement('div');
                    div.className = 'category';
                    div.innerHTML = `
                        <div class="category-header">
                            <span class="material-icons category-icon">chevron_right</span>
                            <span class="category-title">${key.replace(/_/g, ' ')}</span>
                            <span class="indicator-count">${availableIndicators.length}</span>
                        </div>
                        <div class="indicators">
                            ${availableIndicators.map(ind => `
                                <div class="indicator" onclick="selectIndicator('${key}', '${ind.name || ind}')">
                                    ${ind.name || ind}
                                </div>
                            `).join('')}
                        </div>
                    `;
                    
                    // Add click handler for category header
                    div.querySelector('.category-header').onclick = function() {
                        div.classList.toggle('expanded');
                    };
                    
                    tree.appendChild(div);
                }
            });
            
            console.log(`Categories loaded for ${survey} with`, tree.children.length, 'categories');
        })
        .catch(e => console.error('Failed to load categories for survey:', e));
}