// Utility functions
function getAvailableIndicators(indicators, surveyKey) {
    if (!nfhsData || !nfhsData.districts) {
        console.log('No NFHS data available');
        return [];
    }
    
    const firstDistrict = Object.values(nfhsData.districts)[0];
    if (!firstDistrict || !firstDistrict[surveyKey]) {
        console.log('No survey data for', surveyKey);
        return [];
    }
    
    const availableInSurvey = new Set(Object.keys(firstDistrict[surveyKey]));
    const available = indicators.filter(indicator => availableInSurvey.has(indicator));
    
    console.log(`getAvailableIndicators: ${available.length}/${indicators.length} available for ${surveyKey}`);
    return available;
}

function formatCategoryName(categoryKey) {
    return categoryKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function getChartData(indicator) {
    const surveyKey = activeSurvey === 'nfhs4' ? 'nfhs_4' : 'nfhs_5';
    const districtData = [];
    const districts = nfhsData.districts || {};
    
    Object.entries(districts).forEach(([districtName, districtInfo]) => {
        if (districtInfo[surveyKey] && districtInfo[surveyKey][indicator] !== undefined) {
            const value = parseFloat(districtInfo[surveyKey][indicator]);
            if (!isNaN(value)) {
                districtData.push([districtName, value]);
            }
        }
    });
    
    return districtData.sort((a, b) => b[1] - a[1]);
}