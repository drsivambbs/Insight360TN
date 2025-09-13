// Main application initialization
let dataLoaded = false;

window.onload = function() {
    console.log('Window loaded, initializing...');
    initMap();
    loadData();
};

// Ensure data is loaded before any operations
function ensureDataLoaded(callback) {
    if (dataLoaded && categoriesData && nfhsData && geoJsonData) {
        callback();
    } else {
        console.log('Data not ready, waiting...');
        setTimeout(() => ensureDataLoaded(callback), 500);
    }
}
