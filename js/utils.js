// Utility functions
function getAvailableIndicators(indicators, surveyKey) {
    if (!nfhsData.districts) return [];
    const firstDistrict = Object.values(nfhsData.districts)[0];
    return firstDistrict && firstDistrict[surveyKey] 
        ? indicators.filter(indicator => firstDistrict[surveyKey][indicator] !== undefined)
        : [];
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