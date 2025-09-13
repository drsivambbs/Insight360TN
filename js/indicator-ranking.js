// Indicator ranking and color coding based on indicator type
let indicatorCategories = null;

// Load indicator categories with types
async function loadIndicatorCategories() {
    if (!indicatorCategories) {
        try {
            const response = await fetch('dashboard_files/nfhs_indicator_categories.json');
            indicatorCategories = await response.json();
        } catch (error) {
            console.error('Error loading indicator categories:', error);
        }
    }
    return indicatorCategories;
}

// Get indicator type for a given indicator name
function getIndicatorType(indicatorName) {
    if (!indicatorCategories) return 'Neutral';
    
    for (const category of Object.values(indicatorCategories.categories)) {
        for (const indicator of category.indicators) {
            if (indicator.name === indicatorName) {
                return indicator.indicator_type;
            }
        }
    }
    return 'Neutral';
}

// Rank districts based on indicator type
function rankDistricts(chartData, indicatorName) {
    const indicatorType = getIndicatorType(indicatorName);
    
    // Sort based on indicator type
    let sortedData;
    if (indicatorType === 'Negative') {
        // For negative indicators, lowest value gets rank 1
        sortedData = [...chartData].sort((a, b) => a[1] - b[1]);
    } else {
        // For positive and neutral indicators, highest value gets rank 1
        sortedData = [...chartData].sort((a, b) => b[1] - a[1]);
    }
    
    // Add ranks
    return sortedData.map((item, index) => ({
        district: item[0],
        value: item[1],
        rank: index + 1,
        indicatorType: indicatorType
    }));
}

// Get color based on rank and indicator type
function getRankColor(rank, totalDistricts, indicatorType) {
    const topTertile = Math.ceil(totalDistricts / 3);
    const middleTertile = Math.ceil(totalDistricts * 2 / 3);
    
    if (indicatorType === 'Negative') {
        // For negative indicators, reverse the color logic
        if (rank <= topTertile) return '#4caf50';      // Best performers (lowest values) - Green
        if (rank <= middleTertile) return '#ffeb3b';   // Middle performers - Yellow
        return '#f44336';                              // Worst performers (highest values) - Red
    } else {
        // For positive and neutral indicators, normal logic
        if (rank <= topTertile) return '#4caf50';      // Best performers (highest values) - Green
        if (rank <= middleTertile) return '#ffeb3b';   // Middle performers - Yellow
        return '#f44336';                              // Worst performers (lowest values) - Red
    }
}

// Get color for map visualization
function getMapColor(value, tertile1, tertile2, indicatorType) {
    if (value === 0 || value === null || value === undefined) return '#757575';  // Grey - No data
    
    if (indicatorType === 'Negative') {
        // For negative indicators, reverse the color logic
        if (value <= tertile1) return '#4caf50';   // Low values are good - Green
        if (value <= tertile2) return '#ffeb3b';   // Medium values - Yellow
        return '#f44336';                          // High values are bad - Red
    } else {
        // For positive and neutral indicators, normal logic
        if (value >= tertile2) return '#4caf50';   // High values are good - Green
        if (value >= tertile1) return '#ffeb3b';   // Medium values - Yellow
        return '#f44336';                          // Low values are bad - Red
    }
}

// Get top and bottom performers based on indicator type
function getTopBottomPerformers(rankedData, count = 5) {
    const total = rankedData.length;
    const indicatorType = rankedData[0]?.indicatorType || 'Neutral';
    
    if (indicatorType === 'Negative') {
        // For negative indicators, rank 1 is the best (lowest values)
        return {
            top: rankedData.slice(0, count),           // Ranks 1-5 (lowest values)
            bottom: rankedData.slice(-count).reverse() // Ranks 28-32 (highest values)
        };
    } else {
        // For positive and neutral indicators, rank 1 is the best (highest values)
        return {
            top: rankedData.slice(0, count),           // Ranks 1-5 (highest values)
            bottom: rankedData.slice(-count).reverse() // Ranks 28-32 (lowest values)
        };
    }
}