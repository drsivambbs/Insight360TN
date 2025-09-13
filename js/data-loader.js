// Data loading functionality
function loadData() {
    console.log('Loading data...');
    Promise.all([
        fetch('./dashboard_files/nfhs_indicator_categories.json').then(r => r.json()),
        fetch('./dashboard_files/master_nfhs_data.json').then(r => r.json()),
        fetch('./dashboard_files/tn_district.geojson').then(r => r.json())
    ]).then(([categories, nfhs, geojson]) => {
        console.log('Data loaded successfully');
        categoriesData = categories;
        nfhsData = nfhs;
        geoJsonData = geojson;
        
        // Ensure data is available before rendering
        if (categoriesData && nfhsData && geoJsonData) {
            renderCategoryTree();
            if (map) {
                loadDefaultDistricts();
            }
        }
    }).catch(error => {
        console.error('Error loading data:', error);
        // Retry after 2 seconds
        setTimeout(loadData, 2000);
    });
}