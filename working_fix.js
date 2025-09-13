// Working minimal fix - replace the broken functions

// Global variables
let categoriesData = null;
let nfhsData = null;
let activeSurvey = 'nfhs4';

// Load data and render immediately
function loadDataAndRender() {
    console.log('Loading data...');
    Promise.all([
        fetch('./dashboard_files/nfhs_indicator_categories.json').then(r => r.json()),
        fetch('./dashboard_files/master_nfhs_data.json').then(r => r.json())
    ]).then(([categories, nfhs]) => {
        console.log('Data loaded successfully');
        categoriesData = categories;
        nfhsData = nfhs;
        renderCategoriesNow();
    }).catch(error => {
        console.error('Error loading data:', error);
    });
}

// Simple working render function
function renderCategoriesNow() {
    const treeContainer = document.getElementById('categoryTree');
    if (!treeContainer) {
        console.error('categoryTree element not found');
        return;
    }
    
    if (!categoriesData || !nfhsData) {
        console.error('Data not loaded');
        return;
    }
    
    const surveyKey = activeSurvey === 'nfhs4' ? 'nfhs_4' : 'nfhs_5';
    const firstDistrict = Object.values(nfhsData.districts)[0];
    const availableInSurvey = new Set(Object.keys(firstDistrict[surveyKey] || {}));
    
    console.log(`Rendering for ${surveyKey}, available indicators: ${availableInSurvey.size}`);
    
    treeContainer.innerHTML = '';
    let totalRendered = 0;
    
    Object.entries(categoriesData.categories).forEach(([catKey, catData]) => {
        // Extract indicator names
        const indicatorNames = catData.indicators.map(ind => 
            typeof ind === 'object' ? ind.name : ind
        );
        
        // Filter available indicators
        const available = indicatorNames.filter(name => availableInSurvey.has(name));
        
        console.log(`${catKey}: ${available.length}/${indicatorNames.length} available`);
        
        if (available.length > 0) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.innerHTML = `
                <div class="category-header" onclick="this.parentElement.classList.toggle('expanded')">
                    <span class="material-icons category-icon">chevron_right</span>
                    <span class="category-title">${catKey.replace(/_/g, ' ')}</span>
                    <span class="indicator-count">${available.length}</span>
                </div>
                <div class="indicators">
                    ${available.map(indicator => `
                        <div class="indicator" onclick="selectIndicator('${catKey}', '${indicator}')">
                            ${indicator}
                        </div>
                    `).join('')}
                </div>
            `;
            treeContainer.appendChild(categoryDiv);
            totalRendered++;
        }
    });
    
    console.log(`Rendered ${totalRendered} categories`);
    
    if (totalRendered === 0) {
        treeContainer.innerHTML = '<div style="padding: 20px; color: #666;">No indicators available</div>';
    }
}

// Simple survey toggle
function toggleSurveyWorking(survey) {
    activeSurvey = survey;
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(survey + 'Btn').classList.add('active');
    
    if (categoriesData && nfhsData) {
        renderCategoriesNow();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting...');
    loadDataAndRender();
});

// Override the broken functions
window.toggleSurvey = toggleSurveyWorking;